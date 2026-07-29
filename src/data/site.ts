export type LocalizedText = {
  en: string
  zh: string
}

export type ProjectCategory =
  | 'Vision'
  | 'Generative'
  | 'Graph'
  | 'Multimodal'
  | 'Systems'

export type ProjectMetric = {
  value: string
  label: LocalizedText
}

export type Project = {
  slug: string
  index: string
  title: string
  subtitle: LocalizedText
  year: string
  category: ProjectCategory
  intro: LocalizedText
  overview: LocalizedText
  challenge: LocalizedText
  solution: LocalizedText
  result: LocalizedText
  role: LocalizedText
  technologies: string[]
  architecture: LocalizedText[]
  metrics: ProjectMetric[]
  proof: LocalizedText[]
  image: string
  imageAlt: LocalizedText
  gallery?: string[]
  imagePosition?: 'center' | 'top'
}

export type ArchiveProject = {
  title: LocalizedText
  category: ProjectCategory | 'Forecasting' | 'NLP'
  year: string
  technologies: string[]
  description: LocalizedText
}

export function localize(text: LocalizedText, language: 'en' | 'zh') {
  return text[language]
}

export const profile = {
  name: 'shengyi',
  role: 'AI Engineer',
  discipline: 'Software Engineering × Artificial Intelligence',
  statement: {
    en: 'I work across models, data pipelines, backend services, and product interfaces.',
    zh: '我的工作覆盖模型、数据流水线、后端服务与产品界面。',
  } satisfies LocalizedText,
  email: 'hello@shengyi.space',
  githubLabel: 'GitHub / shengyi',
  githubUrl: 'https://github.com/',
}

export const capabilityGroups = [
  {
    index: '01',
    title: { en: 'Intelligence', zh: '智能模型' },
    description: {
      en: 'Choosing, training, and evaluating the right learning approach for the problem.',
      zh: '为问题选择、训练并评估合适的学习方法。',
    },
    items: ['Computer Vision', 'Generative AI', 'Graph Learning', 'NLP / LLM', 'Multimodal AI', 'Forecasting'],
  },
  {
    index: '02',
    title: { en: 'Engineering', zh: '工程实现' },
    description: {
      en: 'Turning experiments into explicit services, contracts, and maintainable code.',
      zh: '把实验转化为清晰的服务、接口契约与可维护代码。',
    },
    items: ['Python / PyTorch', 'OpenCV', 'FastAPI / Django', 'Spring Boot', 'REST / WebSocket', 'Model Inference'],
  },
  {
    index: '03',
    title: { en: 'Product Systems', zh: '产品系统' },
    description: {
      en: 'Designing the interfaces, workflows, and feedback that make a model usable.',
      zh: '设计让模型可以被实际使用的界面、工作流与反馈机制。',
    },
    items: ['React / Vue', 'GIS Interfaces', 'Data Visualization', 'Workflow Design', 'Reporting', 'Explainable Results'],
  },
  {
    index: '04',
    title: { en: 'Data & Delivery', zh: '数据与交付' },
    description: {
      en: 'Building the data and operational layer around an intelligent application.',
      zh: '构建智能应用周围的数据与运行交付层。',
    },
    items: ['MySQL', 'Redis', 'MinIO', 'Dataset Pipelines', 'Experiment Records', 'Deployment Docs'],
  },
] satisfies Array<{
  index: string
  title: LocalizedText
  description: LocalizedText
  items: string[]
}>

export const identityTags = [
  {
    label: { en: 'Builder', zh: '构建者' },
    description: {
      en: 'I care about the last mile: turning a model into a system that somebody can actually use.',
      zh: '我关心智能落地的最后一公里：让模型成为真正可以被使用的系统。',
    },
  },
  {
    label: { en: 'Systems Thinker', zh: '系统思考者' },
    description: {
      en: 'I connect datasets, models, APIs, interfaces, constraints, and feedback into one working path.',
      zh: '我把数据、模型、API、界面、约束与反馈连接成一条可以运行的链路。',
    },
  },
  {
    label: { en: 'Explorer', zh: '探索者' },
    description: {
      en: 'I use projects to investigate unfamiliar domains and turn uncertainty into a clear engineering path.',
      zh: '我通过项目进入陌生领域，把不确定性转化为清晰的工程路径。',
    },
  },
] satisfies Array<{ label: LocalizedText; description: LocalizedText }>

export const principles = [
  {
    number: '01',
    title: { en: 'Evidence over theatre.', zh: '证据胜过表演。' },
    copy: {
      en: 'A model result should be inspectable, traceable, and connected to the decision it supports.',
      zh: '模型结果应当可检查、可追踪，并与它所支持的决策直接关联。',
    },
  },
  {
    number: '02',
    title: { en: 'Systems over demos.', zh: '系统胜过演示。' },
    copy: {
      en: 'The useful work starts where the notebook ends: APIs, workflows, interfaces, reliability, and iteration.',
      zh: '真正有价值的工作始于 Notebook 之外：API、工作流、界面、可靠性与持续迭代。',
    },
  },
  {
    number: '03',
    title: { en: 'Clarity over complexity.', zh: '清晰胜过复杂。' },
    copy: {
      en: 'Architecture should make difficult systems easier to reason about, extend, and explain.',
      zh: '架构应该让复杂系统更易理解、扩展和解释。',
    },
  },
] satisfies Array<{ number: string; title: LocalizedText; copy: LocalizedText }>

export const journey = [
  {
    year: '2024',
    phase: { en: 'Foundation', zh: '基础建立' },
    title: {
      en: 'Learning to think in systems.',
      zh: '开始用系统的方式思考。',
    },
    description: {
      en: 'Built a software-engineering foundation across data structures, databases, web applications, system design, and the discipline of translating requirements into working software.',
      zh: '建立数据结构、数据库、Web 应用与系统设计基础，学习把需求拆解并转化为可以运行的软件。',
    },
    markers: ['Software Engineering', 'Full-stack Systems', 'Architecture'],
    evidence: { en: 'Web systems · data applications · engineering foundations', zh: 'Web 系统 · 数据应用 · 工程基础' },
  },
  {
    year: '2025',
    phase: { en: 'Expansion', zh: '广度扩展' },
    title: {
      en: 'Expanding through projects.',
      zh: '通过项目扩展技术方向。',
    },
    description: {
      en: 'Moved from conventional applications into computer vision, forecasting, NLP, recommendation, and data products. The two working archives now contain 71 project entries across 68 unique problem spaces.',
      zh: '从常规软件应用进入计算机视觉、预测、NLP、推荐与数据产品；两个项目库累计形成 71 个项目条目，覆盖 68 个不同问题空间。',
    },
    markers: ['Computer Vision', 'Deep Learning', 'Applied AI'],
    evidence: { en: '71 entries · 68 unique project spaces', zh: '71 个条目 · 68 个不同项目空间' },
  },
  {
    year: '2026',
    phase: { en: 'Integration', zh: '能力整合' },
    title: {
      en: 'From model building to AI engineering.',
      zh: '从训练模型走向 AI 工程。',
    },
    description: {
      en: 'Focused on multimodal perception, generative medical imaging, graph recommendation, GIS command platforms, inference services, and product interfaces.',
      zh: '聚焦多模态感知、医学影像生成、图推荐、GIS 指挥平台、推理服务与产品界面。',
    },
    markers: ['Multimodal AI', 'Generative AI', 'Production-minded Systems'],
    evidence: { en: 'Five flagship case studies', zh: '五个旗舰工程案例' },
  },
  {
    year: 'NOW',
    phase: { en: 'Direction', zh: '当前方向' },
    title: {
      en: 'Going deeper into evaluation and delivery.',
      zh: '继续深入模型评估与工程交付。',
    },
    description: {
      en: 'The current goal is to deepen evaluation, agentic workflows, multimodal reasoning, deployment quality, and the craft of turning technical work into a clear product story.',
      zh: '当前目标是深化评估体系、智能体工作流、多模态推理、部署质量，以及把技术工作讲成清晰产品故事的能力。',
    },
    markers: ['AI Agents', 'Evaluation', 'System Quality'],
    evidence: { en: 'A focused next chapter', zh: '更聚焦的下一阶段' },
  },
] satisfies Array<{
  year: string
  phase: LocalizedText
  title: LocalizedText
  description: LocalizedText
  markers: string[]
  evidence: LocalizedText
}>

export const projects: Project[] = [
  {
    slug: 'drivemind',
    index: '01',
    title: 'DriveMind',
    subtitle: { en: 'Multimodal Driving Decision System', zh: '多模态智能驾驶决策系统' },
    year: '2026',
    category: 'Multimodal',
    intro: {
      en: 'A driving intelligence platform that turns visual perception, road context, environment signals, and driver state into an explainable risk decision.',
      zh: '将视觉感知、道路环境、驾驶上下文与驾驶员状态融合为可解释风险决策的智能驾驶平台。',
    },
    overview: {
      en: 'DriveMind explores the layer between seeing and deciding. It combines YOLOv8 perception with contextual signals, a transparent risk engine, historical comparisons, and a usable web workflow.',
      zh: 'DriveMind 探索“看见”与“决策”之间的工程层：将 YOLOv8 感知、上下文信号、透明风险引擎、历史对比与 Web 工作流整合为一个系统。',
    },
    challenge: {
      en: 'Object detection alone cannot describe driving risk. The system needed to combine incomplete signals, preserve human-readable reasoning, and keep the decision useful inside a real interface.',
      zh: '目标检测本身无法描述驾驶风险。系统需要融合不完整信号、保留人类可理解的推理过程，并让结论能在真实界面中被使用。',
    },
    solution: {
      en: 'I structured the product into perception, environment analysis, context modeling, and a 0–100 rule-based risk layer. A Django REST service exposes decisions to a Vue interface with comparison, history, ECharts analysis, and PDF reporting.',
      zh: '系统被拆分为感知、环境分析、上下文建模与 0–100 规则风险层；Django REST 服务向 Vue 界面提供决策，并支持对比、历史记录、ECharts 分析与 PDF 报告。',
    },
    result: {
      en: 'The project connects every risk level to scene evidence, contributing factors, history, and an actionable recommendation.',
      zh: '项目将每个风险等级与场景证据、影响因素、历史记录和可执行建议连接起来。',
    },
    role: { en: 'End-to-end system design and implementation', zh: '端到端系统设计与实现' },
    technologies: ['YOLOv8', 'PyTorch', 'OpenCV', 'Django REST', 'Vue 3', 'ECharts'],
    architecture: [
      { en: 'Scene Input', zh: '场景输入' },
      { en: 'Visual Perception', zh: '视觉感知' },
      { en: 'Context & Risk Engine', zh: '上下文与风险引擎' },
      { en: 'Decision Workspace', zh: '决策工作台' },
    ],
    metrics: [
      { value: '0–100', label: { en: 'explainable risk scale', zh: '可解释风险评分' } },
      { value: '4', label: { en: 'context signal groups', zh: '类上下文信号' } },
      { value: '95%', label: { en: 'documented project completion', zh: '文档记录完成度' } },
    ],
    proof: [
      { en: 'Single-scene and batch analysis workflows', zh: '单场景与批量分析工作流' },
      { en: 'Up to four-scene comparison with history', zh: '最多四场景对比与历史记录' },
      { en: 'PDF decision report export', zh: 'PDF 决策报告导出' },
    ],
    image: '/projects/drivemind/dashboard.png',
    imageAlt: { en: 'DriveMind decision interface', zh: 'DriveMind 驾驶决策界面' },
  },
  {
    slug: 'medsynth',
    index: '02',
    title: 'MedSynth',
    subtitle: { en: 'MRI CycleGAN Synthesis Studio', zh: 'MRI CycleGAN 医学影像生成平台' },
    year: '2026',
    category: 'Generative',
    intro: {
      en: 'An end-to-end MRI modality translation workflow spanning dataset preparation, CycleGAN training, image-quality evaluation, inference, and a clinical-facing demo.',
      zh: '覆盖数据准备、CycleGAN 训练、图像质量评估、推理与临床展示的端到端 MRI 模态转换工作流。',
    },
    overview: {
      en: 'MedSynth translates MRI T1 and T2 modalities using an enhanced CycleGAN. The project connects a large preprocessing pipeline, model research, quantitative evaluation, checkpoint management, and a Streamlit application.',
      zh: 'MedSynth 使用增强型 CycleGAN 实现 MRI T1 与 T2 模态转换，并连接大规模预处理、模型研究、量化评估、权重管理与 Streamlit 应用。',
    },
    challenge: {
      en: 'Medical synthesis must preserve anatomical structure while changing modality appearance. Training is expensive, paired data is limited, and a visually plausible image can still lose clinically important detail.',
      zh: '医学影像生成既要改变模态外观，又要保留解剖结构；训练成本高、配对数据有限，而且视觉上合理的结果仍可能丢失临床细节。',
    },
    solution: {
      en: 'The architecture combines ResNet generators, self-attention, PatchGAN discriminators, and five complementary objectives: adversarial, cycle, identity, SSIM, and VGG19 perceptual loss. AMP, early stopping, and modular pipelines improve iteration speed.',
      zh: '架构融合 ResNet 生成器、自注意力与 PatchGAN 判别器，并联合对抗、循环一致性、身份、SSIM 与 VGG19 感知五类损失；AMP、早停与模块化流水线提升迭代效率。',
    },
    result: {
      en: 'The project produced reusable training and inference modules, seven checkpoints, quantitative evaluation in both translation directions, and a product surface for single, batch, enhancement, and history workflows.',
      zh: '项目形成可复用训练与推理模块、7 个模型权重、双向量化评估，以及支持单图、批量、增强与历史记录的产品界面。',
    },
    role: { en: 'Model pipeline, evaluation, and application engineering', zh: '模型流水线、评估与应用工程' },
    technologies: ['CycleGAN', 'PyTorch', 'OpenCV', 'VGG19', 'SSIM', 'Streamlit'],
    architecture: [
      { en: 'IXI MRI Dataset', zh: 'IXI MRI 数据集' },
      { en: 'Preprocessing Pipeline', zh: '预处理流水线' },
      { en: 'CycleGAN Training', zh: 'CycleGAN 训练' },
      { en: 'Inference Studio', zh: '推理工作台' },
    ],
    metrics: [
      { value: '98,781', label: { en: 'prepared MRI slices', zh: '张预处理 MRI 切片' } },
      { value: '16.41', label: { en: 'T1→T2 PSNR', zh: 'T1→T2 PSNR' } },
      { value: '5', label: { en: 'coordinated loss objectives', zh: '类联合损失目标' } },
    ],
    proof: [
      { en: 'T1→T2 and T2→T1 evaluation paths', zh: 'T1→T2 与 T2→T1 双向评估' },
      { en: '20+ modular Python components', zh: '20+ 个模块化 Python 组件' },
      { en: 'Single, batch, history, and enhancement workflows', zh: '单图、批量、历史与增强工作流' },
    ],
    image: '/projects/medsynth/comparison.png',
    imageAlt: { en: 'CycleGAN MRI synthesis comparison', zh: 'CycleGAN MRI 生成结果对比' },
  },
  {
    slug: 'slope-sentinel',
    index: '03',
    title: 'Slope Sentinel',
    subtitle: { en: 'Satellite Risk & Emergency Command', zh: '卫星边坡风险预警与应急指挥平台' },
    year: '2026',
    category: 'Systems',
    intro: {
      en: 'A GIS-centered operational platform that connects satellite sensing, slope archives, risk warnings, emergency work orders, resources, and command visibility.',
      zh: '以 GIS 为中心，连接卫星遥感、边坡档案、风险预警、应急工单、资源调度与指挥可视化的运营平台。',
    },
    overview: {
      en: 'Slope Sentinel is designed around an operational loop: ingest multi-source observations, identify risk, trigger graded warnings, coordinate response, and preserve the event for review.',
      zh: 'Slope Sentinel 围绕完整业务闭环设计：接入多源观测、识别风险、触发分级预警、协同处置，并保留事件用于复盘。',
    },
    challenge: {
      en: 'Slope safety data is spatial, multi-source, and time-sensitive. The project coordinates GIS objects, monitoring devices, remote-sensing results, alerts, people, and response status.',
      zh: '边坡安全数据具有空间性、多源性与时效性。项目需要协调 GIS 对象、监测设备、遥感结果、告警、人员与处置状态。',
    },
    solution: {
      en: 'I organized the system around a map-first Vue workspace, a Spring Boot business layer, a decoupled FastAPI analysis service, MySQL/Redis/MinIO infrastructure, and WebSocket updates for warning and task state.',
      zh: '系统采用地图优先的 Vue 工作台、Spring Boot 业务层、解耦的 FastAPI 分析服务、MySQL/Redis/MinIO 基础设施，以及用于告警与任务状态更新的 WebSocket。',
    },
    result: {
      en: 'The platform presents a coherent “monitor–warn–respond–review” flow across a management console, command dashboard, reports, and a lightweight mobile response surface.',
      zh: '平台在管理端、指挥大屏、报表与轻量移动处置端之间形成“监测—预警—响应—复盘”的连贯流程。',
    },
    role: { en: 'System architecture, workflow design, and full-stack implementation', zh: '系统架构、流程设计与全栈实现' },
    technologies: ['Vue 3', 'Spring Boot', 'OpenLayers', 'FastAPI', 'MySQL', 'WebSocket'],
    architecture: [
      { en: 'Satellite & Sensor Data', zh: '卫星与传感数据' },
      { en: 'GIS Risk Analysis', zh: 'GIS 风险分析' },
      { en: 'Graded Warning', zh: '分级预警' },
      { en: 'Emergency Command', zh: '应急指挥' },
    ],
    metrics: [
      { value: '7', label: { en: 'core operational modules', zh: '个核心业务模块' } },
      { value: '1,000+', label: { en: 'planned slope objects', zh: '规划边坡对象容量' } },
      { value: '<1 min', label: { en: 'warning push target', zh: '告警推送目标' } },
    ],
    proof: [
      { en: 'PC console, H5 response, and command dashboard', zh: 'PC 管理、H5 响应与指挥大屏' },
      { en: 'Slope archive, warning, work-order, and resource flows', zh: '边坡档案、预警、工单与资源流程' },
      { en: 'GIS layers and real-time state updates', zh: 'GIS 图层与实时状态更新' },
    ],
    image: '/projects/slope-sentinel/dashboard.png',
    imageAlt: { en: 'Slope Sentinel command dashboard', zh: 'Slope Sentinel 应急指挥大屏' },
    gallery: ['/projects/slope-sentinel/warning-center.png'],
    imagePosition: 'top',
  },
  {
    slug: 'graph-interest',
    index: '04',
    title: 'Graph Interest',
    subtitle: { en: 'GNN Personalization Engine', zh: 'GNN 用户兴趣与个性化推荐引擎' },
    year: '2026',
    category: 'Graph',
    intro: {
      en: 'A LightGCN recommendation workflow that models user–answer interactions as a bipartite graph and turns learned structure into explainable Top-K suggestions.',
      zh: '将用户—回答交互建模为二部图，并用 LightGCN 学习图结构，生成可解释 Top-K 推荐的完整工作流。',
    },
    overview: {
      en: 'Graph Interest models user–answer interaction topology. It covers graph construction, LightGCN training, embedding-based ranking, experiment visualization, recommendation output, and explanation.',
      zh: 'Graph Interest 对用户与答案的交互拓扑进行建模，覆盖图构建、LightGCN 训练、嵌入排序、实验可视化、推荐输出与解释。',
    },
    challenge: {
      en: 'Sparse interactions make interest difficult to infer. The engineering challenge was to build reliable graph data, control training, evaluate ranking behavior, and expose a result that is more useful than a similarity score.',
      zh: '稀疏交互使兴趣推断变得困难。工程挑战在于构建可靠图数据、控制训练、评估排序行为，并呈现超越相似度分数的有用结果。',
    },
    solution: {
      en: 'I used LightGCN with PyTorch Geometric to propagate collaborative signals over the user–answer graph, then separated training, evaluation, visualization, recommendation, and explanation into explicit modules.',
      zh: '使用 PyTorch Geometric 实现 LightGCN，在用户—回答图上传播协同信号，并将训练、评估、可视化、推荐与解释拆分为清晰模块。',
    },
    result: {
      en: 'The finished pipeline turns raw interaction records into reproducible graph experiments and inspectable recommendations, with a training report that makes optimization behavior visible.',
      zh: '完整流水线将原始交互记录转化为可复现实验与可检查推荐，并通过训练报告呈现优化过程。',
    },
    role: { en: 'Graph modeling, training workflow, and recommendation product', zh: '图建模、训练流程与推荐产品实现' },
    technologies: ['LightGCN', 'PyTorch', 'PyG', 'Top-K Ranking', 'Python', 'Visualization'],
    architecture: [
      { en: 'Interaction Records', zh: '交互记录' },
      { en: 'Bipartite Graph', zh: '用户—回答二部图' },
      { en: 'LightGCN Embeddings', zh: 'LightGCN 表征' },
      { en: 'Top-K & Explanation', zh: 'Top-K 与推荐解释' },
    ],
    metrics: [
      { value: '20', label: { en: 'documented training epochs', zh: '轮记录训练' } },
      { value: '2-node', label: { en: 'user–answer graph types', zh: '类用户—回答节点' } },
      { value: 'Top-K', label: { en: 'ranked recommendation output', zh: '排序推荐输出' } },
    ],
    proof: [
      { en: 'Training, evaluation, and visualization modules', zh: '训练、评估与可视化模块' },
      { en: 'User and answer embedding workflow', zh: '用户与回答嵌入工作流' },
      { en: 'Recommendation explanation surface', zh: '推荐解释呈现' },
    ],
    image: '/projects/graph-interest/training-report.png',
    imageAlt: { en: 'LightGCN training report', zh: 'LightGCN 训练报告' },
  },
  {
    slug: 'vidharm',
    index: '05',
    title: 'VidHarm',
    subtitle: { en: 'Multimodal Content Safety System', zh: '多模态短视频内容安全系统' },
    year: '2026',
    category: 'Multimodal',
    intro: {
      en: 'A content-safety research system that combines visual, audio, and text evidence from short videos into a reviewable multimodal classification workflow.',
      zh: '融合短视频视觉、音频与文本证据，形成可审核多模态分类工作流的内容安全研究系统。',
    },
    overview: {
      en: 'VidHarm studies harmful-content detection as a multimodal problem. The repository includes dataset analysis, feature extraction, vision and multimodal training runs, evaluation records, deployment guidance, and a review interface.',
      zh: 'VidHarm 将有害内容检测视为多模态问题，包含数据集分析、特征提取、视觉与多模态训练实验、评估记录、部署说明与审核界面。',
    },
    challenge: {
      en: 'Harm can be visible, spoken, written, or only apparent when signals are combined. A system must align temporal evidence while dealing with noisy labels, class imbalance, and limited compute.',
      zh: '风险可能来自画面、语音、文字，也可能只有融合信号后才显现；系统还需面对时序对齐、标签噪声、类别不均衡与算力限制。',
    },
    solution: {
      en: 'I built separate feature paths for frames, audio, and text/CLIP representations, then fused them in multimodal transformer experiments. Offline model loading and explicit reports keep the workflow reproducible.',
      zh: '系统为视频帧、音频与文本/CLIP 表征建立独立特征路径，并在多模态 Transformer 实验中融合；离线模型加载与显式报告保证流程可复现。',
    },
    result: {
      en: 'The project produced an inventoried dataset, repeatable experiments, documented metrics, a deployment path, and a human-facing review workflow.',
      zh: '最终形成真实的研究到应用基线：完整数据盘点、可重复实验、指标记录、部署路径与面向人的审核工作流。',
    },
    role: { en: 'Dataset analysis, multimodal pipeline, and review workflow', zh: '数据分析、多模态流水线与审核工作流' },
    technologies: ['PyTorch', 'Transformers', 'CLIP', 'Whisper', 'OpenCV', 'Flask'],
    architecture: [
      { en: 'Video Dataset', zh: '视频数据集' },
      { en: 'Vision / Audio / Text', zh: '视觉 / 音频 / 文本' },
      { en: 'Multimodal Fusion', zh: '多模态融合' },
      { en: 'Safety Review', zh: '安全审核' },
    ],
    metrics: [
      { value: '3,589', label: { en: 'inventoried videos', zh: '条盘点视频' } },
      { value: '3', label: { en: 'modal feature paths', zh: '条模态特征路径' } },
      { value: '0.49', label: { en: 'recorded multimodal F1', zh: '记录的多模态 F1' } },
    ],
    proof: [
      { en: 'Train, validation, and test inventory', zh: '训练、验证与测试集盘点' },
      { en: 'Vision and multimodal experiment records', zh: '视觉与多模态实验记录' },
      { en: 'Offline-capable review application', zh: '支持离线加载的审核应用' },
    ],
    image: '/projects/vidharm/architecture.png',
    imageAlt: { en: 'VidHarm multimodal architecture', zh: 'VidHarm 多模态检测架构' },
  },
]

export const archiveProjects: ArchiveProject[] = [
  {
    title: { en: 'Autonomous Water Quality Monitor', zh: '无人环境监测车水质采样预测' },
    category: 'Systems',
    year: '2026',
    technologies: ['LightGBM', 'Django', 'Vue 3', 'WebSocket'],
    description: { en: 'Real-time sampling, forecasting, alerts, GIS, and reports.', zh: '实时采样、预测、告警、GIS 与报表闭环。' },
  },
  {
    title: { en: 'Multi-scenario Traffic Forecasting', zh: '多场景交通流量预测' },
    category: 'Forecasting',
    year: '2025',
    technologies: ['XGBoost', 'LightGBM', 'Flask'],
    description: { en: 'Feature-driven traffic prediction with model comparison.', zh: '基于多因素特征的交通预测与模型对比。' },
  },
  {
    title: { en: 'Chinese Sentiment Intelligence', zh: 'BERT 中文情感分析' },
    category: 'NLP',
    year: '2025',
    technologies: ['BERT', 'PyTorch', 'NLP'],
    description: { en: 'Domain sentiment classification and visual analysis.', zh: '领域情感分类与可视分析。' },
  },
  {
    title: { en: 'Virtual Legal Assistant', zh: 'NLP 虚拟法务助手' },
    category: 'NLP',
    year: '2026',
    technologies: ['NLP', 'Retrieval', 'Web'],
    description: { en: 'Legal knowledge retrieval and guided question answering.', zh: '法律知识检索与引导式问答。' },
  },
  {
    title: { en: 'Long-document Summarizer', zh: '自注意力长文本摘要系统' },
    category: 'NLP',
    year: '2026',
    technologies: ['Attention', 'Transformers', 'Python'],
    description: { en: 'Structured compression for long-form documents.', zh: '面向长篇文档的结构化压缩。' },
  },
  {
    title: { en: 'Adaptive Smart Home', zh: '深度强化学习智能家居' },
    category: 'Systems',
    year: '2026',
    technologies: ['Deep RL', 'Control', 'Simulation'],
    description: { en: 'Policy learning for adaptive environment control.', zh: '面向自适应环境控制的策略学习。' },
  },
  {
    title: { en: 'Plate Recognition Traffic Monitor', zh: '车牌识别交通监控系统' },
    category: 'Vision',
    year: '2025',
    technologies: ['OCR', 'OpenCV', 'Deep Learning'],
    description: { en: 'Vehicle detection, plate recognition, and traffic records.', zh: '车辆检测、车牌识别与交通记录。' },
  },
  {
    title: { en: 'EV Battery Range Predictor', zh: '新能源汽车电池续航预测' },
    category: 'Forecasting',
    year: '2025',
    technologies: ['Machine Learning', 'Python', 'Visualization'],
    description: { en: 'Range estimation from vehicle and operating variables.', zh: '基于车辆与运行变量的续航估计。' },
  },
  {
    title: { en: 'Library Occupancy Vision', zh: '图书馆占座行为识别' },
    category: 'Vision',
    year: '2025',
    technologies: ['YOLO', 'OpenCV', 'Web'],
    description: { en: 'Visual occupancy detection and seat-state management.', zh: '视觉占用检测与座位状态管理。' },
  },
  {
    title: { en: 'E-commerce Sentiment Analytics', zh: '电商评论情感大数据分析' },
    category: 'NLP',
    year: '2025',
    technologies: ['Spark', 'Sentiment', 'Visualization'],
    description: { en: 'Distributed review analysis and decision dashboards.', zh: '分布式评论分析与决策可视化。' },
  },
]

export const nowFocus = [
  {
    number: '01',
    status: { en: 'Deepening', zh: '深入中' },
    title: { en: 'Evaluation for AI systems', zh: 'AI 系统评估' },
    copy: {
      en: 'Combining task suites, failure taxonomies, latency, model outputs, and human review in one evaluation process.',
      zh: '从单一准确率走向任务集、失败分类、证据、延迟与人工审核的综合评估。',
    },
  },
  {
    number: '02',
    status: { en: 'Building', zh: '构建中' },
    title: { en: 'Agentic engineering workflows', zh: '智能体工程工作流' },
    copy: {
      en: 'Exploring agents with narrow contracts, tool use, persistent project context, and inspectable intermediate decisions.',
      zh: '探索具有清晰职责、工具调用、持久项目上下文与可检查中间决策的智能体。',
    },
  },
  {
    number: '03',
    status: { en: 'Studying', zh: '研究中' },
    title: { en: 'Multimodal reasoning', zh: '多模态推理' },
    copy: {
      en: 'Studying how vision, language, audio, and structured context can support a better decision together.',
      zh: '研究视觉、语言、音频与结构化上下文如何共同支持更好的决策。',
    },
  },
] satisfies Array<{
  number: string
  status: LocalizedText
  title: LocalizedText
  copy: LocalizedText
}>

export const labExperiments = [
  {
    code: 'EXP–01',
    title: 'Personal Memory Agent',
    field: 'LLM · RAG · Long-term Memory',
    status: 'Building',
    description: 'Exploring an agent that builds a useful, inspectable memory from personal notes and project history.',
  },
  {
    code: 'EXP–02',
    title: 'Visual Reasoning Bench',
    field: 'Vision Language Models',
    status: 'Researching',
    description: 'A small evaluation bench for understanding where multimodal models see, infer, and hallucinate.',
  },
  {
    code: 'EXP–03',
    title: 'Adaptive Agent World',
    field: 'Agents · Reinforcement Learning',
    status: 'Queued',
    description: 'Testing how tool-using agents learn from environmental feedback and repeated task outcomes.',
  },
  {
    code: 'EXP–04',
    title: 'Generative Interface',
    field: 'Generative AI · HCI',
    status: 'Sketching',
    description: 'Investigating interfaces that compose themselves around intent while remaining predictable and controllable.',
  },
]

export const notes = [
  {
    date: '2026.07',
    category: 'AI Engineering',
    title: 'The model is only one layer of the product.',
    excerpt: 'Notes on why evaluation, context, interfaces, observability, and feedback loops determine whether an AI system becomes useful.',
    readTime: '6 min',
  },
  {
    date: '2026.05',
    category: 'Computer Vision',
    title: 'From a good checkpoint to a dependable vision system.',
    excerpt: 'A practical mental model for moving from training metrics to inference contracts, evidence, monitoring, and iteration.',
    readTime: '8 min',
  },
  {
    date: '2026.02',
    category: 'Growth Log',
    title: 'Learning through systems.',
    excerpt: 'A reflection on using connected engineering decisions as a structured way to learn through projects.',
    readTime: '4 min',
  },
]
