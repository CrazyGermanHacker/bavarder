import web

urls=(
    "/", "index"
)

app=web.application(urls, globals())
render=web.template.render("templates/", base="layout")
users = [
    "Sample Human 1",
    "Sample Human 2",
    "Sample Human 3",
    "Sample Human 4",
    "Sample Human 5",
    "Sample Human 6",
    "Sample Human 7",
    "Sample Human 8",
    "Sample Human 9",
    "Sample Human 10",
    "Sample Human 11",
    "Sample Human 12",
    "Sample Human 13",
    "Sample Human 14",
    "Sample Human 15",
]

class index:
    def GET(self):
        return render.index(users)

app=app.gaerun()