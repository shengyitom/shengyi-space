import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import {
  SHARE_IMAGE_URL,
  SITE_NAME,
  SITE_URL,
  getSeoMeta,
  staticSeoRoutes,
} from '../src/seo/config'

const distDirectory = join(process.cwd(), 'dist')
const indexPath = join(distDirectory, 'index.html')
const seoBlockPattern = /<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function renderSeoBlock(pathname: string, language: 'en' | 'zh') {
  const meta = getSeoMeta(pathname, language)
  const escapedTitle = escapeHtml(meta.title)
  const escapedDescription = escapeHtml(meta.description)
  const escapedImageAlt = escapeHtml(meta.imageAlt)

  return `<!-- SEO:START -->
    <meta name="description" content="${escapedDescription}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${meta.canonical}" />
    <link rel="alternate" hreflang="en" href="${meta.alternates.en}" />
    <link rel="alternate" hreflang="zh-CN" href="${meta.alternates.zh}" />
    <link rel="alternate" hreflang="x-default" href="${meta.alternates.en}" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:title" content="${escapedTitle}" />
    <meta property="og:description" content="${escapedDescription}" />
    <meta property="og:type" content="${meta.type}" />
    <meta property="og:url" content="${meta.canonical}" />
    <meta property="og:image" content="${SHARE_IMAGE_URL}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapedImageAlt}" />
    <meta property="og:locale" content="${meta.locale}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapedTitle}" />
    <meta name="twitter:description" content="${escapedDescription}" />
    <meta name="twitter:image" content="${SHARE_IMAGE_URL}" />
    <meta name="twitter:image:alt" content="${escapedImageAlt}" />
    <title>${escapedTitle}</title>
    <!-- SEO:END -->`
}

function renderSitemap() {
  const uniqueRoutes = new Set(staticSeoRoutes.map(({ route }) => route))
  if (uniqueRoutes.size !== staticSeoRoutes.length) {
    throw new Error('Duplicate localized routes detected while generating sitemap.')
  }

  const entries = staticSeoRoutes.map(({ language, route }) => {
    const meta = getSeoMeta(route, language)

    return `  <url>
    <loc>${SITE_URL}${route}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${meta.alternates.en}" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${meta.alternates.zh}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${meta.alternates.en}" />
  </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
}

const baseHtml = await readFile(indexPath, 'utf8')

if (!seoBlockPattern.test(baseHtml)) {
  throw new Error('The SEO marker block was not found in dist/index.html.')
}

for (const { language, route } of staticSeoRoutes) {
  const outputPath = join(distDirectory, `${route.slice(1)}.html`)
  const localizedHtml = baseHtml
    .replace('<html lang="en">', `<html lang="${language === 'zh' ? 'zh-CN' : 'en'}">`)
    .replace(seoBlockPattern, renderSeoBlock(route, language))

  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, localizedHtml, 'utf8')
}

await writeFile(
  indexPath,
  baseHtml.replace(seoBlockPattern, renderSeoBlock('/en', 'en')),
  'utf8',
)
await writeFile(join(distDirectory, 'sitemap.xml'), renderSitemap(), 'utf8')
await writeFile(
  join(distDirectory, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  'utf8',
)

console.log(`Generated ${staticSeoRoutes.length} localized SEO pages and sitemap.xml.`)
