const uuidv1 = require('uuid/v1');
var admin = require('firebase-admin');

var Brackets = function() {
    var self = {};

    self.handler = {};

    var self = {};
    var db = admin.firestore();

    self.initBracket = function() {
        return new Promise((resolve, reject) => {
            var bracketID = uuidv1();
            db.collection('groups/oi2l5XhwY8LoxXeT5fHO/brackets/').doc(bracketID).then(function() {
                resolve(bracketID);
            }, function() {
                reject();
            });
        });
    }

    /**
     * Generate bracket
     * @param {string} bracketID
     * @returns {Promise}
     */
    self.generateBracket = function(bracketID) {
        return new Promise(function(resolve, reject) {
            db.collection('groups/oi2l5XhwY8LoxXeT5fHO/brackets/').doc(bracketID).get().then((bracket) => {
                var users = bracket.users;
                self.beginningGeneration(users).then((matches) => {
                    var promises  = [];
                    for(var i =0 ; i < matches.length; i++) {
                        var promise = db.collection('groups/oi2l5XhwY8LoxXeT5fHO/brackets/').doc(bracketID).collection("matches").doc(i).set(matches[i]);
                        promises.push(promise);
                    }
                    Promise.all(promises).then(function() {
                        resolve(matches);
                    }, function() {
                        reject();
                    });
                });
            });
        });
    }

    /**
     * Generates a bracket from an array of user objects
     * @param {Object[]} users
     * @param {string} users[].user_id
     * @param {number} users[].seed
     * @returns {Object} bracket
     */
    self.beginningGeneration = function(users) {
        return new Promise(function(resolve, reject) {
            // var users = [
            //     {
            //         user_id: "adbeo23",
            //         seed: 1500
            //     }
            // ];
        
            // users[0].seed = 103;
            // arr.push(value);



            //INITIATE FINAL GOAL
            /////////////////////
            var matches = [];



            //SORT USERS BY SEED
            ////////////////////
            var size = users.length;
            var temp;
            var counter;
            var go;

            for(var i = 1; i < users.length; i++){
                go = true;
                counter = i;
                temp = users[i];
                while(go && counter > 0){
                    if(counter == 1 && temp.seed < users[0].seed){
                        users[1] = users[0];
                        users[0] = temp;
                    }
                    else if(temp.seed < users[counter - 1].seed){
                        users[counter] = users[counter - 1];
                    }
                    else{
                        users[counter] = temp;
                        go = false;
                    }
                    counter--;
                }
            }



            //CREATE BRACKET ROUND 1
            ////////////////////////
            var xDim = 0;
            var counterX = 0;
            var counterY = 0;
            var empty = false;
            var halfway = false;
            var findnext = 0;

            var temp2 = [];
            var r1matches = [];
            var byes = [];
            
            for(var i = 0; i < users.length; i++){
                temp2.push(users[i]);
            }

            if(users.length < 2){
                console.log("The tournament doesn't have enough people in it to run!");
                empty = true;
            }
            else{
                var tempSize = users.length;
                do {
                    tempSize--;
                }while(!pow2(tempSize));
                xDim = tempSize;
                ////////////////FOR PRESENTATION PURPOSES
                if(xDim > 8) xDim = 8;///////////////////
                /////////////////////////////////////////
                findnext = xDim;
            }

            if(!empty){

                for(var i = 0; i < xDim; i++){
                    r1matches.push(JSON.parse('{"members":["", ""], "score":[0, 0], "nextMatch":-1, "stage":0}'));
                }

                while(temp2.length > 0 && counterY <= 1){
                    if(counterY == 0){
                        r1matches[counterX].members[0] = temp2[temp2.length - 1].user_id;
                        r1matches[counterX].nextMatch = findnext;
                        findnext++;
                    }
                    else r1matches[counterX].members[1] = temp2[temp2.length - 1].user_id;
                    temp2.pop();

                    if(!halfway) counterX++;
                    else counterX--;
                    if(counterX >= r1matches.length || counterX < 0){
                        counterX--;
                        counterY++;
                        halfway = true;
                    }
                }

                for(var i = 0; i < r1matches.length; i++){
                    if(r1matches[i].members[0] == "" || r1matches[i].members[1] == ""){
                        byes.push(i);
                    }
                }

                ////////////////////////////////////////////////////FOR PRESENTATION PURPOSES
                if(counterY == 1 && counterX == 0 && temp2.length > 0){//////////////////////
                    for(var i = 0; i < temp2.length; i++){///////////////////////////////////
                        console.log(`${temp2[i].user_id} rejected from tournament\n`);///////
                    }////////////////////////////////////////////////////////////////////////
                }////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////

            }
            else return null;



            //GENERATE REST OF BRACKET
            //////////////////////////
            var allmatches = [];
            var innext = false;
            var stages = xDim / 2;
            var stg = 1;
            var stcnt = 0;

            for(var i = 0; i < r1matches.length; i++){
                allmatches.push(r1matches[i]);
            }

            for(var i = r1matches.length; i < (2*xDim) - 1; i++){
                allmatches.push(JSON.parse('{"members":["", ""], "score":[0, 0], "nextMatch":1, "stage":0}'));
            }

            for(var i = r1matches.length; i < (2*xDim) - 1; i++){
                if(byes.length > 0){
                    var name = r1matches[byes.pop()].members[0];
                    if(name == "") name = bye.members[1];
                    else name = bye.members[0];
                    allmatches[i].members[0] = name;
                }

                if(stcnt < stages){
                    allmatches[i].stage = stg;
                    stcnt++;
                }
                else{
                    stg++;
                    allmatches[i].stage = stg;
                }

                if(i == (2*xDim) - 2) allmatches[i].nextMatch = -1;
                else{
                    allmatches[i].nextMatch = findnext;
                    if(innext){
                        findnext++;
                        innext = false;
                    }
                    else innext = true;
                }
            }

            // var bracketID = uuidv1();

            // db.collection('groups/oi2l5XhwY8LoxXeT5fHO/brackets/').doc(bracketID).set({matches: allmatches}).then(function() {
            //     resolve();
            // }, function() {
            //     reject();
            // });
            resolve(allmatches);
        });
    }

    function pow2(n){

        if(n % 2 == 1) return false;

        while(n % 2 == 0){
            n = n / 2;
        }

        if(n == 1) return true;

        return false;

    }

    /**
     * Get bracket
     * @param {string} bracketID
     * @returns {Promise}
     */
    self.getBracket = function(bracketID) {
        return new Promise(function(resolve, reject) {
            db.collection('groups/oi2l5XhwY8LoxXeT5fHO/brackets/').doc(bracketID).get().then(function(bracket) {
                if(bracket.exists) {
                    resolve(bracket.data());
                } else {
                    resolve({});
                }
            }, function(error) {
                console.error(error);
                reject();
            });
        });
    }
    
    self.bracketList = function(){
        return new Promise(function(resolve, reject){
            var bList = [];
            db.collection('groups/oi2l5XhwY8LoxXeT5fHO/brackets/').get().then(snapshot => {
                snapshot.forEach(doc => {
                    bList.push(doc.id);
                });
            }).catch(err => {
                console.error(err);
                reject();
            }).finally(function(){
                resolve(bList);
            });
        });
    }

    /**
     * Register user for a bracket
     * @param user_id
     * @param bracket_id
     * @returns {Promise}
     */
    self.registerUser = function(bracketID, userID) {
        return new Promise(function(resolve, reject) {
            db.collection('groups/oi2l5XhwY8LoxXeT5fHO/brackets/').doc(bracketID).set({
                "users": [userID]
            }, { merge: true }).then(function() {
                resolve();
            }, function() {
                reject();
            });
        });
    }

    self.getMatch = function(bracketID, matchID) {
        return new Promise(function(resolve, reject) {
            db.collection('groups/oi2l5XhwY8LoxXeT5fHO/brackets/')
                .doc(bracketID)
                .collection('matches')
                .doc(matchID)
                .get()
                .then((match) => {
                    resolve(match);
            }, function() {
                reject();
            });
        });
    }

    // self.reportMatch = function(bracketID, matchID, match) {
    //     return new Promise(function(resolve, reject) {
    //         db.collection('groups/oi2l5XhwY8LoxXeT5fHO/brackets/')
    //             .doc(bracketID)
    //             .update({
    //                 locations: admin.firestore.FieldValue.arrayRemove({
    //                     id: matchID
    //                 })
    //             })
    //     })
    // }

    return self;
}

module.exports = Brackets();
