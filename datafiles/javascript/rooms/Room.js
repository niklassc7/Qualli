// Abstract Class

class Room {
	static background = "assets-wip/background2-g1.png";

	constructor(prevRoom) {
		// TODO check
		this.roomEntered = Date.now()

		if (this.constructor == LevelRoom) {
			throw new Error("Abstract classes can't be instantiated.");
		}

		if (prevRoom instanceof Room) {
			this.prevRoom = prevRoom
		} else {
			this.prevRoom = Startpage
		}

		this.objects = [];
	}

	step() {
		//do nothing
	}

	draw() {
		if (Settings.debug) {
			ctx.font = Math.round(16 * ((xScalar + yScalar) / 2)) + "px fnt_Comforta_Bold";
			ctx.textAlign = "left";
			ctx.fillStyle = "white";
			ctx.fillText("window.innner " + window.innerWidth + ", " + window.innerHeight, 16 * xScalar, (16 + 32*0) * yScalar)
			ctx.fillText("canvas. " + canvas.width + ", " + canvas.height, 16 * xScalar, (16 + 32*1) * yScalar)
			ctx.fillText("canvas_ " + canvas_width + ", " + canvas_height, 16 * xScalar, (16 + 32*2) * yScalar)
			ctx.fillText(`window.devicePixelRatio: ${window.devicePixelRatio}`, 16 * xScalar, (16 + 32*3) * yScalar)
			ctx.fillText(`scaling: ${Settings.scaling}`, 16 * xScalar, (16 + 32*4) * yScalar)
			ctx.fillText(`scaled window-inner: ${window.innerWidth * window.devicePixelRatio}, ${window.innerHeight * window.devicePixelRatio}`, 16 * xScalar, (16 + 32*5) * yScalar)

			// ctx.fillText("view " + view.getWidht() + ", " + view.getHeight(), 16, 112);
		}
	}

	addObject(obj) {
		var pos = this.objects.length;
		this.objects[pos] = obj;

		return obj;
	}

	// Simply removes the object `obj` from room.objects and thus from the
	// game loop.
	removeObject(obj) {
		for (var i = 0; i < room.objects.length; i++) {
			if(room.objects[i] === obj) {
				room.objects.splice(i, 1);
				return true;
			}
		}

		console.error("Attempted to deleted object that is not in room.objects");
		return false;
	}
}
