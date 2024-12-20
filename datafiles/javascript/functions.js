function onResize() {
	// if it was not in fullScreen and it gets smaller than roomSize put in fullScreen

	// canvas.width = canvas_width;
	// canvas.height = canvas_height;
	if(fullscreen)
		resizeCanvas();
	else if(window.innerWidth < roomWidth || window.innerHeight < roomHeight)
		activateFullscreen();
}

function activateFullscreen() {
	document.getElementById("myCanvas").classList.add("fullscreen");
	document.getElementById("myCanvas").requestFullscreen();
	fullscreen = true;
	resizeCanvas();
}

function deactivateFullscreen() {
	document.getElementById("myCanvas").classList.remove("fullscreen");
	fullscreen = false;

	canvas.width = roomWidth;
	canvas.height = roomHeight;
	xScalar = 1;
	yScalar = 1;

	for(let i = 0; i < room.objlist.length; i++)
		room.objlist[i].resize();
}

function toggleFullscreen() {
	if(fullscreen)
		if(window.innerWidth < roomWidth || window.innerHeight < roomHeight)
			alert("Window too small for window mode");
	else
		deactivateFullscreen();
	else
		activateFullscreen();
}

function resizeCanvas() {
	let ratioW = 16
	let ratioH = 9
	// fp4
	// let ratioW = 913
	// let ratioH = 437

	let scale
	if (optScaling) {
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
		canvas.width = availHeight * (ratioW / ratioH);
		canvas.height = availHeight;
	} else {
		canvas.width = availWidth;
		canvas.height = availWidth * (ratioH / ratioW);
	}

	// canvas.width = window.innerWidth * scale;
    // canvas.height = window.innerHeight * scale;


	// Fit screen TODO combine with if-clause above
	if(window.innerWidth * (ratioH / ratioW) > window.innerHeight) {
		canvasStyleWidth = window.innerHeight * (ratioW / ratioH)
		canvasStyleHeight = window.innerHeight
		canvas.style.width = `${canvasStyleWidth}px`
		canvas.style.height = `${canvasStyleHeight}px`

		// xScalar = (window.innerHeight * (ratioW / ratioH)) / roomWidth;
		// yScalar = window.innerHeight / roomHeight;
	} else {
		canvasStyleWidth = window.innerWidth
		canvasStyleHeight = window.innerWidth * (ratioH / ratioW)
		canvas.style.width = `${canvasStyleWidth}px`
		canvas.style.height = `${canvasStyleHeight}px`

		// xScalar = window.innerWidth / roomWidth;
		// yScalar = (window.innerWidth * (ratioH / ratioW)) / roomHeight;
	}
	// canvas.style.width = `${window.innerWidth}px`;
	// canvas.style.height = `${window.innerHeight}px`;

	// TODO just one scaling?
	xScalar = canvas.width / roomWidth;
	yScalar = canvas.height / roomHeight;

	// TODO
	// xScalar = (xScalar + yScalar) / 2
	// xScalar = Math.min(xScalar, yScalar)
	// yScalar = xScalar


	// Scale context
	// ctx.scale(scale, scale)

	// TODO check
	try{ room; }
	catch(e) {
		if(e.name == "ReferenceError") {
			return;
		}
	}

	// Reposition objects
	for(let i = 0; i < room.objlist.length; i++)
		room.objlist[i].resize();

}

// Receives room class, instantiates it and changes room to it
function room_goto(newRoom){
	console.log("Going to room", newRoom.name)
	// Set new room
	room = new newRoom(room);
	input.reset();
}

function object_create(cls, px, py) {
	object_create(cls, px, py, [])
}

function object_create(cls, px, py, parameter){ // Erstellen, Eintragem, obj (inst) wiedergeben // OBSOLETE USE ADDTOOBJLIST AFTER CREATING
	// Create object
	var obj = new cls([]);
	// Register object to game loop
	room.addToObjList(obj);

	// Set coordinates, if given
	if(px !== undefined && py !== undefined) {
		obj.x = px;
		obj.y = py;
	}
	return obj;
}


function object_destroy(obj) {
	for(var i = 0; i < room.objlist.length; i++) {
		if(room.objlist[i] === obj) {
			// room.objlist[i] = undefined;
			room.objlist.splice(i, 1);
			return true;
		}
	}
	console.log("FEHLER: function object_destroy, obj konnte nicht in room.objlist gefunden werden. Es wurde nichts gelöscht.");
	return false;
}

function radtodeg(rad) {
	return rad * (180 / Math.PI);
}
function degtorad(deg) {
	return deg * (Math.PI / 180);
}

function point_in_rectangle(px, py, x1, y1, x2, y2){
	if(px < x1 || py < y1 || px > x2 || py > y2) return false;
	return true;
}
function rectangle_in_rectangle(a_x1, a_y1, a_x2, a_y2, b_x1, b_y1, b_x2, b_y2) {
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

function pointDirection(x1, y1, x2, y2){ // Nicht getestet! FEHLERHAFT TODO
	let dx = x2 - x1;
	let dy = y2 - y1;

	return radtodeg(Math.atan2(dy, dx));

}

// Mathematical modulo
function mMod(a, b) {
	return ((a % b + b) % b);
}

// TODO move to static method in Object?
// TODO cls has to be of type Object as it needs to have x,y,ox,oy,width,height
// Checks if the point (x,y) collides with an object of class cls
// @param {number} - X-coordinate
// @param {number} - Y-coordinate
// @param {Object} - Class
// @return {(Object|undefined)} of type cls or undefined
function collision_point(x, y, cls) { // return obj oder undefined
	/* Prüft, ob Punkt mit einem Objekt der Klasse cls kollidiert.
	* Nur unpräzise Prüfung (point_in_rectangle).
	*/
	for(var i = 0; i < room.objlist.length; i++) {
		var obj = room.objlist[i];
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

function draw_line(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function draw_circle(x, y, r, outline) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);
	if(outline)
		ctx.stroke();
	else
		ctx.fill();

}

function draw_roundrect(ctx, x, y, width, height, radius, fill, stroke) {
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

// // Setzen der Mausvariablen, falls event
// function WhichButton(event) {
// 	switch(event.button){
// 		case 0:
// 			mouse.left_pressed = true;
// 			break;
// 		case 1:
// 			mouse.middle_pressed = true;
// 			break;
// 		case 2:
// 			mouse.right_pressed = true;
// 			break;
// 		default:
// 			console.log("Fehler: Nicht bekannte Maustaste gedrückt (" + event.button + ").");
// 			break;
// 	}
// }

// Checks if team has already lost
function checkIfLost(team) {
	for(var i = 0; i < room.objlist.length; i++) {
		if(room.objlist[i] instanceof Jelly || room.objlist[i] instanceof cls_Planet) {
			if(room.objlist[i].team === team) {
				return false;
			}
		}
	}
	return true;
}

// TODO move to level-storage-object (separate storage-class (engine) and level-storage (game))
function storeLevelPlayed(roomName, won) {
	let cname = roomName + (won ? "W" : "L");

	if(storage.get(cname) == "") {
		storage.set(cname, 1);
	} else {
		storage.set(cname, parseInt(storage.get(cname)) + 1);
	}
}

function showSettings() {
	document.getElementById("settingsOverlay").classList.remove("hidden")
}

function hideSettings() {
	document.getElementById("settingsOverlay").classList.add("hidden")
}

function showEndgame(won) {
	let levelTimeS = (Date.now() - room.roomEntered) / 1000

	document.getElementById("egWon").innerHTML = won ? "won 🥳" : "lost 🤬"
	document.getElementById("egTime").innerHTML = `${levelTimeS} seconds`
	document.getElementById("endgameOverlay").classList.remove("hidden")
}

function hideEndgame() {
	document.getElementById("endgameOverlay").classList.add("hidden")
}

function pause() {
	paused = true
	document.getElementById("pausedOverlay").classList.remove("hidden")
}

function unpause() {
	paused = false
	document.getElementById("pausedOverlay").classList.add("hidden")
}

// TODO move to settings
function toggleExperimental() {
	experimental = !experimental
	document.getElementById("sExperimental").checked = experimental;
}

// TODO move to settings
function toggleScaling() {
	// TODO Settings opject insead of opt prefix → toggle method there
	optScaling = !optScaling;
	document.getElementById("sScaling").checked = optScaling;
	resizeCanvas()
}

// TODO move to settings
function toggleDebug() {
	// TODO Settings opject insead of opt prefix → toggle method there
	debug = !debug;
}

// Converts xD to x
function xScreenToInternal(xD) {
	// return xD / canvas.width * roomWidth
	return xD / canvasStyleWidth * roomWidth
}

// Converts yD to y
function yScreenToInternal(yD) {
	// return yD / canvas.height * roomHeight
	return yD / canvasStyleHeight * roomHeight
}

function resetProgress() {
	let text = "Do you really want to reset your entire progress?"
	if (!confirm(text)) {
		return
	}

	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++)
		storage.delete(cookies[i].split("=")[0]);

	alert("Your progress has been reset.");
}
