class KI extends IObjlistEntry {
	constructor(team) {
		super();
		this.team = team;
		this.alarm = [];
		this.alarm[0] = 20;
	}

	step() {
		for(var i = 0; i < this.alarm.length; i++) {
			if(this.alarm[i] > 0) {
				this.alarm[i]--;
				if(this.alarm[i] === 0) this.alarmieren(i);
			}
		}
	}

	draw() {
		ctx.fillStyle = teamcolour[this.team];
		ctx.strokeStyle = "#aa0000";
		ctx.lineWidth = 2;
		draw_circle((32 + (this.team - 2) * 48) * xScalar, 32 * yScalar, 16 * ((xScalar + yScalar) / 2), false);
	}

	pruefe_ob_eigene_Raumschiffe_im_Spiel() {
		for(var i = 0; i < room.objlist.length; i++) {
			if(room.objlist[i] instanceof Raumschiff) {
				if(room.objlist[i].team === this.team) return true;
			}
		}
		return false;
	}

	getPlanetlist() {
		var planetlist = [];
		for(var i = 0; i < room.planetlist.length; i++) {
			if(room.planetlist[i].team === this.team) {
				planetlist[planetlist.length] = room.planetlist[i];
			}
		}
		return planetlist;
	}

	getStrongestPlanet() {
		var planetlist = this.getPlanetlist();
		if(planetlist.length === 0) return;
		var strongest_index = 0;
			// Suche stärksten Planeten aus eigener planetlist aus.
			for(var i = 0; i < planetlist.length; i++) {
				if(planetlist[i].einheiten > planetlist[strongest_index].einheiten) {
					strongest_index = i;
				}
			}
		return planetlist[strongest_index];
	}

	getEnemyBubblesWeakerThan(n) {
		var enemyList = [];
		for(var i = 0; i < room.planetlist.length; i++) {
			if(room.planetlist[i].team !== this.team && n > room.planetlist[i].einheiten) {
				enemyList[enemyList.length] = room.planetlist[i];
			}
		}
		return enemyList;
	}

	angriff(planet_start, planet_ziel){
		for(var i = 0; i < Math.floor(planet_start.einheiten / 2); i++) {
			//  var neu = object_create(Raumschiff, planet_start.x + (64 - Math.floor(Math.random() * 128)), planet_start.y + (64 - Math.floor(Math.random() * 128)));
			//  neu.team = this.team;
			//  neu.sprite = spr_Raumschiff[this.team];
			//  neu.ziel = planet_ziel;
			//  neu.move_towards_point(neu.ziel.x, neu.ziel.y, 3);
			//  neu.direction = radtodeg(Math.atan2(neu.vspeed, neu.hspeed));

			// let nx = planet_start.x + (64 - Math.floor(Math.random() * 128));
			// let ny = planet_start.y + (64 - Math.floor(Math.random() * 128));
			let nx = planet_start.x;
			let ny = planet_start.y;
			// let neu = new Raumschiff(nx, ny, this.team, planet_ziel);
			planet_start.createQueue.addLast([nx, ny, this.team, planet_ziel]);
			// planet_start.createStack.push(neu);
			// room.addToObjList(neu);

		}
		planet_start.einheiten -= Math.floor(planet_start.einheiten/2)
	}
	pruefe_ob_gewonnen() {
		for(var i = 0; i < room.objlist.length; i++) {
			if(room.objlist[i] instanceof KI) {
				return false;
			}
		}
		return true;
	}

	deleteIfDefeatedAndCheckIfWon() {
		// Wenn kein Planet und keine Raumschiffe mehr vorhanden sind, KI löschen, dann prüfen ob Spieler gewonnen.
		if(this.getPlanetlist().length === 0) {
			/* Wenn kein Planet mehr da ist, aber noch Raumschiffe soll weder
			* die KI gelöscht werden, noch der restliche Angriffsplan
			* ausgeführt werden.
			*/
			if(this.pruefe_ob_eigene_Raumschiffe_im_Spiel()) {
				this.alarm[0] = 200 + Math.round(Math.random() * 100);
				return;
			}

			// KI löschen, wenn weder eigene Planeten, noch Raumschiffe da sind.
			object_destroy(this);
			// Prüfen, ob noch eine KI da ist, sonst gewonnen.
			if(this.pruefe_ob_gewonnen()){
				showMessage("Gewonnen!");
				// Write Cookie won
				storeLevelPlayed(room.constructor.name, true);
				room_goto(rom_menu);
			}
			return true;
		}

		return false;
	}
}
