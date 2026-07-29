import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { EvidenceDossier } from '../components/EvidenceDossier'
import { PageFrame } from '../components/PageFrame'
import { ProjectStory } from '../components/ProjectStory'
import { projectEvidence } from '../data/evidence'
import { localize, projects } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'

const caseSections = [
  ['overview', 'Overview'],
  ['walkthrough', 'Project walkthrough'],
  ['architecture', 'Architecture'],
  ['evaluation', 'Evaluation'],
  ['records', 'Records'],
  ['next', 'Next iteration'],
]

const statusByProject: Record<string, string> = {
  drivemind: 'Research prototype',
  medsynth: 'Model study',
  'slope-sentinel': 'Application system',
  'graph-interest': 'Model study',
  vidharm: 'Research prototype',
}

export function CaseStudyPage() {
  const { language, t } = useLanguage()
  const { slug } = useParams()
  const projectIndex = projects.findIndex((item) => item.slug === slug)
  const project = projects[projectIndex]
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    if (!project) return
    const nodes = caseSections
      .map(([id]) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.1, 0.5] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [project])

  if (!project) return <Navigate to="/works" replace />

  const nextProject = projects[(projectIndex + 1) % projects.length]
  const evidence = projectEvidence[project.slug]

  return (
    <PageFrame>
      <article className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 md:px-14 md:pb-32">
        <div className="flex items-center justify-between">
          <Link
            to="/works"
            className="text-xs uppercase tracking-[0.15em] text-[#191919]/42 transition-colors duration-200 hover:text-[#191919]"
          >
            ← {t('All Works')}
          </Link>
          <p className="space-label">
            {t('Case')} {project.index} / {project.year}
          </p>
        </div>

        <header className="mt-12 grid gap-8 md:grid-cols-[1fr_0.72fr] md:items-end md:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#191919]/38">
              {localize(project.subtitle, language)}
            </p>
            <h1 className="mt-5 font-serif text-6xl leading-[0.92] tracking-[-0.055em] sm:text-7xl md:text-8xl lg:text-[7rem]">
              {project.title}
            </h1>
          </div>
          <div className="md:pb-2">
            <p className="max-w-xl text-sm leading-7 text-[#191919]/60 md:text-base">
              {localize(project.intro, language)}
            </p>
          </div>
        </header>

        <section className="mt-12 grid border-y border-[#191919]/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [t('Status'), t(statusByProject[project.slug])],
            [t('Direction'), t(project.category)],
            [t('Role'), localize(project.role, language)],
            [t('Stack'), project.technologies.slice(0, 3).join(' · ')],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`py-5 sm:px-6 ${
                index > 0 ? 'border-t border-[#191919]/10 sm:border-l sm:border-t-0' : ''
              }`}
            >
              <p className="text-[8px] uppercase tracking-[0.14em] text-[#191919]/30">{label}</p>
              <p className="mt-3 text-xs font-medium leading-5 text-[#191919]/66">{value}</p>
            </div>
          ))}
        </section>

        <figure className="relative mt-10 aspect-[16/9] overflow-hidden bg-[#efeeee] md:mt-14">
          <img
            src={project.image}
            alt={localize(project.imageAlt, language)}
            className={`h-full w-full object-cover ${
              project.imagePosition === 'top' ? 'object-top' : 'object-center'
            }`}
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
          <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/86 px-3 py-1.5 text-[8px] uppercase tracking-[0.13em] text-[#191919]/52 backdrop-blur">
            {t('Actual project interface / evidence')}
          </figcaption>
        </figure>

        <nav
          className="sticky top-[72px] z-30 -mx-2 mt-8 overflow-x-auto border-y border-[#191919]/10 bg-white/92 px-2 backdrop-blur-xl"
          aria-label={t('Jump to section')}
        >
          <div className="flex min-w-max items-center gap-6">
            {caseSections.map(([id, label], index) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative py-4 text-[10px] font-medium uppercase tracking-[0.11em] transition-colors duration-200 after:absolute after:bottom-[-1px] after:left-0 after:h-px after:bg-[#191919] after:transition-[width] after:duration-300 ${
                  activeSection === id
                    ? 'text-[#191919] after:w-full'
                    : 'text-[#191919]/32 after:w-0 hover:text-[#191919]'
                }`}
              >
                <span className="mr-2 text-[#191919]/22">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {t(label)}
              </a>
            ))}
          </div>
        </nav>

        <section
          id="overview"
          className="scroll-mt-28 mt-20 grid gap-10 md:mt-28 md:grid-cols-[0.38fr_1.62fr] md:gap-16"
        >
          <div>
            <p className="space-label">{t('Overview')}</p>
            <p className="mt-4 text-[10px] uppercase tracking-[0.13em] text-[#191919]/28">
              {project.year} / {t(project.category)}
            </p>
          </div>
          <div>
            <p className="max-w-4xl font-serif text-3xl leading-[1.28] tracking-[-0.028em] sm:text-4xl">
              {localize(project.overview, language)}
            </p>

            <div className="mt-14 grid gap-10 border-t border-[#191919]/10 pt-8 sm:grid-cols-2">
              <article>
                <p className="space-label">{t('The problem.')}</p>
                <p className="mt-5 text-sm leading-7 text-[#191919]/56">
                  {localize(project.challenge, language)}
                </p>
              </article>
              <article>
                <p className="space-label">{t('The engineering move.')}</p>
                <p className="mt-5 text-sm leading-7 text-[#191919]/56">
                  {localize(project.solution, language)}
                </p>
              </article>
            </div>
          </div>
        </section>

        <ProjectStory project={project} />

        <section id="architecture" className="scroll-mt-28 mt-24 md:mt-32">
          <div className="flex items-end justify-between border-b border-[#191919]/10 pb-5">
            <div>
              <p className="space-label">{t('Architecture')}</p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                {t('How intelligence moves.')}
              </h2>
            </div>
            <span className="hidden text-xs text-[#191919]/32 sm:block">
              {t('Input → decision → application')}
            </span>
          </div>
          <div className="grid gap-2 pt-3 sm:grid-cols-2 lg:grid-cols-4">
            {project.architecture.map((layer, index) => (
              <div
                key={layer.en}
                className="group relative flex min-h-40 flex-col justify-between overflow-hidden bg-[#F3F2EF] p-5 transition-colors duration-200 hover:bg-[#e9e7e3] sm:min-h-48 sm:p-6"
              >
                <span className="text-[9px] text-[#191919]/28">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="max-w-[12rem] font-serif text-2xl leading-tight tracking-tight">
                  {localize(layer, language)}
                </p>
                {index < project.architecture.length - 1 ? (
                  <ArrowRight className="absolute bottom-6 right-6 h-4 w-4 text-[#191919]/22 transition-transform duration-200 group-hover:translate-x-1" />
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {evidence ? (
          <EvidenceDossier evidence={evidence} technologies={project.technologies} />
        ) : null}

        <section className="mt-24 grid gap-8 bg-[#191919] p-7 text-white sm:p-10 md:mt-32 md:grid-cols-[0.36fr_1fr] md:p-12">
          <p className="space-label !text-white/42">{t('Outcome / Reflection')}</p>
          <p className="max-w-4xl font-serif text-3xl leading-[1.28] tracking-tight text-white sm:text-4xl">
            {localize(project.result, language)}
          </p>
        </section>

        <Link
          to={`/works/${nextProject.slug}`}
          className="group mt-20 grid overflow-hidden border-y border-[#191919]/10 md:mt-28 md:grid-cols-[0.72fr_1.28fr]"
        >
          <div className="flex min-h-[240px] flex-col justify-between bg-[#F3F2EF] p-7 sm:p-9">
            <p className="space-label">{t('Next Case')}</p>
            <div className="flex items-end justify-between">
              <p className="font-serif text-4xl tracking-tight sm:text-5xl">{nextProject.title}</p>
              <ArrowRight className="mb-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
          <div className="relative min-h-[260px] overflow-hidden">
            <img
              src={nextProject.image}
              alt={localize(nextProject.imageAlt, language)}
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
          </div>
        </Link>
      </article>
    </PageFrame>
  )
}
