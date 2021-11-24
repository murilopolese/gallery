#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float f = smoothstep(
      mod(
        distance(
          st,
          vec2(
            0.5 + 0.1*sin(-0.5*u_time*2.0),
            0.5 + 0.2*cos(-0.5*u_time)
          )
        ),
        0.1
      ),
      mod(
        distance(
          st,
          vec2(
            0.5 + 0.45*sin(0.5*u_time),
            0.5
          )
        ),
        0.1
      ),
      0.0
    );

    vec3 color = f * vec3(1.0);

    gl_FragColor = vec4(color,1.0);
}
