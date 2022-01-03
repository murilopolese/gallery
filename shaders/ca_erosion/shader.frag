#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_buffer0;
uniform sampler2D u_buffer1;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 live = vec3(1.0);
vec3 dead = vec3(0.0);

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 pixel = 1.0/u_resolution;
    vec2 mouse = u_mouse/u_resolution;

#ifdef BUFFER_0

    float f1, f4, f7,
          f2, f5, f8,
          f3, f6, f9;

    f1 = texture2D(u_buffer1, st + pixel * vec2(-1., -1.)).r;
    f2 = texture2D(u_buffer1, st + pixel * vec2(-1., 0.)).r;
    f3 = texture2D(u_buffer1, st + pixel * vec2(-1., 1.)).r;
    f4 = texture2D(u_buffer1, st + pixel * vec2(0., -1.)).r;
    f5 = texture2D(u_buffer1, st + pixel * vec2(0., 0.)).r;
    f6 = texture2D(u_buffer1, st + pixel * vec2(0., 1.)).r;
    f7 = texture2D(u_buffer1, st + pixel * vec2(1., -1.)).r;
    f8 = texture2D(u_buffer1, st + pixel * vec2(1., 0.)).r;
    f9 = texture2D(u_buffer1, st + pixel * vec2(1., 1.)).r;

    vec3 color = vec3(f5);

    if (length(st - mouse) < 0.025) {
      color = live;
    }

    if (f5 == 1.0 && f4 == 1.0) {
      color = dead;
    }
    if (f5 == 0.0 && f6 == 1.0) {
      color = live;
    }

    if (f5 == 1.0 && f2 == 1.0 && f8 == 1.0) {
      color = dead;
    }

    if (f5 == 0.0 && f2 == 1.0 && f8 == 1.0) {
      color = live;
    }

    if (f5 == 1.0 && f2 == 1.0 && f8 == 0.0) {
      color = live;
    }
    if (f5 == 1.0 && f2 == 0.0 && f8 == 1.0) {
      color = live;
    }

    if (f5 == 0.0 && f2 == 1.0 && f8 == 0.0) {
      color = live;
    }
    if (f5 == 0.0 && f2 == 0.0 && f8 == 1.0) {
      color = live;
    }


    // Kill borders
    if (st.x > 0.9 || st.x < 0.1 || st.y > 0.9 || st.y < 0.1) {
      color = dead;
    }


    gl_FragColor = vec4(color, 1.0);
#elif defined( BUFFER_1 )
    // PONG BUFFER
    //
    //  Note: Just copy the content of the BUFFER0 so it can be
    //  read by it in the next frame
    //
    gl_FragColor = texture2D(u_buffer0, st);
#else

    // Main Buffer
    gl_FragColor = texture2D(u_buffer1, st);
#endif
}
