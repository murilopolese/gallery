let colors = []

let cols = 100
let rows = 10
let resx = 1
let resy = 1
let cursor

function setup() {
  createCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  )
  angleMode(DEGREES)
  background(255)
  resx = width / cols
  resy = height / rows
  cursor = createVector(mouseX, mouseY)
  colors[0] = color(255, 0, 100)
  colors[1] = color(0, 255, 100)
  colors[2] = color(0, 100, 255)
  colors[3] = color(100, 0, 255)
  colors[4] = color(255, 100, 0)
}

function draw() {
  background(0)
  cursor = createVector(
    lerp(cursor.x, mouseX, 0.13),
    lerp(cursor.y, mouseY, 0.13)
  )
  for (let y = 0; y < rows+1; y++) {
    for (let x = 0; x < cols+1; x++) {
      push()
      translate(
        map(x*resx, 0, width, width*0.1, width*0.9),
        map(y*resy, 0, height, height*0.1, height*0.9)
      )
      stroke(colors[y%colors.length])
      if (y % 2 == 0) {
        if (x % 2 == 0) {
          line(
            0, 0,
            cursor.x-(width/2) + resx * sin(frameCount),
            cursor.y-(height/2)
          )
        }
      } else {
        if (x % 2 == 1) {
          line(
            0, 0,
            cursor.x-(width/2),
            cursor.y-(height/2)
          )
        }
      }
      // line(
      //   0, 0,
      //   cursor.x-(width/2) + 10*sin(5*frameCount + x*10 + y*12),
      //   cursor.y-(height/2) + 10*sin(5*frameCount + x*10 + y*12)
      // )
      pop()
    }
  }

}

function windowResized() {
  resx = width / cols
  resy = height / rows
  resizeCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  );
}