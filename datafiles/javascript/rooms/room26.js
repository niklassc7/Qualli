class room26 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;

		this.addObject(new KI2(2));
		this.addObject(new KI2(3));

		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (roomWidth - rowWidth) / 2;

		let amount = 10
		for(let i = 0; i < 3; i++)
			for(let j = 0; j < itemsInRow; j++) {
				if (j > 2) {
					continue;
				}

				let newTeam = j + 1
				let newB = this.addObject(new Bubble(startMargin + j * planetDistance, 160 + i * planetDistance, newTeam, 1, amount));
				this.bubbles.push(newB)
			}
		
		this.bubbles[3].team = 1;
		this.bubbles[3].units = 300;
		
		let newUnits = 9.5 * amount;
		let newB = this.addObject(new Bubble(startMargin + 4 * planetDistance, 160 + 0 * planetDistance, 2, 7, newUnits));
		this.bubbles.push(newB);

		newB = this.addObject(new Bubble(startMargin + 4 * planetDistance, 160 + 2 * planetDistance, 3, 7, newUnits));
		this.bubbles.push(newB);
	}
}
