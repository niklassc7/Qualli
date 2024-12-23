class Jelly extends Object {
	constructor(x, y, team, ziel) {
		super();

		room.addObject(this); // Move to Superclass

		this.x = x;
		this.y = y;
		this.ziel = ziel; // TODO rename

		// TODO rename? → express intent, what it does (accelerator or something)
		// increases speed and corrects direction until it is done and then deletes itself
		// this reduces operations after getting to the targetSpeed and right direction
		class StartHelper extends IObjlistentry {
			constructor(parent, targetSpeed) {
				super();
				this.parent = parent;
				this.targetSpeed = targetSpeed;
				room.addObject(this);
			}

			draw() {}

			step() {
				let acceleration = 0.05;

				if(this.parent.speed < this.targetSpeed)
					this.parent.setSpeed(this.parent.speed + acceleration);

				let zDir = pointDirection(this.parent.x, this.parent.y, this.parent.ziel.x, this.parent.ziel.y);

				let turnSpeed = 4;

				let positiveTurnDistance = mMod(zDir - this.parent.direction, 360); // clockwise
				let negativeTurnDistance = mMod(this.parent.direction - zDir, 360); // anticlockwise

				if(positiveTurnDistance <= turnSpeed || negativeTurnDistance <= turnSpeed)
					this.parent.setDirection(zDir);
				else
					if(positiveTurnDistance < negativeTurnDistance) {
						this.parent.setDirection(this.parent.direction + turnSpeed);
					} else {
						this.parent.setDirection(this.parent.direction - turnSpeed);
					}

				if(Math.abs(zDir - this.parent.direction) <= turnSpeed && Math.abs(this.parent.speed - this.targetSpeed) <= acceleration) {
					this.parent.setSpeed(this.targetSpeed);
					this.parent.setDirection(zDir);
					room.destroyObject(this);
				}
			}
		}

		this.width = 32;
		this.height = 21;
		this.team = team;
		this.sprite = spr_Raumschiff[this.team];


		this.startX = x + (128 - Math.floor(Math.random() * 256));
		this.startY = y + (128 - Math.floor(Math.random() * 256));
		this.moveTowardsPoint(this.startX, this.startY, 2);
		new StartHelper(this, 5);

	}

	step(){
		super.step();

		// Check if jelly collided with target
		if (rectangle_in_rectangle(
			this.x - (this.width/2),
			this.y - (this.height/2),
			this.x + (this.width/2),
			this.y + (this.height/2),
			this.ziel.x - (this.ziel.width/2),
			this.ziel.y - (this.ziel.height/2),
			this.ziel.x + (this.ziel.width/2),
			this.ziel.y + (this.ziel.height/2)
		)){
			room.destroyObject(this);
			if (this.ziel.team !== this.team) {
				this.ziel.einheiten--;
				if (this.ziel.einheiten <= 0)
					this.ziel.team = this.team;
			} else {
				this.ziel.einheiten++;
			}
		}
	}
}
