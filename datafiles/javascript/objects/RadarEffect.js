class RadarEffect extends Effect {
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

		ctx.strokeStyle = this.color;
		ctx.lineWidth = 4 * xScalar;

		ctx.globalAlpha = this.relTtl();
		draw_circle(this.xD, this.yD, this.radius * xScalar, true)
		ctx.globalAlpha = 1.0;
	}

	relTtl() {
		return this.ttl / this.totalTtl
	}
}
