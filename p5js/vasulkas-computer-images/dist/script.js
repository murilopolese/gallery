function operation(name, a, b) {
  switch (name) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    case "&":
      return a & b;
    case "|":
      return a | b;
    case "^":
      return a ^ b;
    case "%":
      return a % b;
    default:
      return a;
  }
}

let OPERATIONS = ["+", "-", "*", "/", "&", "|", "^", "%"]

let op = ["%", "+", "*", "*", "%", "+", "*", "*", "%", "+", "*", "*"]
let v = [4.5, 1, 255, 1, 255, 1, 255]
let opButtons = []
let vSliders = []

function setup() {
  createCanvas(
    min(500, windowHeight),
    min(500, windowHeight)
  )
  // for (let i = 0; i < op.length; i++) {
  //   let b = createButton(op[i])
  //   b.mouseClicked(function () {
  //     let opIndex = OPERATIONS.indexOf(op[i])
  //     op[i] = OPERATIONS[(opIndex + 1) % OPERATIONS.length]
  //     opButtons[i].html(op[i])
  //   })
  //   opButtons.push(b)
  // }
  // for (let i = 0; i < v.length; i++) {
  //   let s = createSlider(1, 255, v[i], 1)
  //   vSliders.push(s)
  // }
}

function draw() {
  // for (let i = 0; i < v.length; i++) {
  //   v[i] = parseFloat(vSliders[i].value())
  // }
  background(0)
  noStroke()
  for (let x = 0; x < width; x += v[0]) {
    for (let y = 0; y < height; y += v[0]) {
      fill(
        operation(
          op[0],
          operation(
            op[1],
            operation(op[2], x, y),
            operation(op[3], frameCount, v[1])
          ),
          v[2]
        ),
        operation(
          op[4],
          operation(
            op[5],
            operation(op[6], x, y),
            operation(op[7], frameCount, v[3])
          ),
          v[4]
        ),
        operation(
          op[8],
          operation(
            op[9],
            operation(op[10], x, y),
            operation(op[11], frameCount, v[5])
          ),
          v[6]
        )
      );
      rect(x, y, v[0], v[0])
    }
  }
}
