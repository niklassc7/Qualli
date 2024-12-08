// Abstract Class LevelRoom
// All levels should extend from this

class LevelRoom extends Room {
	constructor(){
		super();

		if (this.constructor == LevelRoom) {
			throw new Error("Abstract classes can't be instantiated.");
		}

		this.planetlist = [];
		this.KIlist = [];

		this.background = undefined;
		this.alarm = [];
		this.alarm[0] = 10;

		// Pause button
		let pauseButton = this.addToObjList(new Button(
			"⏸",
			roomWidth - 50,
			10,
			40,
			40,
			() => { alert("Paused") },
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

	alarmieren(nr) {
		switch(nr) {
			case 0:
				if(checkIfLost(1)) {
					showMessage("Verloren!");
					storeLevelPlayed(room.constructor.name, false);
					room_goto(rom_menu);
				}
				this.alarm[0] = 300;

				break;

			default:
				console.log("Error: alarm has no function.");
				break;
		}
	}
}
