class room10 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;
		this.addToObjList(new KI0(2));
		this.addToObjList(new KI0(3));
		this.addToObjList(new KI0(4));

		this.planetlist[0] = this.addToObjList(new cls_Planet(128, 640, 1, 1));
		this.planetlist[1] = this.addToObjList(new cls_Planet(1000, 288, 2, 1));
		this.planetlist[2] = this.addToObjList(new cls_Planet(736, 224, 3, 1));
		this.planetlist[3] = this.addToObjList(new cls_Planet(1100, 544, 0, 2, 3));
		this.planetlist[4] = this.addToObjList(new cls_Planet(760, 650, 4, 2, 15));
		this.planetlist[5] = this.addToObjList(new cls_Planet(384, 300, 4, 1, 20));
		this.planetlist[6] = this.addToObjList(new cls_Planet(800, 480, 0 , 1, 7));
		this.planetlist[7] = this.addToObjList(new cls_Planet(100, 128, 4, 1, 20));
		this.planetlist[8] = this.addToObjList(new cls_Planet(1120, 200, 0, 3));
	}

}
