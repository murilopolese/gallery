const points = []
let size
let cols, rows
const colors = [
  '#fe5301',
  '#f87c84',
  '#e3c63b',
  '#037d5f',
  '#62a3c7',
  '#013287',
  '#d0c3b3'
]
const operations = [
  '+', '-', '*', '/', '&', '^', '|', 'min', 'max'
]

function operator(op, a, b) {
  switch (op) {
    case '+': return a + b;
    case '-': return Math.abs(a - b);
    case '*': return a * b;
    case '/': return parseInt(a / max(1, b));
    case '&': return a & b;
    case '^': return a ^ b;
    case '|': return a | b;
    case 'min': return min(a, b);
    case 'max': return max(a, b);
  }
}

function getColor(i) {
  return colors[i%colors.length]
}

function setup() {
  // createCanvas(
  //   min(500, windowWidth),
  //   min(500, windowWidth)
  // )
  createCanvas(windowWidth, windowHeight)
  angleMode(DEGREES)
  rectMode(CENTER)

  size = height / 15
  cols = width/size
  rows = height/size

  for (let y = 0; y < rows; y++) {
    points[y] = []
    for (let x = 0; x < cols; x++) {
      points[y][x] = createVector(
        random(-0.1, 0.1),
        random(-0.1, 0.1)
      )
    }
  }

  background(0)
  noStroke()
  const op1 = random(operations)
  const op2 = random(operations)

  for (let y = 0; y < rows-1; y++) {
    for (let x = 0; x < cols-1; x++) {
      stroke(getColor(operator(op1, x, y)))
      fill(getColor(operator(op1, x, y)))
      triangle(
        map(x+points[y][x].x, 0, cols-1, 0, width),
        map(y+points[y][x].y, 0, rows-1, 0, height),
        map(x+1+points[y][x+1].x, 0, cols-1, 0, width),
        map(y+points[y][x+1].y, 0, rows-1, 0, height),
        map(x+points[y+1][x].x, 0, cols-1, 0, width),
        map(y+1+points[y+1][x].y, 0, rows-1, 0, height)
      )
      stroke(getColor(operator(op2, x, y)))
      fill(getColor(operator(op2, x, y)))
      triangle(
        map(x+1+points[y+1][x+1].x, 0, cols-1, 0, width),
        map(y+1+points[y+1][x+1].y, 0, rows-1, 0, height),
        map(x+1+points[y][x+1].x, 0, cols-1, 0, width),
        map(y+points[y][x+1].y, 0, rows-1, 0, height),
        map(x+points[y+1][x].x, 0, cols-1, 0, width),
        map(y+1+points[y+1][x].y, 0, rows-1, 0, height)
      )
    }
  }
}


function windowResized() {
  resizeCanvas(
    min(500, windowWidth),
    min(500, windowWidth)
  );
  setup()
}

function mouseClicked() {
  setup()
}
