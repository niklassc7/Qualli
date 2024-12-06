function main(){
	/** web
	*   android
	*/
	platform = "web";
	debug = false

	roomWidth = 1280;
	roomHeight = 720;
	canvas_width = 1920; // OBSOLETE
	canvas_height = 1080; //OBSOLETE


	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");

	canvas.width = canvas_width;
	canvas.height = canvas_height;

	xScalar = canvas.width / roomWidth;
	yScalar = canvas.height / roomHeight;

	fullscreen = false;

	// Load Images from HTML-Ressources
	spr_Linsenreflex = document.getElementById("img_Linsenreflex");
	spr_bg_0 = document.getElementById("bg0");
	spr_bgMenu = document.getElementById("bgMenu");
	bgMenuDark = document.getElementById("bgMenuDark");
	// spr_Linsenreflex_schwach = document.getElementById("img_Linsenreflex_schwach");
	spr_Erde = document.getElementById("img_Erde");
	spr_Sterne = document.getElementById("img_Sterne");
	spr_Planet = document.getElementById("bubble");
	spr_Raumschiff = [];
	spr_Raumschiff[1] = document.getElementById("qualleRed");
	spr_Raumschiff[2] = document.getElementById("qualleBlue");
	spr_Raumschiff[3] = document.getElementById("qualleGreen");
	spr_Raumschiff[4] = document.getElementById("qualleYellow");

	sprLock = document.getElementById("lock");

	// // TODO remove when old mouse is replaced by input object
	// function getMousePos(canvas, evt){
	// 	var rect = canvas.getBoundingClientRect();
	// 	return {
	// 		x: evt.clientX - rect.left,
	// 		y: evt.clientY - rect.top
	// 	};
	// }

	// if(window.innerWidth < 1300 || window.innerHeight < 740)
		toggleFullscreen();

	// canvas.addEventListener('mousemove', function(evt) {
	// 	var mousePos = getMousePos(canvas, evt);
	// 	mouse.x = mousePos.x * (roomWidth / canvas.clientWidth);
	// 	mouse.y = mousePos.y * (roomHeight / canvas.clientHeight);
	// 	mouse.xD = mouse.x * xScalar; // x it should be drawn at
	// 	mouse.yD = mouse.y * yScalar; // y it should be drawn at
	// }, false);
	// mouse = new cls_mouse;

	input = new cls_input();
	

	// canvas.addEventListener('mousedown', input.mousedown, false);
	// canvas.addEventListener('mousemove', input.mousemove, false);
	// canvas.addEventListener('mouseup', input.mouseup, false);
	


	room = new rom_menu();
	// room.constructor();

	teamcolour = [];
	teamcolour[1] = "rgba(211, 47, 47, 0.6)";
	teamcolour[2] = "rgba(48, 63, 159, 0.6)";
	teamcolour[3] = "rgba(56, 142, 60, 0.6)";
	teamcolour[4] = "rgba(251, 192, 45, 0.6)";



	document.addEventListener("keydown", function(e) {
		if (e.keyCode == 13) {
			toggleFullScreen(document.getElementById("myCanvas"));
		}
	}, false);


	/** Room width / height is the position the objects are stored at (x,y).
		* We use usually 1280 × 720
		* canvas might be different size and then objects have to be drawn at
		* different coordinates accordingly
		*/

		// requestAnimationFrame(function(timestamp) {
			//   starttime = timestamp;
			//   console.log(starttime);
			//   step();
			// });

	// room_goto(RoomMenu1)
	setInterval(step, 1000/60); // 60 FPS
}
