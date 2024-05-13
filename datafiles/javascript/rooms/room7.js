class room7 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;
		this.objlist = [];
		this.planetlist = [];
		this.KIlist = [];

		this.addToObjList(new KI0(2));
		this.addToObjList(new KI0(3));
		this.addToObjList(new KI0(4));


		let hMargin = 200;
		let vMargin = 150;

		let newP = this.addToObjList(new cls_Planet(hMargin, vMargin, 2));
		newP.groesse = 1;
		newP.einheiten = 30;
		this.planetlist[0] = newP;

		newP = this.addToObjList(new cls_Planet(hMargin, roomHeight - vMargin, 1));
		newP.groesse = 1;
		newP.einheiten = 20;
		this.planetlist[1] = newP;

		newP = this.addToObjList(new cls_Planet(roomWidth - hMargin, roomHeight - vMargin, 3));
		newP.groesse = 1;
		newP.einheiten = 30;
		this.planetlist[2] = newP;

		newP = this.addToObjList(new cls_Planet(roomWidth - hMargin, vMargin, 4));
		newP.groesse = 1;
		newP.einheiten = 30;
		this.planetlist[3] = newP;

		newP = this.addToObjList(new cls_Planet(roomWidth / 2, roomHeight / 2, 0));
		newP.groesse = 3;
		newP.einheiten = 20;
		this.planetlist[4] = newP;

	}
}
