export function SpaceOrb({ className = '' }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <svg
        viewBox="0 0 600 600"
        className="h-full w-full text-[#191919]"
        fill="none"
        role="presentation"
      >
        <circle cx="300" cy="300" r="156" stroke="currentColor" strokeOpacity="0.16" />
        <ellipse
          cx="300"
          cy="300"
          rx="238"
          ry="92"
          stroke="currentColor"
          strokeOpacity="0.13"
          transform="rotate(-18 300 300)"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="218"
          ry="76"
          stroke="currentColor"
          strokeOpacity="0.1"
          transform="rotate(58 300 300)"
        />
        <path
          d="M300 144 435 222 435 378 300 456 165 378 165 222 300 144Zm0 0v156m135-78-135 78m135 78-135-78m0 156V300M165 378l135-78M165 222l135 78"
          stroke="currentColor"
          strokeOpacity="0.2"
        />
        <circle cx="300" cy="144" r="4" fill="currentColor" fillOpacity="0.38" />
        <circle cx="435" cy="222" r="4" fill="currentColor" fillOpacity="0.38" />
        <circle cx="435" cy="378" r="4" fill="currentColor" fillOpacity="0.38" />
        <circle cx="300" cy="456" r="4" fill="currentColor" fillOpacity="0.38" />
        <circle cx="165" cy="378" r="4" fill="currentColor" fillOpacity="0.38" />
        <circle cx="165" cy="222" r="4" fill="currentColor" fillOpacity="0.38" />
        <circle cx="300" cy="300" r="7" fill="currentColor" fillOpacity="0.46" />
        <circle cx="93" cy="249" r="3" fill="currentColor" fillOpacity="0.28" />
        <circle cx="500" cy="353" r="3" fill="currentColor" fillOpacity="0.28" />
        <circle cx="385" cy="104" r="3" fill="currentColor" fillOpacity="0.28" />
      </svg>
    </div>
  )
}
