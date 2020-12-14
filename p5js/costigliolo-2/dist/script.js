let blue = '#1b85eb'
let black = '#1e0a18'
let yellow = '#f4ed45'
let margin = 50


function setup() {
  createCanvas(
    min(500, windowHeight),
    min(500, windowHeight)
  )
  background(blue)
  angleMode(DEGREES)

  margin = width / 10

  for (let i = 0; i < 200; i++) {
    push()
    rectMode(CENTER)
    noStroke()
    fill(black)
    translate(
      random(margin, width-margin),
      random(margin, height-margin)
    )
    rotate(random(-90, 90))
    rect(
      0, 0,
      random(width/25, width/6),
      random(width/12, width/5)
    )
    pop()
  }

  let n = 120
  for (let i = 0; i < n; i++) {
    push()
    rectMode(CENTER)
    // translate(
    //   map(i, 0, n-1, margin, width-margin),
    //   map(j, 0, n-1, margin, width-margin)
    // )
    translate(
      random(margin, width-margin),
      random(margin, width-margin)
    )
    rectangle(
      0, 0,
      random(width/12, width/8),
      random(width/14, width/6),
      i > n-10 ? yellow : blue
    )
    pop()
  }

}

function rectangle(x, y, w, h, c) {
  c = c || blue
  push()
  noStroke()
  rectMode(CENTER)
  translate(x, y)
  rotate(random(-90, 90))
  fill(black)
  rect(0, 0, w, h)
  rotate(random(-10, 10))
  fill(c)
  rect(0, 0, w-(width/50), h-(width/50))
  pop()
}
