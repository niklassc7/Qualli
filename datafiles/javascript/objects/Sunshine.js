import IObjlistentry from "../appEtc/IObjlistentry.js";
import * as f from "../functions.js";
import * as g from "../globals.js";

export default class Sunshine extends IObjlistentry {
	constructor(x, y) {
		super();

		this.x = x;
		this.y = y;

		// Number of beams to each side
		this.ne = 10;

		// Modulate alpha value of beams (0 <= dAlphaMod <= 1)
		this.dAlphaMod = new Array(2*this.ne).fill(0.5);
		this.dAlphaMaxStep = 0.05;
		// this.dAlphaMaxDiff = 
	}

	step() {
		super.step();

		for (let i = 0; i < this.dAlphaMod.length; i++) {
			this.dAlphaMod[i] += (2*Math.random()*this.dAlphaMaxStep - this.dAlphaMaxStep);
			this.dAlphaMod[i] = Math.max(0, this.dAlphaMod[i]);
			this.dAlphaMod[i] = Math.min(1, this.dAlphaMod[i]);
		}

		// console.log(this.dAlphaMod);
	}

	draw() {
		super.draw();
		g.ctx.lineWidth = 140 * g.xScalar;

		let xD = this.x * g.xScalar;
		let yD = this.y * g.yScalar;


		for (let i = -this.ne; i < this.ne; i++) {
			// console.log(i, this.dAlphaMod[i+this.ne]);
			let a = 0.02 + this.dAlphaMod[i+this.ne]*0.06;
			// console.log(i, a);
			g.ctx.strokeStyle = `rgba(255, 230, 150, ${a})`;
			// g.ctx.strokeStyle = `rgba(255, 230, 150, 0.2)`;

			// let l = 300 * g.xScalar;
			// let l = g.roomHeight * g.xScalar;
			// let d = Math.abs(i)*3 + 30 * g.xScalar;
			// let d = Math.abs(i)*3 + 30 * g.xScalar;

			let d = g.roomWidth / (2*this.ne) * g.xScalar;
			f.draw_line(xD, yD, xD + i*d*1.2, (g.roomHeight-0)*g.xScalar);
		}
	}
}
