//posX = 0;
//posY = 0;

function draw() {
    document.getElementById("bot").innerHTML = printMousePos(event);
};

function drawWide() {
    document.getElementsByClassName("nice").innerHTMl = "nice";
};

/*
// Getting the position of the mouse and then sending it to the "target" class item
function printMousePos(event) {
  document.getElementById("target").textContent =
    "clientX: " + event.clientX +
    " - clientY: " + event.clientY;
}
*/
/*
let can1 = document.createElement("CANVAS");   // Create a <button> element
can1.innerHTML = "SHIEE";                   // Insert text
document.body.appendChild(can1);               // Append <button> to <body>
*/


class vox {
    //Constructor
    constructor (posX, posY) {
        this.x = x;
        this.y = y;
    }

    //Method for returning the posX
    getPosX {
        return this.posX;
    }
    getPosY {
        return this.posY;
    }
}

//Function used to get the mouse position relative to the page
function returnPos(e) {
    let paX = e.clientX;
    let paY = e.clientY;
    document.getElementById("target").textContent =
    "x: " + paX +
    " | y: " + paY;
}
//Listener used to make the click event happen
document.addEventListener("click", returnPos);

//Creation of a new vox object with the coordinates x = 50 and y = 60
let vox1 = new vox (50, 60);