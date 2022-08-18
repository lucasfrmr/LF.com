var canvas;
var droplets = [];
var dropAmount;

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	background(85, 107, 47);
    dropAmount = 50;
    x = 0;
    y = 0;
  
  
  for(i=0;i<dropAmount;i++){
    droplets.push(new Droplet());
  }
}

function draw() {
  for(i=0;i<droplets.length;i++){
  var drop = droplets[i];
    drop.show();
    drop.fall();
    drop.pnoise();
  
  }
  //text(droplets, width/2, height/2);
}