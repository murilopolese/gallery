let size = 500
let d

function setup() {
  let varying = 'precision highp float; varying vec2 vPos;';
  let vs = `
  ${varying}
  attribute vec3 aPosition;
  void main() { 
    vPos = (gl_Position = vec4(aPosition,1.0)).xy; 
  }
  `
  let fs = `
  ${varying}
  vec2 res = vec2(${size*pixelDensity()}, ${size*pixelDensity()});
  uniform float t;
  void main() {
      vec3 col = vec3(
        mod( 
          (gl_FragCoord.x*gl_FragCoord.y) + t, 
          res.x
        )  / res.x,
        mod( 
          (gl_FragCoord.x*gl_FragCoord.y) + t,
          res.x
        )  / res.x,
        mod( 
          (gl_FragCoord.x*gl_FragCoord.y) + t, 
          res.x
        )  / res.x
      );
      gl_FragColor = vec4(col,1.0);
  }
  `
  createCanvas(
    min(size, windowWidth), 
    min(size, windowWidth), 
    WEBGL
  )
  d = createShader(vs, fs)
  shader(d)
  d.setUniform('t', 1)
  noStroke()
}

function draw() {
  d.setUniform('t', millis())
  quad(-1, -1, 1, -1, 1, 1, -1, 1)
}