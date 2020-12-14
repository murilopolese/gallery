let blue = '#1b85eb'
let black = '#1e0a18'
let yellow = '#f4ed45'
let margin = 50
let i = 0

let group, group2
let tries = 0
let size = { w: 169, h: 99 }

function setup() {
  createCanvas(windowHeight*0.75, windowHeight*0.75)
  background(black)
  angleMode(DEGREES)
  group = new Group()
  group2 = new Group()
}

function draw() {
  background(blue)
  drawSprites()

  for (let i = 0; i < group.size(); i++) {
    let box = group.get(i)
    let overlap = box.overlap(group, () => fix())
  }

  if (group2.size() < 200) {
    size = { w: 80, h: 40 }
    addBox(
      random(margin, width-margin),
      random(margin, width-margin),
      group2,
      black
    )
  } else {
    if (group.size() < 50) {
      size = { w: 80 - group.size(), h: 60 - group.size() }
      addBox(
        random(margin*2, width-margin*2),
        random(margin*2, width-margin*2),
        group,
        group.size() < 5 ? yellow : blue
      )
    }
  }



}

function fix() {
  for (let i = 0; i < group.size(); i++) {
    let box = group.get(i)
    box.overlap(group, function(a, b) {
      a.displace(b)
    })
  }
}

function addBox(x, y, g, c) {
  g = g || group
  c = c || black
  let box = createSprite(
    x, y,
    size.w,
    size.h
  )
  box.shapeColor = c
  box.rotation = random(-90, 90)
  g.add(box)
}

function mouseClicked() {
  if (group.size()%5 == 1) {
    console.log('diminui')
    size.w *= 0.6
    size.h *= 0.6
  }
  addBox(mouseX, mouseY, group, blue)
}
