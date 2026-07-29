import { Link } from 'react-router-dom'
import { profile } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="site-footer border-t border-[#191919]/10 bg-white px-6 py-8 sm:px-10 md:px-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-xs text-[#191919]/45 sm:flex-row sm:items-center sm:justify-between">
        <p>{t('© 2026 shengyi’s space · AI engineering, projects, and notes.')}</p>
        <div className="flex items-center gap-6">
          <a href={`mailto:${profile.email}`} className="transition-colors duration-200 hover:text-[#191919]">
            {t('Email')}
          </a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-200 hover:text-[#191919]"
          >
            {t('GitHub')}
          </a>
          <Link to="/contact" className="transition-colors duration-200 hover:text-[#191919]">
            {t('Contact')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
