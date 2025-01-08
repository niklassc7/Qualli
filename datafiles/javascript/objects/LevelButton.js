import Button from "./Button.js";
import * as g from "../globals.js";
import ProgressManager from "../appEtc/ProgressManager.js";

export default class LevelButton extends Button {
	constructor(text, x, y, width, height, level) {
		let onClick = () => g.gotoRoom(level);
		super(text, x, y, width, height, onClick, false);

		this.level = level;


		this.won = ProgressManager.getLevelStats(level.name).won;

		if (this.won > 3) {
			this.medal = g.sprMedalGold;
		} else if (this.won > 1) {
			this.medal = g.sprMedalSilver;
		} else if (this.won > 0) {
			this.medal = g.sprMedalBronze;
		} else {
			this.medal = undefined;
		}

		// TODO lock
		// TODO calculate font size
	}

	draw() {
		super.draw();

		let mWidth = 21; // Medal width → keep aspect ratio of sprite
		let mHeight = 32; // Medal height → keep aspect ratio of sprite
		let mMargin = 6;
		if (this.medal != undefined) {
			g.ctx.drawImage(this.medal,
				(this.x + this.width - mWidth - mMargin) * g.xScalar,
				(this.y + mMargin) * g.yScalar,
				mWidth * g.xScalar,
				mHeight * g.yScalar);
		}
	}
}
