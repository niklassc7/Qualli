class LevelButton extends Button {
	constructor(text, x, y, width, height, level) {
		let onClick = () => room_goto(level);
		super(text, x, y, width, height, onClick, false);

		this.level = level;

		// TODO lock
		// TODO calculate font size
	}
}
