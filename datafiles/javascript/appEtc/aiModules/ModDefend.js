import * as g from "../../globals.js";
import * as f from "../../functions.js";
import AiModule from "./AiModule.js";

export default class ModDefend extends AiModule {
	constructor() {
		super();
	}

	modStep(ai) {
		let bubbles = ai.getBubbles();

		// Check all own bubbles if they need to be defended
		for (let i = 0; i < bubbles.length; i++) {
			let bubble = bubbles[i];

			// Send support from random other own bubble
			if (bubble.getArrivingEnemy() >= bubble.units + bubble.arriving[bubble.team]) {
				let randBubble = f.chooseRandom(bubbles);

				if (randBubble === bubble)
					continue;

				ai.angriff(randBubble, bubble);
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
