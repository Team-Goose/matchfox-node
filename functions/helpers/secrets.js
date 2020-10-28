var CryptoJS = require('crypto-js');
const secFil = require("../secrets.json");

var Secrets = function() {
    this.get = function(key) {
    this.decrypt = function(secret, key) {
        return CryptoJS.AES.decrypt(secret, key);
    }
}

module.exports = Secrets;