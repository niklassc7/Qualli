class room34 extends LevelRoom {
	constructor() {
		super();

		let ki0 = this.addObject(new KI1(2));
		let ki1 = this.addObject(new KI1(3));


		let modFleeTemp = new ModFleeTemp();
		ki0.modules.push(modFleeTemp);

		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (roomWidth - rowWidth) / 2;

		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < itemsInRow; j++) {
				let newTeam = (j < itemsInRow / 3) ? 1 : (j < 2 * (itemsInRow / 3) ? 2 : 3);
				let newSize = (i == 1) ? 2 : 1;
				let newUnits = (newTeam == 1) ? 40 : 70;
				let newB = this.addObject(new BubbleTemp(startMargin + j * planetDistance, 160 + i * planetDistance, newTeam, newSize, newUnits));
				this.bubbles[i * itemsInRow + j] = newB;
			}
		}
	}
}
