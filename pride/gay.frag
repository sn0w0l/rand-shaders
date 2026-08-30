#version 120
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

const vec3 colors[7] = vec3[](
    vec3(0.239,0.102,0.471),
    vec3(0.314,0.286,0.796),
    vec3(0.482,0.678,0.886),
    vec3(1.0),
    vec3(0.596,0.91,0.757),
    vec3(0.149,0.808,0.667),
    vec3(0.027,0.557,0.439)
);

const float lw = 1.0 / colors.length();

vec3 paintline(in float from, in float to, in vec3 color, in float y) {
    vec3 c = vec3(0.0);

    c += color * step(from, y);
    c -= color * step(to, y);

    return c;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(0.0);


    for (int i = 0; i < colors.length(); i++) {
      float from = float(i) * lw;
      float to = float(i + 1) * lw;
      color += paintline(from, to, colors[i], st.y);
    }


    gl_FragColor = vec4(color, 1.0);
}
