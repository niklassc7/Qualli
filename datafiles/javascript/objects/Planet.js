class cls_Planet extends Objekt{
	constructor(x, y, team, groesse, einheiten) {
		super(x, y);

		this.groesse = (groesse === undefined) ? Math.floor(Math.random() * 3) + 1 : groesse; // TODO width and height in constructor
		// this.einheiten = (einheiten === undefined) ? Math.round(Math.random() * 50) : 25;
		this.einheiten = (einheiten === undefined) ? 25 : einheiten;
		this.team = (team === undefined) ? 0 : team;

		this.sprite = spr_Planet;

		this.createQueue = new LinkedList();
	}

	step() {
		super.step();
		if(this.team !== 0)
			this.einheiten += this.groesse / 60;

		if(!this.createQueue.isEmpty()) {
			// room.addToObjList(this.createStack.pop());
			let parameter = this.createQueue.removeFirst();
			new Raumschiff(parameter[0], parameter[1], parameter[2], parameter[3]);
		}

		this.width = 80 * (1 + (this.groesse / 3));
		this.height = 80 * (1 + (this.groesse / 3));
		this.ox = this.width / 2;
		this.oy = this.height / 2;
	}

	draw() {
		// Teamfarbe
		if(this.team !== 0) {
			ctx.fillStyle = teamcolour[this.team];
			ctx.strokeStyle = ctx.fillStyle;
			ctx.lineWidth = Math.round(8 * xScalar);
			draw_circle(this.xD, this.yD, this.widthD / 2, true);
		}

		super.draw();

		ctx.fillStyle = "#eceff1";
		ctx.font = Math.round(36 * xScalar) + "px fnt_Comforta_Bold";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.fillText(Math.floor(this.einheiten), this.xD, this.yD);

	}
}
