class Bubble extends SpriteObject {
	constructor(x, y, team=0, size=1, units=25) {
		super(x, y);

		this.size = size; // TODO width and height in constructor
		this.units = units;
		this.team = team;

		this.width = 80 * (1 + (this.size / 3));
		this.height = 80 * (1 + (this.size / 3));
		this.ox = this.width / 2;
		this.oy = this.height / 2;

		this.sprite = spr_Planet;

		this.createQueue = new LinkedList();
		this.animationSpeed = 0.1 + Math.random() * 0.2
	}

	step() {
		super.step();
		if (this.team !== 0)
			this.units += this.size / 60;

		if (!this.createQueue.isEmpty()) {
			let parameter = this.createQueue.removeFirst();
			new Jelly(parameter[0], parameter[1], parameter[2], parameter[3]);
		}
	}

	draw() {
		// TODO fix or remove animation
		// // TODO sinus curve
		// let animationN = 32
		// // let animationSpeed = 0.3
		// let fill = stepCount * this.animationSpeed % animationN
		// fill = Math.abs(fill - animationN / 2)
		// // Normalize
		// fill = fill / (animationN/2)
		// //  Scale 
		// fill = fill * 0.1

		// ctx.fillStyle = `rgba(200, 200, 255, ${fill})`;
		// ctx.lineWidth = Math.round(8 * xScalar);
		// draw_circle(this.xD, this.yD, this.widthD / 2 * 0.7, false);


		// Team colour
		if(this.team !== 0) {
			ctx.fillStyle = Colors.team[this.team].cRgba();
			ctx.strokeStyle = ctx.fillStyle;
			ctx.lineWidth = Math.round(8 * xScalar);
			draw_circle(this.xD, this.yD, this.widthD / 2, true);
		}

		super.draw();

		// Units
		ctx.fillStyle = "#eceff1";
		ctx.font = Math.round(36 * xScalar) + "px fnt_Comforta_Bold";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.fillText(Math.floor(this.units), this.xD, this.yD);

		// Queue
		if (!this.createQueue.isEmpty()) {
			ctx.fillStyle = "#fc9f91";
			ctx.font = Math.round(18 * xScalar) + "px fnt_Comforta_Bold";
			ctx.textBaseline = "middle";
			ctx.textAlign = "center";
			ctx.fillText(this.createQueue.size, this.xD, this.yD +32);
		}
	}

	destroy() {
		super.destroy();

		room.removeBubble(this);
	}

	// Attack bubble other
	// TODO obsolete?
	attack(other) {
		let amount = Math.floor(this.units / 2)

		this.attackN(other, amount)
	}

	// Attack bubble other
	attackN(other, amount) {
		// throw new Error("Cannot attack with more units than bubble has.")

		if (amount > this.units) {
			console.warn("Tried attacking with more units than bubble has.")
			amount = this.units
		}
		// amount = Math.min(this.units, amount)

		this.units -= amount

		for (let i = 0; i < amount; i++) {
			// let newJelly = new Jelly(this.x, this.y, this.team, other)
			this.createQueue.addLast([this.x, this.y, this.team, other])
		}
	}

	// Gets called to attack this bubble with n units by team `team`
	#getAttacked(n, team) {
		// Don't capture
		if (n < this.units) {
			this.units -= n;
			return;
		}

		// Capture
		this.units = n - this.units;
		this.team = team;
	}

	// TODO make more efficient → test if it was faster before this commit
	// Gets called when `n` jellies of team `team`.
	// If bubble is owned by `team`, the units will be added, otherwise
	// substracted. If n >= this.units, then bubble is captured and the
	// amount of `n` that is left is added to the bubble.
	receiveJellies(n, team) {
		if (this.team === team) {
			this.units += n;
		} else {
			this.#getAttacked(n, team);
		}
	}
}
