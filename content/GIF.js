class GIF {

	constructor(parent, name, x, y, w, h, rot, freq, loop, correct, onStart, frames, onEnd) {
		this.parent = parent,
		this.name = name;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.rot = rot;
		this.freq = freq;
		this.loop = loop;
		this.correct = correct;
		this.onStart = onStart;
		this.frames = frames;
		this.onEnd = onEnd;
 		this.length = {
 			start : this.onStart.length,
 			going : this.frames.length,
 			end   : this.onEnd.length
 		};
		this.img = 0;
		if (this.onStart.length != 0)
			this.state = "start";
		else
			this.state = "going";
	}

	update() {
		let l = lay.gifs;
		l.push();
			l.translate(eval(this.x), eval(this.y));
			l.rotate(eval(this.rot));
			let f;
			if (this.state == "start") f = this.onStart;
			if (this.state == "going") f = this.frames;
			if (this.state == "end"  ) f = this.onEnd;
			l.image(f[this.img], this.correct.x, this.correct.y, this.w, this.h);
		l.pop();
		if (frameCount % this.freq == 0) {
			this.img++;
			//console.log(this.state, this.img);
			if (this.img == this.length[this.state]) {
				this.stop();
				return true;
			}
		}
	}

	move(v) {
		this.pos.add(v.copy());
	}

	stop() {
		if (this.state == "end")
			this.kill();
		if (this.state == "start") 
			this.state = "going"; 
		if (!this.loop && this.state == "going")  {
			this.state = "end";
			if (this.onEnd.length == 0) this.kill();
		}
		this.restart();
	}

	restart() {
		this.img = 0;
		//console.log("resetting");
	}

	end() {
		this.state = "end";
		this.restart();
	}

	kill() {
		delete playingGIFs[this.name];
		//console.log("killed");
	}

}
