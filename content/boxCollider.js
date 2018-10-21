class BoxCollider {

	constructor(x, y, w, h) {
		this.origin = createVector(x, y);
		this.w = w;
		this.h = h;
	}

	collides(p) {
		let o = this.origin, w = this.w, h = this.h;
		return (p.x > o.x && p.x < o.x +w && p.y > o.y && p.y < o.y +h) ? this : false;
	}

	display() {
		lay.overlay.strokeWeight(1).stroke(0).noFill();
		let o = this.origin, w = this.w, h = this.h;
		lay.overlay.rect(o.x, o.y, w, h);
	}

}