const Screen = {
	
	"start" : function() {

		stroke(0);
		strokeWeight(4);
		if (mouseIsPressed) line(mouseX, mouseY, pmouseX, pmouseY);

		showButtons("play");

		for (let l in lay) {
			image(lay[l], 0, 0);
			lay[l].clear();
		}
	}

}