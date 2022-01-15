
let theShader

let points = []
let n = 30
let layer = 0
let counter = 0

function preload(){
  theShader = loadShader('shader.vert', 'shader.frag');
}

function getVizinhos(point, points, radius) {
  let vizinhos = []
  for (let i = 0; i < points.length; i++) {
    let p = points[i]
    let d = p5.Vector.sub(point, p).mag()
    if (d < radius) {
      vizinhos.push(i)
    }
  }
  return vizinhos
}

function setup() {
  createCanvas(
    min(500, windowWidth),
    min(500, windowHeight),
    WEBGL
  )
  angleMode(DEGREES)

  points = []
  let offset = random(360)
  let range_x = random(0.0, 0.1)
  let range_y = random(0.0, 0.1)
  for (let i = 0; i < n; i++) {
    let phase = map(i, 0, n, 0, 360)
    points.push(
      createVector(
        map(sin(offset+phase), -1, 1, (0.5-range_x), (0.5+range_x)),
        map(cos(offset+phase), -1, 1, (0.5-range_y),  (0.5+range_y))
      )
    )
  }
}

function update() {
  counter += 1
  for (let i = 0; i < points.length; i++) {
    let point = points[i]
    let vizinhos = getVizinhos(point, points, 0.11)
    let repulsion = createVector(0, 0)
    let attraction = createVector(0, 0)
    for (let j = 1; j < vizinhos.length-1; j++) {
      let vizinho = points[vizinhos[j]]
      if (vizinhos[j] === i) continue
      if (vizinhos[j] === i-1) continue
      if (vizinhos[j] === i+1) continue
      let d = p5.Vector.sub(point, vizinho)
      if (d.mag() > 0) {
        counter = 0
        let inverse_d = 1 / d.mag()
        d.setMag(inverse_d)
        repulsion.add(d)
      }

    }
    repulsion.mult(0.000025)
    point.add(repulsion)

  }

  // for (let i = 1; i < points.length; i++) {
  //   let point = points[i]
  //   let prev_point = points[i-1]
  //   let d = p5.Vector.sub(point, prev_point)
  //   if (d.mag() > 0.2) {
  //     let midPoint = p5.Vector.add(prev_point, d.div(2))
  //     points.splice(i, 0, midPoint)
  //   }
  // }
  points = points.filter(function(point) {
    return point.x > 0 && point.x < 1
        && point.y > 0 && point.y < 1
  })
  // points.slice(0, n)
}
function draw() {
  let shaderPoints = points.reduce((acc, vec) => {
    acc.push(vec.x)
    acc.push(vec.y)
    return acc
  }, [])

  theShader.setUniform('n', parseInt(n))
  theShader.setUniform('points', shaderPoints)
  theShader.setUniform('u_time', millis()/1000);
  theShader.setUniform("u_resolution", [width*pixelDensity(), height*pixelDensity()]);
  theShader.setUniform("u_mouse", [mouseX*pixelDensity(), mouseY*pixelDensity()]);
  shader(theShader)
  quad(-1, -1, 1, -1, 1, 1, -1, 1)

  update()
  if (counter > 200) restart()
}

function windowResized(){
  resizeCanvas(
    min(500, windowWidth),
    min(500, windowHeight)
  )
}

function keyPressed() {
  if (key === ' ') restart()
}

function mousePressed() {
  addPoint()
}
function mouseDragged() {
  addPoint()
}

function addPoint() {
  points = [
    createVector(
      mouseX/width,
      1-(mouseY/height)
    )
  ].concat(points.slice(0, n-1))
}

function restart() {
  points = []
  for (let i = 0; i < n; i++) {
    points.push(createVector())
  }
  let offset = random(360)
  let range_x = random(0.005, 0.01)
  let range_y = random(0.005, 0.01)
  for (let i = 0; i < n; i++) {
    let phase = map(i, 0, n-1, 0, 360)
    points.push(
      createVector(
        map(sin(offset+phase), -1, 1, (0.5-range_x), (0.5+range_x)),
        map(cos(offset+phase), -1, 1, (0.5-range_y),  (0.5+range_y))
      )
    )
  }
}
