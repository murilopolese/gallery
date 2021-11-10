const yellow = '#f6c100'
const white = '#dbdfd5'
const black = '#4d3612'

function setup() {
  createCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  )
}

function draw() {
  background(yellow)
  noFill()
  
  strokeWeight(width*0.0075)
  let size = (width/4)*0.8
  // let offset = map(mouseX, 0, width, width*0.04, width*0.07)
  let offset = width*0.07
  let margin = createVector(width*0.13, width*0.075)
  
  stroke(white)
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y <= 5-x; y++) {
      line(
        margin.x + x*size,
        margin.y + y*size,
        margin.x + x*size - offset,
        margin.y + y*size + offset
      )
    }
  }
  
  stroke(black)
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4-x; y++) {
      square(
        margin.x + x*size,
        margin.y + y*size,
        size
      )
    }
  }
  
  stroke(black)
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4-x; y++) {
      square(
        margin.x + x*size - offset,
        margin.y + y*size + offset,
        size
      )
    }
  }
}

function windowResized() {
  resizeCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  );
}