import {signingIn} from './fb_io.js'
import {signedIn} from './fb_io.js';
import {GLOBAL_user} from './fb_io.js';

window.pinthatball = pinthatball
window.geodash = geodash

const HTML_OUTPUT = document.getElementById("databaseOutput");
let element = document.getElementById("statusMessage");

function pinthatball() {
    window.location.href = "pinindex.html"
}

function geodash() {
    window.location.href = "geodash.html"
}