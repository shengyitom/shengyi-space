export type Language = 'en' | 'zh'

export const supportedLanguages: Language[] = ['en', 'zh']

export function getLanguageFromPathname(pathname: string): Language | null {
  const firstSegment = pathname.split('/').filter(Boolean)[0]
  return firstSegment === 'en' || firstSegment === 'zh' ? firstSegment : null
}

export function stripLanguagePrefix(pathname: string) {
  const stripped = pathname.replace(/^\/(en|zh)(?=\/|$)/, '')
  return stripped || '/'
}

export function localizedPath(pathname: string, language: Language) {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  const withoutLanguage = stripLanguagePrefix(normalized)
  return withoutLanguage === '/' ? `/${language}` : `/${language}${withoutLanguage}`
}
