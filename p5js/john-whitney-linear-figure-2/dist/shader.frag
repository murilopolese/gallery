#ifdef GL_ES
precision mediump float;
#endif

#define M_PI 3.1415926535897932384626433832795
#define XY_SCALE 5.0
#define TIME_SCALE 15.
#define TIME_SCALE_INT 15

uniform float u_time;
uniform float width;
uniform float height;
/* uniform vec2 u_resolution; */

// From http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
float rand(vec2 co) {
    float a = 12.9898;
    float b = 78.233;
    float c = 43758.5453;
    float dt= dot(co.xy ,vec2(a,b));
    float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

vec3 random3(int seed) {
    return vec3(
        rand(vec2(float(seed + 383), float(seed + 389))),
        rand(vec2(float(seed + 397), float(seed + 401))),
        rand(vec2(float(seed + 409), float(seed + 419)))
    );
}

// // https://gist.github.com/patriciogonzalezvivo/114c1653de9e3da6e1e3
vec3 rgb2hsv(vec3 c){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 0.000000000001;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb( in vec3 c ){
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
    return c.z * mix( vec3(1.0), rgb, c.y);
}

float lineDist(vec2 v, vec2 w, vec2 p) {
    // Return minimum distance between line segment vw and point p
    float l2 = pow(distance(v, w), 2.);  // i.e. |w-v|^2 -  avoid a sqrt
    if (l2 == 0.0)
        return distance(p, v);   // v == w case
    // Consider the line extending the segment, parameterized as v + t (w - v).
    // We find projection of point p onto the line.
    // It falls where t = [(p-v) . (w-v)] / |w-v|^2
    float t = dot(p - v, w - v) / l2;
    if (t < 0.0)
        return distance(p, v);       // Beyond the 'v' end of the segment
    else if (t > 1.0)
        return distance(p, w);  // Beyond the 'w' end of the segment
    vec2 projection = v + t * (w - v);  // Projection falls on the segment
    return distance(p, projection);
}

float nearZero(float val, float nearness) {
    return smoothstep(-nearness, 0., -val)
         * smoothstep(-nearness, 0., val);
}

void main() {
    vec2 u_resolution = vec2(width, height);
    vec2 pos = gl_FragCoord.xy;
    vec2 center = u_resolution * 0.5;
    vec2 centerDiff = (pos - center) / 70.;
    //float th = atan(centerDiff.y, centerDiff.x);

    // Map onto (-XY_SCALE, XY_SCALE)
    vec2 uv = XY_SCALE * 2.0 * pos / u_resolution - vec2(XY_SCALE, XY_SCALE);

    float t2 = mod((u_time / TIME_SCALE), 1.);
    float t3 = smoothstep(0., 0.5, t2) - smoothstep(0.5, 1., t2);

    int period = int(floor(u_time / TIME_SCALE));
    int seed = period * 7793;
    int nextSeed = (period+ 1) * 7793;

    vec3 color = vec3(0.);
    vec3 c = vec3(1.0);

    float A = 5.0, B = 5.0;
    float a = 4.0, b = 3.0;

    float minDist = 100.0;
    for (int i = 0; i < 25; ++i) {
        float t = float(i) / 30.0;

        float x0 = A * sin(a * t + u_time);
        float y0 = B * cos(b * t + u_time);

        float x1 = A * sin((a) * (t) + u_time);
        float y1 = B * cos((b) * (t) + u_time);

        float x2 = (A*0.5) * sin(-1.5 * a * t - u_time);
        float y2 = (B*0.5) * cos(-1.5 * b * t - u_time);
        float x3 = (A*0.5) * sin(-1.5 * a * (t) - u_time);
        float y3 = (B*0.5) * cos(-1.5 * b * (t) - u_time);

        float dist = lineDist(
          vec2(x0, y0),
          vec2(x2, y2),
          centerDiff
        );
        minDist = min(dist, minDist);
    }

    color = mix(
            vec3(0.13, 0.0, 1.0),
            vec3(1.0, 1.0, 1.0),
            nearZero(
                minDist,
                0.17
            )
        );

    gl_FragColor = vec4(color, 1.);
}
