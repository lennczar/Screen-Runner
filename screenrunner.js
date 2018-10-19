'use strict'

let cnv, player;

function setup() {
	noLoop();
	console.log("abc");
}

function draw() {
	if (frameCount == 1) return;
	console.log("draw");
	if (mouseIsPressed) line(mouseX, mouseY, pmouseX, pmouseY);
	//request("start");
	player.update();
	cnv.clear();
	player.display();
}

function start() {
	cnv = createCanvas(document.body.clientWidth, document.body.clientHeight);
	cnv.position(0, 0).style("padding", 0).style("z-index", 1000);
	//cnv.background(100);
	player = new Player();

	loop();
}

//--
// COMMUNICATION: popup.js < > screenrunner.js
//--

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
		switch (request.action) {
			case "start" :
				start();
				//sendResponse({});
				break;
			default :
				console.error("No such action found in popup");
		}
	}
}

chrome.extension.onRequest.addListener(listen);

// function windowResized() {
// 	cnv.resizeCanvas(document.body.clientWidth, document.body.clientHeight);
// }