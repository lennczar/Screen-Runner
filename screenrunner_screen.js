const Screen = {
	
	"start" : function() {

		

		for (let l in lay) {
			image(lay[l], 0, 0);
			lay[l].clear();
		}
	}

}