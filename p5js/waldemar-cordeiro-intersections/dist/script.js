// http://gallery.bananabanana.me/research/output/tumblr_nlkrh9FVvJ1s0got1o1_500.png
let c1 = [], c2 = []

let black, white

function setup() {
  black = color(0)
  white = color(240)

  createCanvas(
    min(windowHeight, 300),
    min(windowHeight, 300)
  )
  ellipseMode(CENTER)
  angleMode(DEGREES)
  smooth()
  background(white)
  stroke(black)
  strokeWeight(width/150)

  for (let i = 0; i < 4; i++) {
    c1.push(
      createVector(
        width*0.37, height/2,
        map(i, 0, 3, width/32, width/6)
      )
    )

  }

  for (let i = 0; i < 5; i++) {
    c2.push(
      createVector(
        width*0.61, height/2,
        map(i, 0, 4, width/16, width/4)
      )
    )
  }



}

function update() {
  let dt = map(sin(frameCount/2), -1, 1, 0.1, 2)
  for (let i = 0; i < c1.length; i++) {
    let c = c1[i]
    c.x = map(sin(frameCount), -1, 1, width*0.365, width* 0.6)
    c.y = map(cos(frameCount), -1, 1, height*0.365, height* 0.6)
  }
  for (let i = 0; i < c2.length; i++) {
    let c = c2[i]
    c.x = map(sin(frameCount+180), -1, 1, width*0.365 + dt*4.5, width* 0.6 + dt*4.5)
    c.y = map(cos(frameCount+180), -1, 1, height*0.365 + dt*4.5, height* 0.6 + dt*4.5)
  }
}

function draw() {
  update()
  background(white)
  loadPixels()
  for(let x = 0; x < width; x+=1) {
    for (let y = 0; y < height; y+=1) {

      let dc1_0 = dist(x, y, c1[0].x, c1[0].y) < c1[0].z
      let dc1_1 = dist(x, y, c1[1].x, c1[1].y) < c1[1].z
      let dc1_2 = dist(x, y, c1[2].x, c1[2].y) < c1[2].z
      let dc1_3 = dist(x, y, c1[3].x, c1[3].y) < c1[3].z
      let dc2_0 = dist(x, y, c2[0].x, c2[0].y) < c2[0].z
      let dc2_1 = dist(x, y, c2[1].x, c2[1].y) < c2[1].z
      let dc2_2 = dist(x, y, c2[2].x, c2[2].y) < c2[2].z
      let dc2_3 = dist(x, y, c2[3].x, c2[3].y) < c2[3].z
      let dc2_4 = dist(x, y, c2[4].x, c2[4].y) < c2[4].z

      let filled = (
        (dc1_0)
        || (dc1_1 && dc2_3 && !dc2_2)
        || (dc1_2 && dc2_2 && !dc2_1)
        || (dc1_3 && dc2_1 && !dc2_0)
      )

      if ( filled ) {
        set(x, y, black)
      }
    }
  }
  updatePixels()

  for (let i = 0; i < 4; i++) {
    let c = c1[i]
    noFill()
    circle(c.x, c.y, c.z*2)
  }
  for (let i = 0; i < 5; i++) {
    let c = c2[i]
    noFill()
    circle(c.x, c.y, c.z*2)
  }
}
