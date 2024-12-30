class room6 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;

		this.addObject(new KI0(2));
		this.addObject(new KI0(3));
		this.addObject(new KI0(4));


		let hMargin = 200;
		let vMargin = 150;

		let newB = this.addObject(new Bubble(hMargin, vMargin, 2, 3, 30));
		this.bubbles[0] = newB;

		newB = this.addObject(new Bubble(hMargin, roomHeight - vMargin, 1, 3, 30));
		this.bubbles[1] = newB;

		newB = this.addObject(new Bubble(roomWidth - hMargin, roomHeight - vMargin, 3, 3, 30));
		this.bubbles[2] = newB;

		newB = this.addObject(new Bubble(roomWidth - hMargin, vMargin, 4, 3, 30));
		this.bubbles[3] = newB;

		newB = this.addObject(new Bubble(roomWidth / 2, roomHeight / 2, 0, 1, 20));
		this.bubbles[4] = newB;
	}
}
