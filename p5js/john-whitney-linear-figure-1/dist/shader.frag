precision mediump float;

#define PI 3.14159265359
#define PI_2 6.2831
#define LENGTH 10

uniform float width;
uniform float height;
uniform float u_time;

float dist(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp( dot(pa, ba) / dot(ba, ba), 0.0, 1.0 );
    return length( pa - ba*h );
}

vec2 n[LENGTH];
vec2 m[LENGTH];

void main() {
  vec2 u_resolution = vec2(width, height);
  for (int i = 0; i < LENGTH; i++) {
    float phase1 = u_time + (float(i) * (PI_2/float(LENGTH)));
    float phase2 = 0.8*u_time + (float(i) * (PI_2/float(LENGTH)));
    n[i] = vec2(
      (0.5 + 0.2 * sin(phase1)) + 0.1*sin(0.23*u_time),
      (0.5 + 0.2 * cos(phase1)) + 0.1*cos(0.33*u_time)
    );
    m[i] = vec2(
      (0.5 + 0.2 * sin(phase2)) + 0.1*sin(-0.47*u_time),
      (0.5 + 0.2 * cos(phase2)) + 0.1*cos(-0.13*u_time)
    );
  }

  vec3 color = vec3(0.1);
  /* vec3 color = vec3(0.0, 0.0, 1.0); */
  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  vec2 p = st;

  for (int i = 0; i < LENGTH; i++) {
    color += vec3(
      smoothstep(
        dist(p, n[i], m[i])-0.005,
        dist(p, n[i], m[i])+0.005,
        0.01
      )
    );
    /* if (dist(p, n[i], m[i]) < 0.007) {
      color = vec3(1.0);
    } */
  }

  gl_FragColor = vec4(color, 1.0);
}
