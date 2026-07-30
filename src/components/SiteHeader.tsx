import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { stripLanguagePrefix, useLanguage } from '../i18n/LanguageContext'
import { SpaceMark } from './SpaceMark'

const primaryNavigation = [
  ['Works', '/works'],
  ['About', '/about'],
  ['AI Lab', '/lab'],
  ['Notes', '/notes'],
]

const directory = [
  ['Home', '/', 'Entrance'],
  ['Works', '/works', 'Selected projects'],
  ['About', '/about', 'Profile & practice'],
  ['Journey', '/journey', 'Growth archive'],
  ['Now', '/now', 'Current focus'],
  ['AI Lab', '/lab', 'Open experiments'],
  ['Notes', '/notes', 'Thinking log'],
  ['Resume', '/resume', 'Print profile'],
  ['Contact', '/contact', 'Open channel'],
]

export function SiteHeader() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { language, path, t, toggleLanguage } = useLanguage()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const updateProgress = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(distance > 0 ? window.scrollY / distance : 0)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [location.pathname])

  const isHome = stripLanguagePrefix(location.pathname) === '/'

  return (
    <>
      <header className="site-header fixed left-0 right-0 top-0 z-50 px-5 py-4 sm:px-10 sm:py-5 md:px-14">
        <nav
          className={`relative mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center rounded-xl transition-colors duration-300 ${
            isHome
              ? ''
              : 'bg-white/88 shadow-[0_1px_0_rgba(25,25,25,0.08)] backdrop-blur-xl'
          }`}
          aria-label="Main navigation"
        >
          <Link
            to={path('/')}
            className="flex w-fit items-center gap-2.5 text-[#191919]"
            aria-label="shengyi’s space home"
          >
            <SpaceMark className="h-6 w-6" />
            <span className="whitespace-nowrap text-sm font-semibold tracking-tight sm:text-base">
              shengyi’s space
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {primaryNavigation.map(([label, path]) => (
              <NavLink
                key={path}
                to={`/${language}${path}`}
                className={({ isActive }) =>
                  `relative py-2 text-[13px] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:bg-[#191919] after:transition-[width] after:duration-300 ${
                    isActive
                      ? 'text-[#191919] after:w-full'
                      : 'text-[#191919]/48 after:w-0 hover:text-[#191919]'
                  }`
                }
              >
                {t(label)}
              </NavLink>
            ))}
          </div>

          <div className="col-start-3 flex items-center justify-self-end gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex h-10 items-center rounded-lg border border-[#191919]/12 bg-white/72 px-3 text-[10px] font-medium tracking-[0.08em] backdrop-blur-md transition-colors duration-200 hover:bg-white"
              aria-label={language === 'en' ? '切换至中文' : 'Switch to English'}
              title={language === 'en' ? '切换至中文' : 'Switch to English'}
            >
              <span className={language === 'zh' ? 'text-[#191919]' : 'text-[#191919]/28'}>
                中
              </span>
              <span className="mx-1.5 text-[#191919]/18">/</span>
              <span className={language === 'en' ? 'text-[#191919]' : 'text-[#191919]/28'}>
                EN
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className={`inline-flex h-10 min-w-[74px] items-center justify-center rounded-lg px-4 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 ${
                menuOpen
                  ? 'bg-[#191919] text-white'
                  : 'border border-[#191919]/12 bg-white/72 text-[#191919] backdrop-blur-md hover:bg-white'
              }`}
              aria-expanded={menuOpen}
              aria-controls="space-index"
            >
              {menuOpen ? t('Close') : t('Index')}
            </button>
          </div>

          <span
            className="absolute -bottom-1 left-0 h-px bg-[#191919]/65 transition-[width] duration-100"
            style={{ width: `${scrollProgress * 100}%` }}
            aria-hidden="true"
          />
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="space-index"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-[#f3f2ef] px-6 pb-10 pt-28 sm:px-10 md:px-14 md:pt-32"
          >
            <div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl gap-14 lg:grid-cols-[1.45fr_0.55fr]">
              <div>
                <p className="space-label">{t('Space index')}</p>
                <div className="mt-7 border-t border-[#191919]/12">
                  {directory.map(([label, path, note], index) => (
                    <motion.div
                      key={path}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.035 * index, duration: 0.38 }}
                    >
                      <NavLink
                        to={`/${language}${path === '/' ? '' : path}`}
                        className={({ isActive }) =>
                          `group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-[#191919]/12 py-3.5 transition-colors duration-200 sm:grid-cols-[3.5rem_1fr_11rem] sm:py-4 ${
                            isActive ? 'text-[#191919]' : 'text-[#191919]/48 hover:text-[#191919]'
                          }`
                        }
                      >
                        <span className="text-[10px] text-[#191919]/28">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="font-serif text-3xl tracking-[-0.03em] sm:text-4xl">
                          {t(label)}
                        </span>
                        <span className="hidden text-[10px] uppercase tracking-[0.12em] text-[#191919]/32 sm:block">
                          {t(note)}
                        </span>
                      </NavLink>
                    </motion.div>
                  ))}
                </div>
              </div>

              <aside className="flex flex-col justify-end border-t border-[#191919]/12 pt-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                <p className="space-label">{t('Current desk')}</p>
                <p className="mt-5 max-w-sm font-serif text-3xl leading-tight tracking-tight">
                  {t('Multimodal systems, evaluation, and useful AI products.')}
                </p>
                <div className="mt-10 grid gap-3 text-sm">
                  <Link to={path('/now')} className="index-link">
                    <span>{t('Current focus')}</span>
                    <span>↗</span>
                  </Link>
                  <Link to={path('/resume')} className="index-link">
                    <span>{t('Resume')}</span>
                    <span>↗</span>
                  </Link>
                  <Link to={path('/contact')} className="index-link">
                    <span>{t('Contact')}</span>
                    <span>↗</span>
                  </Link>
                </div>
                <p className="mt-12 text-xs leading-6 text-[#191919]/42">
                  {t('Last updated · July 2026')}
                </p>
              </aside>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
