'use strict'

let cnv, player;
let elements = [];
let collidables = [];
let hitboxes = [];
let scr = "start";

function setup() {
	noLoop();
	console.log("abc");

	
}

function draw() {
	if (frameCount == 1) return;
	Screenr[scr]();
	//console.log("draw");
}

function start() {
	cnv = createCanvas(document.documentElement.scrollWidth, document.body.clientHeight);
	cnv.position(0, 0).style("padding", 0).style("z-index", 1000);

	lay = {
		"player" : createGraphics(width, height),
		"overlay" : createGraphics(width, height)
	};
	
	// get elements & define collidables
	elements = [...document.all];
	let body = elements.filter(e => e.tagName == "BODY");
	elements.splice(0, elements.indexOf(...body)+1);
	// console.log(elements);

  collidables = elements.filter(e => isValid(e));

	console.log(collidables);
	lay.overlay.fill(255, 100);
	lay.overlay.stroke(255, 0, 0);
	lay.overlay.strokeWeight(4);

	for (let c of collidables) {
		let box = c.getBoundingClientRect();
		let origin = createVector(window.visualViewport.pageLeft + box.x, window.visualViewport.pageTop + box.y);
		lay.overlay.rect(origin.x, origin.y, box.width, box.height);
		hitboxes.push(new BoxCollider(origin.x, origin.y, box.width, box.height));
	}

	player = new Player();
	console.log("running!");


	scr = "start";
	loop();
}

function pause() {

	//scr = "pause";
}

function stop() {
	//scr = "stop";
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

function isValid(e) {
	let legit = [
		"VIDEO", "VAR", "TEXTAREA", "TABLE", "STRONG", "SELECT", "SAMP", "RUBY", 
		"PROGRESS", "PRE", "P", "OUTPUT", "LABEL", "KBD", "INPUT", "IMG", "IFRAME",
		"H6", "H5", "H4", "H3", "H2", "H1", "FIGCAPTION", "EMBED", "EM", "DT", 
		"DIALOG", "DETAILS", "DD", "CODE", "CANVAS", "BUTTON", "BLOCKQUOTE", "AUDIO",
		"ARTICLE",	 "ADRESS", "A"
	];
	return legit.find(t => t == e.tagName) != undefined && e.className != "p5Canvas";
}