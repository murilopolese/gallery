let blue = '#1b85eb'
let black = '#1e0a18'
let yellow = '#f4ed45'
let margin = 50


function Box(x, y, w, h, a) {
  this.size = createVector(w, h)
  this.pos = createVector(x, y)
  this.angle = a
  this.poly = []
  this.offset = random(-10, 10)
  this.color = random(0, 100) > 90 ? yellow : blue
  // base vector
  this.vec = [
    createVector(this.size.x/2, this.size.y/2),
    createVector(-this.size.x/2, this.size.y/2),
    createVector(-this.size.x/2, -this.size.y/2),
    createVector(this.size.x/2, -this.size.y/2)
  ]
  // vec.rotate(this.angle)
  // temporary vector
  for (let i = 0; i < 4; i++) {
    let tv = this.vec[i].copy()
    tv.rotate(this.angle)
    tv.add(this.pos)
    this.poly.push(tv)
  }

  this.draw = function() {
    push()
    fill(this.color)
    stroke(black)
    beginShape()
    for (let i in this.poly) {
      let v = this.poly[i]
      vertex(v.x, v.y)
    }
    endShape()
    pop()
  }

  this.drawBg = function() {
    push()
    fill(black)
    stroke(black)
    translate(this.pos.x, this.pos.y)
    rotate(this.angle + this.offset)
    beginShape()
    for (let i in this.poly) {
      let v = this.vec[i]
      vertex(v.x*2, v.y*1.5)
    }
    endShape()
    pop()
  }

  this.isColliding = function(world) {
    return world.find((box) => {
      return collidePolyPoly(this.poly, box.poly, true)
    })
  }
}

let boxes = []
let tries = 0
let minSize, maxSize

function setup() {
  createCanvas(
    // windowWidth,
    windowHeight,
    windowHeight
  )
  angleMode(DEGREES)

  minSize = createVector(windowHeight/35, windowHeight/17)
  maxSize = createVector(windowHeight/15, windowHeight/7)
}

function draw() {
  background(blue)
  boxes.forEach(b => b.drawBg())
  boxes.forEach(b => b.draw())
  if (boxes.length < 200) {
    let b = new Box(
      random(windowHeight/7, width-(windowHeight/7)),
      random(windowHeight/7, height-(windowHeight/7)),
      maxSize.x, maxSize.y,
      random(0, 360)
    )
    if (!b.isColliding(boxes)) {
      boxes.push(b)
      tries = 0
    } else {
      tries++
    }
    if (tries > 100) {
      maxSize.x = max(minSize.x, maxSize.x - windowHeight/7000)
      maxSize.y = max(minSize.y, maxSize.y - windowHeight/7000)
    }
    maxSize.x = max(minSize.x, maxSize.x - 0.05)
    maxSize.y = max(minSize.y, maxSize.y - 0.05)
  }
}
