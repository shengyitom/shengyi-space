import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { BoomerangVideoBg } from '../components/BoomerangVideoBg'
import { OptimizedImage } from '../components/OptimizedImage'
import { SpaceOrb } from '../components/SpaceOrb'
import { localize, profile, projects } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'

const entrances = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export function HomePage() {
  const { language, path, t } = useLanguage()
  const [leadProject, ...sideProjects] = projects.slice(0, 3)

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden bg-white"
    >
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-white">
        <BoomerangVideoBg />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-white/25 via-white/8 to-white/28" />
        <SpaceOrb className="pointer-events-auto absolute -right-[12vw] top-[6vh] z-[2] hidden h-[58vw] max-h-[760px] min-h-[520px] w-[58vw] max-w-[760px] min-w-[520px] opacity-45 mix-blend-multiply md:block" />

        <div className="relative z-10 flex min-h-screen flex-col px-6 pb-0 pt-28 sm:px-10 sm:pt-32 md:px-14 md:pt-36">
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
            <div className="max-w-4xl">
              <motion.div
                variants={entrances}
                initial="hidden"
                animate="visible"
                custom={0.06}
                className="flex items-center gap-3"
              >
                <span className="h-px w-8 bg-[#191919]/35" />
                <p className="space-label">{t(`${profile.role} · Personal Digital Space`)}</p>
              </motion.div>

              <motion.h1
                variants={entrances}
                initial="hidden"
                animate="visible"
                custom={0.12}
                className="mt-7 font-serif text-[5rem] font-normal leading-[0.78] tracking-[-0.065em] text-[#191919] sm:text-[7rem] md:text-[9rem] lg:text-[11rem]"
              >
                shengyi
              </motion.h1>

              <motion.p
                variants={entrances}
                initial="hidden"
                animate="visible"
                custom={0.2}
                className="mt-8 max-w-2xl text-base font-light leading-7 text-[#191919]/68 sm:text-lg"
              >
                {t('AI Engineer working across models, software systems, and product interfaces.')}
                <span className="mt-1 block text-[#191919]/42">
                  {t('Currently focused on multimodal perception, generative models, and AI engineering.')}
                </span>
              </motion.p>

              <motion.div
                variants={entrances}
                initial="hidden"
                animate="visible"
                custom={0.27}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link
                  to={path('/works')}
                  className="group inline-flex items-center gap-4 rounded-lg bg-[#191919] px-6 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#191919]/88"
                >
                  {t('Explore Works')}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to={path('/about')}
                  className="rounded-lg border border-[#191919]/16 bg-white/52 px-6 py-3.5 text-sm font-medium text-[#191919] backdrop-blur-sm transition-colors duration-200 hover:bg-white"
                >
                  {t('About Me')}
                </Link>
                <Link
                  to={path('/resume')}
                  className="px-3 py-3.5 text-sm text-[#191919]/52 transition-colors duration-200 hover:text-[#191919]"
                >
                  {t('Resume ↗')}
                </Link>
              </motion.div>
            </div>

            <motion.div
              variants={entrances}
              initial="hidden"
              animate="visible"
              custom={0.34}
              className="mt-16 w-full self-end pt-6 lg:mt-auto"
            >
              <div className="ml-auto max-w-5xl border border-b-0 border-[#191919]/12 bg-white/90 px-5 pt-6 shadow-[0_-10px_50px_rgba(25,25,25,0.035)] backdrop-blur-md sm:px-8 sm:pt-8 md:px-10">
                <div className="grid gap-6 md:grid-cols-[0.72fr_1.28fr] md:items-end md:gap-12">
                  <div>
                    <p className="space-label">{t('On the desk')}</p>
                    <h2 className="mt-3 font-serif text-2xl leading-tight tracking-tight sm:text-3xl">
                      {leadProject.title}
                    </h2>
                  </div>
                  <p className="max-w-2xl text-sm leading-6 text-[#191919]/58">
                    {localize(leadProject.intro, language)}
                  </p>
                </div>

                <div className="mt-6 h-px bg-[#191919]/10 sm:mt-8" />

                <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
                  {projects.slice(0, 3).map((project) => (
                    <Link
                      key={project.slug}
                      to={path(`/works/${project.slug}`)}
                      className="group flex items-center justify-between bg-[#F4F3F3] px-4 py-3.5 text-sm transition-colors duration-200 hover:bg-[#e8e7e4] sm:px-5 sm:py-4"
                    >
                      <span>
                        <span className="text-[#191919]/32">{project.index}</span>
                        <span className="mx-2 text-[#191919]/22">/</span>
                        <span className="font-medium">{project.title}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-[#191919]/32 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 md:px-14 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-[#191919]/10 pb-7 md:grid-cols-[1fr_0.72fr] md:items-end">
            <div>
              <p className="space-label">{t('Featured work')}</p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.035em] sm:text-5xl md:text-6xl">
                {t('Selected work, up close.')}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#191919]/52">
              {t(
                'Five selected systems across vision, generation, graphs, multimodal AI, and operational software.',
              )}
            </p>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.34fr_0.66fr]">
            <Link
              to={path(`/works/${leadProject.slug}`)}
              className="home-project group relative min-h-[540px] overflow-hidden bg-[#eeece9]"
            >
              <OptimizedImage
                src={leadProject.image}
                alt={localize(leadProject.imageAlt, language)}
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-gradient-to-t from-black/72 via-black/35 to-transparent p-7 pt-32 text-white sm:p-9">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/60">
                    {localize(leadProject.subtitle, language)}
                  </p>
                  <h3 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
                    {leadProject.title}
                  </h3>
                </div>
                <ArrowRight className="mb-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Link>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {sideProjects.map((project) => (
                <Link
                  key={project.slug}
                  to={path(`/works/${project.slug}`)}
                  className="group grid min-h-[260px] overflow-hidden border border-[#191919]/10 bg-[#f4f3f1] sm:grid-rows-[1fr_auto] lg:grid-cols-[0.9fr_1.1fr]"
                >
                  <div className="relative min-h-[180px] overflow-hidden bg-white">
                    <OptimizedImage
                      src={project.image}
                      alt={localize(project.imageAlt, language)}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-6">
                    <p className="space-label">
                      {project.category} / {project.year}
                    </p>
                    <div className="mt-10">
                      <h3 className="font-serif text-3xl tracking-tight">{project.title}</h3>
                      <div className="mt-4 flex items-center justify-between text-xs text-[#191919]/48">
                        <span>{localize(project.subtitle, language)}</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link
            to={path('/works')}
            className="group mt-8 inline-flex items-center gap-4 border-b border-[#191919] pb-1 text-sm font-medium"
          >
            {t('View all projects')}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="border-t border-[#191919]/10 bg-[#f3f2ef] px-6 py-16 sm:px-10 md:px-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.44fr_1.1fr_auto] md:items-end">
          <p className="space-label">{t('Current signal / July 2026')}</p>
          <p className="max-w-3xl font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            {t(
              'Deepening evaluation, agent workflows, and the quality of model-to-product delivery.',
            )}
          </p>
          <Link to={path('/now')} className="group flex items-center gap-3 text-sm font-medium">
            {t('Read current focus')}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </motion.main>
  )
}
