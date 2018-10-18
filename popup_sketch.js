'use strict'

let scr = "start";

function setup() {
	createCanvas(300, 300);

	lay = {
		"bg" : createGraphics(width, height),
		"gui" : createGraphics(width, height)
	};

	let p = Polygon.fromCircle(width/2, height/2, 40, 3);

	//Button: play
	button["play"] = new PolyButton(p, "play", 
		{
			text : {fill: color(0)}, mOtext : {}, 
			box : {stroke: color(0), strokeWeight: 1}, mObox : {stroke: color(255, 255, 0), strokeWeight: 1}
		},
		undefined, lay.gui, undefined, true, () => {
			scr = "running";
			request("start");
		});
}

function draw() {
	Screen[scr]();
	updateMouse(0);
}

function request(action, data = {}) {
	let res;
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {
    	'action' : action,
      'data' : data
    }, function(response) {
    	res = response;
    });
  })
  return res;
}

chrome.runtime.onMessage.addListener(
	function listen(request, sender, callback) {
		if (sender.tab) { // from content script
			if (request.action == "start") {
				console.log("HELLOU?");
				//sendResponse({});
			}
		}
	}
);

//https://aarongusman.wordpress.com/2011/03/30/communication-between-chrome-extension-content-scripts-and-extension-pages/