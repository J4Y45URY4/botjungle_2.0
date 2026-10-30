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

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

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
      const heroDenom = heroR ? heroR.height - innerH : 0;
      const heroP = heroDenom > 0 ? cl(-heroR!.top / heroDenom) : 0;

      const manDenom = manR ? manR.height - innerH : 0;
      const manP = manDenom > 0 ? cl(-manR!.top / manDenom) : 0;

      const railDenom = railR ? railR.height - innerH : 0;
      const railP = railDenom > 0 ? cl(-railR!.top / railDenom) : 0;

      const stageDenom = stageR ? stageR.height - innerH : 0;
      const stageP = stageDenom > 0 ? cl(-stageR!.top / stageDenom) : 0;

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
      <div className="bar"></div>
      <nav>
        <b>
          <span className="logo"></span>BOT JUNGLE 2.0
        </b>
        <span>
          <a href="#arenas">Arenas</a>
          <a href="#arena-sim">Arena Sim</a>
          <a href="#ticket">Event</a>
          <a href="#faq">FAQ</a>
          <a href="#register">Register</a>
        </span>
      </nav>

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
              <span style={{ display: "inline" }}>
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
            <span>Build it. Wire it. Send it.</span>
          </div>
          <div className="hint"></div>
        </div>
      </section>

      <div className="tick">
        <div>
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
                <b>To be announced</b>
              </div>
              <div className="ro">
                <span>Venue</span>
                <b>School of Engineering, CUSAT</b>
              </div>
              <div className="perf"></div>
            </div>
          </div>
        </div>
      </section>

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
          Registration details and rulebooks will be published here.
        </p>
      </section>

      <footer>
        <span>© BOT JUNGLE 2.0</span>
        <span>ボットジャングル</span>
        <span>Build. Break. Balance.</span>
      </footer>
    </>
  );
}
