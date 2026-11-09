import { motion } from "motion/react";

// An original, license-safe "AI data center" illustration - rows of glowing
// server-rack blades on a dark gradient, built from CSS/SVG rather than a
// stock photo. Used as the mega-menu teaser tile for Industries and Our
// Work (Services uses the real AI-receptionist photo instead), so each
// dropdown gets a distinct visual instead of the same image repeated three
// times.
const ACCENTS = {
  purple: { from: "#7c3aed", via: "#a855f7", glow: "#c4b5fd" },
  cyan: { from: "#0891b2", via: "#22d3ee", glow: "#a5f3fc" },
  blue: { from: "#1d4ed8", via: "#3b82f6", glow: "#93c5fd" },
};

const DataCenterVisual = ({ accent = "blue" }) => {
  const colors = ACCENTS[accent] || ACCENTS.blue;
  const rows = 3;
  const cols = 7;

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl"
      style={{ background: `linear-gradient(135deg, #0b1224 0%, #10182c 55%, #0b1224 100%)` }}
    >
      {/* Faint circuit-grid texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute -top-6 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: colors.glow, opacity: 0.35 }}
      />

      {/* Server rack blades */}
      <div className="relative flex flex-col gap-2">
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="flex gap-1.5">
            {Array.from({ length: cols }).map((_, col) => (
              <div key={col} className="flex h-6 w-3 flex-col items-center gap-1 rounded-[2px] bg-white/10">
                <motion.span
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{
                    duration: 1.6 + ((row + col) % 3) * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (row * cols + col) * 0.06,
                  }}
                  className="mt-0.5 h-0.5 w-1.5 rounded-full"
                  style={{ background: colors.via, boxShadow: `0 0 6px ${colors.via}` }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataCenterVisual;
