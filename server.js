console.log("Bump.");

// Libraries
var express = require('express'),
    firebase = require('firebase/app'),
    http = require('http'),
    path = require('path');

// My Scripts
var Users = require("./server/users");

console.log("Set.");

const app = express();

firebase.initializeApp({
    apiKey: "AIzaSyDHmk3WrWG-yVP1b0BH0Lw6fIQXZ3vEDeU",
    authDomain: "matchfoxdb.firebaseapp.com",
    databaseURL: "https://matchfoxdb.firebaseio.com",
    projectId: "matchfoxdb",
    storageBucket: "matchfoxdb.appspot.com",
    messagingSenderId: "874376032766",
    appId: "1:874376032766:web:3b2a1472dc0cc12d5910af",
    measurementId: "G-8KGEJ570FV"
});

app.use(express.static(path.join(__dirname, 'public')));

//-----------------------------
//    Internal Requests
//-----------------------------

app.get('/api/user/get', Users.handler.getUser);


//-----------------------------
//    Finally ...
//-----------------------------

app.use('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.listen(3000, () => console.log(`Matchfox listening on port ${port}`));
http.createServer(app).listen(8443);

console.log("Spike.")