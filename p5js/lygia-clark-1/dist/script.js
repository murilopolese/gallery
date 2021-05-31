let t1, t2

function setup() {
  createCanvas(
    min(500, windowWidth),
    min(500, windowWidth)
  )
  angleMode(DEGREES)

  t1 = createVector(width/50, width/33)
  t2 = createVector(width/50, width/33)
}

function draw() {
  background(0)

  // t1.x = map(sin(frameCount), -1, 1, width*0.001, width*0.2)
  // t1.y = map(sin(frameCount*0.7), -1, 1, height*0.001, height*0.2)
  // t2.x = map(sin(frameCount*0.8), -1, 1, width*0.001, width*0.1)
  // t2.y = map(sin(frameCount), -1, 1, height*0.001, height*0.1)
  t1.x = map(mouseX, 0, width, width*0.001, width*0.2)
  t1.y = map(mouseY*0.7, 0, height, height*0.001, height*0.2)
  t2.x = map(mouseY*0.8, 0, height, width*0.001, width*0.1)
  t2.y = map(mouseX, 0, width, height*0.001, height*0.1)

  translate(width/2, height/2)
  stroke(0)
  fill(235, 235, 230)

  push()
  for (let i = 0; i < 4; i++) {
    rotate(90)
    triangle(
      width/2, 0,
      0, height/2,
      t1.x, t1.y
    )
  }
  pop()

  for (let i = 0; i < 4; i++) {
    rotate(90)
    triangle(
      width/2, 0,
      t1.x, t1.y,
      width/2-t2.x, height/2-t2.y
    )
  }

}

function windowResized() {
  resizeCanvas(
    min(500, windowWidth),
    min(500, windowWidth)
  );
}
