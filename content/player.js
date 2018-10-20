class Player {

	constructor() {
		this.pos = createVector(width/2, window.visualViewport.pageTop + 0.4*window.innerHeight);
	 	this.vel = createVector(0, 0);
	 	this.acc = createVector(0, -0.2);

	 	this.w = 3*PI/180;
		this.boost = false;
	 	this.crashed = false;

	 	this.proj = [];
	 	this.cooldown = 30;
	 	this.cd = this.cooldown;
	 	this.projID = 0;
	}

	update() {
 	 	if (keyIsDown(LEFT_ARROW))  this.acc.rotate(-this.w);
 	 	if (keyIsDown(RIGHT_ARROW)) this.acc.rotate( this.w);
 	 	if (keyIsDown(32) && this.cd <= 0) this.shootBullet();

 	 	if (keyIsDown(UP_ARROW)) {
 	 		if (playingGIFs["boost"] == undefined) playingGIFs["boost"] = new GIF(
 	 				this, "player.pos.x", "player.pos.y", 80, 80, "player.acc.heading() - HALF_PI", 3, true, {x : -36, y : -60},
 	 				imgData["antrieb_1"],
 	 				imgData["antrieb_2"],
 	 				imgData["antrieb_3"],
 	 				imgData["antrieb_4"],
 	 				imgData["antrieb_5"],
 	 				imgData["antrieb_6"],
 	 				imgData["antrieb_7"],
 	 			);
 	 		this.boost = true;
 	 		this.vel.add(this.acc);
 	 	} else this.boost = false;

 	 	this.cd--;

 	 	this.edge();
 	 	this.crash();
 	 	//if (!this.crashed) this.pos.add(this.vel);
 	 	if (!this.crashed)
 	 		this.pos.add(this.vel);
 	 	else
 	 		this.vel.mult(0);
 	 	this.vel.mult(0.95);

 	 	// auto scroll
 	 	let scrollPosY = window.visualViewport.pageTop;
 	 	let scrollPosX = window.visualViewport.pageLeft;
 	 	let h = window.innerHeight;
 	 	let w = window.innerWidth;
 	 	// bottom
 	 	if (this.pos.y + this.vel.y >= scrollPosY + 0.75*h)
 	 		scrollPosY = this.pos.y - 0.75*h;
 	 	// top
 	 	if (this.pos.y + this.vel.y <= scrollPosY + 0.25*h)
 	 		scrollPosY = this.pos.y - 0.25*h;
 	 	// right
 	 	if (this.pos.x + this.vel.x >= scrollPosX + 0.75*w)
 	 		scrollPosX = this.pos.x - 0.75*w;
		// left
		if (this.pos.x + this.vel.x <= scrollPosX + 0.25*w)
			scrollPosX = this.pos.x - 0.25*w;

		window.scroll(scrollPosX, scrollPosY);

		// update bullets
		for (let p of this.proj) p.update();

		// update GIFs
		for (let g in playingGIFs) playingGIFs[g].update();

		//console.log(playingGIFs);

 	  /*
 	 	line(scrollPosX, scrollPosY + 0.75*h, scrollPosX + w, scrollPosY + 0.75*h);
 	 	line(scrollPosX, scrollPosY + 0.25*h, scrollPosX + w, scrollPosY + 0.25*h);

 	 	line(scrollPosX + 0.75*w, scrollPosY, scrollPosX + 0.75*w, scrollPosY + h);
 	 	line(scrollPosX + 0.25*w, scrollPosY, scrollPosX + 0.25*w, scrollPosY + h);
		*/
 	}


 	crash() {
		player.crashed = false;
		for (let h of hitboxes) {
			let res = h.collides(player.prediction());
			if (res) {
				player.crashed = true;
				//console.log(collidables[hitboxes.indexOf(h)]);
				break;
			}
		}
 	}


 	display() {
 		let l = lay.player, rot = -this.acc.heading() + HALF_PI, tp = this.pos, s = 10;

 		l.strokeWeight(1).fill(255);

 		// space ship body
 	 	l.triangle(tp.x + s*sin(rot), tp.y + s*cos(rot),
 	 				 tp.x + 0.2*s*sin(rot-HALF_PI), tp.y + 0.2*s*cos(rot-HALF_PI),
 	 				 tp.x + 0.2*s*sin(rot+HALF_PI), tp.y + 0.2*s*cos(rot+HALF_PI));

 	 	// flame
 	 	if (this.boost)
 	 		l.triangle(tp.x + 0.5*s*sin(rot -PI), tp.y + 0.5*s*cos(rot -PI),
 	 				 tp.x + 0.1*s*sin(rot-HALF_PI), tp.y + 0.1*s*cos(rot-HALF_PI),
 	 				 tp.x + 0.1*s*sin(rot+HALF_PI), tp.y + 0.1*s*cos(rot+HALF_PI));

 	 	// l.strokeWeight(4);
 	 	// let p = this.prediction();
 	 	// l.point(p.x, p.y);
 	}

 	edge() {
 		if (this.pos.x + this.vel.x > width  || this.pos.x + this.vel.x < 0) this.vel.x = 0;
 		if (this.pos.y + this.vel.y > height || this.pos.y + this.vel.y < 0) this.vel.y = 0;
 	}

 	prediction() {
 		let p = this.pos.copy();
 		let a = this.acc.copy();
 		a.setMag(10);
 		return p.add(a);
 	}

 	shootBullet() {
 		this.proj.push(new Bullet(this.pos.x, this.pos.y, this.acc, this.projID++));
 		this.cd = this.cooldown;
 	}

}