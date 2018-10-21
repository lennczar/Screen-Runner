'use strict'

let scr = "start";
let img;

function preload() {
	img = loadImage('../assets/popup_images/fma.png');
}

function setup() {
	createCanvas(200, 125);

	lay = {
		"bg" : createGraphics(width, height),
		"gui" : createGraphics(width, height)
	};


	//Button: play
	button["play"] = new RectButton(width/2, height/2, 162, 100, "play", 
		{
			text : {}, mOtext : {}, 
			box : {}, mObox : {}
		},
		img, lay.gui, undefined, true, () => {
			//func
			scr = "running";
			request("start");
		});
}

function draw() {
	Screen[scr]();
	updateMouse(0);
}

//--
// COMMUNICATION: popup.js < > screenrunner.js
//--

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
			switch (request.action) {
				case "start" :

					//sendResponse({});
					break;
				default :
					console.error("No such action found in content script");
			}
		}
	}
);