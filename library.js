import {signingIn} from './fb_io.js'
import {signedIn} from './fb_io.js';
import {GLOBAL_user} from './fb_io.js';

window.pinthatball = pinthatball
window.geodash = geodash
window.toggleLeaderboard = toggleLeaderboard;

window.fb_readError = fb_readError
window.fb_displayAllHighScores = fb_displayAllHighScores
window.allHighScores = allHighScores


const HTML_OUTPUT = document.getElementById("databaseOutput");
let element = document.getElementById("statusMessage");

function pinthatball() {
    window.location.href = "pinindex.html"
}

function geodash() {
    window.location.href = "geodash.html"
}

/*******************************************************************************************/
                    // AI DO NOT USE/NEED TO CHANGE
/*******************************************************************************************/

function toggleLeaderboard() {
    const modal = document.getElementById("leaderboardModal");
    
    // If the modal is about to open, fetch the newest high scores first
    if (!modal.classList.contains("active")) {
        allHighScores(); 
    }
    
    modal.classList.toggle("active");
}
window.toggleLeaderboard = toggleLeaderboard;

function fb_displayAllHighScores(snapshot) {
    const dbData = snapshot.val();
    
    // Safety check: If database is empty, stop here
    if (!dbData) {
        document.getElementById("leaderboardRows").innerHTML = "<tr><td colspan='3'>No scores yet!</td></tr>";
        return;
    }

    // 1. Convert the Firebase object into a workable array
    let playersArray = [];
    let keys = Object.keys(dbData);
    
    for (let i = 0; i < keys.length; i++) {
        let uid = keys[i];
        playersArray.push({
            name: dbData[uid].gametag || dbData[uid].displayname || "Anonymous",
            score: Number(dbData[uid].score) || 0
        });
    }

    // 2. Sort the array from Highest Score to Lowest Score
    playersArray.sort((a, b) => b.score - a.score);

    // 3. Build the HTML dynamically
    let tableHTML = "";
    
    for (let i = 0; i < playersArray.length; i++) {
        let player = playersArray[i];
        let rankNum = i + 1; // Array starts at 0, but ranks start at 1
        
        // Format rank text beautifully (1st, 2nd, 3rd, 4th, etc.)
        let rankLabel = rankNum + "th";
        if (rankNum === 1) rankLabel = "1st";
        if (rankNum === 2) rankLabel = "2nd";
        if (rankNum === 3) rankLabel = "3rd";

        // Assign CSS podium hooks only to the top 3
        let rankClass = "";
        if (rankNum === 1) rankClass = 'class="rank-1"';
        if (rankNum === 2) rankClass = 'class="rank-2"';
        if (rankNum === 3) rankClass = 'class="rank-3"';

        // Append the new row to our temporary HTML string
        tableHTML += `
            <tr ${rankClass}>
                <td>${rankLabel}</td>
                <td>${player.name}</td>
                <td>${player.score}</td>
            </tr>
        `;
    }

    // 4. Wipe the old dummy rows and drop the new rows into the DOM
    document.getElementById("leaderboardRows").innerHTML = tableHTML;
}

/*******************************************************************************************/
/*******************************************************************************************/

function allHighScores() {
  firebase.database().ref('/pinThatBall/').once('value', fb_displayAllHighScores, fb_readError)
}


function fb_readError(error) {
  console.log("There was an error reading the message");
  console.error(error);
}