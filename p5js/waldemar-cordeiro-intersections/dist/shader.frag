precision highp float;
vec2 res = vec2(500, 500);
vec3 c1[4];
vec3 c2[5];

vec3 col = vec3(0, 0, 0);
uniform float u_time;
uniform float width;
uniform float height;

float dist(float ax, float ay, float bx, float by) {
  return sqrt(
    pow(ax - bx, 2.0) +
    pow(ay - by, 2.0)
  );
}

bool stroke(vec3 a) {
  return dist(gl_FragCoord.x, gl_FragCoord.y, a.x, a.y) < (a.z + width*0.005)
      && dist(gl_FragCoord.x, gl_FragCoord.y, a.x, a.y) > a.z;
}

float map(float x, float in_min, float in_max, float out_min, float out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

void main() {
  float dt = map(sin(u_time*0.5), -1.0, 1.0, 0.1, 1.0);
  for (int i = 0; i < 4; i++) {
    c1[i] = vec3(
      map(sin(u_time), -1.0, 1.0, width*0.30, width*0.6),
      map(cos(u_time), -1.0, 1.0, height*0.30, height*0.6),
      (width*0.05)+(float(i)*(width*0.05))
    );
  }
  for (int i = 0; i < 5; i++) {
    c2[i] = vec3(
      map(sin(u_time+3.14 + dt), -1.0, 1.0, width*0.360, width*0.6),
      map(cos(u_time+3.14 + dt), -1.0, 1.0, height*0.360, height*0.6),
      (width*0.05)+(float(i)*(width*0.05))
    );
  }

  bool dc1_0 = dist(gl_FragCoord.x, gl_FragCoord.y, c1[0].x, c1[0].y) < c1[0].z;
  bool dc1_1 = dist(gl_FragCoord.x, gl_FragCoord.y, c1[1].x, c1[1].y) < c1[1].z;
  bool dc1_2 = dist(gl_FragCoord.x, gl_FragCoord.y, c1[2].x, c1[2].y) < c1[2].z;
  bool dc1_3 = dist(gl_FragCoord.x, gl_FragCoord.y, c1[3].x, c1[3].y) < c1[3].z;
  bool dc2_0 = dist(gl_FragCoord.x, gl_FragCoord.y, c2[0].x, c2[0].y) < c2[0].z;
  bool dc2_1 = dist(gl_FragCoord.x, gl_FragCoord.y, c2[1].x, c2[1].y) < c2[1].z;
  bool dc2_2 = dist(gl_FragCoord.x, gl_FragCoord.y, c2[2].x, c2[2].y) < c2[2].z;
  bool dc2_3 = dist(gl_FragCoord.x, gl_FragCoord.y, c2[3].x, c2[3].y) < c2[3].z;
  bool dc2_4 = dist(gl_FragCoord.x, gl_FragCoord.y, c2[4].x, c2[4].y) < c2[4].z;

  bool filled = (
    (dc1_0)
    || (dc1_1 && dc2_3 && !dc2_2)
    || (dc1_2 && dc2_2 && !dc2_1)
    || (dc1_3 && dc2_1 && !dc2_0)
  );
  bool line  = (
    stroke(c1[0]) || stroke(c1[1]) || stroke(c1[2]) || stroke(c1[3]) ||
    stroke(c2[0]) || stroke(c2[1]) || stroke(c2[2]) || stroke(c2[3]) || stroke(c2[4])
  );

  if (filled || line) {
    col = vec3(0.0, 0.0, 0.0);
  } else {
    col = vec3(0.95, 0.95, 0.95);
  }

  gl_FragColor = vec4(col,1.0);
}
