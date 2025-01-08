import LevelRoom from "./LevelRoom.js";
import KI0 from "../appEtc/KI0.js";
import Bubble from "../objects/Bubble.js";


export default class room0 extends LevelRoom {
	constructor(){
		super();

		this.addObject(new KI0(2));

		this.addBubble(new Bubble(128, 640, 1, 3, 100));
		this.addBubble(new Bubble(1184, 288));
		this.addBubble(new Bubble(736, 224));
		this.addBubble(new Bubble(1024, 544));
		this.addBubble(new Bubble(160, 480));
		this.addBubble(new Bubble(384, 128));
		this.addBubble(new Bubble(544, 480));
		this.addBubble(new Bubble(64, 160));
		this.addBubble(new Bubble(1120, 128, 2, 2, 100));
	}
}
