class GIF {

	constructor() {
		this.pos = createVector(arguments[0], arguments[1]);
		this.w = arguments[2];
		this.h = arguments[3];
		this.freq = arguments[4];
		this.loop = arguments[5];
		this.frames = arguments.splice(6);
		this.length = arguments.length -6;
		this.img = 0;
	}

	update() {
		if (frameCount % this.freq == 0) this.img++;
		if (this.img == this.length) return this.stop();
		let l = lay.gifs;
		l.image(this.frames[img], 0, 0);
	}

	move(v) {
		this.pos.add(v.copy());
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