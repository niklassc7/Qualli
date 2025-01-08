import * as g from "./globals.js";
import Settings from "./engine/Settings.js";
import Jelly from "./objects/Jelly.js";
import Bubble from "./objects/Bubble.js";

// TODO put functions in approrpirate places

export function onResize() {
	// if it was not in fullScreen and it gets smaller than roomSize put in fullScreen
	if(Settings.fullscreen)
		resizeCanvas();
	else if(window.innerWidth < roomWidth || window.innerHeight < roomHeight)
		activateFullscreen();
}

// Returns a random element from arr
export function chooseRandom(arr) {
	let ri = Math.floor(arr.length * Math.random());
	return arr[ri];

}

export function activateFullscreen() {
	document.getElementById("myCanvas").classList.add("fullscreen");
	document.getElementById("myCanvas").requestFullscreen();
	Settings.fullscreen = true;
	resizeCanvas();
}

export function deactivateFullscreen() {
	document.getElementById("myCanvas").classList.remove("fullscreen");
	Settings.fullscreen = false;

	g.canvas.width = g.roomWidth;
	g.canvas.height = g.roomHeight;
	// TODO fix
	xScalar = 1;
	yScalar = 1;

	for(let i = 0; i < g.room.objects.length; i++)
		g.room.objects[i].resize();
}

export function toggleFullscreen() {
	if(g.fullscreen)
		if(window.innerWidth < g.roomWidth || window.innerHeight < g.roomHeight)
			alert("Window too small for window mode");
	else
		deactivateFullscreen();
	else
		activateFullscreen();
}

export function resizeCanvas() {
	let ratioW = 16
	let ratioH = 9
	// fp4
	// let ratioW = 913
	// let ratioH = 437

	let scale
	if (Settings.scaling) {
		scale = window.devicePixelRatio;
	} else {
		scale = 1.0;
	}

	let availWidth = window.innerWidth * scale
	let availHeight = window.innerHeight * scale
	// let availWidth = window.innerWidth
	// let availHeight = window.innerHeight


	// TODO tmp
	// canvas.width = availWidth
	// canvas.height = availHeight

	// Aspect ratio
	if(availWidth * (ratioH / ratioW) > availHeight) {
		g.canvas.width = availHeight * (ratioW / ratioH);
		g.canvas.height = availHeight;
	} else {
		g.canvas.width = availWidth;
		g.canvas.height = availWidth * (ratioH / ratioW);
	}

	// canvas.width = window.innerWidth * scale;
    // canvas.height = window.innerHeight * scale;


	// Fit screen TODO combine with if-clause above
	if(window.innerWidth * (ratioH / ratioW) > window.innerHeight) {
		g.setCanvasStyleWidth(window.innerHeight * (ratioW / ratioH));
		g.setCanvasStyleHeight(window.innerHeight);
		g.canvas.style.width = `${g.canvasStyleWidth}px`
		g.canvas.style.height = `${g.canvasStyleHeight}px`
	} else {
		g.setCanvasStyleWidth(window.innerWidth);
		g.setCanvasStyleHeight(window.innerWidth * (ratioH / ratioW));
		g.canvas.style.width = `${g.canvasStyleWidth}px`
		g.canvas.style.height = `${g.canvasStyleHeight}px`
	}
	// canvas.style.width = `${window.innerWidth}px`;
	// canvas.style.height = `${window.innerHeight}px`;

	// TODO just one scaling?
	g.setXScalar(g.canvas.width / g.roomWidth);
	g.setYScalar(g.canvas.height / g.roomHeight);

	// TODO check
	try {
		g.room;
	} catch(e) {
		if (e.name == "ReferenceError") {
			return;
		}
	}

	// Reposition objects
	for(let i = 0; i < g.room.objects.length; i++)
		g.room.objects[i].resize();
}

export function radtodeg(rad) {
	return rad * (180 / Math.PI);
}
export function degtorad(deg) {
	return deg * (Math.PI / 180);
}

export function point_in_rectangle(px, py, x1, y1, x2, y2){
	if(px < x1 || py < y1 || px > x2 || py > y2) return false;
	return true;
}
export function rectangle_in_rectangle(a_x1, a_y1, a_x2, a_y2, b_x1, b_y1, b_x2, b_y2) {
	if(a_x1 <= b_x1){
		if(a_x2 < b_x1) return false;
	}else{
		if(b_x2 < a_x1) return false;
	}
	if(a_y1 <= b_y1){
		if(a_y2 >= b_y1) return true;
	}else{
		if(b_y2 >= a_y1) return true;
	}
	return false;
}

// TODO implement
// Checks if point (x,y) is in circle at (cx,cy) with radius r
export function pointInCircle(x, y, cx, cy, r) {
	// console.log(x, y, cx, cy, r);

	let dx = Math.abs(x - cx);
	let dy = Math.abs(y - cy);
	// let dist = Math.sqrt(dx^2 + dy^2);

	// console.log(dist, r);
	// console.log();

	// return dist < r;

	return dx <= r && dy <= r;
}

// TODO implement
export function circleInCircle(x1, y1, r1, x2, y2, r2) {
	let dx = Math.abs(x1 - x2);
	let dy = Math.abs(y1 - y2);
	
	// Total radius
	rt = r1 + r2;
	return dx <= rt && dy <= rt;
}

export function pointDirection(x1, y1, x2, y2){ // Nicht getestet! FEHLERHAFT TODO
	let dx = x2 - x1;
	let dy = y2 - y1;

	return radtodeg(Math.atan2(dy, dx));

}

// Mathematical modulo
export function mMod(a, b) {
	return ((a % b + b) % b);
}

// TODO move to static method in Object?
// TODO cls has to be of type Object as it needs to have x,y,ox,oy,width,height
// Checks if the point (x,y) collides with an object of class cls
// @param {number} - X-coordinate
// @param {number} - Y-coordinate
// @param {Object} - Class
// @return {(Object|undefined)} of type cls or undefined
export function collision_point(x, y, cls) { // return obj oder undefined
	/* Prüft, ob Punkt mit einem Objekt der Klasse cls kollidiert.
	* Nur unpräzise Prüfung (point_in_rectangle).
	*/
	for(var i = 0; i < g.room.objects.length; i++) {
		var obj = g.room.objects[i];
		if(obj instanceof cls){
			var x1 = obj.x - obj.ox
			var y1 = obj.y - obj.oy
			var x2 = x1 + obj.width
			var y2 = y1 + obj.height
			if(point_in_rectangle(x, y, x1, y1, x2, y2)) return obj;
		}
	}
	return undefined;
}

// TODO camelCase
export function draw_line(x1, y1, x2, y2) {
	g.ctx.beginPath();
	g.ctx.moveTo(x1, y1);
	g.ctx.lineTo(x2, y2);
	g.ctx.stroke();
}

// TODO fillCircle and strokeCircle
// TODO camelCase
// Put in static method of a graphics class
export function draw_circle(x, y, r, outline) {
	g.ctx.beginPath();
	g.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
	if(outline)
		g.ctx.stroke();
	else
		g.ctx.fill();
}

// TODO camelCase
// TODO ctx should be handled the same in any draw-function
export function draw_roundrect(ctx, x, y, width, height, radius, fill, stroke) {
	if (typeof stroke == 'undefined') {
		stroke = true;
	}
	if (typeof radius === 'undefined') {
		radius = 5;
	}
	if (typeof radius === 'number') {
		radius = {tl: radius, tr: radius, br: radius, bl: radius};
	}else{
		var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
		for (var side in defaultRadius){
			radius[side] = radius[side] || defaultRadius[side];
		}
	}
	ctx.beginPath();
	ctx.moveTo(x + radius.tl, y);
	ctx.lineTo(x + width - radius.tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	ctx.lineTo(x + width, y + height - radius.br);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
	ctx.lineTo(x + radius.bl, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	ctx.lineTo(x, y + radius.tl);
	ctx.quadraticCurveTo(x, y, x + radius.tl, y);
	ctx.closePath();
	if (fill){
		ctx.fill();
	}
	if (stroke){
		ctx.stroke();
	}
}

// Checks if team has already lost
export function checkIfLost(team) {
	for(var i = 0; i < g.room.objects.length; i++) {
		if(g.room.objects[i] instanceof Jelly || g.room.objects[i] instanceof Bubble) {
			if(g.room.objects[i].team === team) {
				return false;
			}
		}
	}
	return true;
}

export function showEndgame(won) {
	let levelTimeS = (Date.now() - g.room.roomEntered) / 1000

	document.getElementById("egWon").innerHTML = won ? "won 🥳" : "lost 🤬"
	document.getElementById("egTime").innerHTML = `${levelTimeS} seconds`
	document.getElementById("endgameOverlay").classList.remove("hidden")
}

export function hideEndgame() {
	document.getElementById("endgameOverlay").classList.add("hidden")
}

// Converts xD to x
export function xScreenToInternal(xD) {
	return xD / g.canvasStyleWidth * g.roomWidth;
}

// Converts yD to y
export function yScreenToInternal(yD) {
	return yD / g.canvasStyleHeight * g.roomHeight;
}
