import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PILLARS = [
  {
    letter: "E",
    label: "Environmental",
    score: 82,
    chip: "bg-green-light",
    accent: "text-green",
    bar: "bg-green",
  },
  {
    letter: "S",
    label: "Social",
    score: 71,
    chip: "bg-blue-light",
    accent: "text-blue",
    bar: "bg-blue",
  },
  {
    letter: "G",
    label: "Governance",
    score: 76,
    chip: "bg-gray-100",
    accent: "text-gray-700",
    bar: "bg-gray-700",
  },
];

function AnimatedNumber({ end, duration = 2 }) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const start = performance.now();

    const tick = (now) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [end, duration]);

  return <>{value}</>;
}

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative mx-auto -mt-20 max-w-7xl px-6 pb-24"
    >
      <div className="overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/10 bg-offwhite px-6 py-4">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <span className="rounded-full bg-white px-4 py-2 text-xs text-muted shadow">
            app.ecosphere.io
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-light font-semibold text-green">
            H
          </div>
        </div>

        <div className="grid gap-8 p-8 lg:grid-cols-[280px_1fr]">
          <div className="rounded-3xl bg-forest p-8 text-white">
            <p className="text-sm text-white/70">Overall ESG Score</p>
            <div className="mt-6 flex h-32 w-32 items-center justify-center rounded-full border-8 border-green bg-white text-4xl font-bold text-forest">
              <AnimatedNumber end={76} duration={2} />
            </div>
            <p className="mt-6 text-white/70">Live Sustainability Index</p>
          </div>

          <div>
            <div className="grid gap-5 md:grid-cols-3">
              {PILLARS.map((pillar) => (
                <motion.div
                  whileHover={{ y: -8 }}
                  key={pillar.letter}
                  className="rounded-3xl bg-offwhite p-6 shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted">{pillar.label}</p>
                      <h2 className="mt-3 text-4xl font-bold">
                        <AnimatedNumber end={pillar.score} duration={2} />
                      </h2>
                    </div>
                    <div className={`${pillar.chip} flex h-12 w-12 items-center justify-center rounded-2xl`}>
                      <span className={pillar.accent}>{pillar.letter}</span>
                    </div>
                  </div>
                  <div className="mt-6 h-2 rounded-full bg-gray-200">
                    <div
                      className={`${pillar.bar} h-2 rounded-full`}
                      style={{ width: `${pillar.score}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardPreview;