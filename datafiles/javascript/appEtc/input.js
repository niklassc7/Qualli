class cls_input {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.xD = this.x * xScalar; // x it should be drawn at
		this.yD = this.y * yScalar; // y it should be drawn at

		// this.touched = false

		this.selected = undefined;

		// For circle animation
		this.circleCounterMax = 20;
		this.circleCounter = 0;

		canvas.addEventListener('mousedown', this.mousedown, false);
		canvas.addEventListener('mousemove', this.mousemove, false);
		canvas.addEventListener('mouseup', this.mouseup, false);

		canvas.addEventListener('touchstart', this.touchstart, false);
		canvas.addEventListener('touchmove', this.touchmove, false);
		canvas.addEventListener('touchend', this.touchend, false);
	}

	updateCooordinates(event) {
		let rect = canvas.getBoundingClientRect()
		input.setX(xScreenToInternal(event.clientX - rect.left))
		input.setY(yScreenToInternal(event.clientY - rect.top))
		// input.setX(xScreenToInternal(event.clientX) - rect.left)
		// input.setY(yScreenToInternal(event.clientY) - rect.top)
	}

	setX(x) {
		this.x = x
		this.xD = x * xScalar; // x it should be drawn at
	}

	setY(y) {
		this.y = y
		this.yD = y * yScalar; // y it should be drawn at
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	touchstart(event) {
		input.updateCooordinates(event.touches[0])

		// Planet selection
		let overBubble = collision_point(input.x, input.y, cls_Planet)
		if (typeof overBubble !== "undefined") {
			input.selected = overBubble
			console.log("SELECTING", overBubble)
		}
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	touchmove(event) {
		input.updateCooordinates(event.touches[0])
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	touchend(event) {
		let overButton = collision_point(input.x, input.y, Button)
		if (typeof overButton !== "undefined") {
			overButton.onClick()
		}

		// Planet selection
		if (typeof input.selected !== "undefined") {
			let overBubble = collision_point(input.x, input.y, cls_Planet)
			if (typeof overBubble !== "undefined") {
				input.selected.attack(overBubble)
			}
			input.selected = undefined
		}
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	mousedown(event) {
		input.updateCooordinates(event)

		// Planet selection
		let overBubble = collision_point(input.x, input.y, cls_Planet)
		if (typeof overBubble !== "undefined") {
			input.selected = overBubble
			console.log("SELECTING", overBubble)
		}
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	mousemove(event) {
		input.updateCooordinates(event)
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	mouseup(event) {
		input.updateCooordinates(event)

		let overButton = collision_point(input.x, input.y, Button)
		if (typeof overButton !== "undefined") {
			overButton.onClick()
		}

		// Planet selection
		if (typeof input.selected !== "undefined") {
			let overBubble = collision_point(input.x, input.y, cls_Planet)
			if (typeof overBubble !== "undefined") {
				input.selected.attack(overBubble)
			}
			input.selected = undefined
		}
	}

	draw() {
		ctx.strokeStyle = "white";
		ctx.fillStyle = "white";
		draw_circle(this.xD, this.yD, 8, false)

		if(this.selected !== undefined) {
			// console.log("DEBUG", this.selected)
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
