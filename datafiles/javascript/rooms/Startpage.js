class Startpage extends Room {
	constructor(){
		super();
		this.background = spr_bgMenu;
		document.body.style.backgroundImage = spr_bgMenu


		this.n_step = 0;
		/*
		* Erstelle Objekte und trage diese in das Array objlist,
		* durch die Funktion count_Objekt, ein
		*/
		//  var button_main_skalierung = 1;
		var buttonWidth = 256;
		var buttonHeight = 192;
		var buttonMargin = 128;

		this.addToObjList(new Button("Start", roomWidth / 2 - buttonMargin - (3/2) * buttonWidth, roomHeight / 2 - buttonHeight / 2, buttonWidth, buttonHeight, () => { room_goto(RoomMenu0) }  )).borderColour = "yellow";
		this.addToObjList(new Button("Vollbild", roomWidth / 2 - buttonWidth / 2, roomHeight / 2 - buttonHeight / 2, buttonWidth, buttonHeight, toggleFullscreen ));
		this.addToObjList(new Button("Settings", roomWidth / 2 + buttonMargin + buttonWidth / 2, roomHeight / 2 - buttonHeight / 2, buttonWidth, buttonHeight, showSettings));

	}

	draw(){
		super.draw();
		//Überschrift
		ctx.strokeStyle = "#ffffff";
		ctx.font = Math.round(175 * ((xScalar + yScalar) / 2)) + "px fnt_Comforta_Bold";
		// TODO
		// ctx.font = 175 + "px fnt_Comforta_Bold";
		ctx.textAlign = "center";
		ctx.lineWidth = 8 * ((xScalar + yScalar) / 2);
		let fill = 0.9
		ctx.strokeStyle = `rgba(210, 230, 255, ${fill})`;
		ctx.strokeText("Qualli", roomWidth/2 * xScalar, 148 * yScalar);
		// ctx.fillText("Qualli", roomWidth/2 * xScalar, 148 * yScalar);

		this.n_step++;


		// TODO remove
		if (debug) {
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
