import { localize, projects } from '../data/site'
import {
  localizedPath,
  stripLanguagePrefix,
  supportedLanguages,
  type Language,
} from '../i18n/routing'

export const SITE_URL = 'https://shengyi.space'
export const SITE_NAME = 'shengyi’s space'
export const SHARE_IMAGE_URL = `${SITE_URL}/og-image.jpg`

type PageCopy = {
  title: Record<Language, string>
  description: Record<Language, string>
}

const pageCopy: Record<string, PageCopy> = {
  '/': {
    title: {
      en: 'shengyi’s space — AI Engineer',
      zh: 'shengyi’s space — AI 工程师个人数字空间',
    },
    description: {
      en: 'The personal digital space of shengyi, an AI Engineer building intelligent systems across models, software, and product interfaces.',
      zh: 'shengyi 的个人数字空间：记录 AI 工程、智能系统、项目实践与持续探索。',
    },
  },
  '/about': {
    title: { en: 'About — shengyi’s space', zh: '关于 shengyi — 个人数字空间' },
    description: {
      en: 'Meet shengyi and explore the capabilities, working principles, and software-engineering foundation behind the work.',
      zh: '了解 shengyi 的技术能力、工作方式，以及从软件工程走向 AI 工程的实践基础。',
    },
  },
  '/journey': {
    title: { en: 'Journey — shengyi’s space', zh: '成长轨迹 — shengyi’s space' },
    description: {
      en: 'A growth archive of study, experiments, implementation, and the move from software projects into AI engineering.',
      zh: '记录从软件工程基础、项目实践到 AI 工程探索的学习与成长轨迹。',
    },
  },
  '/works': {
    title: { en: 'Selected Works — shengyi’s space', zh: '精选作品 — shengyi’s space' },
    description: {
      en: 'Selected AI engineering case studies across computer vision, generative models, graph learning, multimodal AI, and operational systems.',
      zh: '精选 AI 工程案例，覆盖计算机视觉、生成模型、图学习、多模态 AI 与业务系统。',
    },
  },
  '/now': {
    title: { en: 'Now — shengyi’s space', zh: '此刻 — shengyi’s space' },
    description: {
      en: 'A current snapshot of what shengyi is learning, building, and improving in AI engineering.',
      zh: '记录 shengyi 此刻正在学习、构建与改进的 AI 工程方向。',
    },
  },
  '/lab': {
    title: { en: 'AI Lab — shengyi’s space', zh: 'AI 实验室 — shengyi’s space' },
    description: {
      en: 'Open experiments in RAG, AI agents, multimodal reasoning, computer vision, and generative interfaces.',
      zh: '关于 RAG、AI 智能体、多模态推理、计算机视觉与生成式界面的开放实验。',
    },
  },
  '/notes': {
    title: { en: 'Notes — shengyi’s space', zh: '技术笔记 — shengyi’s space' },
    description: {
      en: 'Technical notes, project reflections, and working ideas about building dependable AI systems.',
      zh: '关于 AI 系统构建、项目复盘与工程思考的长期技术笔记。',
    },
  },
  '/resume': {
    title: { en: 'Resume — shengyi, AI Engineer', zh: '简历 — shengyi，AI 工程师' },
    description: {
      en: 'The print-ready profile of shengyi, an AI Engineer with software-engineering foundations and project-based practice.',
      zh: 'shengyi 的可打印职业档案：软件工程基础、AI 工程能力与代表项目实践。',
    },
  },
  '/contact': {
    title: { en: 'Contact — shengyi’s space', zh: '联系 shengyi — 个人数字空间' },
    description: {
      en: 'Contact shengyi about AI engineering, intelligent products, research prototypes, and thoughtful system building.',
      zh: '联系 shengyi，交流 AI 工程、智能产品、研究原型与系统构建。',
    },
  },
}

export type SeoMeta = {
  title: string
  description: string
  canonical: string
  alternates: Record<Language, string>
  type: 'website' | 'article'
  locale: string
  imageAlt: string
  noindex: boolean
}

function cleanPathname(pathname: string) {
  const withoutQuery = pathname.split(/[?#]/)[0] || '/'
  const normalized = withoutQuery.length > 1 ? withoutQuery.replace(/\/+$/, '') : withoutQuery
  return stripLanguagePrefix(normalized)
}

export function getSeoMeta(pathname: string, language: Language): SeoMeta {
  const route = cleanPathname(pathname)
  const projectMatch = route.match(/^\/works\/([^/]+)$/)
  const project = projectMatch
    ? projects.find((candidate) => candidate.slug === projectMatch[1])
    : undefined
  const copy = pageCopy[route]
  const title = project
    ? `${project.title} — ${localize(project.subtitle, language)} | ${SITE_NAME}`
    : copy?.title[language] ?? (
        language === 'zh'
          ? `页面未找到 — ${SITE_NAME}`
          : `Page not found — ${SITE_NAME}`
      )
  const description = project
    ? localize(project.intro, language)
    : copy?.description[language] ?? (
        language === 'zh'
          ? '这个页面暂时不在 shengyi’s space 的当前地图中。'
          : 'This page is outside the current map of shengyi’s space.'
      )
  const canonicalPath = localizedPath(route, language)

  return {
    title,
    description,
    canonical: `${SITE_URL}${canonicalPath}`,
    alternates: {
      en: `${SITE_URL}${localizedPath(route, 'en')}`,
      zh: `${SITE_URL}${localizedPath(route, 'zh')}`,
    },
    type: project ? 'article' : 'website',
    locale: language === 'zh' ? 'zh_CN' : 'en_US',
    imageAlt: language === 'zh'
      ? 'shengyi’s space — AI 工程师个人数字空间'
      : 'shengyi’s space — the personal digital space of an AI Engineer',
    noindex: !project && !copy,
  }
}

const indexableRoutes = [
  ...Object.keys(pageCopy),
  ...projects.map((project) => `/works/${project.slug}`),
]

export const staticSeoRoutes = supportedLanguages.flatMap((language) =>
  indexableRoutes.map((route) => ({
    language,
    route: localizedPath(route, language),
  })),
)
