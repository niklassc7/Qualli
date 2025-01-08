import Room from "./Room.js";
import * as g from "../globals.js";
import * as f from "../functions.js";
import Button from "../objects/Button.js";
import Settings from "../engine/Settings.js";


// TODO Import these in the individual level rooms only when needed

// Abstract Class LevelRoom
// All levels should extend from this

export default class LevelRoom extends Room {
	static background = "datafiles/sprites/bg8FullHd.png";

	constructor(prevRoom){
		super(prevRoom);

		console.log(prevRoom, this.prevRoom)

		if (this.constructor == LevelRoom) {
			throw new Error("Abstract classes can't be instantiated.");
		}

		this.bubbles = [];
		this.ais = [];

		this.status = "running"; // running, lost, won
		this.alarm = [];
		this.alarm[0] = 10;

		// Pause button
		let pauseButton = this.addObject(new Button(
			"⏸",
			g.roomWidth - 60,
			10,
			50,
			50,
			Settings.pause,
			false
		));
		pauseButton.setFontSize(16);
	}

	step() {
		// alarm system
		for(let i = 0; i < this.alarm.length; i++) {
			if(this.alarm[i] === undefined)
				continue;

			if(this.alarm[i] > 0)
				this.alarm[i]--;
			else
				this.alarmieren(i);
		}

		super.step();
	}

	draw(){
		//do nothing
	}

	// Adds bubble to room
	addBubble(bubble) {
		this.bubbles.push(bubble);
		this.addObject(bubble);

		return bubble;
	}

	removeBubble(bubble) {
		// TODO datastructure
		for (var i = 0; i < room.bubbles.length; i++) {
			if(room.bubbles[i] === bubble) {
				room.bubbles.splice(i, 1);
				return true;
			}
		}

		console.error("Attempted to deleted bubble that is not in room.bubbles", bubble);
		return false;
	}

	surrender() {
		if (!confirm("Do you really want to give up?")) {
			return
		}

		g.gotoRoom(this.prevRoom)
		Settings.unpause()
	}

	restart(prompt=false) {
		if (prompt && !confirm("Do you really want to give up?")) {
				return
		}

		g.gotoRoom(this.constructor)
	}

	// TODO rename → timer
	alarmieren(nr) {
		switch(nr) {
			case 0:
				if(this.status == "running" && f.checkIfLost(1)) {
					this.status = "lost";
					f.showEndgame(false)
					ProgressManager.updateLevelStats(g.room.constructor.name, false);
				}
				this.alarm[0] = 300;

				break;

			default:
				console.log("Error: alarm has no function.");
				break;
		}
	}
}
