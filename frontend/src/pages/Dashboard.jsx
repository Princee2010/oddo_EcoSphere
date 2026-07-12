import Sidebar from '../components/Sidebar.jsx'
import DashboardHeader from '../components/DashboardHeader.jsx'
import ScoreCard from '../components/ScoreCard.jsx'
import GrowthRings from '../components/GrowthRings.jsx'

const RING_DATA = [
  { year: 2021, score: 49 },
  { year: 2022, score: 55 },
  { year: 2023, score: 63 },
  { year: 2024, score: 70 },
  { year: 2025, score: 76 },
]

const SCORES = [
  { pillar: 'Environmental', score: 78, delta: 5 },
  { pillar: 'Social', score: 71, delta: -2 },
  { pillar: 'Governance', score: 82, delta: 0 },
]

const COMPLIANCE = [
  {
    framework: 'CSRD',
    name: 'Corporate Sustainability Reporting Directive',
    status: 'Compliant',
    updated: 'Jun 18, 2026',
  },
  {
    framework: 'GRI',
    name: 'Global Reporting Initiative',
    status: 'Compliant',
    updated: 'Jun 18, 2026',
  },
  {
    framework: 'TCFD',
    name: 'Task Force on Climate-related Financial Disclosures',
    status: 'In progress',
    updated: 'May 30, 2026',
  },
  {
    framework: 'SASB',
    name: 'Sustainability Accounting Standards Board',
    status: 'Not started',
    updated: '—',
  },
]

const STATUS_STYLE = {
  Compliant: 'bg-green-light text-green',
  'In progress': 'bg-blue-light text-blue',
  'Not started': 'bg-offwhite text-muted',
}

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex-1">
        <DashboardHeader />

        <main className="px-8 py-8 md:px-12">
        <div className="mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Overview · FY 2026
          </span>
          <h1 className="mt-2 font-display text-3xl font-medium text-text">
            Good morning. Here’s where things stand.
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr_auto]">
          {SCORES.map((s) => (
            <ScoreCard key={s.pillar} {...s} />
          ))}

          <div className="flex items-center justify-center rounded-2xl border border-black/10 bg-offwhite p-6">
            <GrowthRings data={RING_DATA} size={180} showLabels={false} />
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-medium text-text">
              Compliance frameworks
            </h2>
            <span className="font-mono text-xs text-muted">
              {COMPLIANCE.filter((c) => c.status === 'Compliant').length} of{' '}
              {COMPLIANCE.length} compliant
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-black/10">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-black/10 bg-offwhite">
                  <th className="px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted">
                    Framework
                  </th>
                  <th className="px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted">
                    Status
                  </th>
                  <th className="px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted">
                    Last updated
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPLIANCE.map((row, i) => (
                  <tr
                    key={row.framework}
                    className={i !== COMPLIANCE.length - 1 ? 'border-b border-black/10' : ''}
                  >
                    <td className="px-5 py-4">
                      <p className="font-mono text-sm font-medium text-text">
                        {row.framework}
                      </p>
                      <p className="text-sm text-muted">{row.name}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 font-mono text-xs uppercase tracking-widest ${STATUS_STYLE[row.status]}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-sm text-muted">
                      {row.updated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard