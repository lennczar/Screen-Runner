function Player() {
 	this.pos = createVector(width/2, height/2);
 	this.vel = createVector(0, 0);
 	this.acc = createVector(0, -0.2);
 	const turningSpeed = 3*PI/180;
 	this.shots = [];
	this.boost = false;

	this.update = function() {
 	 	if (keyIsDown(LEFT_ARROW)) {
 	 		this.acc.rotate(-turningSpeed);
 	 	} else if (keyIsDown(RIGHT_ARROW)) {
			this.acc.rotate(turningSpeed);
 	 	}
 	 	if (keyIsDown(UP_ARROW)) {
 	 		this.boost = true;
 	 		this.vel.add(this.acc);
 	 	} else { this.boost = false; }
 	 	this.pos.add(this.vel);
 	 	this.vel.mult(0.95);
 	}

 	this.display = function() {
 		let rot = -this.acc.heading() + HALF_PI, tp = this.pos, s = 10;
 	 	triangle(tp.x + s*sin(rot), tp.y + s*cos(rot),
 	 				 tp.x + 0.2*s*sin(rot-HALF_PI), tp.y + 0.2*s*cos(rot-HALF_PI),
 	 				 tp.x + 0.2*s*sin(rot+HALF_PI), tp.y + 0.2*s*cos(rot+HALF_PI));
 	 	if (this.boost) {
 	 		triangle(tp.x + 0.5*s*sin(rot -PI), tp.y + 0.5*s*cos(rot -PI),
 	 				 tp.x + 0.1*s*sin(rot-HALF_PI), tp.y + 0.1*s*cos(rot-HALF_PI),
 	 				 tp.x + 0.1*s*sin(rot+HALF_PI), tp.y + 0.1*s*cos(rot+HALF_PI));
 	 	}
 	 //line(this.pos.x, this.pos.y, this.pos.x + this.vel.x*100, this.pos.y + this.vel.y*100);
 	}

 	/*this.shoot = function() {
 		this.shots.push(new Shot(this.pos.x, this.pos.y, -this.acc.heading() + HALF_PI));
 		//shootingSound.play();
 	}*/
}