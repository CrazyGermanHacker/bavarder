function toggledark(){
    if (document.getElementById("noirmode").checked==false){
        document.getElementById("darktoggle").checked=true
        document.body.style.color="white"
        document.body.style.background="#2e2e2f"
        document.getElementById("messagefld").style.background="#252526"
        document.getElementById("messagefld").style.color="white"
        for (var i = 0; i<=document.getElementsByClassName("card").length-1; i++){ document.getElementsByClassName("card")[i].style.background="#252526"; }
        for (var i = 0; i<=document.getElementsByClassName("chatbutton").length-1; i++){ document.getElementsByClassName("chatbutton")[i].style.background="#252526"; }
        for (var i = 0; i<=document.getElementsByClassName("hdiconbtn").length-1; i++){ 
            document.getElementsByClassName("hdiconbtn")[i].style.background="#252526";
            document.getElementsByClassName("hdiconbtn")[i].style.color="white"; 
        }
        for (var i = 0; i<=document.getElementsByClassName("action").length-1; i++){ 
            document.getElementsByClassName("action")[i].style.background="#2e2e2f";
            document.getElementsByClassName("action")[i].style.color="white";
        }
        for (var i = 0; i<=document.getElementsByClassName("hd").length-1; i++){ 
            document.getElementsByClassName("hd")[i].style.background="#252526";
            document.getElementsByClassName("hd")[i].style.color="white";
        }
        document.getElementsByClassName("leftbtns")[0].style.background="#252526";
        document.getElementsByClassName("leftbtns")[0].style.color="white";
        document.getElementsByClassName("rightbtns")[0].style.background="#252526";
        document.getElementsByClassName("rightbtns")[0].style.color="white";
    }
    else{
        toggleamoleddark()
    }
}
function toggleamoleddark(){
    document.getElementById("darktoggle").checked=true
    document.body.style.color="white"
    document.body.style.background="#0d0d0d"
    document.getElementById("messagefld").style.background="black"
    document.getElementById("messagefld").style.color="white"
    for (var i = 0; i<=document.getElementsByClassName("card").length-1; i++){ document.getElementsByClassName("card")[i].style.background="black"; }
    for (var i = 0; i<=document.getElementsByClassName("chatbutton").length-1; i++){ document.getElementsByClassName("chatbutton")[i].style.background="black"; }
    for (var i = 0; i<=document.getElementsByClassName("hdiconbtn").length-1; i++){ 
        document.getElementsByClassName("hdiconbtn")[i].style.background="#0d0d0d";
        document.getElementsByClassName("hdiconbtn")[i].style.color="white"; 
    }
    for (var i = 0; i<=document.getElementsByClassName("action").length-1; i++){ 
        document.getElementsByClassName("action")[i].style.background="#0d0d0d";
        document.getElementsByClassName("action")[i].style.color="white";
    }
    for (var i = 0; i<=document.getElementsByClassName("hd").length-1; i++){ 
        document.getElementsByClassName("hd")[i].style.background="black";
        document.getElementsByClassName("hd")[i].style.color="white";
    }
    document.getElementsByClassName("leftbtns")[0].style.background="black";
    document.getElementsByClassName("leftbtns")[0].style.color="white";
    document.getElementsByClassName("rightbtns")[0].style.background="black";
    document.getElementsByClassName("rightbtns")[0].style.color="white";
}

function getusersettings(email){
    var request = new XMLHttpRequest()
    request.open("POST", "/user", async=true)
    request.addEventListener("load", function() {
        var prs = JSON.parse(this.responseText)
        console.log(prs)
        for (var x = 0; x<=prs.contacts.length-1; x++){
            var contact=prs.contacts[x]
            document.getElementById("users").innerHTML+='<div class="chatbutton" style="text-align: center" onclick="chat_action(\''+contact+'\')" id="'+contact+'">'+contact+'</div>'
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