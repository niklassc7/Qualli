import * as g from "../globals.js";

// TODO move to engine

// All objects that can be stored in room.objects have to extend from this so
// that they are guaranteed to have the methods.

export default class IObjlistentry {
	step() {}
	draw() {}
	resize() {}
	destroy() {
		g.room.removeObject(this);
	}
}
