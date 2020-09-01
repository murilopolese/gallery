let pa, pb, pc, pd, pe, pf, pg, ph;
let movA, movB, movC, movD, movE, movF, movG, movH;

function setup() {
  createCanvas(
    min(500, windowHeight),
    min(500, windowHeight)
  )
  angleMode(DEGREES)
  stroke(255)
  strokeWeight(width/100)
  
  pa = []; pb = [] // primeira linha
  pa[0] = createVector(0, height/2)
  pb[0] = createVector(width/2, height)
  
  pc = []; pd = [] // segunda linha
  pc[0] = createVector(width/2, height/4)
  pd[0] = createVector(width*(3/4), height/2)
  
  pe = []; pf = [] // terceira linha
  pe[0] = createVector(width/4, height/4)
  pf[0] = createVector(width/60+width/4, height/2)
  
  pg = []; ph = [] // quarta linha
  pg[0] = createVector(
    width/2 + width/8 - width/200,
    height/2 + height/8
  )
  ph[0] = createVector(
    width/2 + width/8,
    height/2 + height/8 - height/200
  )

  movA = createVector(width/15, height/15)
  movB = createVector(width/15, -height/15)
  movC = createVector(width/20, 0)
  movD = createVector(-width/20, -height/20)
  movE = createVector(0, height/13)
  movF = createVector(height/20, -height/20)
  movG = createVector(0, -height/20)
  movH = createVector(-height/20, 0)
  
  for(let i = 1; i < 4; i++) {
    pa[i] = p5.Vector.add(pa[i-1], movA)
    pb[i] = p5.Vector.add(pb[i-1], movB)
    pc[i] = p5.Vector.add(pc[i-1], movC)
    pd[i] = p5.Vector.add(pd[i-1], movD)
    pe[i] = p5.Vector.add(pe[i-1], movE)
    pf[i] = p5.Vector.add(pf[i-1], movF)
    pg[i] = p5.Vector.add(pg[i-1], movG)
    ph[i] = p5.Vector.add(ph[i-1], movH)
  }
  
  
}

function update() {
  for(let i = 0; i < 4; i++) {
    pa[i].add(p5.Vector.mult(movA, sin(frameCount)).div(100))
    pb[i].add(p5.Vector.mult(movB, sin(frameCount)).div(100))
    pc[i].add(p5.Vector.mult(movC, sin(frameCount)).div(100))
    pd[i].add(p5.Vector.mult(movD, sin(frameCount)).div(100))
    pe[i].add(p5.Vector.mult(movE, sin(frameCount)).div(100))
    pf[i].add(p5.Vector.mult(movF, sin(frameCount)).div(100))
    pg[i].add(p5.Vector.mult(movG, sin(frameCount)).div(100))
    ph[i].add(p5.Vector.mult(movH, sin(frameCount)).div(100))
  }
}

function draw() {
  update()
  background('#222')
  
  // Primeira linha
  push()
  for (let i = 0; i < 4; i++) {
    line(
      pa[i].x, pa[i].y, 
      pb[pb.length-1-i].x, pb[pb.length-1-i].y
    )
  }
  pop()
  
  // Segunda linha
  push()
  for (let i = 0; i < 4; i++) {
    line(
      pc[i].x, pc[i].y, 
      pd[pd.length-1-i].x, pd[pd.length-1-i].y
    )
  }
  pop()
  
  // Terceira linha
  push()
  for (let i = 0; i < 4; i++) {
    line(
      pe[i].x, pe[i].y, 
      pf[pf.length-1-i].x, pf[pf.length-1-i].y
    )
  }
  pop()
  
  // Quarta linha
  push()
  for (let i = 0; i < 4; i++) {
    line(
      pg[i].x, pg[i].y, 
      ph[i].x, ph[i].y
    )
  }
  pop()
  
  // Linha vermelha
  push()
  translate(width, height)
  rotate(180)
  stroke(180, 0, 0)
  for (let i = 0; i < 4; i++) {
    line(
      pa[i].x, pa[i].y, 
      pb[pb.length-1-i].x, pb[pb.length-1-i].y
    )
  }
  pop()
}