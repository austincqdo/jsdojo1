var d = new Date;
time = d.getHours();
if ((time >= 9 && time <= 10) || (time >= 15 && time <= 16)) {
	alert("Buy one get one free!");
} else if (time >= 19 && time <= 21)  {
	alert("30% off!");
} else {
	alert("No deals :(");
}