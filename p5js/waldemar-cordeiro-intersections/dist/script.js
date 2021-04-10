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
  s.setUniform('width', float(width*pixelDensity()));
  s.setUniform('height', float(width*pixelDensity()));
  shader(s)
  quad(-1, -1, 1, -1, 1, 1, -1, 1)
}

function windowResized() {
  resizeCanvas(
    min(500, windowWidth),
    min(500, windowHeight)
  )
}
