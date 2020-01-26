// vars used to get the canvas and then use it later on
const can = document.getElementById("c");
const ctx = can.getContext("2d");

// Object
class pix {

	// Constructor
	constructor (x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	// Getter
	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}

	// Setter
	resetY() {
		this.y = y;
	}
	setX(x) {
		this.x = x;
	}
	setY(y) {
		this.y = y;
	}

}

var mousePosX;
var mousePosY;
var relativeMousePosX = 10;
var relativeMousePosY = 10;


// Making a listener when clicking happens you do x function
document.addEventListener("click", function(e){
	mousePosX = e.pageX;
	mousePosY = e.pageY;
	relativeMousePosX = e.pageX;
	relativeMousePosY = e.pageY
	draw();
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

// -- Main parts

// Width and Height of the pix
var pixMetric = 100;
var x = can.width/2;
var y = can.height/2;

// Coordinates of the cube (pre Class / only one cube) 
var pixX = x;
var pixY = y;

var dy = 5;

let delay = 150;

// pix1 = new pix(mousePosX, mousePosY, pixMetric, pixMetric);

/// -- Function for collison detections -- ///

function collisonDetection() {
	if(mousePosY + dy < can.height) {
		dy = -dy;
	}
}

/* function collisonDetection(x, y) {
	pixY = y;
	pixX = x;
	pixSize = 100;

	rotation = 90;

	if (pixX + pixSize < can.width && pixY + pixSize < can.height) {
		console.log("INBOUND " + x + " : " + y);
		mousePosX += 10;
		mousePosY += 10;
	}
	else {
		console.log("OUTBOUND" + x + " : " + y);
	}
} */

//pix1 = new pix(mousePosX, mousePosY, pixMetric, pixMetric);	

// Function for the pixel draw
function drawPix() {
	// Drawing the actual pix
	//console.log(mousePosX);
	ctx.beginPath();
	ctx.rect(mousePosX, dy, pixMetric, pixMetric);
	ctx.fillStyle = "#0CF";
	ctx.closePath();
	ctx.fill();
}

// Main function for animating
function draw() {
	//console.log(mousePosX);
	// Clearing the pix every time draw is set
	
	ctx.clearRect(0, 0, can.width, can.height);
	drawPix();
	
	collisonDetection(mousePosX, mousePosY);


	//if (mousePosY < can.height - 10) {
	//	mousePosY+=5;
	//}
}

function reset() {
	pix1.resetY(50);
}

setInterval(draw, 100);
// Doing drawShit every x milliseconds
