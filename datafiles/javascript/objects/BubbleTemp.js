class BubbleTemp extends Bubble {
	constructor(x, y, team, size, units, ttl) {
		super(x, y, team, size, units);

		// TODO dont randomize by default
		if (ttl == undefined) {
			this.totalTtl = 500 + Math.random() * 3000;
		} else {
			this.totalTtl = ttl;
		}
		this.ttl = this.totalTtl; // TODO use stepCount?
	}

	step() {
		super.step();
		this.ttl--;

		if (this.ttl <= 0) {
			let futureBubble = new BubbleTemp(this.x, this.y, 0, this.size, 0, undefined);
			room.addObject(new BubbleSeed(1000, futureBubble));

			// Create FloatSign indicating lost jellies
			let lostJellies = Math.floor((this.units + this.createQueue.size));
			let lostMsg = "-" + lostJellies;
			let signColor = Colors.team[this.team].cRgb();
			let signTtl = 30;
			let signFontSize = 30;

			if (lostJellies >= 100) {
				lostMsg += " !"
				signTtl += 10;
				signFontSize += 10;
			}

			if (lostJellies >= 200) {
				lostMsg += "!!"
				signTtl += 20;
				signFontSize += 10;
			}

			room.addObject(new FloatSign(lostMsg, this.x, this.y, signColor, signFontSize));

			this.destroy();
		}
	}

	draw() {
		super.draw();

		// Draw circle-indicator of left ttl
		ctx.lineWidth = 3 * xScalar;
		ctx.strokeStyle = 'black';
		ctx.beginPath();
		ctx.arc(this.xD,
			this.yD,
			1.1 * this.widthD / 2,
			2.0 * Math.PI * ((this.totalTtl-this.ttl)/this.totalTtl),
			2.0 * Math.PI);

		ctx.stroke();
	}
}
