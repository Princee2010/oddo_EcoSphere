import { Link } from 'react-router-dom'
import photo1 from '../assets/hero/photo-1.jpg'
import photo2 from '../assets/hero/photo-2.jpg'
import photo3 from '../assets/hero/photo-3.jpg'
import photo4 from '../assets/hero/photo-4.jpg'
import photo5 from '../assets/hero/photo-5.jpg'

const STRIP = [
  { src: photo1, alt: 'Aerial view of farmland', height: 'h-32' },
  { src: photo2, alt: 'Technician servicing solar equipment', height: 'h-40' },
  { src: photo3, alt: 'Team reviewing sustainability data', height: 'h-48' },
  { src: photo4, alt: 'Worker inspecting shipping operations', height: 'h-40' },
  { src: photo5, alt: 'Greenhouse crop inspection', height: 'h-32' },
]

function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 text-center">
      <span className="font-mono text-xs uppercase tracking-widest text-green">
        ESG management platform
      </span>

      <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl font-medium leading-[1.1] text-text md:text-6xl">
        One record for your whole footprint
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
        A connected system built on CSRD, GRI, TCFD, and SASB for measuring
        sustainability performance across your company.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/dashboard"
          className="rounded-full bg-blue px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90"
        >
          Open dashboard
        </Link>
        <a
          href="#compliance"
          className="rounded-full bg-green-light px-6 py-3 font-mono text-xs uppercase tracking-widest text-green transition-opacity hover:opacity-90"
        >
          View frameworks
        </a>
      </div>

      <div className="relative mt-16">
        <div className="grid grid-cols-5 items-end gap-2">
          {STRIP.map((item) => (
            <img
              key={item.alt}
              src={item.src}
              alt={item.alt}
              className={`w-full rounded-xl object-cover ${item.height}`}
            />
          ))}
        </div>

        <div className="absolute -bottom-5 right-[6%] flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-2.5 shadow-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-light font-mono text-sm font-medium text-green">
            76
          </span>
          <span className="text-left leading-tight">
            <span className="block text-sm font-medium text-text">ESG score</span>
            <span className="block font-mono text-[10px] text-muted">FY 2026</span>
          </span>
        </div>
      </div>
    </section>
  )
}

export default Hero