import Input from "./appEtc/Input.js";
import Storage from "./engine/Storage.js";
import Startpage from "./rooms/Startpage.js";
import LinkedList from "./engine/LinkedList/LinkedList.js";
import SimBubble from "./objects/SimBubble/SimBubble.js";
import SimJelly from "./objects/SimJelly.js";

// TODO remove all globals
export var msgs = new LinkedList();
export var roomWidth = 1280;
export var roomHeight = 720;
export var canvas_width = 1920; // OBSOLETE TODO
export var canvas_height = 1080; //OBSOLETE TODO
export var canvasStyleWidth = roomWidth;
export var canvasStyleHeight = roomHeight;

export var stepCount = 0;
export var canvas = document.getElementById("myCanvas");
export var ctx = canvas.getContext("2d");;
export var xScalar = canvas.width / roomWidth;
export var yScalar = canvas.height / roomHeight;
export var fullscreen = false;

// Load Images from HTML-Ressources
export var spr_Linsenreflex = document.getElementById("img_Linsenreflex");
export var spr_bg_0 = document.getElementById("bg0");
export var spr_bgMenu = document.getElementById("bgMenu");
export var bgMenuDark = document.getElementById("bgMenuDark");
export var spr_Erde = document.getElementById("img_Erde");
export var spr_Sterne = document.getElementById("img_Sterne");
export var spr_Planet = document.getElementById("bubble"); // TODO rename
export var spr_Raumschiff = [];
export var sprMedalGold = document.getElementById("medalGold");
export var sprMedalSilver = document.getElementById("medalSilver");
export var sprMedalBronze = document.getElementById("medalBronze");
export var sprLock = document.getElementById("lock");

export var input = new Input();
export var storage = new Storage("localStorage");
export var room = new Startpage();


// TODO do this better
export function setXScalar(sc) {
	xScalar = sc;
}

// TODO do this better
export function setYScalar(sc) {
	yScalar = sc;
}

// TODO do this better
export function setCanvasStyleWidth(w) {
	canvasStyleWidth = w;
}

// TODO do this better
export function setCanvasStyleHeight(h) {
	canvasStyleHeight = h;
}

// TODO do this better
export function incrStepCount() {
	stepCount++;
}

// TODO move
// Receives room class, instantiates it and changes room to it
export function gotoRoom(newRoom){
	console.log("Going to room", newRoom.name)


	// Set new room
	room = new newRoom(room);
	input.reset();

	// TODO do this better
	// if (!(room instanceof LevelRoom) && !(newRoom.prototype instanceof LevelRoom)) {
	// 	console.log(SimBubble.all)
	// 	room.objects.push.apply(room.objects, SimBubble.all);
	// }
	room.objects.push.apply(room.objects, SimBubble.all);
	room.objects.push.apply(room.objects, SimJelly.all);

	// for (let i = 0; i < SimJelly.all.length; i++) {
	// 	SimJelly.all[i].setSpeed();
	// }
	
	document.body.style.background = `url(${newRoom.background})`;
	document.body.style.backgroundSize = "cover";
}
