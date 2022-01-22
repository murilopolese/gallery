let { Graph } = window.graphlib
let W = 160
let H = 160

// let g

function irandom(start, end) {
  if (!end) {
    return int(random(start))
  } else {
    return int(random(start, end))
  }
}

function setup() {
  createCanvas(
    min(500, windowWidth),
    min(500, windowHeight)
  )
  background(0)
  noStroke()
  // noLoop()
  frameRate(1)
  draw()

}

function draw() {
  background(0)
  W = H = irandom(4, 32)
  // H = irandom(4, 32)
  let r = width / (2 * Math.max(W, H) )

  const g = new Graph({
    directed: false
  })

  for (let x = 0; x < W; x++) {
    for (let y = 0; y < H; y++) {
      g.setNode(`${x}x${y}`, { x, y })
    }
  }

  for (let x = 1; x < W-1; x++) {
    for (let y = 1; y < H-1; y++) {
      let nodeLabel = `${x}x${y}`
      let eX = x
      let eY = y
      switch(irandom(4)) {
        case 0: eY -= 1; break
        case 1: eX += 1; break
        case 2: eY += 1; break
        case 3: eX -= 1; break
      }
      let edgeLabel = `${eX}x${eY}`
      g.setEdge(nodeLabel, edgeLabel)
    }
  }

  fill(255)
  stroke(255)
  strokeWeight(r)
  for (let x = 0; x < W; x++) {
    for (let y = 0; y < H; y++) {
      let label = `${x}x${y}`
      let neighbors = g.neighbors(label)
      let neighborsPos = neighbors.map(n => g.node(n))

      for (let i = 0; i < neighborsPos.length; i++) {
        let pos = neighborsPos[i]
        line(
          map(x, 0, W-1, width*0.1, width*0.9),
          map(y, 0, H-1, height*0.1, height*0.9),
          map(pos.x, 0, W-1, width*0.1, width*0.9),
          map(pos.y, 0, H-1, height*0.1, height*0.9)
        )
      }
    }
  }
}

function mousePressed() {
  setup()
  draw()
}

function windowResized(){
  resizeCanvas(
    min(500, windowWidth),
    min(500, windowHeight)
  )
  draw()
}
