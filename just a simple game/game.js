// Game constants
const bird = document.getElementById("bird");
const gameContainer = document.getElementById("game-container");
const pipeTop = document.getElementById("pipe-top");
const pipeBottom = document.getElementById("pipe-bottom");

const birdSpeed = 2;
let birdVelocity = 0;

const gravity = 0.2;
const flapStrength = -6;

const pipeWidth = 50;
let pipeGap = 200;

let pipeSpeed = 2;
let pipeTimer = 0;

let isGameOver = false;


function gameLoop() {
  if (isGameOver) return;


  birdVelocity += gravity;
  bird.style.top = `${parseFloat(bird.style.top) + birdVelocity}px`;

  if (parseFloat(bird.style.top) + bird.offsetHeight >= gameContainer.offsetHeight || parseFloat(bird.style.top) <= 0) {
    gameOver();
  }


  movePipes();

  requestAnimationFrame(gameLoop);
}


function generatePipes() {
  let pipeHeight = Math.floor(Math.random() * (gameContainer.offsetHeight - pipeGap));
  let topPipeHeight = pipeHeight;
  let bottomPipeHeight = gameContainer.offsetHeight - topPipeHeight - pipeGap;

  let pipeTopElement = document.createElement("div");
  let pipeBottomElement = document.createElement("div");

  pipeTopElement.classList.add("pipe");
  pipeBottomElement.classList.add("pipe");

  pipeTopElement.style.height = `${topPipeHeight}px`;
  pipeBottomElement.style.height = `${bottomPipeHeight}px`;

  pipeTopElement.style.left = `${gameContainer.offsetWidth}px`;
  pipeBottomElement.style.left = `${gameContainer.offsetWidth}px`;

  gameContainer.appendChild(pipeTopElement);
  gameContainer.appendChild(pipeBottomElement);
}

function movePipes() {
  const pipes = document.querySelectorAll(".pipe");

  pipes.forEach((pipe) => {
    let pipeX = parseFloat(pipe.style.left);
    pipeX -= pipeSpeed;

    if (pipeX + pipe.offsetWidth < 0) {
      pipe.remove();
    } else {
      pipe.style.left = `${pipeX}px`;
    }

    if (pipeX < 50 && pipeX + pipe.offsetWidth > 50) {
      if (parseFloat(bird.style.top) < pipe.offsetHeight || parseFloat(bird.style.top) + bird.offsetHeight > gameContainer.offsetHeight - pipe.offsetHeight) {
        gameOver();
      }
    }
  });
}

document.body.addEventListener("click", () => {
  if (!isGameOver) {
    birdVelocity = flapStrength;
  }
});


function gameOver() {
  isGameOver = true;
  alert("Game Over!");
}


function startGame() {
  bird.style.top = `${gameContainer.offsetHeight / 2}px`;
  pipeTimer = 0;
  isGameOver = false;


  document.querySelectorAll(".pipe").forEach(pipe => pipe.remove());

  gameLoop();
  setInterval(() => {
    if (!isGameOver) {
      pipeTimer++;
      if (pipeTimer > 60) {
        generatePipes();
        pipeTimer = 0;
      }
    }
  }, 1000 / 60);
}

startGame();
