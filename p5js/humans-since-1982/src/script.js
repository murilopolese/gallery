const ROWS = 16
const COLS = 16
let clocks = []
let res

function setup() {
  createCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  )
  angleMode(DEGREES)
  res = width/COLS
  
  for (let y = 0; y < ROWS; y++) {
    clocks[y] = []
    for (let x = 0; x < COLS; x ++) {
      clocks[y][x] = createVector(x*10, y*10)
    }
  }
}

function update() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      // Prime numbers <3
      clocks[y][x].x += .13
      clocks[y][x].y += .31
    }
  }
}

function draw() {
  background(0)
  update()
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      push()
      translate(
        map(x, 0, COLS-1, width*0.15, width*0.85), 
        map(y, 0, ROWS-1, width*0.15, width*0.85)
      )
      
      let l = 0.5 * width*0.85/COLS
      let w = 0.1 * width*0.85/COLS
      stroke(200)
      strokeWeight(w)
      
      line(0, 0, l*sin(clocks[y][x].x), l*cos(clocks[y][x].x))
      line(0, 0, l*sin(clocks[y][x].y), l*cos(clocks[y][x].y))
      pop()
    }
  }
}

function windowResized() {
  resizeCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  )
}