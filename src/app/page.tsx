"use client";

import React, { useEffect, useState } from "react";
import InteractiveArena from "./components/InteractiveArena";

interface FaqItem {
  id: string;
  tag: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "01",
    tag: "TEAM SPECS",
    question: "What is the permitted team size?",
    answer:
      "Teams must consist of 2 to 4 members. Inter-college, inter-departmental, and inter-year team combinations are fully welcome, provided every member is a currently enrolled college student.",
  },
  {
    id: "02",
    tag: "LOCATION",
    question: "Where is Bot Jungle 2.0 taking place?",
    answer:
      "The competition takes place live at the School of Engineering, CUSAT (Cochin University of Science and Technology), South Kalamassery, Kochi, Kerala. Detailed arena coordinates, pit stops, and transit directions will be sent to registered teams.",
  },
  {
    id: "03",
    tag: "EVENT MODE",
    question: "Is this an online or offline competition?",
    answer:
      "Bot Jungle 2.0 is a 100% offline, on-ground battle arena. All bots will duel, race, and navigate physical custom-fabricated obstacle courses and steel-reinforced combat pits in real time before live spectators and judges.",
  },
  {
    id: "04",
    tag: "ELIGIBILITY",
    question: "Who is eligible to participate?",
    answer:
      "The event is exclusively open to college and university students (undergraduate, postgraduate, and polytechnic diploma students). Every team member must present a valid physical College ID card at registration and technical inspection.",
  },
  {
    id: "05",
    tag: "MULTI-ARENA ENTRY",
    question: "Can our team register for multiple battle arenas?",
    answer:
      "Yes! Teams may enter multiple event categories (Roborace, Robocombat, Sumo, Robo Soccer, Pick and Place, and Balance Bot), provided their bot meets the technical weight, dimension, and voltage specifications of each respective arena rulebook.",
  },
  {
    id: "06",
    tag: "HARDWARE & WORKSPACE",
    question: "What should teams bring along to the venue?",
    answer:
      "Teams must bring their competition bot, remote controllers/transmitters, spare motors, gears, batteries, chargers, and custom mechanical toolkits. The organizers will provide dedicated pit tables with 230V AC charging points and test tracks.",
  },
  {
    id: "07",
    tag: "PRIZES & CERTIFICATES",
    question: "Are prizes and certificates awarded?",
    answer:
      "Yes! Champions and runners-up across all arenas will win massive cash prize pools, custom winner trophies, and certificates of excellence. Additionally, every verified participant will receive an official Certificate of Participation from Bot Jungle & CUSAT.",
  },
  {
    id: "08",
    tag: "EVENT DATE",
    question: "When is Bot Jungle 2.0 scheduled?",
    answer:
      "Bot Jungle 2.0 takes place on December 5 at the School of Engineering, CUSAT! Be sure to follow the live arena countdown and arrive on-site early for bot weight calibration and pit allocation.",
  },
  {
    id: "09",
    tag: "ORGANIZER",
    question: "Who is organizing Bot Jungle 2.0?",
    answer:
      "Bot Jungle 2.0 is proudly organized and presented by the IEEE Robotics & Automation Society (RAS) Student Branch Chapter, School of Engineering, CUSAT (Cochin University of Science and Technology).",
  },
];

const rainColumns = [
  { text: "均11ントン0路度ング0ット脳ト1ジ", duration: "13.9s", delay: "-5.2s", opacity: "0.56" },
  { text: "ル闘回ル回ッ0ボ戦度度衡戦1戦グャグ", duration: "12.9s", delay: "-5.8s", opacity: "0.39" },
  { text: "0ジ011ロ電0脳ト路0闘回ット度グ", duration: "15.1s", delay: "-11.4s", opacity: "0.39" },
  { text: "ジ1電均ボッ均衡衡戦衡ングャ戦度闘電", duration: "11.6s", delay: "-3.5s", opacity: "0.65" },
  { text: "衡0グ0戦ボ均グ衡電0路路ロ回度闘0", duration: "14.3s", delay: "-5.6s", opacity: "0.76" },
  { text: "ジロ脳衡路ッ0ボ衡闘度度ジ戦均均速衡", duration: "12.4s", delay: "-11.0s", opacity: "0.83" },
  { text: "ロルルジ度電回1ル脳速闘ト衡路衡速ロ", duration: "11.8s", delay: "-0.4s", opacity: "0.45" },
  { text: "速戦闘1路戦路ャ速0グ脳ロジッッ度衡", duration: "8.1s", delay: "-4.0s", opacity: "0.39" },
  { text: "ン闘脳ボ度回度闘ト路ャ0衡ャャ衡グ衡", duration: "8.4s", delay: "-1.0s", opacity: "0.38" },
  { text: "回グト脳度ボロトジト電回ッ1電ル回ト", duration: "10.4s", delay: "-8.9s", opacity: "0.75" },
  { text: "路戦路速速速ッボ回ボググ闘ボ路1ボ1", duration: "15.8s", delay: "-11.1s", opacity: "0.76" },
  { text: "ル衡路ル回ルトトル脳ントッ電グ路速闘", duration: "13.8s", delay: "-1.5s", opacity: "0.27" },
  { text: "グル1速ロググ1戦闘10ッャ度均速ジ", duration: "7.2s", delay: "-0.6s", opacity: "0.48" },
  { text: "0路1脳脳ン路ト速回度1路度回0ルト", duration: "8.1s", delay: "-0.1s", opacity: "0.32" },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const pad = (n: number) => String(n).padStart(2, "0");

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    // Quick sleek loader dismissal
    const loaderTimer = setTimeout(() => {
      setLoading(false);
    }, 750);

    const calculateTimeLeft = () => {
      const now = new Date();
      const year = now.getFullYear();
      const target = new Date(year, 11, 5, 9, 0, 0); // December 5, 9:00 AM
      if (now.getTime() > target.getTime()) {
        target.setFullYear(year + 1);
      }
      const diff = Math.max(0, target.getTime() - now.getTime());
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const countdownTimer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(loaderTimer);
      clearInterval(countdownTimer);
    };
  }, []);

  useEffect(() => {
    const R = document.documentElement;
    const cl = (v: number) => Math.max(0, Math.min(1, v));

    const hero = document.querySelector(".hero") as HTMLElement | null;
    const man_ = document.querySelector(".man") as HTMLElement | null;
    const rail = document.querySelector(".rail") as HTMLElement | null;
    const stage = document.querySelector(".stage") as HTMLElement | null;
    const trk = document.querySelector("#trk") as HTMLElement | null;
    const cnt = document.querySelector("#cnt") as HTMLElement | null;
    const ros = document.querySelectorAll(".ro");
    const perf = document.querySelector(".perf") as HTMLElement | null;
    const tkt = document.querySelector(".tkt") as HTMLElement | null;
    const prog = document.querySelector(".prog i") as HTMLElement | null;
    const W = Array.from(document.querySelectorAll("#man .w")) as HTMLElement[];

    function p(el: HTMLElement | null) {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const denom = r.height - window.innerHeight;
      return denom <= 0 ? 0 : cl(-r.top / denom);
    }

    let busy = false;
    let lastS = -1;
    let lastR = -1;
    let lastH = -1;
    let lastM = -1;
    let lastCnt = "";
    let lastX = -1;
    let lastP = -1;
    let lastPf = -1;

    function up() {
      busy = false;
      const innerH = window.innerHeight;
      const innerW = window.innerWidth;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const max = docHeight - innerH;

      // 1. BATCH ALL READS FIRST (Zero layout thrashing)
      const heroR = hero ? hero.getBoundingClientRect() : null;
      const manR = man_ ? man_.getBoundingClientRect() : null;
      const railR = rail ? rail.getBoundingClientRect() : null;
      const trkScrollW = trk ? trk.scrollWidth : 0;
      const stageR = stage ? stage.getBoundingClientRect() : null;

      // 2. COMPUTE ALL DERIVED VALUES
      const isMobile = innerW <= 768;

      const heroDenom = heroR ? heroR.height - innerH : 0;
      const heroP = isMobile
        ? (heroR ? cl(-heroR.top / (innerH * 0.45)) : 0)
        : (heroDenom > 0 ? cl(-heroR!.top / heroDenom) : 0);

      const manDenom = manR ? manR.height - innerH : 0;
      const manP = isMobile
        ? (manR ? cl((innerH * 0.7 - manR.top) / (innerH * 0.65)) : 0)
        : (manDenom > 0 ? cl(-manR!.top / manDenom) : 0);

      const railDenom = railR ? railR.height - innerH : 0;
      const railP = railDenom > 0 ? cl(-railR!.top / railDenom) : 0;

      const stageDenom = stageR ? stageR.height - innerH : 0;
      const stageP = isMobile
        ? (stageR ? cl((innerH * 0.65 - stageR.top) / (innerH * 0.55)) : 0)
        : (stageDenom > 0 ? cl(-stageR!.top / stageDenom) : 0);

      const sVal = max > 0 ? cl(scrollY / max) : 0;
      const rVal = (scrollY / 6000) % 1;
      const dist = Math.max(0, trkScrollW - innerW);
      const xVal = railP * dist;

      // 3. BATCH ALL WRITES (Only update DOM when changed)
      if (Math.abs(sVal - lastS) > 0.0005) {
        lastS = sVal;
        R.style.setProperty("--s", sVal.toFixed(4));
      }
      if (Math.abs(rVal - lastR) > 0.0005) {
        lastR = rVal;
        R.style.setProperty("--r", rVal.toFixed(4));
      }
      if (Math.abs(heroP - lastH) > 0.001) {
        lastH = heroP;
        R.style.setProperty("--h", heroP.toFixed(3));
      }
      if (Math.abs(manP - lastM) > 0.001) {
        lastM = manP;
        R.style.setProperty("--m", manP.toFixed(3));

        const wThreshold = manP * W.length * 1.15;
        for (let i = 0; i < W.length; i++) {
          const shouldBeOn = i < wThreshold;
          if (W[i].classList.contains("on") !== shouldBeOn) {
            W[i].classList.toggle("on", shouldBeOn);
          }
        }
      }

      if (trk && prog) {
        if (Math.abs(xVal - lastX) > 0.5) {
          lastX = xVal;
          trk.style.setProperty("--x", String(Math.round(xVal)));
        }
        if (Math.abs(railP - lastP) > 0.001) {
          lastP = railP;
          prog.style.setProperty("--p", railP.toFixed(3));
        }
      }

      if (cnt) {
        const cntVal = String(Math.round(cl(stageP * 3) * 6)).padStart(2, "0");
        if (cntVal !== lastCnt) {
          lastCnt = cntVal;
          cnt.textContent = cntVal;
        }
      }

      for (let i = 0; i < ros.length; i++) {
        const onVal = cl((stageP - 0.12 - i * 0.07) * 9).toFixed(2);
        (ros[i] as HTMLElement).style.setProperty("--on", onVal);
      }

      const pf = cl((stageP - 0.7) * 5);
      if (Math.abs(pf - lastPf) > 0.002) {
        lastPf = pf;
        const pfStr = pf.toFixed(3);
        if (tkt) tkt.style.setProperty("--pf", pfStr);
        if (perf) perf.style.setProperty("--pf", pfStr);
      }
    }

    function rq() {
      if (!busy) {
        busy = true;
        requestAnimationFrame(up);
      }
    }

    window.addEventListener("scroll", rq, { passive: true });
    window.addEventListener("resize", rq, { passive: true });
    up();

    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".rv").forEach(function (e, i) {
      (e as HTMLElement).style.transitionDelay = i * 0.12 + "s";
      io.observe(e);
    });

    return () => {
      window.removeEventListener("scroll", rq);
      window.removeEventListener("resize", rq);
      io.disconnect();
    };
  }, []);

  return (
    <>
      {/* Minimalist Cyberpunk Loading Icon */}
      <div
        className={`intro-loader ${!loading ? "loaded" : ""}`}
        aria-hidden={!loading}
      >
        <div className="loader-spinner-wrap">
          <div className="loader-spinner-ring"></div>
          <div className="loader-spinner-ring-inner"></div>
          <div className="loader-spinner-logo"></div>
        </div>
        <div className="loader-spinner-label">
          <span className="cd-pulse-dot"></span>
          <span>BOT JUNGLE 2.0</span>
        </div>
      </div>

      <div className="bar"></div>
      <header className="nav">
        <a href="#top" className="nav-brand">
          <span className="nav-logo"></span>
          <span className="nav-title">BOT JUNGLE 2.0</span>
        </a>
        <div className="nav-links">
          <a href="#arenas" className="nav-link">ARENAS</a>
          <a href="#arena-sim" className="nav-link">SIMULATOR</a>
          <a href="#register" className="nav-cta-btn">REGISTER</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="stick">
          <div className="floor"></div>
          <div className="rain" id="rain">
            {rainColumns.map((col, idx) => (
              <i
                key={idx}
                style={{
                  animationDuration: col.duration,
                  animationDelay: col.delay,
                  opacity: col.opacity,
                }}
              >
                {col.text}
              </i>
            ))}
          </div>
          <div className="sun"></div>
          <div className="jp d">ボットジャングル</div>
          <div className="hero-presenter">
            <span className="hero-presenter-beacon"></span>
            <span className="hero-presenter-text">IEEE RAS CUSAT SBC PRESENTS</span>
          </div>
          <h1 className="tt d">
            <span className="row">
              <span className="l" style={{ "--i": 0, "--d": -0.72 } as React.CSSProperties}>
                B
              </span>
              <span className="l" style={{ "--i": 1, "--d": 0.85 } as React.CSSProperties}>
                O
              </span>
              <span className="l" style={{ "--i": 2, "--d": -0.48 } as React.CSSProperties}>
                T
              </span>
            </span>
            <span className="row">
              <span className="l" style={{ "--i": 3, "--d": 0.94 } as React.CSSProperties}>
                J
              </span>
              <span className="l" style={{ "--i": 4, "--d": -0.81 } as React.CSSProperties}>
                U
              </span>
              <span className="l" style={{ "--i": 5, "--d": 0.63 } as React.CSSProperties}>
                N
              </span>
              <span className="l" style={{ "--i": 6, "--d": -1.05 } as React.CSSProperties}>
                G
              </span>
              <span className="l" style={{ "--i": 7, "--d": 0.77 } as React.CSSProperties}>
                L
              </span>
              <span className="l" style={{ "--i": 8, "--d": -0.55 } as React.CSSProperties}>
                E
              </span>
            </span>
            <span className="row row-v2">
              <span
                className="l v2"
                style={{ "--i": 9, "--d": 1 } as React.CSSProperties}
              >
                2.0
              </span>
            </span>
          </h1>
          <div className="tag">
            <span>
              Six arenas.
              <br />
              One jungle of machines.
            </span>
            <div className="hero-countdown-badge">
              <span className="cd-pulse-dot"></span>
              <span>DECEMBER 5 · T-{pad(timeLeft.days)}D {pad(timeLeft.hours)}H {pad(timeLeft.minutes)}M {pad(timeLeft.seconds)}S</span>
            </div>
            <span>Build it. Wire it. Send it.</span>
          </div>
          <div className="hint"></div>
        </div>
      </section>

      <div className="tick">
        <div>
          <span>IEEE RAS CUSAT SBC PRESENTS</span>
          <span>◼</span>
          <span>BOT JUNGLE 2.0</span>
          <span>◼</span>
          <span>DECEMBER 5</span>
          <span>◼</span>
          <span>SCHOOL OF ENGINEERING CUSAT</span>
          <span>◼</span>
          <span>ROBOSPRINT</span>
          <span>◼</span>
          <span>ROBOCOMBAT</span>
          <span>◼</span>
          <span>SUMOSPHERE</span>
          <span>◼</span>
          <span>ROBOLEAGUE</span>
          <span>◼</span>
          <span>PICK AND PLACE</span>
          <span>◼</span>
          <span>ZEROTILT</span>
          <span>◼</span>
          <span>IEEE RAS CUSAT SBC PRESENTS</span>
          <span>◼</span>
          <span>BOT JUNGLE 2.0</span>
          <span>◼</span>
          <span>ARENA COUNTDOWN ACTIVE</span>
          <span>◼</span>
          <span>ROBOSPRINT</span>
          <span>◼</span>
          <span>ROBOCOMBAT</span>
          <span>◼</span>
          <span>SUMOSPHERE</span>
          <span>◼</span>
          <span>ROBOLEAGUE</span>
          <span>◼</span>
          <span>PICK AND PLACE</span>
          <span>◼</span>
          <span>ZEROTILT</span>
          <span>◼</span>
        </div>
      </div>

      <section className="man">
        <div className="stick">
          <p className="d" id="man">
            <span className="w hot">Machines</span>
            <span className="w hot">race,</span>
            <span className="w hot">collide,</span>
            <span className="w hot">balance</span>
            <span className="w">and</span>
            <span className="w hot">score.</span>
            <span className="w">Every</span>
            <span className="w">wire</span>
            <span className="w">you</span>
            <span className="w">solder</span>
            <span className="w">is</span>
            <span className="w">a</span>
            <span className="w">bet</span>
            <span className="w">on</span>
            <span className="w">the</span>
            <span className="w">arena.</span>
            <span className="w">Bring</span>
            <span className="w">a</span>
            <span className="w">bot</span>
            <span className="w">that</span>
            <span className="w">survives</span>
            <span className="w">the</span>
            <span className="w hot">jungle.</span>
          </p>
          <div className="gutter"></div>
        </div>
      </section>

      {/* Countdown Section - positioned before Pick your arena */}
      <section className="countdown-section" id="countdown">
        <div className="countdown-wrap">
          <div className="countdown-header">
            <span className="countdown-badge">
              <span className="cd-pulse-dot"></span>
              // IEEE RAS CUSAT SBC PRESENTS // T-MINUS
            </span>
            <h2 className="d countdown-title">
              DECEMBER 5
              <br />
              COUNTDOWN
            </h2>
            <p className="countdown-sub">
              Target date: <b>December 5</b>. Live at School of Engineering, CUSAT. Telemetry armed, arena fabrication verified. Prepare your machines for the opening bell.
            </p>
          </div>

          <div className="countdown-hud">
            <div className="countdown-units">
              <div className="cd-card">
                <div className="cd-card-inner">
                  <span className="cd-digit d">{pad(timeLeft.days)}</span>
                  <span className="cd-label">DAYS</span>
                </div>
              </div>

              <div className="cd-sep d">:</div>

              <div className="cd-card">
                <div className="cd-card-inner">
                  <span className="cd-digit d">{pad(timeLeft.hours)}</span>
                  <span className="cd-label">HOURS</span>
                </div>
              </div>

              <div className="cd-sep d">:</div>

              <div className="cd-card">
                <div className="cd-card-inner">
                  <span className="cd-digit d">{pad(timeLeft.minutes)}</span>
                  <span className="cd-label">MINUTES</span>
                </div>
              </div>

              <div className="cd-sep d">:</div>

              <div className="cd-card">
                <div className="cd-card-inner">
                  <span className="cd-digit d">{pad(timeLeft.seconds)}</span>
                  <span className="cd-label">SECONDS</span>
                </div>
              </div>
            </div>

            <div className="cd-footer-status">
              <div className="cd-status-left">
                <span className="cd-status-light"></span>
                <span>ORGANIZED BY IEEE RAS CUSAT SBC</span>
              </div>
              <div className="cd-status-right">
                <span>VENUE: SOE, CUSAT // 09:00 AM IST</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rail" id="arenas">
        <div className="stick">
          <h2 className="rh d">Pick your arena</h2>
          <div className="trk" id="trk">
            <article
              className="card"
              style={{ "--k": 0 } as React.CSSProperties}
            >
              <i className="sc"></i>
              <span className="n d">1</span>
              <span className="cat">Robo Race</span>
              <h3 className="d">RoboSprint</h3>
              <p>
                Race your robot through challenging tracks and obstacles in a
                thrilling test of speed, precision, and control. Navigate every
                turn and cross the finish line to claim victory.
              </p>
            </article>
            <article
              className="card"
              style={{ "--k": 1 } as React.CSSProperties}
            >
              <i className="sc"></i>
              <span className="n d">2</span>
              <span className="cat">Robo War</span>
              <h3 className="d">RoboCombat</h3>
              <p>
                Enter the ultimate robotic combat arena! Design and control a
                powerful battle bot to take on opponents, showcase strategic
                manoeuvres, and dominate the battlefield.
              </p>
            </article>
            <article
              className="card"
              style={{ "--k": 2 } as React.CSSProperties}
            >
              <i className="sc"></i>
              <span className="n d">3</span>
              <span className="cat">Robo Sumo</span>
              <h3 className="d">SumoSphere</h3>
              <p>
                Step into the arena where robotic strength meets strategy.
                Outmanoeuvre your opponent and push their bot beyond the ring to
                emerge as the ultimate sumo champion.
              </p>
            </article>
            <article
              className="card"
              style={{ "--k": 3 } as React.CSSProperties}
            >
              <i className="sc"></i>
              <span className="n d">4</span>
              <span className="cat">Robo Soccer</span>
              <h3 className="d">RoboLeague</h3>
              <p>
                Get ready for a robotic football showdown! Control the ball,
                coordinate your moves, and score goals against rival teams in a
                competition of precision, strategy, and teamwork.
              </p>
            </article>
            <article
              className="card"
              style={{ "--k": 4 } as React.CSSProperties}
            >
              <i className="sc"></i>
              <span className="n d">5</span>
              <span className="cat">Automation</span>
              <h3 className="d">Pick and Place</h3>
              <p>
                Grab it, carry it, set it down. Program your robot to move objects
                to the right spot, fast and without a drop. Full rules arrive
                soon.
              </p>
            </article>
            <article
              className="card"
              style={{ "--k": 5 } as React.CSSProperties}
            >
              <i className="sc"></i>
              <span className="n d">6</span>
              <span className="cat">Balancing Robot</span>
              <h3 className="d">ZeroTilt</h3>
              <p>
                Challenge gravity with engineering precision! Build a
                self-balancing robot that maintains stability through
                intelligent sensing, real-time corrections, and precise control.
              </p>
            </article>
          </div>
          <div className="prog">
            <i></i>
          </div>
        </div>
      </section>

      {/* Interactive Arena Battle Simulator */}
      <InteractiveArena />

      <section className="stage" id="ticket">
        <div className="stick">
          <div className="grid">
            <div className="big d">
              <span id="cnt">00</span>
              <small>
                competitions.
                <br />
                one arena complex.
              </small>
            </div>
            <div className="tkt">
              <span className="stamp">INCOMING</span>
              <h4 className="d">Event pass</h4>
              <div className="ro">
                <span>Organized by</span>
                <b>IEEE RAS CUSAT SBC</b>
              </div>
              <div className="ro">
                <span>Event</span>
                <b>BOT JUNGLE 2.0</b>
              </div>
              <div className="ro">
                <span>Arenas</span>
                <b>6</b>
              </div>
              <div className="ro">
                <span>Racing · Combat · Sumo</span>
                <b>3 of 6</b>
              </div>
              <div className="ro">
                <span>Soccer · Pick and place · Balance</span>
                <b>3 of 6</b>
              </div>
              <div className="ro">
                <span>Date</span>
                <b>December 5</b>
              </div>
              <div className="ro">
                <span>Venue</span>
                <b>School of Engineering, CUSAT</b>
              </div>
              <div className="ro countdown-ro">
                <span>Countdown</span>
                <b className="cd-live-ticker">
                  {pad(timeLeft.days)}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
                </b>
              </div>
              <div className="perf"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Register Team Section */}
      <section className="cta" id="register">
        <div className="logo rv"></div>
        <h2 className="d rv">
          Enter the
          <br />
          jungle
        </h2>
        <a className="btn rv" href="#register">
          Register your team
        </a>
        <p
          className="rv"
          style={{
            marginTop: "22px",
            color: "var(--dim)",
            fontSize: ".85rem",
          }}
        >
          Presented by IEEE RAS CUSAT SBC. Registration details and rulebooks will be published here.
        </p>
      </section>

      {/* FAQ Section - below Register now */}
      <section className="faq-section" id="faq">
        <div className="faq-wrap">
          <div className="faq-header">
            <span className="faq-badge">// PROTOCOLS & QUERIES</span>
            <h2 className="d faq-title">
              Frequently
              <br />
              Asked Questions
            </h2>
            <p className="faq-sub">
              Key operational intel regarding team requirements, our live battleground at CUSAT, arena protocols, and student eligibility.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.id}
                  className={`faq-item ${isOpen ? "active" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-q"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    id={`faq-btn-${faq.id}`}
                  >
                    <div className="faq-q-left">
                      <span className="faq-num">[{faq.id}]</span>
                      <span className="faq-tag">{faq.tag}</span>
                      <span className="faq-text">{faq.question}</span>
                    </div>
                    <span className="faq-icon" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className="faq-a"
                    style={{
                      maxHeight: isOpen ? "260px" : "0",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="faq-a-inner">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rich Cyberpunk Site Footer */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-col brand-col">
            <div className="footer-org-badge">
              <span className="cd-pulse-dot"></span>
              <span>IEEE RAS CUSAT SBC</span>
            </div>
            <div className="footer-brand">
              <div className="footer-logo"></div>
              <h3 className="d">BOT JUNGLE 2.0</h3>
            </div>
            <p className="footer-desc">
              Presented by <b>IEEE Robotics & Automation Society Student Branch Chapter</b>, School of Engineering, Cochin University of Science and Technology.
            </p>
            <div className="footer-meta-tags">
              <span>#IEEERAS</span>
              <span>#CUSAT</span>
              <span>#ROBOTICS</span>
              <span>#BOTJUNGLE2</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title d">ARENAS</h4>
            <ul className="footer-links">
              <li><a href="#arenas">01 RoboSprint (Race)</a></li>
              <li><a href="#arenas">02 RoboCombat (War)</a></li>
              <li><a href="#arenas">03 SumoSphere (Sumo)</a></li>
              <li><a href="#arenas">04 RoboLeague (Soccer)</a></li>
              <li><a href="#arenas">05 Pick and Place</a></li>
              <li><a href="#arenas">06 ZeroTilt (Balance)</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title d">EXPLORE</h4>
            <ul className="footer-links">
              <li><a href="#top">Hero & Mission</a></li>
              <li><a href="#countdown">December 5 Countdown</a></li>
              <li><a href="#arenas">6 Battle Arenas</a></li>
              <li><a href="#arena-sim">3D Arena Simulator</a></li>
              <li><a href="#ticket">Event Pass & Venue</a></li>
              <li><a href="#register">Team Registration</a></li>
              <li><a href="#faq">Frequently Asked Questions</a></li>
            </ul>
          </div>

          <div className="footer-col info-col">
            <h4 className="footer-col-title d">EVENT INTEL</h4>
            <div className="footer-info-item">
              <span className="info-label">ORGANIZED BY</span>
              <span className="info-val">IEEE RAS CUSAT SBC</span>
            </div>
            <div className="footer-info-item">
              <span className="info-label">DATE</span>
              <span className="info-val">December 5, 2026</span>
            </div>
            <div className="footer-info-item">
              <span className="info-label">VENUE</span>
              <span className="info-val">School of Engineering, CUSAT, South Kalamassery, Kochi</span>
            </div>
            <div className="footer-info-item">
              <span className="info-label">FORMAT</span>
              <span className="info-val">100% Offline Live Battle Arena</span>
            </div>
            <div className="footer-info-item">
              <span className="info-label">ELIGIBILITY</span>
              <span className="info-val">College Students (2-4 per team)</span>
            </div>
            <a href="#register" className="footer-cta-btn">
              REGISTER YOUR TEAM →
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <span>© 2026 IEEE RAS CUSAT SBC. All rights reserved.</span>
            <span className="footer-kanji">ボットジャングル 2.0</span>
          </div>
          <div className="footer-motto">
            <span>BUILD. BREAK. BALANCE. // SURVIVE THE JUNGLE.</span>
          </div>
          <a href="#top" className="footer-back-top" aria-label="Back to top">
            TOP ↑
          </a>
        </div>
      </footer>
    </>
  );
}
