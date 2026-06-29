import {signingIn} from './fb_io.js'
import {signedIn} from './fb_io.js';
import {GLOBAL_user} from './fb_io.js';


const HTML_OUTPUT = document.getElementById("databaseOutput");
let element = document.getElementById("statusMessage");

let scoreDisplay

window.addEventListener('runSubmitScore', submitScore);
window.submitScore = submitScore
window.setup = setup
window.draw = draw

function setup() {
    console.log("Working", "Score: " + localStorage.getItem('score'))

    createCanvas(250, 50, 500);

    let pinScore = localStorage.getItem('score');
    console.log("Score: " + pinScore);
    
    scoreDisplay = new Sprite(125, 25, 0, 0);
    scoreDisplay.textSize = 24;
    scoreDisplay.text = "Final Score: " + pinScore + '!';
    console.log("working")
}

function draw() {   
    background("#f0f0f0")
}

function submitScore(event) {
    if (signedIn == true) {
        document.getElementById("loginbutton").style.display = "none";
        document.getElementById("logoutbutton").style.display = "none";
        firebase.database().ref('/pinThatBall/' + GLOBAL_user["uid"]).set(
            {
                gametag: gameTag,
                score: localStorage.getItem('score'),
                displayname: GLOBAL_user["displayName"], 
            }
        )
        document.getElementById("loginbutton").style.display = "none";
        document.getElementById("logoutbutton").style.display = "none";
        console.log("score submitted to fb")
    } else {
        console.log("didnt submit scores to fb")
        document.getElementById("loginbutton").style.display = "block";
        document.getElementById("logoutbutton").style.display = "none";
    }
}
