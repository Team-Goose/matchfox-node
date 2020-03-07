const uuidv1 = require('uuid/v1');
var admin = require('firebase-admin');

var Brackets = function() {
    var self = {};

    self.handler = {};

    var self = {};
    var serviceAccount = require('./secrets.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://matchfoxdb.firebaseio.com"
    });
    var db = admin.firestore();
    /**
     * Generates a bracket from an array of user objects
     * @param {Object[]} users
     * @param {string} users[].user_id
     * @param {number} users[].seed
     * @returns {Object} bracket
     */
    self.beginningGeneration = function(users) {
        
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
            findnext = xDim;
        }

        if(!empty){

            for(var i = 0; i < xDim; i++){
                r1matches.push({
                    p1: "",
                    p2: "",
                    next: -1,
                    p1score: 0,
                    p2score: 0,
                    outcome: 0,
                    stage: 0
                });
            }

            while(temp2.length > 0 && counterY <= 1){
                if(counterY == 0){
                    r1matches[counterX].p1 = temp2[temp2.length - 1].user_id;
                    r1matches[counterX].next = findnext;
                    findnext++;
                }
                else r1matches[counterX].p2 = temp2[temp2.length - 1].user_id;
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
                if(r1matches[i].p1 == "" || r1matches[i].p2 == ""){
                    byes.push(i);
                }
            }

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
            allmatches.push({
                p1: "",
                p2: "",
                next: -1,
                p1score: 0,
                p2score: 0,
                outcome: 0,
                stage: stg
            });
        }

        for(var i = r1matches.length; i < (2*xDim) - 1; i++){
            if(byes.length > 0){
                var name = r1matches[byes.pop()].p1;
                if(name == "") name = bye.p2;
                else name = bye.p1;
                allmatches[i].p1 = name;
            }

            if(stcnt < stages){
                allmatches[i].stage = stg;
                stcnt++;
            }
            else{
                stg++;
                allmatches[i].stage = stg;
            }

            if(i == (2*xDim) - 2) allmatches[i].next = -1;
            else{
                allmatches[i].next = findnext;
                if(innext){
                    findnext++;
                    innext = false;
                }
                else innext = true;
            }
        }

        var bracketID = uuidv1();

        var setDoc = db.collection('groups/oi2l5XhwY8LoxXeT5fHO/brackets/').doc(bracketID).set({matches: allmatches});
        
    }

    function pow2(n){

        if(n % 2 == 1) return false;

        while(n % 2 == 0){
            n = n / 2;
        }

        if(n == 1) return true;

        return false;

    }

    return self;
}

module.exports = Brackets();
