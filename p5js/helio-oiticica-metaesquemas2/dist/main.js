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

let cursor = 0
let W = 3;
let H = 7;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  imageMode(CENTER)
  engine = Engine.create()
  world = engine.world

  engine.gravity.y = 0

  // Coloca paredes ao redor do canvas
  const wallThickness = width*0.05
  boundaries.push(Bodies.rectangle(width/2, height+wallThickness/2, width, wallThickness, { isStatic: true }))
  boundaries.push(Bodies.rectangle(width/2, -wallThickness/2, width, wallThickness, { isStatic: true }))
  boundaries.push(Bodies.rectangle(-wallThickness/2, height/2, wallThickness, height, { isStatic: true }))
  boundaries.push(Bodies.rectangle(width+wallThickness/2, height/2, wallThickness, height, { isStatic: true }))
  Composite.add(engine.world, boundaries, true)


  let size_x = width/(W)
  let size_y = height/(H)
  for (let i = 0; i < W; i++) {
    for (let j = 0; j < H; j++) {
      let x = map(i, 0, W-1, size_x*0.5, width-(size_x*0.5))
      let y = map(j, 0, H-1, size_y*0.5, height-(size_y*0.5))
      const rect = Bodies.rectangle(
        x, y, size_x*0.99, size_y*0.9,
      )
      rect.friction = 0
      rect.frictionAir = 0
      rect.restitution = 1
      shapes.push( rect )
    }
  }
  Composite.add(engine.world, shapes)

  // Start physics engine
  runner = Runner.create({
    delta: 1000/240
  })
  Runner.run(runner, engine)
  fill(0)
  noStroke()
  // stroke(255)
}

function draw() {

  background(255)
  // scale(1.2)
  // translate(-width*0.1, -height*0.1)
  scale(0.95)
  translate(width*0.025, height*0.025)

  // const body = shapes[cursor]
  // body.angle += radians(0.1)

  let collisions = engine.detector.collisions
  collisions = collisions.reduce((acc, c) => {
    acc = acc.concat([c.bodyA, c.bodyB])
    return acc
  }, [])
  for (let j in shapes) {
    let body = shapes[j]
    // body.angle += radians(0.05)
    
    const delta = 0.15/(W*H)
    if (collisions.indexOf(body) == -1) {
      // Body.rotate(body, map(noise(j*0.1, frameCount*0.001), 0, 1, -radians(0.15), radians(0.15)))
      Body.rotate(body, radians(delta*j+0.1*sin(radians(45*j+frameCount*0.25))))
    } else {
      Body.applyForce(
        body, body.position,
        createVector(
            random(-1*delta,1*delta),
            random(-1*delta,1*delta)
        )
      )
    }
    // Desenha forma convexa
    beginShape()
    for (let i in body.vertices) {
      const v = body.vertices[i]
      vertex(v.x, v.y)
    }
    endShape(CLOSE)
  }

}
