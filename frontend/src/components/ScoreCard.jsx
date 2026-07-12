const ACCENTS = {
  Environmental: {
    ring: 'var(--color-green)',
    bg: 'bg-green-light',
    text: 'text-green',
    letter: 'E',
  },
  Social: {
    ring: 'var(--color-blue)',
    bg: 'bg-blue-light',
    text: 'text-blue',
    letter: 'S',
  },
  Governance: {
    ring: 'var(--color-text)',
    bg: 'bg-offwhite',
    text: 'text-text',
    letter: 'G',
  },
}

/**
 * pillar: 'Environmental' | 'Social' | 'Governance'
 * score: 0-100
 * delta: signed change vs. last period, e.g. 4 or -2
 * note: short mono caption, e.g. "vs. last quarter"
 */
function ScoreCard({ pillar, score, delta = 0, note = 'vs. last quarter' }) {
  const accent = ACCENTS[pillar] ?? ACCENTS.Governance
  const isUp = delta > 0
  const isFlat = delta === 0

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {pillar}
        </span>
        <span
          className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${accent.bg} ${accent.text} font-mono text-xs font-medium`}
        >
          {accent.letter}
        </span>
      </div>

      <div className="flex items-end justify-between">
        <span className="font-display text-5xl font-medium leading-none text-text">
          {score}
        </span>
        <span
          className={`font-mono text-sm ${
            isFlat ? 'text-muted' : isUp ? 'text-green' : 'text-red-600'
          }`}
        >
          {isFlat ? '–' : isUp ? `↑ ${delta}` : `↓ ${Math.abs(delta)}`}
        </span>
      </div>

      <span className="font-mono text-xs text-muted">{note}</span>
    </div>
  )
}

export default ScoreCard