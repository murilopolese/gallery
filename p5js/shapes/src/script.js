function setup() {
  createCanvas(
    min(600, windowWidth), 
    min(600, windowWidth)
  )
  angleMode(DEGREES)
  noCursor()
}

let angle = 0
function draw() {
  background(0)
  randomSeed(0)
  let i = 0
  fill(255)
  stroke(255)
  push()
  // scale(2)
  // translate(-width/4, -height/4)
  beginShape()
  while( i < 20 ) {
    vertex(
      // Dancing thing
      // noise(i/100 + mouseX/500) * width,
      // noise(i/100 + mouseY/500) * height
      // Dentinho
      // noise(i/10 + mouseX/100) * width,
      // noise(i/10 + mouseY/100) * height
      // Start with a line
      // noise(i + mouseX/100) * width,
      // noise(i + mouseY/100) * height
      // COOL shapes
      // noise(i + mouseX/100) * width,
      // noise(100 + i + mouseY/100) * height
      // COOL shapes with movement
      noise(
        i + (sin(angle + i) * 0.1) + mouseX/100
      ) * width,
      noise(
        i+100 + (cos(angle + i) * 0.1) + mouseY/100
      ) * height
    )
    i++
    angle += 0.1
  }
  endShape()
  pop()
}