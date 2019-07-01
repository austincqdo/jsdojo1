var num = window.prompt("Enter a number");
if (num && parseInt(num, 10) <= 5 && parseInt(num, 10) >= 0) {
	var random = Math.floor(6 * Math.random());
	if (num == random) {
		alert("You got it!");
	} else if (num > random) {
		alert("TOO LARGE!!");
	} else {
		alert("TOO SMALL!!");
	}
} else {
	alert("Please input a real number between 0 and 5.");
}
