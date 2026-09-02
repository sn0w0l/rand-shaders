#version 120
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

const vec3 colors[4] = vec3[](
    vec3(0.5, 0., 0.5),
    vec3(1.0),
    vec3(0.5),
    vec3(0.)
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
