import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const LINKS = [
  { label: 'Platform', href: '#pillars' },
  { label: 'Compliance', href: '#compliance' },
  { label: 'Metrics', href: '#metrics' },
]

function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="EcoSphere" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Link
          to="/dashboard"
          className="rounded-full bg-blue px-5 py-2 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90"
        >
          Open dashboard
        </Link>
      </div>
    </header>
  )
}

export default NavBar