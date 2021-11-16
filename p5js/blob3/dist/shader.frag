#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform float width;
uniform float height;

vec3 white = vec3(1.0);
vec3 blue = vec3(0.4, 0.0, 1.0);
vec3 red = vec3(1.0, 0.0, 0.4);
vec3 green = vec3(0.0, 1.0, 0.4);
vec3 orange = vec3(1.0, 0.4, 0.0);
vec3 yellow = vec3(1.0, 0.8, 0.0);
vec3 black = vec3(0.0);

vec4 col = vec4(black, 1.0);

void main(void) {
  vec2 u_resolution = vec2(width, height);
  vec2 p = gl_FragCoord.xy / u_resolution.xy;
  /* p.x *= u_resolution.x/u_resolution.y; */

  float c = 0.0;
  float size = 0.003;
  float f1 = 0.1;
  float f2 = 0.1;
  float f3 = 0.5;
  float f4 = 0.5;
  float f5 = 0.7;
  float f6 = 0.7;
  float lower_bound = 0.88;
  float upper_bound = 0.9;

  ///////////////////////////////////
  c = 0.0;
  for (int i = 0; i < 20; i++) {
    float j = (float(i)*5.02)/3.14159 + u_time;
    vec2 p1 = vec2(
      0.5 + (0.20 * (sin(u_time*0.13))) * sin((f1+j)),
      0.5 + (0.30 * (sin(u_time*0.27))) * cos((f2+j))
    );
    float d1 = distance(p, p1);
    float c1 = size / d1;
    c += c1;
  }
  float lines1 = smoothstep(
    lower_bound, upper_bound,
    mod(c, 0.1)*10.0
  );
  ///////////////////////////////////
  c = 0.0;
  for (int i = 0; i < 20; i++) {
    float j = float(i*7)/3.14159 + u_time;
    vec2 p1 = vec2(
      0.5 + (0.30 * (sin(u_time*0.05))) * sin((f1+j)),
      0.5 + (0.30 * (sin(u_time*0.05))) * cos((f2+j))
    );
    float d1 = distance(p, p1);
    float c1 = size / d1;
    c += c1;
  }
  float lines2 = smoothstep(
    lower_bound, upper_bound,
    mod(c, 0.1)*10.0
  );
  ///////////////////////////////////
  c = 0.0;
  for (int i = 0; i < 20; i++) {
    float j = float(i*5)/3.14159 + u_time;
    vec2 p1 = vec2(
      0.5 + (0.10 * (sin(u_time*0.05))) * sin((f1+j)),
      0.5 + (0.30 * (sin(u_time*0.05))) * cos((f2+j))
    );
    float d1 = distance(p, p1);
    float c1 = size / d1;
    c += c1;
  }
  float lines3 = smoothstep(
    lower_bound, upper_bound,
    mod(c, 0.1)*10.0
  );
  ///////////////////////////////////
  if (mod(u_time, 2.0) > 0.66) {
    col = mix(col, vec4(vec3(lines1)*blue, lines1), lines1);
  } else if (mod(u_time, 1.0) > 0.33) {
    col = mix(col, vec4(vec3(lines2)*red, lines2), lines2);
  } else {
    col = mix(col, vec4(vec3(lines3)*yellow, lines3), lines3);
  }
  /* col = mix(col, vec4(vec3(lines1)*blue, lines1), lines1);
  col = mix(col, vec4(vec3(lines2)*red, lines2), lines2);
  col = mix(col, vec4(vec3(lines3)*yellow, lines3), lines3); */


  /* col = vec4(vec3(lines) * green, 1.0); */

  gl_FragColor = vec4(col);
}
