class GIF {

	constructor() {
		this.freq = arguments[0];
		this.loop = arguments[1];
		this.frames = arguments.splice(2);
		this.length = arguments.length -2;
		this.img = 0;
	}

	update() {
		if (frameCount % this.freq == 0) this.img++;
		if (this.img == this.length) return this.stop();
		let l = lay.gifs;
		l.image(this.frames[img], 0, 0);
	}

	stop() {
		if (this.loop) {
			this.start();
		} else {
			//delete self
			return true;
		}
	}

	start() {
		this.img = 0;
	}

}