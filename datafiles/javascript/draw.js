import * as g from "./globals.js";

// TODO implement or remove
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
