  let colors = [
    '#222222', // black
    '#4f4347',
    '#4c6d84', // blue
    '#a85d43', // orangy
    // '#c0b174', // yellow
    '#268379', // tealue
    '#498870', // green
    '#70453b', // brown
  ]
let g

function setup() {
  createCanvas(
    min(windowHeight, 600),
    min(windowHeight, 600)
  )
  g = createGraphics(width, height)
  angleMode(DEGREES)
 
  
  background(colors[0])
  noStroke()
  
  g.background(colors[0])
  g.noStroke()
  imageMode(CENTER)
}


function draw() {
  let h = height/colors.length
  for (let i in colors) {
    g.fill(colors[i])
    g.beginShape()
    let step = width/4
    g.curveVertex(0, i*h)
    g.curveVertex(0, i*h)
    for (let j = step/2; j < width-step/2; j+=step) {
      g.curveVertex(
        j, 
        h*i + map(
          noise(j/10, i/5, frameCount/1000),
          0, 1, 
          -h, h
        )
      )
    }
    g.curveVertex(width, i*h)
    g.curveVertex(width, i*h)
    g.curveVertex(width, i*h+2*h)
    g.curveVertex(width, i*h+2*h)
    g.curveVertex(0, i*h+2*h)
    g.curveVertex(0, i*h+2*h)
    g.endShape()
  }
  let step = width/100
  let j = 0;
  for(let i = 0; i<width; i+= step){
    push()
    translate(i*step, height/2)
    rotate(180*(j%2))
    image(
      g, 
      0, map(
        sin(i+frameCount+(i*(j%2))), 
        -1, 1, 
        -g.height/8, g.height/8
      ),
      step*6, g.height*1.5,
      0, 0,
      step*6, g.heigth*1.5,
      i, 0,
      step*6, g.height*1.5
    )
    pop()
    j++
  }
}