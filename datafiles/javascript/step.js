function step(){
	if (Settings.paused) {
		return;
	}

	// step of all `Object`
	for(var i = 0; i < room.objects.length; i++){
		room.objects[i].step();
	}

	room.step();
	// input.step()
	draw();

	stepCount++
}
