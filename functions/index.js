const functions = require('firebase-functions');

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
    })
});

exports.generateBracket = functions.https.onRequest((req, res) => {
    Brackets.beginningGeneration().then(function(bracketID) {
        res.json(bracketID);
    }, function() {
        res.sendStatus(500);
    });
});

// exports.createUser = functions.firestore
//     .document('users/{userToken}')
//     .onCreate((snap, context) => {
//         Users.newUser(snap.data().)
//     });

exports.registerUser = functions.https.onRequest((req, res) => {
    Brackets.registerUser
})