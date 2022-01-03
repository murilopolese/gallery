let points
let n = 30
let layer = 0
let colors

let distanceConnected = 1
let distanceVizinhos = 1

function getVizinhos(point, points, radius) {
  let vizinhos = []
  for (let i = 0; i < points.length; i++) {
    let p = points[i]
    let d = dist(p.x, p.y, point.x, point.y)
    if (d < radius) {
      vizinhos.push(i)
    }
  }
  return vizinhos
}

function setup() {
  points = []
  colors = [
    color(255, 255, 255)
  ]
  createCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  )
  for (let i = 0; i < n; i++) {
    points.push(
      createVector(
        map(i, 0, n-1, width*0.1, width*0.9),
        height*0.5 + random(-height*0.01, height*0.01)
      )
    )
  }
}

function draw() {
  background(0)
  strokeWeight(height*0.01)
  for (let i = 0; i < points.length; i++) {
    let point = points[i]
    let vizinhos = getVizinhos(point, points, width*0.2)
    let repulsion = createVector(0, 0)
    for (let j = 0; j < vizinhos.length; j++) {
      let vizinho = points[vizinhos[j]]
      if (vizinho === i) continue
      if (vizinho === i-1) continue
      if (vizinho === i+1) continue
      let d = p5.Vector.sub(point, vizinho)
      if (d.mag() > 0) {
        let inverse_d = 1 / d.mag()
        d.setMag(inverse_d)
        repulsion.add(d)
      }
    }
    repulsion.mult(width*0.05)
    point.add(repulsion)
  }
  for (let i = 1; i < points.length; i++) {
    let point = points[i]
    let prev_point = points[i-1]
    let d = p5.Vector.sub(point, prev_point)
    if (d.mag() > width*0.2) {
      let midPoint = p5.Vector.add(prev_point, d.div(2))
      points.splice(i, 0, midPoint)
    }
  }
    
  points = points.filter(function(point) {
    return point.x > 0 && point.x < width
        && point.y > 0 && point.y < height
  })
  
  // noFill()
  noStroke()
  // stroke(colors[0])
  beginShape()
  // vertex(0, 0)
  // vertex(0, 0)
  for (let i = 0; i < points.length; i++) {
    let point = points[i]
    curveVertex(point.x, point.y)
    // circle(point.x, point.y, 10)
  }
  // vertex(width, 0)
  // vertex(width, 0)
  endShape()
  
}

function windowResized() {
  resizeCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  )
}

function mouseClicked() {
  points.push(createVector(mouseX, mouseY))
}
function mouseDragged() {
  points.push(createVector(mouseX, mouseY))
}
function keyPressed() {
  if (key === ' ') {
    setup()
  }
}