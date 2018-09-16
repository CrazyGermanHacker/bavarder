function sendfinished(){
    var jsparsed = JSON.parse(this.responseText)
    document.getElementById("messagefld").value="";
    document.getElementById("messages").innerHTML+=
        "<div class='wrapper3'><div></div><div></div><div class='card' style='border-radius:16px'>"+jsparsed.msg+"</div></div>";
    toggledark()
}
function sendpushed(){
    return new Promise((resolve, reject) => {
        if (document.getElementById("messagefld").value!="") {
            resolve(document.getElementById("messagefld").value)
        }
        else{
            reject()
        }
    })
}
async function waittosend(){
    await sendpushed().then(function(message){
        var request = new XMLHttpRequest()
        request.open("POST", "/sendmsg", async=true)
        request.addEventListener("load", sendfinished)
        var f = document.getElementById("messagefield")
        var fd = new FormData(f)
        request.send(fd)
    })
}

function recieve(){
    request = new XMLHttpRequest()
    request.open("POST", "/rscvmsgs", async=true)
    request.addEventListener("load", function(){
        if (this.responseText!="false"){
            var messages=JSON.parse(this.responseText)
            document.getElementById("messages").innerHTML="";
            for (var i = 0; i<=messages.from.length-1; i++){
                document.getElementById("messages").innerHTML+=
                "<div class='wrapper3'><div></div><div></div><div class='card' style='border-radius:16px'>"+messages.from[i]+"</div></div>";
                toggledark()
            }
            for (var i = 0; i<=messages.to.length-1; i++){
                document.getElementById("messages").innerHTML+=
                "<div class='wrapper3'><div class='card' style='border-radius:16px'>"+messages.to[i]+"</div><div></div><div></div></div>";
                toggledark()
            }
        }
    })
    var f = document.getElementById("messagefield")
    document.getElementById("messagecount").value=document.getElementById("messages").children.length
    var fd = new FormData(f)
    request.send(fd)
    if (document.getElementsByClassName("chat_screen")[0].style.right=="0%"){
        setTimeout( function(){
            recieve()
        },
        300)
    }
}

function chat_action(name){
    document.getElementById("messages").innerHTML="";
    document.getElementById("user").innerHTML=name;
    document.getElementById("toform").value=name;
    document.getElementsByClassName("chat_screen")[0].style.transition="0";
    document.getElementsByClassName("chat_screen")[0].style.right="0%";
    document.getElementsByClassName("chat_screen")[0].style.transition="all 0.3s cubic-bezier(.25,.8,.25,1)";
    request = new XMLHttpRequest()
    request.open("POST", "/rscvmsgs", async=true)
    request.addEventListener("load", function(){
        var messages=JSON.parse(this.responseText)
        console.log(
            messages
        )
        for (var i = 0; i<=messages.from.length-1; i++){
            document.getElementById("messages").innerHTML+=
            "<div class='wrapper3'><div></div><div></div><div class='card' style='border-radius:16px'>"+messages.from[i]+"</div></div>";
            toggledark()
        }
        for (var i = 0; i<=messages.to.length-1; i++){
            document.getElementById("messages").innerHTML+=
            "<div class='wrapper3'><div class='card' style='border-radius:16px'>"+messages.to[i]+"</div><div></div><div></div></div>";
            toggledark()
        }
    })
    document.getElementById("messagecount").value=document.getElementById("messages").children.length
    var f = document.getElementById("messagefield")
    var fd = new FormData(f)
    request.send(fd)
    recieve()
}
function back_chat_action(){
    document.getElementsByClassName("chat_screen")[0].style.right="-100%";
}