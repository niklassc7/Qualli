function draw() {
	// Background
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas_width, canvas_height);
	if(room.background != undefined){
		ctx.drawImage(room.background, 0, 0, canvas.width, canvas.height);
	}

	// draw of all `Object`
	for(var i = 0; i < room.objlist.length; i++){
		if(room.objlist[i] !== undefined){
			room.objlist[i].draw();
		}
	}

	// GUI
	// mouse.draw();
	input.draw()
	room.draw();

	text = "Excepturi non voluptate autem error consequuntur et ipsam. In atque aliquam quia mollitia. Excepturi non voluptate autem error consequuntur et ipsam. In atque aliquam quia mollitia. Excepturi non voluptate autem error consequuntur et ipsam.";
	// drawInfoWindow(text, ["test0, test1"], ["f0", "f1"]); // TODO implement


	// mouse.left_pressed = false;
	// mouse.middle_pressed = false;
	// mouse.right_pressed = false;
}


function drawInfoWindow(text, buttons, buttonFunctions) {

	ctx.lineWidth = 8;

	let infoWindowWidth = canvas_width * 0.8;
	let infoWindowHeight = canvas_height * 0.8;

	let l = canvas_width / 2 - infoWindowWidth / 2;
	let t = canvas_height / 2 - infoWindowHeight / 2;



	ctx.fillStyle = "black";
	ctx.strokeStyle = "white";
	ctx.rect(l, t, infoWindowWidth, infoWindowHeight);
	ctx.fill();
	ctx.rect(l, t, infoWindowWidth, infoWindowHeight);
	ctx.stroke();

	text = insertLineBreaks(text, canvas_width);

	ctx.font = "20px fnt_Comforta_Bold";
	ctx.fillStyle = "white";
	ctx.fillText(text, canvas_width / 2, canvas_height / 2, canvas_width);


	// requestAnimationFrame(draw);
}
