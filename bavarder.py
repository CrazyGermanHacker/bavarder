import web

urls=(
    "/", "index"
)

app=web.application(urls, globals())
render=web.template.render("templates/", base="layout")

class index:
    def GET(self):
        return render.index()

app=app.gaerun()