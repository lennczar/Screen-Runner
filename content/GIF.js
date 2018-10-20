class GIF {

	constructor() {
		this.pos = createVector(arguments[0], arguments[1]);
		this.w = arguments[2];
		this.h = arguments[3];
		this.rot = arguments[4];
		this.freq = arguments[5];
		this.loop = arguments[6];
		this.frames = [...arguments].splice(7);
		this.length = arguments.length -7;
		this.img = 0;
	}

	update() {
		let l = lay.gifs;
		push();
			l.translate(this.pos.x, this.pos.y);
			l.rotate(this.rot);
			l.image(this.frames[this.img], 0, 0);
		pop();
		console.log(this.img);
		if (frameCount % this.freq == 0) {
			this.img++;
			if (this.img == this.length) return this.stop();
		}
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