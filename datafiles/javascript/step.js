import draw from "./draw.js";
import * as g from "./globals.js";
import Settings from "./engine/Settings.js";

export default function step(){
	if (Settings.paused) {
		return;
	}

	// step of all objects
	for(var i = 0; i < g.room.objects.length; i++){
		g.room.objects[i].step();
	}

	g.room.step();
	// input.step()
	draw();

	g.incrStepCount();
}
