'use client'

import React, { useEffect, useRef } from 'react'

const VERT = `#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`

const FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2  iResolution;
uniform float iTime;
uniform vec2  iMouse;          // aspect-corrected units, same space as uv — the body node
uniform vec2  iMouseVel;       // lead node minus body node — a velocity proxy
uniform vec2  iMouseWake;      // a third, much slower node — the tail of the trail

uniform vec3  uBgColor, uColorA, uColorB, uColorC, uColorD;
uniform float uScale, uSpeed, uFlow, uRoughness, uLacunarity;
uniform float uSmokeScale, uCurl, uCurlScale, uRise, uSlender;
uniform float uWidth, uSpread, uLean, uDensity;
uniform float uContrast, uMidpoint, uGlow, uSink;
uniform float uGrain, uDither, uVignette;
uniform float uPointerRadius, uDraft, uPointerStrength, uParallax;
#define OCTAVES 3
#define TRAIL_TAPS 6
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

/* A mix-based cell hash rather than the fract(sin()) one. sin() hashing is
   correlated along the diagonal, and a jittered grid seeded from it lays its
   cells out in faint rows the eye finds immediately. */
float hash1(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float snoise(vec2 p) {
  const float K1 = 0.366025404, K2 = 0.211324865;
  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  float m = step(a.y, a.x);
  vec2 o = vec2(m, 1.0 - m);
  vec2 b = a - o + K2;
  vec2 c = a - 1.0 + 2.0 * K2;
  vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
  vec3 n = h * h * h * h * vec3(dot(a, hash2(i)), dot(b, hash2(i + o)), dot(c, hash2(i + 1.0)));
  return dot(n, vec3(70.0));
}

float fbm(vec2 p) {
  float v = 0.0, amp = 0.5;
  for (int i = 0; i < OCTAVES; i++) {
    v += amp * snoise(p);
    p *= uLacunarity;
    amp *= uRoughness;
  }
  return v;
}

/* The trail. The shader has no memory, so the tail is reconstructed from three
   pointer nodes: TRAIL_TAPS gaussians strung along the segment between the slow
   wake node and the body node, weighted toward the head. A resting cursor puts
   every tap in the same place and the result is one clean gaussian; a moving one
   stretches them into a tapered ribbon that melts away from the back as the wake
   catches up. No branch, no jump, and the same falloff at every point along it. */
float trail(vec2 uv, float radius) {
  /* The sample point is wobbled by a slow field first. A gaussian is a perfect
     circle, and a perfect circle parked under a resting cursor is the one thing
     that reads as drawn rather than felt; warping the coordinate by a fraction
     of the radius makes the touch an organic patch that breathes, for two noise
     taps and nothing else. */
  vec2 wob = vec2(snoise(uv * 1.7 + vec2(0.0, iTime * 0.05)),
                  snoise(uv * 1.7 + vec2(4.3, -iTime * 0.04)));
  uv += wob * radius * 0.18;
  float a = 0.0, wsum = 0.0;
  float r2 = max(1e-4, radius * radius);
  for (int i = 0; i < TRAIL_TAPS; i++) {
    float k = float(i) / float(TRAIL_TAPS - 1);
    vec2 c = mix(iMouseWake, iMouse, k);
    vec2 dd = uv - c;
    float w = mix(0.30, 1.0, k);
    a += w * exp(-dot(dd, dd) / r2);
    wsum += w;
  }
  return a / wsum;
}

/* The curl of a scalar potential — the cheapest divergence-free flow there is.
   Rotating the gradient of a noise field by ninety degrees gives a velocity field
   that can never pile up on itself, which is exactly what a plain domain warp
   gets wrong: a warp bunches smoke into knots, a curl folds it. Two octaves of
   potential, four taps for the two derivatives — eight noise evaluations for a
   flow field that behaves. */
float potential(vec2 p) {
  return snoise(p) + 0.5 * snoise(p * 2.03 + vec2(3.7, -1.9));
}

vec2 curl(vec2 p, float e) {
  float nx1 = potential(p + vec2(0.0, e));
  float nx2 = potential(p - vec2(0.0, e));
  float ny1 = potential(p + vec2(e, 0.0));
  float ny2 = potential(p - vec2(e, 0.0));
  return vec2(nx1 - nx2, ny2 - ny1) / (2.0 * e);
}

vec3 ramp4(float t) {
  vec3 c = mix(uColorA, uColorB, smoothstep(0.00, 0.36, t));
  c = mix(c, uColorC, smoothstep(0.32, 0.70, t));
  c = mix(c, uColorD, smoothstep(0.66, 1.00, t));
  return c;
}

// triangular-PDF dither — the only reliable cure for 8-bit gradient banding
float triDither(vec2 fc) {
  float a = fract(sin(dot(fc, vec2(12.9898, 78.233))) * 43758.5453);
  float b = fract(sin(dot(fc + 17.0, vec2(12.9898, 78.233))) * 43758.5453);
  return (a + b - 1.0) / 255.0;
}

// ---- house grain.
uniform float uGrainAnim;
float houseGrain(vec2 fc) {
  uvec2 q = uvec2(fc) * uvec2(1597334677u, 3812015801u)
          + uint(floor(iTime * 24.0 * uGrainAnim)) * 2654435769u;
  uint n = q.x ^ q.y; n = n * 1664525u + 1013904223u; n ^= n >> 16u; n *= 2246822519u; n ^= n >> 13u;
  float a = float(n & 0xffffu) / 65535.0;
  n *= 3266489917u; n ^= n >> 16u;
  float b = float(n & 0xffffu) / 65535.0;
  return a + b - 1.0;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution) / iResolution.y;
  float t = iTime * uSpeed;

  float tr = trail(uv, uPointerRadius);

  vec2 p = (uv - iMouse * uParallax) * uScale;

  // the column rises
  vec2 sp = p + vec2(0.0, -t * uRise);

  // the flow that carries it, plus the draught the hand puts into the room
  vec2 c = curl(sp * uCurlScale + vec2(0.0, t * uFlow), 0.14) * uCurl;
  c += iMouseVel * uDraft * tr;

  // the smoke itself, stretched vertically
  vec2 mp = vec2(sp.x, sp.y * uSlender) * uSmokeScale + c;
  float dens = fbm(mp) * 0.5 + 0.5;

  // the corridor the column climbs
  float h = uv.y + 0.55;
  float lean = iMouse.x * uLean * clamp(h, 0.0, 1.6);
  float width = max(0.06, uWidth * (0.45 + uSpread * clamp(h, 0.0, 1.8)));
  float xr = (uv.x - lean) / width;
  float corridor = exp(-xr * xr);

  // and it thins as it cools on the way up
  float cool = smoothstep(-0.65, 0.85, uv.y);
  float smoke = dens * corridor * mix(1.0, 0.30, cool) * uDensity;

  // and the stirred air carries a little more of it
  float f = clamp((smoke - uMidpoint) * uContrast + 0.5 + tr * uPointerStrength * 0.30, 0.0, 1.0);

  vec3 col = ramp4(f);
  col += uColorD * uGlow * pow(f, 4.0);
  col = mix(uBgColor, col, smoothstep(0.0, max(0.01, uSink), f) * 0.90 + 0.10);
  col *= 1.0 - uVignette * dot(uv, uv);
  { float hgL = clamp(dot(col, vec3(0.299, 0.587, 0.114)), 0.0, 1.0);
    col += houseGrain(gl_FragCoord.xy) * uGrain * mix(1.0, 4.0 * hgL * (1.0 - hgL), 0.6); }
  col += triDither(gl_FragCoord.xy) * uDither;

  fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`

function hexToVec3(hex: string): [number, number, number] {
  let c = hex.replace('#', '')
  if (c.length === 3) c = c.split('').map(x => x + x).join('')
  const num = parseInt(c, 16)
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255
  ]
}

const CONFIG = {
  bgColor: "#050505",
  colorA: "#141414",
  colorB: "#333333",
  colorC: "#6e6e6e",
  colorD: "#e8e8e8",
  contrast: 1.7,
  curl: 0.36,
  curlScale: 0.88,
  cursor: 1,
  density: 2.15,
  dither: 1.1,
  draft: 1.85,
  flow: 0.04,
  glow: 0.53,
  grain: 0.12,
  grainAnim: 0,
  lacunarity: 2.55,
  lean: 1.25,
  maxDpr: 1,
  midpoint: 0.76,
  parallax: 0.028,
  pointerRadius: 0.84,
  pointerStrength: 0.16,
  rise: 0.03,
  roughness: 0.36,
  scale: 0.2,
  sink: 0.2,
  slender: 1.55,
  smokeScale: 2.51,
  speed: 0.33,
  spread: 1.11,
  vignette: 0.26,
  width: 1.55
}

export default function FlueHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance'
    })

    if (!gl) {
      console.warn('WebGL2 not available on this device.')
      return
    }

    function compile(type: number, src: string) {
      const sh = gl!.createShader(type)!
      gl!.shaderSource(sh, src)
      gl!.compileShader(sh)
      if (!gl!.getShaderParameter(sh, gl!.COMPILE_STATUS)) {
        const info = gl!.getShaderInfoLog(sh)
        gl!.deleteShader(sh)
        throw new Error(info || 'Shader compilation failed')
      }
      return sh
    }

    let program: WebGLProgram
    try {
      program = gl.createProgram()!
      gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT))
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || 'Program link failed')
      }
    } catch (e) {
      console.error('Flue WebGL compile error:', e)
      return
    }

    gl.useProgram(program)
    gl.bindVertexArray(gl.createVertexArray())

    const LOC: Record<string, WebGLUniformLocation | null> = {}
    const loc = (n: string) => (n in LOC ? LOC[n] : (LOC[n] = gl.getUniformLocation(program, n)))
    const u1f = (n: string, v: number) => gl.uniform1f(loc(n), v)
    const u2f = (n: string, x: number, y: number) => gl.uniform2f(loc(n), x, y)
    const u3c = (n: string, hex: string) => {
      const c = hexToVec3(hex)
      gl.uniform3f(loc(n), c[0], c[1], c[2])
    }

    function applyConfig() {
      gl!.useProgram(program)
      u3c('uBgColor', CONFIG.bgColor)
      u3c('uColorA', CONFIG.colorA)
      u3c('uColorB', CONFIG.colorB)
      u3c('uColorC', CONFIG.colorC)
      u3c('uColorD', CONFIG.colorD)
      u1f('uScale', CONFIG.scale)
      u1f('uSpeed', CONFIG.speed)
      u1f('uFlow', CONFIG.flow)
      u1f('uRoughness', CONFIG.roughness)
      u1f('uLacunarity', CONFIG.lacunarity)
      u1f('uSmokeScale', CONFIG.smokeScale)
      u1f('uCurl', CONFIG.curl)
      u1f('uCurlScale', CONFIG.curlScale)
      u1f('uRise', CONFIG.rise)
      u1f('uSlender', CONFIG.slender)
      u1f('uWidth', CONFIG.width)
      u1f('uSpread', CONFIG.spread)
      u1f('uLean', CONFIG.lean)
      u1f('uDensity', CONFIG.density)
      u1f('uContrast', CONFIG.contrast)
      u1f('uMidpoint', CONFIG.midpoint)
      u1f('uGlow', CONFIG.glow)
      u1f('uSink', CONFIG.sink)
      u1f('uGrain', CONFIG.grain)
      u1f('uGrainAnim', CONFIG.grainAnim)
      u1f('uDither', CONFIG.dither)
      u1f('uVignette', CONFIG.vignette)
      u1f('uPointerRadius', CONFIG.pointerRadius)
      u1f('uDraft', CONFIG.draft)
      u1f('uPointerStrength', CONFIG.pointerStrength)
      u1f('uParallax', CONFIG.parallax)
      resize()
    }

    let dpr = 1
    function resize() {
      if (!canvas || !gl) return
      dpr = Math.min(window.devicePixelRatio || 1, CONFIG.maxDpr)
      const rect = canvas.getBoundingClientRect()
      const w = Math.max(1, Math.round(rect.width * dpr))
      const h = Math.max(1, Math.round(rect.height * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      gl.viewport(0, 0, w, h)
      gl.useProgram(program)
      u2f('iResolution', w, h)
    }

    let resizeQueued = false
    const onResize = () => {
      if (resizeQueued) return
      resizeQueued = true
      requestAnimationFrame(() => {
        resizeQueued = false
        resize()
      })
    }
    window.addEventListener('resize', onResize, { passive: true })

    const mouse = { x: 0, y: 0, ax: 0, ay: 0, wx: 0, wy: 0, tx: 0, ty: 0, rest: { x: 0, y: 0 } }
    const aim = (e: PointerEvent) => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const a = rect.width / (rect.height || 1)
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * a
      mouse.ty = 0.5 - (e.clientY - rect.top) / (rect.height || 1)
    }

    window.addEventListener('pointermove', aim, { passive: true })
    window.addEventListener('pointerdown', aim, { passive: true })

    let visible = true
    const observer = new IntersectionObserver(es => {
      visible = es[0].isIntersecting
    }, { threshold: 0 })
    observer.observe(canvas)

    let animId: number
    const t0 = performance.now()
    let prevT = t0, clock = 0

    function frame(now: number) {
      animId = requestAnimationFrame(frame)
      const raw = now - prevT
      prevT = now
      if (!visible || document.hidden || !gl) return

      const ms = raw > 50 ? 50 : raw < 4.167 ? 4.167 : raw
      const s = ms > 36.7 ? 2.2 : ms * 0.06
      clock += ms * 0.001

      const kLead = 0.105 * s, kBody = 0.043 * s, kWake = 0.017 * s
      mouse.ax += (mouse.tx - mouse.ax) * kLead
      mouse.ay += (mouse.ty - mouse.ay) * kLead
      mouse.x += (mouse.ax - mouse.x) * kBody
      mouse.y += (mouse.ay - mouse.y) * kBody
      mouse.wx += (mouse.x - mouse.wx) * kWake
      mouse.wy += (mouse.y - mouse.wy) * kWake

      gl.useProgram(program)
      u1f('iTime', clock)
      u2f('iMouse', mouse.x, mouse.y)
      u2f('iMouseVel', mouse.ax - mouse.x, mouse.ay - mouse.y)
      u2f('iMouseWake', mouse.wx, mouse.wy)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    applyConfig()
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    animId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', aim)
      window.removeEventListener('pointerdown', aim)
      observer.disconnect()
      if (gl && program) {
        gl.deleteProgram(program)
      }
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full block pointer-events-none"
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}
