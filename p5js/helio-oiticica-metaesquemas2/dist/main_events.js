// module aliases
const Engine = Matter.Engine
const Render = Matter.Render
const Runner = Matter.Runner
const World = Matter.World
const Bodies = Matter.Bodies
const Composite = Matter.Composite
const Collision = Matter.Collision
const Constraint = Matter.Constraint
const MouseConstraint = Matter.MouseConstraint
const Mouse = Matter.Mouse
const Body = Matter.Body
const Common = Matter.Common
const Events = Matter.Events

// Common.setDecomp(decomp)

let engine, world, runner, canvas
let shapes = [] // o body das tampinhas
let collisions = []
let shapes_img = [] // [ tipo, imagem ] indexes do tampinha_img
let boundaries = [] // paredes
let synth
let contact

function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  imageMode(CENTER)
  engine = Engine.create()
  world = engine.world

  engine.gravity.y = 0
  contact = createVector(0, 0)

  // Coloca paredes ao redor do canvas
  const wallThickness = width*0.05
  boundaries.push(Bodies.rectangle(width/2, height+wallThickness/2, width, wallThickness, { isStatic: true }))
  boundaries.push(Bodies.rectangle(width/2, -wallThickness/2, width, wallThickness, { isStatic: true }))
  boundaries.push(Bodies.rectangle(-wallThickness/2, height/2, wallThickness, height, { isStatic: true }))
  boundaries.push(Bodies.rectangle(width+wallThickness/2, height/2, wallThickness, height, { isStatic: true }))
  Composite.add(engine.world, boundaries, true)

  let W = 4;
  let H = 3;
  let size_x = width/(W)
  let size_y = height/(H)
  for (let i = 0; i < W; i++) {
    for (let j = 0; j < H; j++) {
      let x = map(i, 0, W-1, size_x*0.5, width-(size_x*0.5))
      let y = map(j, 0, H-1, size_y*0.5, height-(size_y*0.5))
      const rect = Bodies.rectangle(
        x, y, size_x*0.99, size_y*0.98,
      )
      rect.friction = 0.0
      rect.frictionAir = 0.0
      rect.restitution = 1.1
      shapes.push( rect )
    }
  }
  Composite.add(engine.world, shapes)

  for (let j in shapes) {
    let body = shapes[j]
    // totozin
    const delta = random(-0.1, 0.1)
    Body.setAngularVelocity(body, body.angularVelocity+random(-radians(delta), radians(delta)))
    Body.setAngularVelocity(body, body.angularVelocity+random(-radians(delta), radians(delta)))
  }

  // Start physics engine
  runner = Runner.create()
  Runner.run(runner, engine)
  fill(0)

  synth = new p5.PolySynth()
  canvas.mousePressed(() => userStartAudio())

  Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs;
    // change object colours to show those starting a collision
    for (let i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        let vol = 2*dist(pair.collision.penetration.x, pair.collision.penetration.y, 0, 0)
        vol = constrain(vol, 0, 1)
        if (
          boundaries.indexOf(pair.bodyA) == -1
          && boundaries.indexOf(pair.bodyB) == -1
        ) {
          for (let j in pair.contacts) {
            const c = pair.contacts[j].vertex
            if (c) {
              const d = dist(c.x, c.y, width/2, height/2)
              if (d < height*0.3) {
                contact.x = c.x
                contact.y = c.y
                playSynth('D3', vol)
              } else {
                playSynth('B3', vol)

              }
            }
          }
        }
    }
    });
}
const playSynth = (note, vol) => {
  note = note || 'B5'
  vol = vol || 1
  userStartAudio()
  synth.play(note, vol, 0, 1/32)
}

function draw() {

  background(255)
  // scale(1.1)
  // translate(-width*0.05, -height*0.05)
  scale(0.95)
  translate(width*0.025, height*0.025)

  for (let j in shapes) {
    let body = shapes[j]
    // totozin
    if (random(0, 1000)>999) {
      const delta = random(-0.1, 0.1)
      Body.setAngularVelocity(body, body.angularVelocity+random(-radians(delta), radians(delta)))
      Body.setAngularVelocity(body, body.angularVelocity+random(-radians(delta), radians(delta)))
    }

    // Desenha forma convexa
    beginShape()
    for (let i in body.vertices) {
      const v = body.vertices[i]
      vertex(v.x, v.y)
    }
    endShape(CLOSE)


  }


  // push()
  // fill(50, 0, 250)
  // circle(contact.x, contact.y, width*0.05)
  // pop()

}
