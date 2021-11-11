#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform float width;
uniform float height;


void main() {
  vec2 u_resolution = vec2(width, height);
  vec2 p = gl_FragCoord.xy / u_resolution.xy;
  vec4 col = vec4(0.0);

  float c = 0.0;
  for (int i = 0; i < 20; i++) {
    float j = float(i) * u_time * 0.02;
    vec2 p1 = vec2(
      0.5 + 0.3 * sin(u_time*1.0 + j*3.0),
      0.5 + 0.3 * sin(u_time*1.0 + j*3.0)
    );
    float d1 = distance(p, p1);
    float c1 = 0.01 / d1;
    c += c1;
  }
  for (int i = 0; i < 20; i++) {
    float j = float(i) * u_time * 0.02;
    vec2 p1 = vec2(
      0.5 + 0.25 * cos(u_time*1.0 + j*5.0),
      0.5 + 0.25 * cos(u_time*1.4 + j*5.0)
    );
    float d1 = distance(p, p1);
    float c1 = 0.005 / d1;
    c += c1;
  }

  col = vec4(vec3(smoothstep(0.9, 0.9001, c)), 1.0);

  gl_FragColor = vec4(col);
}
