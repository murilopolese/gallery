precision highp float;

uniform float width;
uniform float height;
uniform float u_time;

void main() {
    vec2 u_resolution = vec2(width, height);
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    float pct = smoothstep(
      mod(distance(st, vec2(0.7, 0.5)), 0.1) * 10.0 - 0.001,
      mod(distance(st, vec2(0.3, 0.5)), 0.1) * 10.0 + 0.001,
      st.x - 1.1 * sin(u_time * 0.5)
    );
    vec3 color = pct * vec3(1.0, 1.0, 1.0);

    gl_FragColor = vec4(color,1.0);
}
