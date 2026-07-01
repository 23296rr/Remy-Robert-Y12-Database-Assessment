import {signingIn} from './fb_io.js'
import {signedIn} from './fb_io.js';
import {GLOBAL_user} from './fb_io.js';

window.pinthatball = pinthatball
window.geodash = geodash
window.toggleLeaderboard = toggleLeaderboard;
window.noLeaderboards = noLeaderboards
window.leaderboardDisplay = leaderboardDisplay

window.fb_readError = fb_readError
window.fb_displayAllHighScores = fb_displayAllHighScores
window.allHighScores = allHighScores

const pinScoreOne = document.getElementById("pinLeaderOne");
const pinScoreTwo = document.getElementById("pinLeaderTwo");
const pinScoreThree = document.getElementById("pinLeaderThree");
const pinScoreFour = document.getElementById("pinLeaderFour");
const pinScoreFive = document.getElementById("pinLeaderFive");

const HTML_OUTPUT = document.getElementById("databaseOutput");
let element = document.getElementById("statusMessage");

let leadboardClicked = false

function noLeaderboards() {
    document.getElementById("leaderboard").style.display = "none";
}

function pinthatball() {
    window.location.href = "pinindex.html"
}

function geodash() {
    window.location.href = "geodash.html"
}


function toggleLeaderboard() {
    leaderboardDisplay
    if (leadboardClicked == false) {
        document.getElementById("leaderboard").style.display = "block";
        leadboardClicked = true
    } else if (leadboardClicked == true) {
        document.getElementById("leaderboard").style.display = "none";
        leadboardClicked = false
    }
}

function leaderboardDisplay() {
    firebase.database().ref('/pinThatBall/' + GLOBAL_user["uid"]).once('value').then((snapshot) => {
                let userData = snapshot.val();
    });
    console.log(userData)
    pinScoreOne.innerHTML = GLOBAL_user["displayName"] + "dwasd";
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

noLeaderboards()