import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { PageFrame } from '../components/PageFrame'
import { profile } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'

export function ContactPage() {
  const { path, t } = useLanguage()

  return (
    <PageFrame className="flex flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-16 sm:px-10 md:px-14">
        <div className="grid flex-1 gap-14 md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-20">
          <div>
            <p className="space-label">{t('Contact / 06')}</p>
            <h1 className="mt-6 max-w-4xl font-serif text-6xl leading-[0.92] tracking-[-0.055em] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              {t('Say hello.')}
            </h1>
            <p className="mt-8 max-w-xl text-sm leading-7 text-[#191919]/58 sm:text-base">
              {t(
                'Email is the best way to reach me. I am interested in AI engineering, intelligent products, and research prototypes.',
              )}
            </p>
          </div>

          <div className="border-t border-[#191919]/12">
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center justify-between border-b border-[#191919]/12 py-7"
            >
              <div>
                <p className="space-label">{t('Email')}</p>
                <p className="mt-2 text-base font-medium">{profile.email}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-[#191919]/35 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border-b border-[#191919]/12 py-7"
            >
              <div>
                <p className="space-label">{t('GitHub')}</p>
                <p className="mt-2 text-base font-medium">{profile.githubLabel}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-[#191919]/35 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <Link
              to={path('/resume')}
              className="group flex w-full items-center justify-between border-b border-[#191919]/12 py-7 text-left"
            >
              <div>
                <p className="space-label">{t('Resume')}</p>
                <p className="mt-2 text-base font-medium">{t('Print-friendly profile')}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-[#191919]/35 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[#191919]/10 pt-6 text-xs text-[#191919]/35 sm:flex-row sm:items-center sm:justify-between">
          <p>{t('Based in China · Working across AI and software.')}</p>
          <p>{t('Local time / UTC+08:00')}</p>
        </div>
      </div>
    </PageFrame>
  )
}
