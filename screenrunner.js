'use strict'

let cnv;

function setup() {
	let cnv = createCanvas(document.body.clientWidth, document.body.clientHeight);
	cnv.position(0, 0).style("padding", 0);
	cnv.background(0);
	
}

function draw() {
	if (mouseIsPressed) line(mouseX, mouseY, pmouseX, pmouseY);
}

// function windowResized() {
// 	cnv.resizeCanvas(document.body.clientWidth, document.body.clientHeight);
// }