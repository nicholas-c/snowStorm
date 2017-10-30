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

class SnowStorm {
	constructor(element, settings) {
		this.element = element;

		this.settings = {
			color: '#fff',
			speed: 1,
			size: 1,
			density: 2,
		}

		if (this.settings.density > 2) console.warn('Increasing density will decrease performance on lower end devices. Use with caution.');

		this.snowFlakes = [];
		this.active = false;
		this.version = this.getVersion();
		this.frame = 0;
		this.maxFlakes = false;

		new Promise((resolve, reject) => this.createCanvas(resolve, reject))
		.then(() => {
			this.active = true;
			this.bindEvents();
			this.updateCanvas();
		});
	}

	getVersion() {
		const currentVersion = '0.7.0';
		return `snowStorm version: ${currentVersion}`;
	}

	createCanvas(resolve, reject) {
		// TODO: Start based on page name, maybe URL... Or an array of URLs... Who knows.
		if (this.element instanceof HTMLElement) {
			const canvasElement = document.createElement('canvas');

			canvasElement.style.position = 'absolute';
			canvasElement.style.left = canvasElement.style.top = '0';
			canvasElement.style.zIndex = 101;
			canvasElement.style.pointerEvents = 'none';

			this.canvas = canvasElement;
			this.context = this.canvas.getContext('2d');

			this.resize();
			this.element.append(this.canvas);

			resolve();
		} else {
			console.error('Feed me single elements, I\'m being lazy!');
			reject();
		}
	}

	createSnowflakes(quantity) {
		// Every snowflake is unique.
		for (let i = 0; i < quantity; i++) {
			const snowflake = new Snowflake(this.settings, this.canvas.height, this.canvas.width);

			snowflake.reset();

			this.snowFlakes.push(snowflake);
		}

		return true;
	}

	bindEvents() {
		window.addEventListener('resize', () => this.resize());
	}

	updateCanvas() {
		let PI2 = Math.PI * 2;

		if (! this.active) return;
		if (this.snowFlakes.length < 150 && this.frame++ % (7 / (this.settings.density * -1)) == 0) this.createSnowflakes(1);

		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.context.fillStyle = '#fff';

		this.snowFlakes.forEach(snowflake => {
			snowflake.y += snowflake.vy;
			snowflake.x += snowflake.vx;

			this.context.globalAlpha = snowflake.o;
			this.context.beginPath();
			this.context.arc(snowflake.x, snowflake.y, snowflake.r, 0, PI2, false);
			this.context.closePath();
			this.context.fill();

			if (snowflake.x < 0 || snowflake.x > this.canvas.width || snowflake.y > this.canvas.height) snowflake.reset();
		});

		requestAnimationFrame(() => this.updateCanvas());
	}

	reset() {
		this.snowFlakes = [];
	}

	resize() {
		this.canvas.width = this.element.clientWidth;
		this.canvas.height = this.element.clientHeight;

		this.snowFlakes.forEach(el => {
			el.canvasHeight = this.canvas.height;
			el.canvasWidth = this.canvas.width;
			el.reset(true);
		});

		return true;
	}

	destroy() {
		// TODO: Remove all instance based things, timer and eventListners; THEN remove the object/class itself
		this.active = false;
		this.canvas.remove();
		console.warn('Goodbye.');
	}

	pause() {
		if (this.active) {
			this.active = false;
			return 'The storm has been stopped.';
		} else return 'The storm has already stopped.';
	}

	resume() {
		if ( ! this.active) {
			this.active = true;
			this.updateCanvas();
			return 'Winter is coming...'
		} else return 'A storm is already in progress.';
	}
}

document.addEventListener('DOMContentLoaded', () => {
	window.snowstorm = new SnowStorm(document.querySelector('section'));
});
