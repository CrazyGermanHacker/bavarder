if ('serviceWorker' in navigator) {
window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js', {updateViaCache: 'none'}).then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
        });
    });
}
  

function add_chat_action(){
    document.getElementsByClassName("add_chat_screen")[0].style.bottom="0%";
}
function back_add_chat_action(){
    document.getElementsByClassName("add_chat_screen")[0].style.bottom="-100%";
    document.getElementById("unameip").value="";
}
function chat_action(name){
    document.getElementById("user").innerHTML=name;
    document.getElementsByClassName("chat_screen")[0].style.right="0%";
}
function back_chat_action(){
    document.getElementsByClassName("chat_screen")[0].style.right="-100%";
}
function osc(x,y){
    if (document.getElementsByClassName("scroll")[x].scrollTop==0) {
        document.getElementsByClassName("hd")[y].style.boxShadow="#000000 0 0 0"
    } else {
        document.getElementsByClassName("hd")[y].style.boxShadow="#00000061 0 2px 4px"
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
function onSignIn(googleUser){
        // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
};