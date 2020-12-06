(() => {
  // makes the functions, variables inaccessible in the console.
  let score = 0;
  let startButton = document.querySelector("#startbtn");
  let moles = document.querySelectorAll("#game > img.moleimage");
  let gameInterval;
  let moleCTR = document.querySelector("#game"); // WHAT IS THIS
  let scoreCounter = document.getElementById("counter");
  let customCursor = document.querySelector("#hammerpic");
  let countdowntime = document.getElementById("cdown");
  let startingTime = 3;
  let timer = startingTime;

  // start button starts the countdown and game
  startButton.addEventListener("click", startGame);

  // moleCTR.addEventListener("click", function (e) {
  //   if (e.target.matches(".moleimage")) {
  //     // if score is !== 1
  //     if (score !== 1) {
  //       score++;
  //       scoreCounter.innerHTML = score;
  //     }
  //   }
  // });

  function startGame() {
    customCursor.classList.toggle("hidehammer");
    countdown();
  }

  function popout() {
    scoreCounter.innerHTML = 0;
    // score = 0;

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
        console.log(mole);
        mole.classList.toggle("moleanimation");
        let randomMoleSpeed = Math.random() * 5;
        mole.style.animationDuration = randomMoleSpeed + "s";
        mole.addEventListener("click", function (e) {
          if (!mole.classList.contains("gothit")) {
            score++;
            document.getElementById("gothitaudio").play();
            scoreCounter.innerHTML = score;
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
        customCursor.classList.toggle("hidehammer");
        countdowntime.innerHTML = "Well played! Get Ready For The Next Round";
        // but on next round, the score gets reset
      }, 20000);
    }
  }

  function toggleHammer() {}
  // Node.addEventListener(event_name, handler_function)

  // calculating x an y positions of the cursor
  document.body.addEventListener("mousemove", function (event) {
    myFunction(event);
  });

  // add a wrist flick on click
  document.body.addEventListener("mousedown", function () {
    console.log("asdfa");
    addWristFlick();
  });
  function addWristFlick() {
    customCursor.classList.add("flix");
  }
  document.body.addEventListener("mouseup", function () {
    console.log("mouseup");
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

  // function nextRound() {}
})();
