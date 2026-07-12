import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import CountUp from "react-countup";

const PILLARS = [
  {
    letter: "E",
    label: "Environmental",
    score: 82,
    color: "bg-green",
    bg: "bg-green-light",
    change: "+4%"
  },
  {
    letter: "S",
    label: "Social",
    score: 71,
    color: "bg-blue",
    bg: "bg-blue-light",
    change: "+2%"
  },
  {
    letter: "G",
    label: "Governance",
    score: 76,
    color: "bg-gray-700",
    bg: "bg-gray-100",
    change: "+3%"
  }
]

const FRAMEWORKS = ['CSRD', 'GRI', 'TCFD', 'SASB']

function Hero() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-green/10 blur-[130px]" />
          <div className="absolute right-20 top-48 h-72 w-72 rounded-full bg-blue/10 blur-[100px]" />
          <div className="absolute left-10 top-96 h-64 w-64 rounded-full bg-green-light blur-[100px]" />
        </div>

        <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-28 pb-14 text-center">
          <span className="rounded-full border border-green/20 bg-white/70 px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] text-green backdrop-blur">
            ESG MANAGEMENT PLATFORM
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-8 max-w-5xl font-display text-6xl font-medium leading-[0.95] tracking-[-0.05em] text-text md:text-7xl"
          >
            One record for your whole sustainability footprint.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-2xl text-xl leading-9 text-muted"
          >
            Measure carbon emissions, manage compliance, monitor ESG
            performance and generate reports from one beautifully designed
            platform.
          </motion.p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link
              to="/dashboard"
              className="rounded-full bg-blue px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-white shadow-xl shadow-blue/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Open Dashboard
            </Link>
            <a
              href="#compliance"
              className="rounded-full border border-black/10 bg-white px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-text shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-green-light"
            >
              Explore Frameworks
            </a>
          </div>
        </div>
      </section>

      {/* Live product preview — shows exactly what the platform tracks */}
      <div className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <div className="rounded-3xl border border-black/10 bg-offwhite p-6 md:p-10">
          <div className="grid gap-6 md:grid-cols-[15rem_1fr] md:items-center">
            <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-sm">
              <div
                className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#16A34A 273.6deg, #E7E4DC 0deg)`,
                }}
              >
                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white">
                  <span className="font-mono text-xl font-bold text-text">76</span>
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-text">ESG score</p>
                <p className="font-mono text-xs text-muted">FY 2026 · live</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {PILLARS.map((pillar) => (
                <div key={pillar.letter} className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${pillar.chip} ${pillar.accent} font-mono text-xs font-semibold`}
                    >
                      {pillar.letter}
                    </span>
                    <span className="font-mono text-xs text-muted">{pillar.score}</span>
                  </div>
                  <p className="mt-3 text-sm font-medium text-text">{pillar.label}</p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-offwhite">
                    <div
                      className={`h-1.5 rounded-full ${pillar.bar}`}
                      style={{ width: `${pillar.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-black/10 pt-6">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Mapped to
            </span>
            {FRAMEWORKS.map((fw) => (
              <span
                key={fw}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 font-mono text-xs text-text"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-3 w-3 text-green"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-3-3a1 1 0 111.4-1.4l2.3 2.3 6.3-6.3a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {fw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero