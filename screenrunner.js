'use strict'

let cnv, player;
let elements = [];

function setup() {
	noLoop();
	console.log("abc");
}

function draw() {
	if (frameCount == 1) return;
	//console.log("draw");
	cnv.clear();
	player.update();
	player.display();
}

function start() {
	cnv = createCanvas(document.documentElement.scrollWidth, document.body.clientHeight);
	cnv.position(0, 0).style("padding", 0).style("z-index", 1000);
	
	// get elements & define collidables
	elements = [...document.all];
	let body = elements.filter(e => e.tagName == "BODY");
	elements.splice(0, elements.indexOf(...body)+1);
	// console.log(elements);

	/*
	let collidables = elements.filter(e => 
		e.tagName != "P" &&
		e.tagName != "P"

	);
	*/



	player = new Player();
	console.log("running!");

	loop();
}

//--
// COMMUNICATION: popup.js < > screenrunner.js
//--

function request(action, data = {}) {
	let res;
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