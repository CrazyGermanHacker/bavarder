var contacts

window.addEventListener("load", function () {
    if (navigator.onLine!=true){
        var stored = localStorage['contacts']
        contacts = JSON.parse(stored)
        for (var x = 0; x<=contacts.length-1; x++){
            var contact=contacts[x]
            document.getElementById("users").innerHTML+=
                '<div class="chatbutton" style="padding: 16px; display: flex; align-items: center; justify-content: center" onclick="chat_action(\''
                +contact.name+'\')" id="'+contact.name+'"></div>'
            if (contact.image){
                document.getElementById(contact.name).innerHTML=
                    '<img src="'+contact.image+'" style="width: 64px; margin-right: 8px;" /><span style="">'+contact.name+'</span>'   
            }
            else{
                document.getElementById(contact.name).innerHTML=
                    '<span style="">'+contact.name+'</span>'   
            }
        }
    }
  
})
function toggledark(){
    if (document.getElementById("noirmode").checked==false){
        document.getElementById("darktoggle").checked=true
        document.body.style.color="white"
        document.body.style.background="#2e2e2f"
        document.getElementById("messagefld").style.background="#252526"
        document.getElementById("messagefld").style.color="white"
        document.getElementById("versionnum").style.color="white"
        document.getElementById("searchinput").style.color="white"
        document.getElementsByClassName("dialogue")[0].style.background="#252526"
        for (var i = 0; i<=document.getElementsByClassName("card").length-1; i++){ document.getElementsByClassName("card")[i].style.background="#252526"; }
        for (var i = 0; i<=document.getElementsByClassName("chatbutton").length-1; i++){ document.getElementsByClassName("chatbutton")[i].style.background="#252526"; }
        for (var i = 0; i<=document.getElementsByClassName("action").length-1; i++){ 
            document.getElementsByClassName("action")[i].style.background="#2e2e2f";
            document.getElementsByClassName("action")[i].style.color="white";
        }
        for (var i = 0; i<=document.getElementsByClassName("hd").length-1; i++){ 
            document.getElementsByClassName("hd")[i].style.background="#252526";
            document.getElementsByClassName("hd")[i].style.color="white";
        }
    }
    else{
        toggleamoleddark()
    }
}
function toggleamoleddark(){
    document.getElementById("darktoggle").checked=true
    document.body.style.color="white"
    document.body.style.background="#121212"
    document.getElementById("messagefld").style.background="black"
    document.getElementById("versionnum").style.color="white"
    document.getElementById("messagefld").style.color="white"
    document.getElementById("searchinput").style.color="white"
    document.getElementsByClassName("dialogue")[0].style.background="#252526"
    for (var i = 0; i<=document.getElementsByClassName("card").length-1; i++){ document.getElementsByClassName("card")[i].style.background="black"; }
    for (var i = 0; i<=document.getElementsByClassName("chatbutton").length-1; i++){ document.getElementsByClassName("chatbutton")[i].style.background="black"; }
    for (var i = 0; i<=document.getElementsByClassName("action").length-1; i++){ 
        document.getElementsByClassName("action")[i].style.background="#121212";
        document.getElementsByClassName("action")[i].style.color="white";
    }
    for (var i = 0; i<=document.getElementsByClassName("hd").length-1; i++){ 
        document.getElementsByClassName("hd")[i].style.background="black";
        document.getElementsByClassName("hd")[i].style.color="white";
    }
}

function getusersettings(email){
    var request = new XMLHttpRequest()
    request.open("POST", "/user", async=true)
    request.addEventListener("load", function() {
        var prs = JSON.parse(this.responseText)
        console.log(prs)
        localStorage['contacts'] = JSON.stringify(prs.contacts)
        contacts = prs.contacts
        for (var x = 0; x<=prs.contacts.length-1; x++){
            var contact=prs.contacts[x]
            for (var i = 0; i<=100; i++) {
                document.getElementById("users").innerHTML+=
                '<div class="chatbutton" style="padding: 16px; display: flex; align-items: center; justify-content: center" onclick="chat_action(\''
                +contact.name+'\')" id="'+contact.name+'"></div>'
                if (contact.image){
                    document.getElementById(contact.name).innerHTML=
                        '<img src="'+contact.image+'" style="width: 64px; margin-right: 8px;" /><span style="">'+contact.name+'</span>'   
                }
                else{
                    document.getElementById(contact.name).innerHTML=
                        '<span style="">'+contact.name+'</span>'   
                }   
            }
        }
        if (prs.oleddark==true){
            document.getElementById("noirmode").checked=true;
        }
        if (prs.dark==true){
            toggledark()
        }
    })

    var f = document.getElementById("add_form")
    var em = new FormData(f)

    request.send(em)

}

function opensettings(){
    document.getElementsByClassName("settings_screen")[0].style.right="0%";
}
function back_settings_action(){
    document.getElementsByClassName("settings_screen")[0].style.right="-105%";
}

function deleteprof() {
    var request = new XMLHttpRequest()
    request.open("POST", "/delprof", async=true)

    request.addEventListener("load", function() {
        window.location.reload()
    })

    var f = document.getElementById("add_form")
    var em = new FormData(f)

    request.send(em)
    signOut()
}  

function addprof(){
    var request = new XMLHttpRequest()
    request.open("POST", "/makeuser", async=true)

    var f = document.getElementById("add_form")
    var em = new FormData(f)

    request.send(em)
}

// search functions

function openSearch() {
    document.getElementById("search").style.right="0%";
    search()
}

function backSearch() {
    document.getElementById("search").style.right="-105%";
}


function sendmatch() {
    return new Promise((resolve, reject) => {
        res = []
        if (document.getElementById("searchinput").value!=''){
            for (var i = 0; i<contacts.length; i++){
                nm = contacts[i].name
                val = document.getElementById("searchinput").value;
                if (nm.indexOf(val.toLowerCase())>=0){
                    res[res.length]=nm
                }
            }
            resolve(res)  
        }
        else {
            for (var i = 0; i<contacts.length; i++){
                nm = contacts[i].name
                res[res.length]=nm
            }
            reject(res) 
        }
    })
}

async function search() {
    await sendmatch().then(function(res) {
        document.getElementById("results").innerHTML = " "
        for (var i = 0; i<res.length; i++) {
            document.getElementById("results").innerHTML += '<div class="card" style="padding-top: 16px; padding-bottom: 16px;" onclick="chat_action(\''+res[i]+'\')">'+res[i]+'</div>'
        }
        if (document.getElementById("darktoggle").checked==true){
            toggledark()
        }
    }).catch(function (res) {
        document.getElementById("results").innerHTML = " "
        for (var i = 0; i<res.length; i++) {
            document.getElementById("results").innerHTML 
                += '<div class="card" style="padding-top: 16px; padding-bottom: 16px;" onclick="chat_action(\''+res[i]+'\')">'+res[i]+'</div>'
        }
        if (document.getElementById("darktoggle").checked==true){
            toggledark()
        }
    })
    setTimeout(function () {
        if (document.getElementById("search").style.right=="0%"){
            search()
        }
    }, 300)
}