export default function WandPlaceholder({ wand, small = false }) {
  const seed = wand.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const variation = seed % 5
  const tilt = [-18, -10, 0, 12, 20][variation]
  const orbX = 275 + variation * 8
  const sparkleColor = wand.alignment === 'Evil' ? '#ff6b6b' : wand.alignment === 'Good' ? '#fff2a8' : '#d9ccff'

  return (
    <svg className={small ? 'wand-svg wand-svg-small' : 'wand-svg'} viewBox="0 0 360 220" role="img" aria-label={wand.name}>
      <defs>
        <radialGradient id={`${wand.id}-orb`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#fff7d1" />
          <stop offset="50%" stopColor={wand.color} />
          <stop offset="100%" stopColor="#2d2850" />
        </radialGradient>
        <linearGradient id={`${wand.id}-shaft`} x1="0%" x2="100%">
          <stop offset="0%" stopColor="#3b2416" />
          <stop offset="48%" stopColor={wand.color} />
          <stop offset="100%" stopColor="#f0c060" />
        </linearGradient>
        <filter id={`${wand.id}-glow`}>
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="360" height="220" rx="28" fill="#0f0b20" />
      <circle cx="68" cy="54" r="45" fill={wand.color} opacity="0.12" />
      <circle cx="296" cy="175" r="64" fill={wand.color} opacity="0.09" />
      <g transform={`translate(180 110) rotate(${tilt})`} filter={`url(#${wand.id}-glow)`}>
        <rect x="-112" y="-7" width="238" height="14" rx="7" fill={`url(#${wand.id}-shaft)`} />
        <rect x="-104" y="-14" width="34" height="28" rx="8" fill="#8a6f2e" opacity="0.88" />
        <circle cx="142" cy="0" r="25" fill={`url(#${wand.id}-orb)`} stroke={sparkleColor} strokeWidth="4" />
        <path d="M126 -5 L158 0 L126 5" fill="#fff7d1" opacity="0.65" />
      </g>
      <g fill={sparkleColor} opacity="0.9">
        <path d={`M${48 + variation * 12} 150 l7 15 15 7-15 7-7 15-7-15-15-7 15-7z`} />
        <path d={`M${orbX} 44 l5 11 11 5-11 5-5 11-5-11-11-5 11-5z`} />
        <circle cx={120 + variation * 22} cy="54" r="4" />
        <circle cx={248 - variation * 11} cy="180" r="5" />
      </g>
    </svg>
  )
}
