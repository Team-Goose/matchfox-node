var matches = {
    "matches": [
       {"members":["DeuceUUID", "JackUUID"],
       "score":[0, 0],
       "nextMatch":2,
       "stage":0
       },
       {"members":["KeiferUUID", "CalebUUID"],
       "score":[0, 0],
       "nextMatch":2,
       "stage":0
       },
       {"members":["", ""],
       "score":[0,0],
       "nextMatch":-1,
       "stage":1
       }
    ]};

for (var i = 0; i < matches.length; i++) {
    var object = matches[i];
    for (var member in object) {
        bracketSlots.forEach(element => {
            element.innerHTML = member
        })
    }
}

var contestants = JSON.parse(matches);
console.log(contestants);
