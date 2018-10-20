
// --- CONTROLS ---


let mX, mY, clicked = false, cursorTimer = 50;

window.addEventListener("keydown", (e) => {        //no scroll
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function updateMouse(pad = 40) {
  mX = map(mouseX, 0, width, 0, width+2*pad) -pad;
  mY = map(mouseY, 0, height, 0, height+2*pad) -pad;
  clicked = false;
}

function mousePressed() {
  cursorTimer = 50;
	clicked = true;
}

function mouseMoved() {
  cursor();
  cursorTimer = 50;
}


// --- GENERAL USER INTERFACE ---


let button = {}, lay = {};

function showButtons(...names) {
	if (names.every(n => typeof n == "string")) for (let n of names) button[n].update();
}

class RectButton {

	constructor(x, y, w, h, text, style, img, layer, projectiles, condition, func) {
		this.pos = createVector(x, y);
		if (typeof w == "string" && split(w, "+")[0] == "calc") {
			let padding = split(w, "+")[1] ? eval(split(w, "+")[1]) : 0;
			textSize(style.text && style.text.textSize ? style.text.textSize : 10);
			if (img) { w = img.width + padding } else if (text) w = textWidth(text) + padding;
		}
		if (typeof h == "string" && split(h, "+")[0] == "calc") {
			let padding = split(h, "+")[1] ? eval(split(h, "+")[1]) : 0;
			textSize(style.text && style.text.textSize ? style.text.textSize : 10);
			if (img) { h = img.height + padding } else if (text) h = textAscent(text) + textDescent(text) + padding;
		}
		this.s = createVector(w, h);
		this.text = text;
		this.style = style;
		this.img = img;
		this.layerGiven = layer != undefined;
		this.layer = layer ? layer : createGraphics(width, height);
		this.proj = projectiles;
		this.shootable = projectiles != undefined;
		this.condition = condition;
		this.func = func;
	}

	update() {
		if (eval(this.condition)) {
			this.display();

			//check for click
			if (mX > this.pos.x - this.s.x/2 && mX < this.pos.x + this.s.x/2 &&
					mY > this.pos.y - this.s.y/2 && mY < this.pos.y + this.s.y/2 && clicked) {
				this.func();
				clicked = false;
			} else if (this.shootable) {

			//check for shot
				for (let p of this.proj) {
					if (p.pos.x > this.pos.x - this.s.x/2 && p.pos.x < this.pos.x + this.s.x/2 &&
							p.pos.y > this.pos.y - this.s.y/2 && p.pos.y < this.pos.y + this.s.y/2) {
						this.func();
						//this.proj.splice(this.proj.indexOf(p), 1);
						break;
					}
				}
			}
		}
	}

	display() {
		let l = this.layer, s = this.style, dt = false, db = false, t, b;

		//default
		if (s.box) db = s.box;
		if (s.text) dt = s.text;

		//mouseOver
		if (mX > this.pos.x - this.s.x/2 && mX < this.pos.x + this.s.x/2 &&
				mY > this.pos.y - this.s.y/2 && mY < this.pos.y + this.s.y/2 && s) {
			t = Object.assign({}, dt);
			b = Object.assign({}, db);
			if (s.mObox) { if (!b) { b = s.mObox; } else { for (let att of Object.keys(s.mObox)) b[att] = s.mObox[att]; }}
			if (s.mOtext) { if (!t) { t = s.mOtext; } else { for (let att of Object.keys(s.mOtext)) t[att] = s.mOtext[att]; }} 
		} else {
			t = Object.assign({}, dt);
			b = Object.assign({}, db);
		} 

		//draw box
		l.rectMode(CENTER);
		l.fill(b && b.fill ? b.fill : color(0, 0));
		l.stroke(b && b.stroke ? b.stroke : color(255, 0));
		l.strokeWeight(b && b.strokeWeight ? b.strokeWeight : 1);
		let r = b && b.radius ? b.radius : 0;
		l.rect(this.pos.x, this.pos.y, this.s.x, this.s.y, r, r, r, r);

		//draw text
		l.fill(t && t.fill ? t.fill : color(255));
		l.stroke(t && t.stroke ? t.stroke : color(255, 0));
		l.strokeWeight(t && t.strokeWeight ? t.strokeWeight : 1);
		l.textSize(t && t.textSize ? t.textSize : 10);
		let stAlign = t.textAlign != undefined;
		l.textAlign(t && stAlign && t.textAlign[0] ? t.textAlign[0] : CENTER, 
								t && stAlign && t.textAlign[1] ? t.textAlign[1] : CENTER);
		l.text(t && t.text ? t.text : this.text, this.pos.x, this.pos.y);

		l.imageMode(CENTER);
		if (this.img) l.image(this.img, this.pos.x, this.pos.y, this.img.width, this.img.height);
		if (!this.layerGiven) image(l, 0, 0);
	}
}

class PolyButton {

	constructor(polygon, text, style, img, layer, projectiles, condition, func) {
		this.pos = createVector(0, 0);
		for (let v of polygon.vert) this.pos.add(v.copy());
		this.pos.div(polygon.vert.length);
		if (polygon == undefined || !(polygon instanceof Polygon)) console.error("Polygon is undefined!"); 
		this.polygon = polygon;
		this.text = text;
		this.style = style;
		this.img = img;
		this.layerGiven = layer != undefined;
		this.layer = layer ? layer : createGraphics(width, height);
		this.proj = projectiles;
		this.shootable = projectiles != undefined;
		this.condition = condition;
		this.func = func;
	}

	update() {
		if (eval(this.condition)) {
			this.display();

			//check for click
			if (this.polygon.collides(mX, mY) && clicked) {
				this.func();
				clicked = false;
			} else if (this.shootable) {

			//check for shot
				for (let p of this.proj) {
					if (this.polygon.collides(p.pos)) {
						this.func();
						this.proj.splice(this.proj.indexOf(p), 1); // comment if projectile should stay
						break;
					}
				}
			}
		}
	}

	display() {
		let l = this.layer, s = this.style, dt = false, db = false, t, b;

		//default
		if (s.box) db = s.box;
		if (s.text) dt = s.text;

		//mouseOver
		if (this.polygon.collides(mX, mY) && s) {
			t = Object.assign({}, dt);
			b = Object.assign({}, db);
			if (s.mObox) { if (!b) { b = s.mObox; } else { for (let att of Object.keys(s.mObox)) b[att] = s.mObox[att]; }}
			if (s.mOtext) { if (!t) { t = s.mOtext; } else { for (let att of Object.keys(s.mOtext)) t[att] = s.mOtext[att]; }} 
		} else {
			t = Object.assign({}, dt);
			b = Object.assign({}, db);
		} 

		//draw box
		l.fill(b && b.fill ? b.fill : color(0, 0));
		l.stroke(b && b.stroke ? b.stroke : color(255, 0));
		l.strokeWeight(b && b.strokeWeight ? b.strokeWeight : 1);
		l.beginShape();
		  for (let v of this.polygon.vert) l.vertex(v.x, v.y);
		l.endShape(CLOSE);

		//draw text
		l.fill(t && t.fill ? t.fill : color(255));
		l.stroke(t && t.stroke ? t.stroke : color(255, 0));
		l.strokeWeight(t && t.strokeWeight ? t.strokeWeight : 1);
		l.textSize(t && t.textSize ? t.textSize : 10);
		let stAlign = t.textAlign != undefined;
		l.textAlign(t && stAlign && t.textAlign[0] ? t.textAlign[0] : CENTER, 
								t && stAlign && t.textAlign[1] ? t.textAlign[1] : CENTER);
		l.text(t && t.text ? t.text : this.text, this.pos.x, this.pos.y);

		l.imageMode(CENTER);
		if (this.img) l.image(this.img, this.pos.x, this.pos.y, this.img.width, this.img.height);
		if (!this.layerGiven) image(l, 0, 0);
	}
}


// --- COLLISION DETECTION ---


class Polygon {

	constructor() {
		this.vert = [];
		this.edge = [];

		if ([...arguments].every(a => typeof a == "number")) {
			if (arguments.length%2 != 0) {
				console.error("Odd number of number typed arguments");
			} else {
				for (let a = 0; a < arguments.length -1; a += 2) this.vert.push(new createVector(arguments[a], arguments[a+1])); 
			}
		} else if ([...arguments].every(a => a instanceof p5.Vector)) {
			for (let a of arguments) this.vert.push(a.copy());
		} else { 
			console.error("Arguments should be only numbers or only p5.Vectors: ", ...arguments);
		}

		this.boundaries();
	}

	moveBy(force) {
		for (let v of this.vert) {
			v.add(force.copy());
		}
		this.boudaries();
	}

	boundaries() {
		this.edge = [];

		for (let v = 0; v < this.vert.length -1; v++) {
			let next = this.vert[(v+1)%this.vert.length].copy();
			let curr = this.vert[v].copy();
			this.edge.push(new p5.Vector.sub(next, curr));
		}
		if (this.vert.length != 0) this.edge.push(new p5.Vector.sub(this.vert[0].copy(), this.vert[this.vert.length-1].copy()));
	}

	addVertex(x, y) {
		if (y == undefined && x instanceof p5.Vector) {
			this.vert.push(x.copy());
		} else if (x != undefined && y != undefined && typeof x == "number" && typeof y == "number") {
			this.vert.push(new createVector(x, y));
		} else console.error("Unable to add new Vertex");

		this.boundaries();
	}

	collides(x, y) {
		if (x > width || x < 0 || y > height || y < 0) return false;
		if (x != undefined && y != undefined && typeof x == "number" && typeof y == "number") x = createVector(x, y);
		if (x instanceof p5.Vector) {

			if (this.vert.length >= 3) {

				let a = random(this.vert).copy();
				let b = random(this.vert).copy();
				while (a.x == b.x && a.y == b.y) {
					b = random(this.vert).copy();
				}
				a.add(b);
				a.div(2);
				this.beam = p5.Vector.sub(a, x.copy());
				this.beam.setMag(2*width);

				let colls = 0;

				for (let i in this.vert) {

					let P1 = x.copy();
					let P2 = P1.copy().add(this.beam);
					let P3 = this.vert[i].copy();
					let P4 = P3.copy().add(this.edge[i]);

					let A, B, C, D;

					if (P1.x < P2.x) {
						A = P1; B = P2;
					} else {
						A = P2; B = P1;
					}

					if (P3.x < P4.x) {
						C = P3; D = P4;
					} else {
						C = P4; D = P3;
					}

					let mB = (B.y - A.y) / (B.x - A.x);
					let mE = (D.y - C.y) / (D.x - C.x);

					if (mE >= 1e10) mE = 1e10;

					let nB = A.y - A.x * mB;
					let nE = C.y - C.x * mE;

					let X = (nB-nE) / (mE-mB);

					if (abs(C.x-D.x) <= 0.00001 && X >= A.x && X <= B.x) {
						let Y = mB*X+nB;
						if (C.y < D.y) {
							if (C.y <= Y && D.y >= Y)	colls++;
						} else {
							if (D.y <= Y && C.y >= Y) colls++;
						}
					} else if (X >= C.x && X <= D.x && X >= A.x && X <= B.x) {
						colls++;
					}

				}
				return colls%2 == 1;
			}

		} else if (x instanceof Polygon) {

			for (let v of x.vert) if (this.collide(v)) return true;

			for (let iT in this.edge) {
				for (let iX in x.edge) {

					let P1 = this.vert[iT].copy();
					let P2 = P1.copy().add(this.edge[iT]);
					let P3 = x.vert[iX].copy();
					let P4 = P3.copy().add(this.edge[iX]);

					let A, B, C, D;

					if (P1.x < P2.x) {
						A = P1; B = P2;
					} else {
						A = P2; B = P1;
					}

					if (P3.x < P4.x) {
						C = P3; D = P4;
					} else {
						C = P4; D = P3;
					}

					let mB = (B.y - A.y) / (B.x - A.x);
					let mE = (D.y - C.y) / (D.x - C.x);

					let nB = A.y - A.x * mB;
					let nE = C.y - C.x * mE;

					let X = (nB-nE) / (mE-mB);

					if (X >= C.x && X <= D.x && X >= A.x && X <= B.x) return { "this" : this.edge, "other" : x.edge };

				}
			}

			return false;

		} else console.error("Cannot detect collision object");
	}

	static fromCircle(x, y, r, res) {
		let pc = new Polygon(0, 0);
		pc.vert = [];
		if (res != undefined) {
			for (let a = 0; a < TAU; a += TAU/res) pc.vert.push(createVector(x + cos(a)*r, y + sin(a)*r));
		} else if (x instanceof p5.Vector) {
			for (let a = 0; a < TAU; a += TAU/r) pc.vert.push(createVector(x.x + cos(a)*y, x.y + sin(a)*y));
		} else console.error("Incorrect arguments for circle");
		pc.boundaries();
		return pc;
	}

	display() {
		strokeWeight(1).stroke(0).fill(255, 40);
		beginShape();
			for (let v of this.vert) vertex(v.x, v.y); 
		endShape(CLOSE);
	}
}