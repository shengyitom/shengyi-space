import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageFrame } from '../components/PageFrame'
import {
  capabilityGroups,
  journey,
  localize,
  profile,
  projects,
} from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'

export function ResumePage() {
  const { language, t } = useLanguage()

  return (
    <PageFrame className="resume-page">
      <article className="mx-auto max-w-5xl px-6 pb-20 sm:px-10 md:px-14">
        <div className="no-print mb-10 flex items-center justify-between border-b border-[#191919]/10 pb-5">
          <Link to="/about" className="text-xs text-[#191919]/45 hover:text-[#191919]">
            ← {t('Back to About')}
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-[#191919] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#191919]/88"
          >
            {t('Print / Save PDF')}
          </button>
        </div>

        <header className="grid gap-10 border-b-2 border-[#191919] pb-10 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="space-label">{t('AI Engineer / Project-based practice')}</p>
            <h1 className="mt-4 font-serif text-6xl leading-none tracking-[-0.055em] sm:text-7xl">
              shengyi
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#191919]/65">
              {localize(profile.statement, language)}
            </p>
          </div>
          <div className="text-xs leading-6 text-[#191919]/55 sm:text-right">
            <p>China / UTC+08:00</p>
            <a href={`mailto:${profile.email}`} className="block text-[#191919]">
              {profile.email}
            </a>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="block">
              {profile.githubLabel}
            </a>
          </div>
        </header>

        <section className="grid gap-8 border-b border-[#191919]/12 py-9 sm:grid-cols-[0.35fr_1.65fr]">
          <h2 className="space-label">{t('Profile')}</h2>
          <div className="grid gap-5 text-sm leading-7 text-[#191919]/62 sm:grid-cols-2">
            <p>
              {t(
                'AI Engineer with a software-engineering foundation and broad project practice across vision, generative models, graph learning, multimodal AI, forecasting, and operational platforms.',
              )}
            </p>
            <p>
              {t(
                'Strongest at the model-to-system layer: data pipelines, training and evaluation, inference services, product interfaces, visualization, and feedback-oriented workflows.',
              )}
            </p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-[#191919]/12 py-9 sm:grid-cols-[0.35fr_1.65fr]">
          <h2 className="space-label">{t('Capabilities')}</h2>
          <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {capabilityGroups.map((group) => (
              <div key={group.index}>
                <h3 className="font-serif text-2xl tracking-tight">
                  {localize(group.title, language)}
                </h3>
                <p className="mt-2 text-xs leading-5 text-[#191919]/50">
                  {group.items.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-b border-[#191919]/12 py-9 sm:grid-cols-[0.35fr_1.65fr]">
          <div>
            <h2 className="space-label">{t('Selected Engineering Practice')}</h2>
            <p className="mt-3 text-[10px] leading-4 text-[#191919]/35">
              2025—2026
              <br />
              {t('Independent / project-based')}
            </p>
          </div>
          <div>
            {projects.map((project) => (
              <article
                key={project.slug}
                className="grid gap-3 border-t border-[#191919]/10 py-5 first:border-t-0 first:pt-0 sm:grid-cols-[1fr_auto]"
              >
                <div>
                  <h3 className="font-serif text-2xl tracking-tight">{project.title}</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-[#191919]/40">
                    {localize(project.subtitle, language)}
                  </p>
                  <p className="mt-3 max-w-2xl text-xs leading-5 text-[#191919]/56">
                    {localize(project.result, language)}
                  </p>
                </div>
                <p className="text-[10px] leading-5 text-[#191919]/38 sm:max-w-44 sm:text-right">
                  {project.technologies.slice(0, 4).join(' · ')}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-b border-[#191919]/12 py-9 sm:grid-cols-[0.35fr_1.65fr]">
          <h2 className="space-label">{t('Growth')}</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {journey.slice(0, 3).map((chapter) => (
              <div key={chapter.year}>
                <p className="font-serif text-3xl tracking-tight">{chapter.year}</p>
                <p className="mt-2 text-xs font-medium">{localize(chapter.phase, language)}</p>
                <p className="mt-2 text-[11px] leading-5 text-[#191919]/48">
                  {localize(chapter.evidence, language)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-9 sm:grid-cols-[0.35fr_1.65fr]">
          <h2 className="space-label">{t('Evidence')}</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              ['68', 'unique project spaces'],
              ['05', 'flagship case studies'],
              ['04', 'system capability layers'],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-serif text-4xl tracking-tight">{value}</p>
                <p className="mt-2 text-[10px] uppercase leading-4 tracking-[0.1em] text-[#191919]/38">
                  {t(label)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Link
          to="/works"
          className="no-print group mt-6 flex items-center justify-between border-t border-[#191919]/10 pt-6 text-sm font-medium"
        >
          {t('Explore full case studies')}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </article>
    </PageFrame>
  )
}
