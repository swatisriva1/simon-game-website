var buttonColors = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Only the first keypress (game not yet started) will trigger action
$(document).on("keydown", function() {
    if(!started) {
        started = true;
        $("#level-title").text("Level" + level);  //doesn't display Level 0 since nextSequence() displays level immediately
        nextSequence();
    }
});

//On a button click, add to user's pattern array and check if it is correct
$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

//Randomly generate next button in sequence and advance level
function nextSequence() {
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var chosenColor = buttonColors[randomNumber];
    gamePattern.push(chosenColor);
    $("#" + chosenColor).fadeOut(200).fadeIn(200);
    playSound(chosenColor);
}

function playSound(name) {
    var soundToPlay = new Audio("sounds/" + name + ".mp3");
    soundToPlay.play();
}

//Animation on user button click
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    window.setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//Check if the button user just pressed is part of correct sequence
function checkAnswer(ind) {  // will need level - 1 as index
    if(userClickedPattern[ind] === gamePattern[ind]) {  // most recent user answer matches
        // check that rest of user pattern matches (has user finished the sequence)
        // if user hasn't finished, nothing will happen (we are waiting for user to finish sequence)
        if(userClickedPattern.length === gamePattern.length) {
            window.setTimeout(nextSequence, 1000);
        }
    }
    //If user clicked a wrong button
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        window.setTimeout(() => {
            $("body").removeClass("game-over");
        }, 300);
        $("#level-title").text("Game Over! Press Any Key to Restart");
        startOver();
    }
}

//Reset game values
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}





