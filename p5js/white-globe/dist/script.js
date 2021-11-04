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
  s.setUniform('u_time', 90000+millis());
  s.setUniform('width', width*pixelDensity());
  s.setUniform('height', height*pixelDensity());
  shader(s)
  quad(-1, -1, 1, -1, 1, 1, -1, 1)
}

function windowResized() {
  resizeCanvas(
    min(500, windowWidth),
    min(500, windowHeight)
  )
}
