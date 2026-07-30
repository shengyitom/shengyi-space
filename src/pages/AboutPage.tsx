import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { PageFrame, SectionIntro } from '../components/PageFrame'
import { SpaceOrb } from '../components/SpaceOrb'
import { capabilityGroups, journey, localize, profile, projects } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'

const capabilityProjects = [
  ['DriveMind', 'MedSynth', 'VidHarm'],
  ['DriveMind', 'Slope Sentinel', 'Graph Interest'],
  ['Slope Sentinel', 'DriveMind', 'MedSynth'],
  ['Graph Interest', 'VidHarm', 'Slope Sentinel'],
]

const workingSteps = [
  {
    number: '01',
    title: 'Frame the problem',
    copy: 'Clarify the user, data, constraints, and the decision the system needs to support.',
  },
  {
    number: '02',
    title: 'Build the full path',
    copy: 'Connect preprocessing, model work, services, interfaces, and experiment records.',
  },
  {
    number: '03',
    title: 'Read the result',
    copy: 'Use metrics, failure cases, and product behavior to decide the next iteration.',
  },
]

export function AboutPage() {
  const { language, path, t } = useLanguage()

  return (
    <PageFrame>
      <div className="relative mx-auto max-w-7xl px-6 pb-24 sm:px-10 md:px-14 md:pb-32">
        <SpaceOrb className="pointer-events-none absolute -right-20 -top-24 hidden h-[520px] w-[520px] opacity-20 md:block" />

        <SectionIntro
          eyebrow={t('About / Profile 01')}
          title={
            <>
              shengyi
              <br />
              AI Engineer
            </>
          }
          copy={t(
            'Software engineering is my foundation. My current work moves across models, data, services, and the interfaces where people use them.',
          )}
        />

        <section className="mt-20 grid gap-12 border-t border-[#191919]/10 pt-10 md:grid-cols-[0.48fr_1.52fr] md:gap-20 md:pt-14">
          <div>
            <p className="space-label">{t('Profile')}</p>
            <p className="mt-5 font-serif text-4xl leading-none tracking-tight">{profile.name}</p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-[#191919]/38">
              {profile.role} · China
            </p>
          </div>

          <div>
            <p className="max-w-4xl font-serif text-3xl leading-[1.2] tracking-[-0.032em] text-[#191919] sm:text-4xl md:text-5xl">
              {localize(profile.statement, language)}
            </p>
            <div className="mt-10 grid gap-7 text-sm leading-7 text-[#191919]/58 sm:grid-cols-2">
              <p>
                {t(
                  'My software-engineering background shapes how I approach AI: a model is one component inside a larger system of data, services, interfaces, constraints, and feedback.',
                )}
              </p>
              <p>
                {t(
                  'Projects take me into unfamiliar domains and train me to break a problem into data, models, services, and interfaces.',
                )}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-px bg-[#191919]/10 sm:grid-cols-4">
              {[
                ['05', 'case studies'],
                ['68', 'project spaces'],
                ['07', 'directions'],
                ['2024—26', 'practice'],
              ].map(([value, label]) => (
                <div key={label} className="bg-white py-5 pr-5">
                  <p className="font-serif text-3xl tracking-tight">{value}</p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-[#191919]/35">
                    {t(label)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24 md:mt-32">
          <div className="grid gap-8 border-b border-[#191919]/10 pb-6 md:grid-cols-[1fr_0.72fr] md:items-end">
            <div>
              <p className="space-label">{t('Capability map')}</p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.035em] sm:text-5xl">
                {t('Skills connected to work.')}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#191919]/52">
              {t('Each layer points to projects where the capability was used and tested.')}
            </p>
          </div>

          <div className="border-b border-[#191919]/10">
            {capabilityGroups.map((group, index) => (
              <motion.article
                key={group.index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.035 }}
                className="grid gap-7 border-t border-[#191919]/10 py-8 first:border-t-0 md:grid-cols-[3rem_0.65fr_1fr_0.8fr] md:gap-9"
              >
                <span className="text-[10px] text-[#191919]/28">{group.index}</span>
                <div>
                  <h3 className="font-serif text-3xl tracking-tight">
                    {localize(group.title, language)}
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-[#191919]/48">
                    {localize(group.description, language)}
                  </p>
                </div>
                <div className="flex flex-wrap content-start gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#F4F3F3] px-3 py-1.5 text-[9px] uppercase tracking-[0.07em] text-[#191919]/55"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.14em] text-[#191919]/30">
                    {t('Used in')}
                  </p>
                  <div className="mt-3 flex flex-col gap-2 text-xs text-[#191919]/58">
                    {capabilityProjects[index].map((title) => {
                      const project = projects.find((item) => item.title === title)
                      return project ? (
                        <Link
                          key={title}
                          to={path(`/works/${project.slug}`)}
                          className="w-fit border-b border-transparent pb-0.5 transition-colors duration-200 hover:border-[#191919]/35 hover:text-[#191919]"
                        >
                          {title}
                        </Link>
                      ) : null
                    })}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-24 md:mt-32">
          <p className="space-label">{t('Working principles')}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {workingSteps.map((step) => (
              <article
                key={step.number}
                className="flex min-h-[270px] flex-col justify-between bg-[#F3F2EF] p-7 sm:p-8"
              >
                <span className="text-[10px] text-[#191919]/28">{step.number}</span>
                <div>
                  <h3 className="font-serif text-3xl tracking-tight">{t(step.title)}</h3>
                  <p className="mt-4 max-w-xs text-sm leading-6 text-[#191919]/52">
                    {t(step.copy)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-24 md:mt-32">
          <div className="flex items-end justify-between border-b border-[#191919]/10 pb-6">
            <div>
              <p className="space-label">{t('Journey')}</p>
              <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
                2024—2026
              </h2>
            </div>
            <Link
              to={path('/journey')}
              className="group hidden items-center gap-3 text-sm font-medium sm:flex"
            >
              {t('Open Journey')}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3">
            {journey.slice(0, 3).map((chapter, index) => (
              <article
                key={chapter.year}
                className={`py-8 md:px-7 ${index > 0 ? 'border-t border-[#191919]/10 md:border-l md:border-t-0' : ''}`}
              >
                <p className="space-label">{chapter.year}</p>
                <h3 className="mt-5 font-serif text-2xl leading-tight tracking-tight">
                  {localize(chapter.title, language)}
                </h3>
                <p className="mt-4 text-xs leading-6 text-[#191919]/48">
                  {localize(chapter.description, language)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-24 grid gap-8 border border-[#191919]/12 bg-white p-7 sm:p-10 md:mt-32 md:grid-cols-[1fr_auto] md:items-end md:p-12">
          <div>
            <p className="space-label">{t('Professional snapshot')}</p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl">
              {t('A résumé built from evidence.')}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#191919]/55">
              {t(
                'A concise, print-ready profile that packages technical range, selected engineering practice, and current direction without fictional experience.',
              )}
            </p>
          </div>
          <Link
            to={path('/resume')}
            className="group flex w-fit items-center gap-4 rounded-lg bg-[#191919] px-6 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#191919]/88"
          >
            {t('Open Resume')}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </section>
      </div>
    </PageFrame>
  )
}
