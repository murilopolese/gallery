function Rectangle(x, y, w, h, a, c) {
  this.x = x
  this.y = y
  this.w = w
  this.h = h
  this.a = a
  this.c = (c % 2) == 0
  
  this.draw = function() {
    push()
    if (this.c) {
      fill(0)  
    } else {
      fill('#e7e1d1')
    }
    
    beginShape()
    let phase = 90 + map(sin(this.a), -1, 1, -35, 35)

    vertex( // top left
      this.x - (this.w/2) - 
      map(sin(phase), -1, 1, -border*0.5, border*0.5),
      this.y - (this.h/2) + 
      map(cos(phase), -1, 1, -border*0.3, border*0.3)
    )
    vertex( // top right
      this.x + (this.w/2) +
      map(sin(phase), -1, 1, -border*0.5, border*0.5) , 
      this.y - (this.h/2) - 
      map(cos(phase), -1, 1, -border*0.3, border*0.3)
    )
    
    vertex( // middle right
      this.x + (this.w/2) +
      map(sin(phase), -1, 1, -border*0.5, border*0.5) , 
      this.y
    )
    vertex( // middle left
      this.x - (this.w/2) - 
      map(sin(phase), -1, 1, -border*0.5, border*0.5),
      this.y
    )
    endShape()
    pop()
    
    
    push()
    if (this.c) {
      fill('#e7e1d1')
    } else {
      fill(0)  
    }
    beginShape()
    vertex( // bottom right
      this.x + (this.w/2) +
      map(sin(phase), -1, 1, -border*0.5, border*0.5), 
      this.y + (this.h/2) +
      map(cos(phase), -1, 1, -border*0.3, border*0.3)
    )
    vertex( // bottom left
      this.x - (this.w/2) -
      map(sin(phase), -1, 1, -border*0.5, border*0.5), 
      this.y + (this.h/2) - 
      map(cos(phase), -1, 1, -border*0.3, border*0.3)
    )
    vertex( // middle left
      this.x - (this.w/2) - 
      map(sin(phase), -1, 1, -border*0.5, border*0.5),
      this.y
    )
    vertex( // middle right
      this.x + (this.w/2) +
      map(sin(phase), -1, 1, -border*0.5, border*0.5) , 
      this.y
    )
    
    endShape()
    pop()
  }
}

let r = []
let frame, border

function setup() {
  createCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  )
  angleMode(DEGREES)
  
  noStroke()
  frame = 0
  border = 0
  
  for (let i = 0; i < 10; i++) {
    r.push(
      new Rectangle(
        width/2, height/2,
        frame*(1-(i/10)), frame*(1-(i/20)),
        0, i
      )
    )
  }
  
}

function draw() {
  background('#e7e1d1')
  
  frame = width
  border = width * 0.10
  
  for (let i = 0; i < 10; i++) {
    r[i].x = width/2
    r[i].y = height/2
    r[i].w = frame*(1-(i/10))
    r[i].h = frame*(1-(i/15))
  }
  
  for (let i = 0; i < r.length; i++) {
    if (i % 2 == 0) {
      r[i].a = frameCount + i*5
    } else {
      r[i].a = -frameCount + i*3
    }
    r[i].draw()
  }
  
}

function windowResized() {
  resizeCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  )
 
}