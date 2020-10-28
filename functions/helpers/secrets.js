var CryptoJS = require('crypto-js');
var argv = require('minimist')(process.argv.slice(2));

const secFil = require("../secrets.json");

var Secrets = function() {
    this.get = function(key) {
        var encrypted = secFil[key];
        return this.decrypt(encrypted, argv.crypt);
    }

    this.encrypt = function(secret, key) {
        return CryptoJS.AES.encrypt(secret, key);
    }

    this.decrypt = function(secret, key) {
        return CryptoJS.AES.decrypt(secret, key);
    }
}

module.exports = Secrets;