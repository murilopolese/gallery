function setup() {
  createCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  )
  angleMode(DEGREES)
  noLoop()
}

function draw() {
  background(0)
  
  // RED
  push()
  noStroke()
  fill('#953730')
  for (let i = 0; i < 80; i++) {
    push()
    translate(
      width*0.35, 
      height*0.015 + height*0.1+(i*height*0.01)
    )
    rotate(-1.8)
    rect(
      0, 0,
      width*0.6, width*0.005
    )
    pop()
  }
  pop()
  
  
  // GREEN
  push()
  noStroke()
  fill('#31864d')

  for (let i = 0; i < 80; i++) {
    push()
    translate(
      width*0.2, 
      -height*0.005 + height*0.1+(i*height*0.01)
    )
    rotate(-1.0)
    rect(
      0, 0,
      width*0.6, width*0.005
    )
    pop()
  }
  pop()
  
  
  // BLUE
  push()
  noStroke()
  fill('#272f71')
  for (let i = 0; i < 80; i++) {
    push()
    translate(
      width*0.05, 
      height*0.1+(i*height*0.01)
    )
    rect(
      0, 0,
      width*0.6, width*0.005
    )
    pop()
  }
  pop()
}

function windowResized() {
  resizeCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  );
  draw()
}