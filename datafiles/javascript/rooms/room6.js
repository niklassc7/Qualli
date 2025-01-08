import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import KI0 from "../appEtc/KI0.js";
import * as g from "../globals.js";

export default class room6 extends LevelRoom {
	constructor() {
		super();

		this.addObject(new KI0(2));
		this.addObject(new KI0(3));
		this.addObject(new KI0(4));


		let hMargin = 200;
		let vMargin = 150;

		this.addBubble(new Bubble(hMargin, vMargin, 2, 3, 30));

		this.addBubble(new Bubble(hMargin, g.roomHeight - vMargin, 1, 3, 30));

		this.addBubble(new Bubble(g.roomWidth - hMargin, g.roomHeight - vMargin, 3, 3, 30));

		this.addBubble(new Bubble(g.roomWidth - hMargin, vMargin, 4, 3, 30));

		this.addBubble(new Bubble(g.roomWidth / 2, g.roomHeight / 2, 0, 1, 20));
	}
}
