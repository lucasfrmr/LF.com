let bgColor = 'white'
let score = 0;
let typingTimer;
const typingDelay = 50; 
const numBarcodes = 5; // Number of barcodes
let speed = 7; 
let barcodes = [];
let barcodeCanvases = [];

let targetColor;

class Barcode {
	constructor(inputString, x, y, index) {
		this.inputString = inputString;
		this.x = x;
		this.y = y;
		this.vel = p5.Vector.random2D().mult(speed);
		this.canvasIndex = index;
	}

	move() {
		this.x += this.vel.x;
		this.y += this.vel.y;

		if (this.x < -400) {
			this.x = width;
		} else if (this.x > width) {
			this.x = -400;
		}
		if (this.y < -200) {
			this.y = height;
		} else if (this.y > height) {
			this.y = -200;
		}
	}

	generateBarcode() {
		JsBarcode(barcodeCanvases[this.canvasIndex].canvas, this.inputString, {
			width: 5,
			height: 25,
			displayValue: true,
			background: null,
			text: this.canvasIndex
		});
	}

	display() {
		image(barcodeCanvases[this.canvasIndex], this.x, this.y);
		
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	inputElement = createInput();
	inputElement.position(windowWidth/2, windowHeight/2);
	inputElement.input(startTypingTimer);
	inputElement.elt.focus();
	for (let i = 0; i < numBarcodes; i++) {
		const randomX = random(width);
		const randomY = random(height);

		// Create barcode canvases during setup
		barcodeCanvases[i] = createGraphics(400, 200);
		barcodeCanvases[i].clear();

		barcodes[i] = new Barcode(String(i), randomX, randomY, i);
		barcodes[i].generateBarcode();
	}
	bgColor = color(255); // Start with a white background
	targetColor = color(255); // The background is initially aiming to be white

}

function startTypingTimer() {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(myInputEvent, typingDelay);
}

function myInputEvent() {
  const inputValue = parseInt(inputElement.value());
  if (inputValue < numBarcodes && inputValue >= 0) {
    console.log('Input value is in array');
    targetColor = color('red');
    setTimeout(() => {
      targetColor = color('white');
    }, 100);
    score += 1;
  }
  inputElement.value('');
  inputElement.elt.focus();
}

function draw() {
	bgColor = lerpColor(bgColor, targetColor, 0.15);
	background(bgColor);
	// display score
	textSize(32);
	text(score, 10, 30);

	for (let barcode of barcodes) {
		barcode.display();
		barcode.move();
		
	}
	speed = map(score, 0, 100, 1, 20);
	// rect(random(windowWidth), random(windowHeight), random(500), random(500));
	// let speed = map(score, 0, 100, 7, 20);
}
