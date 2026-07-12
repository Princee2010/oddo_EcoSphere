import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'
import DashboardPreview from './DashboardPreview'

const FRAMEWORKS = ['CSRD', 'GRI', 'TCFD', 'SASB']

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function Hero() {
  return (
    <>
      <section className="relative overflow-hidden">
        {/* Soft blurred background gradients */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-green/10 blur-[130px]" />
          <div className="absolute right-20 top-48 h-72 w-72 rounded-full bg-blue/10 blur-[100px]" />
          <div className="absolute left-10 top-96 h-64 w-64 rounded-full bg-green-light blur-[100px]" />
        </div>

        <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pb-16 pt-32 text-center">
          <motion.div
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-green/20 bg-white/70 px-4 py-2 shadow-sm backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-green">
              ESG management platform
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={0.1}
            variants={fadeUp}
            className="mt-8 max-w-5xl text-balance font-display text-6xl font-medium leading-[0.95] tracking-[-0.05em] text-text md:text-7xl"
          >
            One record for your whole sustainability footprint.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={0.25}
            variants={fadeUp}
            className="mt-8 max-w-2xl text-balance text-xl leading-9 text-muted"
          >
            Measure carbon emissions, manage compliance, monitor ESG
            performance and generate reports from one beautifully designed
            platform.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={0.4}
            variants={fadeUp}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 rounded-full bg-blue px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-white shadow-xl shadow-blue/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue/30"
            >
              Open dashboard
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </Link>
            <a
              href="#compliance"
              className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-text shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-green-light"
            >
              Explore frameworks
              <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            custom={0.55}
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Mapped to
            </span>
            {FRAMEWORKS.map((fw) => (
              <span
                key={fw}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-text/70"
              >
                {fw}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live product preview — realistic dashboard, not a static screenshot */}
      <DashboardPreview />
    </>
  )
}

export default Hero