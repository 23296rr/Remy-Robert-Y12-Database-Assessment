import {signingIn} from './fb_io.js'
import {signedIn} from './fb_io.js';
import {GLOBAL_user} from './fb_io.js';

const HTML_OUTPUT = document.getElementById("databaseOutput");
let element = document.getElementById("statusMessage");

function setup() {
    console.log("Working", "Score: " + localStorage.getItem('score')) //checks if the score has correctly been pulled from storage

    let score = localStorage.getItem('score'); //sets the score variable as the score from storage
    console.log("Score: " + score);
    
    canvas = new Canvas(500, 50);

    scoreDisplay = new Sprite(225, 25, 0, 0);
    scoreDisplay.textSize = 24;
    scoreDisplay.text = "Final Score: " + score + '!';
}

function draw() {   
    background("#f0f0f0")
}