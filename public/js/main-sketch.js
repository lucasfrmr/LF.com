//GeoStar Sketch

var canvas;

var x, y, a, s, aslider;

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}

function setup(){
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	background(85, 107, 47);
	x = 0;
	y = 0;
	x1 = 10;
	y1 = -150;
	x2 = 150;
	y2 = 10;
	s = 0.08;
	r = 0;
	a = 0;
	s = 0.2;
}

function draw(){
translate(windowWidth/2, windowHeight/2);
rotate(a);
fill(255, 10);
triangle(mouseX, mouseY, x1, y1, x2, y2);
 a = a + 1; 
x = x - s;
/* y = y + s; */
/* x1 = x1 + s; */
y1 = y1 - s;
x2 = x2 + s;
/* y2 = y2 + s; */
}