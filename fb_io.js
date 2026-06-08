/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/
var authenticationListener;

export let signedIn = false;
export let GLOBAL_user;

window.onload = (event) => {
  fb_login()
  fb_logout()
};


 // Set up a listener for the login state of the user.
function fb_login() {
  authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
}

// Run when the login state of the user changes.
function fb_handleLogin(_user) {
  if (_user) {
    console.log("User is logged in")
    GLOBAL_user = _user; // Save the user object to a global variable
  } else {
    console.log("User is NOT logged in - Starting the popup process")
    fb_popupLogin();
  }
}

// Run the Google login popup
function fb_popupLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user; // Save the user object to a global variable
    console.log("User has logged in", GLOBAL_user["displayName"])
    signedIn = true
    console.log(signedIn)
    console.log(GLOBAL_user)
  });
}

function fb_logout() {
    authenticationListener();
    firebase.auth().signOut();
    console.log("hopeuflly logged out")
    signedIn = false
    console.log(signedIn)
}

window.fb_login = fb_login
window.fb_logout = fb_logout