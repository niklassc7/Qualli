import * as g from "../globals.js";
import Room from "./Room.js";
import Button from "../objects/Button.js";
import * as f from "../functions.js";
import Settings from "../engine/Settings.js";
import SimBubbleEmitter from "../objects/SimBubble/SimBubbleEmitter.js";
import MenuOverview from "../rooms/MenuOverview.js";
import Sunshine from "../objects/Sunshine.js";


export default class Startpage extends Room {
	constructor(){
		super();


		this.addObject(new SimBubbleEmitter());

		this.n_step = 0; // TODO is this needed → use stepCount

		var buttonWidth = 256;
		var buttonHeight = 192;
		var buttonMargin = 128;

		this.addObject(new Button("Start", g.roomWidth / 2 - buttonMargin - (3/2) * buttonWidth, g.roomHeight / 2 - buttonHeight / 2, buttonWidth, buttonHeight, () => { g.gotoRoom(MenuOverview) }  )).borderColour = "yellow";
		this.addObject(new Button("Vollbild", g.roomWidth / 2 - buttonWidth / 2, g.roomHeight / 2 - buttonHeight / 2, buttonWidth, buttonHeight, f.toggleFullscreen ));
		this.addObject(new Button("Settings", g.roomWidth / 2 + buttonMargin + buttonWidth / 2, g.roomHeight / 2 - buttonHeight / 2, buttonWidth, buttonHeight, Settings.show));

		this.addObject(new Sunshine(g.roomWidth / 2, -400));
	}

	draw(){
		super.draw();
		//Überschrift
		g.ctx.strokeStyle = "#ffffff";
		g.ctx.font = Math.round(175 * ((g.xScalar + g.yScalar) / 2)) + "px fnt_Comforta_Light";
		// TODO
		// ctx.font = 175 + "px fnt_Comforta_Bold";
		g.ctx.textAlign = "center";
		g.ctx.lineWidth = 8 * ((g.xScalar + g.yScalar) / 2);
		let fill = 0.9

		let animationN = 16
		let animationSpeed = 0.3
		let blur = g.stepCount * animationSpeed % animationN
		blur = Math.abs(blur - animationN/2)
		// Normalize
		blur = blur / (animationN/2)
		// Scale (min + additional)
		blur = 2 + 4*blur

		// ctx.filter = `drop-shadow(0 0 0.75rem black) blur(${blur}px)`;
		g.ctx.filter = `blur(${blur}px)`;
		// ctx.filter = "drop-shadow(7px 7px black)";

		// Blur
		g.ctx.strokeStyle = `rgba(210, 230, 255, ${fill})`;
		g.ctx.filter = "none";


		// Shadow
		g.ctx.fillStyle = `rgba(100, 100, 100, ${fill})`;
		g.ctx.fillText("Qualli", (g.roomWidth/2 + 4) * g.xScalar, (148 + 4) * g.yScalar);

		// Gradient
		const grad = g.ctx.createLinearGradient(300*g.xScalar, 0, (g.roomWidth-300) * g.xScalar, (500 + blur*100)*g.yScalar);
		// grad.addColorStop(0, "#b8f0ec");
		// grad.addColorStop(1, "#139964");

		// grad.addColorStop(0, "#b8f0ec");
		// grad.addColorStop(1, "#139964");

		grad.addColorStop(0, "#7CE0F3");
		grad.addColorStop(1, "#125B9D");

		// Main text
		// ctx.strokeStyle = `rgba(210, 230, 255, ${fill})`;
		// ctx.strokeStyle = "white";
		g.ctx.fillStyle = grad;
		g.ctx.fillText("Qualli", g.roomWidth/2 * g.xScalar, 148 * g.yScalar);

		this.n_step++;


		// TODO remove
		if (Settings.debug) {
			g.ctx.lineWidth = 5;
			g.ctx.strokeStyle = 'white';
			g.ctx.fillStyle = "white";
			for(var i = 0; i < 5; i++){
				g.ctx.beginPath();
				g.ctx.arc((g.roomWidth / 2) * g.xScalar, (g.roomHeight - 64) * g.yScalar, i * ((g.ctx.lineWidth-1)*2), (this.n_step* (i*0.01+0.1)) + 1.25 * Math.PI, (this.n_step*(i*0.01+0.1)) + 1.75 * Math.PI, false);
				g.ctx.stroke();
				g.ctx.beginPath();
				g.ctx.arc((g.roomWidth / 2) * g.xScalar, (g.roomHeight - 64) * g.yScalar, g.ctx.lineWidth+i * ((g.ctx.lineWidth-1)*2), -(this.n_step* (i*0.01+0.1)) + 1.25 * Math.PI, -(this.n_step*(i*0.01+0.1)) + 1.75 * Math.PI, false);
				g.ctx.stroke();
			}
		}
	}
}
