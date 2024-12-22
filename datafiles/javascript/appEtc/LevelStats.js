// Data class, used to define JSON layout to store stats about levels

class LevelStats {
	constructor(levelName, won, lost) {
		this.levelName = levelName;
		// this.levelHash =  // TODO store hash as well to recognise when level has changed
		this.won = won;
		this.lost = lost;
	}
}
