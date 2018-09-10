import web
from google.appengine.ext import ndb

urls=(
    "/", "index",
    "/sendmsg", "msg",
    "/changesetting", "set"
)

app=web.application(urls, globals())
render=web.template.render("templates/", base="layout")
users = []
messages= []

class msg(ndb.Model):
    emailto=ndb.StringProperty()
    emailfrom=ndb.StringProperty()
    message=ndb.StringProperty()

class user(ndb.Model):
    user=ndb.StringProperty()
    dark_theme=ndb.BooleanProperty()

class index:
    def GET(self):
        x=web.input(wtg="")
        q=user.query()
        results=q.fetch()

        return render.index(users, messages, x.wtg, prefs=results)

    def POST(self):
        x=web.input()
        users.append(x.user)
        return '<head><meta http-equiv="refresh" content="0; url=/" /></head>'

class msg:
    def POST(self):
        x=web.input()
        messages.append(x.message)
        return '<head><meta http-equiv="refresh" content="0; url=/?wtg=f" /></head>'

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