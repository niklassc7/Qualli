class room0 extends LevelRoom {
	constructor(){
		super();

		this.background = spr_bg_0;
		this.addObject(new KI0(2));

		this.planetlist[0] = this.addObject(new Bubble(128, 640, 1));
		this.planetlist[0].groesse = 3;
		this.planetlist[0].einheiten = 100;
		this.planetlist[1] = this.addObject(new Bubble(1184, 288));
		this.planetlist[2] = this.addObject(new Bubble(736, 224));
		this.planetlist[3] = this.addObject(new Bubble(1024, 544));
		this.planetlist[4] = this.addObject(new Bubble(160, 480));
		this.planetlist[5] = this.addObject(new Bubble(384, 128));
		this.planetlist[6] = this.addObject(new Bubble(544, 480));
		this.planetlist[7] = this.addObject(new Bubble(64, 160));
		this.planetlist[8] = this.addObject(new Bubble(1120, 128, 2));
		this.planetlist[8].groesse = 2;
		this.planetlist[8].einheiten = 100;
	}

}
