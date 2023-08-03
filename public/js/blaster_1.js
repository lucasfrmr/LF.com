let bgColor = 'white'
let a = 0;
const numArray = [1, 2, 3, 4, 5, 6];
const numBarcodes = 3; // Number of barcodes on the canvas
const speed = 0.1; // Speed factor for barcodes
let barcodes = [];

class Barcode {
  constructor(inputString, x, y) {
    this.inputString = inputString;
    this.x = x;
    this.y = y;
    this.vel = p5.Vector.random2D().mult(speed);
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

  display() {
    let barcodeCanvas = createGraphics(400, 200);
    barcodeCanvas.clear();
    JsBarcode(barcodeCanvas.canvas, this.inputString, {
      width: 50,
      height: 25,
      displayValue: true,
      background: null
    });
    image(barcodeCanvas, this.x, this.y);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // noCursor();
  let inp = createInput('');
  inp.position(windowWidth/2, windowHeight/2);
  inp.size(100);
  inp.input(myInputEvent);

  for (let i = 0; i < numBarcodes; i++) {
    const randomIndex = floor(random(numArray.length));
    const randomX = random(width);
    const randomY = random(height);
    barcodes.push(new Barcode(numArray[randomIndex], randomX, randomY));
  }
}

function myInputEvent() {
  const inputValue = parseInt(this.value());
  const isInputValueInArray = checkIfNumInArray(inputValue, numArray);

  if (isInputValueInArray) {
    bgColor = 'green';
    setTimeout(() => {
      bgColor = 'white';
    }, 100);
  }
  this.clear();
}

function checkIfNumInArray(num, array) {
  return array.includes(num);
}

barcode.display();
barcode.move();

function draw() {
  background(0, 0, a, 18);
  for (let barcode of barcodes) {
    rect(random(windowWidth), random(windowHeight), random(50), random(50));
  }
  a += 0.5;
  if(a >= 255){
    a -= 0.5;
  }
}
