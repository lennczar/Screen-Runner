const Screenr = {
	
	"start" : function() {

		player.update();
		player.display();
		hitboxes.forEach(h => h.hitbox.display());

		cnv.clear();
		for (let l in lay) {
			image(lay[l], 0, 0);
			lay[l].clear();
		}
	}

}