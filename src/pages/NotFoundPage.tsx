import { Link } from 'react-router-dom'
import { PageFrame } from '../components/PageFrame'
import { useLanguage } from '../i18n/LanguageContext'

export function NotFoundPage() {
  const { t } = useLanguage()

  return (
    <PageFrame className="flex items-center justify-center">
      <div className="px-6 text-center">
        <p className="space-label">{t('404 / Unmapped Space')}</p>
        <h1 className="mt-5 font-serif text-6xl tracking-tight sm:text-8xl">{t('Lost signal.')}</h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-[#191919]/52">
          {t('This route sits outside the current map. Return to the entrance and continue exploring.')}
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-[#191919] px-6 py-3.5 text-sm font-medium text-white"
        >
          {t('Return Home')}
        </Link>
      </div>
    </PageFrame>
  )
}
