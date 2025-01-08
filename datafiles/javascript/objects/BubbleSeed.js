import Object from "../engine/objects/Object.js";
import * as f from "../functions.js";
import * as g from "../globals.js";

// Creates a bubbles
export default class BubbleSeed extends Object {
	constructor(delay, futureBubble) {
		super(futureBubble.x, futureBubble.y, futureBubble.width, futureBubble.height);

		this.futureBubble = futureBubble;
		this.delay = delay;
		this.timeAlive = 0;

		this.created = g.stepCount;
	}

	step() {
		super.step();
		this.timeAlive++;

		if (this.timeAlive >= this.delay) {
			g.room.addObject(this.futureBubble);
			g.room.bubbles.push(this.futureBubble); // TODO use addBubble method when implemented
			this.destroy();
		}
	}

	draw() {
		super.draw();

		// animation
		// TODO scale to size of seed
		// let scale = this.futureBubble.size;
		g.ctx.lineWidth = 5 * g.xScalar;
		let lineCount = 5;



		g.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
		let shiftedStepCount = g.stepCount + this.created; // Shift counter by creation time because otherwise all seed instances show exactly the same
		for(var i = 0; i < lineCount; i++){
			g.ctx.beginPath();
			g.ctx.arc(this.xD, this.yD, i * ((g.ctx.lineWidth-1)*2), (shiftedStepCount* (i*0.01+0.1)) + 1.25 * Math.PI, (shiftedStepCount*(i*0.01+0.1)) + 1.75 * Math.PI, false);
			g.ctx.stroke();
			g.ctx.beginPath();
			g.ctx.arc(this.xD, this.yD, g.ctx.lineWidth + i * ((g.ctx.lineWidth-1)*2), -(shiftedStepCount* (i*0.01+0.1)) + 1.25 * Math.PI, -(shiftedStepCount*(i*0.01+0.1)) + 1.75 * Math.PI, false);
			g.ctx.stroke();
		}


		// Background
		g.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
		f.draw_circle(this.xD, this.yD, 0.9*this.widthD/2, false);

		// Draw background of progress bar
		let circleRadius = 1.1 * this.widthD / 2;
		g.ctx.lineWidth = 3 * g.xScalar;
		g.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
		f.draw_circle(this.xD, this.yD, circleRadius, true);
		

		// Draw progress bar of time left
		g.ctx.lineWidth = 3 * g.xScalar;
		g.ctx.strokeStyle = 'white';
		g.ctx.beginPath();
		g.ctx.arc(this.xD,
			this.yD,
			circleRadius,
			2.0 * Math.PI * (this.timeAlive/this.delay),
			2.0 * Math.PI);

		g.ctx.stroke();
	}
}
