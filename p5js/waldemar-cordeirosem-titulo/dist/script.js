// http://enciclopedia.itaucultural.org.br/obra4196/sem-titulo
let cols = 12;
let rows = 12;

// column patterns
let patterns = [
  [0, 0, 1, 2],
  [2, 3, 4, 1],
  [3, 4, 0, 0],
  [4, 1, 2, 3]
]

// retangulo preenchido
function forma0(x, y, res) {
  push()
  fill(0)
  noStroke()
  rect(x*res, y*res, res, res)
  pop()
}

// diagonal do canto superior esquerdo ao inferior direito
// preenchido em baixo
function forma1(x, y, res) {
  push()
  fill(0)
  noStroke()
  triangle(
    x*res, y*res,
    x*res+res, y*res+res,
    x*res, y*res+res
  )
  pop()
}

// diagonal do canto superior esquerdo ao inferior direito
// preenchido em cima
function forma2(x, y, res) {
  push()
  fill(0)
  noStroke()
  triangle(
    x*res, y*res,
    x*res+res, y*res+res,
    x*res+res, y*res
  )
  pop()
}

// diagonal do canto superior direito ao inferior esquerdo
// preenchido em baixo
function forma3(x, y, res) {
  push()
  fill(0)
  noStroke()
  triangle(
    x*res+res, y*res,
    x*res, y*res+res,
    x*res+res, y*res+res
  )
  pop()
}

// diagonal do canto superior direito ao inferior esquerdo
// preenchido em cima
function forma4(x, y, res) {
  push()
  fill(0)
  noStroke()
  triangle(
    x*res+res, y*res,
    x*res, y*res+res,
    x*res, y*res
  )
  pop()
}

function setup() { 
  createCanvas(
    min(windowHeight,600), 
    min(windowHeight,600)
  );
  frameRate(3)
  noLoop()
}

function draw() {
  
  background(240)
  let res = width/12
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      // if (
      //   ( (x % 2) == 1 && (y == 0) )
      //   || ( ((x%4) - 3) == 0 && (y == rows-1) )
      // ) {
      //   continue
      // }
      let pattern = patterns[x%patterns.length]
      let shape = pattern[y%pattern.length]
      switch(shape) {
        case 0:
          forma0(x, y, res)
          break;
        case 1:
          forma1(x, y, res)
          break;
        case 2:
          forma2(x, y, res)
          break;
        case 3:
          forma3(x, y, res)
          break;
        case 4:
          forma4(x, y, res)
          break;
      }
    }
  }
}

function mouseClicked() {
  // randomize pattern
  for (let i = 0; i < patterns.length; i++) {
    patterns[i] = shuffle(patterns[i])
  }
  draw()
}