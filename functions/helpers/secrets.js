var CryptoJS = require('crypto-js');
const secFil = require("../secrets.json");

var Secrets = function() {
    this.get = function(key) {
        return secFil[key];
    }
}

module.exports = Secrets;