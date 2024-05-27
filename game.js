var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

var initial = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);

  initial = 1;

  level++;

  $("#level").text(level);

  //   return randomNumber;
}

// var randomChosenColour = buttonColours[nextSequence()];

// gamePattern.push(randomChosenColour);

// $("#" + randomChosenColour)
//   .fadeOut(100)
//   .fadeIn(100)
//   .fadeOut(100)
//   .fadeIn(100);

// var audio = new Audio("sounds/" + randomChosenColour + ".mp3");

// $(".btn").on("click", function () {
//   audio.play();
// });

$(".btn").on("click", function (event) {
  var userChosenColour = $(event.target).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);

  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).on("keypress", function () {
  if (initial === 0) {
    nextSequence();
    $("h1").html("Level <span id='level'>" + level + "</span");
  } else {
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    var gameOver = new Audio("sounds/wrong.mp3");
    gameOver.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  initial = 0;
}
