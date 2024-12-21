class room9 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;
		this.addToObjList(new KI0(2));
		this.addToObjList(new KI0(3));

		this.planetlist[0] = this.addToObjList(new Bubble(128, 640, 2, 3, 75));
		this.planetlist[1] = this.addToObjList(new Bubble(1000, 288, 0, 1));
		this.planetlist[2] = this.addToObjList(new Bubble(736, 224, 1, 1));
		this.planetlist[3] = this.addToObjList(new Bubble(1100, 544, 0, 2));
		this.planetlist[4] = this.addToObjList(new Bubble(760, 650, 1, 1));
		this.planetlist[5] = this.addToObjList(new Bubble(384, 300, 0, 1));
		this.planetlist[6] = this.addToObjList(new Bubble(800, 480, 1 , 1));
		this.planetlist[7] = this.addToObjList(new Bubble(100, 128, 3, 3, 75));
		this.planetlist[8] = this.addToObjList(new Bubble(1120, 200, 1, 1));
	}

}
