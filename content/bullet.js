class Bullet {

	constructor(x, y, dir, id) {
		this.pos = createVector(x, y);
		this.vel = dir.copy();
		this.speed = 10;
		this.vel.setMag(this.speed);
		this.id = id;
		this.dmg = 50;
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
					imgData["pj_1"],
					imgData["pj_2"],
					imgData["pj_3"],
					imgData["pj_4"],
					imgData["pj_5"],
					imgData["pj_6"],
					imgData["pj_7"],
					imgData["pj_8"],
					imgData["pj_9"],
					imgData["pj_10"]
				],
				[]
			);
 		}
	}

	testHit() {
		for (let h of hitboxes) {
			if (h.hitbox == undefined) continue;
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
		if (h.life <= 0) {
			collidables[hitboxes.indexOf(h)].style.display = "none";
			delete h["hitbox"];
			getHitboxes();
		}
		console.log(h);
		let hPos = this.pos;
		let rot = this.vel.heading();
		delete playingGIFs["proj#" + this.id];
		player.proj.splice(player.proj.indexOf(this), 1);

		playingGIFs["coll#" + this.id] = new GIF(
 			this, "coll#" + this.id, hPos.x, hPos.y, 64, 64,
 			rot, 3, false, {x : -40, y : -32},
 			[],
 			[
				imgData["ep-1"],
				imgData["ep-2"],
				imgData["ep-3"],
				imgData["ep-4"],
				imgData["ep-5"],
				imgData["ep-6"],
				imgData["ep-7"],
				imgData["ep-8"],
				imgData["ep-9"]
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