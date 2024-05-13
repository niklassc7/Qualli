class RoomMenu0 extends Room{
	constructor(){
		super();
		this.background = spr_bgMenu;
		this.objlist = [];

		this.n_step = 0;

		let rooms = [room0, room1, room2, room3, room4, room5, room6, room7, room8, room9, room10, room11, room17, room18, room19];

		this.addToObjList(new Button("←", 32, roomHeight - 96, 64, 64, function(){ room_goto(rom_menu); } )).setFontSize(24) ;
		this.addToObjList(new Button("→", roomWidth - 96, roomHeight - 96, 64, 64, function(){ room_goto(RoomMenu1); },  (getCookie(rooms[rooms.length-1].name + "W") == ""))).setFontSize(24) ;

		let buttonWidth = 128;
		let buttonHeight = 128;
		let buttonMargin = 16;



		//  let itemsInRow = 12;
		let itemsInRow = 4;
		let itemsinColumn = Math.ceil(rooms.length / itemsInRow)



		// Calculate start margin in order to center the items block
		let rowWidth = ((itemsInRow-1) * buttonMargin + itemsInRow * buttonWidth);
		let marginLeft = (roomWidth - rowWidth) / 2;

		let columnHeight = ((itemsinColumn-1) * buttonMargin + itemsinColumn * buttonHeight);
		let marginTop = (roomHeight - columnHeight) / 2;

		for(let i = 0; i < itemsinColumn; i++)
			for(let j = 0; j < itemsInRow && i*itemsInRow + j < rooms.length; j++) {
				this.addToObjList(new Button(
					i*itemsInRow + j,
					marginLeft + j * (buttonWidth + buttonMargin),
					marginTop + i * (buttonHeight + buttonMargin),
					buttonWidth,
					buttonHeight,
					function() { room_goto(rooms[i*itemsInRow + j]) },
					(i*itemsInRow + j - 1 < 0) ? false : (getCookie(rooms[i*itemsInRow + j - 1].name + "W") == "") ? true : false
				)).setFontSize(36);
			}

	}

}
