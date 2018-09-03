from web.template import CompiledTemplate, ForLoop, TemplateResult


# coding: utf-8
def index(users):
    __lineoffset__ = -4
    loop = ForLoop()
    self = TemplateResult(); extend_ = self.extend
    extend_([u'<div class="hd wrapper3">\n'])
    extend_([u'    <div style="text-align: left;">\n'])
    extend_([u'        <button style="background: white; border: 0 none; color: black; box-shadow: 0 0 0 white; padding: 0; margin: 0;"  onclick="show_signin_card()"><i class="material-icons" style="font-size: 32px;">person</i></button>\n'])
    extend_([u'        <div  style="left: 16px; position: fixed; display: none; top: 48px" id="gsignininfo">\n'])
    extend_([u'            <div class="g-signin2" data-onsuccess="onSignIn" data-theme="light"></div>\n'])
    extend_([u'        </div>\n'])
    extend_([u'    </div>\n'])
    extend_([u'    <h2 style="text-align: center;">Bavarder</h2>\n'])
    extend_([u'    <div style="text-align: right;">\n'])
    extend_([u'        <i class="material-icons" style="font-size: 32px;" onclick="show_info_cards()">more_vert</i>\n'])
    extend_([u'        <div class="info" id="info" onclick="window.location.href = \'https://github.com/storm246/bavarder\'">\n'])
    extend_([u'            Visit Github\n'])
    extend_([u'        </div>\n'])
    extend_([u'    </div>\n'])
    extend_([u'</div>\n'])
    extend_([u'\n'])
    extend_([u'<div class="scroll" onscroll="osc(0,0)">\n'])
    extend_([u'    <div class="chatbutton" style="color: #d32f2f; text-align: center;" onclick="add_chat_action()">\n'])
    extend_([u'        <h3><i class="material-icons" style="font-size: 32px">add_circle</i>Add Chat</h3>\n'])
    extend_([u'    </div>\n'])
    for x in loop.setup(range(len(users))):
        extend_(['    ', u'<div class="chatbutton" style="text-align: center;" onclick="chat_action(\'', escape_(users[x], True), u'\')">\n'])
        extend_(['    ', u'    <h3>', escape_(users[x], True), u'</h3>\n'])
        extend_(['    ', u'</div>\n'])
    extend_([u'</div>\n'])
    extend_([u'\n'])
    extend_([u'<div class="add_chat_screen">\n'])
    extend_([u'    <div class="hd">\n'])
    extend_([u'        <h2><i class="material-icons" style="font-size: 32px" onclick="back_add_chat_action()">arrow_back</i>Add Chat</h2>\n'])
    extend_([u'    </div>\n'])
    extend_([u'    <div class="card">\n'])
    extend_([u'        <form id="add_form" action="/" method="POST">\n'])
    extend_([u'            <input type="text" name="user" placeholder="username" id="unameip" />\n'])
    extend_([u'            <br />\n'])
    extend_([u'            <br />\n'])
    extend_([u'        </form>\n'])
    extend_([u'        <button id="add_btn" style="background: lightgrey; color: black" onclick="sub_add_form()" disabled><b>ADD</b></button>\n'])
    extend_([u'    </div>\n'])
    extend_([u'</div>\n'])
    extend_([u'\n'])
    extend_([u'<div class="chat_screen">\n'])
    extend_([u'    <div class="hd">\n'])
    extend_([u'        <h2><i class="material-icons" style="font-size: 32px" onclick="back_chat_action()">arrow_back</i><b id="user"></b></h2>\n'])
    extend_([u'    </div>\n'])
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
    extend_([u'        <link href="https://fonts.googleapis.com/css?family=Poppins:200" rel="stylesheet">\n'])
    extend_([u'        <link href="/material.css" type="text/css" rel="stylesheet">\n'])
    extend_([u'        <link rel="manifest" href="/manifest.webmanifest">\n'])
    extend_([u'        <meta name="google-signin-scope" content="profile email">\n'])
    extend_([u'        <meta name="google-signin-client_id" content="878100810498-2vuvkmjq280vou2p2l5ksatl1ai39qpa.apps.googleusercontent.com">\n'])
    extend_([u'        <script src="https://apis.google.com/js/platform.js" async defer></script>\n'])
    extend_([u'        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n'])
    extend_([u'        <meta name="viewport" content="width=device-width, initial-scale=1">\n'])
    extend_([u'        <script src="/bavarder.js"></script>\n'])
    extend_([u'    </head>\n'])
    extend_([u'    <body>\n'])
    extend_([u'        ', escape_(content, False), u'\n'])
    extend_([u'    </body>\n'])
    extend_([u'</html>\n'])

    return self

layout = CompiledTemplate(layout, 'templates/layout.html')
join_ = layout._join; escape_ = layout._escape

