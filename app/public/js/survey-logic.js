$(document).ready(()=>{

  let surveySubmit = document.getElementById("surveySubmit");

  surveySubmit.addEventListener("click", (e)=>{
    e.preventDefault()

    let currentURL = window.location.origin;

    let friendObj =  validateForm();
    if (friendObj) submitNewFriend(friendObj);


// Submit Friend (POST)
// ===================================

function submitNewFriend(obj){
  $.post(currentURL + "/api/friends", obj, (data)=>{
    let matchName = data.name;
    let matchPhoto = data.photo;
    let matchDiff = data.totalDifference;

    console.log(matchName)

    $("#matchName").html(matchName);
    $("#matchImg").attr("src", matchPhoto);
    $("#matchDiff").text(`There are only ${[matchDiff]} points separating ${[matchName]} and You!`);
    $('#resultsModal').modal({show:true});

    $(".sRange").val("1");
    $(".sInput").val("");

  })
}

// Form Validation
// ===================================

    function validateForm(){

      let surveyArray = [];
      let surveyScores = $(".sRange");
      for (var i = 0; i < surveyScores.length; i++) {
        surveyArray.push(parseInt(surveyScores[i].options[surveyScores[i].selectedIndex].value))
      }

      let name = $("#sName").val().trim();
      let photo = $("#sPhoto").val().trim();

      if (name === "" || photo === ""){
        alert("Fields can not be empty")
        return false;
      } else {

        let newFriend =  {
              name: name,
              photo: photo,
              scores: surveyArray,
        }
        return newFriend;
      }
    }


  })

})
