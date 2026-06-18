function difficultyEasy() {
    localStorage.setItem('difficulty', '5'); // puts a variable in storage to be called upon even after the page swaps and refreshes
    console.log("Saved difficulty: ", localStorage.getItem('difficulty')); // checks it has been saved correctly
    window.open('pingame.html', '_self');
}
function difficultyMedium() {
	localStorage.setItem('difficulty', '10') // puts a variable in storage to be called upon even after the page swaps and refreshes
	console.log("Saved difficulty: ", localStorage.getItem('difficulty')); // checks it has been saved correctly
	window.open('pingame.html', '_self');
}
function difficultyHard() {
	localStorage.setItem('difficulty', '15') // puts a variable in storage to be called upon even after the page swaps and refreshes
    console.log("Saved difficulty: ", localStorage.getItem('difficulty')); // checks it has been saved correctly
	window.open('pingame.html', '_self');
}