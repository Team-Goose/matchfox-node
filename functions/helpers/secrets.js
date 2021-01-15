var CryptoJS = require('crypto-js');


var Secrets = function(argv) {
    const secFil = require("../secrets.json");
    const crypt = argv.crypt;

    this.get = function(key) {
        var encrypted = secFil[key];
        return this.decrypt(encrypted, crypt);
    }

    this.encrypt = function(secret, key) {
        return CryptoJS.AES.encrypt(secret, key);
    }

    this.decrypt = function(secret, key) {
        return CryptoJS.AES.decrypt(secret, key);
    }
}

module.exports = Secrets;