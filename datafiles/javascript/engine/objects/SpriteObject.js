import Object from "./Object.js";
import * as g from "../../globals.js";
import * as f from "../../functions.js";

export default class SpriteObject extends Object {
	constructor(x, y, width, height, sprite) {
		super(x, y, width, height);

		this.sprite = sprite;
	}

	draw() {
		super.draw();
		
		// Draw sprite
		if(this.direction !== 0) {
			// Rotate before drawing
			g.ctx.save();
			g.ctx.translate(this.xD, this.yD);
			g.ctx.rotate(f.degtorad(this.direction));//Math.PI/180 is to Radians
			g.ctx.drawImage(this.sprite, -this.oxD, -this.oyD, this.widthD, this.heightD);
			g.ctx.restore();
		} else {
			g.ctx.drawImage(this.sprite, this.xD - this.oxD, this.yD - this.oyD, this.widthD, this.heightD);
		}
	}
}
