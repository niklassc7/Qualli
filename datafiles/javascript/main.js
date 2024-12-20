function main(){
	debug = false // TODO move to settings
	experimental = true // TODO move to settings


	// TODO move to settings
	optScaling = true
	paused = false

	roomWidth = 1280;
	roomHeight = 720;
	canvas_width = 1920; // OBSOLETE TODO
	canvas_height = 1080; //OBSOLETE TODO

	stepCount = 0

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

	// if(window.innerWidth < 1300 || window.innerHeight < 740)
		toggleFullscreen();

	input = new cls_input();
	storage = new Storage("cookie");
	room = new Startpage();

	teamcolour = [];
	teamcolour[1] = "rgba(211, 47, 47, 0.6)";
	teamcolour[2] = "rgba(48, 63, 159, 0.6)";
	teamcolour[3] = "rgba(56, 142, 60, 0.6)";
	teamcolour[4] = "rgba(251, 192, 45, 0.6)";



	document.addEventListener("keydown", function(e) {
		// TODO remove
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
