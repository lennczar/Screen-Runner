'use strict'

let scr = "start";

function setup() {
	createCanvas(300, 300);

	lay = {
		"bg" : createGraphics(width, height),
		"gui" : createGraphics(width, height)
	};

	let p = Polygon.fromCircle(width/2, height/2, 40, 3);

	//p.display();

	//Button: play
	button["play"] = new PolyButton(p, "play", 
		{
			text : {fill: color(0)}, mOtext : {}, 
			box : {stroke: color(0), strokeWeight: 1}, mObox : {stroke: color(255, 255, 0), strokeWeight: 1}
		},
		undefined, lay.gui, undefined, true, () => {
			//func
		});
}

function draw() {
	Screen[scr]();
	updateMouse(0);
}