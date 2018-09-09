function toggledark(){
    document.body.style.color="white"
    document.body.style.background="#090909"
    document.getElementsByClassName("info")[0].style.background="#090909"
    document.getElementById("info0").style.background="black"
    document.getElementById("info0").style.color="white"
    document.getElementById("info1").style.background="black"
    document.getElementById("info1").style.color="white"
    document.getElementById("messagefld").style.background="black"
    document.getElementById("messagefld").style.color="white"
    document.getElementsByClassName("messagebar")[0].style.background="black"
    document.getElementsByClassName("wrappermsg")[0].style.background="#090909"
    for (var i = 0; i<=document.getElementsByClassName("card").length-1; i++){ document.getElementsByClassName("card")[i].style.background="black"; }
    for (var i = 0; i<=document.getElementsByClassName("hdiconbtn").length-1; i++){ 
        document.getElementsByClassName("hdiconbtn")[i].style.background="black";
        document.getElementsByClassName("hdiconbtn")[i].style.color="white"; 
    }
    for (var i = 0; i<=document.getElementsByClassName("action").length-1; i++){ 
        document.getElementsByClassName("action")[i].style.background="#090909";
        document.getElementsByClassName("action")[i].style.color="white";
    }
}