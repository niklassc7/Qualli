import * as g from "../globals.js";
import * as f from "../functions.js";

export default class RadarEffect extends Effect {
	constructor(x, y, ttl, color) {
		super(x, y, ttl);
		this.color = color;

		this.radius = 0;
		this.radiusStep = 5;
	}

	step() {
		super.step();
		this.radius += this.radiusStep;
	}

	draw() {
		super.draw();

		g.ctx.strokeStyle = this.color;
		g.ctx.lineWidth = 4 * g.xScalar;

		g.ctx.globalAlpha = this.relTtl();
		f.draw_circle(this.xD, this.yD, this.radius * g.xScalar, true)
		g.ctx.globalAlpha = 1.0;
	}

	relTtl() {
		return this.ttl / this.totalTtl
	}
}
