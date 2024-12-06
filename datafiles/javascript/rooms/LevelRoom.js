class LevelRoom extends Room {
	constructor(){
		super();
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
			function() { alert("Paused") },
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
		// TODO replace with new input method
		// if(mouse.left_pressed) {
		// 	var visiert = collision_point(mouse.x, mouse.y, cls_Planet);
		// 	if(mouse.selected === undefined || visiert === undefined) {
		// 		if(visiert !== undefined && visiert.team !== 1)
		// 			return;
		// 		mouse.selected = visiert;
		// 	}else if(mouse.selected.team === 1) { // Bedingung neu
		// 		// Raumschiffe erstellen, Einheiten abziehen, selected = undefined
		// 		for(var i = 0; i < Math.floor(mouse.selected.einheiten / 2); i++) {
		// 			let nx = mouse.selected.x
		// 			let ny = mouse.selected.y;
		// 			// let neu = new Raumschiff(nx, ny, 1, visiert);

		// 			mouse.selected.createQueue.addLast([nx, ny, 1, visiert]);
		// 			// mouse.selected.createStack.push(neu);

		// 			// room.addToObjList(neu);


		// 		}
		// 		mouse.selected.einheiten -= Math.floor(mouse.selected.einheiten / 2);

		// 		mouse.selected = undefined;
		// 	}
		// }
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
