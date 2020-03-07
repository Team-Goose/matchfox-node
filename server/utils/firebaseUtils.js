var admin = require('firebase-admin');

var firebaseUtils = function() {
    var self = {};

    var serviceAccount = require("../secrets/serviceAccountKey.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://matchfoxdb.firebaseio.com"
    });
    
    let db = admin.filestore();
    
    /**
     * Gets single data object from firebase
     * @param {string} collection
     * @param {string} document
     * @returns {Promise}
     */
    self.getSingleData = function(collection, document) {
        return new Promise(function(resolvel, reject) {
            var docRef = db.collection(collection).doc(document);
            docRef.get().then(doc => {
                if(doc.exists) {
                    resolve(doc.data());
                } else {
                    resolve({});
                }
            }).catch(err => {
                console.error(err);
                reject(err);
            });
        });
    }
    
    return self;
}

module.exports = firebaseUtils();