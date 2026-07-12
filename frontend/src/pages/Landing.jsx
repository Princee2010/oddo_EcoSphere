import NavBar from '../components/NavBar.jsx'
import Hero from '../components/Hero.jsx'
import { Link } from 'react-router-dom'

const PILLARS = [
  {
    letter: 'E',
    title: 'Environmental',
    accent: 'text-green',
    bg: 'bg-green-light',
    body: 'Track emissions, energy mix, water use, and waste diversion across every site, and roll it up into one auditable score.',
  },
  {
    letter: 'S',
    title: 'Social',
    accent: 'text-blue',
    bg: 'bg-blue-light',
    body: 'Follow labor practices, community investment, and supply-chain conditions with evidence attached to every data point.',
  },
  {
    letter: 'G',
    title: 'Governance',
    accent: 'text-text',
    bg: 'bg-offwhite',
    body: 'Keep board composition, ethics policy, and disclosure controls current, with a change log reviewers can trust.',
  },
]

const METRICS = [
  { value: '2,400+', label: 'Data points tracked per company' },
  { value: '38%', label: 'Average cut in reporting time' },
  { value: '4', label: 'Frameworks mapped automatically' },
  { value: '99.9%', label: 'Audit-trail uptime' },
]

const FRAMEWORKS = ['CSRD', 'GRI', 'TCFD', 'SASB']

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      <Hero />

      {/* Pillars */}
      <section id="pillars" className="border-t border-black/10 bg-offwhite">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Three pillars, one score
          </span>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium text-text md:text-4xl">
            Every metric belongs to exactly one pillar, so nothing gets counted twice.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-black/10 bg-white p-8"
              >
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${pillar.bg} ${pillar.accent} font-mono text-sm font-medium`}
                >
                  {pillar.letter}
                </span>
                <h3 className="mt-5 font-display text-xl font-medium text-text">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics strip */}
      <section id="metrics" className="border-t border-black/10 bg-text">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
          {METRICS.map((metric) => (
            <div key={metric.label}>
              <p className="font-mono text-3xl font-medium text-white">
                {metric.value}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-white/60">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance CTA */}
      <section id="compliance" className="border-t border-black/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-20 md:flex-row md:items-center">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-blue">
              Reporting frameworks
            </span>
            <h2 className="mt-3 font-display text-3xl font-medium text-text md:text-4xl">
              Map your data once. Report it everywhere it’s required.
            </h2>
            <p className="mt-4 text-muted">
              EcoSphere keeps your disclosures aligned to CSRD, GRI, TCFD, and
              SASB, and flags any metric a framework needs that you haven’t
              filled in yet.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {FRAMEWORKS.map((fw) => (
                <span
                  key={fw}
                  className="rounded-full border border-black/15 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-text"
                >
                  {fw}
                </span>
              ))}
            </div>
          </div>

          <Link
            to="/dashboard/compliance"
            className="shrink-0 rounded-full bg-green px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90"
          >
            Check compliance status
          </Link>
        </div>
      </section>

      <footer className="border-t border-black/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
          <span className="font-mono text-xs text-muted">
            © 2026 EcoSphere ESG Management Platform
          </span>
          <span className="font-mono text-xs text-muted">Built for reporting teams</span>
        </div>
      </footer>
    </div>
  )
}

export default Landing