// TODO make static?
// TODO move to engine


class cls_input {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.xD = this.x * xScalar; // x it should be drawn at
		this.yD = this.y * yScalar; // y it should be drawn at

		this.selected = undefined;
		this.selectedTouch = undefined; // TODO merge again?

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

	// Resets input state
	reset() {
		this.x = 0;
		this.y = 0;
		this.xD = this.x * xScalar;
		this.yD = this.y * yScalar;

		this.selected = undefined;
		this.selectedTouch = undefined;
	}

	updateCooordinates(event) {
		let rect = canvas.getBoundingClientRect()

		input.setX(xScreenToInternal(event.clientX - rect.left))
		input.setY(yScreenToInternal(event.clientY - rect.top))
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
		event.preventDefault(); // Prevent mouse events to fire as well
		input.updateCooordinates(event.touches[0]);

		// Planet selection
		if (typeof input.selectedTouch === "undefined") {
			let overBubble = collision_point(input.x, input.y, Bubble)
			if (typeof overBubble !== "undefined") {
				// Start drag method
				input.selectedTouch = overBubble
			}
		}
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	touchmove(event) {
		event.preventDefault(); // Prevent mouse events to fire as well
		input.updateCooordinates(event.touches[0])
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	touchend(event) {
		event.preventDefault(); // Prevent mouse events to fire as well
		// TODO observer pattern
		// Button clicking
		let overButton = collision_point(input.x, input.y, Button)
		if (typeof overButton !== "undefined") {
			overButton.onClick()
		}


		let overBubble = collision_point(input.x, input.y, Bubble)
		if (typeof overBubble !== "undefined") {
			if (typeof input.selectedTouch !== "undefined") {
				if (overBubble === input.selectedTouch) {
					input.selectedTouch = overBubble
				} else {
					input.selectedTouch.attack(overBubble)
					// room.addObject(new RadarEffect(input.x, input.y, 30, Colors.team[1].cRgb()));
					input.selectedTouch = undefined
				}

			}
		} else {
			input.selectedTouch = undefined
		}
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	mousedown(event) {
		input.updateCooordinates(event)

		// Planet selection
		if (typeof input.selected === "undefined") {
			let overBubble = collision_point(input.x, input.y, Bubble)
			if (typeof overBubble !== "undefined") {
				// Start drag method
				input.selected = overBubble
			}
		}
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	mousemove(event) {
		input.updateCooordinates(event)
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	mouseup(event) {
		input.updateCooordinates(event)

		// Button clicking
		let overButton = collision_point(input.x, input.y, Button)
		if (typeof overButton !== "undefined") {
			overButton.onClick()
		}

		let overBubble = collision_point(input.x, input.y, Bubble)
		if (typeof overBubble !== "undefined") {
			if (typeof input.selected !== "undefined") {
				if (overBubble === input.selected) {
					input.selected = overBubble
				} else {
					input.selected.attack(overBubble)
					// room.addObject(new RadarEffect(input.xD, input.yD, 30, Colors.team[1].cRgb()));
					input.selected = undefined
				}

			}
		} else {
			input.selected = undefined
		}
	}

	// 
	selectedDrawing(selectedBubble) {
		if(selectedBubble !== undefined) {
			// Cancel if selected bubble has been captured in the meantime
			if(selectedBubble.team !== 1) {
				selectedBubble = undefined; return;
			}
			// Pfeil malen
			ctx.strokeStyle = "white";
			ctx.lineWidth = 2;
			draw_line(selectedBubble.xD, selectedBubble.yD, this.xD, this.yD);

			// Highlight selected Planet
			ctx.lineWidth = 2;
			for(let i = 0; i < 5 + Math.abs(this.circleCounter - this.circleCounterMax/2); i+=3) {
				draw_circle(selectedBubble.xD,
							selectedBubble.yD,
							selectedBubble.widthD / 2 + i,
							true);
			}

			this.circleCounter = (this.circleCounter + 1) % this.circleCounterMax;
		}

	}

	draw() {
		this.selectedDrawing(this.selected)
		this.selectedDrawing(this.selectedTouch)

		// // TODO remove
		// ctx.fillStyle = "white"
		// draw_circle(this.xD, this.yD, 16, false)

	}
}
