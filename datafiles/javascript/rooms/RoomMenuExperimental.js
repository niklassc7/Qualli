class RoomMenuExperimental extends Room{
	constructor(){
		super();

		this.addObject(new SimBubbleEmitter([255, 120, 210]));

		this.n_step = 0; // TODO replace with stepCount

		this.addObject(new Button("←", 42, roomHeight - 128, 90, 90, () => { gotoRoom(MenuOverview); } )).setFontSize(24) ;

		let buttonWidth = 128;
		let buttonHeight = 128;
		let buttonMargin = 16;

		let rooms = [
			room17,
			room18,
			room19,
			room24,
			room25,
			room27,
			room28,
			room29,
			room30,
			room31,
			room32,
			room33,
			room34,
			room35,
			room36,
			room37,
		];

		let itemsInRow = 4;
		let itemsinColumn = Math.ceil(rooms.length / itemsInRow)



		// Calculate start margin in order to center the items block
		let rowWidth = ((itemsInRow-1) * buttonMargin + itemsInRow * buttonWidth);
		let marginLeft = (roomWidth - rowWidth) / 2;

		let columnHeight = ((itemsinColumn-1) * buttonMargin + itemsinColumn * buttonHeight);
		let marginTop = (roomHeight - columnHeight) / 2;

		for(let i = 0; i < itemsinColumn; i++)
			for(let j = 0; j < itemsInRow && i*itemsInRow + j < rooms.length; j++) {
				this.addObject(new LevelButton(
					i*itemsInRow + j,
					marginLeft + j * (buttonWidth + buttonMargin),
					marginTop + i * (buttonHeight + buttonMargin),
					buttonWidth,
					buttonHeight,
					rooms[i*itemsInRow + j]
				)).setFontSize(36);
			}

	}

	draw() {
		super.draw()

		ctx.lineWidth = 4 * ((xScalar + yScalar) / 2);
		ctx.font = Math.round(42 * ((xScalar + yScalar) / 2)) + "px fnt_Comforta_Light";
		ctx.fillStyle = "white"
		ctx.textAlign = "center";
		// ctx.strokeText("Advanced", roomWidth/2 * xScalar, 140 * yScalar)
		ctx.fillText("Experimental ⚛", roomWidth/2 * xScalar, 32 * yScalar)
	}
}
