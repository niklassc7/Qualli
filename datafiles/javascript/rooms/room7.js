import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import KI0 from "../appEtc/KI0.js";

export default class room7 extends LevelRoom {
	constructor() {
		super();

		this.addObject(new KI0(2));
		this.addObject(new KI0(3));
		this.addObject(new KI0(4));


		let hMargin = 200;
		let vMargin = 150;

		this.addBubble(new Bubble(hMargin, vMargin, 2, 1, 30));
		this.addBubble(new Bubble(hMargin, roomHeight - vMargin, 1, 1, 20));
		this.addBubble(new Bubble(roomWidth - hMargin, roomHeight - vMargin, 3, 1, 30));
		this.addBubble(new Bubble(roomWidth - hMargin, vMargin, 4, 1, 30));
		this.addBubble(new Bubble(roomWidth / 2, roomHeight / 2, 0, 3, 20));
	}
}
