import { useParams, Link } from 'react-router-dom'
import { Search, Bell } from 'lucide-react'

const SECTION_LABELS = {
  environmental: 'Environmental',
  social: 'Social',
  policies: 'Policies',
  compliance: 'Compliance',
  'risk-register': 'Risk register',
  audits: 'Audits',
  reports: 'Reports',
  'team-directory': 'Team directory',
  departments: 'Departments',
}

/**
 * Top header for the dashboard’s main content area — pairs with the dark
 * Sidebar rail. Stays light so it reads as part of the content panel, not
 * the navigation rail.
 */
function DashboardHeader() {
  const { section } = useParams()
  const label = section ? SECTION_LABELS[section] ?? section : 'Dashboard'

  return (
    <header className="flex items-center justify-between border-b border-black/10 bg-white px-8 py-4">
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
        <Link to="/dashboard" className="hover:text-text">
          Overview
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-text">{label}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full border border-black/10 bg-offwhite px-3 py-1.5">
          <Search size={14} strokeWidth={1.75} className="text-muted" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search metrics, reports, audits"
            className="w-56 bg-transparent font-mono text-xs text-text placeholder:text-muted focus:outline-none"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-muted transition-colors hover:text-text"
        >
          <Bell size={16} strokeWidth={1.75} />
        </button>

        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-light font-mono text-xs font-medium text-blue">
          JS
        </span>
      </div>
    </header>
  )
}

export default DashboardHeader