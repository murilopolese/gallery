function shape(x, y, size, n) {
  circle(x, y, size)
  noFill()
  for(let i = 1; i < n+1; i++) {
    let w = size-i*(width/30)
    arc(x, y, w, w, 0, 180)
  }
}

function setup() {
  createCanvas(600, 600)
  angleMode(DEGREES)
}

let x = 0
let y = 0

function draw() {
  x = lerp(x, map(mouseX, 0, width, -10, 10), 0.1)
  y = lerp(y, map(mouseY, 0, height, -10, 10), 0.1)
  background(0)
  stroke(255)
  strokeWeight(1)
  translate(width/2, height/2)
  fill(0)
  
  push()
  shape(-50+x, 60+y, width*1.45, 18)
  pop()
  
  push()
  rotate(180)
  shape(-width*0.175-x, -width*0.05-y, width*0.95, 9)
  pop()
  
  push()
  rotate(-90)
  shape(-width*0.05+x, 0-x, width*0.6, 9)
  pop()
  
  push()
  rotate(90)
  shape(-width*0.05-x, 0+y, width*0.4, 4)
  pop()
  
  push()
  shape(0, 0, width*0.3)
  pop()
}