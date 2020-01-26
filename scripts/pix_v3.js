// vars used to get the canvas and then use it later on
const can = document.getElementById("c");
const ctx = can.getContext("2d");
var x;
var y;
var pixid = 20;
var g = 4;

//Going through every color
function colorThrough() {

	let fullHex;

	let red = 1;
	let green = 0;
	let blue = 0;

	if (red < 9 && !0) {
		red++;
		green = 0;
		blue = 0;
		fullHex = "#" + red + "00";
	}
	else {
		red = 0;
		green = 1;
		blue = 0;
	}
	if (green < 9 && !0) {
		green++;
		red = 0;
		blue = 0;
		fullHex = "#0" + green + "0";
	}
	else {
		green = 0;
		blue = 1;
		red = 0;
	}
	if (blue < 9 && !0) {
		blue++;
		green = 0;
		red = 0;
		fullHex = "#" + "00" + blue;
	}
	else {
		blue = 0;
		red = 1;
		green = 1;
	}

	//console.log(fullHex);
	return fullHex;
}

// Color gen
function colorGen() {

	//0 - 9
	let rand = Math.floor(Math.random() * 10);
	let rand2 = Math.floor(Math.random() * 10);
	let rand3 = Math.floor(Math.random() * 10);

	let color = "#";
	let red = rand;
	let green = rand2;
	let blue = rand3;

	red.toString();
	green.toString();
	blue.toString();

	//color = "#" + red + green + blue;
	color = `#${red}${green}${blue}`;

	//color += Math.floor(Math.random() * 1000);

	//console.log(color);

	return color;

}

// let bob = age => 2019-1966;
// let dada = (true) ? 'ca' : 'lautre';
// $bob = (true) ? 'ca' : 'lautre';

// if (true) console.log("Hello world");

// Making a listener when clicking happens you do x function
document.addEventListener("click", e => {
	x = e.pageX;
	y = e.pageY;
	mousePosX = e.pageX;
	mousePosY = e.pageY
	draw();
	g = 0;
	pixid = 15;
});

// Mousemove listener
document.addEventListener("mousemove", function(e) {
	//console.log(e.pageX, e.pageY);
});


// Resizing the window
function resizeWindow() {
	var width = can.width = window.innerWidth;
	var height = can.height = window.innerHeight;
}

resizeWindow();

var width = can.width;
var height = can.height;






// Delta of x and y
dx = 5;
dy = 5;
i = 1;

// Collison detection
function collisonDetection() {
	if(x + dx > width-pixid || x + dx < pixid) {
		dx = -dx;
	    //console.log("x: " + x + " dx: " + dx);
	}

	if(y + dy > height-pixid || y + dy < pixid) {
	    dy = -dy;
	    //console.log("y: " + y + " dy: " + dy);
	}

	x += dx;
	y += dy;
	dy += pixid/1000;
	dx += 0.1;

	if(pixid > 50){
		pixid = 3;
		console.log("PAF " + i + "!");
		i++;
		//ctx.clearRect(0, 0, can.width, can.height);
	}
}

// Function for the pixel draw
let drawPix = () => {
	// Drawing the actual pix
	//console.log(mousePosX);
	ctx.beginPath();
	ctx.rect(x, y, pixid, pixid);
	ctx.fillStyle = "#0cf";
	ctx.closePath();
	ctx.fill();
	pixid += 0.5;
}

// Main function for animating
function draw() {
	// Clearing the pix every time draw is set
	
	ctx.clearRect(0, 0, can.width, can.height);
	drawPix();
	
	collisonDetection(x, y);
	window.requestAnimationFrame(draw);
}

// Doing draw every x milliseconds
window.requestAnimationFrame(draw);
//setInterval(draw, 10);