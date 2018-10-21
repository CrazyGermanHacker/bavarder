alreadyrunning=false

function sendfinished(){
    var jsparsed = JSON.parse(this.responseText)
    document.getElementById("messagefld").value="";
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
    request.open("POST", "/rscvmsgs")
    request.addEventListener("load", function(){
        if (this.responseText!="false"){
            var messages=JSON.parse(this.responseText)
            document.getElementById("lastnumber").value=messages.lastnum

            for (var i = 0; i<=messages.messages.length-1; i++){
                if (messages.loc[i]==true){
                    document.getElementById("messages").innerHTML+=
                        "<div class='wrapper3'><div></div><div></div><div class='card' style='border-radius:16px'>"+
                        messages.messages[i]+
                        "</div></div>";
                }
                else{
                    document.getElementById("messages").innerHTML+=
                        "<div class='wrapper3'><div class='card' style='border-radius:16px'>"+
                        messages.messages[i]+
                        "</div><div></div><div></div></div>";
                }
                if (document.getElementById("darktoggle").checked==true){
                    toggledark()
                }
            }
            document.getElementById("messages").scrollTop=document.getElementById("messages").scrollHeight
            if (document.getElementsByClassName("chat_screen")[0].style.right=="0%"){
                setTimeout( function(){
                    recieve()
                },
                300)
            }
        }
        else{
            if (document.getElementsByClassName("chat_screen")[0].style.right=="0%"){
                setTimeout( function(){
                    recieve()
                },
                300)
            }
        }
    })

    var f = document.getElementById("messagefield")
    document.getElementById("messagecount").value=document.getElementById("messages").children.length
    var fd = new FormData(f)

    request.send(fd)
}

function chat_action(name){
    document.getElementById("messages").innerHTML="";
    document.getElementById("messages").style.bottom=document.getElementsByClassName("wrappermsg")[0].height;
    document.getElementById("messages").style.top=48;
    document.getElementById("user").innerHTML=name;
    document.getElementById("toform").value=name;
    document.getElementsByClassName("chat_screen")[0].style.transition="0";
    document.getElementsByClassName("chat_screen")[0].style.right="0%";
    document.getElementsByClassName("chat_screen")[0].style.transition="all 0.3s cubic-bezier(.25,.8,.25,1)";
    console.log(parseInt(document.getElementById("lastnumber").value))
    document.getElementById("lastnumber").value=-1;
    recieve()
}
function back_chat_action(){
    document.getElementById("lastnumber").value=-1;
    document.getElementById("messages").innerHTML=" "
    document.getElementsByClassName("chat_screen")[0].style.right="-105%";
}
