import {signingIn} from './fb_io.js'
import {signedIn} from './fb_io.js';
import {GLOBAL_user} from './fb_io.js';


const HTML_OUTPUT = document.getElementById("databaseOutput");
let element = document.getElementById("statusMessage");

let scoreDisplay
let dbData

window.addEventListener('runSubmitScore', submitScore);
window.submitScore = submitScore
window.setup = setup
window.draw = draw
window.fb_readError = fb_readError
window.fb_displayAllHighScores = fb_displayAllHighScores
window.allHighScores = allHighScores

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

        let pinScore = localStorage.getItem('score')

        firebase.database().ref('/pinThatBall/' + GLOBAL_user["uid"]).once('value').then((snapshot) => {
                let userData = snapshot.val();
                let oldScore = (userData && userData.score)
                
                if (pinScore > oldScore) {
                    firebase.database().ref('/pinThatBall/' + GLOBAL_user["uid"]).set({
                        gametag: gameTag,
                        score: pinScore,
                        displayname: GLOBAL_user["displayName"], 
                    });
                    console.log("high score submitted to fb");
                }   
        });
    } else {
        console.log("didnt submit scores to fb");
        document.getElementById("loginbutton").style.display = "block";
        document.getElementById("logoutbutton").style.display = "none";
    }
}

function allHighScores() {
  firebase.database().ref('/pinThatBall/').once('value', fb_displayAllHighScores, fb_readError)
}

function fb_displayAllHighScores(snapshot) {
  let highScores = Object.keys(snapshot.val())
  dbData = snapshot.val();
  console.log(dbData)
  for(let i = 0; i < highScores.length; i++){
    let key = highScores[i];
    console.log("Player " + i + " is " + key + ", they got a highscore of " + dbData[key]["score"] + " and a low score of " + dbData[key]["score"])
  }
}

function fb_readError(error) {
  console.log("There was an error reading the message");
  console.error(error);
}