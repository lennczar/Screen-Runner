'use strict'

let cnv;

function setup() {
	noLoop();
}

function draw() {
	if (mouseIsPressed) line(mouseX, mouseY, pmouseX, pmouseY);
}

function listen(request, sender, callback) {
  if (request.action == "start") {
  	let cnv = createCanvas(document.body.clientWidth, document.body.clientHeight);
		cnv.position(0, 0).style("padding", 0).style("z-index", 1000);
		cnv.background(0);
		loop();
  }
}

chrome.extension.onRequest.addListener(listen);

// function windowResized() {
// 	cnv.resizeCanvas(document.body.clientWidth, document.body.clientHeight);
// }