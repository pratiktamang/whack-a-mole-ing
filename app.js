// (() => {
// makes the functions, variables inaccessible in the console.
let totalscore = 0;
let startRoundScore = 0;
var playerRoundScore = 1;
let startButton = document.querySelector("#startbtn");
let moles = document.querySelectorAll("#game > img.moleimage");
let gameInterval;
let scoreCounter = document.getElementById("counter");
let customCursor = document.querySelector("#hammerpic");
let countdowntime = document.getElementById("cdown");
let startingTime = 3;
let roundhtml = document.getElementById("round");
let timer = startingTime;
var round = 1;
let speed = 5;
let playername = "";
let nameinput = document.getElementById("nameinput");
let submitbtn = document.getElementById("submitbtn");

// start button starts the countdown and game
startButton.addEventListener("click", startGame);

function startGame() {
  roundhtml.innerHTML = "Round:" + round;
  customCursor.classList.toggle("hideelement");
  playerRoundScore = 0;
  countdown();
}

function popout() {
  console.log("startinground: ", speed);
  molespeed = speed;
  console.log("mole speed: ", molespeed);
  if (gameInterval) {
    // "The game is already running",gameInterval," is the id of the setInterval"
    // `run clearInterval(${gameInterval}) to stop it :D`);
    return; // This means do nothing, just return out of the current function.
  } else {
    gameInterval = setInterval(() => {
      // select ith item in the moles node DONE
      // select a random ith item.
      let randomNum = Math.round(Math.random() * (moles.length - 1));
      let mole = moles[randomNum];
      mole.classList.toggle("moleanimation");
      console.log("speed", speed);
      let randomMoleSpeed = Math.random() * molespeed;
      mole.style.animationDuration = randomMoleSpeed + "s";
      mole.addEventListener("click", function (e) {
        if (!mole.classList.contains("gothit")) {
          totalscore++;
          playerRoundScore++;
          document.getElementById("gothitaudio").play();
          scoreCounter.innerHTML = totalscore;
        }
        mole.classList.add("gothit");
      });
      setTimeout(function () {
        mole.classList.remove("gothit");
      }, Math.round(randomMoleSpeed * 1000));
    }, 1000);
    setTimeout(function () {
      clearInterval(gameInterval);
      gameInterval = 0;
      customCursor.classList.toggle("hideelement");
      if (playerRoundScore > 0) {
        countdowntime.innerHTML = "Well played! Get Ready For The Next Round";
        nextRound();
      } else {
        countdowntime.innerHTML = "";
        endGame();
      }
    }, 10000);
  }
}

function endGame() {
  if (playerRoundScore === 0) {
    console.log(playerRoundScore);
    startButton.classList.toggle("hideelement");
    nameinput.classList.toggle("hideelement");
    submitbtn.classList.toggle("hideelement");
    //addtolocalstorage(playername, round, totalscore);
  } else {
  }
}

function addtolocalstorage() {
  window.localStorage.setItem("name", "playname");
}

// calculating x an y positions of the cursor
document.body.addEventListener("mousemove", function (event) {
  myFunction(event);
});

// add a wrist flick on click
document.body.addEventListener("mousedown", function () {
  addWristFlick();
});
function addWristFlick() {
  customCursor.classList.add("flix");
}
document.body.addEventListener("mouseup", function () {
  removeWristFlick();
});

function removeWristFlick() {
  customCursor.classList.remove("flix");
}

function myFunction(e) {
  let x = e.clientX;
  let y = e.clientY;
  // var coor = "Coordinates: (" + x + "," + y + ")";
  customCursor.style["top"] = y - 110 + "px";
  customCursor.style["left"] = x - 35 + "px";
}

function countdown() {
  let times = setInterval(() => {
    document.getElementById("countdownaudio").play();
    if (timer > 0) {
      countdowntime.innerHTML = timer;
      timer--;
    }
  }, 1000);
  setTimeout(function () {
    clearInterval(times);
    timer = startingTime;
    countdowntime.innerHTML = "Go!";
    popout();
  }, 4000);
}

// start next round or game over
// next round is an option if roundscore > 0
function nextRound() {
  roundhtml.innerHTML = "Round:" + round;
  speed--;
  round++;
  endGame();
}
// })();
// });
// add the name,round, score to local storage
// get that info and display it on the page.
