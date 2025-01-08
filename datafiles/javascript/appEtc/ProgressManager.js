import * as g from "../globals.js";
import LevelStats from "./LevelStats.js";

// This class manages storing statistics about games and which levels are unlocked

export default class ProgressManager {
	// Resets progress
	static reset() {
		let text = "Do you really want to reset your entire progress?";
		if (!confirm(text)) {
			return;
		}

		// TODO only clear progress (in case other things like settings are stored)
		g.storage.clear();

		alert("Your progress has been reset.");
	}

	static updateLevelStats(levelName, won) {
		let levelStats = g.storage.get(levelName);

		if (levelStats == undefined) {
			levelStats = new LevelStats(levelName, 0, 0);
		} else {
			levelStats = JSON.parse(levelStats);
		}

		if (won) {
			levelStats.won++;
		} else {
			levelStats.lost++;
		}

		g.storage.set(levelName, JSON.stringify(levelStats));
	}

	// Returns object of type LevelStats
	static getLevelStats(levelName) {
		let levelStats = g.storage.get(levelName);
		
		if (levelStats == undefined) {
			return new LevelStats(levelName, 0, 0);
		} else {
			return JSON.parse(levelStats);
		}
	}

	// Stores that `level` has been unlocked
	static unlockLevel(level) {
		
	}

	// @return {boolean} Whether `level` is unlocked
	static isUnlocked(level) {
		
	}

}
