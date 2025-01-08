import * as g from "../globals.js";
import * as f from "../functions.js";
import SpriteObject from "../engine/objects/SpriteObject.js";

// TODO extend from Object instead of SpriteObject
export default class Button extends SpriteObject {
	constructor(text, x, y, width, height, onClick, disabled) {
		super(x, y, width, height, g.sprLock);
		this.text = text;
		this.onClick = onClick;
		this.borderColour = "white";
		this.fontSize = 56;
		this.font =  Math.round(this.fontSize * ((g.xScalar + g.yScalar) / 2)) + "px fnt_Comforta_Regular";
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
		this.font =  Math.round(this.fontSize * ((g.xScalar + g.yScalar) / 2)) + "px fnt_Comforta_Regular";
	}

	// step() {
	// 	if(mouse.left_pressed && point_in_rectangle(mouse.x, mouse.y, this.x, this.y, this.x + this.width, this.y + this.height))
	// 		this.onClick();
	// }

	draw() {
		g.ctx.lineWidth = Math.round(2 * g.xScalar);

		if (f.point_in_rectangle(g.input.x, g.input.y, this.x, this.y, this.x+this.width, this.y+this.height)) {
			g.ctx.lineWidth = Math.round(8 * g.xScalar);
		}

		g.ctx.strokeStyle = this.borderColour;

		// TODO sinus curve
		let animationN = 32
		// let animationSpeed = 0.3
		let fill = g.stepCount * this.animationSpeed % animationN
		fill = Math.abs(fill - animationN / 2)
		// Normalize
		fill = fill / (animationN/2)
		//  Scale 
		fill = fill * 0.3

		g.ctx.fillStyle = `rgba(200, 200, 255, ${fill})`;

		f.draw_roundrect(
			g.ctx,
			this.xD,
			this.yD,
			this.widthD,
			this.heightD,
			6 * g.xScalar,
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
			(this.x + this.width / 2) * g.xScalar,
			(this.y + this.height / 2) * g.yScalar
		);
	}
}
