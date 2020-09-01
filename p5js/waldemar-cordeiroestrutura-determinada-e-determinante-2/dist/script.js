function setup() {
  createCanvas(
    min(500, windowHeight),
    min(500, windowHeight)
  )
  angleMode(DEGREES)
  noFill()
  background('#bbbfc3')
  stroke('#fbf8f3')
  strokeWeight(width/200)
}

function group(x, y, measure) {
  push()
  
  translate(x, y)
  let h = Math.hypot(measure, measure)
  
  push()
  rotate(45)
  square(0, 0, measure)
  pop()
  
  push()
  translate(-h/2, h/2)
  triangle(
    0, 0, 
    0, 2*h, 
    h, h
  )
  pop()
  
  push()
  translate(h/2, h/2)
  triangle(
    0, 0, 
    0, (h)+h/2.5, 
    (h/2)+h/5, (h/2)+h/5
  )
  pop()
  
  pop()
}

function draw() {
  background('#bbbfc3')
  scale(1, -1)
  translate(0, -height)
  
  translate(0, height/20)
  let measure = width/30
  let h = Math.hypot(measure, measure)
  group(width/2, 0, measure)
  
  for (let i = 0; i < 3; i++) {
    scale(-1, 1)
    translate(-width, 2*h)
    translate(-h/4, -h/4)
    measure *= 1.5
    h = Math.hypot(measure, measure)
    group(width/2, 0, measure)
  }
  
  scale(-1, 1)
  translate(-width, 2*h)
  translate(-h/3.75, -h/3.75)
  translate(width/2, 0)
  rotate(45)
  measure *= 1.55
  square(0, 0, measure)
  
}