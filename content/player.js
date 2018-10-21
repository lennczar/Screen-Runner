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

	 	this.crash();
	 	this.findPos();
	}

	findPos() {
		while(this.crashed == true) {
			this.pos = createVector(random(width), window.visualViewport.pageTop + random(window.innerHeight));
			this.crash();
		}

		console.log(this.pos);
	}

	update() {
 	 	if (keyIsDown(LEFT_ARROW))  this.acc.rotate(-this.w);
 	 	if (keyIsDown(RIGHT_ARROW)) this.acc.rotate( this.w);
 	 	if (keyIsDown(32) && this.cd <= 0) this.shootBullet();

 	 	if (keyIsDown(UP_ARROW)) {
 	 		if (playingGIFs["boost"] == undefined) playingGIFs["boost"] = new GIF(
 	 				this, "boost", "player.pos.x", "player.pos.y", 64, 64, "player.acc.heading() - HALF_PI", 3, true, {x : -29, y : -48},
 	 				[
 	 					imgData["st_1"],
 	 					imgData["st_2"],
 	 					imgData["st_3"],
 	 					imgData["st_4"],
 	 					imgData["st_5"],
 	 					imgData["st_6"],
 	 					imgData["st_7"],
 	 					imgData["st_8"],
 	 					imgData["st_9"],
 	 					imgData["st_10"],
 	 					imgData["st_11"],
 	 					imgData["st_12"]
 	 				], [
	 	 			 	imgData["an_1"],
	 	 				imgData["an_2"],
	 	 				imgData["an_3"],
	 	 				imgData["an_4"],
	 	 				imgData["an_5"],
	 	 				imgData["an_6"],
	 	 				imgData["an_7"]
 	 				], [
 	 					imgData["en_1"],
 	 					imgData["en_2"],
 	 					imgData["en_3"],
 	 					imgData["en_4"],
 	 					imgData["en_5"],
 	 					imgData["en_6"],
 	 					imgData["en_7"],
 	 					imgData["en_8"],
 	 					imgData["en_9"]
 	 				]
 	 			);
 	 		this.boost = true;
 	 		this.vel.add(this.acc);
 	 	} else {
 	 		this.boost = false;
 	 		if (playingGIFs["boost"] != undefined && playingGIFs["boost"].state != "end") playingGIFs["boost"].end();
 	 	}

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
 	 	let scrolled = false;
 	 	// bottom
 	 	if (this.pos.y + this.vel.y >= scrollPosY + 0.75*h) {
 	 		scrollPosY = this.pos.y - 0.75*h;
 	 		scrolled = true;
 	 	}
 	 	// top
 	 	if (this.pos.y + this.vel.y <= scrollPosY + 0.25*h) {
 	 		scrollPosY = this.pos.y - 0.25*h;
 	 		scrolled = true;
 	 	}
 	 	// right
 	 	if (this.pos.x + this.vel.x >= scrollPosX + 0.75*w) {
 	 		scrollPosX = this.pos.x - 0.75*w;
 	 		scrolled = true;
 	 	}
		// left
		if (this.pos.x + this.vel.x <= scrollPosX + 0.25*w) {
			scrollPosX = this.pos.x - 0.25*w;
			scrolled = true;
		}

		window.scroll(scrollPosX, scrollPosY);

		if (scrolled) getHitboxes();	

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
		this.crashed = false;
		for (let h of hitboxes) {
			if (h.hitbox == undefined) continue;
			let res = h.hitbox.collides(this.prediction());
			if (res) {

				if (res.origin.x + res.w < this.pos.x && this.vel.x < 0 && this.vel.y < 0) {            //links || obenlinks
            this.acc.rotate(this.w *2);
            this.vel.x = 0;
        }else if (res.origin.x + res.w < this.pos.x && this.vel.x < 0 && this.vel.y > 0) {                   //links || untenlinks
            this.acc.rotate(-this.w *2);
            this.vel.x = 0;
        }else if (res.origin.x > this.pos.x && this.vel.x > 0 && this.vel.y < 0) {                   //rechts || obenrechts
            this.acc.rotate(-this.w *2);
            this.vel.x = 0;
        }else if (res.origin.x > this.pos.x && this.vel.x > 0 && this.vel.y > 0) {                   //rechts || untenrechts
            this.acc.rotate(this.w *2);
            this.vel.x = 0;
        }else if (res.origin.y + res.h < this.pos.y && this.vel.x > 0 && this.vel.y < 0) {                   //oben || obenrechts
            this.acc.rotate(this.w *2);
            this.vel.y = 0;
        }else if (res.origin.y + res.h < this.pos.y && this.vel.x < 0 && this.vel.y < 0) {                   //oben || obenlinks
            this.acc.rotate(-this.w *2);
            this.vel.y = 0;
        }else if (res.origin.y> this.pos.y && this.vel.x > 0 && this.vel.y > 0) {                   //unten || untenrechts
            this.acc.rotate(-this.w *2);
            this.vel.y = 0;
        }else if (res.origin.y> this.pos.y && this.vel.x < 0 && this.vel.y > 0) {                   //unten || untenlinks
            this.acc.rotate(this.w *2);
            this.vel.y = 0;
        }else this.crashed = true;
				//console.log(collidables[hitboxes.indexOf(h.hitbox)]);
				break;
			}
		}
 	}


 	display() {
 		let l = lay.player, rot = -this.acc.heading() + HALF_PI, tp = this.pos, s = 10;

 		l.push();
 			l.translate(tp.x, tp.y);
 			l.rotate(-rot + PI);
 			l.image(imgData["ha_1"], -18, -26, 32, 32);
 		l.pop();

 		/* 		
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
 	 	*/ 			
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
 		//soundData[].play();
 		this.cd = this.cooldown;
 	}

}