import {signingIn} from './fb_io.js'
import {signedIn} from './fb_io.js';
import {GLOBAL_user} from './fb_io.js';

const HTML_OUTPUT = document.getElementById("databaseOutput");
let element = document.getElementById("statusMessage");

let scoreDisplay

window.submitScore = submitScore
window.setup = setup
window.draw = draw

function setup() {
    console.log("Working", "Score: " + localStorage.getItem('score'))

    createCanvas(500, 50);

    let score = localStorage.getItem('score');
    console.log("Score: " + score);
    
    scoreDisplay = new Sprite(225, 25, 0, 0);
    scoreDisplay.textSize = 24;
    scoreDisplay.text = "Final Score: " + score + '!';
    console.log("working")
}

function draw() {   
    background("#f0f0f0")
}

function submitScore() {
    if (signedIn == true) {
        firebase.database().ref('/pinThatBall/' + GLOBAL_user["displayName"]).set(
            {
                gameTag: gametag,
                userScore: localStorage.getItem('score'),
                googleUID: GLOBAL_user["uid"],
            }
        )
        console.log("updated fb")
    } else {
        fb_login()
    }
}
