import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type PageFrameProps = {
  children: ReactNode
  className?: string
}

export function PageFrame({ children, className = '' }: PageFrameProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      className={`min-h-screen bg-white pt-28 sm:pt-32 ${className}`}
    >
      {children}
    </motion.main>
  )
}

type SectionIntroProps = {
  eyebrow: string
  title: ReactNode
  copy?: string
  className?: string
}

export function SectionIntro({ eyebrow, title, copy, className = '' }: SectionIntroProps) {
  return (
    <header className={`grid gap-8 md:grid-cols-[1fr_0.72fr] md:items-end md:gap-16 ${className}`}>
      <div>
        <p className="space-label">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl font-normal leading-[0.98] tracking-[-0.045em] text-[#191919] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          {title}
        </h1>
      </div>
      {copy ? (
        <p className="max-w-xl text-sm leading-7 text-[#191919]/60 md:pb-2 md:text-base">{copy}</p>
      ) : null}
    </header>
  )
}
