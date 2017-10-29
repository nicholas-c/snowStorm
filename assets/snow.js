class Snowflake {
	constructor(settings, height, width) {
		this.canvasHeight = height;
		this.canvasWidth = width;

		this.settings = settings;
		this.update = this.update;
	}

	update() {
		this.y = Math.random() * this.canvasHeight;
		this.x = Math.random() * this.canvasWidth;
		this.vy = ((1 + Math.random()) / 2) * this.settings.speed;
		this.vx = 0.5 - Math.random();
		this.r = 1 + Math.random() * this.settings.size;
		this.o = 0.5 + Math.random() * 0.5;
	}
}

class SnowStorm {
	constructor(element, settings) {
		this.element = element;

		this.settings = {
			color: '#fff',
			speed: 1,
			size: 1,
			particleMax: 350,
		}

		this.snowFlakes = [];
		this.active = false;
		this.version = this.getVersion();

		new Promise((resolve, reject) => 	{
			this.createCanvas(resolve, reject);
		}).then((resolve, reject) => {
			this.createSnowflakes(resolve, reject);
		}).then(() => {
			this.updateCanvas();
		});
	}

	getVersion() {
		const currentVersion = '0.2.0';

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
			this.element.append(this.canvas);
			resolve();
		} else {
			console.error('Feed me single elements, I\'m being lazy!');
			reject();
		}
	}

	createSnowflakes() {
		// Every snowflake is unique.
		for (let i = 0; i < this.settings.particleMax; i++) {
			const snowflake = new Snowflake(this.settings, this.canvas.height, this.canvas.width);

			snowflake.update();

			this.snowFlakes.push(snowflake);
		}
	}

	updateCanvas() {
		if ( ! this.active) return;

		this.canvas.width = this.element.clientWidth;
		this.canvas.height = this.element.clientHeight;

		this.context.clearRect(0, 0, this.canvas.height, this.canvas.width);

		for (let i = 0; i < this.snowFlakes; i++) {
			const snowflake = this.snowFlakes[i];

			snowflake.y += snowflake.vy;
			snowflake.x += snowflake.vx;

			this.context.globalAlpha = snowflake.o;
			this.context.beginPath();
			this.context.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
			this.context.closePath();
			this.context.fill();

			if (snowflake.y > this.canvas.height) snowflake.update();
		}

		requestAnimFrame(this.updateCanvas());
	}

	reset() {

	}

	destroy() {

	}

	pause() {
		if (this.active) {
			this.active = false;
			return 'The storm has been stopped.';
		} else {
			return 'The storm has already stopped.';
		}
	}

	resume() {
		if ( ! this.active) {
			this.active = true;
			return 'Winter is coming...'
		} else {
			return 'A storm is already in progress.';
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const snowstorm = new SnowStorm(document.querySelector('section'));

	console.log(snowstorm);
});
