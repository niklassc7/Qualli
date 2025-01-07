class SimBubble extends Object {
	// TODO Is this ever cleared? On room change?
	static all = [];

	constructor(x, y, r, basecolor) {
		super(x, y, 2*r, 2*r);
		SimBubble.all.push(this);

		this.ascendAcel = 0.0002 * r;
		this.basecolor = basecolor;



		let speed = 1 + Math.random();
		let directionDiff = 30; // Degrees in which direction is random
		let direction = 270 - directionDiff + 2*(directionDiff*Math.random());

		this.createQueue = new LinkedList();


		// console.log(direction);

		this.setDirectionSpeed(direction, speed);
		// console.log(this.speed, this.direction);
	}

	destroy() {
		super.destroy();

		// Delete from SimBubble.all
		for (let i = 0; i < SimBubble.all.length; i++) {
			let other = SimBubble.all[i];
			if (other === this) {
				SimBubble.all.splice(i, 1);
				break;
			}
		}
	}

	step() {
		super.step();

		this.setVspeed(this.vspeed - this.ascendAcel);

		if (room instanceof LevelRoom) {
			this.setVspeed(this.vspeed - 40*this.ascendAcel);
		}

		if (this.isOutsideRoom()) {
			this.destroy()
		}

		// Create jellies
		if (!this.createQueue.isEmpty()) {
			let parameter = this.createQueue.removeFirst();
			let newJelly = new SimJelly(parameter[0], parameter[1], parameter[2], parameter[3]);
			newJelly.setSpeeds(newJelly.hspeed + this.hspeed, newJelly.vspeed + this.vspeed);
		}

		// // Randomly start attack
		// if (Math.random() < 0.0005) {
		// 	let amount = Math.round(Math.random() * 50) + 3;
		// 	let ri = Math.floor(SimBubble.all.length * Math.random());
		// 	let target = SimBubble.all[ri];

		// 	this.attack(target, amount);
		// }


		// Collision with cursor
		let ax1 = this.x - this.width/2;
		let ay1 = this.y - this.height/2
		let ax2 = this.x + this.width/2;
		let ay2 = this.y + this.height/2

		if (point_in_rectangle(input.x, input.y, ax1, ay1, ax2, ay2)) {
			let a = 0.5;
			if (this.x < input.x) {
				this.setHspeed(this.hspeed - a);
			} else {
				this.setHspeed(this.hspeed + a);
			}

			if (this.y < input.y) {
				this.setVspeed(this.vspeed - a);
			} else {
				this.setVspeed(this.vspeed + a);
			}
		}

		// Collide with other SimBubbles
		for (let i = 0; i < SimBubble.all.length; i++) {
			let other = SimBubble.all[i];
			if (other === this) {
				continue;
			}

			// if (Math.random() < 0.001) {
			// console.log(other);
			// }

			// TODO check circle in cirlce
			// if (circleInCircle(this.x, this.y, this.width/2,
			//                    i.x, i.y, i.width/2)) {

			let bx1 = other.x - other.width/2;
			let by1 = other.y - other.height/2
			let bx2 = other.x + other.width/2;
			let by2 = other.y + other.height/2

			if (rectangle_in_rectangle(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2)) {
				// console.log("COLLLISION");
				let aHoriz = 0.05;
				if (this.x < other.x) {
					this.setHspeed(this.hspeed - aHoriz);
					other.setHspeed(other.hspeed + aHoriz);
				} else {
					this.setHspeed(this.hspeed + aHoriz);
					other.setHspeed(other.hspeed - aHoriz);
				}
				let aVert = 0.05;
				if (this.y < other.y) {
					this.setVspeed(this.vspeed - aVert);
					other.setVspeed(other.vspeed + aVert*0.2); // slower down
				} else {
					this.setVspeed(this.vspeed + aVert*0.2); // slower down
					other.setVspeed(other.vspeed - aVert);
				}
			}

		}
	}

	draw() {
		super.draw();

		ctx.strokeStyle = "rgba(220, 220, 250, 0.6)";
		// ctx.strokeStyle = `rgba(${this.basecolor[0]}, ${this.basecolor[1]}, ${this.basecolor[2]}, 0.6)`;
		ctx.lineWidth = 4 * xScalar;
		draw_circle(this.xD, this.yD, this.widthD/2, true);


		ctx.fillStyle = "rgba(220, 220, 250, 0.1)";
		// ctx.fillStyle = `rgba(${this.basecolor[0]}, ${this.basecolor[1]}, ${this.basecolor[2]}, 0.1)`;
		draw_circle(this.xD, this.yD, this.widthD/2, false);


		// ctx.fillStyle = "rgba(220, 220, 250, 0.2)";
		let lineNum = 5;
		for (let i = 1; i < lineNum; i++) {
			let alpha = 0.05 + 0.6 * (1 - i/lineNum)

			// ctx.strokeStyle = "rgba(220, 220, 250, 0.1)";
			// ctx.strokeStyle = "red";
			// ctx.strokeStyle = `rgba(120, 210, 255, ${alpha})`;
			ctx.strokeStyle = `rgba(${this.basecolor[0]}, ${this.basecolor[1]}, ${this.basecolor[2]}, ${alpha})`;
			let lineWidth = 1 * xScalar;
			ctx.lineWidth = lineWidth;
			draw_circle(this.xD, this.yD, this.widthD/2 - i*(lineWidth*2), true);
			draw_circle(this.xD, this.yD, this.widthD/2 + i*(lineWidth*2), true);
		}
	}


	// attack(other) {
	// 	let amount = Math.floor(this.units / 2)

	// 	this.attackN(other, amount)
	// }

	// Attack bubble other
	attack(other, amount) {
		// if (amount > this.units) {
		// 	console.warn("Tried attacking with more units than bubble has.")
		// 	amount = this.units
		// }
		// amount = Math.min(this.units, amount)

		// this.units -= amount

		for (let i = 0; i < amount; i++) {
			// let newJelly = new Jelly(this.x, this.y, this.team, other)
			// let team = 1; // TODO
			// let team = Math.floor(Colors.team.length * Math.random());
			// team = 1;
			// TODO team object
			let team = 1 + Math.floor(4 * Math.random());
			console.log("Create with team", team);
			this.createQueue.addLast([this.x, this.y, team, other])
		}
	}
	}
