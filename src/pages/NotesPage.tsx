import { motion } from 'framer-motion'
import { PageFrame, SectionIntro } from '../components/PageFrame'
import { notes } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'

export function NotesPage() {
  const { language, t } = useLanguage()

  return (
    <PageFrame>
      <div className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 md:px-14 md:pb-32">
        <SectionIntro
          eyebrow={t('Notes / Thinking Log 05')}
          title={
            <>
              {t('Ideas need')}
              <br />
              {t('a place to grow.')}
            </>
          }
          copy={t(
            'Technical notes, project reflections, and working ideas collected over time.',
          )}
        />

        <section className="mt-20 md:mt-28">
          {notes.map((note, index) => (
            <motion.article
              key={note.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.05 }}
              className="group grid gap-6 border-t border-[#191919]/10 py-8 sm:grid-cols-[0.35fr_1.2fr_0.7fr_auto] sm:items-start sm:gap-8 sm:py-10"
            >
              <p className="text-xs text-[#191919]/35">{note.date}</p>
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#191919]/38">
                  {t(note.category)}
                </p>
                <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight tracking-[-0.025em] transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl">
                  {t(note.title)}
                </h2>
              </div>
              <p className="text-sm leading-6 text-[#191919]/52">{t(note.excerpt)}</p>
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#191919]/32">
                {language === 'zh' ? note.readTime.replace('min', '分钟') : note.readTime}
              </span>
            </motion.article>
          ))}
          <div className="border-t border-[#191919]/10 pt-8 text-right">
            <p className="text-xs text-[#191919]/38">
              {t('More notes will grow here as the work continues.')}
            </p>
          </div>
        </section>
      </div>
    </PageFrame>
  )
}
