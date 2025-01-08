export default class ModDefend extends AiModule {
	constructor() {
		super();
	}

	modStep(ai) {
		let bubbles = ai.getBubbles();

		for (let i = 0; i < bubbles.length; i++) {
			let bubble = bubbles[i];

			if (bubble.getArrivingEnemy() >= bubble.units + bubble.arriving[bubble.team]) {
				let randBubble = chooseRandom(bubbles);

				if (randBubble === bubble[i])
					continue;

				console.log("Defending");

				ai.angriff(randBubble, bubble);
			}
		}
	}

	drawIcon(x, y, r) {
		let xd = x * xScalar;
		let yd = y * yScalar;
		let rd = r * yScalar;

		draw_circle(xd, yd, rd, true);
		ctx.fillStyle = "#5fbf20";
		draw_circle(xd, yd, rd, false);
	}
}
