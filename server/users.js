const firebaseUtils = require('./utils/firebaseUtils');

 var Users = function() {
     var self = {};

     self.handler = {
        getUser: function(req, res) {
            const userID = req.body.userID;
            self.getUser(userID).then(function(user) {
                res.json(user);
            }, function(statusCode) {
                statusCode = statusCode || 500;
                res.sendStatus(statusCode);
            });
        }
     }

     /**
     * Get user from user_id
     * @param {string} user_id
     * @returns {Promise} - user_id
     */
    self.getUser = function(userID) {
        return new Promise(function(resolve, reject) {
            firebaseUtils.getSingleData("users", userID).then((data) => {
                resolve(data);
            }, function(err) {
                console.error(err);
                reject();
            });
        });
    }

    return self;
 }

 module.exports = Users();