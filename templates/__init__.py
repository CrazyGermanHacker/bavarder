from web.template import CompiledTemplate, ForLoop, TemplateResult


# coding: utf-8
def index():
    __lineoffset__ = -5
    loop = ForLoop()
    self = TemplateResult(); extend_ = self.extend
    extend_([u'<div class="hd">\n'])
    extend_([u'    <h2>Bavarder</h2>\n'])
    extend_([u'</div>\n'])

    return self

index = CompiledTemplate(index, 'templates/index.html')
join_ = index._join; escape_ = index._escape

# coding: utf-8
def layout(content):
    __lineoffset__ = -4
    loop = ForLoop()
    self = TemplateResult(); extend_ = self.extend
    extend_([u'<html>\n'])
    extend_([u'    <head>\n'])
    extend_([u'        <title>Bavarder</title>\n'])
    extend_([u'        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">\n'])
    extend_([u'        <link href="/material.css" type="text/css" rel="stylesheet">\n'])
    extend_([u'        <link rel="manifest" href="/manifest.webmanifest">\n'])
    extend_([u'        <meta name="viewport" content="width=device-width, initial-scale=1">\n'])
    extend_([u'    </head>\n'])
    extend_([u'    <body>\n'])
    extend_([u'        ', escape_(content, False), u'\n'])
    extend_([u'    </body>\n'])
    extend_([u'</html>\n'])

    return self

layout = CompiledTemplate(layout, 'templates/layout.html')
join_ = layout._join; escape_ = layout._escape

