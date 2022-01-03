

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform float n;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 points[30];

/*
author: Patricio Gonzalez Vivo
description: Returns a circle-shaped SDF.
use: circleSDF(vec2 st[, vec2 center])
options:
    CIRCLESDF_FNC(POS_UV) : function used to calculate the SDF, defaults to GLSL length function, use lengthSq for a different slope
license: |
    Copyright (c) 2017 Patricio Gonzalez Vivo. All rights reserved.
    Distributed under BSD 3-clause "New" or "Revised" License. See LICENSE file at
    https://github.com/patriciogonzalezvivo/PixelSpiritDeck
*/
float circleSDF(in vec2 st, in vec2 center) {
    return length(st - center) * 2.;
}

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

void main(void) {
  vec2 p = gl_FragCoord.xy / u_resolution.xy;
  /* p.x *= u_resolution.x/u_resolution.y; */

  float d = 0.0;
  vec3 col = vec3(d);

  d = 0.0;
  for (int i = 0; i < 30; i++) {
    d += 1.0 - smoothstep(
      0.0, 0.10, circleSDF(p, points[i])
    );
  }
  d = smoothstep(
    0.304, 0.305, d
  );
  col = col + vec3(d);
  vec3 col1 = col.r * blue;

  d = 0.0;
  for (int i = 0; i < 30; i++) {
    d += 1.0 - smoothstep(
      0.0, 0.25, circleSDF(p, points[i])
    );
  }
  d = smoothstep(
    0.304, 0.305, d
  );
  col = col + vec3(d);
  vec3 col2 = step(col.r, 0.5) * red;

  col = mix(col1, col2, 0.5) * 2.0;


  gl_FragColor = vec4(col, 1.0);
}
