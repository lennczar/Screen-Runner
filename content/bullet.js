class Bullet {

	constructor(x, y, dir) {
		this.pos = createVector(x, y);
		this.vel = dir.copy();
		this.speed = 10;
		this.vel.setMag(this.speed);
	}

	update() {
		this.pos.add(this.vel);
		this.display();
		this.edge();
		this.testHit();
	}

	display() {
		let l = lay.projectiles;
		l.strokeWeight(4).stroke(255);
		l.point(this.pos.x, this.pos.y);
	}

	testHit() {
		for (let h of hitboxes) {
			let res = h.collides(this.pos.copy());
			if (res) {
				this.hit();
				//console.log(collidables[hitboxes.indexOf(h)]);
				break;
			}
		}
	}

	hit() {
		let hPos = this.pos;
		player.proj.splice(player.proj.indexOf(this), 1);
		// animation bei hPos oder so
	}

 	edge() {
 		if (this.pos.x + this.vel.x > width  || this.pos.x + this.vel.x < 0 ||
 				this.pos.y + this.vel.y > height || this.pos.y + this.vel.y < 0) 
 			player.proj.splice(player.proj.indexOf(this), 1);
 	}

}