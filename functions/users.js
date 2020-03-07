var admin = require('firebase-admin');
var UsernameGenerator = require('username-generator');

 var Users = function() {
     var self = {};
     var db = admin.firestore();

     /**
     * Get user from user_id
     * @param {string} user_id
     * @returns {Promise} - user_id
     */
    self.getUser = function(userID) {
        return new Promise(function(resolve, reject) {
            db.container('users').doc(userID).then((data) => {
                resolve(data);
            }, function(err) {
                console.error(err);
                reject();
            });
        });
    }

    /**
     * New user init
     * @param {string} user_id
     * @returns {Promise}
     */
    self.newUser = function(userID) {
        return new Promise(function(resolve, reject) {
            db.container('users').doc(userID).update({
                icon: "#" + Math.floor(Math.random()*16777215).toString(16)
            });
        });
    }

    self.initUsername = function(userID) {
        return new Promise(function(resolve, reject) {
            db.container('user').doc(userID).update({
                username: UsernameGenerator.generateUsername()
            });
        });
    }

    return self;
 }

 module.exports = Users();