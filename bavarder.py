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

class sendmsg:
    def POST(self):
        x=web.input()
        message_key = msg(
            emailto=x.to, emailfrom=x.email, message=x.message 
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
        q=msg.query()
        results=q.fetch()
        messagesto=[]
        messagesfrom=[]

        for y in range(len(results)):
            if (results[y].emailto==x.to) and (results[y].emailfrom==x.email):
                messagesto.append(results[y].message)
            if (results[y].emailfrom==x.to)and (results[y].emailto==x.email):
                messagesfrom.append(results[y].message)

        count=len(messagesto)+len(messagesfrom)

        print count, int(x.messagecount)
        if count!=int(x.messagecount) or count==0:
            return json.dumps({"to":messagesto, "from":messagesfrom})
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