import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import KI0 from "../appEtc/KI0.js";

export default class room8 extends LevelRoom {
	constructor() {
		super();

		this.addObject(new KI0(2));

		this.addBubble(new Bubble(128, 640, 1, 1));
		this.addBubble(new Bubble(1000, 288, 0, 1));
		this.addBubble(new Bubble(736, 224, 0, 1));
		this.addBubble(new Bubble(1100, 544, 0, 2));
		this.addBubble(new Bubble(760, 650, 0, 1));
		this.addBubble(new Bubble(384, 300, 0, 1));
		this.addBubble(new Bubble(800, 480, 0 , 1));
		this.addBubble(new Bubble(100, 128, 1, 1));
		this.addBubble(new Bubble(1120, 200, 2, 2, 100));
	}
}
