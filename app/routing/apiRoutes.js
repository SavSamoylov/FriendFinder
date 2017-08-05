const path = require("path")
const fs = require("fs")


var friendsData = require("../data/friends")



module.exports = function(app){

  app.post("/api/friends", (req, res)=>{

    // Grab incoming Request values from the Suvey Submission
    let sub = req.body;
    let userScores = req.body.scores;
    let scoreSum = req.body.scores.reduce((a, b) => parseInt(a) + parseInt(b), 0);

    let matchObj = {
      name: "",
      photo: "",
      totalDifference: 100 // A large starting point to be replaced by new difference figures.
    }




    getMatch();


    function getMatch(){

      let diff = 0;

      // We'll compare the user scores array with the other friends scores.
      for (var i = 0; i < friendsData.length; i++) {
        let fName = friendsData[i].name
        let fPhoto = friendsData[i].photo
        let fArr = friendsData[i].scores;

        for (var j = 0; j < fArr.length; j++) {

          // If there is a discrepancy 
          if (fArr[j] !== parseInt(userScores[j])){
            diff += Math.abs(fArr[j] - parseInt(userScores[j]));
          }

        }
        if (diff < matchObj.totalDifference) {
          matchObj.name = fName;
          matchObj.photo = fPhoto;
          matchObj.totalDifference = diff;
        }
        diff = 0;
      }

    }

    // Our return object to be used in the modal.
    res.json(matchObj);

    // Push after we return the match so the user doesn't match up with self.
    friendsData.push(req.body);


  })

  app.get('/api/friends', (req, res)=>{
    res.json(friendsData);
  });

}
