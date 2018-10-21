class Bullet {

	constructor(x, y, dir, id) {
		this.pos = createVector(x, y);
		this.vel = dir.copy();
		this.speed = 10;
		this.vel.setMag(this.speed);
		this.id = id;
		this.dmg = 5000;
	}

	update() {
		this.pos.add(this.vel);
		this.display();
		this.edge();
		this.testHit();
	}

	display() {
		//let l = lay.projectiles;
		//l.strokeWeight(4).stroke(255);
		//l.point(this.pos.x, this.pos.y);

 		if (playingGIFs["proj#" + this.id] == undefined) {
 			let i = player.proj.findIndex(p => p.id === this.id);
 			if (i == -1) return;
 			playingGIFs["proj#" + this.id] = new GIF(
 				this, "proj#" + this.id,
 				"player.proj[player.proj.findIndex(p => p.id === this.parent.id)].pos.x",
 				"player.proj[player.proj.findIndex(p => p.id === this.parent.id)].pos.y",
 				64, 64,
 				"player.proj[player.proj.findIndex(p => p.id === this.parent.id)].vel.heading()",
 				3, true, {x : -40, y : -32},
 				[],
 				[
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
				],
				[]
			);
 		}
	}

	testHit() {
		for (let h of hitboxes) {
			let res = h.hitbox.collides(this.pos.copy());
			if (res) {
				this.hit(h);
				//console.log(collidables[hitboxes.indexOf(h)]);
				break;
			}
		}
	}

	hit(h) {
		h.life -= this.dmg;
		console.log(h);
		if (h.life <= 0) {
			collidables[hitboxes.indexOf(h)].style.display = "none";
			hitboxes.splice(h, 1);
		}
		let hPos = this.pos;
		let rot = this.vel.heading();
		delete playingGIFs["proj#" + this.id];
		player.proj.splice(player.proj.indexOf(this), 1);

		playingGIFs["coll#" + this.id] = new GIF(
 			this, "coll#" + this.id, hPos.x, hPos.y, 64, 64,
 			rot, 3, false, {x : -40, y : -32},
 			[],
 			[
				imgData["exploding-projectile-1"],
				imgData["exploding-projectile-2"],
				imgData["exploding-projectile-3"],
				imgData["exploding-projectile-4"],
				imgData["exploding-projectile-5"],
				imgData["exploding-projectile-6"],
				imgData["exploding-projectile-7"],
				imgData["exploding-projectile-8"],
				imgData["exploding-projectile-9"]
			],
			[]
		);
	}

 	edge() {
 		if (this.pos.x + this.vel.x > width  || this.pos.x + this.vel.x < 0 ||
 				this.pos.y + this.vel.y > height || this.pos.y + this.vel.y < 0) {
 			delete playingGIFs["proj#" + this.id];
 			player.proj.splice(player.proj.indexOf(this), 1);
 		}
 	}

}