const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('Logged out');
    window.location.replace('index.html');
  });
});

const bracketSlots = document.querySelectorAll('.bracketSlot');

var matches = [
       {"members":["DeuceUUID", "JackUUID"],
       "score":[0, 0],
       "nextMatch":4,
       "stage":0
       },
       {"members":["KeiferUUID", "CalebUUID"],
       "score":[0, 0],
       "nextMatch":4,
       "stage":0
       },
       {"members":["BillUUID", "TedUUID"],
       "score":[0, 0],
       "nextMatch":5,
       "stage":0
       },
       {"members":["ReetikUUID", "MarkusUUID"],
       "score":[0, 0],
       "nextMatch":5,
       "stage":0
       },
       {"members":["", ""],
       "score":[0,0],
       "nextMatch":6,
       "stage":1
       },
       {"members":["", ""],
       "score":[0,0],
       "nextMatch":6,
       "stage":1
       },
       {"members":["", ""],
       "score":[0,0],
       "nextMatch":-1,
       "stage":2
       }
    ];

var count = 0;
for (var i = 0; i < matches.length; i++) {
        for (var j = 0; j < matches[i].members.length; j++) {
        if (matches[i].members[j] != "")
            bracketSlots[count].innerHTML = matches[i].members[j];
        count++;
    }
}

// const getBracket = func.httpsCallable('getBracket');
// const bracketID = '55730440-6051-11ea-baec-070c925f546e';

// getBracket({data: bracketID})
//   .then(function(result) {
//     console.log(result);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });
