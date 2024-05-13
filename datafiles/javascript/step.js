function step(){
	// console.log(timestamp);
	// let runtime = timestamp - starttime;

	//Objekte (step)
	for(var i = 0; i < room.objlist.length; i++){
		room.objlist[i].step();
		// if(room.objlist[i] !== undefined){
		//   room.objlist[i].step();
		// }else{
		//   console.log("objlist[" + i + "] ist undefined.");
		// }
	}

	// console.log(timestamp);

	room.step();
	draw();
	// requestAnimationFrame(step);
}
