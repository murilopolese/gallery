precision highp float;

uniform float width;
uniform float height;
uniform float u_time;

void main() {
  vec2 u_resolution = vec2(width, height);
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.0);

  float d = distance(vec2(0.5, 0.5), st);

  color = vec3(
      smoothstep(
        d-0.001, d, sin(0.005*u_time*st.y)*0.4
      ),
      smoothstep(
        d-0.001, d, cos(0.005*u_time*(st.y+0.1))*0.4
      ),
      smoothstep(
        d-0.001, d, tan(0.005*u_time*(st.y+0.2))*0.4
      )
  );

  gl_FragColor = vec4(color, 1.0);
}
