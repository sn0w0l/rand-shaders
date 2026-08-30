#version 120
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

const vec3 colors[6] = vec3[](
    vec3(0.631,0.,0.753),
    vec3(0.255,0.251,0.996),
    vec3(0.,0.475,0.251),
    vec3(1.,1.,0.004),
    vec3(1.,0.498,0.),
    vec3(0.941,0.,0.004)
);


const float lw = 1.0 / colors.length();

vec3 paintline(in float from, in float to, in vec3 color, in float y) {
    vec3 c = vec3(0.0);

    c += color * step(from, y);
    c -= color * step(to, y);

    return c;
}

float plot(vec2 st, float pct){
  return  step( pct-lw*2.0, st.y) -
          step( pct+lw*2.0, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(0.0);

    float a = abs(st.x - 0.5) * -2.0 + lw * 4.0;

    for (int i = 0; i < colors.length(); i++) {
      float from = float(i) * lw;
      float to = float(i + 1) * lw;
      color += paintline(
        from,
        to,
        mix(vec3(1.0 - mod(float(i), 2.0)), colors[i], plot(st, a)),
        st.y
      );
    }

    gl_FragColor = vec4(color, 1.0);
}
