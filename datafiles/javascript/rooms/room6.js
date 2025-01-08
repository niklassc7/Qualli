import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import KI0 from "../appEtc/KI0.js";

export default class room6 extends LevelRoom {
	constructor() {
		super();

		this.addObject(new KI0(2));
		this.addObject(new KI0(3));
		this.addObject(new KI0(4));


		let hMargin = 200;
		let vMargin = 150;

		this.addBubble(new Bubble(hMargin, vMargin, 2, 3, 30));

		this.addBubble(new Bubble(hMargin, roomHeight - vMargin, 1, 3, 30));

		this.addBubble(new Bubble(roomWidth - hMargin, roomHeight - vMargin, 3, 3, 30));

		this.addBubble(new Bubble(roomWidth - hMargin, vMargin, 4, 3, 30));

		this.addBubble(new Bubble(roomWidth / 2, roomHeight / 2, 0, 1, 20));
	}
}
