const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require('./secrets.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://matchfoxdb.firebaseio.com"
});
const Brackets = require('./brackets');
const Users = require('./users');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.getBracket = functions.https.onRequest((req, res) => {
    var bracketID =  req.body.bracketID;
    Brackets.getBracket(bracketID).then(function(bracket) {
        res.json(bracket);
    }, function() {
        res.sendStatus(500);
    });
});

exports.generateBracket = functions.https.onRequest((req, res) => {
    Brackets.generateBracket().then(function(bracket) {
        res.json(bracket);
    }, function() {
        res.sendStatus(500);
    });
});

exports.createBracket = functions.https.onRequest((req, res) => {
    Brackets.initBracket().then(function(bracketID) {
        res.json(bracketID);
    }, function() {
        res.sendStatus(500);
    });
});

exports.getBrackets = functions.https.onRequest((req, res) => {
    Brackets.bracketList().then(function(brackets) {
        res.json(brackets);
    }, function() {
        res.sendStatus(500);
    });
});

// exports.createUser = functions.auth.user().onCreate((user) => {
//     Users.newUser(user.id);
// });

exports.setUsername = functions.https.onRequest((req, res) => {
    var id = req.body.data.id;
    var username = req.body.data.username;
    Users.initUsername(id, username).then(function() {
        res.sendStatus(200);
    }, function() {
        res.sendStatus(500);
    });
});

exports.registerUser = functions.https.onRequest((req, res) => {
    var userID = req.body.userID;
    var bracketID = req.body.bracketID;
    Brackets.registerUser(bracketID, userID).then(function() {
        res.sendStatus(200);
    }, function() {
        res.sendStatus(500);
    })
});

exports.getUser = functions.https.onRequest((req, res) => {
    var userID = req.body.userID;
    Users.getUser(userID).then(function(user) {
        res.json(user);
    }, function() {
        res.sendStatus(500);
    });
});

exports.getMatch = functions.https.onRequest((req, res) => {
    var bracketID = req.body.bracketID;
    var matchID = req.body.matchID;
    Brackets.getMatch(bracketID, matchID).then((match) => {
        res.json(match);
    }, function() {
        res.sendStatus(500);
    });
});

exports.reportMatch = functions.https.onRequest((req, res) => {
    var bracketID = req.body.bracketID;
    var matchID = req.body.matchID;
    var match = req.body.match;
    Brackets.reportMatch(bracketID, matchID).then(function() {
        res.sendStatus(200);
    }, function() {
        res.sendStatus(500);
    });
});