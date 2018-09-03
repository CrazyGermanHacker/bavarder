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
function back_chat_action(){
    document.getElementsByClassName("add_chat_screen")[0].style.bottom="-100%";
    document.getElementById("unameip").value="";
}