// TODO move to engine

// This is an "interface" for objects that are stored in the objlist in order to
// guarantee that those objects do have these methods. If they are not overriden
// then they just don't do anything

class IObjlistentry {
	step() {}
	draw() {}
	resize() {}
}
