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
     "", "", "", "", "rider"]
    ]; // end of levels
    

// could use 2d arrays
//***** Shouldn't be able to jump if behind fence is a rock/tree/other fence/etc.***
//*** will be a bug if fence is next to a bridge***


const noPassObstacles = ["rock", "tree", "water"];
const gameBoardWidth = 5;
const gridBoxes = document.querySelectorAll("#gameBoard div");

var currentLevel = 0; //starting level
var riderOn = false;  // is the rider on?
var currentLocation = 0;
var currentAnimation; // allows 1 animation per level (add more variables for more animations)


// start game
window.addEventListener("load", function() {
  loadLevel();
});

// move horse
document.addEventListener("keydown", function(e) {
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

  // console.log(noPassObstacles.includes(nextClass));

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

        //***** Shouldn't be able to jump if behind is a rock/tree/etc.***

        // show horse and rider after landing
        gridBoxes[currentLocation].className = nextClass2;

        // if next box is flag, go to next level
        levelUp(nextClass);
        //???????????????????????????????????

      }, 150);
      return;
    } // if
  } // if class has fence


  // if there is a rider, add rider
  if (nextClass == "rider") {
    riderOn = true;
    console.log("riderOn: " + riderOn);
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
  if (gridBoxes[nextLocation].classList.contains("bridge")) {//!!!!could use .includes like above
    newClass += " bridge";
  } else {
    //console.log("no bridge in next location.");
  }

  // move 1 space
  currentLocation = nextLocation;
  gridBoxes[currentLocation].className = newClass;

  // if it is an enemy
  if (nextClass.includes("enemy")) {
    document.getElementById("lose").style.display = "block";
    console.log("Game Lost: You hit an enemy");
    return;
  } // if

  // move to next level if goal reached
  levelUp(nextClass);

  console.log("newClass: " + newClass);

} // tryToMove

// move to next level
function levelUp(nextClass) {
  if (nextClass == "flag" && riderOn) {
    document.getElementById("levelUp").style.display = "block";
    clearTimeout(currentAnimation);
    setTimeout (function() {
      document.getElementById("levelUp").style.display = "none";
      
      // add if statment for if is last level

      if (currentLevel < levels.length - 1) {
        currentLevel++
      } else {
        console.log("Completed all levels");
      }

      loadLevel();

    }, 1000);
  } // if
} //levelUp

// load levels (0 - maxLevel)
function loadLevel() {
  let levelMap = levels[currentLevel];
  let animateBoxes;
  riderOn = false;
  
  // load board
  for (i = 0; i < gridBoxes.length; i++) {
    gridBoxes[i].className = levelMap[i];
    if (levelMap[i].includes("horse")) { currentLocation = i; }
  } // for

  animateBoxes = document.querySelectorAll(".animate");
  
  animateEnemy(animateBoxes, 0, "right");

} // loadLevel

// animate enemy left to right (could add up and down to this)
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
function animateEnemy(boxes, index, direction) {
  // exit function if no animation
  if (boxes.length <= 0) { return; }
  
  // update images
  if (direction == "right") {
    boxes[index].classList.add("enemyright");
  } else {
    boxes[index].classList.add("enemyleft");
  } // else

  // remove images from other boxes
  for (i = 0; i < boxes.length; i++) {
    if (i != index) {
      boxes[i].classList.remove("enemyleft");
      boxes[i].classList.remove("enemyright");
    } // if
  } // for

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
  else {
    // turn around if hit right side
    if (index == 0) {
      index++;
      direction = "right";
    } else {
      index--;
    } // else
  } // if

  currentAnimation = setTimeout (function() {
      animateEnemy(boxes, index, direction);
    }, 750);

} // animateEnemy