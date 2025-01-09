import Startpage from "./Startpage.js";
import Settings from "../engine/Settings.js";
import * as g from "../globals.js";

// Abstract Class

export default class Room {
	static background = "datafiles/backgrounds/background2-g1.png";

	constructor(prevRoom) {
		// TODO check
		this.roomEntered = Date.now()

		if (this.constructor == Room) {
			throw new Error("Abstract classes can't be instantiated.");
		}

		// TODO fix
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
			g.ctx.font = Math.round(16 * ((g.xScalar + g.yScalar) / 2)) + "px fnt_Comforta_Bold";
			g.ctx.textAlign = "left";
			g.ctx.fillStyle = "white";
			g.ctx.fillText("window.innner " + window.innerWidth + ", " + window.innerHeight, 16 * g.xScalar, (16 + 32*0) * g.yScalar)
			g.ctx.fillText("g.canvas. " + g.canvas.width + ", " + g.canvas.height, 16 * g.xScalar, (16 + 32*1) * g.yScalar)
			g.ctx.fillText("g.canvas_ " + g.canvas_width + ", " + g.canvas_height, 16 * g.xScalar, (16 + 32*2) * g.yScalar)
			g.ctx.fillText(`window.devicePixelRatio: ${window.devicePixelRatio}`, 16 * g.xScalar, (16 + 32*3) * g.yScalar)
			g.ctx.fillText(`scaling: ${Settings.scaling}`, 16 * g.xScalar, (16 + 32*4) * g.yScalar)
			g.ctx.fillText(`scaled window-inner: ${window.innerWidth * window.devicePixelRatio}, ${window.innerHeight * window.devicePixelRatio}`, 16 * g.xScalar, (16 + 32*5) * g.yScalar)
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
		for (var i = 0; i < g.room.objects.length; i++) {
			if(g.room.objects[i] === obj) {
				g.room.objects.splice(i, 1);
				return true;
			}
		}

		console.error("Attempted to deleted object that is not in g.room.objects");
		return false;
	}
}
