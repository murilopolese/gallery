function shape(x, y, size) {
  push()
  translate(x, y)
  push()
    rotate(45)
    rect(0, 0, size, size)
  pop()
    fill('#171717')
    circle(0, 0, size*0.85, size*0.85)
    rect(0, -size/2, size*0.85, size)
  pop()
}

function setup() {
  createCanvas(300, 600)
  angleMode(DEGREES)
  rectMode(CENTER)
  
  
}

function draw() {
  background('#171717')
  fill('#eae4d9')
  noStroke()
  
  push()
  translate(width*0.5, height*0.9)
  for (let i = 0; i < 7; i++) {
    let size = (width*0.5) - map(i, 0, 7, 0, width*0.475)
    let diagonal = sqrt(sq(size) + sq(size))
    let dx = size/6
    let x = (1-((i%2)*2)) * dx
    // let x = sin(30*i+frameCount) * dx
    translate(x, -diagonal/2)
    shape(0, 0, size)
  }
  push()
    let size = (width*0.5) - map(6.5, 0, 7, 0, width*0.475)
    let diagonal = sqrt(sq(size) + sq(size))
    let dx = -size/6
    let x = dx
    // let x = sin(30*7+frameCount) * dx
    translate(x, -diagonal/2)
    push()
      rotate(45)
      rect(0, 0, size, size)
    pop()
  pop()
}