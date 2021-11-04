let s

function preload() {
  s = loadShader('shader.vert', 'shader.frag')
}

function setup() {
  createCanvas(
    min(500, windowWidth),
    min(500, windowHeight),
    WEBGL
  )
  noStroke()
}

function draw() {
  s.setUniform('u_time', millis()/1000.0);
  let w = width*pixelDensity()
  let h = height*pixelDensity()
  s.setUniform('width', w);
  s.setUniform('height', h);
  shader(s)
  quad(-1, -1, 1, -1, 1, 1, -1, 1)
}

function windowResized() {
  resizeCanvas(
    min(500, windowWidth),
    min(500, windowHeight)
  )
}
