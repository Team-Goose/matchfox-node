var admin = require('firebase-admin');

var serviceAccount = require("../secrets/serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://matchfoxdb.firebaseio.com"
});

modules.export = admin.firestore();
    