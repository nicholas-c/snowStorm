class Snowflake {
	constructor(settings, height, width) {
		this.canvasHeight = height;
		this.canvasWidth = width;

		this.settings = settings;
		this.reset = this.reset;

		this.setup();
	}

	setup() {
		this.r = 1 + Math.random() * this.settings.size;
		this.o = 0.5 + Math.random() * 0.5;
	}

	reset(verticalReset = false) {
		if ( ! verticalReset) this.y = -this.r;
		this.x = Math.random() * this.canvasWidth;
		this.vy = ((1 + Math.random()) / 2) * this.settings.speed;
		this.vx = 0.5 - Math.random();
	}
}

export default Snowflake;
