import InteractiveArena from "../components/InteractiveArena";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BotJungle 2.0 · Live Arena Simulator",
  description: "Interactive real-time isometric robotics battle simulator for Bot Jungle 2.0.",
};

export default function ArenaPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#07070a" }}>
      <div
        style={{
          padding: "16px 4vw 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#ff1744",
            textDecoration: "none",
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "12px",
            letterSpacing: "0.15em",
            fontWeight: 800,
            padding: "6px 12px",
            border: "1px solid #ff1744",
            background: "rgba(255, 23, 68, 0.08)",
          }}
        >
          ← BACK TO BOT JUNGLE 2.0
        </Link>
      </div>
      <InteractiveArena />
    </main>
  );
}
