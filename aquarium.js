let fishX, fishY, fishSize;
let fishX2, fishY2, fishSize2, fishColor2
let fishColor;
let aquariumName = "My Aquarium";
let foodX, foodY;
let foodDropped = false;
let bubbles = [];


function setup() {
  createCanvas(800, 600);
  fishX2 = 100
  fishY2 = 50
  fishSize2 = 40
  fishColor2 = 'yellow'
  fishX = width / 2;
  fishY = height / 2;
  fishSize = 50;
  fishColor = color(200, 100, 100);


  // Initialize bubbles
  for (let i = 0; i < 20; i++) {
    bubbles.push({
      x: random(width),
      y: random(height),
      size: random(5, 15)
    });
  }
}


function draw() {
  background(50, 150, 200);

  fill(fishColor2)
  ellipse(fishX2,fishY2,fishSize2,fishSize2/2)
  triangle(fishX2 - fishSize2 / 2, fishY2, fishX2 - fishSize2, fishY2 - fishSize2 / 4, fishX2 - fishSize2, fishY2 + fishSize2 / 4)
 
  // Display aquarium name
  textSize(24);
  fill(255);
  text(aquariumName, 10, 30);
 
  // Draw fish
  fill(fishColor);
  ellipse(fishX, fishY, fishSize, fishSize / 2);
  triangle(fishX - fishSize / 2, fishY, fishX - fishSize, fishY - fishSize / 4, fishX - fishSize, fishY + fishSize / 4);


  // Fish follows mouse
  fishX = lerp(fishX, mouseX, 0.05);
  fishY = lerp(fishY, mouseY, 0.05);


  // Draw bubbles
  for (let i = 0; i < bubbles.length; i++) {
    fill(255, 255, 255, 150);
    noStroke();
    ellipse(bubbles[i].x, bubbles[i].y, bubbles[i].size);
    bubbles[i].y -= 1;


    // Reset bubble to bottom if it goes off the top
    if (bubbles[i].y < 0) {
      bubbles[i].y = height;
    }
    
    if(keyIsDown(LEFT_ARROW)){
      fishX2 -= 0.3
    }
    if(keyIsDown(RIGHT_ARROW)){
      fishX2 +=0.3
    }
    if(keyIsDown(UP_ARROW)){
      fishY2 -=0.3
    }
    if(keyIsDown(DOWN_ARROW)){
      fishY2 +=0.3
    }
  }
 
  // Draw food
  if (foodDropped) {
    fill(255, 204, 0);
    ellipse(foodX, foodY, 10, 10);
    foodY += 2;
    if (foodY > height) {
      foodDropped = false;
    }
  }
 
  // Check if fish is near food
  if (dist(fishX, fishY, foodX, foodY) < fishSize / 2 && foodDropped) {
    fishColor = color(100, 200, 100);
    foodDropped = false;
  } else {
    fishColor = color(200, 100, 100);
  }
  if (dist(fishX2, fishY2, foodX, foodY) < fishSize2 / 2 && foodDropped) {
    fishColor2 = 'red';
    foodDropped = false;
  } else {
    fishColor2 = 'yellow';
  }
}


function keyPressed() {
  // Drop food
  if (key === 'F' || key === 'f') {
    foodX = random(width);
    foodY = 0;
    foodDropped = true;
  }
}


