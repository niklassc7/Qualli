class room27 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;

		this.addObject(new KI0(2));
		this.addObject(new KI1(3));
		this.addObject(new KI1(3));

		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;


		let marginVert = 30;
		let marginHorz = 30;

		let newP=this.addObject(new Bubble(marginVert + 0 * planetDistance, 160 + 0 * planetDistance, 1));
		newP.groesse = 1;
		newP.einheiten = 5000;
		this.planetlist.push(newP)

		newP=this.addObject(new Bubble(marginVert + 4 * planetDistance, 160 + 1 * planetDistance, 2));
		newP.groesse = 10;
		newP.einheiten = 5000;
		this.planetlist.push(newP)












		// Calculate start margin in order to center the items block
		// let rowWidth = (itemsInRow-1) * planetDistance;
		// let startMargin = (roomWidth - rowWidth) / 2;

		// let amount = 10
		// for(let i = 0; i < 3; i++)
		// 	for(let j = 0; j < itemsInRow; j++) {
		// 		if (j > 2) {
		// 			continue;
		// 		}

		// 		// let newTeam = (j < itemsInRow / 2) ? 1 : 2;
		// 		let newTeam = j + 1
		// 		// let newTeam = 2
		// 		let newP = this.addObject(new Bubble(startMargin + j * planetDistance, 160 + i * planetDistance, newTeam));
		// 		// newP.groesse = (i == 1) ? 2 : 1;
		// 		newP.groesse = 1;
		// 		newP.einheiten = amount;
		// 		this.planetlist.push(newP)
		// 		// this.planetlist[i * itemsInRow + j] = newP;

		// 	}
		
		// // this.planetlist[this.planetlist.length -1].team = 1;
		// this.planetlist[3].team = 1;
		// this.planetlist[3].einheiten = 300;
		
		// let newP = this.addObject(new Bubble(startMargin + 4 * planetDistance, 160 + 0 * planetDistance, 2));
		// newP.einheiten = 9.5 * amount;
		// newP.groesse = 7;
		// this.planetlist.push(newP);

		// newP = this.addObject(new Bubble(startMargin + 4 * planetDistance, 160 + 2 * planetDistance, 3));
		// newP.einheiten = 9.5 * amount;
		// newP.groesse = 7;
		// this.planetlist.push(newP);
	}
}
