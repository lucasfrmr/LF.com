let numSquares = 100; // number of squares
let squares = []; // array to hold squares

function setup() {
  createCanvas(windowWidth, windowHeight);
  // create squares
  for (let i = 0; i < numSquares; i++) {
    let x = random(width);
    let y = random(height);
    let squareSize = random(20, 200);
    squares.push(new Square(x, y, squareSize));
  }
}

function draw() {
  // background(255);
  // move and display squares
  for (let i = 0; i < numSquares; i++) {
    squares[i].move();
    squares[i].display();
    // check for collisions with other squares
    for (let j = i + 1; j < numSquares; j++) {
      if (squares[i].collide(squares[j])) {
        squares[i].diffuse();
        squares[j].diffuse();
      }
    }
  }
}

// Square class
class Square {
  constructor(x, y, size) {
    this.pos = createVector(x, y); // position
    this.vel = p5.Vector.random2D(); // velocity
    this.size = size; // size
  }

  // move the square
  move() {
    this.pos.add(this.vel);
    // bounce off edges
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  // display the square
  display() {
    rectMode(CENTER);
    fill(255, 0, 0);
    rect(this.pos.x, this.pos.y, this.size, this.size);
  }

  // check for collision with another square
  collide(other) {
    let distance = this.pos.dist(other.pos);
    let minDistance = this.size / 2 + other.size / 2;
    return distance < minDistance;
  }

  // diffuse the square
  diffuse() {
    let angle = random(TWO_PI);
    let magnitude = random(2, 5);
    this.vel = p5.Vector.fromAngle(angle, magnitude);
  }
}
