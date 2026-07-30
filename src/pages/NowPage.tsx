import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { PageFrame, SectionIntro } from '../components/PageFrame'
import { localize, nowFocus } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'

export function NowPage() {
  const { language, path, t } = useLanguage()

  return (
    <PageFrame>
      <div className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 md:px-14 md:pb-32">
        <SectionIntro
          eyebrow={t('Now / Current Signal')}
          title={
            <>
              {t('Current')}
              <br />
              {t('focus.')}
            </>
          }
          copy={t(
            'A live snapshot of what I am learning, building, and improving right now. This page is intentionally temporary and will change with the work.',
          )}
        />

        <section className="mt-20 border-t border-[#191919]/10 md:mt-28">
          {nowFocus.map((item, index) => (
            <motion.article
              key={item.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.05 }}
              className="grid gap-6 border-b border-[#191919]/10 py-9 sm:grid-cols-[4rem_0.85fr_1.15fr] sm:gap-10 sm:py-12"
            >
              <span className="text-[10px] text-[#191919]/30">{item.number}</span>
              <div>
                <span className="inline-flex rounded-full bg-[#191919] px-3 py-1 text-[9px] uppercase tracking-[0.15em] text-white">
                  {localize(item.status, language)}
                </span>
                <h2 className="mt-5 font-serif text-3xl tracking-tight sm:text-4xl">
                  {localize(item.title, language)}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#191919]/55 sm:pt-10">
                {localize(item.copy, language)}
              </p>
            </motion.article>
          ))}
        </section>

        <section className="mt-24 grid gap-3 md:mt-32 md:grid-cols-3">
          {[
            ['30 days', 'Update the five flagship cases with clearer evaluation and project media.'],
            ['60 days', 'Build one agentic workflow with explicit tools, memory, and failure analysis.'],
            ['90 days', 'Publish a technical note that connects the experiment to a usable product system.'],
          ].map(([period, copy]) => (
            <article key={period} className="min-h-[220px] bg-[#F4F3F3] p-7 sm:p-8">
              <p className="space-label">{t(period)}</p>
              <p className="mt-14 font-serif text-2xl leading-snug tracking-tight">{t(copy)}</p>
            </article>
          ))}
        </section>

        <section className="mt-24 flex flex-col items-start justify-between gap-7 border-t border-[#191919]/10 pt-8 sm:flex-row sm:items-end md:mt-32">
          <div>
            <p className="space-label">{t('Next / Open experiments')}</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
              {t('Questions move into the lab.')}
            </h2>
          </div>
          <Link to={path('/lab')} className="group flex items-center gap-3 text-sm font-medium">
            {t('Enter AI Lab')}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </section>
      </div>
    </PageFrame>
  )
}
