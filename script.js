"use strict";

const snakeContainer = document.querySelector(".snake-container");
const leadingSnake = document.querySelector(`.leading-snake`);
const playingBox = document.querySelector(".playing-box");
const start = document.querySelector(".btn-start");
const restart = document.querySelector(".btn-restart");
const mealBox = document.querySelector(".meal-box");
const scoreLabel = document.querySelector(".score");
const option = document.querySelector(".option-heading");
const easy = document.querySelector(".option--easy");
const medium = document.querySelector(".option--medium");
const hard = document.querySelector(".option--hard");
const failureBOx = document.querySelector(".fail-popup");
let motionBotton, motionLeft, motionTop, motionRight;
let reverseX = true;
let reverseY = true;
let meal;
let score = 0;
let speed = 10;
let hScore = 0;
let snakeArr = [...document.querySelectorAll(".snake-box")];
const MealConstructor = function (element, top, left) {
  this.el = element;
  this.left = left;
  this.top = top;
  this.el.style.top = `${this.top}px`;
  this.el.style.left = `${this.left}px`;
};

const SnakeContructor = function (element, pos) {
  this.el = element;
  this.moveTo = null;
  this.PrvElPos = pos;
  this.left = Number.parseFloat(getComputedStyle(this.el).left);
  this.top = Number.parseFloat(getComputedStyle(this.el).top);
  this.a = 0;
  this.b = 0;
  this.ones = true;
};
const el0 = new SnakeContructor(leadingSnake, "west");
const el1 = new SnakeContructor(snakeArr[0], "west");
const el2 = new SnakeContructor(snakeArr[1], "west");
const el3 = new SnakeContructor(snakeArr[2], null);
el0.b = true;

let snArr = [el0, el1, el2, el3];
const animeRoundright = function () {
  this[0].moveTo = "right";
  this[0].left++;
  this[0].el.style.left = `${this[0].left}px`;
  roundAnimation(this);
};
const animeRoundleft = function () {
  this[0].moveTo = "left";
  this[0].left--;
  this[0].el.style.left = `${this[0].left}px`;
  roundAnimation(this);
};
const animeRoundtop = function () {
  this[0].moveTo = "top";
  this[0].top--;
  this[0].el.style.top = `${this[0].top}px`;
  roundAnimation(this);
};
const animeRoundbottom = function () {
  this[0].moveTo = "bottom";
  this[0].top++;
  this[0].el.style.top = `${this[0].top}px`;
  roundAnimation(this);
};

const clearMotion = function () {
  clearInterval(motionTop);
  clearInterval(motionLeft);
  clearInterval(motionBotton);
  clearInterval(motionRight);
};
const snakeMotion = function (e) {
  if (e.key === "ArrowDown" && reverseY && el0.a > 20) {
    clearMotion();
    el0.a = 0;
    animeRoundbottom.bind(snArr);
    motionBotton = setInterval(animeRoundbottom.bind(snArr), speed);
    reverseX = true;
    reverseY = false;
  }
  if (e.key === "ArrowRight" && reverseX && el0.a > 20) {
    clearMotion();
    el0.a = 0;
    animeRoundright.bind(snArr);
    motionRight = setInterval(animeRoundright.bind(snArr), speed);
    reverseX = false;
    reverseY = true;
  }

  if (e.key === "ArrowLeft" && reverseX && el0.a > 20) {
    clearMotion();
    el0.a = 0;
    animeRoundleft.bind(snArr);
    motionLeft = setInterval(animeRoundleft.bind(snArr), speed);
    reverseY = true;
    reverseX = false;
  }

  if (e.key === "ArrowUp" && reverseY && el0.a > 20) {
    clearMotion();
    el0.a = 0;
    animeRoundtop.bind(snArr);
    motionTop = setInterval(animeRoundtop.bind(snArr), speed);
    reverseX = true;
    reverseY = false;
  }
};

const init = function () {
  clearMotion();
  el0.a = 0;
  animeRoundright.bind(snArr);
  motionRight = setInterval(animeRoundright.bind(snArr), speed);
  reverseX = false;
  reverseY = true;
};

const animeMoveVertical = function (arr, i, move) {
  if (arr[i + 1].a < arr[i + 1].b) {
    arr[i + 1].a++;
    move === "top" ? arr[i + 1].top-- : arr[i + 1].top++;
    arr[i + 1].moveTo = move;
    arr[i + 1].el.style.top = `${arr[i + 1].top}px`;
  }
};

const animeMoveHorizontal = function (arr, i, move) {
  if (arr[i + 1].a < arr[i + 1].b) {
    arr[i + 1].a++;
    move === "right" ? arr[i + 1].left++ : arr[i + 1].left--;
    arr[i + 1].moveTo = move;
    arr[i + 1].el.style.left = `${arr[i + 1].left}px`;
  }
};

const animeSetBA = function (arr, i) {
  if (arr[i + 1].ones) {
    arr[i + 1].b = arr[i + 1].a + 20;
    arr[i + 1].ones = false;
  }
};

const animeResetAB = function (arr, i, pos) {
  if (arr[i + 1].a === arr[i + 1].b) {
    arr[i + 1].ones = true;
    arr[i].PrvElPos = pos;
  }
};

const roundAnimation = function (arr) {
  arr[0].a++;
  checkPoint();
  snakeCrossObserver();
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].moveTo === "right") {
      if (arr[i].PrvElPos === "west") {
        arr[i + 1].moveTo = "right";
        arr[i + 1].left++;
        arr[i + 1].el.style.left = `${arr[i + 1].left}px`;
      }
      if (arr[i].PrvElPos === "north") {
        animeSetBA(arr, i);
        animeMoveVertical(arr, i, "bottom");
        animeResetAB(arr, i, "west");
      }
      if (arr[i].PrvElPos === "south") {
        animeSetBA(arr, i);
        animeMoveVertical(arr, i, "top");
        animeResetAB(arr, i, "west");
      }
    }
    //////////////////////////////////////////
    if (arr[i].moveTo === "top") {
      if (arr[i].PrvElPos === "south") {
        arr[i + 1].moveTo = "top";
        arr[i + 1].top--;
        arr[i + 1].el.style.top = `${arr[i + 1].top}px`;
        // console.log("west");
      }
      if (arr[i].PrvElPos === "east") {
        animeSetBA(arr, i);
        animeMoveHorizontal(arr, i, "left");
        animeResetAB(arr, i, "south");
      }
      if (arr[i].PrvElPos === "west") {
        animeSetBA(arr, i);
        animeMoveHorizontal(arr, i, "right");
        animeResetAB(arr, i, "south");
      }
    }

    ////////////////////////////////////////////////////////////
    if (arr[i].moveTo === "bottom") {
      if (arr[i].PrvElPos === "north") {
        arr[i + 1].moveTo = "bottom";
        arr[i + 1].top++;
        arr[i + 1].el.style.top = `${arr[i + 1].top}px`;
      }
      if (arr[i].PrvElPos === "east") {
        animeSetBA(arr, i);
        animeMoveHorizontal(arr, i, "left");
        animeResetAB(arr, i, "north");
      }
      if (arr[i].PrvElPos === "west") {
        animeSetBA(arr, i);
        animeMoveHorizontal(arr, i, "right");
        animeResetAB(arr, i, "north");
      }
    }
    /////////////////////////////////////////////////////////
    if (arr[i].moveTo === "left") {
      if (arr[i].PrvElPos === "east") {
        arr[i + 1].moveTo = "left";
        arr[i + 1].left--;
        arr[i + 1].el.style.left = `${arr[i + 1].left}px`;
      }
      if (arr[i].PrvElPos === "north") {
        animeSetBA(arr, i);
        animeMoveVertical(arr, i, "bottom");
        animeResetAB(arr, i, "east");
      }
      if (arr[i].PrvElPos === "south") {
        animeSetBA(arr, i);
        animeMoveVertical(arr, i, "top");
        animeResetAB(arr, i, "east");
      }
    }
  }
};

////////////////////////////////////////////////////////////

const startGame = function () {
  document.querySelector(".main").classList.remove("before-begin");
  randomMeal();
  init();
  snakeObservePlaybox();
  option.removeEventListener("click", options);
  document.querySelector(".options").style.display = "none";
};
///////////////////////////////////////////////////////
const randomMeal = function () {
  const randomNumBtw = function (a, b) {
    const randomNum = Math.random() * (Math.abs(b - a) + 1) + a;
    return randomNum;
  };
  meal = new MealConstructor(
    mealBox,
    randomNumBtw(1, 357),
    randomNumBtw(1, 580)
  );
};

/////////////////////////////////////////////////
const checkPoint = function () {
  // console.log(el0.top, el0.left, meal.top, meal.left);
  if (
    Math.abs(el0.top - meal.top) < 15 &&
    Math.abs(el0.left - meal.left) < 15
  ) {
    randomMeal();
    AddSnakeBack();
    score += 10;
    scoreLabel.textContent = `${score}`;
  }
};
const AddSnakeBack = function () {
  const html = `<div class="snake-box">&nbsp;</div>`;
  snakeContainer.insertAdjacentHTML("beforeend", html);
  snakeArr = [...document.querySelectorAll(".snake-box")];
  const newSnake = new SnakeContructor(snakeArr[snakeArr.length - 1], null);
  snArr.push(newSnake);
  if (snArr[snArr.length - 2].moveTo === "right") {
    newSnake.left = snArr[snArr.length - 2].left - 20;
    newSnake.top = snArr[snArr.length - 2].top;
    newSnake.el.style.left = `${newSnake.left}px`;
    newSnake.el.style.top = `${newSnake.top}px`;
    snArr[snArr.length - 2].PrvElPos = "west";
  }
  if (snArr[snArr.length - 2].moveTo === "left") {
    newSnake.left = snArr[snArr.length - 2].left + 20;
    newSnake.top = snArr[snArr.length - 2].top;
    newSnake.el.style.left = `${newSnake.left}px`;
    newSnake.el.style.top = `${newSnake.top}px`;
    snArr[snArr.length - 2].PrvElPos = "east";
  }
  if (snArr[snArr.length - 2].moveTo === "top") {
    newSnake.left = snArr[snArr.length - 2].left;
    newSnake.top = snArr[snArr.length - 2].top + 20;
    newSnake.el.style.left = `${newSnake.left}px`;
    newSnake.el.style.top = `${newSnake.top}px`;
    snArr[snArr.length - 2].PrvElPos = "south";
  }
  if (snArr[snArr.length - 2].moveTo === "bottom") {
    newSnake.left = snArr[snArr.length - 2].left;
    newSnake.top = snArr[snArr.length - 2].top - 20;
    newSnake.el.style.left = `${newSnake.left}px`;
    newSnake.el.style.top = `${newSnake.top}px`;
    snArr[snArr.length - 2].PrvElPos = "north";
  }
};

const failure = function () {
  option.addEventListener("click", options);
  clearMotion();
  document.querySelector(".main").classList.add("restart");
  document.removeEventListener("keydown", snakeMotion);
  highScore();
};

const snakeObservePlaybox = function () {
  const snakeObserver = new IntersectionObserver(
    function (ent, observer) {
      const [ent1] = ent;
      if (!ent1.isIntersecting) {
        failure();
      }
    },
    {
      root: playingBox,
      threshold: 1,
    }
  );
  snakeObserver.observe(leadingSnake);
};

const snakeCrossObserver = function () {
  for (let i = 2; i < snArr.length; i++) {
    if (
      Math.abs(el0.top - snArr[i].top) < 17 &&
      Math.abs(el0.left - snArr[i].left) < 17
    ) {
      if (el0.b) {
        el0.b = false;
        failure();
      }
    }
    const start = document.querySelector(".btn-start");
  }
};
const inits = function () {
  document.querySelector(".options").style.display = "none";
  option.removeEventListener("click", options);
  clearMotion();
  randomMeal();
  document.querySelector(".main").classList.remove("restart");
  el0.b = true;
  snArr = [el0, el1, el2, el3];
  el0.left = 60;
  el1.left = 40;
  el3.top = el2.top = el1.top = el0.top = el2.left = 20;
  el3.b = el3.a = el2.b = el2.a = el1.b = el1.a = el0.a = el3.left = 0;
  el0.ones = el1.ones = el2.ones = el3.ones = true;
  el0.moveTo = el1.moveTo = el2.moveTo = el3.moveTo = el3.PrvElPos = null;
  el0.PrvElPos = el1.PrvElPos = el2.PrvElPos = "west";
  el0.el.style.top =
    el3.el.style.top =
    el2.el.style.top =
    el1.el.style.top =
    el2.el.style.left =
      `2rem`;
  el0.el.style.left = `6rem`;
  el1.el.style.left = `4rem`;
  el3.el.style.left = `0rem`;
  score = 0;
  scoreLabel.textContent = 0;
  snakeObservePlaybox();
  snakeArr.forEach(function (el, i, arr) {
    if (i > 2) {
      arr[i].remove();
    }
  });
  init();
  document.addEventListener("keydown", snakeMotion);
};
// speed = 7;
const highS = document.createElement("div");
const scoreE = document.createElement("div");
const highScore = function () {
  highS.classList.add("hscore");
  scoreE.classList.add("scoreE");
  if (score > hScore) hScore = score;
  scoreE.textContent = `Score: ${score}`;
  highS.textContent = `HighScore: ${hScore}`;
  restart.before(scoreE);
  restart.before(highS);
};

const options = function () {
  document.querySelector(".options").style.display = "flex";
};
const easySp = function () {
  speed = 10;
  document.querySelector(".options").style.display = "none";
};

const mediumSp = function () {
  speed = 7;
  document.querySelector(".options").style.display = "none";
};
const hardSp = function () {
  speed = 5;
  document.querySelector(".options").style.display = "none";
};

medium.addEventListener("click", mediumSp);
hard.addEventListener("click", hardSp);
easy.addEventListener("click", easySp);
option.addEventListener("click", options);
document.addEventListener("keydown", snakeMotion);
start.addEventListener("click", startGame);
restart.addEventListener("click", inits);
