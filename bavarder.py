import web
import json
from google.appengine.ext import ndb

urls=(
    "/", "index",
    "/sendmsg", "msg",
    "/changesetting", "set"
)

app=web.application(urls, globals())
render=web.template.render("templates/", base="layout")
messages=[]

class msg(ndb.Model):
    emailto=ndb.StringProperty()
    emailfrom=ndb.StringProperty()
    message=ndb.StringProperty()

class user(ndb.Model):
    user=ndb.StringProperty()
    dark_theme=ndb.BooleanProperty()
    contacts=ndb.StringProperty(repeated=True)

class index:
    def GET(self):
        x=web.input(wtg="")
        q=user.query()
        results=q.fetch()

        return render.index(messages, x.wtg, prefs=results)

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

class msg:
    def POST(self):
        x=web.input()
        
        return json.dumps({'from':x.email,'to':x.to, 'msg':x.message})

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
        for y in range(len(results)):
            if (results[y].user==x.email):
                users=results[y].key.get()
                users.dark_theme=dtheme
                users.put()
                return '<head><meta http-equiv="refresh" content="0; url=/" /></head>'

        userset = user(
            user=x.email, dark_theme=dtheme
        )
        set_key = userset.put()
        return '<head><meta http-equiv="refresh" content="0; url=/" /></head>'

app=app.gaerun()