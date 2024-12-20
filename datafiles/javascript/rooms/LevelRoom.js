// Abstract Class LevelRoom
// All levels should extend from this

class LevelRoom extends Room {
	constructor(prevRoom){
		super(prevRoom);

		console.log(prevRoom, this.prevRoom)

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

	surrender() {
		if (!confirm("Do you really want to give up?")) {
			return
		}

		room_goto(this.prevRoom)
		Settings.unpause()
	}

	alarmieren(nr) {
		switch(nr) {
			case 0:
				if(checkIfLost(1)) {
					showEndgame(false)
					storeLevelPlayed(room.constructor.name, false);
					// room_goto(room.prevRoom);
				}
				this.alarm[0] = 300;

				break;

			default:
				console.log("Error: alarm has no function.");
				break;
		}
	}
}
