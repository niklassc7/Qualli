import step from "./step.js";
import * as g from "./globals.js";
import * as f from "./functions.js";

export default function main(){
	// TODO implement or remove
	// msgs = new LinkedList();
	g.msgs.addFirst("Test");
	g.msgs.addFirst("Test2");

	// canvas = document.getElementById("myCanvas");
	// ctx = canvas.getContext("2d");

	g.canvas.width = g.canvas_width;
	g.canvas.height = g.canvas_height;

	// xScalar = canvas.width / roomWidth;
	// yScalar = canvas.height / roomHeight;

	// fullscreen = false;

	g.spr_Raumschiff[1] = document.getElementById("qualleRed");
	g.spr_Raumschiff[2] = document.getElementById("qualleBlue");
	g.spr_Raumschiff[3] = document.getElementById("qualleGreen");
	g.spr_Raumschiff[4] = document.getElementById("qualleYellow");

	// TODO check
	f.toggleFullscreen();

	setInterval(step, 1000/60); // 60 FPS
}
