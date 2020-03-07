var firebaseUtils = require('./utils/firebaseUtils');

var Brackets = function() {
    var self = {};

    self.handler = {
        generateBracket: function(req, res) {
            const users = req.data.users;
            self.generateBracket(users).then(function(bracket) {
                res.json(bracket);
            }, function(statusCode) {
                statusCode = statusCode || 500;
                res.sendStatus(statusCode);
            });
        },
        getUser: function(req, res) {
            const userID = req.body.userID;
            self.getUser(userID).then(function(user) {
                res.json(user);
            }, function(statusCode) {
                statusCode = statusCode || 500;
                res.sendStatus(statusCode);
            });
        }
    };

    /**
     * Generates a bracket from an array of user objects
     * @param {Object[]} users
     * @param {string} users[].user_id
     * @param {number} users[].seed
     * @returns {Object} bracket
     */
    self.generateBracket = function(users) {
        // var users = [
        //     {
        //         user_id: "adbeo23",
        //         seed: 1500
        //     }
        // ];
    
        // users[0].seed = 103;
        
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

module.exports = Brackets();