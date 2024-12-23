function main(){
	msgs = new LinkedList();
	msgs.addFirst("Test");
	msgs.addFirst("Test2");

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

	sprMedalGold = document.getElementById("medalGold");
	sprMedalSilver = document.getElementById("medalSilver");
	sprMedalBronze = document.getElementById("medalBronze");

	sprLock = document.getElementById("lock");

	// TODO check
	toggleFullscreen();

	input = new cls_input();
	storage = new Storage("localStorage");
	room = new Startpage();

	setInterval(step, 1000/60); // 60 FPS
}
