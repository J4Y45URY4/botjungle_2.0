"use client";

import React, { useEffect, useRef } from "react";
import "./arena.css";

interface InteractiveArenaProps {
  initialBotIndex?: number;
}

export default function InteractiveArena({ initialBotIndex = 0 }: InteractiveArenaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ns = "http://www.w3.org/2000/svg";
    const $ = (selector: string) => container.querySelector(selector) as HTMLElement | SVGElement | null;

    const A = 0.866;
    const B = 0.5;
    const R = "#ff1744";
    const S = 1.5;
    const GY = 1.8;
    const MS = [0.8, 1.4, 2.4, 1, 1.2, 0.9];

    function sh(h: string, f: number) {
      const n = parseInt(h.slice(1), 16);
      const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) =>
        Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f)
      );
      return "rgb(" + c.join(",") + ")";
    }

    function poly(p: number[][], c: string, o?: number) {
      const d =
        "M" +
        p.map((q) => q[0].toFixed(1) + " " + q[1].toFixed(1)).join("L") +
        "Z";
      return (
        '<path d="' +
        d +
        '" fill="' +
        c +
        '" stroke="#000" stroke-width="1.2" stroke-linejoin="round"/>' +
        (o ? '<path d="' + d + '" fill="url(#ao)"/>' : "")
      );
    }

    function bx(cx: number, cy: number, w: number, d: number, h: number, c: string) {
      const x = cx - ((w - d) / 2) * A;
      const y = cy + ((w + d) / 2) * B;
      const F = [x, y];
      const Rr = [x + w * A, y - w * B];
      const L = [x - d * A, y - d * B];
      const Bk = [x + (w - d) * A, y - (w + d) * B];
      function u(p: number[]) {
        return [p[0], p[1] - h];
      }
      return (
        poly([F, L, u(L), u(F)], sh(c, -0.38), 1) +
        poly([F, Rr, u(Rr), u(F)], sh(c, -0.08), 1) +
        poly([u(F), u(Rr), u(Bk), u(L)], sh(c, 0.3)) +
        '<path d="M' +
        u(L) +
        "L" +
        u(F) +
        "L" +
        u(Rr) +
        '" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1"/>'
      );
    }

    function wh(x: number, y: number, r: number) {
      const a = r * 0.62;
      return (
        '<ellipse cx="' +
        x +
        '" cy="' +
        y +
        '" rx="' +
        a +
        '" ry="' +
        r +
        '" fill="#0c0c11" stroke="#000" stroke-width="1.5"/><ellipse cx="' +
        x +
        '" cy="' +
        y +
        '" rx="' +
        a * 0.7 +
        '" ry="' +
        r * 0.74 +
        '" fill="url(#met)" stroke="#000"/><ellipse cx="' +
        x +
        '" cy="' +
        y +
        '" rx="' +
        r * 0.17 +
        '" ry="' +
        r * 0.28 +
        '" fill="' +
        R +
        '" stroke="#000" stroke-width=".8"/><path d="M' +
        (x - r * 0.25) +
        " " +
        (y - r * 0.55) +
        "q" +
        r * 0.2 +
        " " +
        -r * 0.15 +
        " " +
        r * 0.4 +
        ' 0" stroke="#fff" stroke-opacity=".7" fill="none"/>'
      );
    }

    function led(x: number, y: number, rx: number, ry: number, b?: number) {
      return (
        '<ellipse' +
        (b ? ' class="blink"' : "") +
        ' cx="' +
        x +
        '" cy="' +
        y +
        '" rx="' +
        rx +
        '" ry="' +
        ry +
        '" fill="#ff5a78" filter="url(#gl)"/>'
      );
    }

    function limb(d: string, w: number, c: string) {
      return (
        '<path d="' +
        d +
        '" fill="none" stroke="#000" stroke-width="' +
        (w + 4) +
        '" stroke-linecap="round" stroke-linejoin="round"/><path d="' +
        d +
        '" fill="none" stroke="' +
        c +
        '" stroke-width="' +
        w +
        '" stroke-linecap="round" stroke-linejoin="round"/><path d="' +
        d +
        '" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="' +
        w / 4 +
        '" stroke-linecap="round" transform="translate(-1.5 -1.5)"/>'
      );
    }

    function bolt(x: number, y: number) {
      return '<circle cx="' + x + '" cy="' + y + '" r="1.7" fill="#777" stroke="#000" stroke-width=".7"/>';
    }

    function vents(x: number, y: number, n: number) {
      let s = "";
      for (let i = 0; i < n; i++) {
        s += '<path d="M' + (x + i * 5 * A) + " " + (y - i * 5 * B) + 'l0 -6" stroke="#000" stroke-width="1.8"/>';
      }
      return s;
    }

    function spike(x: number, y: number, l: number, c: string) {
      return (
        '<path d="M' +
        x +
        " " +
        y +
        "l" +
        l +
        " " +
        -l * 0.25 +
        "l" +
        -l * 0.3 +
        " " +
        -l * 0.5 +
        'z" fill="' +
        c +
        '" stroke="#000" stroke-width="1.1" stroke-linejoin="round"/>'
      );
    }

    const W = "#ececf2";
    const K = "#2a2a33";
    const G = "#9aa0ad";
    const teeth = [0, 60, 120, 180, 240, 300]
      .map((a) => '<path d="M-5 -24 L0 -38 L5 -24z" fill="' + R + '" stroke="#000" stroke-width="1.2" transform="rotate(' + a + ')"/>')
      .join("");

    function cyl(x: number, y: number, rx: number, h: number, c: string) {
      const ry = rx * 0.5;
      return (
        '<path d="M' +
        (x - rx) +
        " " +
        y +
        "V" +
        (y - h) +
        "H" +
        (x + rx) +
        "V" +
        y +
        "A" +
        rx +
        " " +
        ry +
        " 0 0 1 " +
        (x - rx) +
        ' ' +
        y +
        'Z" fill="' +
        sh(c, -0.2) +
        '" stroke="#000" stroke-width="1.2"/><path d="M' +
        (x - rx * 0.45) +
        " " +
        (y - h + 3) +
        'V' +
        y +
        '" stroke="#fff" stroke-opacity=".4" stroke-width="' +
        rx * 0.3 +
        '"/><path d="M' +
        (x + rx * 0.6) +
        " " +
        (y - h + 3) +
        "V" +
        (y - 1) +
        '" stroke="#000" stroke-opacity=".25" stroke-width="' +
        rx * 0.4 +
        '"/><ellipse cx="' +
        x +
        '" cy="' +
        (y - h) +
        '" rx="' +
        rx +
        '" ry="' +
        ry +
        '" fill="' +
        sh(c, 0.3) +
        '" stroke="#000" stroke-width="1.2"/>'
      );
    }

    function bigwh(x: number, y: number, r: number) {
      const a = r * 0.62;
      let s = "";
      for (let i = 0; i < 5; i++) {
        const t = (i * 72 * Math.PI) / 180;
        s += '<path d="M' + x + " " + y + "L" + (x + Math.cos(t) * a * 0.8) + " " + (y + Math.sin(t) * r * 0.8) + '" stroke="#000" stroke-width="2.2"/>';
      }
      return (
        '<ellipse cx="' +
        x +
        '" cy="' +
        y +
        '" rx="' +
        a +
        '" ry="' +
        r +
        '" fill="#0c0c11" stroke="#000" stroke-width="2"/><ellipse cx="' +
        x +
        '" cy="' +
        y +
        '" rx="' +
        a * 0.82 +
        '" ry="' +
        r * 0.82 +
        '" fill="url(#met)" stroke="#000"/><ellipse cx="' +
        x +
        '" cy="' +
        y +
        '" rx="' +
        a * 0.6 +
        '" ry="' +
        r * 0.6 +
        '" fill="#15151b" stroke="#000"/>' +
        s +
        '<ellipse cx="' +
        x +
        '" cy="' +
        y +
        '" rx="' +
        a * 0.2 +
        '" ry="' +
        r * 0.2 +
        '" fill="' +
        R +
        '" stroke="#000"/><path d="M' +
        (x - a * 0.7) +
        " " +
        (y - r * 0.55) +
        "q" +
        a * 0.5 +
        " " +
        -r * 0.3 +
        " " +
        a * 1.1 +
        ' 0" stroke="#fff" stroke-opacity=".6" fill="none"/>'
      );
    }

    const D: Record<number, string> = {
      1:
        '<g class="flame" style="opacity:0"><path class="flk" d="M-34 -12L-68 -18L-52 -12L-70 -6L-34 -9Z" fill="#ff9a3c" stroke="#ffe08a" stroke-width="1"/></g>' +
        wh(-24, -16, 10) +
        wh(26, -12, 10) +
        bx(0, -10, 64, 28, 8, R) +
        bx(38, -6, 12, 20, 5, W) +
        bx(40, -3, 6, 38, 2, K) +
        bx(0, -18, 48, 6, 2, W) +
        bx(-8, -23, 10, 7, 4, K) +
        bx(2, -19, 24, 17, 4, K) +
        '<path d="M-9 -24q11 -19 25 0z" fill="url(#glass)" stroke="#000" stroke-width="1.2"/><path d="M-4 -30q5 -5 11 -2" stroke="#fff" stroke-opacity=".8" fill="none"/>' +
        bx(-30, -22, 6, 30, 14, K) +
        bx(-30, -36, 10, 36, 2, R) +
        bx(-30, -38, 10, 36, 1, W) +
        bx(34, -6, 8, 38, 3, K) +
        led(44, -14, 4, 2) +
        led(-38, -12, 3, 1.6, 1) +
        vents(-16, -8, 5) +
        bolt(-6, -9) +
        bolt(14, -5) +
        wh(-16, -2, 11) +
        wh(30, 2, 11),
      2:
        wh(-18, -12, 11) +
        wh(22, -8, 11) +
        cyl(-32, -20, 3, 10, K) +
        cyl(-25, -22, 3, 10, K) +
        '<path d="M26 -6L62 8L26 16Z" fill="' +
        G +
        '" stroke="#000" stroke-width="1.3" stroke-linejoin="round"/><path d="M26 -6L62 8" stroke="#fff" stroke-opacity=".7" fill="none"/>' +
        bx(0, -12, 52, 36, 20, W) +
        bx(0, -32, 46, 32, 4, R) +
        bx(-27, -18, 4, 34, 12, K) +
        bx(-6, -36, 18, 14, 8, K) +
        vents(10, -30, 4) +
        led(-6, -46, 4, 1.6, 1) +
        bolt(-24, -20) +
        bolt(14, -14) +
        bolt(20, -26) +
        spike(-32, -28, 14, G) +
        spike(-32, -14, 14, G) +
        bx(28, -16, 16, 7, 6, G) +
        '<g transform="translate(46 -6) scale(1 .46)"><g class="spin"><circle r="26" fill="#17171c" stroke="#000" stroke-width="2"/>' +
        teeth +
        '<circle r="9" fill="' +
        G +
        '" stroke="#000"/><circle r="3" fill="' +
        R +
        '"/></g></g>' +
        wh(-10, 2, 12) +
        wh(26, 8, 12),
      3:
        bx(0, -4, 70, 56, 10, K) +
        bx(0, -14, 64, 50, 3, W) +
        bx(26, -14, 12, 56, 7, R) +
        '<path d="M36 -2L66 9L36 20Z" fill="' +
        G +
        '" stroke="#000" stroke-width="1.3" stroke-linejoin="round"/><path d="M36 -2L66 9" stroke="#fff" stroke-opacity=".7" fill="none"/>' +
        cyl(-12, -14, 13, 12, K) +
        '<ellipse cx="-12" cy="-27" rx="9" ry="4.5" fill="url(#glass)" stroke="#000"/>' +
        led(-12, -28, 5, 1.8, 1) +
        vents(-30, -24, 5) +
        led(30, -20, 2.5, 1.2) +
        led(34, -14, 2.5, 1.2) +
        led(38, -8, 2.5, 1.2) +
        bolt(-34, -12) +
        bolt(-6, -4) +
        bolt(10, -20) +
        bolt(14, -4),
      4:
        bx(-9, -2, 12, 16, 5, K) +
        bx(10, 0, 12, 16, 5, K) +
        bx(24, 3, 14, 10, 5, R) +
        bx(-9, -8, 6, 6, 14, W) +
        bx(10, -6, 6, 6, 14, W) +
        bx(-19, -30, 7, 7, 20, W) +
        bx(0, -22, 26, 18, 6, K) +
        bx(0, -28, 30, 22, 22, R) +
        bx(0, -36, 32, 24, 3, W) +
        bx(0, -44, 20, 14, 3, W) +
        led(0, -48, 3, 1.4) +
        bx(21, -24, 7, 7, 20, W) +
        bx(14, -12, 8, 10, 4, G) +
        cyl(-20, -46, 5, 5, K) +
        cyl(20, -44, 5, 5, K) +
        bx(0, -52, 22, 18, 16, W) +
        '<path d="M-9 -62q9 -4 18 0v6q-9 3 -18 0z" fill="url(#glass)" stroke="#000"/>' +
        led(0, -60, 6, 1.6) +
        '<path d="M0 -68V-76" stroke="#000" stroke-width="2"/>' +
        led(0, -78, 3, 3, 1) +
        bolt(-8, -34) +
        bolt(8, -26),
      5:
        cyl(0, -4, 32, 10, K) +
        cyl(0, -14, 27, 4, R) +
        cyl(0, -18, 17, 10, W) +
        bolt(-22, -8) +
        bolt(22, -6) +
        bolt(0, 2) +
        bx(0, -20, 22, 22, 10, W) +
        '<ellipse cx="0" cy="-32" rx="10" ry="5" fill="' +
        G +
        '" stroke="#000"/><g class="arm">' +
        limb("M0 -32L-12 -60", 10, W) +
        limb("M6 -34L0 -58", 3, G) +
        limb("M-12 -60L16 -80", 8, W) +
        '<circle cx="-12" cy="-60" r="6" fill="' +
        R +
        '" stroke="#000" stroke-width="1.4"/><circle cx="0" cy="-32" r="5" fill="' +
        R +
        '" stroke="#000"/><circle cx="16" cy="-80" r="4" fill="' +
        R +
        '" stroke="#000"/>' +
        led(-12, -60, 2.4, 2.4, 1) +
        limb("M16 -80l14 5", 4, R) +
        limb("M16 -80l5 13", 4, R) +
        bx(30, -70, 9, 9, 9, "#ffffff") +
        bx(30, -79, 9, 9, 1, R) +
        "</g>",
      6:
        bigwh(-14, -24, 23) +
        bx(0, -30, 24, 20, 52, W) +
        bx(0, -44, 26, 3, 6, K) +
        bx(0, -56, 26, 22, 6, R) +
        bx(0, -64, 18, 14, 3, K) +
        cyl(0, -82, 8, 6, K) +
        '<path d="M0 -88V-98" stroke="#000" stroke-width="2"/>' +
        led(0, -100, 3, 3, 1) +
        led(-1, -70, 7, 2.2) +
        bolt(-6, -36) +
        bolt(8, -26) +
        bigwh(14, -15, 23),
    };

    function rg(x: number, y: number, a: number, b: number) {
      return (
        '<ellipse class="pls" cx="' +
        x +
        '" cy="' +
        y +
        '" rx="' +
        a +
        '" ry="' +
        b +
        '" fill="none" stroke="' +
        R +
        '" stroke-width="2" filter="url(#gl)"/>'
      );
    }
    D[1] = '<path d="M44 -14L130 -36L130 8Z" fill="url(#beam)"/>' + D[1];
    D[2] = rg(0, 2, 50, 25) + D[2] + '<ellipse cx="46" cy="-6" rx="30" ry="14" fill="url(#sp)"/>';
    D[3] = rg(0, -2, 62, 35) + D[3];
    D[4] = rg(0, 0, 38, 18) + D[4];
    D[5] = rg(0, 0, 44, 21) + D[5];
    D[6] = rg(0, 2, 38, 18) + D[6];

    const BF =
      "drop-shadow(-1px -1px 0 rgba(255,255,255,.28)) drop-shadow(0 0 7px rgba(255,23,68,.28))";

    // Ambient motes
    const gAmb = $("#ar-amb");
    if (gAmb) {
      let h = "";
      for (let i = 0; i < 28; i++) {
        h +=
          '<circle class="mote" cx="' +
          ((60 + Math.random() * 780) | 0) +
          '" cy="' +
          ((150 + Math.random() * 340) | 0) +
          '" r="' +
          (0.8 + Math.random() * 1.6).toFixed(1) +
          '" style="animation-duration:' +
          (5 + Math.random() * 7).toFixed(1) +
          "s;animation-delay:-" +
          (Math.random() * 9).toFixed(1) +
          's"/>';
      }
      gAmb.innerHTML = h;
    }

    // Pylons
    const gPyl = $("#ar-pyl");
    if (gPyl) {
      let h = "";
      [
        [450, 135],
        [860, 325],
        [450, 515],
        [40, 325],
      ].forEach((c) => {
        const x = c[0];
        const y = c[1];
        h +=
          '<ellipse cx="' +
          x +
          '" cy="' +
          y +
          '" rx="16" ry="7" fill="#ff1744" opacity=".3" filter="url(#gl)"/><path d="M' +
          (x - 5) +
          " " +
          y +
          "L" +
          (x - 4) +
          " " +
          (y - 46) +
          "L" +
          (x + 4) +
          " " +
          (y - 46) +
          "L" +
          (x + 5) +
          ' ' +
          y +
          'Z" fill="#1b1b24" stroke="#000"/><path d="M' +
          x +
          " " +
          (y - 6) +
          "V" +
          (y - 40) +
          '" stroke="#ff1744" stroke-width="2" filter="url(#gl)"/><circle class="pls" cx="' +
          x +
          '" cy="' +
          (y - 50) +
          '" r="5" fill="#ff5a78" filter="url(#gl)"/>';
      });
      gPyl.innerHTML = h;
    }

    const botsData = [
      { n: 1, nm: "ROBOSPRINT", en: "ROBO RACE", tg: "Fastest lap wins. Pure speed, razor line control.", st: [95, 35, 70], x: 200, y: 350, r: 32, f: 1.25 },
      { n: 2, nm: "ROBOCOMBAT", en: "ROBO WAR", tg: "Armor up and break the other bot. Last one moving wins.", st: [55, 95, 45], x: 360, y: 270, r: 34, f: 0.9 },
      { n: 3, nm: "SUMOSPHERE", en: "ROBO SUMO", tg: "Low, heavy, relentless. Shove them out of the ring.", st: [40, 90, 60], x: 560, y: 290, r: 36, f: 0.8 },
      { n: 4, nm: "ROBOLEAGUE", en: "ROBO SOCCER", tg: "Dribble, pass, score. Team play on a neon pitch.", st: [70, 50, 90], x: 680, y: 380, r: 26, f: 1.05 },
      { n: 5, nm: "PICK AND PLACE", en: "PRECISION ARM", tg: "Grab it, carry it, drop it exactly where it counts.", st: [45, 40, 98], x: 450, y: 445, r: 32, f: 0.7 },
      { n: 6, nm: "ZEROTILT", en: "BALANCING ROBOT", tg: "Two wheels, zero tilt. Stay upright through anything.", st: [75, 45, 95], x: 450, y: 370, r: 24, f: 1 },
    ];

    // Grid tiles
    const gTiles = $("#ar-tiles");
    if (gTiles) {
      const T = [450, 135];
      const Rt = [860, 325];
      const L_pt = [40, 325];
      let h = "";
      function P(u: number, v: number) {
        return [
          T[0] + u * (Rt[0] - T[0]) + v * (L_pt[0] - T[0]),
          T[1] + u * (Rt[1] - T[1]) + v * (L_pt[1] - T[1]),
        ];
      }
      for (let i = 1; i < 14; i++) {
        const u = i / 14;
        const a = P(u, 0);
        const b = P(u, 1);
        const c = P(0, u);
        const d = P(1, u);
        const o = i === 7 ? 0.35 : 0.13;
        h += '<path d="M' + a + "L" + b + "M" + c + "L" + d + '" stroke="#ff1744" stroke-opacity="' + o + '" fill="none"/>';
      }
      gTiles.innerHTML = h;
    }

    const layer = $("#ar-bots") as SVGGElement | null;
    const fx = $("#ar-fx") as SVGGElement | null;
    const ring = $("#ar-ring") as SVGElement | null;
    const svg = $("#ar-stage") as SVGSVGElement | null;
    const listEl = $("#ar-list");

    if (!layer || !fx || !ring || !svg || !listEl) return;

    interface BotBody {
      n: number;
      nm: string;
      en: string;
      tg: string;
      st: number[];
      x: number;
      y: number;
      r: number;
      f: number;
      m: number;
      s: number;
      lean: number;
      lv: number;
      hit: number;
      z: number;
      vz: number;
      sq: number;
      sv: number;
      hx: number;
      hy: number;
      vx: number;
      vy: number;
      t: { x: number; y: number } | null;
      g: SVGGElement | null;
      fl: HTMLElement | SVGElement | null;
      sh: HTMLElement | SVGElement | null;
      bt: HTMLButtonElement | null;
      held?: boolean;
      boost?: number;
      face?: number;
      dt?: number;
      rot?: number;
      bs?: HTMLElement | SVGElement | null;
    }

    const bots: BotBody[] = botsData.map((b, i) => ({
      ...b,
      r: b.r * S,
      m: MS[i],
      s: S,
      lean: 0,
      lv: 0,
      hit: 0,
      z: 0,
      vz: 0,
      sq: 0,
      sv: 0,
      hx: b.x,
      hy: b.y,
      vx: 0,
      vy: 0,
      t: null,
      g: null,
      fl: null,
      sh: null,
      bt: null,
    }));

    const ball: BotBody = {
      n: 0,
      nm: "BALL",
      en: "BALL",
      tg: "",
      st: [0, 0, 0],
      x: 450,
      y: 325,
      vx: 0,
      vy: 0,
      r: 16,
      f: 1,
      m: 0.35,
      s: 1.6,
      lean: 0,
      lv: 0,
      hit: 0,
      z: 0,
      vz: 0,
      sq: 0,
      sv: 0,
      hx: 450,
      hy: 325,
      t: null,
      g: null,
      fl: null,
      sh: null,
      bt: null,
      rot: 0,
    };

    let sel: BotBody = bots[initialBotIndex] || bots[0];
    const keys: Record<string, number> = {};
    const sc = { r: 0, w: 0 };
    let drag: { b: BotBody; x: number; y: number; m: boolean; lx?: number; ly?: number; lt?: number; vx?: number; vy?: number } | null = null;

    function mk(o: BotBody, html: string, cls?: string) {
      const g = document.createElementNS(ns, "g") as SVGGElement;
      g.setAttribute("class", cls || "");
      g.innerHTML = html;
      o.g = g;
      layer!.appendChild(g);
      return g;
    }

    listEl.innerHTML = "";
    layer.innerHTML = "";

    bots.forEach((b, i) => {
      const tag =
        '<g class="tag" transform="translate(30 -96)"><line x1="-26" y1="26" x2="0" y2="0" stroke="' +
        R +
        '"/><g class="pill" transform="translate(16 0)"><rect x="0" y="-9" width="' +
        (b.nm.length * 8 + 14) +
        '" height="18" rx="2"/><text x="' +
        (b.nm.length * 4 + 7) +
        '" y="4">' +
        b.nm +
        '</text></g><circle r="12"/><text y="4">0' +
        b.n +
        "</text></g>";

      const g = mk(
        b,
        '<g class="sh"><ellipse cy="5" rx="' +
          (b.r / S + 18) +
          '" ry="' +
          (b.r / S / 2 + 8) +
          '" fill="url(#shd)"/><ellipse cy="4" rx="' +
          (b.r / S + 4) +
          '" ry="' +
          (b.r / S / 2 + 2) +
          '" fill="none" stroke="' +
          R +
          '" stroke-opacity=".5" stroke-width="1.5" filter="url(#gl)"/></g><g class="fl">' +
          D[b.n] +
          "</g>" +
          tag,
        "bot"
      );

      b.fl = g.querySelector(".fl");
      b.sh = g.querySelector(".sh");
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "button");
      g.setAttribute("aria-label", b.nm);
      g.style.opacity = "0";

      setTimeout(() => {
        g.style.opacity = "1";
        g.style.transition = "opacity .4s";
        rip(b.x, b.y);
      }, i * 140 + 200);

      g.addEventListener("pointerdown", (e: PointerEvent) => {
        e.stopPropagation();
        pick(b);
        drag = { b: b, x: e.clientX, y: e.clientY, m: false };
      });

      g.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter") pick(b);
      });

      g.addEventListener("dblclick", () => {
        if (b.z < 3) {
          b.vz = 430;
          b.sq = -0.15;
        }
      });

      const bt = document.createElement("button");
      bt.innerHTML = "<i>0" + b.n + "</i><span>" + b.nm + "</span>";
      bt.onclick = () => pick(b);
      b.bt = bt;
      listEl.appendChild(bt);
    });

    mk(
      ball,
      '<ellipse class="sh" cy="3" rx="12" ry="5" fill="rgba(0,0,0,.5)"/><g class="bs"><circle cy="-8" r="10" fill="url(#bl)" stroke="#000" stroke-width="1.2"/><path d="M-3 -12 l5 -1 l2 5 l-5 3z M-9 -6 l4 -2 l1 4z M5 -16 l4 2 l-3 3z M-2 -1 l4 0 l-2 -3z" fill="#222"/></g><ellipse cx="-3" cy="-12" rx="3" ry="2" fill="#fff" fill-opacity=".6"/>'
    );
    ball.sh = ball.g!.querySelector(".sh") as HTMLElement | SVGElement | null;
    ball.bs = ball.g!.querySelector(".bs") as HTMLElement | SVGElement | null;

    function rip(x: number, y: number, s = 1) {
      if (!fx) return;
      const e = document.createElementNS(ns, "ellipse");
      e.setAttribute("class", "rip");
      e.setAttribute("cx", String(x));
      e.setAttribute("cy", String(y));
      e.setAttribute("rx", String(50 * s));
      e.setAttribute("ry", String(22 * s));
      fx.appendChild(e);
      setTimeout(() => e.remove(), 750);
    }

    function dust(x: number, y: number) {
      if (!fx) return;
      const e = document.createElementNS(ns, "circle");
      e.setAttribute("class", "dust");
      e.setAttribute("cx", String(x + (Math.random() * 10 - 5)));
      e.setAttribute("cy", String(y + 2));
      e.setAttribute("r", String(3 + Math.random() * 3));
      fx.appendChild(e);
      setTimeout(() => e.remove(), 620);
    }

    function pick(b: BotBody) {
      sel = b;
      bots.forEach((o) => {
        if (o.g) o.g.classList.toggle("sel", o === b);
        if (o.bt) o.bt.setAttribute("aria-pressed", String(o === b));
      });

      const pn = $("#ar-pn");
      const pe = $("#ar-pe");
      const pv = $("#ar-pv");
      const pt = $("#ar-pt");
      const bars = $("#ar-bars");

      if (pn) pn.textContent = "0" + b.n;
      if (pe) pe.textContent = b.en;
      if (pv) pv.textContent = b.nm;
      if (pt) pt.textContent = b.tg;

      if (bars) {
        bars.innerHTML = ["SPEED", "POWER", "CONTROL"]
          .map((l, i) => '<div class="ar-stat-bar"><span>' + l + '</span><i style="--v:0%"></i><b>' + b.st[i] + "</b></div>")
          .join("");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            bars.querySelectorAll("i").forEach((e, i) => {
              (e as HTMLElement).style.setProperty("--v", b.st[i] + "%");
            });
          });
        });
      }
      rip(b.x, b.y);
    }

    function ptTransform(e: { clientX: number; clientY: number }) {
      const p = svg!.createSVGPoint();
      p.x = e.clientX;
      p.y = e.clientY;
      return p.matrixTransform(svg!.getScreenCTM()!.inverse());
    }

    svg.addEventListener("pointerdown", (e: PointerEvent) => {
      const p = ptTransform(e);
      sel.t = { x: p.x, y: p.y };
      const m = document.createElementNS(ns, "circle");
      m.setAttribute("class", "mark");
      m.setAttribute("cx", String(p.x));
      m.setAttribute("cy", String(p.y));
      m.setAttribute("r", "16");
      fx!.appendChild(m);
      setTimeout(() => m.remove(), 1000);
    });

    const onPointerMove = (e: PointerEvent) => {
      if (!drag) return;
      if (!drag.m && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 5) {
        drag.m = true;
        drag.b.held = true;
        const q = ptTransform(e);
        drag.lx = q.x;
        drag.ly = q.y;
        drag.lt = performance.now();
        drag.vx = drag.vy = 0;
      }
      if (drag.m) {
        const p = ptTransform(e);
        const n = performance.now();
        const h = Math.max(8, n - (drag.lt || n)) / 1000;
        drag.vx = 0.6 * (drag.vx || 0) + 0.4 * ((p.x - (drag.lx || p.x)) / h);
        drag.vy = 0.6 * (drag.vy || 0) + 0.4 * ((p.y - (drag.ly || p.y)) / h);
        drag.lx = p.x;
        drag.ly = p.y;
        drag.lt = n;

        drag.b.x = p.x;
        drag.b.y = p.y + 10;
        drag.b.vx = drag.b.vy = 0;
        drag.b.t = null;
      }
    };

    const drop = () => {
      if (drag && drag.m) {
        const b = drag.b;
        const c = (v: number) => Math.max(-650, Math.min(650, v));
        b.held = false;
        if (performance.now() - (drag.lt || 0) < 120) {
          b.vx = c(drag.vx || 0);
          b.vy = c(drag.vy || 0);
          b.vz = Math.min(260, Math.hypot(b.vx, b.vy) * 0.35);
        }
      }
      drag = null;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", drop);
    window.addEventListener("pointercancel", drop);

    const onBlur = () => {
      for (const k of Object.keys(keys)) delete keys[k];
    };
    window.addEventListener("blur", onBlur);

    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "shift" || k === "x") {
        if (!e.repeat && sel.z < 3) {
          sel.vz = 430;
          sel.sq = -0.15;
          rip(sel.x, sel.y, 0.7);
        }
        return;
      }
      if (e.target && (e.target as HTMLElement).tagName === "BUTTON" && (k === " " || k === "enter")) return;
      if (("wasd".indexOf(k) > -1 && k.length === 1) || k.indexOf("arrow") === 0 || k === " ") {
        // Prevent window scrolling if focused on or around arena
        if (document.activeElement === svg || svg!.contains(document.activeElement)) {
          e.preventDefault();
        }
        keys[k] = 1;
        if (k === " " && !e.repeat) {
          const dx = (keys.d || keys.arrowright ? 1 : 0) - (keys.a || keys.arrowleft ? 1 : 0);
          sel.boost = 0.45;
          sel.vx += (dx || sel.face || 1) * 300;
          rip(sel.x, sel.y);
        }
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      delete keys[e.key.toLowerCase()];
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    function score(side: "r" | "w") {
      sc[side]++;
      const el = $(side === "r" ? "#ar-sr" : "#ar-sw");
      if (el) {
        el.textContent = String(sc[side]);
        el.classList.remove("pop");
        void (el as HTMLElement).offsetWidth;
        el.classList.add("pop");
      }
      rip(ball.x, ball.y);
      ball.x = 450;
      ball.y = 325;
      ball.vx = ball.vy = 0;
    }

    function reset() {
      bots.forEach((b) => {
        b.x = b.hx;
        b.y = b.hy;
        b.vx = b.vy = 0;
        b.t = null;
        b.lean = b.lv = 0;
        b.held = false;
        b.z = b.vz = b.sq = b.sv = 0;
      });
      ball.x = 450;
      ball.y = 325;
      ball.vx = ball.vy = 0;
      ball.z = ball.vz = 0;
      sc.r = sc.w = 0;
      const sr = $("#ar-sr");
      const sw = $("#ar-sw");
      if (sr) sr.textContent = "0";
      if (sw) sw.textContent = "0";
      rip(450, 325);
    }

    const rsBtn = $("#ar-rs");
    if (rsBtn) rsBtn.onclick = reset;

    function vert(o: BotBody, dt: number) {
      const e = o === ball ? 0.62 : 0.15;
      if (o.held) {
        o.z += (36 - o.z) * Math.min(1, dt * 14);
        o.vz = 0;
      } else if (o.z > 0 || o.vz > 0) {
        o.vz -= 1500 * dt;
        o.z += o.vz * dt;
        if (o.z <= 0) {
          const im = -o.vz;
          o.z = 0;
          o.vz = im > 90 ? im * e : 0;
          if (im > 150) {
            o.sv += im * 0.008;
            dust(o.x - 12, o.y);
            dust(o.x + 12, o.y);
            if (im > 380) {
              rip(o.x, o.y, 0.6);
              shake();
            }
          }
        }
      }
      o.sv += (-o.sq * 300 - o.sv * 15) * dt;
      o.sq += o.sv * dt;
      o.sq = Math.max(-0.25, Math.min(0.35, o.sq));
    }

    const wrap = $("#ar-wrap");
    const bodies = bots.concat([ball]);

    function spark(x: number, y: number, n: number) {
      if (!fx) return;
      for (let i = 0; i < n; i++) {
        const e = document.createElementNS(ns, "circle");
        const a = Math.random() * 6.28;
        const d = 14 + Math.random() * 26;
        e.setAttribute("class", "spark");
        e.setAttribute("cx", String(x));
        e.setAttribute("cy", String(y - 10));
        e.setAttribute("r", String(1.6 + Math.random() * 1.4));
        e.style.setProperty("--dx", Math.cos(a) * d + "px");
        e.style.setProperty("--dy", Math.sin(a) * d * 0.6 + "px");
        fx.appendChild(e);
        setTimeout(() => e.remove(), 420);
      }
    }

    function shake() {
      if (!wrap) return;
      wrap.classList.remove("shake");
      void (wrap as HTMLElement).offsetWidth;
      wrap.classList.add("shake");
    }

    function collide(p: BotBody, q: BotBody, e: number) {
      const dx = q.x - p.x;
      const dy = (q.y - p.y) * GY;
      const d = Math.hypot(dx, dy);
      const m = p.r + q.r;
      if (d >= m || d <= 0 || Math.abs((p.z || 0) - (q.z || 0)) > 46) return;

      const nx = dx / d;
      const ny = dy / d;
      const wp = p.held ? 0 : 1 / p.m;
      const wq = q.held ? 0 : 1 / q.m;
      const s = wp + wq;
      if (!s) return;
      const ov = m - d;
      p.x -= (nx * ov * wp) / s;
      q.x += (nx * ov * wq) / s;
      p.y -= (ny * ov * wp) / s / GY;
      q.y += (ny * ov * wq) / s / GY;

      const rv = (q.vx - p.vx) * nx + (q.vy - p.vy) * GY * ny;
      if (rv < 0) {
        const j = (-(1 + e) * rv) / s;
        p.vx -= j * wp * nx;
        q.vx += j * wq * nx;
        p.vy -= (j * wp * ny) / GY;
        q.vy += (j * wq * ny) / GY;
        const im = -rv;
        if (im > 110) {
          spark((p.x + q.x) / 2, (p.y + q.y) / 2, Math.min(9, (3 + im / 60) | 0));
          p.hit = q.hit = 0.12;
          if (im > 330) {
            shake();
            rip((p.x + q.x) / 2, (p.y + q.y) / 2, 0.6);
          }
        }
        p.lv -= nx * im * 0.35 * wp;
        q.lv += nx * im * 0.35 * wq;
        if (im > 230) {
          const pv = Math.min(340, im * 0.5);
          if (!p.held && p.z < 4) p.vz = Math.max(p.vz, (pv * wp) / s * (q === ball ? 0.4 : 1));
          if (!q.held && q.z < 4) q.vz = Math.max(q.vz, (pv * wq) / s * (p === ball ? 0.4 : 1));
        }
      }
    }

    function wall(o: BotBody, hx: number, hy: number, e: number) {
      const dx = o.x - 450;
      const dy = o.y - 325;
      const sd = Math.abs(dx) / hx + Math.abs(dy) / hy;
      if (sd <= 1) return 0;
      o.x = 450 + dx / sd;
      o.y = 325 + dy / sd;
      let sx = Math.sign(dx) / hx;
      let sy = Math.sign(dy) / (hy * GY);
      const l = Math.hypot(sx, sy);
      sx /= l;
      sy /= l;
      let vg = o.vy * GY;
      const vn = o.vx * sx + vg * sy;
      if (vn > 0) {
        o.vx -= (1 + e) * vn * sx;
        vg -= (1 + e) * vn * sy;
        o.vy = vg / GY;
        if (vn > 260) {
          spark(o.x, o.y, 4);
          o.hit = 0.1;
        }
      }
      return vn;
    }

    let lastTime = 0;
    let animId = 0;
    let isVisible = false;

    function tick(t: number) {
      if (!isVisible) return;
      const dt = Math.min(0.033, (t - lastTime) / 1000 || 0.016);
      lastTime = t;

      bots.forEach((b) => {
        let ax = 0;
        let ay = 0;
        if (b === sel && !b.held) {
          ax = (keys.d || keys.arrowright ? 1 : 0) - (keys.a || keys.arrowleft ? 1 : 0);
          ay = (keys.s || keys.arrowdown ? 1 : 0) - (keys.w || keys.arrowup ? 1 : 0);
          if (ax || ay) b.t = null;
          if (b.t) {
            const dx = b.t.x - b.x;
            const dy = (b.t.y - b.y) * GY;
            const d = Math.hypot(dx, dy);
            if (d < 10) b.t = null;
            else {
              ax = dx / d;
              ay = dy / d;
            }
          }
        }
        if (ax && ay && !b.t) {
          const l = Math.hypot(ax, ay);
          ax /= l;
          ay /= l;
        }
        const bo = b.boost && b.boost > 0 ? ((b.boost -= dt), 2.1) : 1;
        const drv = (ax || ay) && !b.held;
        if (drv && Math.hypot(b.vx, b.vy * GY) < 260 * b.f * bo) {
          const ac = ((1100 * b.f * bo) / (0.6 + 0.4 * b.m)) * (b.z > 3 ? 0.25 : 1);
          b.vx += ax * ac * dt;
          b.vy += (ay * ac * dt) / GY;
        }
        if (!b.held) {
          const k = Math.exp((-(drv ? 1.4 : 2.6) * dt) / (0.7 + 0.3 * b.m));
          b.vx *= k;
          b.vy *= k;
          b.x += b.vx * dt;
          b.y += b.vy * dt;
        }
        if (Math.hypot(b.vx, b.vy) > 60 && (b.dt = (b.dt || 0) + dt) > 0.07) {
          b.dt = 0;
          dust(b.x - Math.sign(b.vx) * 14 * S, b.y);
        }
        const tg = Math.max(-9, Math.min(9, b.vx * 0.04));
        b.lv += ((tg - b.lean) * 90 - b.lv * 7) * dt;
        b.lean += b.lv * dt;
        b.lean = Math.max(-22, Math.min(22, b.lean));
        if (b.hit > 0) b.hit -= dt;
        vert(b, dt);
      });

      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          collide(bodies[i], bodies[j], bodies[i] === ball || bodies[j] === ball ? 0.85 : 0.5);
        }
      }

      bots.forEach((b) => {
        wall(b, 375, 168, 0.4);
      });

      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;
      const f = Math.exp(-0.9 * dt);
      ball.vx *= f;
      ball.vy *= f;
      wall(ball, 385, 176, 0.85);
      vert(ball, dt);
      ball.rot = (ball.rot || 0) + (ball.vx * dt + ball.vy * dt * 0.5) * 2.2;

      if (Math.hypot(ball.x - 120, (ball.y - 315) * 0.5) < 22) score("w");
      else if (Math.hypot(ball.x - 780, (ball.y - 335) * 0.5) < 22) score("r");

      const arr = bodies.slice().sort((a, b) => a.y - b.y);
      if (layer) {
        arr.forEach((o, i) => {
          if (layer.children[i] !== o.g && o.g) {
            layer.insertBefore(o.g, layer.children[i]);
          }
        });
      }

      bodies.forEach((o) => {
        const z = o.z || 0;
        const k = 1 / (1 + z / 140);
        if (o.g && o.sh) {
          o.g.setAttribute("transform", "translate(" + o.x.toFixed(1) + " " + (o.y - z).toFixed(1) + ") scale(" + o.s + ")");
          o.sh.setAttribute("transform", "translate(0 " + (z / o.s).toFixed(1) + ") scale(" + k.toFixed(3) + ")");
          o.sh.style.opacity = String(k);
        }
      });

      bots.forEach((b) => {
        if (Math.abs(b.vx) > 12) b.face = b.vx < 0 ? -1 : 1;
        const l = b.lean + (b.n === 6 ? Math.sin(t * 0.005) * 2 : 0);
        if (b.fl) {
          b.fl.setAttribute(
            "transform",
            "scale(" +
              ((b.face || 1) * (1 + b.sq * 0.6)).toFixed(3) +
              " " +
              (1 - b.sq).toFixed(3) +
              ") rotate(" +
              l.toFixed(2) +
              " 0 0) translate(0 " +
              Math.sin(t * 0.004 + b.n) * 1.5 +
              ")"
          );
          b.fl.style.filter = b.hit > 0 ? "brightness(1.8) " + BF : BF;
          if (b.n === 1) {
            const fe = b.fl.querySelector(".flame") as HTMLElement | null;
            if (fe) {
              fe.style.opacity = b.boost && b.boost > 0 ? "1" : String(Math.min(0.7, Math.hypot(b.vx, b.vy) / 260));
            }
          }
        }
      });

      if (ball.bs) {
        ball.bs.setAttribute("transform", "rotate(" + ((ball.rot || 0) % 360).toFixed(1) + " 0 -8)");
      }
      if (ring) {
        ring.setAttribute("cx", String(sel.x));
        ring.setAttribute("cy", String(sel.y + 4));
      }

      animId = requestAnimationFrame(tick);
    }

    // Virtual Joystick for Touch Devices
    const joy = $("#ar-joy");
    const jk = $("#ar-jk");
    let touchId: number | null = null;

    function jset(e: PointerEvent) {
      if (!joy || !jk) return;
      const r = joy.getBoundingClientRect();
      const R2 = r.width / 2;
      const dx = e.clientX - (r.left + R2);
      const dy = e.clientY - (r.top + R2);
      const d = Math.hypot(dx, dy) || 1;
      const m = Math.min(d, R2 * 0.6);
      const ux = dx / d;
      const uy = dy / d;
      jk.style.transform = "translate(" + ux * m + "px," + uy * m + "px)";
      const on = d > R2 * 0.22;
      keys.d = on && ux > 0.38 ? 1 : 0;
      keys.a = on && ux < -0.38 ? 1 : 0;
      keys.s = on && uy > 0.38 ? 1 : 0;
      keys.w = on && uy < -0.38 ? 1 : 0;
    }

    function jend() {
      touchId = null;
      if (jk) jk.style.transform = "";
      keys.a = keys.d = keys.w = keys.s = 0;
    }

    if (joy) {
      joy.addEventListener("pointerdown", ((e: PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        touchId = e.pointerId;
        try {
          joy.setPointerCapture(touchId);
        } catch {
          // ignore
        }
        jset(e);
      }) as EventListener);
      joy.addEventListener("pointermove", ((e: PointerEvent) => {
        if (e.pointerId === touchId) jset(e);
      }) as EventListener);
      joy.addEventListener("pointerup", jend);
      joy.addEventListener("pointercancel", jend);
    }

    const bb = $("#ar-bb");
    if (bb) {
      bb.addEventListener("pointerdown", ((e: PointerEvent) => {
        e.preventDefault();
        const dx = (keys.d ? 1 : 0) - (keys.a ? 1 : 0);
        sel.boost = 0.45;
        sel.vx += (dx || sel.face || 1) * 300;
        rip(sel.x, sel.y);
      }) as EventListener);
    }

    const bh = $("#ar-bh");
    if (bh) {
      bh.addEventListener("pointerdown", ((e: PointerEvent) => {
        e.preventDefault();
        if (sel.z < 3) {
          sel.vz = 430;
          sel.sq = -0.15;
          rip(sel.x, sel.y, 0.7);
        }
      }) as EventListener);
    }

    pick(bots[initialBotIndex] || bots[0]);

    const arenaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              isVisible = true;
              lastTime = performance.now();
              cancelAnimationFrame(animId);
              animId = requestAnimationFrame(tick);
            }
          } else {
            isVisible = false;
            cancelAnimationFrame(animId);
          }
        });
      },
      { threshold: 0.05 }
    );
    arenaObserver.observe(container);

    return () => {
      arenaObserver.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", drop);
      window.removeEventListener("pointercancel", drop);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [initialBotIndex]);

  return (
    <section className="arena-section" id="arena-sim" ref={containerRef}>
      <header className="ar-header">
        <div className="ar-logo">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#ff1744" strokeWidth="1.8">
            <rect x="5" y="7" width="14" height="11" rx="3" />
            <circle cx="9.5" cy="12" r="1.4" fill="#ff1744" />
            <circle cx="14.5" cy="12" r="1.4" fill="#ff1744" />
            <path d="M12 7V3M9 18v2M15 18v2" />
          </svg>
        </div>
        <div>
          <h2 className="ar-title">
            BOT<b>JUNGLE</b> 2.0
          </h2>
          <div className="ar-sub">ボットジャングル · ARENA SIMULATOR</div>
        </div>
        <div className="ar-score" aria-live="polite">
          <span className="r">
            <b id="ar-sr">0</b>
          </span>
          <small>RED · WHITE</small>
          <span className="w">
            <b id="ar-sw">0</b>
          </span>
        </div>
      </header>

      <div className="ar-main">
        <div className="ar-stage-wrap" id="ar-wrap">
          <svg id="ar-stage" className="ar-svg" viewBox="0 0 900 560" role="application" aria-label="Interactive BotJungle arena">
            <defs>
              <linearGradient id="fl" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1d1119" />
                <stop offset="1" stopColor="#09090d" />
              </linearGradient>
              <radialGradient id="sp">
                <stop offset="0" stopColor="#ff1744" stopOpacity=".28" />
                <stop offset="1" stopColor="#ff1744" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="bl" cx=".35" cy=".3">
                <stop offset="0" stopColor="#fff" />
                <stop offset="1" stopColor="#9a9aa8" />
              </radialGradient>
              <radialGradient id="shd">
                <stop offset="0" stopColor="#000" stopOpacity=".85" />
                <stop offset=".6" stopColor="#2a0510" stopOpacity=".45" />
                <stop offset="1" stopColor="#ff1744" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ao" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#000" stopOpacity="0" />
                <stop offset="1" stopColor="#000" stopOpacity=".45" />
              </linearGradient>
              <linearGradient id="met" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f3f3f8" />
                <stop offset=".5" stopColor="#8b90a0" />
                <stop offset="1" stopColor="#3a3d48" />
              </linearGradient>
              <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8a93a6" />
                <stop offset=".5" stopColor="#1a1d28" />
                <stop offset="1" stopColor="#4a0a1a" />
              </linearGradient>
              <filter id="gl" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="2.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity=".55" />
                <stop offset="1" stopColor="#ff1744" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="swp" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#ff1744" stopOpacity="0" />
                <stop offset=".5" stopColor="#ff8aa0" stopOpacity=".16" />
                <stop offset="1" stopColor="#ff1744" stopOpacity="0" />
              </linearGradient>
              <clipPath id="fc">
                <path d="M450 135 L860 325 L450 515 L40 325Z" />
              </clipPath>
            </defs>

            <path d="M40 325L40 349L450 539L860 349L860 325L450 515Z" fill="#14090f" stroke="#ff1744" strokeOpacity=".7" strokeWidth="1.5" />
            <path d="M40 349L450 539L860 349" fill="none" stroke="#ff1744" strokeWidth="2" style={{ filter: "drop-shadow(0 0 8px #ff1744)" }} />
            <path id="floor" d="M450 135 L860 325 L450 515 L40 325Z" fill="url(#fl)" stroke="#ff1744" strokeWidth="2" style={{ filter: "drop-shadow(0 0 12px rgba(255,23,68,.6))" }} />
            <g id="ar-tiles" pointerEvents="none"></g>
            <g clipPath="url(#fc)" pointerEvents="none">
              <rect className="sweep" x="-160" y="120" width="120" height="420" fill="url(#swp)" />
            </g>
            <g id="ar-amb" pointerEvents="none"></g>
            <ellipse cx="450" cy="325" rx="300" ry="140" fill="url(#sp)" pointerEvents="none" />
            <g stroke="#ff1744" strokeOpacity=".35" fill="none" pointerEvents="none">
              <path d="M245 230 L655 420" />
              <ellipse cx="450" cy="325" rx="95" ry="44" />
              <circle cx="450" cy="325" r="3" fill="#ff1744" />
              <ellipse cx="450" cy="325" rx="200" ry="92" strokeDasharray="3 9" />
            </g>
            <g pointerEvents="none" fill="none" strokeWidth="4">
              <ellipse cx="120" cy="315" rx="15" ry="36" stroke="#ff1744" style={{ filter: "drop-shadow(0 0 8px #ff1744)" }} />
              <ellipse cx="780" cy="335" rx="15" ry="36" stroke="#fff" style={{ filter: "drop-shadow(0 0 8px #fff)" }} />
            </g>
            <g id="ar-pyl" pointerEvents="none"></g>
            <g id="ar-fx" pointerEvents="none"></g>
            <ellipse id="ar-ring" className="ring" rx="70" ry="30" pointerEvents="none" />
            <g id="ar-bots"></g>
          </svg>
          <div className="ar-hint">
            <b>CLICK</b> FLOOR TO DRIVE · <b>DRAG</b> ROBOTS · <b>WASD</b> / ARROWS · <b>SPACE</b> BOOST · <b>SHIFT</b> HOP
          </div>
        </div>

        <div className="ar-ctl" id="ar-ctl">
          <div className="ar-joy" id="ar-joy" aria-label="Move joystick">
            <i id="ar-jk"></i>
          </div>
          <div className="ar-cb">
            <button id="ar-bh" aria-label="Hop">
              HOP
            </button>
            <button id="ar-bb" aria-label="Boost">
              BOOST
            </button>
          </div>
        </div>

        <aside className="ar-panel">
          <div className="ar-num" id="ar-pn">
            01
          </div>
          <div>
            <div className="ar-k" id="ar-pe">
              ROBO RACE
            </div>
            <div className="ar-nm" id="ar-pv">
              ROBOSPRINT
            </div>
          </div>
          <div className="ar-tg" id="ar-pt"></div>
          <div id="ar-bars"></div>
          <div className="ar-list" id="ar-list" role="group" aria-label="Events"></div>
          <button className="ar-reset-btn" id="ar-rs">
            RESET ARENA
          </button>
        </aside>
      </div>
    </section>
  );
}
