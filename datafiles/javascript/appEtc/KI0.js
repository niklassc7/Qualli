class KI0 extends KI {
	constructor(team) {
		super(team);
	}

	getEinnehmlist() {
		var einnehmlist = [];
		var strongestPlanet = this.getStrongestPlanet();
		if(strongestPlanet === undefined)
			return [];
		for(var i = 0; i < room.planetlist.length; i++) {
			if(room.planetlist[i].team !== this.team && Math.floor(strongestPlanet.einheiten / 2) > room.planetlist[i].einheiten) {
				einnehmlist[einnehmlist.length] = room.planetlist[i];
			}
		}
		return einnehmlist;
	}

	alarmieren(nr) {
		switch(nr) {
			case 0:
				if(this.deleteIfDefeatedAndCheckIfWon())
					return;

				var einnehmlist = this.getEinnehmlist();
				if(einnehmlist.length === 0){ // Wenn kein Planet eingenommen werden kann, schicke von zufälligem eigenen Planten Schiffe zum Stärksten
					// console.log("Kein Einnehmbarer Planet");
					var planetlist = this.getPlanetlist();
					var planet_start = planetlist[Math.round(Math.random() * (planetlist.length-1))];
					var planet_ziel = this.getStrongestPlanet();
				} else { // Wenn Planet eingenommen werden kann, nimm ein.
					// Wähle zufälligen Startplaneten aus dem Array der eigenen Planeten aus
					//var zw = Math.round(Math.random() * (planetlist.length-1));
					//var planet_start = planetlist[zw];
					var planet_start = this.getStrongestPlanet();
					// Wähle zufälligen Planeten als Ziel
					var planet_ziel = einnehmlist[Math.round(Math.random() * (einnehmlist.length-1))];
				}

				// Erstelle Raumschiffe
				if(planet_start !== planet_ziel)
					this.angriff(planet_start, planet_ziel);

				this.alarm[0] = 200 + Math.round(Math.random() * 100);
				break;
			default:
				console.log("Fehler: alarm() von KI: alarm() aufgerufen ohne nr");
		}
	}
}
