let points = []
let targets = []
let n;

function setup() {
  createCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  )
  n = random(36, 96)
  angleMode(DEGREES)
  if (random() > 0.5) {
    for (let i = 0; i < n; i++) {
      let v = createVector(
        map(i, 0, n-1, 0, 1),
        0.5 + random(-0.01, 0.01)
      )
      points.push(v.copy())
      targets.push(v.copy())
    }
  } else {
    for (let i = 0; i < n; i++) {
      let phase = map(i, 0, n-1, 0, 360)
      let v = createVector(
        0.5 + 0.25*sin(phase),
        0.5 + 0.25*cos(phase)
      )
      points.push(v.copy())
    }
 }
  
  
}

function draw() {
  for (let j = 0; j < points.length; j++) {
    const point = points[j]
    let around = []
    around = getNeighbors(point, 0.2)
    let repel = createVector(0, 0)
    
    for (let i = 0; i < around.length; i++) {
      p = points[around[i]]
      repel.add(
        p5.Vector.sub(point, p)
      )
    }
    repel.div(100)
    point.add(repel)
  }
  
  background(0, 0, 0)
  strokeWeight(width*0.005)
  // fill(255)
  noFill()
  stroke(255)
  beginShape()
  for (let i = 1; i < points.length; i++) {
    let prev_point = points[i-1]
    let point = points[i]
    
    
    curveVertex(
      map(prev_point.x, 0, 1, width*0.2, width*0.8),
      map(point.y, 0, 1, height*0.2, height*0.8)
    )
    curveVertex(
      map(point.x, 0, 1, width*0.2, width*0.8),
      map(point.y, 0, 1, height*0.2, height*0.8)
    )
    
  }
  endShape()
  
  // points.forEach((point, i) => {
  //   curveVertex(
  //     map(point.x, 0, 1, width*0.2, width*0.8),
  //     map(point.y, 0, 1, height*0.2, height*0.8)
  //   )
  // })
  
  
  
  point.x = min(max(point.x, 0), 1.0)
  point.y = min(max(point.y, 0), 1.0)
}

function windowResized() {
  resizeCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  );
}

function getNeighbors(point, radius) {
  let neighbors = []
  for (let i = 0; i < points.length; i++) {
    let p = points[i]
    let d = p5.Vector.sub(point, p).mag()
    if (d < radius) {
      neighbors.push(i)
    }
  }
  return neighbors
}

function mousePressed() {
  n = random(36, 96)
  points = []
  setup()
}