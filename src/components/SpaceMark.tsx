export function SpaceMark({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M3 3H22L29 10V15H11L7 19H29V29H10L3 22V17H21L25 13H3V3Z" fill="currentColor" />
      <path d="M22 3V10H29" stroke="white" strokeWidth="1.5" />
    </svg>
  )
}
