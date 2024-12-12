class room23 extends LevelRoom {
	constructor(){
		super();

		this.background = spr_bg_0;

		this.addToObjList(new KI0(2));

		let planetDistance = 160; // centre to cenre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (roomWidth - rowWidth) / 2;


		let jellyAmount = 750

		for(let i = 0; i < 3; i++)
			for(let j = 0; j < itemsInRow; j++) {
				let newTeam = 1
				// TODO const
				let newP = this.addToObjList(new cls_Planet(startMargin + j * planetDistance, 200 + i * planetDistance, newTeam));
				newP.groesse = (i == 1) ? 2 : 1;
				newP.einheiten = jellyAmount;
				this.planetlist[i * itemsInRow + j] = newP;
			}

		let pushOut = 70
		// (jellyAmount * nrPlanets / bubbleAmount) factor
		jellyAmount = Math.ceil((jellyAmount * 14 / 4) * 1.05)

		for (const i of [0, 5, 12, 17]) {
			this.planetlist[i].team = 2
			this.planetlist[i].einheiten = jellyAmount
		}
		this.planetlist[0].x -= pushOut
		this.planetlist[0].y -= pushOut

		// this.planetlist[5].team = 2
		// this.planetlist[5].einheiten = jellyAmount * 18 / 4
		this.planetlist[5].x += pushOut
		this.planetlist[5].y -= pushOut

		// this.planetlist[12].team = 2
		// this.planetlist[12].einheiten = jellyAmount * 18 / 4
		this.planetlist[12].x -= pushOut
		this.planetlist[12].y += pushOut

		// this.planetlist[17].team = 2
		// this.planetlist[17].einheiten = jellyAmount * 18 / 4
		this.planetlist[17].x += pushOut
		this.planetlist[17].y += pushOut

	}

	step() {
		super.step()

		// TODO move effect? → Mixin
		if (Math.random() < 0.3 ) {
			// Move
			let source = room.planetlist[Math.floor(Math.random() * room.planetlist.length)];
			let target = room.planetlist[Math.floor(Math.random() * room.planetlist.length)];

			// if (source.team !== target.team) {
			// 	let amount = Math.round(Math.random() * 5)
			// 	source.attackN(target, amount)
			// }

			let amount = Math.round(Math.random() * 10)
			// let amount = 1
			source.attackN(target, amount)
		}


		
	}
}
