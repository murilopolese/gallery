const w = 2480
const h = 3508

let cols = 14*3
let res

function setup() {
  createCanvas(
    min(windowHeight, 600),
    min(windowHeight, 600)
  )
  angleMode(DEGREES)
  
  
  res = width / cols
}

function draw() {
  background(20)
  noFill()
  stroke(240)
  strokeWeight(3)
  
  translate(0, -height - frameCount%(22*res))
  
  
  drawCurve(18*res, res - 22*res)
  drawCurve(18*res, res)
  drawCurve(18*res, res + 22*res)
  drawCurve(18*res, res + 2*22*res)
  drawCurve(18*res, res + 3*22*res)
  drawCurve(18*res, res + 4*22*res)
  
  // stroke(250, 0, 0)
  // line(0, 0, 0, res)

}

function forward(n) {
  line(0, 0, 0, n)
  translate(0, n)
}

function back(n) {
  line(0, 0, 0, -n)
  translate(0, -n)
}

function left(n) {
  rotate(n)
}

function right(n) {
  rotate(-n)
}

function drawCurve(x, y) {
  push()
  translate(x, y)
  circle(0, 0, res/2)
  translate(-res/2, 0)
  
  left(90)
  forward(res/2)
  right(180)
  
  for(let i = 0; i < 4; i++) {
    left(90)
    forward(res)
    left(90)
    forward(5*res)
    right(90)
    forward(res)
    right(90)
    forward(4*res)
  }
  
  for(let i = 0; i < 4; i++) {
    left(90)
    forward(res)
    left(90)
    forward(4*res)
    right(90)
    forward(res)
    right(90)
    forward(5*res)
  }
  
  left(90)
  forward(4*res)
  right(90)
  forward(res)
  right(90)
  forward(4*res)
  left(90)
  forward(res)
  left(90)
  forward(5*res)
  
  for (let i = 0; i < 3; i++) {
    right(90)
    forward(res)
    right(90)
    forward(4*res)
    left(90)
    forward(res)
    left(90)
    forward(5*res)
  }
  
  right(90)
  
  for(let i = 0; i < 4; i++) {
    forward(5*res)
    left(90)
    forward(res)
    left(90)
    forward(4*res)
    right(90)
    forward(res)
    right(90)
  }
  
  forward(5*res)
  
  for(let i = 0; i < 3; i++) {
    left(90)
    forward(res)
    left(90)
    forward(5*res)
    right(90)
    forward(res)
    right(90)
    forward(4*res)
  }
  
  left(90)
  forward(res)
  left(90)
  forward(5*res)
  right(90)
  forward(res)
  left(90)
  forward(res)
  
  translate(0, res/2)
  circle(0, 0, res/2)
  pop()
}