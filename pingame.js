/*******************************************************/
// pingame.js
// Creates Pinball Game
/// Written by Remy Robert
/*******************************************************/
	
const firebaseConfig = {
    apiKey: "AIzaSyCB9Br_Jb9KqYC5mCiV88_Y--I677PEGtc",
    authDomain: "pin-that-ball-3fc56.firebaseapp.com",
    databaseURL: "https://pin-that-ball-3fc56-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pin-that-ball-3fc56",
    storageBucket: "pin-that-ball-3fc56.firebasestorage.app",
    messagingSenderId: "829901276897",
    appId: "1:829901276897:web:9cd58edd48463c763259a0",
    measurementId: "G-Z51N0FS158"
  };

	let timerL = 15
	let timerR = 15

	let pinScore = 0;

	let ballsSpawned = 1;

	let gameDifficulty = 5;

	let currentAngleL = 0;
	let targetAngleL = 0;
	const closedAngleL = 30;
	const openAngleL = -20;

	let currentAngleR = 0;
	let targetAngleR = 0;
	const closedAngleR = -30;
	const openAngleR = 20;

	const flipSpeed = 0.5;

	let obstacleBounciness = 1;

	let lives = 3;

	const flashDurationO1 = 30;
	let flashTimerO1 = 0;

	const flashDurationO2 = 30;
	let flashTimerO2 = 0;

	const flashDurationO3 = 30;
	let flashTimerO3 = 0;
	
	const flashDurationB1 = 30;
	let flashTimerB1 = 0;
	
	const flashDurationB2 = 30;
	let flashTimerB2 = 0;
/*******************************************************/
// setup()
/*******************************************************/
function setup() {
	console.log("Working")

	savedDifficulty = localStorage.getItem('difficulty');
	if (savedDifficulty === 'null') {
			gameDifficulty = 0;
		} else {
			gameDifficulty = Number(savedDifficulty)
			console.log("Loaded game difficulty '" + gameDifficulty + "' from local storage")
		}

	cnv = new Canvas(400, 800)
	world.gravity.y = gameDifficulty;
	
	ballGroup = new Group();
	obstacleGroup = new Group();

	ball_1 = new Sprite(random(10, 390), 700/2, 25)
	ball_1.color = 'white';
	ball_1.friction = 1;
	ball_1.drag = 0;
	ball_1.bounciness = 0;
	ballGroup.add(ball_1)

	flicker_left = new Sprite(140, 655, 100, 10, 's')
	flicker_left.color = 'red';

	flicker_right = new Sprite(260, 655, 100, 10, 's')
	flicker_right.color = 'red';
	
	catcher = new Sprite(200, 805, 400, 10, 'n')
	catcher.bounciness = -100
	
	pointBoxL = new Sprite(20, 40, 40, 80, 'n')
	
	pointBoxR = new Sprite(380, 40, 40, 80, 'n')

	scoreDisplay = new Sprite(200, 40, 0, 0, 'n')
	scoreDisplay.color = 'white';
	scoreDisplay.textSize = 32;
	
	difficultyDisplay = new Sprite(200, 80, 0, 0, 'n')
	difficultyDisplay.color = 'white';
	difficultyDisplay.textSize = 24;

	livesDisplay = new Sprite(200, 120, 0, 0, 'n')
	livesDisplay.color = 'white';
	livesDisplay.textSize = 24;

	// displays game difficulty
	if (gameDifficulty === 5) {
		difficultyDisplay.text = "Difficulty: Easy";
	} else if (gameDifficulty === 10) {
		difficultyDisplay.text = "Difficulty: Medium";
	} else if (gameDifficulty === 15) {
		difficultyDisplay.text = "Difficulty: Hard";
	}

	// sets obstacle bounciness based on difficulty chosen
	if (gameDifficulty === 5) {
		obstacleBounciness = 0.5;
	} else if (gameDifficulty === 10) {
		obstacleBounciness = 1;
	} else if (gameDifficulty === 15) {
		obstacleBounciness = 2;
	}

	basethings()
 }
/* creates the walls, roof, floor and obastacles of the pinball machine */
function basethings() {
	wall_left = new Sprite(5, 350, 10, 690, 's')
	wall_left.color = 'grey';

	wall_right = new Sprite(395, 350, 10, 690, 's')
	wall_right.color = 'grey';

	roof = new Sprite(200, 5, 400, 10, 's')
	roof.color = 'grey';

	floor_left = new Sprite(20, 695, 175, 200, 's')
	floor_left.color = 'grey';
	floor_left.rotation = 29;

	floor_right = new Sprite(380, 695, 175, 200, 's')
	floor_right.color = 'grey';
	floor_right.rotation = -29

	obstacle1 = new Sprite(200, 200, 50, 's')
	obstacle1.bounciness = obstacleBounciness;
	obstacleGroup.add(obstacle1)

	obstacle2 = new Sprite(100, 300, 50, 's')
	obstacle2.bounciness = obstacleBounciness;
	obstacleGroup.add(obstacle2)

	obstacle3 = new Sprite(300, 300, 50, 's')
	obstacle3.bounciness = obstacleBounciness;
	obstacleGroup.add(obstacle3)
}

// creates second ball when first one dies
function ball2() {
	ball_2 = new Sprite(random(10, 390), 700/2, 25)
	ball_2.color = 'white';
	ball_2.friction = 1;
	ball_2.bounciness = 0;
	lives = lives - 1;
	ballGroup.add(ball_2)
	// creats lots of blocks when ball dies
	for (i = 0; i < 100; i++) {
		console.log('alienss')
		alien = new Sprite(200, 720, 10, 10);
		alien.bounciness = 0;
		alien.friction = 0;
		alien.drag = 0;
	}
}

// creates third ball when second one diest
function ball3() {
	ball_3 = new Sprite(random(10, 390), 700/2, 25)
	ball_3.color = 'white';
	ball_3.friction = 1;
	ball_3.bounciness = 0;
	lives = lives - 1;
	ballGroup.add(ball_3)
	// creates lots of blocks when ball dies
	for (i = 0; i < 100; i++) {
		console.log('alienss')
		alien = new Sprite(200, 720, 10, 10);
		alien.bounciness = 0;
		alien.friction = 0;
		alien.drag = 0;
	}
}
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	background("grey")
	// displays the score on the screen
	scoreDisplay.text = "Score: " + pinScore;
	localStorage.setItem('score', pinScore);

	/*controls for left flipper*/
	if (kb.pressing('left')) {
		flicker_left.bounciness = 5;
		targetAngleL = openAngleL
		timerL = timerL-1
	} else {
		flicker_left.bounciness = 0;
		targetAngleL = closedAngleL
		timerL = 15
	}

	/*stops player from holding flipper up forever*/
	if (timerL <= 0) {
		flicker_left.bounciness = 0;
		targetAngleL = closedAngleL
		timerL = -15
	}

	/*smoothness of left flipper*/
	currentAngleL = lerp(currentAngleL, targetAngleL, flipSpeed);
	flicker_left.rotation = currentAngleL;

	/*controls for right flipper*/
	if (kb.pressing('right')) {
		flicker_right.bounciness = 5;
		targetAngleR = openAngleR
		timerR = timerR-1
	} else {
		flicker_right.bounciness = 0;
		targetAngleR = closedAngleR
		timerR = 15
	}

	/*stops player from holding flipper up forever*/
	if (timerR <= 0) {
		flicker_right.bounciness = 0;
		targetAngleR = closedAngleR
		timerR = -15
	}

	/*bouncess the ball when hitting flippers*/
	if (ballGroup.collides(flicker_left) && kb.pressing('left') && timerL >= 1 && timerR >= 1) {
		ballGroup.vel.y = -20
	}
	if (ballGroup.collides(flicker_right) && kb.pressing('right') && timerL >= 1 && timerR >= 1) {
		ballGroup.vel.y = -20
	}

	/*smoothness of right flipper*/
	currentAngleR = lerp(currentAngleR, targetAngleR, flipSpeed);
	flicker_right.rotation = currentAngleR;

	/*spawns new balls when the previous one is caught by the catcher*/
	if (ballGroup.overlaps(catcher) && ballsSpawned === 1) {
		ball2()
		ballsSpawned = 2;
		ballGroup.remove(ball_1)
	} else if (ballGroup.overlaps(catcher) && ballsSpawned === 2) {
		ball3()
		ballsSpawned = 3
		ballGroup.remove(ball_2)
	} else if (ballGroup.overlaps(catcher) && ballsSpawned === 3) {
		console.log('Game Over')
		ballGroup.remove(ball_3)
		for (i = 0; i < 100; i++) {
		console.log('alienss')
		alien = new Sprite(200, 720, 10, 10);
		alien.bounciness = 0;
		alien.friction = 0;
		alien.drag = 0;
	}
		window.location.href = "end.html"
	}
		
	/*adding to score when the ball hits the point box*/
	if (ballGroup.overlaps(pointBoxL)) {
		pinScore = pinScore + 100000;
		console.log(pinScore)
	}
	if (ballGroup.overlaps(pointBoxR)) {
		pinScore = pinScore + 100000;
		console.log(pinScore)
	}
	// if ball hits obstacle add points
	if (ballGroup.collides(obstacleGroup)) {
		pinScore = pinScore + 10000
	}
	// makes the obstacles and point boxes change color when hit
	if (ballGroup.collides(obstacle1)) {
		flashTimerO1 = flashDurationO1;
	}
	if (ballGroup.collides(obstacle2)) {
		flashTimerO2 = flashDurationO2;
	}
	if (ballGroup.collides(obstacle3)) {
		flashTimerO3 = flashDurationO3;
	} 

	if (ballGroup.overlaps(pointBoxL)) {
		flashTimerB1 = flashDurationB1;
	}
	if (ballGroup.overlaps(pointBoxR)) {
		flashTimerB2 = flashDurationB2;
	}

	// add flashing colors when gainging points onto the obstacle and point boxes
	if (flashTimerO1 > 0) {
		if  (frameCount % 2 === 0) {
			obstacle1.color = 'yellow';
		} else {
			obstacle1.color = 'orange';
		}
		flashTimerO1 = flashTimerO1 - 1; 
	} else {
			obstacle1.color = 'grey';
	}


	if (flashTimerO2 > 0) {
		if  (frameCount % 2 === 0) {
			obstacle2.color = 'yellow';
		} else {
			obstacle2.color = 'orange';
		}
		flashTimerO2 = flashTimerO2 - 1; 
	} else {
		obstacle2.color = 'grey';
	}

	if (flashTimerO3 > 0) {
		if  (frameCount % 2 === 0) {
			obstacle3.color = 'yellow';
		} else {
			obstacle3.color = 'orange';
		} 
		flashTimerO3 = flashTimerO3 - 1;
	} else {
		obstacle3.color = 'grey';
	}

	if (flashTimerB1 > 0) {
		if  (frameCount % 2 === 0) {
			pointBoxL.color = 'yellow';
		} else {
			pointBoxL.color = 'orange';
		} 
		flashTimerB1 = flashTimerB1 - 1;
	} else {
		pointBoxL.color = 'white';
	}

	if (flashTimerB2 > 0) {
		if  (frameCount % 2 === 0) {
			pointBoxR.color = 'yellow';
		} else {
			pointBoxR.color = 'orange';
		}	
		flashTimerB2 = flashTimerB2 - 1;
	} else {
		pointBoxR.color = 'white';
	}
// displays lives
	for (i = 3; i < 4; i++){
    	livesDisplay.text = "Lives: " + lives;
    }
}	

/*******************************************************/
//  END OF PROGRAM
/*******************************************************/