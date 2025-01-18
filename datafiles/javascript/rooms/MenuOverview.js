import Room from "./Room.js";
import SimBubbleEmitter from "../objects/SimBubble/SimBubbleEmitter.js";
import Button from "../objects/Button.js";
import * as g from "../globals.js";
import RoomMenuMain from "./RoomMenuMain.js";
import RoomMenuAdvanced from "./RoomMenuAdvanced.js";
import RoomMenuExperimental from "./RoomMenuExperimental.js";
import RoomMenuArchive from "./RoomMenuArchive.js";
import Settings from "../engine/Settings.js";
import Startpage from "./Startpage.js";

// TODO make this a general OptionsRoom and subclass it

export default class MenuOverview extends Room{
	constructor() {
		super();

		this.addObject(new SimBubbleEmitter());

		this.addObject(new Button("←", 42, g.roomHeight - 128, 90, 90, () => { g.gotoRoom(Startpage); } )).setFontSize(24) ;


		let buttonWidth = 300;
		let buttonHeight = 150;
		let buttonMargin = 16;

		let options = [
			[RoomMenuMain, "Main"],
			[RoomMenuAdvanced, "Advanced"],
		]

		if (Settings.experimental) {
			options.push([RoomMenuExperimental, "Experimental"])
			options.push([RoomMenuArchive, "Archive"])
		}

		let itemsInRow = Math.min(2, options.length);
		let itemsinColumn = Math.ceil(options.length / itemsInRow)


		// Calculate start margin in order to center the items block
		let rowWidth = ((itemsInRow-1) * buttonMargin + itemsInRow * buttonWidth);
		let marginLeft = (g.roomWidth - rowWidth) / 2;

		let columnHeight = ((itemsinColumn-1) * buttonMargin + itemsinColumn * buttonHeight);
		let marginTop = (g.roomHeight - columnHeight) / 2;

		for(let i = 0; i < itemsinColumn; i++)
			for(let j = 0; j < itemsInRow && i*itemsInRow + j < options.length; j++) {
				this.addObject(new Button(
					options[i*itemsInRow + j][1],
					marginLeft + j * (buttonWidth + buttonMargin),
					marginTop + i * (buttonHeight + buttonMargin),
					buttonWidth,
					buttonHeight,
					() => { g.gotoRoom(options[i*itemsInRow + j][0]) },
					false
				)).setFontSize(36);
			}

	}

	draw() {
		super.draw()

		g.ctx.lineWidth = 4 * ((g.xScalar + g.yScalar) / 2);
		g.ctx.font = Math.round(125 * ((g.xScalar + g.yScalar) / 2)) + "px fnt_Comforta_Light";
		g.ctx.textAlign = "center";
		let tx = g.roomWidth/2 * g.xScalar;
		let ty = 100 * g.yScalar;
		g.ctx.strokeStyle = "#333"
		g.ctx.strokeText("Overview", tx + 2*g.xScalar, ty + 2*g.yScalar);
		g.ctx.strokeStyle = "white"
		g.ctx.strokeText("Overview", tx, ty);

	}
}
