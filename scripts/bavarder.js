currentscr=0
if ('serviceWorker' in navigator) {
window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js', {updateViaCache: 'none'}).then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
        });
    });
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
            document.getElementsByClassName("bottomnav")[y].style.bottom="0"
        }
        else{
            document.getElementsByClassName("bottomnav")[y].style.bottom="-64"
        }
        currentscr=document.getElementsByClassName("scroll")[x].scrollTop
    }
}
function show_info_cards() {
    if (document.getElementById("info").style.display=="none"){
        document.getElementById("info").style.display= "inline";
    }else{
        document.getElementById("info").style.display= "none";
    }
}
function show_signin_card() {
    if (document.getElementById("gsignininfo").style.display=="none"){
        document.getElementById("gsignininfo").style.display= "inline";
    }else{
        document.getElementById("gsignininfo").style.display= "none";
    }
}