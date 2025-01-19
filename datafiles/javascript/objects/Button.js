import * as f from "../functions.js";
import SpriteObject from "../engine/objects/SpriteObject.js";

// TODO extend from Object instead of SpriteObject
export default class Button extends SpriteObject {
	constructor(g, text, x, y, width, height, onClick, disabled) {
		super(g, x, y, width, height, g.sprLock);
		this.text = text;
		this.onClick = onClick;
		this.borderColour = "white";
		this.fontSize = 56;
		this.font =  Math.round(this.fontSize) + "px fnt_Comforta_Regular";
		this.disabled = (disabled === undefined) ? false : disabled;
		this.animationSpeed = 0.1 + Math.random() * 0.2

		// TODO calculate font size based on width and text
	}

	setFontSize(size) {
		this.fontSize = size;
		this.resize();
	}

	resize() {
		super.resize();
		this.font = Math.round(this.fontSize) + "px fnt_Comforta_Regular";
	}

	draw(g) {
		let lw = 2;

		if (f.point_in_rectangle(g.input.x, g.input.y, this.x, this.y, this.x+this.width, this.y+this.height)) {
			lw = 8;
		}


		// TODO sinus curve
		let animationN = 32
		// let animationSpeed = 0.3
		let fill = g.stepCount * this.animationSpeed % animationN
		fill = Math.abs(fill - animationN / 2)
		// Normalize
		fill = fill / (animationN/2)
		//  Scale 
		fill = fill * 0.3

		g.ctx.lineWidth = lw;
		g.ctx.strokeStyle = "rgba(50, 50, 50, 0.3)";
		f.draw_roundrect(
			g.ctx,
			this.xD,
			this.yD,
			this.widthD + lw,
			this.heightD + lw,
			6,
			false,
			true
		);

		g.ctx.strokeStyle = this.borderColour;

		g.ctx.fillStyle = `rgba(200, 200, 255, ${fill})`;
		f.draw_roundrect(
			g.ctx,
			this.xD,
			this.yD,
			this.widthD,
			this.heightD,
			6,
			true,
			true
		);

		// let locked = false; // TODO implement lock system
		if(this.disabled) {
			g.ctx.strokeStyle = "#607d8b";
			g.ctx.fillStyle = "#607d8b";
			g.ctx.drawImage(this.sprite, this.xD - this.oxD + this.widthD * 0.25, this.yD - this.oyD + this.heightD * 0.14, this.widthD * 0.5, this.heightD * 0.5);
		} else {
			g.ctx.strokeStyle = "white";
			g.ctx.fillStyle = "white";
		}


		g.ctx.textAlign = "center";
		g.ctx.textBaseline = "middle";
		g.ctx.font = this.font;
		g.ctx.fillText(
			this.text,
			this.x + this.width / 2,
			this.y + this.height / 2
		);
	}
}
