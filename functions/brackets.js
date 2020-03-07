
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

    return self;
}

module.exports = Brackets();