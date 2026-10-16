"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import s from "@/app/home.module.css";

/**
 * Homepage hero with a live inviscid flow around a Joukowski section.
 *
 * The physics: a circle of radius R centred at mu in the zeta plane passes
 * through the trailing-edge point zeta = c, the circulation is fixed by the
 * Kutta condition, and z = zeta + c^2/zeta maps it to an aerofoil. Particles
 * are advected with the exact potential-flow velocity. It is labelled on the
 * page as an illustration, not solver output, because that is what it is.
 *
 * The view is rotated by alpha about mid-chord, so the freestream always
 * runs left to right and the section pitches nose up, as in a tunnel.
 *
 * Particles are recycled at random points across the whole canvas, not only
 * at the inflow edge. A particle takes longer to cross the screen than it
 * lives, so inflow-only seeding left the downstream half empty after every
 * change of angle, which made high angles look as if they had no flow.
 */

type C = [number, number];
const mul = (a: C, b: C): C => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const div = (a: C, b: C): C => {
  const d = b[0] * b[0] + b[1] * b[1];
  return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d];
};
const csqrt = (a: C): C => {
  const r = Math.hypot(a[0], a[1]);
  return [Math.sqrt((r + a[0]) / 2), Math.sign(a[1] || 1) * Math.sqrt(Math.max(0, (r - a[0]) / 2))];
};

const CMAP = 1;
const MU: C = [-0.09, 0.07];
const R = Math.hypot(CMAP - MU[0], -MU[1]);
const TH_TE = Math.atan2(-MU[1], CMAP - MU[0]);
const FOIL: C[] = Array.from({ length: 241 }, (_, k) => {
  const t = TH_TE + (2 * Math.PI * k) / 240;
  const zt: C = [MU[0] + R * Math.cos(t), MU[1] + R * Math.sin(t)];
  const q = div([CMAP * CMAP, 0], zt);
  return [zt[0] + q[0], zt[1] + q[1]];
});
const XMIN = Math.min(...FOIL.map((z) => z[0]));
const XMAX = Math.max(...FOIL.map((z) => z[0]));
const CHORD = XMAX - XMIN;
const XC = (XMIN + XMAX) / 2;

const circulation = (alpha: number) => 4 * Math.PI * R * Math.sin(alpha - TH_TE);
const liftCoefficient = (deg: number) => (2 * circulation((deg * Math.PI) / 180)) / CHORD;

export default function FlowHero({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const setAlphaRef = useRef<(deg: number) => void>(() => {});
  const [deg, setDeg] = useState(6);

  useEffect(() => {
    const cv = canvasRef.current;
    const section = sectionRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !section || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ca = 1, sa = 0, G = 0;
    let W = 0, H = 0, sc = 1, ox = 0, oy = 0;
    type Particle = { x: number; y: number; age: number; life: number };
    let parts: Particle[] = [];

    const vel = (x: number, y: number): C | null => {
      const r = csqrt([x * x - y * y - 4 * CMAP * CMAP, 2 * x * y]);
      let zt: C = [(x + r[0]) / 2, (y + r[1]) / 2];
      const z2: C = [(x - r[0]) / 2, (y - r[1]) / 2];
      if (Math.hypot(z2[0] - MU[0], z2[1] - MU[1]) > Math.hypot(zt[0] - MU[0], zt[1] - MU[1])) zt = z2;
      const zm: C = [zt[0] - MU[0], zt[1] - MU[1]];
      if (Math.hypot(zm[0], zm[1]) < R * 1.003) return null;
      const t2 = div(mul([R * R, 0], [ca, sa]), mul(zm, zm));
      const circ = div([0, G / (2 * Math.PI)], zm);
      const dW: C = [ca - t2[0] + circ[0], -sa - t2[1] + circ[1]];
      const q = div([CMAP * CMAP, 0], mul(zt, zt));
      const w = div(dW, [1 - q[0], -q[1]]);
      return [w[0], -w[1]];
    };
    const toS = (x: number, y: number): C => {
      x -= XC;
      return [ox + (x * ca + y * sa) * sc, oy - (-x * sa + y * ca) * sc];
    };
    const fromS = (X: number, Y: number): C => {
      const xr = (X - ox) / sc, yr = (oy - Y) / sc;
      return [xr * ca - yr * sa + XC, xr * sa + yr * ca];
    };
    const spawn = (p: Particle, edge: boolean) => {
      [p.x, p.y] = fromS(edge ? -Math.random() * 30 : Math.random() * W, Math.random() * H);
      p.age = 0;
      p.life = 120 + Math.random() * 240;
    };
    const clear = () => {
      ctx.fillStyle = "#06141a";
      ctx.fillRect(0, 0, W, H);
    };
    const drawFoil = () => {
      ctx.beginPath();
      FOIL.forEach((z, k) => {
        const [X, Y] = toS(z[0], z[1]);
        if (k) ctx.lineTo(X, Y);
        else ctx.moveTo(X, Y);
      });
      ctx.closePath();
      ctx.fillStyle = "#0b2028";
      ctx.fill();
      ctx.strokeStyle = "rgba(122,240,224,.9)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
    };
    const staticLines = () => {
      clear();
      for (let k = 0; k < 50; k++) {
        let [x, y] = fromS(-10, (k / 49) * H);
        ctx.beginPath();
        let [X, Y] = toS(x, y);
        ctx.moveTo(X, Y);
        for (let n = 0; n < 5000; n++) {
          const v = vel(x, y);
          if (!v) break;
          const m = Math.hypot(v[0], v[1]) || 1;
          x += (v[0] / m) * 0.01;
          y += (v[1] / m) * 0.01;
          [X, Y] = toS(x, y);
          ctx.lineTo(X, Y);
          if (X > W) break;
        }
        ctx.strokeStyle = "rgba(122,240,224,.35)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      drawFoil();
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mobile = W < 700;
      sc = ((mobile ? 0.62 : 0.3) * W) / CHORD;
      ox = mobile ? W * 0.5 : W * 0.7;
      oy = H * 0.44;
      // On phones the text sits over the flow, so the section goes in the
      // clear gap between the buttons and the control panel.
      const acts = section.querySelector("[data-acts]");
      if (mobile && acts && controlRef.current) {
        const top = cv.getBoundingClientRect().top;
        oy = (acts.getBoundingClientRect().bottom - top + controlRef.current.getBoundingClientRect().top - top) / 2;
      }
      parts = Array.from({ length: Math.round(Math.min(1400, (W * H) / 1000)) }, () => {
        const p = { x: 0, y: 0, age: 0, life: 0 };
        spawn(p, false);
        return p;
      });
      clear();
      if (reduce) staticLines();
    };
    const frame = () => {
      ctx.fillStyle = "rgba(6,20,26,.09)";
      ctx.fillRect(0, 0, W, H);
      ctx.lineWidth = 1.1;
      for (const p of parts) {
        const v = vel(p.x, p.y);
        if (!v || ++p.age > p.life) {
          spawn(p, false);
          continue;
        }
        const nx = p.x + v[0] * 0.02, ny = p.y + v[1] * 0.02;
        const [X0, Y0] = toS(p.x, p.y), [X1, Y1] = toS(nx, ny);
        // Colour by local speed: slow is deep teal, fast is near white.
        const f = Math.max(0, Math.min(1, (Math.hypot(v[0], v[1]) - 0.5) / 1.6));
        ctx.strokeStyle = `hsla(${176 - f * 18},${70 + f * 20}%,${42 + f * 46}%,${0.3 + f * 0.6})`;
        ctx.beginPath();
        ctx.moveTo(X0, Y0);
        ctx.lineTo(X1, Y1);
        ctx.stroke();
        p.x = nx;
        p.y = ny;
        if (X1 > W + 10) spawn(p, true);
        else if (Y1 < -10 || Y1 > H + 10 || X1 < -40) spawn(p, false);
      }
      drawFoil();
    };

    setAlphaRef.current = (d: number) => {
      const a = (d * Math.PI) / 180;
      ca = Math.cos(a);
      sa = Math.sin(a);
      G = circulation(a);
      if (!W) return;
      clear();
      parts.forEach((p) => spawn(p, false));
      if (reduce) staticLines();
    };
    setAlphaRef.current(6);
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(cv);
    const loop = () => {
      if (visible && !document.hidden) frame();
      raf = requestAnimationFrame(loop);
    };
    if (!reduce) loop();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={sectionRef} className={s.hero} data-hero>
      <canvas ref={canvasRef} className={s.canvas} aria-hidden />
      <div className={`${s.wrap} ${s.heroIn}`}>{children}</div>
      <div ref={controlRef} className={s.control}>
        <div className={s.row}>
          <label htmlFor="alpha" className={s.mono} style={{ color: "#a9c0c0" }}>
            Angle of attack
          </label>
          <span className={s.val}>{deg.toFixed(1)}°</span>
        </div>
        <input
          id="alpha"
          type="range"
          min={0}
          max={15}
          step={0.5}
          value={deg}
          onChange={(e) => {
            const d = Number(e.target.value);
            setDeg(d);
            setAlphaRef.current(d);
          }}
        />
        <div className={s.row}>
          <span className={s.mono}>
            Lift coefficient, C<sub>L</sub>
          </span>
          <span className={s.cl}>{liftCoefficient(deg).toFixed(2)}</span>
        </div>
        <p className={s.mono} style={{ marginTop: 6 }}>
          Inviscid potential flow around a Joukowski section, computed live. No
          viscosity means no stall, so lift keeps rising with angle. An
          illustration, not solver output.
        </p>
      </div>
    </section>
  );
}
