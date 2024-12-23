// TODO move to engine

// All objects that can be stored in room.objects have to extend from this so
// that they are guaranteed to have the methods.

class IObjlistentry {
	step() {}
	draw() {}
	resize() {}
}
