/**
 * GLSL utilities + shader source for the Trust Core.
 *
 * Vertex shader: icosahedron displaced by 3D simplex noise. Displacement
 * intensity is driven by uniforms (uTime, uDistort, uAudio, uPhase) so the
 * core breathes, deforms on scroll, and reacts to audio amplitude.
 *
 * Fragment shader: two-tone gradient (chartreuse → violet) blended by phase,
 * with fresnel rim glow and a subtle inner noise pattern.
 *
 * 3D simplex noise from Ashima Arts / Stefan Gustavson (public domain).
 */

export const snoise3D = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
        i.z+vec4(0.0,i1.z,i2.z,1.0))
      + i.y+vec4(0.0,i1.y,i2.y,1.0))
      + i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

export const trustCoreVert = /* glsl */ `
uniform float uTime;
uniform float uDistort;
uniform float uAudio;
uniform float uPhase;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoise;

${snoise3D}

void main() {
  // Base position
  vec3 pos = position;

  // Layered noise: large slow-moving body + smaller fast ripples
  float n1 = snoise(pos * 1.4 + vec3(uTime * 0.18, uTime * 0.12, uTime * 0.09));
  float n2 = snoise(pos * 3.6 + vec3(uTime * 0.4));
  float n3 = snoise(pos * 9.0 + vec3(uTime * 0.9));
  float n = n1 * 0.6 + n2 * 0.3 + n3 * 0.1;

  // Phase morph: 0..1 across the page — at later phases we shatter outward
  float shatter = smoothstep(0.55, 1.0, uPhase) * 0.7;
  float displaceAmp = uDistort + uAudio * 0.25 + shatter * 0.55;

  vec3 displaced = pos + normal * n * displaceAmp;
  vNoise = n;
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPos = modelViewMatrix * vec4(displaced, 1.0);
  vPosition = mvPos.xyz;
  gl_Position = projectionMatrix * mvPos;
}`;

export const trustCoreFrag = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uPhase;
uniform float uAudio;
uniform vec3 uColorA;     // chartreuse
uniform vec3 uColorB;     // violet
uniform vec3 uColorRim;   // off-white rim

varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoise;

void main() {
  // View direction in view space
  vec3 viewDir = normalize(-vPosition);
  float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.2);

  // Noise-driven gradient mix
  float mixT = clamp(vNoise * 0.5 + 0.5, 0.0, 1.0);

  // Phase shift toward violet as we scroll deeper
  float phaseMix = smoothstep(0.0, 0.7, uPhase);
  vec3 baseA = mix(uColorA, uColorB, phaseMix * 0.6);
  vec3 baseB = mix(uColorB, uColorA * 0.6, phaseMix * 0.4);
  vec3 base = mix(baseA, baseB, mixT);

  // Inner core darkening + rim glow
  vec3 col = base * (0.35 + 0.65 * (1.0 - fresnel));
  col += uColorRim * fresnel * (1.2 + uAudio * 0.8);

  // Faint scan-line / pulse
  float pulse = 0.5 + 0.5 * sin(uTime * 1.2 + vNoise * 6.0);
  col += baseA * 0.04 * pulse;

  gl_FragColor = vec4(col, 1.0);
}`;
