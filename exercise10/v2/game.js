const levels = [
    
    // level 0
    ["flag", "rock", "", "", "",
     "fenceside", "rock", "", "", "rider",
     "", "tree", "animate", "animate", "animate",
     "", "fence", "", "water", "",
     "", "fence", "", "fence", "horseup"],
    
    // level 1
    ["", "fence", "", "horseup", "",
     "fenceside", "rock", "fenceside", "water", "",
     "", "tree", "animate", "bridge animate", "animate",
     "", "fence", "", "water", "",
     "flag", "", "rock", "rider", ""],

    // level 2
    ["horsedown", "", "water", "", "",
     "", "water", "flag", "water", "fenceside",
     "animate", "bridge animate", "bridge animate", "bridge animate", "animate",
     "", "water", "water", "water", "",
     "", "", "", "", "rider"],

    // level 3
    ["horsedown", "animate", "", "", "",
     "", "animate", "fenceside", "fenceside", "",
     "", "animate", "flag", "bridge", "",
     "", "animate", "fenceside", "water", "",
     "", "animate", "", "", "rider"]
    ]; // end of levels

const animationOfLevels = ["right", "right", "right", "down"];    

/*
 * Fixed: when enemy runs into player, player loses a life
 * Fixed: prevents player from jumping fence from wrong direction
 * Added: lives
 * Added: restart option after game ends
 * Added: animate up/down enemy movement
 */ 
 
// could use 2d arrays
//*Shouldn't be able to jump if behind fence is a rock/tree/other fence/etc.*
//*will be a bug if fence is next to a bridge*



const noPassObstacles = ["rock", "tree", "water"];
const gameBoardWidth = 5;
const gridBoxes = document.querySelectorAll("#gameBoard div");

var currentLevel = 0; // starting level
var riderOn = false;  // is the rider on?
var currentLocation = 0;
var currentAnimation; // allows 1 animation per level (add more variables for more animations)
var stopGame = false;
var lives = 3;

// // start game
// window.addEventListener("load", function() {
//   loadLevel();
// });

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
} // stasrtGame

// move horse
document.addEventListener("keydown", function(e) {
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
      if (currentLocation + gameBoardWidth < gameBoardWidth * gameBoardWidth) {
        tryToMove("down");
      } // if
      break;
  } // switch
}); // key event listener

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

  //console.log(direction);

  nextClass = gridBoxes[nextLocation].className;

  //console.log(nextClass);

  // if obstacle is not passable, don't move
  if (noPassObstacles.includes(nextClass)) { 
    console.log("You can't go through that.");
    return; 
  } // if

  // if it's a fence, and there is no rider, don't move
  if (!riderOn && nextClass.includes("fence")) { 
    console.log("No rider, can't jump over fence.");
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
    if (riderOn) { //*** will be a bug if fence is next to a bridge***
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

        //** Shouldn't be able to jump if behind fence is a rock/tree/etc.***

        // show horse and rider after landing
        gridBoxes[currentLocation].className = nextClass2;

        // if next box is flag, go to next level
        levelUp(nextClass);
        //?

      }, 150);
      return;
    } // if
  } // if class has fence

  // if there is a rider, add rider
  if (nextClass == "rider") {
    riderOn = true;
    //console.log("riderOn: " + riderOn);
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
  } else {
    //console.log("no bridge in next location.");
  }

  // move 1 space
  currentLocation = nextLocation;
  gridBoxes[currentLocation].className = newClass;

  // if it is an enemy
  if (nextClass.includes("enemy")) {
    stopGame = true;
    hitEnemy();
    return;
  } // if


  // move to next level if goal reached
  levelUp(nextClass);

  //console.log("newClass: " + newClass);

} // tryToMove

// move to next level
function levelUp(nextClass) {
  if (nextClass == "flag" && riderOn) {
    
    clearTimeout(currentAnimation);
    
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
  let animateBoxes;
  riderOn = false;
  stopGame = false;
  
  // load board
  for (i = 0; i < gridBoxes.length; i++) {
    gridBoxes[i].className = levelMap[i];
    if (levelMap[i].includes("horse")) { currentLocation = i; }
  } // for

  animateBoxes = document.querySelectorAll(".animate");
  
  animateEnemy(animateBoxes, 0, animationOfLevels[currentLevel]);//*add for up/down movement*

} // loadLevel

// animate enemy left to right or up and down
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
function animateEnemy(boxes, index, direction) {
  
  // exit function if no animation
  if (boxes.length <= 0) { return; }

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

  currentAnimation = setTimeout (function() {
      animateEnemy(boxes, index, direction);
    }, 450);
} // animateEnemy

function hitEnemy() {
  
  if (lives == 0) {
    setTimeout (function() {
      document.getElementById("lose").style.display = "none";
      endGame("dead");
    }, 700);
  } else {

    // display lose message
    document.getElementById("lose").style.display = "block";
    //console.log("Game Lost: You hit an enemy");
    clearTimeout(currentAnimation);
    setTimeout (function() {
      document.getElementById("lose").style.display = "none";
      loadLevel();
    }, 1000);
  } // else

} // updateLives

function endGame(state) {
 //console.log("endGame"); 
 //clearTimeout(currentAnimation);

  // end screen for losing
  if (state == "dead") {
    document.getElementById("end").style.display = "block";
  } // if

  // end screen for winning
  else {
    document.getElementById("endMessage").innerHTML = "You Won!";
    document.getElementById("start").innerHTML = "Play Again";
    document.getElementById("end").style.display = "block";
  } // else
} // endGame

function updateLives() {
   let elem = document.getElementById("lives");
   let output = "";
  for (var i = 1; i <= lives; i++) {
    output += "*";
  } // for
  elem.innerHTML = output;
} // updateLives
