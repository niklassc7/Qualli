class Color {
	constructor(r, g, b, a=1.0) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	rgb() {
		return [this.r, this.g, this.b];	
	}

	rgba() {
		return [this.r, this.g, this.b, this.a];	
	}

	// CSS string
	cRgba() {
		return `rgba(${this.r}, ${this.g}, ${this.b},${this.a})`;
	}
}
