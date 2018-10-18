'use strict'

let cnv;

function setup() {
	noLoop();
	console.log("abc");
}

function draw() {
	if (mouseIsPressed) line(mouseX, mouseY, pmouseX, pmouseY);
	request("start");
}

function request(action, data = {}) {
	let res;
	console.log(chrome);
  chrome.runtime.sendMessage({
    'action' : action,
    'data' : data
  }, function(response) {
    res = response;
  });
  return res;
}

function listen(request, sender, callback) {
	if (!sender.tab) { // from popup
		if (request.action == "start") {
	  	let cnv = createCanvas(document.body.clientWidth, document.body.clientHeight);
			cnv.position(0, 0).style("padding", 0).style("z-index", 1000);
			cnv.background(100);
			loop();
		}
	}
}

chrome.extension.onRequest.addListener(listen);

// function windowResized() {
// 	cnv.resizeCanvas(document.body.clientWidth, document.body.clientHeight);
// }