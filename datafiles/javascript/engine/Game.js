import Input from "./Input.js";
import Startpage from "../rooms/Startpage.js";
import Storage from "./Storage.js";
import Settings from "./Settings.js";
import * as f from "../functions.js";
import * as globals from "../globals.js";
import SimBubble from "../objects/SimBubble/SimBubble.js";
import ProgressManager from "../appEtc/ProgressManager.js";


export default class Game {
	constructor() {
		// this.viewWidth;
		// this.viewHeight;
		// this.paddingVert;
		// this.paddingHorz;

		// TODO remove
		globals.msgs.addFirst("Test");
		globals.msgs.addFirst("Test2");
		globals.spr_Raumschiff[1] = document.getElementById("qualleRed");
		globals.spr_Raumschiff[2] = document.getElementById("qualleBlue");
		globals.spr_Raumschiff[3] = document.getElementById("qualleGreen");
		globals.spr_Raumschiff[4] = document.getElementById("qualleYellow");


		// TODO move to room?
		this.roomWidth = 1280;
		this.roomHeight = 720;

		this.paddingVert = 0;
		this.paddingHorz = 0;

		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.resizeCanvas();

		this.stepCount = 0;

		this.input = new Input(this);

		this.storage = new Storage("localStorage");
		this.progressManager = new ProgressManager(this.storage);
		this.room = new Startpage(this);

		setInterval(() => this.step(), 1000/60); // 60 FPS
	}

	resizeCanvas() {
		// W/H the canvas will be displayed as
		this.canvas.style.width = window.innerWidth;
		this.canvas.style.height = window.innerHeight;

		this.canvas.width = window.innerWidth //* window.devicePixelRatio;
		this.canvas.height = window.innerHeight //* window.devicePixelRatio;


		// Calculate room view
		// → TODO use view dimensions instead of room
		// let canvasRatio = canvas.style.width / canvas.style.height;
		let windowRatio = window.innerWidth / window.innerHeight;
		let roomRatio = this.roomWidth / this.roomHeight;

		this.paddingVert = 0; // on each side
		this.paddingHorz = 0; // on each side
		if (windowRatio > roomRatio) {
			console.log("Window ratio wider than room ratio");
			console.log(windowRatio, roomRatio);

			this.viewHeight = this.roomHeight;
			this.viewWidth = this.roomHeight * (window.innerWidth / window.innerHeight);
			this.paddingHorz = (this.viewWidth - this.roomWidth) / 2;
		} else {
			console.log("Window ratio taller than room ratio");
			console.log(windowRatio, roomRatio);

			this.viewWidth = this.roomWidth;
			this.viewHeight = this.roomWidth * (window.innerHeight / window.innerWidth);
			this.paddingVert = (this.viewHeight - this.roomHeight) / 2;
		}


		console.log("canvas.w .h", this.canvas.width, this.canvas.height);
		console.log("canvas.style.w .h", this.canvas.style.width, this.canvas.style.height);
		console.log("Padding", this.paddingHorz, this.paddingVert);
		console.log("view", this.viewWidth, this.viewHeight);
		console.log("devicePixelRatio", window.devicePixelRatio);
		console.log("window.inner..", window.innerWidth, window.innerHeight);

		let xScalar = window.innerWidth / this.viewWidth;
		let yScalar = window.innerHeight / this.viewHeight;

		// xScalar *= window.devicePixelRatio;
		// yScalar *= window.devicePixelRatio;

		console.log("scalars", xScalar, yScalar);

		this.ctx.scale(xScalar, yScalar);
		this.ctx.translate(this.paddingHorz, this.paddingVert);
	}

	step() {
		if (Settings.paused) {
			return;
		}

		// step of all objects
		for(var i = 0; i < this.room.objects.length; i++){
			this.room.objects[i].step();
		}

		this.room.step(this);
		this.stepCount++;
		// input.step()

		this.draw();
	}

	draw() {
		// Background
		// ctx.fillStyle = "#000000";
		// ctx.fillRect(0, 0, canvas_width, canvas_height);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.clearRect(-this.paddingHorz, -this.paddingVert, this.roomWidth + 2*this.paddingHorz, this.roomHeight + 2*this.paddingVert);

		// this.ctx.fillStyle = "green";
		// // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		// this.ctx.fillRect(0, 0, this.roomWidth, this.roomHeight);
		// this.ctx.strokeStyle = "red";
		// this.ctx.lineWidth = 2;
		// this.ctx.strokeRect(-this.paddingHorz, -this.paddingVert, this.roomWidth + 2*this.paddingHorz, this.roomHeight + 2*this.paddingVert);
		// console.log("padding", this.paddingHorz, this.paddingVert);

		this.room.draw(this);

		// draw of all objects
		for(var i = 0; i < this.room.objects.length; i++){
			if(this.room.objects[i] !== undefined){
				this.room.objects[i].draw(this);
			}
		}

		// GUI
		this.input.draw(this);
	}

	// TODO move to static method in Object?
		// TODO cls has to be of type Object as it needs to have x,y,ox,oy,width,height
	// Checks if the point (x,y) collides with an object of class cls
	// @param {number} - X-coordinate
	// @param {number} - Y-coordinate
	// @param {Object} - Class
	// @return {(Object|undefined)} of type cls or undefined
	collision_point(x, y, cls) { // return obj oder undefined
		/* Prüft, ob Punkt mit einem Objekt der Klasse cls kollidiert.
			* Nur unpräzise Prüfung (point_in_rectangle).
			*/
			for(var i = 0; i < this.room.objects.length; i++) {
				var obj = this.room.objects[i];
				if(obj instanceof cls){
					var x1 = obj.x - obj.ox
					var y1 = obj.y - obj.oy
					var x2 = x1 + obj.width
					var y2 = y1 + obj.height
					if(f.point_in_rectangle(x, y, x1, y1, x2, y2)) return obj;
				}
			}
		return undefined;
	}

	// Receives room class, instantiates it and changes room to it
	gotoRoom(newRoom){
		console.log("Going to room", newRoom.name)


		// Set new room
		// this.room = new newRoom(this.room.constructor.name);
		// this.room = new newRoom(this, newRoom);
		this.room = new newRoom(this);
		this.input.reset();

		// TODO do this better
		// if (!(room instanceof LevelRoom) && !(newRoom.prototype instanceof LevelRoom)) {
			// 	console.log(SimBubble.all)
			// 	room.objects.push.apply(room.objects, SimBubble.all);
			// }
		this.room.objects.push.apply(this.room.objects, SimBubble.all);
		// this.room.objects.push.apply(this.room.objects, SimJelly.all);

		document.body.style.background = `url(${newRoom.background})`;
		document.body.style.backgroundSize = "cover";
	}
}
