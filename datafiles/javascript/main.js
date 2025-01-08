import step from "./step.js";
import * as g from "./globals.js";
import * as f from "./functions.js";

export default function main(){
	// TODO implement or remove
	g.msgs.addFirst("Test");
	g.msgs.addFirst("Test2");

	g.canvas.width = g.canvas_width;
	g.canvas.height = g.canvas_height;

	g.spr_Raumschiff[1] = document.getElementById("qualleRed");
	g.spr_Raumschiff[2] = document.getElementById("qualleBlue");
	g.spr_Raumschiff[3] = document.getElementById("qualleGreen");
	g.spr_Raumschiff[4] = document.getElementById("qualleYellow");

	// TODO check
	f.toggleFullscreen();

	setInterval(step, 1000/60); // 60 FPS
}
