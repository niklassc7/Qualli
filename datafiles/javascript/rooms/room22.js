class room22 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;
		this.addObject(new KI0(2));

		let planetDistance = 200; // centre to cenre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (roomWidth - rowWidth) / 2;

		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < itemsInRow; j++) {
				let newTeam = 0
				if (i == 2)
					newTeam = 1
				else if (i == 1)
					newTeam = 2

				let newSize = (i == 1) ? 2 : 1;
				let newB = this.addObject(new Bubble(startMargin + j * planetDistance, 160 + i * planetDistance, newTeam, newSize, 30));
				this.bubbles[i * itemsInRow + j] = newB;
			}
		}
	}
}
