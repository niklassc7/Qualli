class Color {
	constructor(r, g, b, a=1.0) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	// Returns new color that is a mix of `this` and `color`.
	// Weight `w` (between 0 and 1) determines how much `color` is weighted.
	getMix(color, w=0.5) {
		let iw = 1.0 - w;
		let r = this.r*iw + color.r*w
		let g = this.g*iw + color.g*w
		let b = this.b*iw + color.b*w

		return new Color(r, g, b);
	}

	rgb() {
		return [this.r, this.g, this.b];	
	}

	rgba() {
		return [this.r, this.g, this.b, this.a];	
	}

	// CSS string
	cRgb() {
		return `rgba(${this.r}, ${this.g}, ${this.b})`;
	}

	// CSS string
	cRgba() {
		return `rgba(${this.r}, ${this.g}, ${this.b},${this.a})`;
	}
}
