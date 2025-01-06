class Jelly extends SpriteObject {
	constructor(x, y, team, ziel, size=1) {
		super(x, y, 32, 21, spr_Raumschiff[team]);

		room.addObject(this); // Move to Superclass

		this.team = team;
		this.ziel = ziel; // TODO rename
		this.size = size;
		this.width *= size;
		this.height *= size;

		// Point that jelly is moving to initially when created, will adapt
		// direction gradually
		this.startX = x + (128 - Math.floor(Math.random() * 256)); // TODO rename
		this.startY = y + (128 - Math.floor(Math.random() * 256)); // TODO rename
		this.moveTowardsPoint(this.startX, this.startY, 2);

		this.targetX = this.ziel.x - this.ziel.ox + Math.random()*this.ziel.width;
		this.targetY = this.ziel.y - this.ziel.oy + Math.random()*this.ziel.height;

		// this.opt_swapScreen = 3; // TODO remove


		// TODO dont nest
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
				let acceleration = 0.03 + 0.4*Math.random();

				if(this.parent.speed < this.targetSpeed)
					this.parent.setSpeed(this.parent.speed + acceleration);

				let zDir = pointDirection(this.parent.x, this.parent.y, this.parent.targetX, this.parent.targetY);

				// TODO increase when large amounts are spawned
				let turnSpeed = 2 + 4*Math.random();

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
					this.destroy();
				}
			}
		}

		new StartHelper(this, 4 + 2 * Math.random());
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
			this.destroy();

			this.ziel.receiveJellies(this.size, this.team);
		}

		// Check if jelly collided with target
		// TODO check whole jelly width not just center
		// console.log(this.x, this.ox, this.y, this.oy);
		// console.log(this.ziel.x, this.ziel.ox, this.ziel.);


		// // TODO fix
		// if (pointInCircle(
		// 	this.x + this.ox,
		// 	this.y + this.oy,
		// 	this.ziel.x + this.ziel.ox,
		// 	this.ziel.y + this.ziel.oy,
		// 	this.ziel.width / 2
		// )){
		// 	this.destroy();

		// 	this.ziel.receiveJellies(this.size, this.team);
		// }
	}

	draw() {
		// TODO fix this
		// TODO rotation
		// TODO origin
		// TODO ellipsis
		let c = Colors.team[this.team];
		ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.025`;
		let maxr = Math.max(this.width, this.height);

		draw_circle(this.xD, this.yD, maxr * 2.7, false);
		draw_circle(this.xD, this.yD, maxr * 2.0, false);
		// draw_circle(this.xD, this.yD, maxr, false);

		super.draw();
	}
}
