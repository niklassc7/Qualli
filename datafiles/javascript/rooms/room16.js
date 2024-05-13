class room16 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;
		this.objlist = [];
		this.planetlist = [];
		this.KIlist = [];
		this.addToObjList(new KI2(2));
		this.addToObjList(new KI0(3));

		this.planetlist[0] = this.addToObjList(new cls_Planet(128, 640, 1, 1, 40));
		this.planetlist[1] = this.addToObjList(new cls_Planet(1000, 288, 3, 1));
		this.planetlist[2] = this.addToObjList(new cls_Planet(736, 224, 3, 1));
		this.planetlist[3] = this.addToObjList(new cls_Planet(1100, 544, 3, 1));
		this.planetlist[4] = this.addToObjList(new cls_Planet(760, 650, 3, 1));
		this.planetlist[5] = this.addToObjList(new cls_Planet(384, 300, 2, 1));
		this.planetlist[6] = this.addToObjList(new cls_Planet(800, 480, 2 , 1));
		this.planetlist[7] = this.addToObjList(new cls_Planet(100, 128, 2, 1));
		this.planetlist[8] = this.addToObjList(new cls_Planet(1120, 200, 2, 1));
	}

}
