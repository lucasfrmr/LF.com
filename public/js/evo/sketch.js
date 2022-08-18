var v;
var birds = [];
var canvas;



function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
 //v = new Vehicle(width/2, height/2);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  background(85, 107, 47);

  for(i = 0; i < 200; i++){
  	birds.push(new Vehicle(random(0, width), random(0, height)));
  }
}

function draw() {
  background(51);

  var mouse = createVector(mouseX, mouseY);

  // Draw an ellipse at the mouse position
  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(mouse.x, mouse.y, 48, 48);
	for (i = 0; i < birds.length; i++) {
    var v = birds[i];
 	  v.arrive(mouse);
      v.update();
      v.display();
  }
  // Call the appropriate steering behaviors for our agents


}