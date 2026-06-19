
import {signingIn} from './fb_io.js'
import {signedIn} from './fb_io.js';
import {GLOBAL_user} from './fb_io.js';

window.play = play
window.submitForm = submitForm

const HTML_OUTPUT = document.getElementById("databaseOutput");
let element = document.getElementById("statusMessage");

function submitForm() {

}

function play() {
  if (signingIn == false) {
    console.log("can play")
    window.location.href = "library.html"
  } else {
    console.log("must wait till finished signing in")
  }
}

