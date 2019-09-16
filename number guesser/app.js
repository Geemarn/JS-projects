const game = document.getElementById("game"),
  guessInput = document.getElementById("guess-input"),
  guessBtn = document.getElementById("guess-btn"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  message = document.querySelector(".message"),
  mssgParagraph = document.getElementById("ist-paragraph");

//game value for now
let min = minNumFunc();
let max = maxNumFunc();
let winningNum = getRandomNum(min, max);
let guessesLeft = 5;

//min number func
function minNumFunc() {
  return Math.floor(Math.random() * 10);
}

//max number func
function maxNumFunc() {
  return Math.floor(Math.random() * 10 + 10);
}

//get random number btw min and max
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//listen for guess btn
guessBtn.addEventListener("click", function() {
  const guess = parseInt(guessInput.value);

  //validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`please choose a number between ${min} and ${max}`, "red");
  } else {
    //check if won
    if (guess === winningNum) {
      //game won
      gameOver(true, `${winningNum} is correct`, "YOU WON");
    } else {
      guessesLeft -= 1;

      if (guessesLeft === 0) {
        gameOver(
          false,
          `Game Over..The correct answer is ${winningNum}`,
          "YOU LOST"
        );
      } else {
        //game continues after wrong answer
        setMessage(
          `${guess} is incorrect, you have ${guessesLeft} guesses left`,
          "red"
        );
        guessInput.disabled = false;
        guessInput.style.borderColor = "red";
        guessInput.value = "";
      }
    }
  }
});

//game over func
function gameOver(won, mssg1, mssg2) {
  let color;
  won ? (color = "green") : (color = "red");
  //game won
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(mssg1, color);

  //change text paragraph
  mssgParagraph.textContent = mssg2;
  mssgParagraph.style.color = color;

  //play again
  guessBtn.value = "PLAY AGAIN";
  guessBtn.classList = "play-again";
}

//set message func
function setMessage(mssg, color) {
  message.textContent = mssg;
  message.style.color = color;
}

//listen for play again
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
    guessInput.value = "";
  }
});
