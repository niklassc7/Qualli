import Room from "./Room.js";
import * as g from "../globals.js";
import SimBubbleEmitter from "../objects/SimBubble/SimBubbleEmitter.js";
import Button from "../objects/Button.js";
import LevelButton from "../objects/LevelButton.js";
import MenuOverview from "./MenuOverview.js";
import room17 from "./room17.js";
import room18 from "./room18.js";
import room19 from "./room19.js";
import room24 from "./room24.js";
import room25 from "./room25.js";
import room27 from "./room27.js";
import room28 from "./room28.js";
import room29 from "./room29.js";
import room30 from "./room30.js";
import room31 from "./room31.js";
import room32 from "./room32.js";
import room33 from "./room33.js";
import room34 from "./room34.js";
import room35 from "./room35.js";
import room36 from "./room36.js";
import room37 from "./room37.js";

export default class RoomMenuExperimental extends Room {
	constructor() {
		super();

		this.addObject(new SimBubbleEmitter([255, 120, 210]));

		this.n_step = 0; // TODO replace with stepCount

		this.addObject(new Button("←", 42, g.roomHeight - 128, 90, 90, () => { g.gotoRoom(MenuOverview); } )).setFontSize(24) ;

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
		let marginLeft = (g.roomWidth - rowWidth) / 2;

		let columnHeight = ((itemsinColumn-1) * buttonMargin + itemsinColumn * buttonHeight);
		let marginTop = (g.roomHeight - columnHeight) / 2;

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

		g.ctx.lineWidth = 4 * ((g.xScalar + g.yScalar) / 2);
		g.ctx.font = Math.round(42 * ((g.xScalar + g.yScalar) / 2)) + "px fnt_Comforta_Light";
		g.ctx.fillStyle = "white"
		g.ctx.textAlign = "center";
		g.ctx.fillText("Experimental ⚛", g.roomWidth/2 * g.xScalar, 32 * g.yScalar)
	}
}
