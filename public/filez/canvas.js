// Create a new div element
const canvas = document.createElement('div');

// Set the ID of the div element to a unique value
canvas.id = 'my-canvas';

// Position the div element absolutely at the top of the page
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';

// Set the pointer-events property to none
canvas.style.pointerEvents = 'none';

// Add the div element to the body of the page
document.body.appendChild(canvas);

// Create a new div element
const parentDiv = document.createElement('div');

// Create a new SVG element
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

// Set the width and height of the SVG element
svg.setAttribute('width', '200');
svg.setAttribute('height', '200');

// Create a new circle element
const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

// Set the attributes of the circle element
circle.setAttribute('cx', '100');
circle.setAttribute('cy', '100');
circle.setAttribute('r', '50');
circle.setAttribute('fill', 'blue');

// Add the circle element to the SVG element
svg.appendChild(circle);

// Add the SVG element to the parent div element
parentDiv.appendChild(svg);

// Add the parent div element to the document body
document.body.appendChild(parentDiv);


// Add event listeners to the SVG elements inside the canvas
svg.addEventListener('mousedown', (event) => {
  // Handle mouse down events inside the canvas
  console.log('444x');
});

svg.addEventListener('mouseup', (event) => {
  // Handle mouse up events inside the canvas
});

// Add other event listeners as needed
console.log('d');