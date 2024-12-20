function step(){
	if (Settings.paused) {
		return;
	}

	// step of all `Object`
	for(var i = 0; i < room.objlist.length; i++){
		room.objlist[i].step();
	}

	room.step();
	// input.step()
	draw();

	stepCount++
}
