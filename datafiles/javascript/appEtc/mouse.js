class cls_mouse{
	constructor() {
		this.x = 0;
		this.y = 0;
		this.xD = this.x * xScalar; // x it should be drawn at
		this.yD = this.y * yScalar; // y it should be drawn at

		this.left_pressed = false;
		this.middle_pressed = false;
		this.right_pressed = false;

		this.selected = undefined;

		// For circle animation
		this.circleCounterMax = 20;
		this.circleCounter = 0;
	}

	draw() {
		if(this.selected !== undefined) {
			// Abbrechen wenn Planet in der Zwischenzeit eingenommen wurde
			if(this.selected.team !== 1) {
				this.selected = undefined; return;
			}
			// Pfeil malen
			ctx.strokeStyle = "white";
			ctx.lineWidth = 2;
			draw_line(this.selected.xD, this.selected.yD, this.xD, this.yD);

			// Highlight selected Planet
			ctx.lineWidth = 2;
			for(let i = 0; i < 5 + Math.abs(this.circleCounter - this.circleCounterMax/2); i+=3) {
				draw_circle(this.selected.xD,
							this.selected.yD,
							this.selected.widthD / 2 + i,
							true);
			}

			this.circleCounter = (this.circleCounter + 1) % this.circleCounterMax;
		}
	}

}
