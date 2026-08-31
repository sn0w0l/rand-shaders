#version 120
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.x;
    vec3 color = vec3(1.,0.847,0.);

    vec2 center = vec2(0.5, 0.5 * (u_resolution.y / u_resolution.x));

    float r = distance(center, st);
    float circ = step(0.15, r) - step(0.2, r);


    color = mix(color, vec3(0.475,0.008,0.667), circ);


    gl_FragColor = vec4(color, 1.0);
}
