// TODO move to engine

// All objects that can be stored in room.objects have to extend from this so
// that they are guaranteed to have the methods.

export default class IObjlistentry {
	constructor(g) {
		this.g = g;
	}
	step() {}
	draw() {}
	resize() {}
	destroy() {
		this.g.room.removeObject(this);
	}
}
