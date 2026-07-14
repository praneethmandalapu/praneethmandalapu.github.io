"use client";

import { memo, useEffect, useRef } from "react";

// Theme-tinted silk: base surface, fold shadow, champagne sheen.
const THEME_COLORS = {
  onyx: {
    base: [0.071, 0.067, 0.063],
    fold: [0.243, 0.208, 0.157],
    sheen: [0.776, 0.663, 0.486],
    amount: 0.72,
  },
  ivory: {
    base: [0.965, 0.949, 0.922],
    fold: [0.871, 0.831, 0.745],
    sheen: [0.776, 0.663, 0.486],
    amount: 0.5,
  },
} as const;

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_base;
uniform vec3 u_fold;
uniform vec3 u_sheen;
uniform float u_amt;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(11.3, 7.9);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  float c0 = cos(-0.55);
  float s0 = sin(-0.55);
  p = mat2(c0, -s0, s0, c0) * p;
  p.x *= 0.6;
  float t = u_time * 0.05;
  vec2 q = vec2(fbm(p * 1.4 + vec2(0.0, t)), fbm(p * 1.4 + vec2(5.2, t * 1.25)));
  vec2 r = vec2(
    fbm(p * 1.2 + 2.6 * q + vec2(1.7, 9.2)),
    fbm(p * 1.2 + 2.6 * q + vec2(8.3, 2.8))
  );
  float f = fbm(p * 1.5 + 3.2 * r);
  float folds = smoothstep(0.2, 0.9, f);
  float sheen = pow(smoothstep(0.5, 0.95, fbm(p * 2.2 + 3.5 * r + vec2(t * 0.7, -t * 0.4))), 3.0);
  vec3 col = mix(u_base, u_fold, folds);
  col = mix(col, u_sheen, sheen * u_amt);
  // calm wash at the center so the hero type always reads
  float d = distance(uv, vec2(0.5, 0.45));
  col = mix(col, u_base, smoothstep(0.62, 0.08, d) * 0.62);
  gl_FragColor = vec4(col, 1.0);
}
`;

function SilkBackgroundImpl() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      depth: false,
      stencil: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
      return shader;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uBase = gl.getUniformLocation(program, "u_base");
    const uFold = gl.getUniformLocation(program, "u_fold");
    const uSheen = gl.getUniformLocation(program, "u_sheen");
    const uAmt = gl.getUniformLocation(program, "u_amt");

    let raf = 0;
    let running = false;
    let inView = true;
    let active = document.documentElement.dataset.motion !== "off";
    let lost = false;
    const start = performance.now();

    const setColors = () => {
      const theme =
        document.documentElement.dataset.theme === "ivory" ? "ivory" : "onyx";
      const c = THEME_COLORS[theme];
      gl.uniform3fv(uBase, c.base);
      gl.uniform3fv(uFold, c.fold);
      gl.uniform3fv(uSheen, c.sheen);
      gl.uniform1f(uAmt, c.amount);
    };

    // Soft render scale — silk is low-frequency, upscaling is invisible and
    // keeps the fbm shader cheap on mobile GPUs.
    const resize = () => {
      const scale = 0.6;
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
      }
    };

    const draw = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      draw(now);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => {
      const shouldRun = active && inView && !document.hidden && !lost;
      if (shouldRun && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun && running) {
        stop();
      }
    };

    resize();
    setColors();
    draw(performance.now());

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);
    const onVisibility = () => sync();
    document.addEventListener("visibilitychange", onVisibility);
    const mo = new MutationObserver(() => {
      active = document.documentElement.dataset.motion !== "off";
      setColors();
      draw(performance.now());
      sync();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-motion"],
    });
    const onContextLost = (e: Event) => {
      e.preventDefault();
      lost = true;
      canvas.style.display = "none";
      sync();
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} className="silk-canvas" aria-hidden />;
}

export default memo(SilkBackgroundImpl);
