class Objekt extends IObjlistEntry {
	constructor(x, y, width, height, sprite) {
		super();
		this.x = x;
		this.y = y;
		this.xD = x * xScalar; // x it should be drawn at
		this.yD = y * yScalar; // y it should be drawn at
		this.ox = 0; // Origin
		this.oy = 0;
		this.oxD = 0;
		this.oyD = 0;
		this.hspeed = 0;
		this.vspeed = 0;
		this.direction = 0;
		this.speed = 0;
		this.sprite = sprite;
		this.width = (width === undefined) ? 0 : width;
		this.height = (height === undefined) ? 0 : height;;
		this.widthD = this.width * xScalar;
		this.heightD = this.height * yScalar;

		this.opt_swapScreen = 0; // 0 aus, 1 horizontal, 2 vertikal, 3 vollständig
		// this.resize();
	}

	resize() {
		this.xD = this.x * xScalar;
		this.yD = this.y * yScalar;
		this.oxD = this.ox * xScalar;
		this.oyD = this.oy * yScalar;
		this.widthD = this.width * xScalar;
		this.heightD = this.height * yScalar;

		// console.log(this.width);
	}

	setDirection(direction) {
		this.setDirectionSpeed(direction, this.speed);
	}
	setSpeed(speed) {
		this.setDirectionSpeed(this.direction, speed);
	}
	setDirectionSpeed(direction, speed) {
		// console.log(direction);
		this.direction = direction;
		this.speed = speed;
		// Calc speeds
		let radDeg = degtorad(direction);
		// console.log(radDeg);
		this.vspeed = Math.sin(radDeg) * speed;
		this.hspeed = Math.cos(radDeg) * speed;
		// console.log(this.hspeed, this.vspeed);
	}

	setHspeed(hspeed) {
		this.setSpeeds(hspeed, this.vspeed);
	}
	setVspeed(vSpeed) {
		this.setSpeeds(this.hspeed, vspeed);
	}
	setSpeeds(hspeed, vspeed) {
		this.hspeed = hspeed;
		this.vspeed = vspeed;

		this.direction = radtodeg(Math.atan2(this.vspeed, this.hspeed));

		// Calc speed
		this.speed = Math.sqrt(this.hspeed * this.hspeed + this.vspeed * this.vspeed);
	}

	step() {
		this.x += this.hspeed;
		this.y += this.vspeed;
		if(this.opt_swapScreen != 0)
			this.swapScreen();
		// if(this.opt_turn_calculate_direction){
			//   //this.direction = point_direction(this.x, this.y, this.x + this.hspeed, this.y + this.vspeed);
			//   this.direction = radtodeg(Math.atan2(this.vspeed, this.hspeed));
			// }
	}
	draw() {
		this.resize(); // TODO optimise somehow?

		// Das Objekt zeichnet seinen Sprite an der Stelle seiner Koordinaten
		if(this.sprite !== undefined) {
			if(this.direction !== 0){
				// Gedreht
				ctx.save();
				ctx.translate(this.xD, this.yD);
				ctx.rotate(degtorad(this.direction));//Math.PI/180 is to Radians
				ctx.drawImage(this.sprite, -this.oxD, -this.oyD, this.widthD, this.heightD);
				ctx.restore();
			}else{
				ctx.drawImage(this.sprite, this.xD - this.oxD, (this.yD - this.oyD), this.widthD, this.heightD);
			}
			// console.log(this.spr);
		}else{
			console.log("Fehler: Draw Methode eines Objektes wurde aufgerufen, ohne, dass diesem ein Sprite zugewiesen ist.");
		}
	}

	isOutsideRoom_vert() { // obolsete (ORIGIN)
		if( (this.x > canvas_width) || (this.width + this.x < 0) ) {
			return true;
		}
		return false;
	}
	isOutsideRoom_horz() { // obolsete (ORIGIN)
		if( (this.y > canvas_height) || (this.height + this.y < 0) ) {
			return true;
		}
		return false;
	}
	isOutsideRoom() { // obolsete (ORIGIN)
		if(this.isOutsideRoom_vert() || this.isOutsideRoom_horz()) {
			return true;
		}
		return false;
	}
	swapScreen() { // TODO
		if(this.opt_swapScreen >= 2) {
			if(this.y > canvas_height + (this.height/2)) this.y = -(this.height/2);
			if((this.height/2) + this.y < 0) this.y = canvas_height + (this.height/2);
		}
		if(this.opt_swapScreen === 2) return;
		if(this.x > canvas_width + (this.width/2)) this.x = -(this.width/2);
		if((this.width/2) + this.x < 0) this.x = canvas_width + (this.width/2);
	}

	move_towards_point(x, y, v){
		/* Setzt hspeed und vspeed passend. */
		// var dx = x - this.x;
		// var dy = y - this.y;
		// var dis = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
		// var skalierung = v / dis;
		// this.setSpeeds(dx * skalierung, dy * skalierung);

		let dir = point_direction(this.x, this.y, x, y);

		if(v === undefined)
			this.setDirection(dir);
		else {
			this.setDirectionSpeed(dir, v);
		}

	}
}
