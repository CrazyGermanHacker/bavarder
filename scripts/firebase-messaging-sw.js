importScripts("https://www.gstatic.com/firebasejs/5.5.4/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/5.5.4/firebase-messaging.js")

var config = {
    apiKey: "AIzaSyCfxMM6szjWuTkHX_U55VLA5OTTNhCRmHo",
    authDomain: "lightningchat-1.firebaseapp.com",
    databaseURL: "https://lightningchat-1.firebaseio.com",
    projectId: "lightningchat-1",
    storageBucket: "lightningchat-1.appspot.com",
    messagingSenderId: "878100810498"
};
firebase.initializeApp(config);

const messaging = firebase.messaging()

self.addEventListener('notificationclick', function(event) {
    console.log(event)
    sdr = event.notification.data.FCM_MSG.data.sender
    url = "/?sdr="+sdr
    if (event.action=="reply"){
        clients.openWindow(url)
    }
    event.notification.close();
})