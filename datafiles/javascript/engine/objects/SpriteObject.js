class SpriteObject extends Object {
	constructor(x, y, width, height, sprite) {
		super(x, y, width, height);

		this.sprite = sprite;
	}

	draw() {
		super.draw();
		
		// Draw sprite
		if(this.direction !== 0) {
			// Rotate before drawing
			ctx.save();
			ctx.translate(this.xD, this.yD);
			ctx.rotate(degtorad(this.direction));//Math.PI/180 is to Radians
			ctx.drawImage(this.sprite, -this.oxD, -this.oyD, this.widthD, this.heightD);
			ctx.restore();
		} else {
			ctx.drawImage(this.sprite, this.xD - this.oxD, this.yD - this.oyD, this.widthD, this.heightD);
		}
	}
}
