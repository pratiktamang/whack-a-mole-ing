/*

https://codepen.io/AlexsandroSA/full/ZXGZag 


Game rules
1/ the user clicks on "Start!" button to start the game.
2/ 6 positions where the mole can RANDOMLY appear
    // at random speeds
3/ the user can click on the mole with the mouse.
4/ sucessful click adds the total to a global counter
*/

// javascript to build a table for us
// javascript to build the html element

// Can I use JS to animate add CSS to images?

// how do you animat

// event listener on the button
// event listener on click on the images.

// let score = 0;
// let startButton = document.querySelector("#startbtn");
// let moles = document.querySelectorAll("#gamefirstrow > img.moleimage");
// let gameInterval;
// startButton.addEventListener("click", popout);

// function popout() {
//   console.log("click");
//   let num = 10;
//   while (num > 1) {
//     console.log(num);
//     gameInterval = setInterval(() => {
//       for (let i = 0; i < moles.length; i++) {
//         if (!moles.item(i).classList.contains("moleanimation")) {
//           console.log("ifstate");
//           moles.item(i).classList.add("moleanimation");
//           moles.item(i).style.animationDuration = Math.random() * 1 + "s";
//         } else {
//           console.log("else");
//           moles.item(i).classList.remove("moleanimation");
//           moles.item(i).style.animationDuration = Math.random() * 2 + "s";
//         }
//       }
//     }, 1000);
//   }
//   num--;
//   console.log(num);
// }

let score = 0;
let startButton = document.querySelector("#startbtn");
let moles = document.querySelectorAll("#game > img.moleimage");
let gameInterval;
startButton.addEventListener("click", popout);
// moles contain using event delegation to get all of them instead of looping and adding event listeners to all
let moleCTR = document.querySelector("#game");
let scoreCounter = document.getElementById("counter");

// function operationMole() {
//   for (let i = 0; i < moles.length; i++) {
//     moles[i].addEventListener("click", function countscore() {
//       score++;
//     });
//   }
// }

moleCTR.addEventListener("click", function (e) {
  console.log("moleyes?");
  if (e.target.matches(".moleimage")) {
    score++;
    scoreCounter.innerHTML = score;
  }
});

function popout() {
  scoreCounter.innerHTML = 0;
  score = 0;
  console.log("click");
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
    }, 10000);
  }
}
//New feature adds and bug fixes
// add a game over message after the 10 seconds
// add a high score log in localstorage
//https://blog.logrocket.com/the-complete-guide-to-using-localstorage-in-javascript-apps-ba44edb53a36/
// limit the scores...
// limit jason from being able to use the console. limit it just to mouse clicks
// responsiveness to larger screens

// I need a way for this to stop popping out after 10 seconds
// disble the second start click until the 10 seconds is.. Done

// setTimeout(function () {
//   clearInterval(gameInterval);
//   gameInterval = 0;
// }, 1000);
