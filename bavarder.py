import web
import json
import os
import sendmsg
import httplib2
import urllib3
from oauth2client.service_account import ServiceAccountCredentials
from google.appengine.ext import ndb
from google.appengine.api import app_identity

def get_at():
    a=ServiceAccountCredentials.from_json_keyfile_dict(sendmsg.kfdict, "https://www.googleapis.com/auth/firebase.messaging")
    at=a.get_access_token()
    return at.access_token

urls=(
    "/", "index",
    "/sendmsg", "sendmesg",
    "/user","grabcontacts",
    "/rscvmsgs", "grabmessages",
    "/changesetting", "set",
    "/delprof", "delprof",
    "/associateprof", "allownotifs",
)

app=web.application(urls, globals())
render=web.template.render("templates/")

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
        x=web.input(sdr="")
        return render.index(x.sdr)

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

class sendmesg:
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

        nids = []

        for person in results:
            if person.user == x.to:
                for ids in person.notifclientids:
                    nids.append(ids)

        http = httplib2.Http()

        for item in nids:

            data = {
                'message':{
                    'token' : '{0}'.format(item),
                    'notification':{
                        'body': '{0}'.format(x.message),
                        'title': '{0}'.format(x.email),
                    },
                    'data':{
                        'sender': '{0}'.format(x.email),
                    },
                    'webpush': {
                        'fcm_options':{
                            'link': 'https://bavarder.app',
                        },
                        'notification':{
                            'actions':[
                                {
                                    'action': 'reply',
                                    'title': 'Reply'
                                }
                            ],
                            'badge': '/notificon.ico'
                        }
                    }
                },
            }

            auth = "Bearer " + get_at()


            r = http.request(
                uri="https://fcm.googleapis.com/v1/projects/lightningchat-1/messages:send",
                method="POST",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": auth
                },
                body=str(data)
            )
            print r


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
        except:
            return "false"

        if len(q) == 0:
            return "false"
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