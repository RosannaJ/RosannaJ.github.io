// global variables
var speedOfPaddle1 = 0;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var speedOfPaddle2 = 0;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameboardHeight = document.getElementById("gameboard").offsetHeight;
const gameboardWidth = document.getElementById("gameboard").offsetWidth;

const ballDiameter = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;
var ballMinSpeed = 3;

var score1 = 0;
var score2 = 0;

var bounce = new sound("sound/bounce.mp3");
var bounce2 = new sound("sound/bounce2.mp3");
var miss = new sound("sound/buzzer.mp3");

// used to control game start/stop
var controlPlay;


// object constructor to play sounds
// https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
} // sound

// move paddles
document.addEventListener('keydown', function(e) {
	
	//console.log("key down: " + e.keyCode);

	if (e.keyCode == 87 || e.which == 87) { // W key
		speedOfPaddle1 = -10;
	} // if
	if (e.keyCode == 83 || e.which == 83) { // S key
		speedOfPaddle1 = 10;
	} // if	
	
	if (e.keyCode == 38 || e.which == 38) { // UP arrow
		speedOfPaddle2 = -10;
	} // if
	if (e.keyCode == 40 || e.which == 40) { // DOWN arrow
		speedOfPaddle2 = 10;
	} // if	

});

// stop paddles
document.addEventListener('keyup', function(e) {
	
	// console.log("key up: " + e.keyCode);

	if (e.keyCode == 87 || e.which == 87) { // W key
			speedOfPaddle1 = 0;
	} // if
	if (e.keyCode == 83 || e.which == 83) { // S key
			speedOfPaddle1 = 0;
	} // if

  if (e.keyCode == 38 || e.which == 38) { // UP arrow
		speedOfPaddle2 = 0;
	} // if
	if (e.keyCode == 40 || e.which == 40) { // DOWN arrow
		speedOfPaddle2 = 0;
	} // if	
 });

// start ball movement
function startBall() {
	let direction_x = 1;
	let direction_y = 1;

	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;

	// 50% chance of starting right or left/up or down
	direction_x = (Math.random() < 0.5) ? 1 : -1;
	direction_y = (Math.random() < 0.5) ? 1 : -1;

	topSpeedOfBall = direction_y * (Math.random() * 2 + ballMinSpeed); // 3-4.9999
	leftSpeedOfBall = direction_x * (Math.random() * 2 + ballMinSpeed);

} // startBall

// update locations of paddles and ball
function show() {

	// update positions of elements
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;

	// stop paddles from leaving top of gameboard
	if (positionOfPaddle1 <= 0) {
		positionOfPaddle1 = 0;
	} // if
	if (positionOfPaddle2 <= 0) {
		positionOfPaddle2 = 0;
	} // if

	// stop the paddles from leaving bottom of gameboard
	if (positionOfPaddle1 >= gameboardHeight - paddleHeight) {
		positionOfPaddle1 = gameboardHeight - paddleHeight;
	} // if
	if (positionOfPaddle2 >= gameboardHeight - paddleHeight) {
		positionOfPaddle2 = gameboardHeight - paddleHeight;
	} // if

	// if ball hits top or bottom of gameboard, change direction
	if (topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballDiameter) {
		bounce2.play();
		topSpeedOfBall *= -1;
	} // if

	// if ball touches left edge of gameboard
	if (leftPositionOfBall <= paddleWidth) {
		
		// if ball hits left paddle, change direction
		if (topPositionOfBall >= positionOfPaddle1 && topPositionOfBall <= positionOfPaddle1 + paddleHeight) {
			bounce.play();
			leftPositionOfBall = paddleWidth;
			if(topPositionOfBall == positionOfPaddle1 || topPositionOfBall == positionOfPaddle1 + paddleHeight) {
				leftSpeedOfBall /= 2;
			} else {
				leftSpeedOfBall *= -1;
			} // else
			
		} else if (leftPositionOfBall <= 0) {

			miss.play();

			// update score
			score2 += 1;
		  document.getElementById("score2").innerHTML = score2;

		  // make ball faster
		  ballMinSpeed += 0.5;

		  // reset ball
			startBall();
		} // else
	} // if

	// if ball touches right edge of gameboard
	if (leftPositionOfBall >= gameboardWidth - paddleWidth - ballDiameter) {
		
		// if ball hits right paddle, change direction
		if (topPositionOfBall >= positionOfPaddle2 && topPositionOfBall <= positionOfPaddle2 + paddleHeight) {
			bounce.play();
			leftPositionOfBall= gameboardWidth - paddleWidth - ballDiameter;

			if (topPositionOfBall == positionOfPaddle2 || topPositionOfBall == positionOfPaddle2 + paddleHeight) {
				leftSpeedOfBall /= 2;
			} else {
				leftSpeedOfBall *= -1;
			} // else

		} else if (leftPositionOfBall + ballDiameter >= gameboardWidth) {
			
			miss.play();

			// update score
			score1 += 1;
		  document.getElementById("score1").innerHTML = score1;

		  // make ball faster
		  ballMinSpeed += 0.5;

		  // reset ball
			startBall();
		} // else
	} // if

	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";

	// end game if someone gets to 10 points
	if (score1 == 10 || score2 == 10) {
		stopGame();
	} // if

} // show

// start the game
function startGame() {

	// reset scores and ball/paddle locations
	score1 = 0;
	score2 = 0;
  document.getElementById("score1").innerHTML = score1;
  document.getElementById("score2").innerHTML = score2;

	positionOfPaddle1 = startPositionOfPaddle1;
  positionOfPaddle2 = startPositionOfPaddle2;
  ballMinSpeed = 3;

	startBall();

	if (!controlPlay) {
		controlPlay = window.setInterval(show, 1000/60);
	} // if

} // startGame

// stop the game
function stopGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;

	// show lightbox with score
	let message1 = "Tie";
	let message2 = "Close to Continue.";

	if (score2 > score1) {
		message1 = "Player 2 won with " + score2 + " point(s)!";
		message2 = "Player 1 had " + score1 + " point(s).";
	} else if (score1 > score2) {
		message1 = "Player 1 won with " + score1 + " point(s)!";
		message2 = "Player 2 had " + score2 + " point(s).";
	} // else if
	
	showLightBox(message1, message2);

} // stopGame

// pause game play
function pauseGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;
} // pauseGame

// resume game play
function resumeGame() {
	if (!controlPlay) {
		controlPlay = window.setInterval(show, 1000/60);
	} // if
} // resumeGame

/********* Light Box *********/

// change the visibility of divId
function changeVisibility(divId) {
  let elem = document.getElementById(divId);
  
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
} // closeLightBox

/********* End of Light Box *********/