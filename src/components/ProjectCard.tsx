import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projectEvidence } from '../data/evidence'
import { localize, type Project } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'

export function ProjectCard({ project }: { project: Project }) {
  const { language, t } = useLanguage()
  const evidence = projectEvidence[project.slug]

  return (
    <article className="group border-t border-[#191919]/12 py-9 sm:py-12">
      <Link
        to={`/works/${project.slug}`}
        className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch lg:gap-14"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <p className="space-label">
              {t('Case')} {project.index}
            </p>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#191919]/35">
              {t(project.category)} / {project.year}
            </p>
          </div>

          <div className="my-9 lg:my-auto">
            <p className="text-xs uppercase tracking-[0.17em] text-[#191919]/42">
              {localize(project.subtitle, language)}
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] text-[#191919] sm:text-5xl lg:text-6xl">
              {project.title}
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#191919]/58">
              {localize(project.intro, language)}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-[#191919]/12 px-3 py-1.5 text-[10px] uppercase tracking-[0.08em] text-[#191919]/52"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm font-medium text-[#191919]">
            {t('Open Case Study')}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>

        <div className="relative min-h-[270px] overflow-hidden bg-[#eeeded] sm:min-h-[390px]">
          <img
            src={project.image}
            alt={localize(project.imageAlt, language)}
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.018] ${
              project.imagePosition === 'top' ? 'object-top' : 'object-center'
            }`}
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
          <div className="absolute bottom-4 left-4 rounded-full border border-white/35 bg-white/84 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[#191919]/65 backdrop-blur-md">
            {evidence
              ? `${evidence.index.filter((item) => item.state === 'Verified').length} ${t('verified checks')} · ${evidence.artifacts.length} ${t('artifacts')}`
              : t('Project evidence')}
          </div>
        </div>
      </Link>
    </article>
  )
}
