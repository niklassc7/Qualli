class room2 extends LevelRoom {
	constructor(){
		super();

		this.addObject(new KI0(2));
		this.addObject(new KI0(3));
		this.addObject(new KI0(4));

		this.addBubble(new Bubble(128, 640, 1, 2, 100));
		this.addBubble(new Bubble(1184, 288));
		this.addBubble(new Bubble(736, 224));
		this.addBubble(new Bubble(1024, 544, 4, 1, 150));
		this.addBubble(new Bubble(160, 480));
		this.addBubble(new Bubble(384, 128));
		this.addBubble(new Bubble(544, 480));
		this.addBubble(new Bubble(64, 160, 3, 2, 100));
		this.addBubble(new Bubble(1120, 128, 2, 2, 100));
	}
}
