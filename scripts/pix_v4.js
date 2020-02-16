////
////	Values //Black rock shooter
////

// Canvas vars
const can = document.getElementById("c");
const ctx = can.getContext("2d");
const img = document.getElementById("imug");

// Const values
const dx = 1;
const dy = 3;
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
var mouX;
var mouY;
var clickPositionX;
var clickPositionY;
var bHeight = 60;
var counter = 0;
var clickSwitch = 0;
var particleAmount = 3;

var slider = document.getElementById("sSize");
var sValue = 20;

// Slider things
/* console.log(slider.value);
slider.oninput = function() {
	sValue = this.value;
	console.log(sValue);
} */

// var bounceSound = new Audio("sounds/bounce2.mp3");
// const newSound = bounceSound.cloneNode();

////
////	Class & Object
////

/* class cros {

	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
	}

	drawCros(x, y, size) {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.size, this.size);
		ctx.fillStyle = "#0CF";
		ctx.closePath();
		ctx.strokeStyle = "#0CF";
		ctx.stroke();
	}

}

let cros1 = new cros(635, 360, 30);
cros1.drawCros(); */

let crosa = {
	croX: 530,
	croY: 250,
	croSize: 100
}

class pix {
	
	constructor(x, y, size, speedX, speedY, color, mass) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.speedY = speedY;
		this.speedX = speedX; //Need to change this later
		this.mass = size/100;
		this.color = color;
		this.axis = Math.floor(Math.random() * (4 - 1) + 1);
	}

	// Drawing
	draw() {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.size, this.size);
		ctx.fillStyle = this.color;
		ctx.closePath();
		ctx.fill();
		ctx.strokeStyle = "#000";
		ctx.stroke();

		//ctx.drawImage(img, this.x, this.y);

		/* ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
		ctx.stroke(); */

		counter++;
	}

	gravity() {
		this.y += this.mass*3;

		this.speedX += 0.1;
		this.y -= this.speedY;
		this.speedY -= 0.5;
	}

	gravityWithForce() {
		this.y += this.mass*3;

		this.speedY += 0.1
		//this.x -= this.speedY;
		//this.speedX -= 0.5;
	}

	/* floorCollison() {							// Deprecated //
		if (this.y + this.size > can.height) {
			console.log("Hit");
			this.speedX = 0;
		} 
	} */

	applyForce() {

		// Normal applyForce without gravity
		this.x += this.speedX;
		this.y += this.speedY;
		// --


		// Bounce with gravity DON'T USE --> MOVED TO METHOD GRAVITY
		//this.speedX += 0.1;
		//this.y -= this.speedY;
		//this.speedY -= 0.5;
		// --

		//console.log(this.speedY);
	}

	increaseSpeed() {
		this.speedX = this.speedX * 2;
		this.speedY = this.speedY * 2;
	}

	stick() {
		if (this.y + this.size > can.height || this.y < 0) {
			if (checkGravity()) {
				this.speedY = -this.speedY/1.5; // ----------------- Divide this for less bounce, remove it if gravity isn't used
			}
			else this.speedY = -this.speedY;
			
			// This if statement throws particles back up in random directions if they're unmoving on the ground when removing gravity
			if (!checkGravity() && this.speedX < 0.5 && this.speedX > -0.5 && this.speedY < 0.5 && this.speedY > -0.5) {
				this.randomThrow();
			}
			//newSound.play();
			//this.y -= this.size;
			//console.log(this.speedY);
			//this.color = colorGen();
		}
		/* else if (this.y < 0) {
			this.speedY = -this.speedY;
			this.y += this.size;
		} */

		if (this.x + this.size > can.width || this.x < 0) {
			this.speedX = -this.speedX;
			//newSound.play();
			//this.x -= this.size;
			//this.color = colorGen();
		}

		/* else if (this.x < 0) {
			this.speedX = -this.speedX;
			this.x += this.size;
		} */
		
	}

	outOfBounds() {
		if (this.y + this.size > can.height) {
			this.y = can.height - this.size + 0.1;
			if (checkGravity()) {
				this.speedX = this.speedX/1.05;
			}
			//console.log("fuck");
		}
		
		if (this.x + this.size > can.width) {
			this.x = can.width - this.size + 0.1;
			this.speedX = this.speedX/2;
		}
	}

	rebound() {
		let aLeng = pixs.length;

		for (let i = 0; i < aLeng; i++) {
			if (this === pixs[i+1]) continue;
			awareBound(this, pixs[i+1]);
			/* if (this.y + this.size > pixs[i].y || this.y < pixs[i].y + this.size) {
				console.log("im fuckin");
			} */
		}
	}

	// Use with gravity!
	reverseSpeeds() {
		this.speedY = -this.speedY;

		this.speedX = -this.speedX;
		//this.y -= 10;
	}

	genAngle() {
		if(this.axis == 1) {
			this.x += this.speedX;
			this.speedY += this.mass;
		}
		else if (this.axis == 2){
			this.x -= this.speedX;
			this.speedY -= this.speedY;
		}
		else if (this.axis == 3){
			this.x += this.speedX;
			this.y -= this.speedY;
		}
		else if (this.axis == 4){
			this.x -= this.speedX;
			this.y += this.speedY;
		}
	}

	randomThrow() {
		let angle = randomRange(1, 8);
		switch (angle) {
			
			case 1:
				this.speedY -= angle;
			break;

			case 2:
				this.speedY -= angle;
				this.speedX += angle;
			break;

			case 3:
				this.speedX += angle;
			break;

			case 4:
				this.speedY += angle;
				this.speedX += angle;
			break;

			case 5:
				this.speedY += angle;
			break;

			case 6:
				this.speedY += angle;
				this.speedX -= angle;
			break;

			case 7:
				this.speedX -= angle;
			break;

			case 8:
				this.speedX -= angle;
				this.speedY -= angle;
			break;
			
		}
	}

	getXnY() {
		console.log(`x:\t${this.x}\ny:\t${this.y}`);
	}

	retriever() {
		console.log(`x:\t\t${this.x}\ny:\t\t${this.y}\nsize:\t${this.size}\nspeed:\t${this.speed}`);
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	getSize() {
		return this.size;
	}

	mouseBound() {

		if (this.x < crosa.croX + crosa.croSize && this.x + this.size > crosa.croX && this.y < crosa.croY + crosa.croSize && this.y + this.size > crosa.croY) {
			this.speedY = -this.speedY;
			this.speedX = -this.speedX;
		}

	}

	vortex() {

		let strength = 0;

		if (this.x < clickPositionX) {
			let smallDX = clickPositionX - this.x;
			this.speedX += strength + smallDX/150;
			this.x += 5;
		}

		else if (this.x > clickPositionX) {
			let bigDX = this.x - clickPositionX;
			this.speedX -= strength + bigDX/150;
			this.x -= 5;
		}

		if (this.y < clickPositionY) {
			let smallDY = clickPositionY - this.y;
			this.speedY += strength + smallDY/100;
			this.y += 4;
		}

		else if (this.y > clickPositionY) {
			let bigDY = this.y - clickPositionY
			this.speedY -= strength + bigDY/100;
			this.y -= 4;
		}

	}

	selfCollision() {

	}

	isClicked() {

		if (mouX < this.x + this.size && mouX > this.x && mouY < this.y + this.size && mouY > this.y) {
			this.speedX = 0;
			this.speedY = 0;
		}

	}

	updateSize() {
		this.size = sValue;
	}

}


////
////	Functions
////

// Permanent randomizer
function randomizer() {
	value = Math.floor(Math.random() * (100 - 20) + 20);
	return value;
}

// Window resize
function fullResizeWindow() {
	var width = can.width = window.innerWidth;
	var height = can.height = window.innerHeight;
}
// Fullscreen resize of canv
// fullResizeWindow();

function resizeCanv() {
	var width = can.width = 800; //window.innerWidth/1.5;
	var height = can.height = 500;// window.innerHeight/1.5;
}

fullResizeWindow();

console.log(`\nscreen width:\t${window.innerWidth}\nscreen height:\t ${window.innerHeight}`);

// Mouse
function mousePositions() {
	console.log(`mouX:\t${mouX}\nmouY:\t${mouY}\nsped:\t${dy}`);
}

// Clean canvas
function clearCanv() {
	ctx.clearRect(0, 0, can.width, can.height);
}

// Random axis
function rAxis() {
	let axis = Math.floor(Math.random()*can.width);
	return axis;
}

function rYis() {
	let yis = Math.floor(Math.random()*1000);
	//console.log(yis);
	return yis;
}

// Hash color generator
function colorGen() {
	let r = Math.floor(Math.random()*10);
	let g = Math.floor(Math.random()*10);
	let b = Math.floor(Math.random()*10);

	let rgb = `#${0}${9}${b}`;
	rgb.toString();

	return rgb;
}

// ------------------------------------------- FIX THIS TO USE
function selfCollider() {

	let arrayLength = pixs.length;

	for (let i = 0; i < arrayLength; i++) {

		for (let j = 0; i < arrayLength; j++) {

			//		UP		RIGHT		DOWN		LEFT
			if ( pixs[i].x == pixs[j].x && pixs[i].x == pixs[j].y ) {
				pixs[i].reverseSpeeds();
				pixs[j].reverseSpeeds();
			}


		}

	}
	
}

function increaseGlobalSpeed() {
	// ADD THE FOR LOOP FOR THE ENTIRE ARRAY OF PARTICLES AND THEN ADD THE METHOD INCREASE GLOBAL SPEED ALSO PROBABLY RENAME THIS ONE
	
	let arrayLength = pixs.length;

	for (let i = 0; i < arrayLength; i++) {
		pixs[i].increaseSpeed();
	}

}

function awareBound(firstIcle, secondIcle) {
	
	let xDiff = firstIcle.x - secondIcle.x;
	let yDiff = firstIcle.y - secondIcle.y;

	if(xDiff == 0) {
		//console.log("collison!");
		firstIcle.speedX = -firstIcle.speedX;
		firstIcle.speedY = -firstIcle.speedY;
	}

}

////
////	-	Main Function to draw everything	-
////
// Creation
function createPix() {

	if (checkTrail()) {
		clearCanv();
	}

	let arrayLength = pixs.length;

	for (let i = 0; i < arrayLength; i++) {

		pixs[i].draw();
		if (checkBounce()) {
			pixs[i].stick();
		}

		if (checkForce()) {
			pixs[i].applyForce();	
		}

		if (checkGravity()) {
			pixs[i].gravityWithForce();
		}

		if (spaced) {
			pixs[i].vortex();
		}

		pixs[i].outOfBounds();
		if (!checkBoundingBox()) {
			pixs[i].mouseBound();
		}

		if (!checkVortex()) {
			pixs[i].vortex();
		}

		

		// FIX TO USE
		// selfCollider();
		
		//pixs[i].updateSize();

		//pixs[i].selfCollison();
		//pixs[i].rebound();

	}

	//Mouse circle
	if (!checkBoundingBox()) {
		ctx.beginPath();
		ctx.rect(crosa.croX, crosa.croY, crosa.croSize, crosa.croSize);
		ctx.fillStyle = "#0CF";
		ctx.closePath();
		ctx.strokeStyle = "#0FF";
		ctx.stroke();
	}

	// Used to see where mouX is
	/* ctx.beginPath();
	ctx.rect(mouX, mouY, 20, 20);
	ctx.fillStyle = "#0cf";
	ctx.closePath();
	ctx.fill();
	ctx.strokeStyle = "#000";
	ctx.stroke(); */

	// ctx.rotate(45 * Math.PI / 180); // All fucky, i.e. don't use it

}

function randomSp() {
	return Math.floor(Math.random()*10 + 2);
}

function randomRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

//						x, y, size, speedX, speedY, color, mass					Global Pix Creation
function globalPix() {
	let clr = document.getElementById("colorPick").value;
	pixs.push(new pix(rAxis(), rYis(), randomRange(8, 10), randomRange(-10, 10), randomRange(-10, 10), clr, 100));
}

// Make explosion on click
function splode() {
	let clr = document.getElementById("colorPick").value;
	let smallSize = 2;
	let bigSize = 2.3;
	for (let i = 0; i < 30; i++) {
		pixs.push(new pix(clickPositionX, clickPositionY, randomRange(smallSize, bigSize), randomRange(-5, 5), randomRange(-5, 5), "#ffff00", 100));
		pixs.push(new pix(clickPositionX, clickPositionY, randomRange(smallSize, bigSize), randomRange(-5, 5), randomRange(-5, 5), "#ffa500", 100));
	}
}

function canvasPos() {
	console.log(`\ncanvas width:\t${can.width}\ncanvas height:\t ${can.height}`);
}



////
////	Miscellaneous
////

var pixs = [];
for (let i = 0; i < particleAmount; i++) {
	globalPix();
}

// Animation loop - IN CLICK LISTENER
setInterval(createPix, 10);

function interloke() {
	globalPix();
}

function ripBrowser() {
	setInterval(createPix, 10);
}




////
////	Event Listeners
////

// Mousemove
document.addEventListener("mousemove", e => {
	//console.log(mouX + "\t" + mouY);
	mouX = e.pageX - 390;
	mouY = e.pageY - 130;

	let arrayLength = pixs.length;

	for (let i = 0; i < arrayLength; i++) {
		//pixs[i].mouseBound();	
	}
	//globalPix();

	crosa.croX = mouX + 380 - crosa.croSize/2;
	crosa.croY = mouY + 80; // - 125 - crosa.croSize/2;
	
	// console.log(mouX);

});



// Click
document.addEventListener("click", e => {
	
	clickPositionX = mouX + 390;
	clickPositionY = mouY + 130;

	if (!checkSplode()) {
		splode();
	}
	console.log("shit");
	//clearCanv();
	//mouX = e.pageX;
	//mouY = e.pageY;
	//globalPix();
	//let interloker = setInterval(interloke, 100);
	//setInterval(ripBrowser, 1);

	// Checking if the click occured outside of the canvas

	/*
	console.log(counter);

	if (clickSwitch == 0) {
		clickSwitch = 1;
	}
	else {
		clickSwitch = 0;
	}
	*/

	let arrayLength = pixs.length;

	for (let i = 0; i < arrayLength; i++) {
		pixs[i].isClicked();
	}

});

// Key listener for space
let spaced = 0;
document.addEventListener("keydown", e => {

	let arrayLength = pixs.length;

	if (e.keyCode === 32) {
		
		// window.location.reload(false); 

	}

});



////
////	Not My Own	-	NMO
////

/* - Unusued - Could be used for tracking clicks on a specific area, in this case a var called rect
//Function to get the mouse position
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
//Function to check whether a point is inside a rectangle
function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

var canvas = document.getElementById('c');
var context = canvas.getContext('2d');
//The rectangle should have x,y,width,height properties
var rect = {
    x:0,
    y:0,
    width:200,
    height:100
};
//Binding the click event on the canvas
canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if (isInside(mousePos,rect)) {
        console.log('clicked inside rect');
    }else{
        console.log('clicked outside rect');
    }   
}, false);

*/