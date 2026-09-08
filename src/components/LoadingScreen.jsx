import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Purely time-based rather than tied to real network/asset timing - the
// site's own assets (images, video) load lazily and asynchronously in the
// background regardless, so tracking "real" progress would either finish
// instantly (nothing critical blocks first paint) or hang on something
// irrelevant. A fixed, deliberate sequence reads as an intentional brand
// moment instead of a flaky progress bar.
const FILL_DURATION = 1600; // ms the line takes to fill 0 -> 100
const FLASH_DURATION = 220; // ms the white flash holds before the reveal
const EXIT_DURATION = 0.6; // s the whole screen takes to dissolve away

const LoadingScreen = () => {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading -> flash -> done

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min((now - start) / FILL_DURATION, 1);
      setPercent(Math.round(progress * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setPhase("flash");
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (phase !== "flash") return undefined;
    const timer = setTimeout(() => setPhase("done"), FLASH_DURATION);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION, ease: "easeInOut" }}
          className="fixed inset-0 z-99999 flex flex-col items-center justify-center gap-8 bg-black"
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-elite text-2xl font-semibold tracking-[0.35em] text-white sm:text-3xl"
          >
            FAALAK<span className="text-primary">.</span>
          </motion.div>

          {/* The fill line - a thin track with a glowing white bar growing
              left to right, exactly in step with the percentage below it. */}
          <div className="relative h-[2px] w-56 overflow-hidden rounded-full bg-white/10 sm:w-72">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-white shadow-[0_0_16px_2px_rgba(255,255,255,0.55)]"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="font-display text-xs font-medium tracking-[0.3em] text-white/50">
            {String(percent).padStart(3, "0")}%
          </p>

          {/* A brief full-white flash right as the line completes, so the
              black screen doesn't just fade - it snaps to white, then
              dissolves to reveal the site underneath. */}
          {phase === "flash" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: FLASH_DURATION / 1000 }}
              className="pointer-events-none fixed inset-0 bg-white"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
