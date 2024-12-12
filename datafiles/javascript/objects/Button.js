class Button extends Object {
	constructor(text, x, y, width, height, onClick, disabled) {
		super(x, y, width, height, sprLock);
		this.text = text;
		this.onClick = onClick;
		this.borderColour = "white";
		this.fontSize = 56;
		this.font =  Math.round(this.fontSize * ((xScalar + yScalar) / 2)) + "px fnt_Comforta_Regular";
		this.disabled = (disabled === undefined) ? false : disabled;
		this.animationSpeed = 0.1 + Math.random() * 0.2
	}

	setFontSize(size) {
		this.fontSize = size;
		this.resize();
	}

	resize() {
		super.resize();
		this.font =  Math.round(this.fontSize * ((xScalar + yScalar) / 2)) + "px fnt_Comforta_Regular";
	}

	// step() {
	// 	if(mouse.left_pressed && point_in_rectangle(mouse.x, mouse.y, this.x, this.y, this.x + this.width, this.y + this.height))
	// 		this.onClick();
	// }

	draw() {
		ctx.lineWidth = Math.round(2 * xScalar);

		if (point_in_rectangle(input.x, input.y, this.x, this.y, this.x+this.width, this.y+this.height)) {
			ctx.lineWidth = Math.round(8 * xScalar);
		}

		ctx.strokeStyle = this.borderColour;
		// ctx.fillStyle = "white";


		// TODO sinus curve
		let animationN = 32
		// let animationSpeed = 0.3
		let fill = stepCount * this.animationSpeed % animationN
		fill = Math.abs(fill - animationN / 2)
		// Normalize
		fill = fill / (animationN/2)
		//  Scale 
		fill = fill * 0.3

		ctx.fillStyle = `rgba(200, 200, 255, ${fill})`;

		draw_roundrect(
			ctx,
			this.xD,
			this.yD,
			this.widthD,
			this.heightD,
			10,
			true
		);

		// let locked = false; // TODO implement lock system
		if(this.disabled) {
			ctx.strokeStyle = "#607d8b";
			ctx.fillStyle = "#607d8b";
			ctx.drawImage(this.sprite, this.xD - this.oxD + this.widthD * 0.25, this.yD - this.oyD + this.heightD * 0.14, this.widthD * 0.5, this.heightD * 0.5);
		} else {
			ctx.strokeStyle = "white";
			ctx.fillStyle = "white";
		}


		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font = this.font;
		ctx.fillText(
			this.text,
			(this.x + this.width / 2) * xScalar,
			(this.y + this.height / 2) * yScalar
		);



		// if(point_in_rectangle(mouse.x, mouse.y, this.x, this.y, this.x + this.width, this.y + this.height) && !this.disabled) {
		// 	ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
		// 	ctx.strokeStyle = "yellow";
		// 	draw_roundrect(
		// 		ctx,
		// 		this.xD,
		// 		this.yD,
		// 		this.widthD,
		// 		this.heightD,
		// 		10,
		// 		true
		// 	);
		// }
	}
}
