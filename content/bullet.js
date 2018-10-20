class Bullet {

	constructor(x, y, dir, id) {
		this.pos = createVector(x, y);
		this.vel = dir.copy();
		this.speed = 10;
		this.vel.setMag(this.speed);
		this.id = id;
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

 		if (playingGIFs["proj#" + this.id] == undefined) {
 			let i = player.proj.findIndex(p => p.id === this.id);
 			if (i == -1) return;
 			playingGIFs["proj#" + this.id] = new GIF(
 				this,
 				"player.proj[player.proj.findIndex(p => p.id === this.self.id)].pos.x",
 				"player.proj[player.proj.findIndex(p => p.id === this.self.id)].pos.y",
 				80, 80,
 				"player.proj[player.proj.findIndex(p => p.id === this.self.id)].vel.heading()",
 				3, true, {x : 0, y : 0},
				imgData["projectile_1"],
				imgData["projectile_2"],
				imgData["projectile_3"],
				imgData["projectile_4"],
				imgData["projectile_5"],
				imgData["projectile_6"],
				imgData["projectile_7"],
				imgData["projectile_8"],
				imgData["projectile_9"],
				imgData["projectile_10"]
			);
 		}
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
		delete playingGIFs["proj#" + this.id];
		player.proj.splice(player.proj.indexOf(this), 1);
		//playingGIFs.splice(playingGIFs.indexOf(playingGIFs["proj#" + this.id]), 1);
		// animation bei hPos oder so
	}

 	edge() {
 		if (this.pos.x + this.vel.x > width  || this.pos.x + this.vel.x < 0 ||
 				this.pos.y + this.vel.y > height || this.pos.y + this.vel.y < 0) {
 			delete playingGIFs["proj#" + this.id];
 			player.proj.splice(player.proj.indexOf(this), 1);
			//playingGIFs.splice(playingGIFs.indexOf(playingGIFs["proj#" + this.id]), 1);
 		}
 	}

}