import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const LINKS = [
  { label: 'Platform', href: '#pillars' },
  { label: 'Compliance', href: '#compliance' },
  { label: 'Metrics', href: '#metrics' },
]

function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logo} alt="EcoSphere" className="h-9 w-auto md:h-10" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-text"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-green transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <Link
          to="/dashboard"
          className="hidden rounded-full bg-blue px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90 md:inline-block"
        >
          Open dashboard
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 text-text md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-200 ${open ? 'translate-y-[6px] rotate-45' : ''}`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-4 bg-current transition-transform duration-200 ${open ? '-translate-y-[6px] -rotate-45' : ''}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-black/10 bg-white px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-xs uppercase tracking-widest text-muted"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-blue px-5 py-3 text-center font-mono text-xs uppercase tracking-widest text-white"
            >
              Open dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default NavBar