class GIF {

	constructor() {
		this.self = arguments[0];
		this.x = arguments[1];
		this.y = arguments[2];
		this.w = arguments[3];
		this.h = arguments[4];
		this.rot = arguments[5];
		this.freq = arguments[6];
		this.loop = arguments[7];
		this.correct = arguments[8];
		this.frames = [...arguments].splice(9);
		this.length = arguments.length -9;
		this.img = 0;
	}

	update() {
		let l = lay.gifs;
		l.push();
			l.translate(eval(this.x), eval(this.y));
			l.rotate(eval(this.rot));
			l.image(this.frames[this.img], this.correct.x, this.correct.y, this.w, this.h);
		l.pop();
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
			delete this;
			return true;
		}
	}

	start() {
		this.img = 0;
	}

}
