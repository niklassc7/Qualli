class FloatSign extends Object {
	constructor(text, x, y, color, fontSize=20, ttl=200) {
		super(x, y, 0, 0);
		this.text = text;
		this.color = color;
		this.fontSize = fontSize;
		this.font =	Math.round(this.fontSize * ((xScalar + yScalar) / 2)) + "px fnt_Comforta_Bold";

		this.background = "white";

		this.startTtl = ttl;
		this.ttl = this.startTtl;
		this.vspeed = -2;
	}

	setFontSize(size) {
		this.fontSize = size;
		this.resize();
	}

	resize() {
		super.resize();
		this.font =	Math.round(this.fontSize * ((xScalar + yScalar) / 2)) + "px fnt_Comforta_Bold";
	}

	step() {
		super.step();

		this.ttl--;

		if (this.ttl <= 0) {
			this.destroy();
		}
	}

	draw() {
		this.resize();

		ctx.font = this.font;
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.background;
		ctx.lineWidth = 4 * xScalar;

		ctx.globalAlpha = this.ttl / this.startTtl;
		
		ctx.strokeText(this.text, this.xD, this.yD);
		ctx.fillText(this.text, this.xD, this.yD);

		ctx.globalAlpha = 1;
	}
}

