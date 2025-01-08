import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import KI0 from "../appEtc/KI0.js";
import KI1 from "../appEtc/KI1.js";

export default class room14 extends LevelRoom {
	constructor() {
		super();

		this.addObject(new KI1(2));
		this.addObject(new KI0(3));

		this.addBubble(new Bubble(128, 640, 1, 1, 60));
		this.addBubble(new Bubble(1000, 288, 3, 3, 30));
		this.addBubble(new Bubble(736, 224, 3, 2, 30));
		this.addBubble(new Bubble(1100, 544, 2, 1, 10));
		this.addBubble(new Bubble(760, 650, 2, 1, 10));
		this.addBubble(new Bubble(384, 300, 2, 1, 10));
		this.addBubble(new Bubble(800, 480, 2 , 1, 10));
		this.addBubble(new Bubble(100, 128, 2, 1, 10));
		this.addBubble(new Bubble(1120, 200, 2, 1, 10));
	}
}
