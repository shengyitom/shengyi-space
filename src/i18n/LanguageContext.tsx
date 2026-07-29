import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Language = 'en' | 'zh'

const zh: Record<string, string> = {
  // Navigation and shared chrome
  Home: '首页',
  About: '关于',
  Works: '作品',
  Journey: '成长',
  Now: '此刻',
  'AI Lab': 'AI 实验室',
  Notes: '笔记',
  Contact: '联系',
  'Let’s Talk': '联系我',
  Index: '目录',
  Menu: '菜单',
  Close: '关闭',
  'Space index': '空间目录',
  Entrance: '入口',
  'Selected projects': '精选项目',
  'Profile & practice': '个人与实践',
  'Growth archive': '成长记录',
  'Current focus': '当前方向',
  'Open experiments': '开放实验',
  'Thinking log': '思考记录',
  'Print profile': '打印简历',
  'Open channel': '联系方式',
  'Current desk': '近期工作',
  'Multimodal systems, evaluation, and useful AI products.':
    '多模态系统、模型评估与可用的 AI 产品。',
  'Last updated · July 2026': '最近更新 · 2026 年 7 月',
  'Navigate the space': '探索这个空间',
  'A personal archive of intelligent systems, experiments, and the process of becoming.':
    '一个记录智能系统、技术实验与持续成长的个人档案。',
  '© 2026 shengyi’s space — a living digital identity.':
    '© 2026 shengyi’s space — 持续生长的数字身份。',
  '© 2026 shengyi’s space · AI engineering, projects, and notes.':
    '© 2026 shengyi’s space · AI 工程、项目与笔记。',
  Email: '邮箱',
  GitHub: 'GitHub',
  Resume: '个人简历',

  // Home
  'AI Engineer · Personal Digital Space': 'AI 工程师 · 个人数字空间',
  'Building intelligent systems through AI and software engineering.':
    '我从模型、数据和软件出发，完成可以运行的智能系统。',
  'AI Engineer working across models, software systems, and product interfaces.':
    'AI 工程师，工作覆盖模型、软件系统与产品界面。',
  'Exploring what useful intelligence can become.': '近期专注多模态感知、生成模型与 AI 工程。',
  'Currently focused on multimodal perception, generative models, and AI engineering.':
    '近期专注多模态感知、生成模型与 AI 工程。',
  'Explore Works': '探索作品',
  'About Me': '关于我',
  'Resume ↗': '个人简历 ↗',
  'Welcome / Index 00': '欢迎 / 索引 00',
  'A living archive of': '一个持续生长的',
  'systems and becoming.': '系统与成长档案。',
  'This is not a résumé placed online. It is a growing map of what I learn, what I build, and the questions I want to explore next.':
    '这里收录我的项目、实验记录和阶段思考，也记录技术方向如何随着实践逐渐清晰。',
  'On the desk': '近期项目',
  'Five selected systems across vision, generation, graphs, multimodal AI, and operational software.':
    '五个精选项目，覆盖视觉、生成模型、图学习、多模态 AI 与业务系统。',
  'View all projects': '查看全部项目',
  'Current signal / July 2026': '当前方向 / 2026 年 7 月',
  'Deepening evaluation, agent workflows, and the quality of model-to-product delivery.':
    '继续完善模型评估、智能体工作流，以及模型到产品的工程质量。',
  'Read current focus': '查看当前方向',
  'Project Atlas': '项目图谱',
  'Current Signal': '当前信号',
  'My Journey': '成长轨迹',
  'Selected Works': '精选作品',
  'Enter AI Lab': '进入 AI 实验室',

  // About
  'About / Identity 01': '关于 / 个人档案 01',
  'About / Profile 01': '关于 / 个人档案 01',
  'Engineer,': 'shengyi',
  'still becoming.': 'AI Engineer',
  'Software engineering is my foundation. My current work moves across models, data, services, and the interfaces where people use them.':
    '软件工程是我的技术基础。现在的工作覆盖模型、数据、服务，以及人们实际使用系统的界面。',
  'I work in the space between a promising model and a useful system—the decisions that make intelligence understandable, dependable, and real.':
    '我关注有潜力的模型与真正有用的系统之间，那些让智能变得可理解、可靠并落地的工程决策。',
  'Current identity': '当前身份',
  'My software-engineering background shapes how I approach AI: a model is one component inside a larger system of data, services, interfaces, constraints, and feedback.':
    '软件工程背景塑造了我理解 AI 的方式：模型只是更大系统中的一个组件，它还连接数据、服务、界面、约束与反馈。',
  'I learn by building across domains. The goal is not to collect demos, but to discover reusable patterns for turning unfamiliar problems into clear engineering systems.':
    '项目让我进入不同领域，并训练我把陌生问题拆解为数据、模型、服务和界面。',
  'Projects take me into unfamiliar domains and train me to break a problem into data, models, services, and interfaces.':
    '项目让我进入不同领域，并训练我把陌生问题拆解为数据、模型、服务和界面。',
  'Capability matrix / 04 layers': '能力矩阵 / 04 层',
  'From model to product.': '从模型走向产品。',
  'The strongest work happens where these layers meet. Each capability is connected to evidence in the project atlas.':
    '真正有力量的工作发生在这些层彼此连接之处，每项能力都能在项目图谱中找到证据。',
  skills: '项能力',
  'case studies': '个重点案例',
  'project spaces': '个项目方向',
  directions: '项技术方向',
  practice: '项目实践',
  'Capability map': '能力地图',
  'Skills connected to work.': '能力落在项目中。',
  'Each layer points to projects where the capability was used and tested.':
    '每一层能力都对应实际使用过它的项目。',
  'Used in': '应用项目',
  'Working principles': '工作方式',
  'Frame the problem': '界定问题',
  'Clarify the user, data, constraints, and the decision the system needs to support.':
    '先确定使用者、数据、约束，以及系统需要支持的具体决策。',
  'Build the full path': '打通链路',
  'Connect preprocessing, model work, services, interfaces, and experiment records.':
    '连接数据处理、模型训练、服务接口、产品界面与实验记录。',
  'Read the result': '阅读结果',
  'Use metrics, failure cases, and product behavior to decide the next iteration.':
    '结合指标、失败样例与产品表现，判断下一轮改进方向。',
  'Open Journey': '查看成长记录',
  'Professional snapshot': '职业档案',
  'A résumé built from evidence.': '完整简历',
  'A concise, print-ready profile that packages technical range, selected engineering practice, and current direction without fictional experience.':
    '一页可打印的个人资料，包含技术能力、项目实践与当前方向。',
  'Open Resume': '打开简历',

  // Journey
  'Journey / Growth 02': '成长 / 轨迹 02',
  'Learning through': '在构建中',
  'building.': '持续学习。',
  'An honest growth trajectory built from study, experiments, repeated implementation, and the gradual move from software projects toward AI engineering.':
    '一条由学习、实验、反复实现，以及从软件项目逐渐走向 AI 工程所组成的真实成长轨迹。',
  'A timeline of study, experiments, repeated implementation, and the move from software projects into AI engineering.':
    '一条由学习、实验、反复实现，以及从软件项目逐渐进入 AI 工程的成长时间线。',
  Phase: '阶段',
  'The next chapter is defined by depth, not just volume.': '下一阶段由深度定义，而不只是数量。',
  'The next chapter focuses on fewer, deeper systems.': '下一阶段会聚焦数量更少、完成度更深的系统。',
  'See what is happening now': '查看当前方向',

  // Works
  'Works / Project Atlas 03': '作品 / 项目图谱 03',
  'Works / Selected projects': '作品 / 精选项目',
  'Systems,': 'Selected',
  'not samples.': 'Projects.',
  'A curated atlas of AI engineering work. Five projects are opened as complete case studies; the wider archive shows the range of problems explored.':
    '五个重点项目记录了从数据与模型，到接口、界面和评估的完整过程。更多实践收录在项目档案中。',
  'Five selected projects cover perception, generation, graph recommendation, GIS operations, and multimodal review. The archive collects the rest.':
    '五个重点项目覆盖感知、生成模型、图推荐、GIS 业务与多模态审核，其余实践收录在项目档案中。',
  Selected: '精选',
  'Projects.': '项目。',
  Archive: '档案',
  'Featured work': '重点项目',
  'A closer look at five systems.': '五个项目的完整记录。',
  'Five projects, in detail.': '五个项目的完整记录。',
  'Selected work, up close.': '近距离查看精选项目。',
  'Project archive': '项目档案',
  'Browse by direction, then open a row for notes and tools.':
    '按技术方向浏览，展开条目可查看项目简介与工具。',
  'Open details': '展开详情',
  'Close details': '收起详情',
  'View project': '查看项目',
  'Research prototype': '研究原型',
  'Application system': '应用系统',
  'Model study': '模型研究',
  'unique project spaces': '个不同项目空间',
  'flagship case studies': '个旗舰工程案例',
  'technical directions': '个技术方向',
  'system capability layers': '层系统能力',
  'Filter projects': '筛选项目',
  All: '全部',
  Vision: '视觉',
  Generative: '生成式 AI',
  Graph: '图学习',
  Multimodal: '多模态',
  Forecasting: '预测',
  NLP: '自然语言',
  Systems: '系统',
  'Featured / Deep dives': '旗舰 / 深入案例',
  'The work behind the work.': '项目现场。',
  cases: '个案例',
  Case: '案例',
  'Open Case Study': '查看完整案例',
  'Project evidence': '项目记录',
  'verified checks': '项记录',
  artifacts: '项素材',
  'Selected / Wider archive': '精选 / 更广档案',
  'Breadth, organized.': '让广度变得有序。',
  'A cross-section of the larger archive, organized by problem and technical direction instead of presented as a flat project dump.':
    '这些项目按问题与技术方向归档，记录不同阶段的实践范围。',
  'Archive / Living system': '档案 / 持续生长',
  'The atlas grows as the engineering gets deeper.': '项目图谱会随着工程深度继续生长。',
  'Current priority: improve evidence, evaluation, and deployment depth for the strongest systems.':
    '当前重点：为最具代表性的系统补强证据、评估与部署深度。',
  'See current focus': '查看当前重点',

  // Case studies
  'All Works': '全部作品',
  'Project index': '项目目录',
  Role: '职责',
  'Actual project interface / evidence': '项目界面',
  Status: '状态',
  Direction: '方向',
  Stack: '技术栈',
  'At a glance': '项目速览',
  'Project walkthrough': '项目演示',
  'Scroll through the system.': '沿着系统流程查看。',
  Architecture: '系统架构',
  Evaluation: '模型评估',
  Records: '项目记录',
  'Next iteration': '下一步',
  'Jump to section': '跳转到章节',
  Overview: '项目概述',
  'Challenge / 01': '挑战 / 01',
  'The problem.': '项目背景',
  'System response / 02': '系统回应 / 02',
  'The engineering move.': '设计与实现',
  'Architecture / System Map': '架构 / 系统地图',
  'How intelligence moves.': '系统如何工作。',
  'Input → decision → application': '输入 → 决策 → 应用',
  'Evidence / Built': '证据 / 已实现',
  'More project evidence': '更多项目证据',
  'Outcome / Reflection': '项目结果',
  'Next Case': '下一个案例',
  'Evidence dossier / Repository verified': '项目记录',
  'What can be checked.': '开发过程与保留产物',
  Verified: '已记录',
  Documented: '有文档',
  Prototype: '原型级',
  'Engineering decisions': '设计选择',
  'The choices that shaped the system—not just the tools used to build it.':
    '三项影响系统结构、评估方式和使用流程的选择。',
  'Three choices that shaped the system, its evaluation, and its workflow.':
    '三项影响系统结构、评估方式和使用流程的选择。',
  'Evaluation / Actual outputs': '模型评估',
  'Artifacts / Project records': '项目素材',
  'Evidence, not decoration.': '界面、训练与实验记录',
  'Interface, training, and experiment records.': '界面、训练与实验记录',
  'Build record.': '开发记录。',
  'retained artifacts': '项素材',
  'Limitations / Honest edges': '下一步',
  'What is not solved yet.': '继续完善的部分',
  'Work planned for the next iteration.': '下一轮计划继续完善的部分',
  'Open image': '查看大图',
  'Close image': '关闭大图',
  Previous: '上一张',
  Next: '下一张',
  'Scene input': '场景输入',
  Detection: '目标检测',
  Decision: '风险决策',
  'Drag to compare epochs': '拖动查看不同训练阶段',
  Monitoring: '监测',
  Warning: '预警',
  Dispatch: '派单',
  Review: '复盘',
  'Graph scale': '图数据规模',
  'Training trace': '训练过程',
  Ranking: '推荐排序',
  Audio: '音频',
  Text: '文本',
  Fusion: '融合',

  // Now
  'Now / Current Signal': '此刻 / 当前信号',
  'Less volume,': '减少分散，',
  'more depth.': '走向更深。',
  Current: '当前',
  'focus.': '方向。',
  'A live snapshot of what I am learning, building, and improving right now. This page is intentionally temporary and will change with the work.':
    '记录我此刻正在学习、构建与改进什么。这个页面本就应该不断变化，并跟随工作一起更新。',
  '30 days': '30 天',
  '60 days': '60 天',
  '90 days': '90 天',
  'Consolidate the five flagship cases and make evaluation evidence clearer.':
    '整合五个旗舰案例，让评估证据更加清晰。',
  'Update the five flagship cases with clearer evaluation and project media.':
    '继续更新五个旗舰案例，完善评估结果与项目素材。',
  'Build one agentic workflow with explicit tools, memory, and failure analysis.':
    '构建一个具有明确工具、记忆与失败分析的智能体工作流。',
  'Publish a technical note that connects the experiment to a usable product system.':
    '发布一篇把实验连接到可用产品系统的技术笔记。',
  'Next / Open experiments': '下一步 / 开放实验',
  'Questions move into the lab.': '让问题进入实验室。',

  // Resume
  'Back to About': '返回关于',
  'Print / Save PDF': '打印 / 保存 PDF',
  'AI Engineer / Project-based practice': 'AI 工程师 / 项目型实践',
  Profile: '个人概述',
  'AI Engineer with a software-engineering foundation and broad project practice across vision, generative models, graph learning, multimodal AI, forecasting, and operational platforms.':
    '具备软件工程基础的 AI 工程师，项目实践覆盖视觉、生成模型、图学习、多模态 AI、预测与业务运营平台。',
  'Strongest at the model-to-system layer: data pipelines, training and evaluation, inference services, product interfaces, visualization, and feedback-oriented workflows.':
    '擅长模型到系统的完整工程层：数据流水线、训练与评估、推理服务、产品界面、可视化与反馈工作流。',
  Capabilities: '能力结构',
  'Selected Engineering Practice': '精选工程实践',
  'Independent / project-based': '独立 / 项目型实践',
  Growth: '成长轨迹',
  Evidence: '能力证据',
  'Explore full case studies': '查看完整工程案例',

  // Lab
  'AI Lab / Open Experiments 04': 'AI 实验室 / 开放实验 04',
  'Questions,': '让问题，',
  'still alive.': '保持鲜活。',
  'Open experiments,': '开放实验，',
  'work in progress.': '持续进行。',
  'A place for prototypes, unfinished systems, and technical questions that are valuable before they become polished projects.':
    '这里容纳原型、未完成系统，以及那些在变成完整项目前就已经有价值的技术问题。',
  'Prototypes and technical questions in active development, with their current state and next step.':
    '收录正在开发中的原型与技术问题，并记录当前状态和下一步。',
  'Lab state / Active': '实验室状态 / 活跃',
  online: '在线',
  'The lab is where certainty is optional.': '实验室允许答案暂时不确定。',
  'Current lab bench.': '当前实验台。',
  'Small experiments that test one idea clearly, before complexity has a chance to hide it.':
    '用小型实验清晰验证一个想法，在复杂性有机会掩盖问题之前。',
  'Small experiments for testing one idea, recording the result, and deciding what to build next.':
    '用小型实验验证一个想法、记录结果，并决定下一步构建什么。',
  'RAG · Agents · Vision': 'RAG · 智能体 · 视觉',
  'Iteration 0.6': '迭代版本 0.6',
  'Experiment queue': '实验队列',
  'Currently exploring.': '正在探索。',
  'Always in motion': '持续进行中',
  'Personal Memory Agent': '个人记忆智能体',
  'LLM · RAG · Long-term Memory': '大模型 · RAG · 长期记忆',
  'Exploring an agent that builds a useful, inspectable memory from personal notes and project history.':
    '探索一种能从个人笔记与项目历史中建立实用、可检查记忆的智能体。',
  'Visual Reasoning Bench': '视觉推理评测台',
  'Vision Language Models': '视觉语言模型',
  'A small evaluation bench for understanding where multimodal models see, infer, and hallucinate.':
    '一个用于理解多模态模型如何观察、推理与产生幻觉的小型评测环境。',
  'Adaptive Agent World': '自适应智能体世界',
  'Agents · Reinforcement Learning': '智能体 · 强化学习',
  'Testing how tool-using agents can learn from environmental feedback instead of prompt changes alone.':
    '测试工具型智能体如何从环境反馈中学习，而不是只依赖提示词调整。',
  'Generative Interface': '生成式界面',
  'Generative AI · HCI': '生成式 AI · 人机交互',
  'Investigating interfaces that compose themselves around intent while remaining predictable and controllable.':
    '研究界面如何围绕意图动态组织，同时保持可预测与可控制。',
  Building: '构建中',
  Researching: '研究中',
  Queued: '等待中',
  Sketching: '构思中',

  // Notes
  'Notes / Thinking Log 05': '笔记 / 思考记录 05',
  'Ideas need': '想法也需要',
  'a place to grow.': '生长的空间。',
  'Technical notes, project reflections, and evolving mental models. This section is designed to become a long-term record rather than a static blog.':
    '技术笔记、项目反思与持续演化的思维模型。这里会成为长期成长记录，而不是静态博客。',
  'Technical notes, project reflections, and working ideas collected over time.':
    '持续收集的技术笔记、项目复盘与阶段想法。',
  'AI Engineering': 'AI 工程',
  'Computer Vision': '计算机视觉',
  'Growth Log': '成长记录',
  'The model is only one layer of the product.': '模型只是产品中的一层。',
  'Notes on why evaluation, context, interfaces, observability, and feedback loops determine whether an AI system becomes useful.':
    '记录评估、上下文、界面、可观测性与反馈闭环如何决定 AI 系统能否真正有用。',
  'From a good checkpoint to a dependable vision system.': '从优秀权重走向可靠视觉系统。',
  'A practical mental model for moving from training metrics to inference contracts, evidence, monitoring, and iteration.':
    '一套从训练指标走向推理契约、证据、监控与持续迭代的实践框架。',
  'Learning through systems.': '在系统构建中学习。',
  'A reflection on using projects as a structured way to learn—not as isolated demos, but as connected engineering decisions.':
    '思考如何把项目变成结构化学习方法：不是孤立 Demo，而是一系列彼此连接的工程决策。',
  'A reflection on using connected engineering decisions as a structured way to learn through projects.':
    '记录如何通过相互连接的工程决策，在项目中形成结构化学习方法。',
  'More notes will grow here as the work continues.': '随着探索继续，更多笔记会在这里生长。',

  // Contact and 404
  'Contact / Open Channel 06': '联系 / 开放频道 06',
  'Contact / 06': '联系 / 06',
  'Say hello.': '保持联系。',
  'Let’s build': '一起构建',
  'what’s next.': '下一种可能。',
  'I am open to conversations about AI engineering, intelligent products, research prototypes, and ambitious systems that need thoughtful execution.':
    '期待交流 AI 工程、智能产品、研究原型，以及那些值得被认真实现的系统。',
  'Email is the best way to reach me. I am interested in AI engineering, intelligent products, and research prototypes.':
    '可以通过邮箱联系我。我关注 AI 工程、智能产品与研究原型。',
  'Print-friendly profile': '适合打印的职业档案',
  'Based in China · Working across AI and software.': '常驻中国 · 专注 AI 与软件工程。',
  'Local time / UTC+08:00': '本地时间 / UTC+08:00',
  '404 / Unmapped Space': '404 / 未标记空间',
  'Lost signal.': '信号丢失。',
  'This coordinate does not exist yet. Return to the entrance and continue exploring.':
    '这个坐标暂时还不存在。返回入口，继续探索这个数字空间。',
  'This route sits outside the current map. Return to the entrance and continue exploring.':
    '这条路径位于当前地图之外。返回入口，继续浏览。',
  'Return Home': '返回首页',
}

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  t: (english: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = window.localStorage.getItem('shengyi-space-language')
    return stored === 'zh' ? 'zh' : 'en'
  })

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage)
  }

  useEffect(() => {
    window.localStorage.setItem('shengyi-space-language', language)
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    document.title =
      language === 'zh' ? 'shengyi’s space — AI 工程师' : 'shengyi’s space — AI Engineer'
  }, [language])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguageState((current) => (current === 'en' ? 'zh' : 'en')),
      t: (english) => (language === 'zh' ? zh[english] ?? english : english),
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
