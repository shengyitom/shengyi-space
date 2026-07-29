import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageFrame, SectionIntro } from '../components/PageFrame'
import { projectEvidence } from '../data/evidence'
import {
  archiveProjects,
  localize,
  projects,
  type ArchiveProject,
  type Project,
  type ProjectCategory,
} from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'

type Filter = 'All' | ProjectCategory | 'Forecasting' | 'NLP'
type View = 'Selected' | 'Archive'

const filters: Filter[] = [
  'All',
  'Vision',
  'Generative',
  'Graph',
  'Multimodal',
  'Forecasting',
  'NLP',
  'Systems',
]

const statusByProject: Record<string, string> = {
  drivemind: 'Research prototype',
  medsynth: 'Model study',
  'slope-sentinel': 'Application system',
  'graph-interest': 'Model study',
  vidharm: 'Research prototype',
}

const tileLayout = [
  'md:col-span-7',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-7',
]

function ProjectTile({
  project,
  lead = false,
  className = '',
}: {
  project: Project
  lead?: boolean
  className?: string
}) {
  const { language, t } = useLanguage()
  const evidence = projectEvidence[project.slug]
  const secondImage = evidence?.artifacts.find((artifact) => artifact.src !== project.image)?.src

  if (lead) {
    return (
      <motion.article
        layout
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden border-y border-[#191919]/12"
      >
        <Link
          to={`/works/${project.slug}`}
          className="group grid min-h-[580px] md:grid-cols-[0.72fr_1.28fr]"
        >
          <div className="flex flex-col justify-between bg-[#f3f2ef] p-7 sm:p-10 md:p-12">
            <div className="flex items-center justify-between">
              <p className="space-label">
                {t('Case')} {project.index}
              </p>
              <p className="text-[10px] uppercase tracking-[0.13em] text-[#191919]/34">
                {project.year}
              </p>
            </div>

            <div className="my-16">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#191919]/38">
                {localize(project.subtitle, language)}
              </p>
              <h2 className="mt-5 font-serif text-5xl tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                {project.title}
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-[#191919]/58">
                {localize(project.intro, language)}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-[#191919]/12 px-3 py-1.5 text-[9px] uppercase tracking-[0.08em] text-[#191919]/48"
                  >
                    {technology}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex items-center gap-4 text-sm font-medium">
                {t('View project')}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          <div className="relative min-h-[380px] overflow-hidden bg-[#e9e7e3]">
            <img
              src={project.image}
              alt={localize(project.imageAlt, language)}
              className="absolute inset-0 h-full w-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.015] group-hover:opacity-0"
            />
            {secondImage ? (
              <img
                src={secondImage}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-[1.015] object-cover object-top opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
              />
            ) : null}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
            <span className="absolute left-5 top-5 rounded-full border border-white/40 bg-white/86 px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.12em] text-[#191919]/55 backdrop-blur">
              {t(statusByProject[project.slug])}
            </span>
            <div className="absolute bottom-5 right-5 bg-white/90 px-4 py-3 backdrop-blur">
              <p className="font-serif text-2xl tracking-tight">{project.metrics[0]?.value}</p>
              <p className="mt-1 text-[8px] uppercase tracking-[0.1em] text-[#191919]/38">
                {project.metrics[0] ? localize(project.metrics[0].label, language) : project.category}
              </p>
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group overflow-hidden border border-[#191919]/10 bg-[#f3f2ef] ${className}`}
    >
      <Link to={`/works/${project.slug}`} className="flex h-full min-h-[510px] flex-col">
        <div className="relative min-h-[310px] flex-1 overflow-hidden bg-white">
          <img
            src={project.image}
            alt={localize(project.imageAlt, language)}
            className="absolute inset-0 h-full w-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.018] group-hover:opacity-0"
          />
          {secondImage ? (
            <img
              src={secondImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-[1.018] object-cover object-top opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
            />
          ) : null}
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
          <span className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.12em] text-[#191919]/52 backdrop-blur">
            {t(statusByProject[project.slug])}
          </span>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-end sm:p-7">
          <div>
            <p className="text-[9px] uppercase tracking-[0.14em] text-[#191919]/35">
              {project.index} / {t(project.category)} / {project.year}
            </p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.035em]">{project.title}</h2>
            <p className="mt-3 line-clamp-2 max-w-xl text-xs leading-5 text-[#191919]/48">
              {localize(project.intro, language)}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium">
            {project.metrics[0]?.value}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

function ArchiveRow({
  project,
  index,
  open,
  onToggle,
}: {
  project: ArchiveProject
  index: number
  open: boolean
  onToggle: () => void
}) {
  const { language, t } = useLanguage()

  return (
    <motion.article layout className="border-t border-[#191919]/10">
      <button
        type="button"
        onClick={onToggle}
        className="group grid w-full gap-4 py-6 text-left sm:grid-cols-[3rem_1fr_0.7fr_auto] sm:items-center sm:gap-7"
        aria-expanded={open}
      >
        <span className="text-[10px] text-[#191919]/28">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-serif text-2xl tracking-tight transition-transform duration-200 group-hover:translate-x-1 sm:text-3xl">
          {localize(project.title, language)}
        </h3>
        <div className="hidden flex-wrap gap-x-3 gap-y-1 text-[9px] uppercase tracking-[0.08em] text-[#191919]/35 sm:flex">
          {project.technologies.slice(0, 4).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-[9px] uppercase tracking-[0.12em] text-[#191919]/35">
            {t(project.category)} / {project.year}
          </p>
          <ArrowRight
            className={`h-4 w-4 text-[#191919]/35 transition-transform duration-200 ${
              open ? 'rotate-90' : ''
            }`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pb-8 pl-0 sm:grid-cols-[3rem_1fr_0.7fr_auto] sm:gap-7">
              <span />
              <p className="max-w-2xl text-sm leading-6 text-[#191919]/55">
                {localize(project.description, language)}
              </p>
              <div className="flex flex-wrap content-start gap-2">
                {project.technologies.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#F3F2EF] px-3 py-1.5 text-[9px] uppercase tracking-[0.07em] text-[#191919]/48"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-[0.1em] text-[#191919]/32">
                {open ? t('Close details') : t('Open details')}
              </span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  )
}

export function WorksPage() {
  const { t } = useLanguage()
  const [view, setView] = useState<View>('Selected')
  const [filter, setFilter] = useState<Filter>('All')
  const [openArchive, setOpenArchive] = useState<number | null>(null)

  const filteredArchive = useMemo(
    () => archiveProjects.filter((project) => filter === 'All' || project.category === filter),
    [filter],
  )

  return (
    <PageFrame>
      <div className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 md:px-14 md:pb-32">
        <SectionIntro
          eyebrow={t('Works / Selected projects')}
          title={
            <>
              {t('Selected')}
              <br />
              {t('Projects.')}
            </>
          }
          copy={t(
            'Five selected projects cover perception, generation, graph recommendation, GIS operations, and multimodal review. The archive collects the rest.',
          )}
        />

        <div className="mt-14 flex items-end justify-between border-b border-[#191919]/10 md:mt-20">
          <div className="flex gap-7" role="tablist" aria-label={t('Project index')}>
            {(['Selected', 'Archive'] as View[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setView(item)}
                className={`relative pb-4 text-sm font-medium transition-colors duration-200 after:absolute after:bottom-[-1px] after:left-0 after:h-px after:bg-[#191919] after:transition-[width] after:duration-300 ${
                  view === item
                    ? 'text-[#191919] after:w-full'
                    : 'text-[#191919]/38 after:w-0 hover:text-[#191919]'
                }`}
                role="tab"
                aria-selected={view === item}
              >
                {t(item)}
                <span className="ml-2 text-[9px] text-[#191919]/28">
                  {item === 'Selected' ? '05' : String(archiveProjects.length).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
          <p className="hidden pb-4 text-[9px] uppercase tracking-[0.12em] text-[#191919]/28 sm:block">
            2024—2026
          </p>
        </div>

        <AnimatePresence mode="wait">
          {view === 'Selected' ? (
            <motion.section
              key="selected"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-14 md:mt-20"
            >
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="space-label">{t('Featured work')}</p>
                  <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                    {t('Five projects, in detail.')}
                  </h2>
                </div>
                <span className="hidden text-xs text-[#191919]/35 sm:block">05 {t('cases')}</span>
              </div>

              <ProjectTile project={projects[0]} lead />
              <div className="mt-4 grid gap-4 md:grid-cols-12">
                {projects.slice(1).map((project, index) => (
                  <ProjectTile
                    key={project.slug}
                    project={project}
                    className={tileLayout[index]}
                  />
                ))}
              </div>
            </motion.section>
          ) : (
            <motion.section
              key="archive"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-14 md:mt-20"
            >
              <div className="grid gap-8 border-b border-[#191919]/10 pb-7 md:grid-cols-[1fr_0.72fr] md:items-end">
                <div>
                  <p className="space-label">{t('Project archive')}</p>
                  <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
                    68 {t('project spaces')}
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-6 text-[#191919]/52">
                  {t('Browse by direction, then open a row for notes and tools.')}
                </p>
              </div>

              <div className="sticky top-[74px] z-20 -mx-2 mt-6 flex flex-wrap gap-2 bg-white/92 px-2 py-3 backdrop-blur-md">
                {filters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setFilter(item)
                      setOpenArchive(null)
                    }}
                    className={`rounded-full px-4 py-2 text-[10px] font-medium transition-colors duration-200 ${
                      filter === item
                        ? 'bg-[#191919] text-white'
                        : 'border border-[#191919]/12 bg-white text-[#191919]/48 hover:border-[#191919]/30 hover:text-[#191919]'
                    }`}
                  >
                    {t(item)}
                  </button>
                ))}
              </div>

              <div className="mt-4 border-b border-[#191919]/10">
                {filteredArchive.map((project, index) => (
                  <ArchiveRow
                    key={`${project.title.en}-${project.category}`}
                    project={project}
                    index={index}
                    open={openArchive === index}
                    onToggle={() => setOpenArchive((current) => (current === index ? null : index))}
                  />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </PageFrame>
  )
}
