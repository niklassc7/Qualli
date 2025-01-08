import Bubble from "./Bubble.js";
import * as g from "../globals.js";
import BubbleSeed from "./BubbleSeed.js";
import Colors from "../appEtc/color/Colors.js";
import FloatSign from "./FloatSign.js";

export default class BubbleTemp extends Bubble {
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

	createLostSign() {
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

			g.room.addObject(new FloatSign(lostMsg, this.x, this.y, signColor, signFontSize));

	}

	step() {
		super.step();
		this.ttl--;

		if (this.ttl <= 0) {
			let futureBubble = new BubbleTemp(this.x, this.y, 0, this.size, 0, undefined);
			g.room.addObject(new BubbleSeed(1000, futureBubble));

			if (this.team !== 0) {
				this.createLostSign();
			}

			this.destroy();
		}
	}

	draw() {
		super.draw();

		// Draw circle-indicator of left ttl
		g.ctx.lineWidth = 3 * g.xScalar;
		g.ctx.strokeStyle = 'black';
		g.ctx.beginPath();
		g.ctx.arc(this.xD,
			this.yD,
			1.1 * this.widthD / 2,
			2.0 * Math.PI * ((this.totalTtl-this.ttl)/this.totalTtl),
			2.0 * Math.PI);

		g.ctx.stroke();
	}
}
