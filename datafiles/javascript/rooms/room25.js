class room25 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;
		this.addObject(new KI2(2));

		let planetDistance = 200; // centre to cenre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (roomWidth - rowWidth) / 2;

		let amount = 10
		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < itemsInRow; j++) {
				if (j > 2) {
					continue;
				}

				let newTeam = 2
				let newB = this.addObject(new Bubble(startMargin + j * planetDistance, 160 + i * planetDistance, newTeam, 1, amount));
				this.bubbles.push(newB)
			}
		}

		let newUnits = 9.5 * amount;
		let newB = this.addObject(new Bubble(startMargin + 4 * planetDistance, 160 + 1 * planetDistance, 1, 7, newUnits));
		this.bubbles.push(newB);
	}
}
