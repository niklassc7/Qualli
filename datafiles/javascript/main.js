var msgs;
var roomWidth;
var roomHeight;
var canvas_width;
var canvas_height;
var stepCount;
var canvas;
var ctx;
var xScalar;
var yScalar;
var fullscreen;
var spr_Linsenreflex;
var spr_Linsenreflex;
var spr_bg_0;
var spr_bgMenu;
var bgMenuDark;
var spr_Erde;
var spr_Sterne;
var spr_Planet;
var spr_Raumschiff;
var sprMedalGold;
var sprMedalSilver;
var sprMedalBronze;
var sprLock;
var input;
var storage;
var room;

function main(){
	"use strict";

	// TODO implement or remove
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
	spr_Planet = document.getElementById("bubble"); // TODO rename
	spr_Raumschiff = [];
	spr_Raumschiff[1] = document.getElementById("qualleRed");
	spr_Raumschiff[2] = document.getElementById("qualleBlue");
	spr_Raumschiff[3] = document.getElementById("qualleGreen");
	spr_Raumschiff[4] = document.getElementById("qualleYellow");

	sprMedalGold = document.getElementById("medalGold");
	sprMedalSilver = document.getElementById("medalSilver");
	sprMedalBronze = document.getElementById("medalBronze");

	sprLock = document.getElementById("lock");


	input = new cls_input();
	storage = new Storage("localStorage");
	room = new Startpage();

	// TODO check
	toggleFullscreen();

	setInterval(step, 1000/60); // 60 FPS
}
