import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
// import * as g from "../globals.js";
import ModDefend from "../appEtc/aiModules/ModDefend.js";
import KI0 from "../appEtc/KI0.js";
import KI3 from "../appEtc/KI3.js";
import UnlockBase from "../objects/bases/UnlockBase.js";
import ProtectBase from "../objects/bases/ProtectBase.js";

export default class room41 extends LevelRoom {
	constructor() {
		super();


		// this.addObject(new KI2(2));
		let ai0 = this.addObject(new KI3(2));
		let mod0 = new ModDefend();
		ai0.modules.push(mod0);

		this.addObject(new KI0(3));

		// this.addObject(new KI0(1));


		let s0 = this.addBubble(new Bubble(150, 150, 1, 1, 150));

		let s1 = this.addBubble(new Bubble(500, 650, 2, 1, 10));
		this.addBubble(new Bubble(1000, 500, 2, 10, 3000));

		this.addBubble(new Bubble(500, 300, 3, 1, 220));


		this.addBubble(new UnlockBase(1000, 150, 100));
		this.addBubble(new UnlockBase(100, 600, 100));

		this.addBubble(new ProtectBase(200, 450, 32, 32, [s0, s1]));
	}
}
