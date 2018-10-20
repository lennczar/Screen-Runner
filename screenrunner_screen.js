const Screenr = {
	
	"start" : function() {
		console.log("it works");
		player.update();
		player.display();
		//lay.player.background(0);
		//if (mouseIsPressed) line(mouseX, mouseY, pmouseX, pmouseY);
		cnv.clear();

		for (let l in lay) {
			image(lay[l], 0, 0);
			lay[l].clear();
		}
	}

}