
import {signingIn} from './fb_io.js'
import {signedIn} from './fb_io.js';
import {GLOBAL_user} from './fb_io.js';

window.play = play

const HTML_OUTPUT = document.getElementById("databaseOutput");
let element = document.getElementById("statusMessage");

function play() {
  if (signingIn == false) {
    console.log("can play")
    window.location.href = "library.html"
  } else {
    console.log("must wait till finished signing in")
  }
}

