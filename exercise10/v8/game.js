const levels = [

      // level 0
      ["tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "flag", "tree",
      "tree", "animate", "", "", "", "", "", "", "", "", "", "", "tree", "fenceside", "tree",
      "horseright", "animate", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "", "tree", "animate2", "tree",
      "tree", "animate", "", "", "", "", "tree", "", "", "", "tree", "", "tree", "animate2", "tree",
      "tree", "animate", "tree", "tree", "tree", "", "", "", "tree", "", "tree", "", "tree", "animate2", "tree",
      "tree", "animate", "tree", "", "tree", "tree", "tree", "tree", "tree", "", "tree", "", "tree", "animate2", "tree",
      "tree", "animate", "tree", "", "", "", "", "", "tree", "", "tree", "tree", "tree", "animate2", "tree",
      "tree", "animate", "", "animate3", "animate3", "animate3", "animate3", "animate3", "tree", "", "", "", "", "animate2", "tree",
      "tree", "animate", "tree", "tree", "tree", "tree", "tree", "", "tree", "tree", "tree", "tree", "tree", "animate2", "tree",
      "tree", "animate", "", "", "", "", "", "", "", "", "", "rider", "tree", "animate2", "tree",
      "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree"],

      // level 1
      ["tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree",
      "tree", "animate", "", "", "", "", "", "", "", "", "", "", "", "rider", "tree",
      "tree", "animate", "tree", "", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "", "tree", "tree", "tree",
      "tree", "animate", "", "", "", "", "", "", "tree", "", "tree", "", "tree", "tree", "tree",
      "tree", "animate", "tree", "", "tree", "", "", "", "tree", "", "tree", "", "tree", "", "tree",
      "tree", "", "tree", "", "tree", "tree", "tree", "tree", "tree", "", "tree", "", "tree", "", "tree",
      "tree", "", "tree", "", "", "", "", "", "tree", "", "tree", "tree", "tree", "", "tree",
      "flag", "fence", "", "animate3", "animate3", "animate3", "animate3", "animate3", "", "", "", "", "", "", "tree",
      "tree", "", "tree", "tree", "tree", "tree", "tree", "", "tree", "tree", "tree", "tree", "tree", "", "tree",
      "tree", "", "", "", "", "", "", "animate2", "animate2", "animate2", "", "", "tree", "", "tree",
      "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "horseup", "tree"],

      // level 2
      ["tree", "flag", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree",
      "tree", "animate", "fence", "", "", "", "", "", "", "animate2", "animate2", "animate2", "animate2", "animate2", "tree",
      "tree", "animate", "tree", "", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "", "tree", "tree", "tree",
      "tree", "animate", "", "", "", "", "", "", "tree", "", "", "rider", "tree", "tree", "tree",
      "tree", "animate", "tree", "", "tree", "", "", "", "tree", "fenceside", "tree", "", "tree", "", "tree",
      "tree", "", "tree", "", "tree", "tree", "tree", "tree", "tree", "", "tree", "", "tree", "", "tree",
      "tree", "", "tree", "", "", "", "", "", "tree", "", "tree", "tree", "tree", "", "tree",
      "tree", "", "", "animate3", "animate3", "animate3", "animate3", "animate3", "animate3", "animate3", "animate3", "animate3", "animate3", "animate3", "tree",
      "tree", "", "tree", "tree", "tree", "tree", "tree", "", "tree", "tree", "tree", "tree", "tree", "", "horseleft",
      "tree", "", "", "", "", "", "", "", "", "", "", "", "tree", "", "tree",
      "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree"]

    ]; // end of levels


// animation
const animationOfLevels1 = ["down", "down", "down"];
const animationOfLevels2 = ["down", "left", "left"];
const animationOfLevels3 = ["left", "left", "left"];

var animation1; // allows 1 animation per level (add more variables for more animations)
var animation2;
var animation3;

var animateBoxes;

// gameBoard
const noPassObstacles = ["rock", "tree", "water"];
const gameBoardWidth = 15;
const gameBoardHeight = 11;
const gridBoxes = document.querySelectorAll("#gameBoard div");

var currentLevel = 0; // starting level
var riderOn = false;  // is the rider on?
var currentLocation = 0;

// gameplay
var stopGame = false;
var lives = 3;

//document.onkeydown = function (e) {keydownEventListener(e);}

function keydownEventListener(e) {
  if (stopGame) {
    return;
  } // if
  
  switch (e.keyCode) {
    case 37: // left arrow
      if (currentLocation % gameBoardWidth !== 0) {
        tryToMove("left");
      } // if
      break;
    case 38: // up arrow
      if (currentLocation >= gameBoardWidth) {
        tryToMove("up");
      } // if
      break;
    case 39: // right arrow
      if (currentLocation % gameBoardWidth < gameBoardWidth - 1) {
        tryToMove("right");
      } // if
      break;
    case 40: // down arrow
      if (currentLocation + gameBoardWidth < gameBoardWidth * gameBoardHeight) {
        tryToMove("down");
      } // if
      break;
  } // switch
} // keydownEventListener


// start the game
function startGame() {
  
  // reset variables
  currentLevel = 0;
  riderOn = false;
  
  // reset lives
  lives = 3;
  updateLives();

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("end").style.display = "none";

  loadLevel();
  
  document.onkeydown = function (e) {keydownEventListener(e);}
} // stasrtGame

// try to move character
function tryToMove (direction) {
  let oldLocation = currentLocation; // location before move
  let oldClassName = gridBoxes[oldLocation].className; // class of location before move
  
  let nextLocation = 0; // location we wish to move to
  let nextClass = "";   // class of location we wish to move to

  let nextLocation2 = 0; 
  let nextClass2 = "";

  let newClass = "";    // new class to switch to if move successful

  switch (direction) {
    case "left":
      nextLocation = currentLocation - 1;
      break;
    case "right":
      nextLocation = currentLocation + 1;
      break;
    case "up":
      nextLocation = currentLocation - gameBoardWidth;
      break;
    case "down":
      nextLocation = currentLocation + gameBoardWidth;
      break;
  } // switch

  nextClass = gridBoxes[nextLocation].className;

  // if obstacle is not passable, don't move
  if (noPassObstacles.includes(nextClass)) { 
    return; 
  } // if

  // if it's a fence, and there is no rider, don't move
  if (!riderOn && nextClass.includes("fence")) { 
    return; 
  } // if

  // if there is a fence and rider is on, move two spaces with animation
  if (nextClass.includes("fence")) {

    // cannot jump over fence from wrong direction
    if (nextClass == "fence" && (direction == "up" || direction == "down")) {
      return;
    } // if

    if (nextClass == "fenceside" && (direction == "right" || direction == "left")) {
      return;
    } // if

    // rider must be on to jump
    if (riderOn) {
      gridBoxes[currentLocation].className = "";
      oldClassName = gridBoxes[nextLocation].className

      // set values according to direction
      if (direction == "left") {
        nextClass = "jumpleft";
        nextClass2 = "horserideleft";
        nextLocation2 = nextLocation - 1;
      } else if (direction == "right") {
        nextClass = "jumpright";
        nextClass2 = "horserideright";
        nextLocation2 = nextLocation + 1;
      } else if (direction == "up") {
        nextClass = "jumpup";
        nextClass2 = "horserideup";
        nextLocation2 = nextLocation - gameBoardWidth;
      } else if (direction == "down") {
        nextClass = "jumpdown";
        nextClass2 = "horseridedown";
        nextLocation2 = nextLocation + gameBoardWidth;
      } // else if

      // show horse jumping
      gridBoxes[nextLocation].className = nextClass;

      setTimeout(function() {

        // set jump back to just a fence
        gridBoxes[nextLocation].className = oldClassName;

        // update current location of horse to 2 spaces past original
        currentLocation = nextLocation2;

        // get class of box after jump
        nextClass = gridBoxes[currentLocation].className;

        // show horse and rider after landing
        gridBoxes[currentLocation].className = nextClass2;

        // if next box is flag, go to next level
        levelUp(nextClass);

      }, 50);
    } // if
    return;
  } // if class has fence

  // if there is a rider, add rider
  if (nextClass == "rider") {
    riderOn = true;
  } // if

  // if there is a bridge in the old location, keep it
  if (oldClassName.includes("bridge")) {
    gridBoxes[oldLocation].className = "bridge";
  } else {
    gridBoxes[oldLocation].className = "";
  } // else

  // build name of new class (with/without rider)
  newClass = (riderOn) ? "horseride" : "horse";
  newClass += direction;

  // if there is a bridge in the next location, keep it
  if (gridBoxes[nextLocation].classList.contains("bridge")) {
    newClass += " bridge";
  } // if

  // move 1 space
  currentLocation = nextLocation;
  gridBoxes[currentLocation].className = newClass;

  // if it is an enemy
  if (nextClass.includes("enemy")) {
    stopGame = true;
    
    // update lives
    lives--;
    updateLives();
    
    hitEnemy();
    return;
  } // if


  // move to next level if goal reached
  levelUp(nextClass);

} // tryToMove

// move to next level
function levelUp(nextClass) {
  if (nextClass == "flag" && riderOn) {
    
    clearTimeout(animation1);
    clearTimeout(animation2);
    clearTimeout(animation3);
    
    // if not last level, go to next level
    if (currentLevel < levels.length - 1) {
      currentLevel++
      document.getElementById("levelUp").style.display = "block";
      
      setTimeout (function() {
        document.getElementById("levelUp").style.display = "none";
        loadLevel();
      }, 1000);
    } // if

    // if is last level, show end screen
    else {
      console.log("Completed all levels");
      endGame("win");
    } // else
  } // if
} //levelUp

// load levels (0 - maxLevel)
function loadLevel() {
  let levelMap = levels[currentLevel];
  //let animateBoxes;
  riderOn = false;
  stopGame = false;
  
  // load board
  for (i = 0; i < gridBoxes.length; i++) {
    gridBoxes[i].className = levelMap[i];
    if (levelMap[i].includes("horse")) { currentLocation = i; }
  } // for


  // animate enemy
  //animateBoxes = document.querySelectorAll(".animate");
  //animateEnemy(animateBoxes, 0, animationOfLevels1[currentLevel], animation1);
  //animateBoxes = document.querySelectorAll(".animate2");
  //animateEnemy(animateBoxes, 0, animationOfLevels2[currentLevel], animation2);
  //animateBoxes = document.querySelectorAll(".animate3");
  //animateEnemy(animateBoxes, 0, animationOfLevels3[currentLevel], animation3);
  
  startAnimation();

} // loadLevel

function startAnimation() {
  animateBoxes = document.querySelectorAll(".animate");
  animateEnemy(animateBoxes, 0, animationOfLevels1[currentLevel], animation1);
  animateBoxes = document.querySelectorAll(".animate2");
  animateEnemy(animateBoxes, 0, animationOfLevels2[currentLevel], animation2);
  animateBoxes = document.querySelectorAll(".animate3");
  animateEnemy(animateBoxes, 0, animationOfLevels3[currentLevel], animation3);
}

// animate enemy left to right or up and down
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
function animateEnemy(boxes, index, direction, currentAnimation) {
  
  // exit function if no animation or game is stopped
  if (boxes.length <= 0 || stopGame) { return; }

  // update images
  if (direction == "right") {
    boxes[index].classList.add("enemyright");
  } else if (direction == "left") {
    boxes[index].classList.add("enemyleft");
  } else if (direction == "up") {
    boxes[index].classList.add("enemyup");
  } else {
    boxes[index].classList.add("enemydown");
  } // else

  // remove images from other boxes
  for (i = 0; i < boxes.length; i++) {
    if (i != index) {
      boxes[i].classList.remove("enemyleft");
      boxes[i].classList.remove("enemyright");
      boxes[i].classList.remove("enemyup");
      boxes[i].classList.remove("enemydown");
    } // if
  } // for
  
  // if enemy hits horse
  if (boxes[index].className.includes("horse")) {
    console.log("*enemy hit the horse*");
    
    stopGame = true;
    
    // update lives
    lives--;
    console.log("num of lives: " + lives);
    updateLives();
    
    setTimeout(function() {
      hitEnemy();
    }, 350);
     return;
  } // if

  // moving right
  if (direction == "right") {
    
    // turn around if hit right side
    if (index == boxes.length - 1) {
      index--;
      direction = "left";
    } else {
      index++;
    } // else
  } // if

  // moving left
  else if (direction == "left") {
    
    // turn around if hit left side
    if (index == 0) {
      index++;
      direction = "right";
    } else {
      index--;
    } // else
  } // else if

  // moving up
  else if (direction == "up") {
    
    // turn around if hit top
    if (index == 0) {
      index++;
      direction = "down";
    } else {
      index--;
    } // else
  } // else if

  // moving down
  else if (direction == "down") {
    
    // turn around if hit bottom
    if (index == boxes.length - 1) {
      index--;
      direction = "up";
    } else {
      index++;
    } // else
  } // else if

  if (currentAnimation == animation1) {
    animation1 = setTimeout (function() {
        animateEnemy(boxes, index, direction, animation1);
      }, 450);
  } else if (currentAnimation == animation2) {
    animation2 = setTimeout (function() {
        animateEnemy(boxes, index, direction, animation2);
      }, 450);
  } else {
    animation3 = setTimeout (function() {
        animateEnemy(boxes, index, direction, animation3);
      }, 450);
  }
} // animateEnemy

function hitEnemy() {

  if (lives == 0) {
    setTimeout (function() {    
      endGame("dead");
    }, 700);
  } else {

    // display lose message
    document.getElementById("lose").style.display = "block";
    //console.log("Game Lost: You hit an enemy");
    clearTimeout(animation1);
    clearTimeout(animation2);
    clearTimeout(animation3);

    setTimeout (function() {
      document.getElementById("lose").style.display = "none";
      loadLevel();
    }, 1000);
  } // else

} // updateLives

function endGame(state) {

  // end screen for losing
  if (state == "dead") {
    document.getElementById("endMessage").innerHTML = "Game Over";
    document.getElementById("end").style.display = "block";
    document.getElementById("restart").innerHTML = "Try Again";
  } // if

  // end screen for winning
  else {
    document.getElementById("endMessage").innerHTML = "You Won!";
    document.getElementById("restart").innerHTML = "Play Again";
    document.getElementById("end").style.display = "block";
  } // else
} // endGame

function updateLives() {
  let elem = document.getElementById("lives");
  //let output = "";
  //for (var i = 1; i <= lives; i++) {
  //  output += "♥";
  //} // for
  //elem.innerHTML = output;
  
  elem.className = "heart" + lives;
  
} // updateLives