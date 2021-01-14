let currentPlayer = "X"; // symbol of current player
let gameStatus = ""; // "" - continue, "Tie", "X Wins", "O Wins"
let turn = 0; // number of turns
let idNames = ["one", "two", "three", "four", "five", "six", 
                "seven", "eight", "nine"]
let cb = []; // current board
let computerTurnTaken = false; // if computer has picked a box yet

// update cb to match the current board
function updateBoard() {
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;
} // updateBoard
                
// reset board and all variables
function newGame() {
  for (var i = 0; i < idNames.length; i++) {
    document.getElementById(idNames[i]).innerHTML = "";
  } // for
  
  turn = 0;
  gameStatus = "";
  currentPlayer = "X";
  
  changeVisibility("controls");
  
} // newGame

// computer chooses a box
function computerTakeTurn() {
  let idName = ""; // id name of box
  computerTurnTaken = false; // reset computerTurnTaken
	  
  // if two O's in a row, place third
  fillThirdBox("O");

  if (!computerTurnTaken) {
  
	  // if two X's in a row, block third
	  fillThirdBox("X");

	} // if

  // place center
  if (!computerTurnTaken && cb[5] == "") {
  	document.getElementById("five").innerHTML = currentPlayer;
  	cb[5] = currentPlayer;
  	computerTurnTaken = true;
  } // if


	if (computerTurnTaken == false) {
		// choose random boxes until an empty box is found
	  do {
	    let rand = parseInt(Math.random()*9) + 1;
	    idName = idNames[rand-1];
	    
	    // check if chosen box is empty
	    if (document.getElementById(idName).innerHTML == "") {
	      document.getElementById(idName).innerHTML = currentPlayer;
	      break;
	    } // if  
	  } while (true);
	  updateBoard();
	} // if

} // computerTakeTurn

// chooses the third box if there are any two in a row/column/diagonal
function fillThirdBox(x) {
	
	// first row
	if (cb[1] == x && cb[1] == cb[2] && cb[3] == "") {
    document.getElementById("three").innerHTML = currentPlayer;
    cb[3] = currentPlayer;
	} else if (cb[2] == x && cb[2] == cb[3] && cb[1] == "") {
    document.getElementById("one").innerHTML = currentPlayer;
    cb[1] = currentPlayer;
	} else if (cb[1] == x && cb[1] == cb[3] && cb[2] == "") {
    document.getElementById("two").innerHTML = currentPlayer;
    cb[2] = currentPlayer;
	} // else if

  // second row
	else if (cb[4] == x && cb[4] == cb[5] && cb[6] == "") {
    document.getElementById("six").innerHTML = currentPlayer;
    cb[6] = currentPlayer;
	} else if (cb[5] == x && cb[5] == cb[6] && cb[4] == "") {
    document.getElementById("four").innerHTML = currentPlayer;
    cb[4] = currentPlayer;
	} else if (cb[4] == x && cb[4] == cb[6] && cb[5] == "") {
    document.getElementById("five").innerHTML = currentPlayer;
    cb[5] = currentPlayer;
	} // else if

	// third row
	else if (cb[7] == x && cb[7] == cb[8] && cb[9] == "") {
    document.getElementById("nine").innerHTML = currentPlayer;
    cb[9] = currentPlayer;
	} else if (cb[8] == x && cb[8] == cb[9] && cb[7] == "") {
    document.getElementById("seven").innerHTML = currentPlayer;
    cb[7] = currentPlayer;
	} else if (cb[7] == x && cb[7] == cb[9] && cb[8] == "") {
    document.getElementById("eight").innerHTML = currentPlayer;
    cb[8] = currentPlayer;
	} // else if

	// first column
	else if (cb[1] == x && cb[1] == cb[4] && cb[7] == "") {
    document.getElementById("seven").innerHTML = currentPlayer;
    cb[7] = currentPlayer;
	} else if (cb[4] == x && cb[4] == cb[7] && cb[1] == "") {
    document.getElementById("one").innerHTML = currentPlayer;
    cb[1] = currentPlayer;
	} else if (cb[1] == x && cb[1] == cb[7] && cb[4] == "") {
    document.getElementById("four").innerHTML = currentPlayer;
    cb[4] = currentPlayer;
	} // else if

	// second column
	else if (cb[2] == x && cb[2] == cb[5] && cb[8] == "") {
    document.getElementById("eight").innerHTML = currentPlayer;
    cb[8] = currentPlayer;
	} else if (cb[5] == x && cb[5] == cb[8] && cb[2] == "") {
    document.getElementById("two").innerHTML = currentPlayer;
    cb[2] = currentPlayer;
	} else if (cb[2] == x && cb[2] == cb[8] && cb[5] == "") {
    document.getElementById("five").innerHTML = currentPlayer;
    cb[5] = currentPlayer;
	} // else if

	// third column
	else if (cb[3] == x && cb[3] == cb[6] && cb[9] == "") {
    document.getElementById("nine").innerHTML = currentPlayer;
    cb[9] = currentPlayer;
	} else if (cb[6] == x && cb[6] == cb[9] && cb[3] == "") {
    document.getElementById("three").innerHTML = currentPlayer;
    cb[3] = currentPlayer;
	} else if (cb[3] == x && cb[3] == cb[9] && cb[6] == "") {
    document.getElementById("six").innerHTML = currentPlayer;
    cb[6] = currentPlayer;
	} // else if

	// top left to bottom right
	else if (cb[1] == x && cb[1] == cb[5] && cb[9] == "") {
    document.getElementById("nine").innerHTML = currentPlayer;
    cb[9] = currentPlayer;
	} else if (cb[5] == x && cb[5] == cb[9] && cb[1] == "") {
    document.getElementById("one").innerHTML = currentPlayer;
    cb[1] = currentPlayer;
	} else if (cb[1] == x && cb[1] == cb[9] && cb[5] == "") {
    document.getElementById("five").innerHTML = currentPlayer;
    cb[5] = currentPlayer;
	} // else if

	// top right to bottom left
	else if (cb[3] == x && cb[3] == cb[5] && cb[7] == "") {
    document.getElementById("seven").innerHTML = currentPlayer;
    cb[7] = currentPlayer;
	} else if (cb[5] == x && cb[5] == cb[7] && cb[3] == "") {
    document.getElementById("three").innerHTML = currentPlayer;
    cb[3] = currentPlayer;
	} else if (cb[3] == x && cb[3] == cb[7] && cb[5] == "") {
    document.getElementById("five").innerHTML = currentPlayer;
    cb[5] = currentPlayer;
	} else {
		return;
	} // else

	computerTurnTaken = true;

} // fillThirdBox

// take player turn
function playerTakeTurn(e) {
	
	// prevent player from placing during computer's turn
	if (turn % 2 != 0) {
		return;
	} //if

	if (e.innerHTML == "") {
		e.innerHTML = currentPlayer;
		updateBoard();
		checkGameStatus();
    
    // if game not over, computer goes
    if (gameStatus == "") {
      setTimeout(function() {
          computerTakeTurn();
          checkGameStatus();
        }, 200
      );
    } //if
    
	} else {
		showLightBox("This box is already selected.", "")
		return;
	} // else

} // playerTakeTurn

// after each turn, check for a win, tie, or continue
function checkGameStatus() {
	turn++; // count turn

	// check for a win
	if (checkWin()) {
		gameStatus = currentPlayer + " won!";
	} // if

	// check for tie
	else if (turn == 9) {
		gameStatus = "Tie";
	} // if


	if (gameStatus != "") {
		setTimeout(function() {showLightBox(gameStatus, "Game Over.");}, 200);
	} // if

	//switch current player
	currentPlayer = ((currentPlayer == "X") ? "O" : "X");

} // checkGameStatus

// check for win, there are 8 win paths
function checkWin() {
  
	// first row
	if (cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]) {
		return true;
	} // if

	// second row
	if (cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]) {
		return true;
	} // if

  // third row
	if (cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]) {
		return true;
	} // if

	// first column
	if (cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]) {
		return true;
	} // if

  // second column
	if (cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]) {
		return true;
	} // if

	// third column
	if (cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]) {
		return true;
	} // if

	// top left to bottom right
	if (cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]) {
		return true;
	} // if

	// top right to bottom left
	if (cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]) {
		return true;
	} // if

} // checkWin

// change the visibility of divId
function changeVisibility(divId) {
  let elem = document.getElementById(divId);
  
  // if element exists, it is considered true
  if (elem) {
    elem.className = (elem.className == "hidden") ? "unhidden" : "hidden";
  } // if
  
} // changeVisibility

// display message in lightbox
function showLightBox(message, message2) {

	// set messages
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;

	// show lightbox
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
} // showLightBox

// close the lightbox
function closeLightBox() {
  changeVisibility("lightbox");
  changeVisibility("boundaryMessage");
  
  // if the game is over, show controls
  if (gameStatus != "") {
    changeVisibility("controls");
  } // if
} // closeLightBox
