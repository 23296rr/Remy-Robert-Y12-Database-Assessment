/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/
var authenticationListener;

export let signingIn = false
export let signedIn = false;
export let GLOBAL_user;

window.fb_login = fb_login
window.fb_logout = fb_logout
window.openForm = openForm
window.closeForm = closeForm
window.handleForm = handleForm
window.fb_checkLogin = fb_checklogin

window.onload = fb_checkLogin()

function fb_checklogin() {
  console.log("actually ran")
  authenticationListener = firebase.auth().onAuthStateChanged(fb_checkingLogin);
  
}

function fb_checkingLogin(_user) {
  if (_user) {
    console.log("User is logged in")
    GLOBAL_user = _user; // Save the user object to a global variable
    signedIn = true
    document.getElementById("loginbutton").style.display = "none";
    document.getElementById("logoutbutton").style.display = "block";
  } else {
    console.log("User is NOT logged in")
    document.getElementById("loginbutton").style.display = "block";
    document.getElementById("logoutbutton").style.display = "none";
    signedIn = true
  }
}

 // Set up a listener for the login state of the user.
function fb_login() {
  authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
}

// Run when the login state of the user changes.
function fb_handleLogin(_user) {
  if (_user) {
    console.log("User is logged in")
    GLOBAL_user = _user; // Save the user object to a global variable
    signedIn = true
    document.getElementById("loginbutton").style.display = "none";
    document.getElementById("logoutbutton").style.display = "block";
  } else {
    console.log("User is NOT logged in - Starting the popup process")
    fb_popupLogin();
  }
}

// Run the Google login popup
function fb_popupLogin() {
  signingIn = true
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user; // Save the user object to a global variable
    console.log("User has logged in", GLOBAL_user["displayName"])
    signedIn = true
    signingIn = false
    openForm()
    document.getElementById("loginbutton").style.display = "none";
    document.getElementById("logoutbutton").style.display = "block";
    console.log(signedIn)
    console.log(GLOBAL_user)
  });
}

function fb_logout() {
    fb_login()
    authenticationListener();
    firebase.auth().signOut();
    console.log("hopeuflly logged out")
    signedIn = false
    signingIn = false
    document.getElementById("loginbutton").style.display = "block";
    document.getElementById("logoutbutton").style.display = "none";
    console.log(signedIn)
}


function openForm() {
  document.getElementById("formModal").style.display = "block";
}

function closeForm() {
  document.getElementById("formModal").style.display = "none";
}

function handleForm(event) {
  event.preventDefault();
  
  const gameTag = document.getElementById("gameTag").value;
  const age = document.getElementById("age").value;
  
  console.log("Form Submitted:", { age, gameTag });
  
  closeForm();
  document.getElementById("popupForm").reset(); 
  
  firebase.database().ref('/userInfo/' + GLOBAL_user["uid"]).set(
    {
        age: age,
        gametag: gameTag,
        displayName: GLOBAL_user["displayName"],
      }
  )
}

