// Abstract Class

class Room {
	constructor(prevRoom) {
		this.roomEntered = Date.now()

		if (this.constructor == LevelRoom) {
			throw new Error("Abstract classes can't be instantiated.");
		}

		if (prevRoom instanceof Room) {
			this.prevRoom = prevRoom
		} else {
			this.prevRoom = Startpage
		}

		this.background = undefined;
		this.objlist = [];
	}

	step() {
		//do nothing
		// console.log(this.objlist.length);
	}
	draw() {
		if (debug) {
			ctx.font = Math.round(16 * ((xScalar + yScalar) / 2)) + "px fnt_Comforta_Bold";
			ctx.textAlign = "left";
			ctx.fillStyle = "white";
			ctx.fillText("window.innner " + window.innerWidth + ", " + window.innerHeight, 16 * xScalar, (16 + 32*0) * yScalar)
			ctx.fillText("canvas. " + canvas.width + ", " + canvas.height, 16 * xScalar, (16 + 32*1) * yScalar)
			ctx.fillText("canvas_ " + canvas_width + ", " + canvas_height, 16 * xScalar, (16 + 32*2) * yScalar)
			ctx.fillText(`window.devicePixelRatio: ${window.devicePixelRatio}`, 16 * xScalar, (16 + 32*3) * yScalar)
			ctx.fillText(`optScaling: ${optScaling}`, 16 * xScalar, (16 + 32*4) * yScalar)
			ctx.fillText(`scaled window-inner: ${window.innerWidth * window.devicePixelRatio}, ${window.innerHeight * window.devicePixelRatio}`, 16 * xScalar, (16 + 32*5) * yScalar)

			// ctx.fillText("view " + view.getWidht() + ", " + view.getHeight(), 16, 112);
		}
	}
	addToObjList(obj) {
		var stelle = this.objlist.length;
		this.objlist[stelle] = obj;

		return obj;
	}
}
