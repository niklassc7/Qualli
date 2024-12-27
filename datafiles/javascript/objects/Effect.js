// TODO extend from sprite-less object

class Effect extends Object {
	constructor(x, y, ttl) {
		super(x, y, 0, 0, undefined);
		this.totalTtl = ttl;
		this.ttl = ttl;
		// this.x;
		// this.y;
	}
	
	step() {
		super.step();

		this.ttl--;

		if (this.ttl <= 0) {
			this.destroy();
		}
	}
}