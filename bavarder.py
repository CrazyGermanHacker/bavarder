import web
import json
import urllib3
import httplib2
from oauth2client.service_account import ServiceAccountCredentials
from google.appengine.ext import ndb

def get_at():
    b=urllib3.request.urlopen("https://bavader.app/lightningchat-1-firebase-adminsdk-zrckh-870350e422.json")
    credentials = ServiceAccountCredentials.from_json(json.loads(b.read().decode()), 'https://www.googleapis.com/auth/firebase.messaging')
    access_token_info = credentials.get_access_token()
    print "Hi"
    return access_token_info.access_token

urls=(
    "/", "index",
    "/sendmsg", "sendmsg",
    "/user","grabcontacts",
    "/rscvmsgs", "grabmessages",
    "/changesetting", "set",
    "/delprof", "delprof",
    "/associateprof", "allownotifs"
)

app=web.application(urls, globals())
render=web.template.render("templates/", base="layout")

class msg(ndb.Model):
    emailto=ndb.StringProperty()
    number=ndb.IntegerProperty()
    emailfrom=ndb.StringProperty()
    message=ndb.StringProperty()

class user(ndb.Model):
    user=ndb.StringProperty()
    dark_theme=ndb.BooleanProperty()
    noir=ndb.BooleanProperty()
    contacts=ndb.StringProperty(repeated=True)
    notifclientids=ndb.StringProperty(repeated=True)

class index:
    def GET(self):
        x=web.input()

        return render.index()

    def POST(self):
        x=web.input()
        q=user.query()
        results=q.fetch()

        for y in range(len(results)):
            if results[y].user==x.email:
                usr=results[y].key.get()
                usr.contacts.append(x.user)
                usr.put()
                return '<head><meta http-equiv="refresh" content="0; url=/" /></head>'

        userset = user(
            user=x.email
        )
        userset.contacts.append(x.user)
        set_key = userset.put()

        return '<head><meta http-equiv="refresh" content="0; url=/" /></head>'

class sendmsg:
    def POST(self):
        q=user.query()
        results=q.fetch()
        q2=msg.query().order(msg.number)
        results2=q2.fetch()
        x=web.input()

        try:
            msgnumber=results2[len(results2)-1].number+1
        except:
            msgnumber=0
        
        '''data = {
            "message":{
                "token" : "eY44lWSDApI:APA91bFOLd3-jQKiLGtXa36PNi5yzyion7Mx-E4JxU_l5szJ7x6DEuHSh40GGM4uML08BwKzxgtuQZwXHYM8AwUzJnakjeNiAJoeCoqdqHx3198zpdeISTnctbvpXZ_4jbt5NUOvxP0q",
                "notification":{
                    "body": "Hello World",
                    "title": "Hello"
                }
            }
        }
        
        
        httplib2.Http().request("https://fcm.googleapis.com/v1/projects/lightningchat-1/messages:send", method="POST", headers={"Authorization": "Bearer %s" % (get_at())}, body=json.dumps(data))
'''

        message_key = msg(
            emailto=x.to, emailfrom=x.email, message=x.message,  number=msgnumber
        )
        message_key.put()
        return json.dumps({'from':x.email,'to':x.to, 'msg':x.message})

class grabcontacts:
    def POST(self):
        x=web.input()
        q=user.query()
        results=q.fetch()
        usercontacts=[]
        darktheme=False
        oleddarktheme=False

        for y in range(len(results)):
            if results[y].user==x.email:
                usercontacts=results[y].contacts
                if results[y].dark_theme==True:
                    darktheme=True
                if results[y].noir==True:
                    oleddarktheme=True


        return json.dumps({"contacts":usercontacts, "dark":darktheme, "oleddark":oleddarktheme})

class grabmessages:
    def POST(self):
        x=web.input()
        try:
            q=msg.query(
                ndb.AND(
                    msg.emailto.IN([x.to, x.email]), 
                    msg.emailfrom.IN([x.to, x.email])
                ),
                msg.number>int(x.lastnumber)
            ).order(msg.number).fetch()
            for message in q:
                print message.emailto
        except:
            return "false"

        if len(q) == 0:
            return "false"
        else:
            print len(q)
        messages=[]
        messagesloc=[]
        lastnum=int(x.lastnumber)

        for y in range(len(q)):
            if (q[y].emailto==x.to) and  (q[y].emailfrom==x.email): # to
                messages.append(q[y].message)
                messagesloc.append(True)
                lastnum=q[y].number
            if (q[y].emailfrom==x.to) and (q[y].emailto==x.email): # from
                messages.append(q[y].message)
                messagesloc.append(False)
                lastnum=q[y].number

        count=len(messages)


        if count!=int(x.messagecount) or (count==0):
            return json.dumps({"messages":messages, "lastnum":lastnum, "loc":messagesloc})
        else:
            return "false"

class set:
    def POST(self):
        q=user.query()
        results=q.fetch()
        x=web.input()
        try:
            f=x.dark
            dtheme=True
        except:
            dtheme=False
        try:
            f2=x.noirmode
            noirtheme=True
        except:
            noirtheme=False
        for y in range(len(results)):
            if (results[y].user==x.email):
                users=results[y].key.get()
                users.dark_theme=dtheme
                users.noir=noirtheme
                users.put()
                return '<head><meta http-equiv="refresh" content="0; url=/" /></head>'

        userset = user(
            user=x.email, dark_theme=dtheme, noir=noirtheme
        )
        set_key = userset.put()
        return '<head><meta http-equiv="refresh" content="0; url=/" /></head>'

class delprof:
    def POST(self):
        x=web.input()
        q=user.query(user.user==x.email).fetch()
        print q
        q[0].key.delete()
        return "success"

class allownotifs:
    def POST(self):
        x = web.input()
        q = user.query().fetch()

        for y in range(len(q)):
            if q[y].user==x.email:
                users=q[y].key.get()
                idinids=False
                for z in range(0,len(users.notifclientids)):
                    if users.notifclientids[z]==x.notifid:
                        idinids=True
                if idinids!=True:
                    users.notifclientids.append(x.notifid)
                    users.put()
                return "successfully added notifs"

        y = user(
            user=x.email
        )
        y.notifclientids.append(x.notifid)
        y.put()

        return "successfully added notifs"

app=app.gaerun()