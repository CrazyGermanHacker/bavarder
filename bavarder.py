import web
from google.appengine.ext import ndb

urls=(
    "/", "index"
)

app=web.application(urls, globals())
render=web.template.render("templates/", base="layout")
users = []

class index:
    def GET(self):
        return render.index(users)
    def POST(self):
        x=web.input()
        users.append(x.user)
        return self.GET()


app=app.gaerun()