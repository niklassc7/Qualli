import * as g from "../../globals.js";
import * as f from "../../functions.js";
import AiModule from "./AiModule.js";
import BubbleTemp from "../../objects/BubbleTemp.js";

// When ttl of bubble is soon over, this module evacuates to a random own
// bubble if available. Otherwise to random other bubble.

export default class ModFleeTemp extends AiModule {
	constructor() {
		super();
	}

	modStep(ai) {
		let bubbles = ai.getBubbles();
		// console.log(bubbles);

		// Check own bubbles if they're being destroyed soon
		for (let i = 0; i < bubbles.length; i++) {
			let bubble = bubbles[i];
			if (bubble instanceof BubbleTemp) {
				// console.log(bubble);
				if (bubble.ttl <= bubble.units * 1.05) {
					// console.log("Flee");
					let n = 1;
					// Flee to random owned bubbles
					for (let i = 0; i < n; i++) {
						let target = ai.getRandomBubbleOtherThan(bubble);
						// Use any random bubble
						if (target === undefined) {
							let ri = Math.floor(Math.random() * g.room.bubbles.length);
							target = g.room.bubbles[ri];
							// console.log("...to random");
						}
						if (target === undefined) {
							// console.log("NOT");
							break;
						}

						ai.angriff(bubble, target);
					}
				}
			}
		}
	}

	drawIcon(x, y, r) {
		let xd = x * g.xScalar;
		let yd = y * g.yScalar;
		let rd = r * g.yScalar;

		f.draw_circle(xd, yd, rd, true);
		g.ctx.fillStyle = "#ffdf20";
		f.draw_circle(xd, yd, rd, false);
	}
}
