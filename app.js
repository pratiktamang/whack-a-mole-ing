let score = 0;
let startButton = document.querySelector("#startbtn");
let moles = document.querySelectorAll("#game > img.moleimage");
let gameInterval;
startButton.addEventListener("click", startGame);
// moles contain using event delegation to get all of them instead of looping and adding event listeners to all
let moleCTR = document.querySelector("#game");
let scoreCounter = document.getElementById("counter");
let customCursor = document.querySelector("#hammerpic");
let countdowntime = document.getElementById("cdown");
let startingTime = 3;
let timer = startingTime;

moleCTR.addEventListener("click", function (e) {
  console.log("moleyes?");
  if (e.target.matches(".moleimage")) {
    score++;
    scoreCounter.innerHTML = score;
  }
});
console.log("hammer show check");

function startGame() {
  customCursor.classList.toggle("hidehammer");
  countdown();
}

function popout() {
  // customCursor.classList.toggle("hidehammer");
  scoreCounter.innerHTML = 0;
  score = 0;
  if (gameInterval) {
    console.log(
      "The game is already running",
      gameInterval,
      " is the id of the setInterval"
    );
    console.log(`run clearInterval(${gameInterval}) to stop it :D`);
    return; // This means do nothing, just return out of the current function.
  } else {
    gameInterval = setInterval(() => {
      for (let i = 0; i < moles.length; i++) {
        if (!moles.item(i).classList.contains("moleanimation")) {
          console.log("ifstate");
          moles.item(i).classList.add("moleanimation");
          moles.item(i).style.animationDuration = Math.random() * 1 + "s";
        } else {
          console.log("else");
          moles.item(i).classList.remove("moleanimation");
          moles.item(i).style.animationDuration = Math.random() * 2 + "s";
        }
      }
    }, 1000);
    setTimeout(function () {
      clearInterval(gameInterval);
      gameInterval = 0;
      customCursor.classList.toggle("hidehammer");
    }, 10000);
    // customCursor.classList.toggle("hidehammer");
  }
}

function toggleHammer() {}

// Node.addEventListener(event_name, handler_function)

document.body.addEventListener("mousemove", function (event) {
  myFunction(event);
});

function myFunction(e) {
  let x = e.clientX;
  let y = e.clientY;
  // var coor = "Coordinates: (" + x + "," + y + ")";
  customCursor.style["top"] = y - 110 + "px";
  customCursor.style["left"] = x - 35 + "px";
  // customCursor.style["trasnform"] = "translate" + x-35
}

function countdown() {
  let times = setInterval(() => {
    if (timer > 0) {
      console.log(timer);
      countdowntime.innerHTML = timer;
      timer--;
    }
  }, 1000);
  setTimeout(function () {
    // countdowntime.innerHTML = timer;
    clearInterval(times);
    timer = startingTime;
    countdowntime.innerHTML = "Go!";
    popout();
  }, 4000);
}
