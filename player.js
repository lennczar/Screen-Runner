class Player {

	constructor() {
		this.pos = createVector(width/2, window.visualViewport.pageTop + 0.4*window.innerHeight);
	 	this.vel = createVector(0, 0);
	 	this.acc = createVector(0, -0.2);

	 	this.w = 3*PI/180;
		this.boost = false;
	 	this.crashed = false;
	}

	update() {
 	 	if (keyIsDown(LEFT_ARROW))  this.acc.rotate(-this.w);
 	 	if (keyIsDown(RIGHT_ARROW)) this.acc.rotate( this.w);

 	 	if (keyIsDown(UP_ARROW)) {
 	 		this.boost = true;
 	 		this.vel.add(this.acc);
 	 	} else this.boost = false;

 	 	this.edge();
 	 	if (!this.crashed) this.pos.add(this.vel);
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

		image(overlay, 0, 0);

 	  /*
 	 	line(scrollPosX, scrollPosY + 0.75*h, scrollPosX + w, scrollPosY + 0.75*h);
 	 	line(scrollPosX, scrollPosY + 0.25*h, scrollPosX + w, scrollPosY + 0.25*h);

 	 	line(scrollPosX + 0.75*w, scrollPosY, scrollPosX + 0.75*w, scrollPosY + h);
 	 	line(scrollPosX + 0.25*w, scrollPosY, scrollPosX + 0.25*w, scrollPosY + h);
		*/
 	}

 	display() {
 		let rot = -this.acc.heading() + HALF_PI, tp = this.pos, s = 10;

 		strokeWeight(1);

 		// space ship body
 	 	triangle(tp.x + s*sin(rot), tp.y + s*cos(rot),
 	 				 tp.x + 0.2*s*sin(rot-HALF_PI), tp.y + 0.2*s*cos(rot-HALF_PI),
 	 				 tp.x + 0.2*s*sin(rot+HALF_PI), tp.y + 0.2*s*cos(rot+HALF_PI));

 	 	// flame
 	 	if (this.boost)
 	 		triangle(tp.x + 0.5*s*sin(rot -PI), tp.y + 0.5*s*cos(rot -PI),
 	 				 tp.x + 0.1*s*sin(rot-HALF_PI), tp.y + 0.1*s*cos(rot-HALF_PI),
 	 				 tp.x + 0.1*s*sin(rot+HALF_PI), tp.y + 0.1*s*cos(rot+HALF_PI));

 	 	strokeWeight(4);
 	 	let p = this.prediction();
 	 	point(p.x, p.y);
 	}

 	edge() {
 		if (this.pos.x + this.vel.x > width  || this.pos.x + this.vel.x < 0) this.vel.x = 0;
 		if (this.pos.y + this.vel.y > height || this.pos.y + this.vel.y < 0) this.vel.y = 0;
 	}

 	prediction() {
 		let p = this.pos.copy();
 		let a = this.acc.copy();
 		a.setMag(20);
 		return p.add(a);
 	}

}