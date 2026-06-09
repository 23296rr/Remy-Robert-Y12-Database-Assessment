/**************************************************************/
// fb_initialise()
// Initialize firebase, connect to the Firebase project.
// 
// Find the config data in the Firebase console. Cog wheel > Project Settings > General > Your Apps > SDK setup and configuration > Config
//
// Input:  n/a
// Return: n/a
/**************************************************************/

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7d7ogP89GtXNK8gJzAFIJazeiA_UgEGM",
  authDomain: "pin-that-ball-b5570.firebaseapp.com",
  databaseURL: "https://pin-that-ball-b5570-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pin-that-ball-b5570",
  storageBucket: "pin-that-ball-b5570.firebasestorage.app",
  messagingSenderId: "465435573603",
  appId: "1:465435573603:web:a29bbe8bf2face6d8e6756",
  measurementId: "G-5NXJETV32K"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // This log prints the firebase object to the console to show that it is working.
  // As soon as you have the script working, delete this log.
  console.log("Firebase initialize finished:");
  console.log(firebase);
