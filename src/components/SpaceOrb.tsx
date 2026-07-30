import { useEffect, useState, type ComponentType } from 'react'

type OrbCanvasComponent = ComponentType<{ className?: string }>

export function SpaceOrb({ className = '' }: { className?: string }) {
  const [OrbCanvas, setOrbCanvas] = useState<OrbCanvasComponent | null>(null)

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)')
    let active = true

    const syncOrb = () => {
      if (!desktopQuery.matches) {
        setOrbCanvas(null)
        return
      }

      void import('./SpaceOrbCanvas').then((module) => {
        if (active && desktopQuery.matches) {
          setOrbCanvas(() => module.SpaceOrbCanvas)
        }
      })
    }

    syncOrb()
    desktopQuery.addEventListener('change', syncOrb)

    return () => {
      active = false
      desktopQuery.removeEventListener('change', syncOrb)
    }
  }, [])

  return OrbCanvas ? <OrbCanvas className={className} /> : null
}
