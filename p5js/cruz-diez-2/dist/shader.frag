#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform float width;
uniform float height;

mat2 rotate2d(float _angle){
    return mat2(
      cos(_angle),-sin(_angle),
      sin(_angle),cos(_angle)
    );
}

void main(void) {
  vec2 u_resolution = vec2(width, height);
  vec2 p = gl_FragCoord.xy/u_resolution.xy;
  p.x *= u_resolution.x/u_resolution.y;

  vec4 col = vec4(0.0);
  float f = 200.0;
  float sl = 0.5; float su = 0.8;
  float d = 0.0;


  d = smoothstep( sl, su, abs(sin(p.y*f)) );
  if (d > sl) {
    col = vec4(vec3(0.9, 0.0, 0.4),1.0);
  }

  p = rotate2d(0.015 + 0.015*cos(u_time*0.3)) * p;
  d = smoothstep( sl, su, abs(sin(p.y*f)) );
  col = mix(col,vec4(vec3(0.4, 0.9, 0.0),1.0),d);

  /* p.x = sin(u_time*0.5); */
  p = rotate2d(0.015 + 0.015*sin(u_time*0.3)) * p;
  d = smoothstep( sl, su, abs(sin(p.y*f)) );
  col = mix(col,vec4(vec3(0.4, 0.0, 0.9),1.0), d);

  gl_FragColor = vec4(col);
}
