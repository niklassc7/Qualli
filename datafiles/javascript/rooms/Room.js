class Room {
	constructor() {
		this.background = undefined;
		this.objlist = [];
	}

	step() {
		//do nothing
		// console.log(this.objlist.length);
	}
	draw() {
		ctx.font = Math.round(16 * ((xScalar + yScalar) / 2)) + "px fnt_Comforta_Bold";
		ctx.textAlign = "left";
		ctx.fillStyle = "white";
		ctx.fillText("window.innner " + window.innerWidth + ", " + window.innerHeight, 16, 16);
		ctx.fillText("canvas. " + canvas.width + ", " + canvas.height, 16, 48);
		ctx.fillText("canvas_ " + canvas_width + ", " + canvas_height, 16, 80);
		// ctx.fillText("view " + view.getWidht() + ", " + view.getHeight(), 16, 112);
	}
	addToObjList(obj) {
		var stelle = this.objlist.length;
		this.objlist[stelle] = obj;

		return obj;
	}
}
