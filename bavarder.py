import web
import json
from google.appengine.ext import ndb

urls=(
    "/", "index",
    "/sendmsg", "sendmsg",
    "/user","grabcontacts",
    "/rscvmsgs", "grabmessages",
    "/changesetting", "set"
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

app=app.gaerun()