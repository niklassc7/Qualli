import * as g from "./globals.js";
import Settings from "./engine/Settings.js";

export default function draw() {
	// Background
	// ctx.fillStyle = "#000000";
	// ctx.fillRect(0, 0, canvas_width, canvas_height);
	g.ctx.clearRect(0, 0, g.canvas.width, g.canvas.height);
	// if(room.background != undefined){
	// 	ctx.drawImage(room.background, 0, 0, canvas.width, canvas.height);
	// }

	g.room.draw();

	// draw of all objects
	for(var i = 0; i < g.room.objects.length; i++){
		if(g.room.objects[i] !== undefined){
			g.room.objects[i].draw();
		}
	}

	// GUI
	g.input.draw()

	if (Settings.debug && !msgs.isEmpty()) {
		ctx.fillStyle = "white";
		ctx.textAlign = "right";
		ctx.font = Math.round(16 * ((xScalar + yScalar) / 2)) + "px fnt_Comforta_Bold";

		// if (stepCount % 200 == 0) {
		// 	msgs.removeFirst()
		// }

		// FIXME
		// for (let i = msgs.length-1; i >= 0; i--) {
		for (let i = msgs.head; i != undefined; i = i.next) {
			msg = i.val;
			// console.log(msg)
			let textDim = ctx.measureText(msg);
			// let tx = Math.round((roomWidth - textDim.width) * xScalar);
			let tx = Math.round(roomWidth * xScalar)
			let ty = Math.round((18*i + 8) * yScalar);
			// console.log(textDim)
			ctx.fillText(msg,
				tx,
				ty);
		}
		// console.log("----")
		ctx.textAlign = "center";

		// let w = Math.round(roomWidth*xScalar);
		// ctx.fillRect(w-10, 0, w, roomHeight)
	}
}


function drawInfoWindow(text, buttons, buttonFunctions) {

	ctx.lineWidth = 8;

	let infoWindowWidth = canvas_width * 0.8;
	let infoWindowHeight = canvas_height * 0.8;

	let l = canvas_width / 2 - infoWindowWidth / 2;
	let t = canvas_height / 2 - infoWindowHeight / 2;



	ctx.fillStyle = "black";
	ctx.strokeStyle = "white";
	ctx.rect(l, t, infoWindowWidth, infoWindowHeight);
	ctx.fill();
	ctx.rect(l, t, infoWindowWidth, infoWindowHeight);
	ctx.stroke();

	text = insertLineBreaks(text, canvas_width);

	ctx.font = "20px fnt_Comforta_Bold";
	ctx.fillStyle = "white";
	ctx.fillText(text, canvas_width / 2, canvas_height / 2, canvas_width);


	// requestAnimationFrame(draw);
}
