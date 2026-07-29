import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageFrame, SectionIntro } from '../components/PageFrame'
import { journey, localize } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'

export function JourneyPage() {
  const { language, t } = useLanguage()

  return (
    <PageFrame>
      <div className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 md:px-14 md:pb-32">
        <SectionIntro
          eyebrow={t('Journey / Growth 02')}
          title={
            <>
              {t('Learning through')}
              <br />
              {t('building.')}
            </>
          }
          copy={t(
            'A timeline of study, experiments, repeated implementation, and the move from software projects into AI engineering.',
          )}
        />

        <section className="relative mt-20 md:mt-28">
          <div className="absolute bottom-0 left-[2.2rem] top-0 w-px bg-[#191919]/10 md:left-[10.5rem]" />
          {journey.map((chapter, index) => (
            <motion.article
              key={chapter.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              className="relative grid gap-7 border-t border-[#191919]/10 py-10 pl-16 md:grid-cols-[8rem_1fr] md:gap-12 md:py-14 md:pl-0"
            >
              <div className="absolute left-[2rem] top-[3.2rem] z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-[#191919] md:left-[10.5rem] md:top-[4.15rem]" />
              <div>
                <p className="font-serif text-4xl tracking-tight md:text-5xl">{chapter.year}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#191919]/35">
                  {t('Phase')} {String(index + 1).padStart(2, '0')}
                </p>
              </div>
              <div className="md:pl-12">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="space-label">{localize(chapter.phase, language)}</p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#191919]/32">
                    {localize(chapter.evidence, language)}
                  </p>
                </div>
                <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-[-0.025em] sm:text-4xl">
                  {localize(chapter.title, language)}
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#191919]/58">
                  {localize(chapter.description, language)}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {chapter.markers.map((marker) => (
                    <span
                      key={marker}
                      className="rounded-full border border-[#191919]/12 px-3 py-1.5 text-[11px] text-[#191919]/50"
                    >
                      {marker}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </section>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-[#191919]/10 pt-8 sm:flex-row sm:items-end">
          <p className="max-w-lg font-serif text-2xl leading-snug tracking-tight text-[#191919]/70 sm:text-3xl">
            {t('The next chapter focuses on fewer, deeper systems.')}
          </p>
          <Link to="/now" className="group flex items-center gap-3 text-sm font-medium">
            {t('See what is happening now')}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </PageFrame>
  )
}
