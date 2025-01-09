import * as g from "./globals.js";
import Settings from "./engine/Settings.js";

export default function draw() {
	// Background
	// ctx.fillStyle = "#000000";
	// ctx.fillRect(0, 0, canvas_width, canvas_height);
	g.ctx.clearRect(0, 0, g.canvas.width, g.canvas.height);

	g.room.draw();

	// draw of all objects
	for(var i = 0; i < g.room.objects.length; i++){
		if(g.room.objects[i] !== undefined){
			g.room.objects[i].draw();
		}
	}

	// GUI
	g.input.draw()

	// TODO implement or remove
	if (Settings.debug && !g.msgs.isEmpty()) {
		g.ctx.fillStyle = "white";
		g.ctx.textAlign = "right";
		g.ctx.font = Math.round(16 * ((g.xScalar + g.yScalar) / 2)) + "px fnt_Comforta_Bold";

		// FIXME
		for (let i = g.msgs.head; i != undefined; i = i.next) {
			let msg = i.val;
			// console.log(msg)
			let textDim = g.ctx.measureText(msg);
			let tx = Math.round(g.roomWidth * g.xScalar)
			let ty = Math.round((18*i + 8) * g.yScalar);
			// console.log(textDim)
			g.ctx.fillText(msg,
				tx,
				ty);
		}
		g.ctx.textAlign = "center";
	}
}


function drawInfoWindow(text, buttons, buttonFunctions) {

	g.ctx.lineWidth = 8;

	let infoWindowWidth = canvas_width * 0.8;
	let infoWindowHeight = canvas_height * 0.8;

	let l = canvas_width / 2 - infoWindowWidth / 2;
	let t = canvas_height / 2 - infoWindowHeight / 2;



	g.ctx.fillStyle = "black";
	g.ctx.strokeStyle = "white";
	g.ctx.rect(l, t, infoWindowWidth, infoWindowHeight);
	g.ctx.fill();
	g.ctx.rect(l, t, infoWindowWidth, infoWindowHeight);
	g.ctx.stroke();

	text = insertLineBreaks(text, canvas_width);

	g.ctx.font = "20px fnt_Comforta_Bold";
	g.ctx.fillStyle = "white";
	g.ctx.fillText(text, canvas_width / 2, canvas_height / 2, canvas_width);
}
