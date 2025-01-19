import KI from "./KI.js";

// Passive

export default class KI3 extends KI {
	constructor(g, team) {
		super(g, team);

		this.alarm = [];
		this.alarm[0] = 20;
	}

	step() {
		super.step();
	}

	alarmieren(nr) {
		switch(nr) {
			case 0:
				if(this.deleteIfDefeatedAndCheckIfWon())
					return;

				this.alarm[0] = 200 + Math.round(Math.random() * 100);
				break;
			default:
				console.log("Fehler: alarm() von KI: alarm() aufgerufen ohne nr");
		}
	}
}
