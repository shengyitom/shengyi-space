import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { localize } from '../data/site'
import type { ProjectEvidence } from '../data/evidence'
import { useLanguage } from '../i18n/LanguageContext'

type EvidenceDossierProps = {
  evidence: ProjectEvidence
  technologies: string[]
}

const stateTone = {
  Verified: 'bg-[#191919] text-white',
  Documented: 'border border-[#191919]/18 bg-white text-[#191919]/55',
  Prototype: 'border border-dashed border-[#191919]/25 bg-white text-[#191919]/45',
}

export function EvidenceDossier({ evidence }: EvidenceDossierProps) {
  const { language, t } = useLanguage()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    if (lightboxIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null)
      if (event.key === 'ArrowRight') {
        setLightboxIndex((current) =>
          current === null ? null : (current + 1) % evidence.artifacts.length,
        )
      }
      if (event.key === 'ArrowLeft') {
        setLightboxIndex((current) =>
          current === null
            ? null
            : (current - 1 + evidence.artifacts.length) % evidence.artifacts.length,
        )
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [evidence.artifacts.length, lightboxIndex])

  const activeArtifact =
    lightboxIndex === null ? null : evidence.artifacts[lightboxIndex]

  return (
    <>
      <section id="evaluation" className="scroll-mt-28 mt-24 md:mt-32">
        <div className="grid overflow-hidden bg-[#F3F2EF] lg:grid-cols-[0.76fr_1.24fr]">
          <div className="flex flex-col justify-between p-7 sm:p-10 md:p-12">
            <div>
              <p className="space-label">{t('Evaluation')}</p>
              <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight tracking-[-0.035em] sm:text-5xl">
                {localize(evidence.evaluation.title, language)}
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-[#191919]/54">
                {localize(evidence.evaluation.summary, language)}
              </p>
            </div>
            <p className="mt-14 border-l border-[#191919]/45 pl-4 text-xs leading-6 text-[#191919]/48">
              {localize(evidence.evaluation.note, language)}
            </p>
          </div>

          <div className="grid grid-cols-2 border-t border-[#191919]/10 lg:border-l lg:border-t-0">
            {evidence.evaluation.rows.map((row, index) => (
              <article
                key={`${row.metric}-${row.value}`}
                className={`min-h-[220px] border-[#191919]/10 p-6 sm:min-h-[260px] sm:p-8 ${
                  index % 2 === 1 ? 'border-l' : ''
                } ${index > 1 ? 'border-t' : ''}`}
              >
                <p className="text-[9px] uppercase tracking-[0.13em] text-[#191919]/35">
                  {row.metric}
                </p>
                <p className="mt-10 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
                  {row.value}
                </p>
                <p className="mt-3 max-w-xs text-[10px] leading-5 text-[#191919]/42">
                  {localize(row.context, language)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="records" className="scroll-mt-28 mt-24 md:mt-32">
        <div className="grid gap-8 border-b border-[#191919]/10 pb-7 md:grid-cols-[0.78fr_1.22fr] md:items-end">
          <div>
            <p className="space-label">{t('Records')}</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.035em] sm:text-5xl">
              {t('Build record.')}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-[#191919]/50">
            {localize(evidence.sourceNote, language)}
          </p>
        </div>

        <div className="grid border-b border-[#191919]/10 sm:grid-cols-2 lg:grid-cols-5">
          {evidence.index.map((item, index) => (
            <article
              key={item.label.en}
              className="border-b border-[#191919]/10 py-6 sm:px-5 lg:border-b-0 lg:border-l lg:first:border-l-0"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[9px] text-[#191919]/25">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[7px] font-medium uppercase tracking-[0.11em] ${stateTone[item.state]}`}
                >
                  {t(item.state)}
                </span>
              </div>
              <h3 className="mt-7 text-xs font-medium">{localize(item.label, language)}</h3>
              <p className="mt-2 text-[10px] leading-5 text-[#191919]/42">
                {localize(item.detail, language)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-[0.36fr_1fr] md:gap-16">
          <div>
            <p className="space-label">{t('Engineering decisions')}</p>
            <p className="mt-4 max-w-xs text-xs leading-5 text-[#191919]/38">
              {t('Three choices that shaped the system, its evaluation, and its workflow.')}
            </p>
          </div>
          <div className="border-t border-[#191919]/10">
            {evidence.decisions.map((decision, index) => (
              <article
                key={decision.title.en}
                className="grid gap-4 border-b border-[#191919]/10 py-6 sm:grid-cols-[2.5rem_0.72fr_1.28fr] sm:gap-7"
              >
                <span className="text-[9px] text-[#191919]/25">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-2xl leading-tight tracking-tight">
                  {localize(decision.title, language)}
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-[#191919]/50">
                  {localize(decision.detail, language)}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="flex items-end justify-between border-b border-[#191919]/10 pb-5">
            <div>
              <p className="space-label">{t('Artifacts / Project records')}</p>
              <h3 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                {t('Interface, training, and experiment records.')}
              </h3>
            </div>
            <span className="hidden text-xs text-[#191919]/30 sm:block">
              {String(evidence.artifacts.length).padStart(2, '0')} {t('artifacts')}
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-12">
            {evidence.artifacts.map((artifact, index) => (
              <motion.button
                key={artifact.src}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                onClick={() => setLightboxIndex(index)}
                className={`group overflow-hidden border border-[#191919]/10 bg-[#f5f4f1] text-left ${
                  artifact.span === 'wide' || index === 0 ? 'md:col-span-8' : 'md:col-span-4'
                }`}
                aria-label={`${t('Open image')}: ${localize(artifact.title, language)}`}
              >
                <div
                  className={`relative overflow-hidden bg-white ${
                    artifact.span === 'wide' || index === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={artifact.src}
                    alt={localize(artifact.title, language)}
                    loading="lazy"
                    className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.015] ${
                      artifact.fit === 'cover' ? 'object-cover' : 'object-contain'
                    } ${artifact.position === 'top' ? 'object-top' : 'object-center'}`}
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/86 px-3 py-1.5 text-[7px] font-medium uppercase tracking-[0.13em] text-[#191919]/52 backdrop-blur">
                    {localize(artifact.kind, language)}
                  </span>
                  <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#191919] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                  </span>
                </div>
                <div className="border-t border-[#191919]/10 p-5">
                  <h4 className="font-serif text-xl tracking-tight">
                    {localize(artifact.title, language)}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-[#191919]/43">
                    {localize(artifact.caption, language)}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section
        id="next"
        className="scroll-mt-28 mt-24 grid gap-10 border-t border-[#191919]/10 pt-9 md:mt-32 md:grid-cols-[0.36fr_1fr] md:gap-16"
      >
        <div>
          <p className="space-label">{t('Next iteration')}</p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight">
            {t('Work planned for the next iteration.')}
          </h2>
        </div>
        <ol className="border-t border-[#191919]/10">
          {evidence.limitations.map((limitation, index) => (
            <li
              key={limitation.en}
              className="grid grid-cols-[3rem_1fr] border-b border-[#191919]/10 py-6"
            >
              <span className="text-[9px] text-[#191919]/25">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="max-w-3xl text-sm leading-6 text-[#191919]/55">
                {localize(limitation, language)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <AnimatePresence>
        {activeArtifact && lightboxIndex !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex flex-col bg-[#111]/96 p-4 text-white sm:p-7"
            role="dialog"
            aria-modal="true"
            aria-label={localize(activeArtifact.title, language)}
          >
            <div className="flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-[0.14em] text-white/45">
                {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
                {String(evidence.artifacts.length).padStart(2, '0')}
              </p>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="rounded-full border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.12em] text-white/65 transition-colors duration-200 hover:bg-white hover:text-[#191919]"
              >
                {t('Close image')}
              </button>
            </div>

            <div className="relative my-5 min-h-0 flex-1">
              <img
                src={activeArtifact.src}
                alt={localize(activeArtifact.title, language)}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="grid gap-5 border-t border-white/14 pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <h3 className="font-serif text-2xl tracking-tight">
                  {localize(activeArtifact.title, language)}
                </h3>
                <p className="mt-2 max-w-2xl text-xs leading-5 text-white/48">
                  {localize(activeArtifact.caption, language)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex(
                      (lightboxIndex - 1 + evidence.artifacts.length) %
                        evidence.artifacts.length,
                    )
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/18 transition-colors duration-200 hover:bg-white hover:text-[#191919]"
                  aria-label={t('Previous')}
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex + 1) % evidence.artifacts.length)
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/18 transition-colors duration-200 hover:bg-white hover:text-[#191919]"
                  aria-label={t('Next')}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
