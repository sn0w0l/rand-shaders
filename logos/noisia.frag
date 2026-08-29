#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float PI = 3.14159265359;
const float RATE = (2.0 * PI) / 3.0;

vec3 circle(in vec2 origin, in float r, in vec3 color, in vec2 coords) {
  float xx = coords.x - origin.x;
  float yy = coords.y - origin.y;
  float dist = (xx * xx) + (yy * yy) - (r * r);
  return vec3(1.0 - step(0.0, dist)) * color;
}

vec2 rotate(in vec2 c, in float rad) {
  float cr = cos(rad);
  float sr = sin(rad);
  return vec2(cr * c.x + -sr * c.y, sr * c.x + cr * c.y);
}

void main(){
    vec2 st = (gl_FragCoord.xy/u_resolution.xy * 2.0) - vec2(1.0, 1.0);
    vec3 color = vec3(0.0);

    vec2 disp = vec2(0.0, 0.48);
    float rate = u_time * RATE;

    color = circle(vec2(0.0), 1.0, vec3(1.0), st);
    color = color - circle(vec2(0.0), 0.9, vec3(1.0), st);
    color = color + circle(rotate(disp, rate), 0.41, vec3(1.0), st);
    color = color + circle(rotate(disp, RATE + rate), 0.41, vec3(1.0), st);
    color = color + circle(rotate(disp, rate - RATE), 0.41, vec3(1.0), st);


    gl_FragColor = vec4(color,1.0);
}
