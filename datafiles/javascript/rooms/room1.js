class room1 extends LevelRoom {
	constructor(){
		super();

		this.background = spr_bg_0;
		this.addToObjList(new KI0(2));
		this.addToObjList(new KI0(3));


		// this.planetlist[0] = this.addToObjList(new cls_Sterne(0, 0));

		this.planetlist[0] = this.addToObjList(new Bubble(128, 640, 1));
		this.planetlist[0].groesse = 2;
		this.planetlist[0].einheiten = 100;
		this.planetlist[1] = this.addToObjList(new Bubble(1184, 288));
		this.planetlist[2] = this.addToObjList(new Bubble(736, 224));
		this.planetlist[3] = this.addToObjList(new Bubble(1024, 544));
		this.planetlist[4] = this.addToObjList(new Bubble(160, 480));
		this.planetlist[5] = this.addToObjList(new Bubble(384, 128));
		this.planetlist[6] = this.addToObjList(new Bubble(544, 480));
		this.planetlist[7] = this.addToObjList(new Bubble(64, 160, 3));
		this.planetlist[7].groesse = 2;
		this.planetlist[7].einheiten = 100;
		this.planetlist[8] = this.addToObjList(new Bubble(1120, 128, 2));
		this.planetlist[8].groesse = 2;
		this.planetlist[8].einheiten = 100;

	}
}
