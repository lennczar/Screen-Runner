class Player {

	constructor() {
		this.pos = createVector(width/2, 200);
	 	this.vel = createVector(0, 0);
	 	this.acc = createVector(0, -0.2);

	 	this.w = 3*PI/180;
		this.boost = false;
	}

	update() {
 	 	if (keyIsDown(LEFT_ARROW))  this.acc.rotate(-this.w);
 	 	if (keyIsDown(RIGHT_ARROW)) this.acc.rotate( this.w);

 	 	if (keyIsDown(UP_ARROW)) {
 	 		this.boost = true;
 	 		this.vel.add(this.acc);
 	 	} else this.boost = false;

 	 	this.pos.add(this.vel);
 	 	this.vel.mult(0.95);
 	}

 	display() {
 		let rot = -this.acc.heading() + HALF_PI, tp = this.pos, s = 10;

 		// space ship body
 	 	triangle(tp.x + s*sin(rot), tp.y + s*cos(rot),
 	 				 tp.x + 0.2*s*sin(rot-HALF_PI), tp.y + 0.2*s*cos(rot-HALF_PI),
 	 				 tp.x + 0.2*s*sin(rot+HALF_PI), tp.y + 0.2*s*cos(rot+HALF_PI));

 	 	// flame
 	 	if (this.boost)
 	 		triangle(tp.x + 0.5*s*sin(rot -PI), tp.y + 0.5*s*cos(rot -PI),
 	 				 tp.x + 0.1*s*sin(rot-HALF_PI), tp.y + 0.1*s*cos(rot-HALF_PI),
 	 				 tp.x + 0.1*s*sin(rot+HALF_PI), tp.y + 0.1*s*cos(rot+HALF_PI));
 	}

}