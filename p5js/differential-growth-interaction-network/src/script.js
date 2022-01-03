let points = []
let n = 50

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
  createCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  )
  for (let i = 0; i < n; i++) {
    points.push(
      createVector(
        random(width*0.45, width*0.55),
        random(height*0.45, height*0.55)
      )
    )
  }
}

function draw() {
  background(0)
  stroke(255)
  fill(255)
  
  for (let i = 0; i < points.length; i++) {
    let point = points[i]
    let vizinhos = getVizinhos(point, points, 50)
    let repulsion = createVector(0, 0)
    for (let j = 0; j < vizinhos.length; j++) {
      let vizinho = points[vizinhos[j]]
      if (vizinho === i) continue
      let d = p5.Vector.sub(vizinho, point)
      repulsion.add(d)
      line(vizinho.x, vizinho.y, point.x, point.y)
    }
    repulsion.div(-vizinhos.length*100)
    // line(point.x, point.y, point.x+repulsion.x, point.y+repulsion.y)
    point.add(repulsion)
  }
  
  for (let i = 0; i < points.length; i++) {
    let point = points[i]
    push()
    translate(point.x, point.y)
    circle(0, 0, 3)
    pop()
  }
}

function windowResized() {
  resizeCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  )
}

function mouseClicked() { points.push(createVector(mouseX, mouseY))
}

function mouseDragged() { points.push(createVector(mouseX, mouseY))
}