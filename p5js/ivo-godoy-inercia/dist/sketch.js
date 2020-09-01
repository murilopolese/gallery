let font, points, bounds;

function Letter(x, y, letter, size, path, i) {
  this.letter = letter || ' '
  this.size = size
  this.point = 0
  this.path = path

  this.pos = createVector(
    x + size*i, y
  )

  this.draw = function() {
    push()
    textAlign(CENTER)
    textSize(this.size)
    textFont(font)
    text(this.letter, this.pos.x, this.pos.y)
    pop()
  }

  this.update = function() {
    let p = createVector(
      this.path[this.point].x,
      this.path[this.point].y
    )
    let direction = p5.Vector.sub(p, this.pos)
    let t = frameCount
    direction.limit(
      map(sin(t), -1, 1, height/500, height/250)
    )
    this.pos.add(direction)
    if (this.pos.dist(p) < 4) {
      this.point += 1
      this.point %= this.path.length
    }
  }
}

function preload() {
  font = loadFont('./assets/Inconsolata-Regular.ttf')
}

let letters = []

function setup() {
  createCanvas(
    min(500, windowHeight),
    min(500, windowHeight)
  )
  background(240)
  angleMode(DEGREES)
  points = font.textToPoints(
    'I',
    width*0.4, height*0.6,
    height*0.75,
    {
      sampleFactor: 0.1,
      simplifyThreshold: 0
    }
  )
  bounds = font.textBounds('I', width/2, height*0.75, height/2)
  let word = 'inércia inércia inércia inércia inércia'
  word = word.toUpperCase().split('') // GEEZUS
  for (let i = 0; i < word.length; i++) {
    let l = word[i]
    letters.push(
      new Letter(
        points[0].x, points[0].y, l, width/30, points, i
      )
    )
  }
}

function draw() {
  background(240)
  // for (let i = 0; i < points.length; i++) {
  //   let p = points[i]
  //   circle(p.x, p.y, 5, 5)
  // }
  for (let i = 0; i < letters.length; i++) {
    let l = letters[i]
    push()
    translate(-bounds.w/2, bounds.h/2)
    l.draw()
    pop()
    l.update()
  }
}
