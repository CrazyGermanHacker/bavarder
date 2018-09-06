import web
from google.appengine.ext import ndb

urls=(
    "/", "index",
    "/settings", "settings",
    "/sendmsg", "msg"
)

app=web.application(urls, globals())
render=web.template.render("templates/", base="layout")
users = []
messages= []

class user(ndb.Model):
    user=ndb.StringProperty()
    dark_theme=ndb.BooleanProperty()

class index:
    def GET(self):
        x=web.input(wtg="")
        return render.index(users, messages, x.wtg)
    def POST(self):
        x=web.input()
        users.append(x.user)
        return self.GET()

class msg:
    def POST(self):
        x=web.input()
        messages.append(x.message)
        return '<head><meta http-equiv="refresh" content="0; url=/?wtg=f" /></head>'

class settings:
    def GET(self):
        return render.settings()

app=app.gaerun()