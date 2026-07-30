import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { SHARE_IMAGE_URL, SITE_NAME, getSeoMeta } from '../seo/config'
import { useLanguage } from '../i18n/LanguageContext'

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function upsertLink(rel: string, href: string, hrefLang?: string) {
  const selector = hrefLang
    ? `link[rel="${rel}"][hreflang="${hrefLang}"]`
    : `link[rel="${rel}"]:not([hreflang])`
  let element = document.head.querySelector<HTMLLinkElement>(selector)
  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    if (hrefLang) element.hreflang = hrefLang
    document.head.appendChild(element)
  }
  element.href = href
}

export function Seo() {
  const location = useLocation()
  const { language } = useLanguage()

  useEffect(() => {
    const meta = getSeoMeta(location.pathname, language)

    document.title = meta.title
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'

    upsertMeta('name', 'description', meta.description)
    upsertMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow')
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:title', meta.title)
    upsertMeta('property', 'og:description', meta.description)
    upsertMeta('property', 'og:type', meta.type)
    upsertMeta('property', 'og:url', meta.canonical)
    upsertMeta('property', 'og:image', SHARE_IMAGE_URL)
    upsertMeta('property', 'og:image:alt', meta.imageAlt)
    upsertMeta('property', 'og:locale', meta.locale)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', meta.title)
    upsertMeta('name', 'twitter:description', meta.description)
    upsertMeta('name', 'twitter:image', SHARE_IMAGE_URL)
    upsertMeta('name', 'twitter:image:alt', meta.imageAlt)

    upsertLink('canonical', meta.canonical)
    upsertLink('alternate', meta.alternates.en, 'en')
    upsertLink('alternate', meta.alternates.zh, 'zh-CN')
    upsertLink('alternate', meta.alternates.en, 'x-default')
  }, [language, location.pathname])

  return null
}
