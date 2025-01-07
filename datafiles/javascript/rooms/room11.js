class room11 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;
		this.addObject(new KI0(2));
		this.addObject(new KI0(3));
		this.addObject(new KI0(4));

		this.addBubble(new Bubble(128, 640, 1, 1, 20));
		this.addBubble(new Bubble(1000, 288, 0, 1));
		this.addBubble(new Bubble(736, 224, 0, 1));
		this.addBubble(new Bubble(1100, 544, 4, 2));
		this.addBubble(new Bubble(760, 650, 4, 1));
		this.addBubble(new Bubble(384, 300, 3, 1));
		this.addBubble(new Bubble(800, 480, 3 , 1));
		this.addBubble(new Bubble(100, 128, 2, 1, 30));
		this.addBubble(new Bubble(1120, 200, 2, 3));
	}
}
