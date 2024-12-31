// Creates a bubbles
class BubbleSeed extends Object {
	constructor(delay, futureBubble) {
		super(futureBubble.x, futureBubble.y, futureBubble.width, futureBubble.height);

		this.futureBubble = futureBubble;
		this.delay = delay;
		this.timeAlive = 0;

		this.created = stepCount;
	}

	step() {
		super.step();
		this.timeAlive++;

		if (this.timeAlive >= this.delay) {
			room.addObject(this.futureBubble);
			room.bubbles.push(this.futureBubble); // TODO use addBubble method when implemented
			this.destroy();
		}
	}

	draw() {
		super.draw();

		// animation
		// TODO scale to size of seed
		ctx.lineWidth = 5 * xScalar;
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
		// ctx.fillStyle = "white";
		let shiftedStepCount = stepCount + this.created; // Shift counter by creation time because otherwise all seed instances show exactly the same
		for(var i = 0; i < 5; i++){
			ctx.beginPath();
			ctx.arc(this.xD, this.yD, i * ((ctx.lineWidth-1)*2), (shiftedStepCount* (i*0.01+0.1)) + 1.25 * Math.PI, (shiftedStepCount*(i*0.01+0.1)) + 1.75 * Math.PI, false);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(this.xD, this.yD, ctx.lineWidth+i * ((ctx.lineWidth-1)*2), -(shiftedStepCount* (i*0.01+0.1)) + 1.25 * Math.PI, -(shiftedStepCount*(i*0.01+0.1)) + 1.75 * Math.PI, false);
			ctx.stroke();
		}


		// Background
		ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
		draw_circle(this.xD, this.yD, 0.9*this.widthD/2, false);

		// Draw background of progress bar
		let circleRadius = 1.1 * this.widthD / 2;
		ctx.lineWidth = 3 * xScalar;
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
		draw_circle(this.xD, this.yD, circleRadius, true);
		

		// Draw circle-indicator of time left
		ctx.lineWidth = 3 * xScalar;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.arc(this.xD,
			this.yD,
			circleRadius,
			2.0 * Math.PI * (this.timeAlive/this.delay),
			2.0 * Math.PI);

		ctx.stroke();
	}
}
