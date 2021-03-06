currentscr=0
var installbtn
var notifs = []

if (navigator.onLine!=true) {
    console.log("offline")
}

window.addEventListener(("load"), function() {
    installbtn=document.getElementById("installbutton")
    addbtn=document.getElementById("add_chat_fab")
    let stashedprompt
    for (var x = 0; x<=document.getElementsByTagName("button").length-1; x++){
        var btn = document.getElementsByTagName("button")[x]
        document.getElementsByTagName("button")[x].addEventListener("mousedown", function () {
            btn.style.background="#ff6659" 
            btn.style.boxShadow="0 3px 6px #00000061"
        })
        document.getElementsByTagName("button")[x].addEventListener("mouseup", function () {
            btn.style.background="#d32f2f" 
            btn.style.boxShadow="0 1px 2px #00000061"
        })
        document.getElementsByTagName("button")[x].addEventListener("mouseout", function () {
            btn.style.background="#d32f2f" 
            btn.style.boxShadow="0 1px 2px #00000061"
        })
        document.getElementsByTagName("button")[x].addEventListener("touchstart", function () {
            btn.style="background-color: #ff6659; box-shadow: 0 3px 6px #00000061;"
        })
        document.getElementsByTagName("button")[x].addEventListener("touchend", function () {
            btn.style=""
        })
    }


    window.addEventListener("beforeinstallprompt", (event)=>{
        event.preventDefault();

        stashedprompt=event
        if (window.innerWidth<596){
            document.getElementById("installtext").style.display="none"
            document.getElementById("installicon").style="margin: 0px; margin-right: 2px;"
        }
        installbtn.style.display="inline-block"
    })

    installbtn.addEventListener("click", (event) => {
        installbtn.style.display="none"

        stashedprompt.prompt()

        stashedprompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                stashedprompt = null;
            })
    })
})

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        })
    });
}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function requestnotifs(messaging) {
    messaging.requestPermission()
    .then(function() {
        console.log("granted")
        return messaging.getToken()
    })
    .then(function(token) {
        document.getElementById("notifid").value=token

        var request = new XMLHttpRequest()
        request.open("POST", "/associateprof", async=true)
        var f = document.getElementById("add_form")
        var em = new FormData(f)
        request.send(em)
    })
    .catch(function(err) {
        console.log("error")
    })
}

function isformchanged(){
    return new Promise((resolve, reject) => {
        if ((document.getElementById("unameip").value!="") && (document.getElementById("unameip").value!=null)){
            resolve()
        }
        else{
            reject()
        }
    })
}

async function allowbtnclick(){
    await isformchanged().then(function() {
        document.getElementById("add_btn").style.background="#d32f2f";
        document.getElementById("add_btn").style.color="white";
        document.getElementById("add_btn").disabled = false;
        setTimeout( function(){
            allowbtnclick()
        },
        300)
    }, function() {
        document.getElementById("add_btn").style="background: lightgrey; color: black"
        document.getElementById("add_btn").disabled = true;
        setTimeout( function(){
            allowbtnclick()
        },
        300)
    })
}

function add_chat_action(){
    document.getElementsByClassName("add_chat_screen")[0].style.bottom="0%";
    allowbtnclick()
}
function back_add_chat_action(){
    document.getElementsByClassName("add_chat_screen")[0].style.bottom="-100%";
    document.getElementById("unameip").value="";
}
function osc(x,y){
    if (x!=0){
        if (document.getElementsByClassName("scroll")[x].scrollTop==0) {
            document.getElementsByClassName("hd")[y].style.boxShadow="#000000 0 0 0"
        } else {
            document.getElementsByClassName("hd")[y].style.boxShadow="#00000061 0 2px 4px"
        }
    }
    else{
        if (currentscr>document.getElementsByClassName("scroll")[x].scrollTop){
            document.getElementsByClassName("bottomnav")[y].style.bottom="0px"
            
            document.getElementById("add_chat_fab_text").style.display="inline"
            document.getElementById("add_chat_fab").style="margin-right: -80; right: 50%;"
            if (document.getElementsByClassName("scroll")[0].scrollTop>=36){
                document.getElementById("search_fab").style.bottom="72px"
            }
        }
        else{
            document.getElementsByClassName("bottomnav")[y].style.bottom="-64px"            
            document.getElementById("add_chat_fab_text").style.display="none"
            document.getElementById("add_chat_fab").style="margin-right: 0; right: 24px; bottom: 24px;"
            if (document.getElementsByClassName("scroll")[0].scrollTop>=36){
                document.getElementById("search_fab").style.bottom="96px"
                document.getElementById("search_fab").style.right="24px"
            }
        }
        if (document.getElementsByClassName("scroll")[0].scrollTop<36){
            document.getElementById("search_fab").style.right="-64px"
        }
        currentscr=document.getElementsByClassName("scroll")[x].scrollTop
    }
}

function showprofile() {
    document.getElementsByClassName("profile")[0].style.left="0%";
}
function back_profile() {
    document.getElementsByClassName("profile")[0].style.left="-105%";
}
function opendeletecon() {
    document.getElementsByClassName("deletecon")[0].style.display="inline-block"
    document.getElementsByClassName("dialogue")[0].style.display="inline-block"
}
function hidedeletecon() {
    document.getElementsByClassName("deletecon")[0].style.display="none"
    document.getElementsByClassName("dialogue")[0].style.display="none"
}



// notification screen

function notifAction() {
    document.getElementById("notif_screen").style.right="0%"
    document.getElementById("ctnotifs").innerHTML=""
    for (var i = 0; i<notifs.length; i++) {
        document.getElementById("ctnotifs").innerHTML+=
            "<div class='card'><h3>"+notifs[i].notification.title+"<h3><p>"+notifs[i].notification.body+"</p></div>"
    }
}

function back_notifs_action() {
    document.getElementById("notif_screen").style.right="-105%"
}

function addtonotifs(msg) {
    notifs[notifs.length]=msg
}


// signin

var a
function signn(auth) {
    a = auth;
}

function signin() {
    email=document.getElementById("emailuser").value
    password=document.getElementById("pswd").value
    console.log("test")
    a.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
        return a.signInWithEmailAndPassword(email, password).then(
            function() {
                console.log("Signed In")
            }
        ).catch(function(err) {
            document.getElementById("verifmessage").style.display="inline"
            document.getElementById("verifmessage").innerText="User doesn't exist."
            showprofile();
            console.log(err.message)
        })
    })
    .catch(function(error) {
        console.log(error.message)
    })
}