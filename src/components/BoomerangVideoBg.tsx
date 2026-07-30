import { useEffect, useRef, useState } from 'react'

const VIDEO_URL = '/hero-boomerang.mp4'
const POSTER_URL = '/hero-poster.webp'

export function BoomerangVideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches)

    syncPreference()
    mediaQuery.addEventListener('change', syncPreference)

    return () => mediaQuery.removeEventListener('change', syncPreference)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || prefersReducedMotion) return

    const syncPlayback = () => {
      if (document.hidden) {
        video.pause()
        return
      }

      video.play().catch(() => undefined)
    }

    syncPlayback()
    document.addEventListener('visibilitychange', syncPlayback)

    return () => {
      document.removeEventListener('visibilitychange', syncPlayback)
      video.pause()
    }
  }, [prefersReducedMotion])

  return (
    <div className="absolute inset-0 z-0 origin-top scale-[1.15] overflow-hidden" aria-hidden>
      {prefersReducedMotion ? (
        <img
          src={POSTER_URL}
          alt=""
          className="h-full w-full object-cover object-top"
          decoding="async"
        />
      ) : (
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="metadata"
          poster={POSTER_URL}
          className="h-full w-full object-cover object-top"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/15 to-white/30" />
    </div>
  )
}
