class Startpage extends Room {
	constructor(){
		super();
		this.background = spr_bgMenu;
		document.body.style.backgroundImage = spr_bgMenu


		this.n_step = 0; // TODO is this needed

		var buttonWidth = 256;
		var buttonHeight = 192;
		var buttonMargin = 128;

		this.addObject(new Button("Start", roomWidth / 2 - buttonMargin - (3/2) * buttonWidth, roomHeight / 2 - buttonHeight / 2, buttonWidth, buttonHeight, () => { gotoRoom(MenuOverview) }  )).borderColour = "yellow";
		this.addObject(new Button("Vollbild", roomWidth / 2 - buttonWidth / 2, roomHeight / 2 - buttonHeight / 2, buttonWidth, buttonHeight, toggleFullscreen ));
		this.addObject(new Button("Settings", roomWidth / 2 + buttonMargin + buttonWidth / 2, roomHeight / 2 - buttonHeight / 2, buttonWidth, buttonHeight, Settings.show));
	}

	draw(){
		super.draw();
		//Überschrift
		ctx.strokeStyle = "#ffffff";
		// ctx.font = Math.round(175 * ((xScalar + yScalar) / 2)) + "px fnt_Comforta_Bold";
		ctx.font = Math.round(175 * ((xScalar + yScalar) / 2)) + "px fnt_Comforta_Light";
		// TODO
		// ctx.font = 175 + "px fnt_Comforta_Bold";
		ctx.textAlign = "center";
		ctx.lineWidth = 8 * ((xScalar + yScalar) / 2);
		let fill = 0.9

		let animationN = 16
		let animationSpeed = 0.3
		let blur = stepCount * animationSpeed % animationN
		blur = Math.abs(blur - animationN/2)
		// Normalize
		blur = blur / (animationN/2)
		// Scale (min + additional)
		blur = 2 + 4*blur

		// ctx.filter = `drop-shadow(0 0 0.75rem black) blur(${blur}px)`;
		ctx.filter = `blur(${blur}px)`;
		// ctx.filter = "drop-shadow(7px 7px black)";

		// Blur
		ctx.strokeStyle = `rgba(210, 230, 255, ${fill})`;
		// ctx.strokeText("Qualli", roomWidth/2 * xScalar, 148 * yScalar);
		ctx.filter = "none";


		// Shadow
		ctx.fillStyle = `rgba(100, 100, 100, ${fill})`;
		ctx.fillText("Qualli", (roomWidth/2 + 4) * xScalar, (148 + 4) * yScalar);

		// Gradient
		// const grad = ctx.createLinearGradient(300, 0, roomWidth-300, roomHeight + blur*100);
		const grad = ctx.createLinearGradient(300*xScalar, 0, (roomWidth-300) * xScalar, (500 + blur*100)*yScalar);
		// grad.addColorStop(0, "#b8f0ec");
		// grad.addColorStop(1, "#139964");

		grad.addColorStop(0, "#b8f0ec");
		grad.addColorStop(1, "#139964");

		// Main text
		// ctx.strokeStyle = `rgba(210, 230, 255, ${fill})`;
		// ctx.strokeStyle = "white";
		ctx.fillStyle = grad;
		ctx.fillText("Qualli", roomWidth/2 * xScalar, 148 * yScalar);
		// ctx.fillText("Qualli", roomWidth/2 * xScalar, 148 * yScalar);

		this.n_step++;


		// TODO remove
		if (Settings.debug) {
			ctx.lineWidth = 5;
			ctx.strokeStyle = 'white';
			ctx.fillStyle = "white";
			for(var i = 0; i < 5; i++){
				ctx.beginPath();
				ctx.arc((roomWidth / 2) * xScalar, (roomHeight - 64) * yScalar, i * ((ctx.lineWidth-1)*2), (this.n_step* (i*0.01+0.1)) + 1.25 * Math.PI, (this.n_step*(i*0.01+0.1)) + 1.75 * Math.PI, false);
				ctx.stroke();
				ctx.beginPath();
				ctx.arc((roomWidth / 2) * xScalar, (roomHeight - 64) * yScalar, ctx.lineWidth+i * ((ctx.lineWidth-1)*2), -(this.n_step* (i*0.01+0.1)) + 1.25 * Math.PI, -(this.n_step*(i*0.01+0.1)) + 1.75 * Math.PI, false);
				ctx.stroke();
			}
		}
	}
}
