import { Link, useParams } from 'react-router-dom'
import {
  LayoutDashboard,
  Globe2,
  Users,
  FileText,
  ShieldCheck,
  TriangleAlert,
  Scale,
  Briefcase,
  Network,
  Building2,
} from 'lucide-react'

const GROUPS = [
  {
    label: 'Overview',
    items: [{ label: 'Dashboard', section: undefined, icon: LayoutDashboard }],
  },
  {
    label: 'Metrics',
    items: [
      { label: 'Environmental', section: 'environmental', icon: Globe2 },
      { label: 'Social', section: 'social', icon: Users },
    ],
  },
  {
    label: 'Governance',
    items: [
      { label: 'Policies', section: 'policies', icon: FileText },
      { label: 'Compliance', section: 'compliance', icon: ShieldCheck },
      { label: 'Risk register', section: 'risk-register', icon: TriangleAlert },
      { label: 'Audits', section: 'audits', icon: Scale },
    ],
  },
  {
    label: 'Intelligence',
    items: [{ label: 'Reports', section: 'reports', icon: Briefcase }],
  },
  {
    label: 'Organization',
    items: [
      { label: 'Team directory', section: 'team-directory', icon: Network },
      { label: 'Departments', section: 'departments', icon: Building2 },
    ],
  },
]

function Sidebar() {
  const { section } = useParams()

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col overflow-y-auto bg-forest px-4 py-6">
      <Link to="/" className="mb-8 flex items-center gap-3 px-1">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green font-display text-base font-medium text-white">
          E
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-display text-base font-medium text-white">EcoSphere</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-forest-muted">
            ESG command
          </span>
        </span>
      </Link>

      <nav className="flex flex-col gap-6">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-widest text-forest-muted">
              {group.label}
            </p>
            <div className="flex flex-col gap-1">
              {group.items.map((item) => {
                const to = item.section ? `/dashboard/${item.section}` : '/dashboard'
                const isActive = section === item.section || (!section && !item.section)
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    to={to}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-forest-light text-white'
                        : 'text-forest-muted hover:bg-forest-light/60 hover:text-white'
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar