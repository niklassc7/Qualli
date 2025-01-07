class room37 extends LevelRoom {
	constructor() {
		super();

		this.addObject(new KI0(2));
		let ki1 = this.addObject(new KI0(3));
		this.addObject(new KI0(4));

		let mod1 = new ModDefend();
		ki1.modules.push(mod1);

		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (roomWidth - rowWidth) / 2;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < itemsInRow; j++) {
				let newB = this.addObject(new Bubble(startMargin + j * planetDistance, 160 + i * planetDistance, (i*3+j) % 5, 1));
				this.bubbles[i * itemsInRow + j] = newB;
			}
		}
	}
}
