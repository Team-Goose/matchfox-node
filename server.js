const express = require('express');
const firebase = ('firebase/app');

const app = express();
const port = 3000;

app.use(express.static('public'));

// Other routes here.


app.listen(port, () => console.log(`Matchfox listening on port ${port}`));


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