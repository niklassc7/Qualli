import * as f from "../../functions.js";
import * as g from "../../globals.js";
import AiModule from "./AiModule.js";
import KI from "../KI.js";

export default class ModDefend extends AiModule {
	// TODO store ai in this
	constructor() {
		super();
	}


	/**
	 * [TODO:description]
	 *
	 * @param {KI} ai - AI instance that is modulated
	 */
	modStep(ai) {
		let bubbles = ai.getBubbles();

		// Check all own bubbles if they need to be defended
		for (let i = 0; i < bubbles.length; i++) {
			let bubble = bubbles[i];

			// TODO check endless loop → if bubbles contains only bubble

			// Send support from random other own bubble
			if (bubble.getArrivingEnemy() >= bubble.units + bubble.arriving[bubble.team]) {
				let randBubble = f.chooseRandom(bubbles);

				if (randBubble === bubble)
					continue;

				if (!randBubble.createQueue.isEmpty()) {
					continue;
				}

				ai.angriff(randBubble, bubble);
				// break
			}
		}
	}

	drawIcon(x, y, r) {
		let xd = x * g.xScalar;
		let yd = y * g.yScalar;
		let rd = r * g.yScalar;

		f.draw_circle(xd, yd, rd, true);
		g.ctx.fillStyle = "#5fbf20";
		f.draw_circle(xd, yd, rd, false);
	}
}
