//array of color;
var buttonColours = ["red", "blue", "green", "yellow"];

//array;
var gamePattern = [];

// array to store userChosenColour;
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress( function() {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

//storimg the user chosen button id into userClickedPattern array;
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  }
  else {
    console.log("wrong");

    var audio1 = new Audio("sounds/wrong.mp3");
    audio1.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");}, 200);

    $("h1").text("Game over, press any key to Restart!");

    startOver();

  }
}


//Generating a random number and applying the value to blink the colored button;
function nextSequence() {

  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


//restart the game!;
function startOver() {
  level = 0;
  started = false;
  gamePattern =[];
}
