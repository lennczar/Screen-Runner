'use strict'

let scr = "start";

function setup() {
	createCanvas(300, 300);

	lay = {
		"gui" : createGraphics(width, height)
	};

	let p = Polygon.fromCircle(width/2, height/2, 40, 3);

	//p.display();

	//Button: play
	button["play"] = new PolyButton(p, "play", 
		{
			text : {fill: color(0)}, mOtext : {}, 
			box : {stroke: color(200), strokeWeight: 1}, mObox : {}
		},
		undefined, lay.gui, undefined, true, () => {
			//func
		});
}

function draw() {
	Screen[scr]();
	updateMouse(40);
}