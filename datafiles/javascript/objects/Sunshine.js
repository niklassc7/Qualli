import IObjlistentry from "../appEtc/IObjlistentry.js";
import * as f from "../functions.js";

export default class Sunshine extends IObjlistentry {
	constructor(g, x, y) {
		super(g);

		this.x = x;
		this.y = y;

		// Number of beams to each side
		this.ne = 10;

		// Modulate alpha value of beams (0 <= dAlphaMod <= 1)
		this.dAlphaMod = new Array(2*this.ne).fill(0.5);
		this.dAlphaMaxStep = 0.05;
		// this.dAlphaMaxDiff = 
	}

	step(g) {
		super.step(g);

		for (let i = 0; i < this.dAlphaMod.length; i++) {
			this.dAlphaMod[i] += (2*Math.random()*this.dAlphaMaxStep - this.dAlphaMaxStep);
			this.dAlphaMod[i] = Math.max(0, this.dAlphaMod[i]);
			this.dAlphaMod[i] = Math.min(1, this.dAlphaMod[i]);
		}
	}

	draw(g) {
		super.draw(g);
		g.ctx.lineWidth = 140;

		let xD = this.x;
		let yD = this.y;

		for (let i = -this.ne; i < this.ne; i++) {
			let a = 0.02 + this.dAlphaMod[i+this.ne]*0.06;
			g.ctx.strokeStyle = `rgba(255, 230, 150, ${a})`;

			let d = g.roomWidth / (2*this.ne);
			f.drawLine(g.ctx, xD, yD, xD + i*d*1.2, g.roomHeight-0);
		}
	}
}
