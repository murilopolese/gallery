let { Graph, alg } = window.graphlib
let g // Global reference to graph
let WIDTH = 32

function setup() {
  createCanvas(min(windowHeight,600), min(windowHeight,600))
  ellipseMode(CENTER)
  // Create latice
  g = createLatice(WIDTH, WIDTH)
  // Generate edges
  generatePlough()
  // noLoop()

  // for (let i = 0; i < 1024*4; i++) {
  //   backbite()
  // }
  // frameRate(25)
}

function draw() {
  // Draw lattice
  background(200)

  // // Draw possible walks
  // push()
  //   drawingContext.setLineDash([5, 15]);
  //   stroke(100)
  //   strokeWeight(width/(WIDTH*50))
  //   let possible = possibleWalks()
  //   drawPossibleEdges(possible)
  // pop()

  // push()
  // fill(170)
  // stroke(170)
  // drawLatice()
  // pop()

  // Draw edges
  push()
  translate(width/(WIDTH*6), width/(WIDTH*6))
  stroke(170)
  strokeWeight(width/(WIDTH*8))
  drawEdges()
  pop()

  push()
  stroke(0)
  strokeWeight(width/(WIDTH*8))
  drawEdges()
  pop()

  backbite()
}

function mouseClicked() {
  backbite()
  draw()
}


function createLatice(w, h) {
  const g = new Graph({ directed: false })
  // Create a 3x3 lattice
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      g.setNode(
        `${x}x${y}`, // Node name will be something like 1x2
        { x: x, y: y }
      )
    }
  }
  return g
}
function getScreenPosition(x, y) {
  return {
    x: map(x, 0, WIDTH-1, width*0.1, width*0.9),
    y: map(y, 0, WIDTH-1, width*0.1, width*0.9)
  }
}
function drawLatice() {
  const nodes = g.nodes()
  for( let i in nodes) {
    let nodeName = nodes[i]
    let node = g.node(nodeName)
    if (!node) continue
    let { x, y } = getScreenPosition(node.x, node.y)
    circle(x, y, width/(3*WIDTH))
  }
}
function drawEdges() {
  const edges = g.edges()
  for (let i in edges) {
    let edge = edges[i]
    let nodeA = g.node(edge.v)
    let nodeB = g.node(edge.w)
    if (!nodeA || !nodeB) continue
    let posA = getScreenPosition(nodeA.x, nodeA.y)
    let posB = getScreenPosition(nodeB.x, nodeB.y)
    line(posA.x, posA.y, posB.x, posB.y)
  }
}
function drawPossibleEdges(tips) {
  for (let j in tips) {
    let edges = tips[j]
    for (let i in edges) {
      let edge = edges[i]
      let nodeA = g.node(edge.v)
      let nodeB = g.node(edge.w)
      if (!nodeA || !nodeB) continue
      let posA = getScreenPosition(nodeA.x, nodeA.y)
      let posB = getScreenPosition(nodeB.x, nodeB.y)
      line(posA.x, posA.y, posB.x, posB.y)
    }
  }
}

function indexToPosition(i) {
  return {
    x: i % WIDTH,
    y: Math.floor(i/WIDTH)
  }
}
function positionToIndex(x, y) {
  return (y*WIDTH)+x
}
function nameToPosition(name) {
  let [x, y] = name.split('x')
  return {
    x: parseInt(x),
    y: parseInt(y)
  }
}
function getGridNeighbors(x, y) {
  let neighbors = []
  // If coordinates are out of bounds, no neighbors
  if (x < 0 || x > WIDTH-1 || y < 0 || y > WIDTH-1) return neighbors
  // Left neighbor
  if (x > 0) {
    neighbors.push(`${x-1}x${y}`)
  }
  // Right neighbor
  if (x < WIDTH-1) {
    neighbors.push(`${x+1}x${y}`)
  }
  // Top neighbor
  if (y > 0) {
    neighbors.push(`${x}x${y-1}`)
  }
  // Bottom neighbor
  if (y < WIDTH-1) {
    neighbors.push(`${x}x${y+1}`)
  }
  return neighbors
}

function generatePlough() {
  const nodes = g.nodes()
  for (let j = 0; j < WIDTH; j++) {
    for (let i = 0; i < WIDTH-1; i++) {
      let index = positionToIndex(i, j)
      g.setEdge(nodes[index], nodes[index+1])
    }
    if (j == WIDTH-1) continue
    if (j % 2 == 0) {
      g.setEdge(
        nodes[positionToIndex(0, j)],
        nodes[positionToIndex(0, j+1)]
      )
    } else {
      g.setEdge(
        nodes[positionToIndex(WIDTH-1, j)],
        nodes[positionToIndex(WIDTH-1, j+1)]
      )
    }
  }
}
function getTips() {
  let component = alg.components(g).pop()
  // Begining and end of path
  let tips = component.filter((nodeName) => {
    return g.nodeEdges(nodeName).length === 1
  })
  return tips
}
function possibleWalks() {
  let tips = getTips()
  let allWalks = tips.map((tip) => {
    let pos = nameToPosition(tip)
    return getGridNeighbors(pos.x, pos.y)
  })
  let possible = tips.map(function(tip, i) {
    return allWalks[i].filter((neighbor) => {
      return !g.hasEdge(tip, neighbor)
    })
  })
  return possible.map((nodes, i) => {
    return nodes.map((node) => {
      return { v: tips[i], w: node}
    })
  })
}
function backbite() {
  // console.log('tips', getTips())
  let possible = possibleWalks()
  // console.log('possible walks', possible)
  if (possible.length === 0) return // No possible walks :/
  let chosenTip = random(possible)
  // console.log('chosen tip', chosenTip)
  let chosen = random(chosenTip) // { v: tip, w: target }
  let tip = chosen.v
  let target = chosen.w
  // console.log('tip', tip)
  // console.log('target', target)
  let traversal = alg.preorder(g, target)
  // console.log('traversal', traversal)
  let cycle = []
  for (let i in traversal) {
    if (i == 0) continue
    let node = traversal[i]
    let previousNode = traversal[i-1]
    // Check for "non smooth" jumps by checking if previous node
    // is a "tip"
    let nonSmooth = g.nodeEdges(previousNode).length == 1
    if (nonSmooth) {
      // console.log('non smooth jump')
      // console.log('node', node)
      // console.log('previousNode', previousNode)
      g.setEdge(tip, target)
      if (g.hasEdge(previousNode, target)) {
        // this should be your cycle
        break; // break loop
      } else {
        // console.log('discarding', cycle)
        cycle = []
      }
    }
    cycle.push(node)
  }
  // console.log('cycle', cycle)
  // Removing the edge between target and first item of cycle
  g.removeEdge(target, cycle[0])
}
