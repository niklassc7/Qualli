class room9 extends LevelRoom {
	constructor() {
		super();

		this.addObject(new KI0(2));
		this.addObject(new KI0(3));

		this.addBubble(new Bubble(128, 640, 2, 3, 75));
		this.addBubble(new Bubble(1000, 288, 0, 1));
		this.addBubble(new Bubble(736, 224, 1, 1));
		this.addBubble(new Bubble(1100, 544, 0, 2));
		this.addBubble(new Bubble(760, 650, 1, 1));
		this.addBubble(new Bubble(384, 300, 0, 1));
		this.addBubble(new Bubble(800, 480, 1 , 1));
		this.addBubble(new Bubble(100, 128, 3, 3, 75));
		this.addBubble(new Bubble(1120, 200, 1, 1));
	}
}
