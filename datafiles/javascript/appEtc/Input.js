import * as g from "../globals.js";
import * as f from "../functions.js";
import Button from "../objects/Button.js";
// import Bubble from "../objects/Bubble.js";
import Base from "../objects/bases/Base.js";

// TODO make static?
// TODO move to engine


export default class Input {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.xD = this.x * g.xScalar; // x it should be drawn at
		this.yD = this.y * g.yScalar; // y it should be drawn at

		this.selected = undefined;
		this.selectedTouch = undefined; // TODO merge again?

		// For circle animation
		this.circleCounterMax = 20;
		this.circleCounter = 0;

		g.canvas.addEventListener('mousedown', this.mousedown, false);
		g.canvas.addEventListener('mousemove', this.mousemove, false);
		g.canvas.addEventListener('mouseup', this.mouseup, false);

		g.canvas.addEventListener('touchstart', this.touchstart, false);
		g.canvas.addEventListener('touchmove', this.touchmove, false);
		g.canvas.addEventListener('touchend', this.touchend, false);


		// TODO change Object when renamed
		/**
		  * List of clickable objects
		  * @type {Array.<Object>}
		*/
		let clickable = [];
	}

	/**
	 * Register obj as clickable
	 *
	 * @param {Object} obj - Object that should be registered
	 */
	registerClickable(obj) {
		clickable.push(obj);
	}

	// Resets input state
	reset() {
		this.x = 0;
		this.y = 0;
		this.xD = this.x * g.xScalar;
		this.yD = this.y * g.yScalar;

		this.selected = undefined;
		this.selectedTouch = undefined;
	}

	// Checks if selected bubbles are still owned, otherwise clears
	ensureOwner() {
		if (this.selected !== undefined && this.selected.team !== 1) {
			this.selected = undefined;
		}

		if (this.selectedTouch !== undefined && this.selectedTouch.team !== 1) {
			this.selectedTouch = undefined;
		}
	}

	updateCooordinates(event) {
		let rect = g.canvas.getBoundingClientRect();

		g.input.setX(f.xScreenToInternal(event.clientX - rect.left));
		g.input.setY(f.yScreenToInternal(event.clientY - rect.top));
	}

	setX(x) {
		this.x = x;
		this.xD = x * g.xScalar; // x it should be drawn at
	}

	setY(y) {
		this.y = y;
		this.yD = y * g.yScalar; // y it should be drawn at
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	touchstart(event) {
		event.preventDefault(); // Prevent mouse events to fire as well
		g.input.ensureOwner();
		g.input.updateCooordinates(event.touches[0]);

		// Planet selection
		if (typeof g.input.selectedTouch === "undefined") {
			let overBubble = f.collision_point(g.input.x, g.input.y, Base);
			if (typeof overBubble !== "undefined") {
				// Start drag method
				g.input.selectedTouch = overBubble;
			}
		}
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	touchmove(event) {
		event.preventDefault(); // Prevent mouse events to fire as well
		// g.input.ensureOwner(); // TODO check if necessary on move → is executed a lot
		g.input.updateCooordinates(event.touches[0]);
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	touchend(event) {
		event.preventDefault(); // Prevent mouse events to fire as well
		g.input.ensureOwner();
		// TODO observer pattern
		// Button clicking
		let overButton = f.collision_point(g.input.x, g.input.y, Button)
		if (typeof overButton !== "undefined") {
			overButton.onClick()
		}


		let overBubble = f.collision_point(g.input.x, g.input.y, Base)
		if (typeof overBubble !== "undefined") {
			if (typeof g.input.selectedTouch !== "undefined") {
				if (overBubble === g.input.selectedTouch) {
					g.input.selectedTouch = overBubble;
				} else {
					g.input.selectedTouch.attack(overBubble);
					// room.addObject(new RadarEffect(g.input.x, g.input.y, 30, Colors.team[1].cRgb()));
					g.input.selectedTouch = undefined;
				}

			}
		} else {
			g.input.selectedTouch = undefined;
		}
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	mousedown(event) {
		g.input.updateCooordinates(event);
		g.input.ensureOwner();

		// Base selection
		if (typeof g.input.selected === "undefined") {
			let overBubble = f.collision_point(g.input.x, g.input.y, Base);
			if (typeof overBubble !== "undefined") {
				// Start drag method
				g.input.selected = overBubble;
			}
		}
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	mousemove(event) {
		g.input.updateCooordinates(event)
		// g.input.ensureOwner(); // TODO check if necessary on move → is executed a lot
	}

	// ⚠ `this` does not refer to this class in this event handler, use global `input`
	mouseup(event) {
		g.input.updateCooordinates(event)
		g.input.ensureOwner();

		// Button clicking
		let overButton = f.collision_point(g.input.x, g.input.y, Button)
		if (typeof overButton !== "undefined") {
			overButton.onClick()
		}

		let overBubble = f.collision_point(g.input.x, g.input.y, Base)
		if (typeof overBubble !== "undefined") {
			if (typeof g.input.selected !== "undefined") {
				if (overBubble === g.input.selected) {
					g.input.selected = overBubble;
				} else {
					g.input.selected.attack(overBubble);
					// room.addObject(new RadarEffect(g.input.xD, g.input.yD, 30, Colors.team[1].cRgb()));
					g.input.selected = undefined;
				}

			}
		} else {
			g.input.selected = undefined;
		}
	}

	// Draw circle indicator arround selectedBubble and arrow
	selectedDrawing(selectedBubble) {
		if(selectedBubble !== undefined) {
			// Cancel if selected bubble has been captured in the meantime
			if(selectedBubble.team !== 1) {
				selectedBubble = undefined; return;
			}

			// Draw arrow from selected to cursor
			let r = selectedBubble.width / 2;
			if (!f.pointInCircle(this.x, this.y, selectedBubble.x, selectedBubble.y, r)) {
				let dx = this.x - selectedBubble.x;
				let dy = this.y - selectedBubble.y;
				let dist = Math.sqrt(dx**2 + dy**2);
				let ndx = dx / dist;
				let ndy = dy / dist;
				let startx = selectedBubble.x + ndx*r;
				let starty = selectedBubble.y + ndy*r;
				startx *= g.xScalar;
				starty *= g.yScalar;
				g.ctx.strokeStyle = "white";
				g.ctx.lineWidth = 3 * g.xScalar;
				f.draw_line(startx, starty, this.xD, this.yD);
			}

			// Highlight selected bubble
			g.ctx.lineWidth = 2 * g.xScalar;
			g.ctx.strokeStyle = "white";
			for(let i = 0; i < 5 + Math.abs(this.circleCounter - this.circleCounterMax/2); i+=3) {
				f.draw_circle(selectedBubble.xD,
							selectedBubble.yD,
							selectedBubble.widthD / 2 + (i*g.xScalar),
							true);
			}

			this.circleCounter = (this.circleCounter + 1) % this.circleCounterMax;
		}

	}

	draw() {
		this.selectedDrawing(this.selected);
		this.selectedDrawing(this.selectedTouch);
	}
}
