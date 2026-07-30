import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { Seo } from './components/Seo'
import {
  getLanguageFromPathname,
  LanguageProvider,
  localizedPath,
  supportedLanguages,
  useLanguage,
} from './i18n/LanguageContext'
import { AboutPage } from './pages/AboutPage'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { JourneyPage } from './pages/JourneyPage'
import { LabPage } from './pages/LabPage'
import { NotesPage } from './pages/NotesPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { NowPage } from './pages/NowPage'
import { ResumePage } from './pages/ResumePage'
import { WorksPage } from './pages/WorksPage'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

function RoutedSpace() {
  const location = useLocation()
  const { language } = useLanguage()
  const isHome = location.pathname === `/${language}`

  const localizedRoutes = supportedLanguages.flatMap((routeLanguage) => {
    const prefix = `/${routeLanguage}`

    return [
      <Route key={prefix} path={prefix} element={<HomePage />} />,
      <Route key={`${prefix}/about`} path={`${prefix}/about`} element={<AboutPage />} />,
      <Route key={`${prefix}/journey`} path={`${prefix}/journey`} element={<JourneyPage />} />,
      <Route key={`${prefix}/works`} path={`${prefix}/works`} element={<WorksPage />} />,
      <Route
        key={`${prefix}/works/:slug`}
        path={`${prefix}/works/:slug`}
        element={<CaseStudyPage />}
      />,
      <Route key={`${prefix}/now`} path={`${prefix}/now`} element={<NowPage />} />,
      <Route key={`${prefix}/lab`} path={`${prefix}/lab`} element={<LabPage />} />,
      <Route key={`${prefix}/notes`} path={`${prefix}/notes`} element={<NotesPage />} />,
      <Route key={`${prefix}/resume`} path={`${prefix}/resume`} element={<ResumePage />} />,
      <Route key={`${prefix}/contact`} path={`${prefix}/contact`} element={<ContactPage />} />,
    ]
  })

  const fallback = getLanguageFromPathname(location.pathname) ? (
    <NotFoundPage />
  ) : (
    <Navigate
      to={`${localizedPath(location.pathname, language)}${location.search}${location.hash}`}
      replace
    />
  )

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#191919]">
      <ScrollManager />
      <Seo />
      <SiteHeader />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to={`/${language}`} replace />} />
          {localizedRoutes}
          <Route path="*" element={fallback} />
        </Routes>
      </AnimatePresence>
      {isHome ? null : <SiteFooter />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <RoutedSpace />
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
