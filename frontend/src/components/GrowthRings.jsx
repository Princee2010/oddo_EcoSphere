/**
 * GrowthRings
 * Each concentric ring is one year of ESG performance, oldest at the core,
 * most recent on the outside — the way a cross-cut trunk records growth.
 * Ring thickness scales with score; ring color signals the score band.
 *
 * data: [{ year: 2021, score: 58 }, { year: 2022, score: 64 }, ...]
 *       ordered oldest -> newest
 */
function GrowthRings({ data = [], size = 320, showLabels = true, className = '' }) {
  const center = size / 2
  const padding = showLabels ? 34 : 12
  const maxRadius = center - padding
  const step = data.length > 0 ? maxRadius / data.length : 0
  const latest = data[data.length - 1]

  const colorFor = (score) => {
    if (score >= 70) return 'var(--color-green)'
    if (score >= 50) return 'var(--color-blue)'
    return 'var(--color-muted)'
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label={`ESG score growth rings across ${data.length} years, ${
        latest ? `latest score ${latest.score} in ${latest.year}` : 'no data yet'
      }`}
    >
      <circle cx={center} cy={center} r={2.5} fill="var(--color-green)" />

      {data.map((d, i) => {
        const radius = step * (i + 1)
        const strokeWidth = 1.5 + (d.score / 100) * 6
        return (
          <circle
            key={d.year}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colorFor(d.score)}
            strokeWidth={strokeWidth}
            opacity={0.5 + (i / data.length) * 0.5}
          />
        )
      })}

      {showLabels && data.length > 0 && (
        <>
          <text
            x={center}
            y={16}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--color-muted)"
          >
            {data[0].year}
          </text>
          <text
            x={center}
            y={size - 10}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--color-text)"
          >
            {latest?.year} · {latest?.score}
          </text>
        </>
      )}
    </svg>
  )
}

export default GrowthRings