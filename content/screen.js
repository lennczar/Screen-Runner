const Screenr = {
	
	"start" : function() {

		player.update();
		player.display();
		for (let h of hitboxes) if (h.hitbox != undefined) h.hitbox.display();

		cnv.clear();
		for (let l in lay) {
			image(lay[l], 0, 0);
			lay[l].clear();
		}
	}

}