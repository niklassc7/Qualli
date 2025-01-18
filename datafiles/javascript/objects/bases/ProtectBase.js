import * as f from "../../functions.js";
import * as g from "../../globals.js";
import Jelly from "../Jelly.js";
import Base from "./Base.js";
import Colors from "../../appEtc/color/Colors.js";

export default class ProtectBase extends Base {
	constructor(x, y, width, height, subjects, team = 0) {
		super(x, y, width, height, g.sprMedalSilver, team);

		this.units = 100;
		this.received = [];

		this.locked = true;

		this.subjects = subjects;
	}

	receiveJellies(n, team, source = undefined) {
		if (!this.locked)
			return;

		if (typeof this.received[team] === "undefined") {
			this.received[team] = n;
		} else {
			this.received[team] += n;
		}
		
		this.units -= n;

		if (this.units <= 0) {
			this.locked = false;
			this.units = Number.MAX_VALUE;

			this.team = team;
			// this.team = 
			// Math.max(
		}
	}

	step() {
		super.step();

		this.protectStep();
	}

	draw() {
		g.ctx.fillStyle = Colors.team[this.team].cRgba();
		f.draw_circle(this.xD, this.yD, this.widthD, false);

		super.draw();

		g.ctx.fillStyle = "black";
		let fsize = 24;
		g.ctx.font = Math.round(fsize * g.xScalar) + "px fnt_Comforta_Bold";
		g.ctx.fillText(this.received, this.xD, this.yD);
	}

	protectStep() {
		if (this.locked || Math.random() < 0.95)
			return;

		for (let i = 0; i < this.subjects.length; i++) {
			let subj = this.subjects[i];


			if (this.team !== subj.team) {
				let n = Math.round(Math.random() * 10);
				for (let j = 0; j < n; j++)
					g.room.addObject(new Jelly(this.x, this.y, this.team, subj));
			}
		}

	}
}
