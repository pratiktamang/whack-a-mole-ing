let totalscore = 0;
var playerRoundScore = 0;
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
let speed = 4;
let playername = "";
let nameinput = document.getElementById("nameinput");
let submitbtn = document.getElementById("submitbtn");
let tableRows = document.getElementById("tablerows");
let hallOfHameSection = document.getElementById("HallOfFame");
let countDownVolume = document.getElementById("countdownaudio");
let gameArea = document.getElementById("game");

function lowerVolume() {
  countDownVolume.volume = 0.1;
  document.getElementById("gothitaudio").volume = 0.1;
}

lowerVolume();

if (localStorage.getItem("names") === null) {
  localStorage.setItem("names", JSON.stringify([])); // turns it into string
}

if (localStorage.getItem("names") === null) {
  localStorage.setItem("names", JSON.stringify([])); // turns it into string
}

// start button starts the countdown and game
startButton.addEventListener("click", startGame);

function startGame() {
  // startButton.innerHTML = "Start";
  startButton.innerHTML = "Round:" + round;
  countdowntime.innerHTML = "Good Luck!";
  customCursor.classList.toggle("hideelement");
  countdown();
}

function popout() {
  playerRoundScore = 0;
  molespeed = speed;
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

      let randomMoleSpeed = Math.random() * molespeed;
      mole.style.animationDuration = randomMoleSpeed + "s";

      mole.addEventListener("click", function (e) {
        if (!mole.classList.contains("gothit")) {
          totalscore++;
          playerRoundScore++;
          playGotHit();
          scoreCounter.innerHTML = totalscore;
        }
        mole.classList.add("gothit");
      });
      setTimeout(function () {
        mole.classList.remove("gothit");
      }, Math.round(randomMoleSpeed * 300));
    }, 1000);
    setTimeout(function () {
      clearInterval(gameInterval);
      gameInterval = 0;
      console.log("totalscore: ", totalscore);
      console.log("playerRoundScore: ", playerRoundScore);
      customCursor.classList.toggle("hideelement");
      nextRound();
    }, 10000);
  }
}

function endGame() {
  if (totalscore > 0) {
    countdowntime.innerHTML = "Congrats! Add Your Name to the HOF!";
    startButton.classList.toggle("hideelement");
    nameinput.classList.toggle("hideelement");
    submitbtn.classList.toggle("hideelement");
    startButton.innerHTML = "Beat Your Score";
  }
}

submitbtn.addEventListener("click", function () {
  let highScoreArray = JSON.parse(localStorage.getItem("names"));
  countdowntime.innerHTML = "";
  highScoreArray.push({ name: nameinput.value, high_score: totalscore });
  localStorage.setItem("names", JSON.stringify(highScoreArray));
  console.log("highscorearray", highScoreArray);
  tableRows.innerHTML = "";
  for (let i = 0; i < highScoreArray.length; i++) {
    let row = document.createElement("tr");
    let nameCell = document.createElement("td");
    let scoreCell = document.createElement("td");

    nameCell.appendChild(document.createTextNode(highScoreArray[i].name));
    scoreCell.appendChild(
      document.createTextNode(highScoreArray[i].high_score)
    );
    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    tableRows.appendChild(row);
  }
  startButton.classList.toggle("hideelement");
  nameinput.classList.toggle("hideelement");
  submitbtn.classList.toggle("hideelement");
  totalscore = 0;
  round = 1;
  scoreCounter.innerHTML = 0;
  hallOfHameSection.classList.remove("hideelement");
  hallOfHameSection.scrollIntoView();
});

// calculating x an y positions of the cursor
document.body.addEventListener("mousemove", function (event) {
  myFunction(event);
});

function myFunction(e) {
  let x = e.clientX;
  let y = e.clientY;
  customCursor.style["top"] = y - 110 + "px";
  customCursor.style["left"] = x - 35 + "px";
}

// add a wrist flick on click
document.body.addEventListener("mouseup", function () {
  removeWristFlick();
});

function removeWristFlick() {
  customCursor.classList.remove("flix");
}

document.body.addEventListener("mousedown", function () {
  addWristFlick();
});
function addWristFlick() {
  customCursor.classList.add("flix");
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
  if (playerRoundScore >= 1) {
    startButton.innerHTML = "Start";
    countdowntime.innerHTML =
      "Well played! Click Start When You're Ready For The Next Round";
    speed--;
    round++;
  } else if (totalscore === 0) {
    countdowntime.innerHTML = "Seriously, didn't hit one!?";
    startButton.innerHTML = "Retry";
  } else if (playerRoundScore === 0 && totalscore > 1) {
    endGame();
  }
}

function playGotHit() {
  document.getElementById("gothitaudio").play();
}
