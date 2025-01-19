import Object from "./Object.js";
import * as f from "../../functions.js";

export default class SpriteObject extends Object {
	constructor(g, x, y, width, height, sprite) {
		super(g, x, y, width, height);

		this.sprite = sprite;
	}

	draw() {
		super.draw();
		
		// Draw sprite
		if(this.direction !== 0) {
			// Rotate before drawing
			this.g.ctx.save();
			this.g.ctx.translate(this.xD, this.yD);
			this.g.ctx.rotate(f.degtorad(this.direction));//Math.PI/180 is to Radians
			this.g.ctx.drawImage(this.sprite, -this.oxD, -this.oyD, this.widthD, this.heightD);
			this.g.ctx.restore();
		} else {
			this.g.ctx.drawImage(this.sprite, this.xD - this.oxD, this.yD - this.oyD, this.widthD, this.heightD);
		}
	}
}
