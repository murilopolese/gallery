let a

function setup() {
  createCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  )
  background(30)
  stroke(200)
  fill(200)
  angleMode(DEGREES)
  
  a = createGraphics(width, width)
  a.stroke(200)
  a.fill(200)
  a.textSize(width)
  a.text('Â', width*0.27,width*0.95)
}

function draw() {
  background(30)
  for (let i = 0; i < 5; i++) {
    image(
      a, 
      (width/5)*i, 0, // position
      (width/5), width, // final size
      // crop origin
      map(
        sin(3*frameCount + i*30), 
        -1, 1, 
        (width/5)*i, (width/5)*i + (width/5)
      ), 
      0, 
      (width/5), width // crop size
    )
  }
  
}
