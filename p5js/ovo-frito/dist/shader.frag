

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform float n;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform int pointSize;
uniform vec2 points[60];

/*
author: Patricio Gonzalez Vivo
description: clamp a value between 0 and 1
use: saturation(<float|vec2|vec3|vec4> value)
license: |
  Copyright (c) 2017 Patricio Gonzalez Vivo.
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
float saturate( float x){ return clamp(x, 0.0, 1.0); }
vec2  saturate( vec2 x ){ return clamp(x, 0.0, 1.0); }
vec3  saturate( vec3 x ){ return clamp(x, 0.0, 1.0); }
vec4  saturate( vec4 x ){ return clamp(x, 0.0, 1.0); }

/*\
author: Inigo Quiles
description: Segment SDF
use: lineSDF(<vec2> st, <vec2> A, <vec2> B)
license: |
    The MIT License
    Copyright © 2020 Inigo Quilez
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
float lineSDF( in vec2 st, in vec2 a, in vec2 b ) {
    vec2 b_to_a = b - a;
    vec2 to_a = st - a;
    float h = saturate(dot(to_a, b_to_a)/dot(b_to_a, b_to_a));
    return length(to_a - h * b_to_a );
}

vec3 white = vec3(1.0);
vec3 black = vec3(1.0);
vec3 red = vec3(1.0, 0.0, 0.4);
vec3 blue = vec3(0.4, 0.0, 1.0);
vec3 yellow = vec3(1.0, 1.0, 0.0);

void main(void) {
  vec2 p = gl_FragCoord.xy / u_resolution.xy;
  /* p.x *= u_resolution.x/u_resolution.y; */

  float d = 0.0;
  vec3 col = vec3(d);

  d = 0.0;
  for (int i = 1; i < 30; i++) {
    if (points[i].x == 0.0) continue;
    d += lineSDF(p, points[i-1], points[i]);
    d -= 1.0 - smoothstep(
      0.1, 0.2, lineSDF(p, points[i-1], points[i])
    );
  }
  col = step(mod(d, 1.0), 0.5) * yellow;


  gl_FragColor = vec4(col, 1.0);
}
