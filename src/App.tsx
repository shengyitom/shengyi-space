import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { LanguageProvider } from './i18n/LanguageContext'
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
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#191919]">
      <ScrollManager />
      <SiteHeader />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/works/:slug" element={<CaseStudyPage />} />
          <Route path="/now" element={<NowPage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      {isHome ? null : <SiteFooter />}
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <RoutedSpace />
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
