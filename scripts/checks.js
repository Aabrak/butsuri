var cGravity = document.getElementById('bGravity');
var cForce = document.getElementById('bForce');
var cBBox = document.getElementById('bBoundingBox');
var cBounce = document.getElementById('bBounce');
var cTrail = document.getElementById('bTrail');

document.getElementById('bRemove').onclick = () => pixs.pop() ;

document.getElementById('bRemoveAll').onclick = function() {
	pixs = [];
};

document.getElementById('bAdd').onclick = function() {
	globalPix();
};

document.getElementById('bAddAmount').onclick = function() {
	
	let amountOfParticles = document.getElementById("sAmount").value;

	parseInt(amountOfParticles);

	console.log(amountOfParticles);

	for (let i = 0; i < amountOfParticles; i++) {
		globalPix();
	}

};

document.getElementById('bIncSpeed').onclick = function() {
	increaseGlobalSpeed();
};

document.getElementById('bDecSpeed').onclick = function() {
	decreaseGlobalSpeed();
};

document.getElementById('bRefresh').onclick = function() {

	pixs = [];

	for (let i = 0; i < particleAmount; i++) {
		globalPix();
	}
};

function checkGravity() {
	if (cGravity.checked) {
		return true;
	}
	else {
		return false;
	}
}

function checkForce() {
	if (cForce.checked) {
		return false;
	}
	else {
		return true;
	}
}

function checkBoundingBox() {
	if (cBBox.checked) {
		return false;
	}
	else {
		return true;
	}
}

function checkBounce() {
	if (cBounce.checked) {
		return false;
	}
	else {
		return true;
	}
}

function checkTrail() {
	if (cTrail.checked) {
		return false;
	}
	else {
		return true;
	}
}

function checkVortex() {
	if (bVortex.checked) {
		return false;
	}
	else {
		return true;
	}
}

function checkSplode() {
	if (bSplode.checked) {
		return false;
	}
	else {
		return true;
	}
}

function checkSelfCollision() {
	if (bSelfCollision.checked) {
		return false;
	}
	else {
		return true;
	}
}

function checkInputColor() {
	if (bRgb.checked) {
		return false;
	}
	else {
		return true;
	}
}