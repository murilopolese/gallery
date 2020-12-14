let colors = [
  '#c1b376',
  '#ab6a49',
  '#317f66',
  '#c5b9a2',
  '#1e8880',
  '#4e829c',
  // '#597c95',
  // '#434041',
  '#443d3d',
  '#463936',
]

let g1, g2;

function setup() {
  createCanvas(
    min(windowHeight, 600),
    min(windowHeight, 600)
  )
  background(245)
  angleMode(DEGREES)
  g1 = createGraphics(250, 500)
  g2 = createGraphics(250, 500)
  // colors = colors.concat(colors)
}

function draw() {
  background(245)
  g1.fill(245)
  g1.noStroke()
  for (let i in colors) {
    let c = colors[i]
    g1.fill(c)
    let h = map(i, 0, colors.length-1, 0, height*0.9)
    faixaDeCor(h, g1, 3)
  }
  g2.fill(245)
  g2.noStroke()
  for (let i in colors) {
    let c = colors[(colors.length-i)%colors.length]
    // let c = colors[(1+2*i)%colors.length]
    g2.fill(c)
    let h = map(i, 0, colors.length-1, 0, height*0.9)
    faixaDeCor(h, g2, 4)
  }
  
  let slices = 60
  let res = width/slices
  for (let i = 0; i < slices; i++) {
    let x = map(i, 0, slices-1, 0, g1.width)
    image(
      g1, 
      x*4, 0, 
      res*1.2, height, 
      x, 0, 
      res, height
    )
    image(
      g2, 
      res+x*4, 0, 
      res*1.2, height, 
      x, 0, 
      res, height
    )
  }
}

function faixaDeCor(h, g, s) {
  g.beginShape()
  g.curveVertex(0, h)
  g.curveVertex(0, h)
  let res = 20
  for (let i = 0; i < res; i++) {
    let x = map(i, 0, res-1, 10, width-10)
    let phase = map(i, 0, res-1, 0, 360)
    let amp = map(sin(frameCount*s/2+phase*s), 0, 1, 0, height/8)
    let y = h - amp
    g.curveVertex(x, y)
  }
  g.curveVertex(width, h)
  g.curveVertex(width, h)
  g.curveVertex(width, height)
  g.curveVertex(width, height)
  g.curveVertex(0, height)
  g.curveVertex(0, height)
  
  g.endShape()
  return g
}
