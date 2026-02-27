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
const SVG = Matter.Svg
const Common = Matter.Common

// Common.setDecomp(decomp)

const seed = Date.now()

let engine, world, runner, canvas
let shapes = [] // o body das tampinhas
let shapes_img = [] // [ tipo, imagem ] indexes do tampinha_img
let boundaries = [] // paredes

let colors = [
  "#fff", "#89bfe5", "#f87b05",  "#a8c434", "#faec3b"
]

function setup() {
  randomSeed(seed)
  canvas = createCanvas(windowWidth, windowHeight)
  imageMode(CENTER)
  engine = Engine.create()
  world = engine.world

  engine.gravity.y = 0

  // // Coloca paredes ao redor do canvas
  // const wallThickness = width*0.05
  // boundaries.push(Bodies.rectangle(width/2, height+wallThickness/2, width, wallThickness, { isStatic: true }))
  // boundaries.push(Bodies.rectangle(width/2, -wallThickness/2, width, wallThickness, { isStatic: true }))
  // boundaries.push(Bodies.rectangle(-wallThickness/2, height/2, wallThickness, height, { isStatic: true }))
  // boundaries.push(Bodies.rectangle(width+wallThickness/2, height/2, wallThickness, height, { isStatic: true }))
  // Composite.add(engine.world, boundaries, true)

  let N = 6;
  let size_x = (width)/(N*0.8)
  let size_y = (height)/(N*0.8)
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let x = map(i, 0, N, width*0.2, width*0.8)
      let y = map(j, 0, N, height*0.2, height*0.8)

      // const rect = Bodies.polygon(
      //   x, y, int(random(3, 5)), size_x*int(random(1, 3))*0.4
      // )
      // const rect = Bodies.rectangle(
      //   x, y, size_x*random(0.99, 1.15), size_y*random(0.99, 1.15),
      // )
      // let w = int(random(3)) * size_x
      // let h = int(random(3)) * size_y
      const rect = Bodies.rectangle(
        x, y, size_y*int(random(1, 3))*0.6, size_y*int(random(1, 3))*0.6,
      )
      rect.friction = 0.0
      rect.frictionAir = 0.005
      rect.frictionAir = 0.001
      rect.restitution = 0.1
      Body.rotate(rect, random(-PI/2, PI/2))
      shapes.push( rect )
    }
  }
  Composite.add(engine.world, shapes)

  // Interativo com o mouse
  const mouse = Mouse.create(document.querySelector('main'))
  const mouseConstraint = MouseConstraint.create(engine, { mouse: mouse });
  Composite.add(world, mouseConstraint);

  // Start physics engine
  runner = Runner.create()
  Runner.run(runner, engine)
  fill(255)
  noStroke()
}

function draw() {
  randomSeed(seed)
  background("#c1d6ad")
  // scale(0.8)
  // translate(width*0.1, height*0.1)

  // // sometimes gravity
  // if (frameCount % 240 < 20) {
  //   const f = 2.0
  //   engine.gravity.y = map(sin(radians(frameCount*9)), -1, 1, -f, f) * sin(radians(frameCount*0.1))
  //   engine.gravity.x = map(cos(radians(frameCount*11)), -1, 1, -f, f) * sin(radians(frameCount*0.1))
  // } else {
  //   engine.gravity.x = 0
  //   engine.gravity.y = 0
  // }

  for (let j in shapes) {
    let body = shapes[j]
    // totózin
    // if (random(0, 1000)>999) {
    if (frameCount % 1140 == 0) {
      const delta = 0.05 * (((int(frameCount/1140) % 2) - 0.5)*2)
      Body.setAngularVelocity(body, body.angularVelocity+delta)
      Body.setAngularVelocity(body, body.angularVelocity+delta)
    }

    // estica e puxa
    // const distancia_x = map(abs( (width/2) - body.position.x ), 0, width/2, 0, 5)
    // const distancia_y = map(abs( (width/2) - body.position.y ), 0, height/2, 0, 5)
    // // body.vertices[0].x += 10*sin(radians(frameCount*0.01))
    // // console.log(body)
    // const sx = map(
    //   cos(radians(frameCount*1.5)+distancia_x), -1, 1, 0.995, 1.005
    // )
    // const sy = map(
    //   cos(radians(frameCount*1.5)+distancia_y), -1, 1, 0.995, 1.005
    // )
    // if (body.area > 200 && body.area < 30000) {
    //   Body.scale(body, sx, sy)
    // }
    // if (body.area < 200) {
    //   Body.scale(body, 1.01, 1.01)
    // }
    // if (body.area > 20000) {
    //   Body.scale(body, 0.95, 0.95)
    // }

    // Gravidade no centro da tela
    let f = createVector((width/2) - body.position.x, (height/2) - body.position.y)
    if (f.mag() > 5) {
      f.normalize()
      f.mult(0.005)
      Body.applyForce(body, body.position, f)
    }

    // const [typeId, colorId] = shapes_img[j]
    // Desenha forma convexa
    fill(random(colors))
    // fill(colors[j%colors.length])
    beginShape()
    for (let i in body.vertices) {
      const v = body.vertices[i]
      vertex(v.x, v.y)
    }
    endShape(CLOSE)

    // Desenha tampinha
    // push()
    // let tampinha = tampinha_img[typeId][colorId]
    // translate(body.position.x, body.position.y)
    // rotate(body.angle-PI*0.4)
    // s = 0.65
    // image(tampinha, 0, 0, tampinha.width*s, tampinha.height*s)
    // pop()

    // Remove se estiver caindo no coletor
    // const distancia = dist(
    //   body.position.x,
    //   body.position.y,
    //   width/2,
    //   (height/2)-(coletor_img.height*0.9)
    // )
    // if (distancia < tampinha.width*0.4 && body.velocity.y > 4) {
    //   shapes.splice(j, 1)
    //   shapes_img.splice(j, 1)
    //   World.remove(world, body)
    // }
  }

}
