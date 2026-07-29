import { motion } from 'framer-motion'
import { PageFrame, SectionIntro } from '../components/PageFrame'
import { SpaceOrb } from '../components/SpaceOrb'
import { labExperiments } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'

export function LabPage() {
  const { t } = useLanguage()

  return (
    <PageFrame className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 md:px-14 md:pb-32">
        <SectionIntro
          eyebrow={t('AI Lab / Open Experiments 04')}
          title={
            <>
              {t('Open experiments,')}
              <br />
              {t('work in progress.')}
            </>
          }
          copy={t(
            'Prototypes and technical questions in active development, with their current state and next step.',
          )}
        />

        <section className="relative mt-20 min-h-[520px] overflow-hidden border border-[#191919]/10 bg-[#f6f5f5] md:mt-28 md:min-h-[620px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95),rgba(244,243,243,0.72)_50%,rgba(236,235,235,0.9))]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(25,25,25,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(25,25,25,0.045)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <SpaceOrb className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-75 md:h-[680px] md:w-[680px]" />

          <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-6 sm:p-9 md:min-h-[620px] md:p-12">
            <div className="flex items-center justify-between">
              <p className="space-label">{t('Lab state / Active')}</p>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#191919]/38">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#191919]/50" />
                {t('online')}
              </div>
            </div>
            <div className="mx-auto max-w-xl text-center">
              <p className="font-serif text-4xl leading-tight tracking-[-0.035em] sm:text-5xl">
                {t('Current lab bench.')}
              </p>
              <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-[#191919]/52">
                {t(
                  'Small experiments for testing one idea, recording the result, and deciding what to build next.',
                )}
              </p>
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-[0.15em] text-[#191919]/32">
              <span>{t('RAG · Agents · Vision')}</span>
              <span>{t('Iteration 0.6')}</span>
            </div>
          </div>
        </section>

        <section className="mt-20 md:mt-28">
          <div className="flex items-end justify-between border-b border-[#191919]/10 pb-5">
            <div>
              <p className="space-label">{t('Experiment queue')}</p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                {t('Currently exploring.')}
              </h2>
            </div>
            <span className="hidden text-xs text-[#191919]/35 sm:block">
              {t('Always in motion')}
            </span>
          </div>

          <div>
            {labExperiments.map((experiment, index) => (
              <motion.article
                key={experiment.code}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.04 }}
                className="grid gap-5 border-b border-[#191919]/10 py-7 sm:grid-cols-[0.25fr_0.9fr_1.3fr_auto] sm:items-center sm:gap-8"
              >
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#191919]/35">
                  {experiment.code}
                </p>
                <div>
                  <h3 className="font-serif text-2xl tracking-tight">{t(experiment.title)}</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.13em] text-[#191919]/38">
                    {t(experiment.field)}
                  </p>
                </div>
                <p className="max-w-xl text-sm leading-6 text-[#191919]/52">
                  {t(experiment.description)}
                </p>
                <span className="w-fit rounded-full border border-[#191919]/12 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-[#191919]/48">
                  {t(experiment.status)}
                </span>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </PageFrame>
  )
}
