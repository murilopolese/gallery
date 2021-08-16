let s = 5

function setup() {
  createCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  )
  angleMode(DEGREES)
  ellipseMode(CENTER)
}

function draw() {
  background(240)
  fill(0)
  stroke(0)
  circle(width/2, height/2, map(sin(frameCount*0.5), -1, 1, s, s*width*0.05))
  for (let i = 0; i < 100; i++) {
    let phase = map(i, 0, 99, 0, 360)
    for (let j = 0; j < s*width*0.05; j++) {
      if (j < width*0.025) continue
      
      let x1 = (width/2) + j*map(sin(phase), -1, 1, -s, s)
      let x2 = (width/2) + (j+1)*map(sin(phase), -1, 1, -s, s)
      let y1 = (height/2) + j*map(cos(phase), -1, 1, -s, s)
      let y2 = (height/2) + (j+1)*map(cos(phase), -1, 1, -s, s)
      
      if (
        x1 > (width-10) || x1 < 10 ||
        x2 > (width-10) || x2 < 10 ||
        y1 > (height-10) || y1 < 10 ||
        y2 > (height-10) || y2 < 10
      ) {
        continue
      }
      
      let phase2 = map(j, 0, (s*12)-1, 0, 360)
      let w = map(sin((2*frameCount)+(phase*phase2)), -1, 1, width/200, width/100)
      strokeWeight(w)
      
      line(x1, y1, x2, y2)
    }
  }
}

function windowResized() {
  resizeCanvas(
    min(500, windowWidth), 
    min(500, windowWidth)
  );
}