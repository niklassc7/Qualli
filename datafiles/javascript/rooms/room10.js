class room10 extends LevelRoom {
	constructor() {
		super();

		this.addObject(new KI0(2));
		this.addObject(new KI0(3));
		this.addObject(new KI0(4));

		this.addBubble(new Bubble(128, 640, 1, 1));
		this.addBubble(new Bubble(1000, 288, 2, 1));
		this.addBubble(new Bubble(736, 224, 3, 1));
		this.addBubble(new Bubble(1100, 544, 0, 2, 3));
		this.addBubble(new Bubble(760, 650, 4, 2, 15));
		this.addBubble(new Bubble(384, 300, 4, 1, 20));
		this.addBubble(new Bubble(800, 480, 0 , 1, 7));
		this.addBubble(new Bubble(100, 128, 4, 1, 20));
		this.addBubble(new Bubble(1120, 200, 0, 3));
	}
}
