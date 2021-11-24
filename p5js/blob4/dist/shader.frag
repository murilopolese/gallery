#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

vec3 white = vec3(1.0);
vec3 blue = vec3(0.4, 0.0, 1.0);
vec3 red = vec3(1.0, 0.0, 0.4);
vec3 green = vec3(0.0, 1.0, 0.4);
vec3 orange = vec3(1.0, 0.4, 0.0);
vec3 yellow = vec3(1.0, 0.8, 0.0);
vec3 black = vec3(0.0);

vec4 col = vec4(black, 1.0);

void main(void) {
  vec2 p = gl_FragCoord.xy / u_resolution.xy;
  /* p.x *= u_resolution.x/u_resolution.y; */

  float c = 0.0;
  float size = 0.1;
  float f1 = 0.1;
  float f2 = 0.11;
  float f3 = 0.12;
  float f4 = 0.11;
  float f5 = 0.12;
  float f6 = 0.13;

  ///////////////////////////////////
  c = 0.0;
  for (int i = 0; i < 20; i++) {
    float j = float(i) * u_time * 0.02;
    vec2 p1 = vec2(
      0.5 + 0.35 * sin(2.0*sin(u_time*f1) + j*3.0),
      0.5 + 0.35 * cos(2.0*sin(u_time*f2) + j*3.0)
    );
    float d1 = distance(p, p1);
    float c1 = size / d1;
    c += c1;
  }
  float lines1 = smoothstep(
    0.1, 0.9,
    mod(c, 0.1)*10.0
  );
  ///////////////////////////////////
  c = 0.0;
  for (int i = 0; i < 20; i++) {
    float j = float(i) * u_time * 0.02;
    vec2 p1 = vec2(
      0.5 + 0.35 * sin(2.0*sin(u_time*f3) + j*3.0),
      0.5 + 0.35 * cos(2.0*sin(u_time*f4) + j*3.0)
    );
    float d1 = distance(p, p1);
    float c1 = size / d1;
    c += c1;
  }
  float lines2 = smoothstep(
    0.1, 0.9,
    mod(c, 0.1)*10.0
  );
  ///////////////////////////////////
  c = 0.0;
  for (int i = 0; i < 20; i++) {
    float j = float(i) * u_time * 0.02;
    vec2 p1 = vec2(
      0.5 + 0.35 * sin(2.0*sin(u_time*f5) + j*3.0),
      0.5 + 0.35 * cos(2.0*sin(u_time*f6) + j*3.0)
    );
    float d1 = distance(p, p1);
    float c1 = size / d1;
    c += c1;
  }
  float lines3 = smoothstep(
    0.1, 0.9,
    mod(c, 0.1)*10.0
  );
  ///////////////////////////////////
  col = mix(col, vec4(vec3(lines3)*yellow, lines3), lines3);
  col = mix(col, vec4(vec3(lines2)*red, lines2), lines2);
  col = mix(col, vec4(vec3(lines1)*blue, lines1), lines1);


  /* col = vec4(vec3(lines) * green, 1.0); */

  gl_FragColor = vec4(col);
}
