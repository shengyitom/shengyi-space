import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { LocalizedText, Project } from '../data/site'
import { localize } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { OptimizedImage, optimizedImagePath } from './OptimizedImage'

type StoryProps = {
  project: Project
}

type StoryStep = {
  label: string
  title: LocalizedText
  copy: LocalizedText
  image: string
  value?: string
}

function StoryIntro({
  index,
  title,
  copy,
}: {
  index: string
  title: LocalizedText
  copy: LocalizedText
}) {
  const { language, t } = useLanguage()

  return (
    <div className="grid gap-7 border-b border-[#191919]/10 pb-7 md:grid-cols-[0.36fr_1fr_0.78fr] md:items-end">
      <p className="space-label">
        {t('Project walkthrough')} / {index}
      </p>
      <h2 className="font-serif text-4xl leading-tight tracking-[-0.035em] sm:text-5xl">
        {localize(title, language)}
      </h2>
      <p className="max-w-xl text-sm leading-6 text-[#191919]/52">
        {localize(copy, language)}
      </p>
    </div>
  )
}

function DriveMindStory() {
  const { language, t } = useLanguage()
  const steps: StoryStep[] = [
    {
      label: 'Scene input',
      title: { en: 'Start with the road scene.', zh: '从道路场景开始。' },
      copy: {
        en: 'A validation frame preserves the original traffic context before the risk layer is applied.',
        zh: '验证帧保留原始交通环境，为后续目标检测和风险判断提供上下文。',
      },
      image: '/projects/drivemind/prediction.jpg',
      value: '01',
    },
    {
      label: 'Detection',
      title: { en: 'Read visible objects.', zh: '识别可见目标。' },
      copy: {
        en: 'YOLOv8 returns class, position, and confidence for the objects used by the context layer.',
        zh: 'YOLOv8 输出目标类别、位置和置信度，供上下文层继续处理。',
      },
      image: '/projects/drivemind/dashboard.png',
      value: '0.543',
    },
    {
      label: 'Decision',
      title: { en: 'Assemble the decision.', zh: '形成风险判断。' },
      copy: {
        en: 'Scene evidence and context factors are presented together with risk level, history, and a recommendation.',
        zh: '场景证据与环境因素共同进入风险层，并在界面中呈现等级、历史与建议。',
      },
      image: '/projects/drivemind/history.png',
      value: '0—100',
    },
  ]
  const [active, setActive] = useState(0)
  const step = steps[active]

  return (
    <section id="walkthrough" className="scroll-mt-28 mt-24 md:mt-32">
      <StoryIntro
        index="01"
        title={{ en: 'From a frame to a risk decision.', zh: '从画面到风险判断。' }}
        copy={{
          en: 'Three views show the path from perception to a reviewable recommendation.',
          zh: '三个视图依次呈现感知、上下文分析与决策结果。',
        }}
      />

      <div className="mt-4 grid overflow-hidden bg-[#e8ece8] lg:grid-cols-[0.42fr_1.58fr]">
        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex gap-2 lg:flex-col">
            {steps.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActive(index)}
                className={`group flex flex-1 items-center justify-between border-b px-0 py-4 text-left text-xs transition-colors duration-200 lg:flex-none ${
                  active === index
                    ? 'border-[#191919] text-[#191919]'
                    : 'border-[#191919]/12 text-[#191919]/38 hover:text-[#191919]'
                }`}
              >
                <span>
                  <span className="mr-3 text-[9px] opacity-45">0{index + 1}</span>
                  {t(item.label)}
                </span>
                <ArrowRight
                  className={`hidden h-4 w-4 transition-transform duration-200 lg:block ${
                    active === index ? 'translate-x-1' : ''
                  }`}
                />
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.24 }}
              className="mt-auto pt-14"
            >
              <p className="font-serif text-5xl tracking-[-0.04em]">{step.value}</p>
              <h3 className="mt-5 font-serif text-2xl tracking-tight">
                {localize(step.title, language)}
              </h3>
              <p className="mt-3 max-w-sm text-xs leading-6 text-[#191919]/52">
                {localize(step.copy, language)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative min-h-[420px] overflow-hidden bg-white sm:min-h-[620px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={step.image}
              src={optimizedImagePath(step.image, 'webp')}
              alt={localize(step.title, language)}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.34 }}
              className="absolute inset-0 h-full w-full object-contain object-center"
            />
          </AnimatePresence>
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
        </div>
      </div>
    </section>
  )
}

function MedSynthStory() {
  const { language, t } = useLanguage()
  const [position, setPosition] = useState(52)

  return (
    <section id="walkthrough" className="scroll-mt-28 mt-24 md:mt-32">
      <StoryIntro
        index="02"
        title={{ en: 'Read the model across epochs.', zh: '沿训练过程查看生成结果。' }}
        copy={{
          en: 'The comparison surface places an earlier checkpoint beside the retained later output.',
          zh: '拖动分隔线，对比早期权重与后续保留结果。',
        }}
      />

      <div className="mt-4 bg-[#ece8e2] p-4 sm:p-7 md:p-10">
        <div className="relative aspect-[16/9] overflow-hidden bg-white">
          <OptimizedImage
            src="/projects/medsynth/comparison.png"
            alt={language === 'zh' ? '后续训练结果' : 'Later training output'}
            className="absolute inset-0 h-full w-full object-contain"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <OptimizedImage
              src="/projects/medsynth/comparison-epoch06.png"
              alt={language === 'zh' ? '早期训练结果' : 'Earlier training output'}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>
          <div
            className="absolute bottom-0 top-0 w-px bg-[#191919]"
            style={{ left: `${position}%` }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#191919] text-[10px] text-white shadow-lg">
              ↔
            </span>
          </div>
          <span className="absolute left-4 top-4 bg-white/88 px-3 py-2 text-[8px] uppercase tracking-[0.13em] backdrop-blur">
            Epoch 06
          </span>
          <span className="absolute right-4 top-4 bg-white/88 px-3 py-2 text-[8px] uppercase tracking-[0.13em] backdrop-blur">
            Later output
          </span>
          <input
            type="range"
            min="8"
            max="92"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            aria-label={t('Drag to compare epochs')}
          />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto_auto] sm:items-end">
          <div>
            <p className="space-label">{t('Drag to compare epochs')}</p>
            <p className="mt-3 max-w-xl text-xs leading-5 text-[#191919]/48">
              {language === 'zh'
                ? '观察结构保持、组织边界与模态外观随训练推进产生的变化。'
                : 'Follow changes in structure, tissue boundaries, and modality appearance as training progresses.'}
            </p>
          </div>
          <div className="border-t border-[#191919]/15 pt-4 sm:w-36">
            <p className="font-serif text-3xl">16.41</p>
            <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-[#191919]/36">
              T1→T2 PSNR
            </p>
          </div>
          <div className="border-t border-[#191919]/15 pt-4 sm:w-36">
            <p className="font-serif text-3xl">0.479</p>
            <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-[#191919]/36">
              T1→T2 SSIM
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function SlopeStory() {
  const { language, t } = useLanguage()
  const steps: StoryStep[] = [
    {
      label: 'Monitoring',
      title: { en: 'Command center', zh: '指挥中心' },
      copy: {
        en: 'Map layers combine slope locations, alerts, devices, and regional status.',
        zh: '地图汇总边坡位置、告警、设备与区域状态。',
      },
      image: '/projects/slope-sentinel/command-center.png',
    },
    {
      label: 'Warning',
      title: { en: 'Warning center', zh: '预警中心' },
      copy: {
        en: 'Graded warnings enter a shared operational queue with traceable status.',
        zh: '分级预警进入统一队列，并保留可追踪状态。',
      },
      image: '/projects/slope-sentinel/warning-center.png',
    },
    {
      label: 'Dispatch',
      title: { en: 'Work-order dispatch', zh: '工单派发' },
      copy: {
        en: 'An alert becomes an assigned task with ownership, resources, and progress.',
        zh: '告警转化为包含负责人、资源和进度的处置任务。',
      },
      image: '/projects/slope-sentinel/work-orders.png',
    },
    {
      label: 'Review',
      title: { en: 'Event review', zh: '事件复盘' },
      copy: {
        en: 'The detail view keeps the timeline, records, participants, and closure state together.',
        zh: '详情页统一保留时间线、处置记录、参与人员与闭环状态。',
      },
      image: '/projects/slope-sentinel/work-order-detail.png',
    },
  ]
  const [active, setActive] = useState(0)
  const step = steps[active]

  return (
    <section id="walkthrough" className="scroll-mt-28 mt-24 md:mt-32">
      <StoryIntro
        index="03"
        title={{ en: 'One event, four operational views.', zh: '一个事件，四个业务视图。' }}
        copy={{
          en: 'The interface follows risk from the map to warning, assignment, and review.',
          zh: '界面沿着风险从地图监测进入预警、派单和复盘。',
        }}
      />

      <div className="mt-4 overflow-hidden bg-[#e7ebe0]">
        <div className="grid grid-cols-2 border-b border-[#191919]/10 md:grid-cols-4">
          {steps.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
              className={`border-[#191919]/10 px-4 py-5 text-left transition-colors duration-200 md:border-l md:first:border-l-0 ${
                active === index ? 'bg-[#191919] text-white' : 'hover:bg-white/45'
              }`}
            >
              <span className="block text-[8px] opacity-45">0{index + 1}</span>
              <span className="mt-2 block text-xs font-medium">{t(item.label)}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.45fr_0.55fr]">
          <div className="relative min-h-[420px] overflow-hidden bg-white sm:min-h-[620px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={step.image}
                src={optimizedImagePath(step.image, 'webp')}
                alt={localize(step.title, language)}
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 h-full w-full object-contain object-center"
              />
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-end p-7 sm:p-9"
            >
              <p className="space-label">{t(step.label)}</p>
              <h3 className="mt-4 font-serif text-3xl tracking-tight">
                {localize(step.title, language)}
              </h3>
              <p className="mt-4 text-sm leading-6 text-[#191919]/52">
                {localize(step.copy, language)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function GraphStory() {
  const { language, t } = useLanguage()
  const [view, setView] = useState<'scale' | 'training' | 'ranking'>('scale')

  const content = useMemo(
    () => ({
      scale: {
        label: 'Graph scale',
        title: language === 'zh' ? '交互图规模' : 'Interaction graph scale',
        image: '/projects/graph-interest/training-report.png',
        facts: [
          ['1,088,545', language === 'zh' ? '节点' : 'nodes'],
          ['159.22M', language === 'zh' ? '边' : 'edges'],
          ['146.27', language === 'zh' ? '平均度' : 'average degree'],
        ],
      },
      training: {
        label: 'Training trace',
        title: language === 'zh' ? '二十轮训练记录' : 'Twenty-epoch training trace',
        image: '/projects/graph-interest/loss-curve.png',
        facts: [
          ['0.8903', language === 'zh' ? '初始损失' : 'initial loss'],
          ['0.7132', language === 'zh' ? '最终损失' : 'final loss'],
          ['20', language === 'zh' ? '训练轮次' : 'epochs'],
        ],
      },
      ranking: {
        label: 'Ranking',
        title: language === 'zh' ? '实际排序基线' : 'Recorded ranking baseline',
        image: '/projects/graph-interest/training-report.png',
        facts: [
          ['0.0122', 'Recall@20'],
          ['0.0050', 'NDCG@20'],
          ['0.0240', 'HR@20'],
        ],
      },
    }),
    [language],
  )
  const active = content[view]

  return (
    <section id="walkthrough" className="scroll-mt-28 mt-24 md:mt-32">
      <StoryIntro
        index="04"
        title={{ en: 'Follow the graph from scale to ranking.', zh: '从图规模走向推荐排序。' }}
        copy={{
          en: 'Three views connect dataset structure, optimization, and the recorded ranking baseline.',
          zh: '三个视图连接数据结构、训练过程与实际排序结果。',
        }}
      />

      <div className="mt-4 grid overflow-hidden bg-[#e4e8e9] lg:grid-cols-[0.55fr_1.45fr]">
        <div className="flex flex-col p-6 sm:p-9">
          <div className="flex flex-wrap gap-2">
            {(['scale', 'training', 'ranking'] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setView(item)}
                className={`rounded-full px-4 py-2 text-[10px] font-medium transition-colors duration-200 ${
                  view === item
                    ? 'bg-[#191919] text-white'
                    : 'border border-[#191919]/15 bg-white/30 text-[#191919]/48 hover:bg-white/70'
                }`}
              >
                {t(content[item].label)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-16 lg:mt-auto"
            >
              <h3 className="font-serif text-3xl tracking-tight">{active.title}</h3>
              <div className="mt-8 grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
                {active.facts.map(([value, label]) => (
                  <div key={label} className="border-t border-[#191919]/15 pt-4">
                    <p className="font-serif text-3xl tracking-tight">{value}</p>
                    <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-[#191919]/38">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative min-h-[420px] bg-white sm:min-h-[620px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={active.image}
              src={optimizedImagePath(active.image, 'webp')}
              alt={active.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </AnimatePresence>
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
        </div>
      </div>
    </section>
  )
}

function VidHarmStory() {
  const { language, t } = useLanguage()
  const views = [
    {
      label: 'Vision',
      image: '/projects/vidharm/confusion-matrix.png',
      value: '0.4567',
      title: { en: 'Vision baseline', zh: '视觉基线' },
      copy: {
        en: 'Frame-level visual features establish the initial four-class benchmark.',
        zh: '视频帧视觉特征构成四分类任务的初始基线。',
      },
    },
    {
      label: 'Text',
      image: '/projects/vidharm/label-distribution.png',
      value: '3,589',
      title: { en: 'Dataset inventory', zh: '数据集盘点' },
      copy: {
        en: 'The label distribution makes the majority-class pressure visible before training.',
        zh: '标签分布在训练前呈现多数类别带来的偏置压力。',
      },
    },
    {
      label: 'Fusion',
      image: '/projects/vidharm/architecture.png',
      value: '0.4932',
      title: { en: 'Multimodal fusion', zh: '多模态融合' },
      copy: {
        en: 'Visual, audio, and text representations are combined for the retained multimodal result.',
        zh: '视觉、音频与文本表征共同形成保留的多模态结果。',
      },
    },
    {
      label: 'Review',
      image: '/projects/vidharm/upload-interface.png',
      value: '+0.0365',
      title: { en: 'Review workflow', zh: '审核工作流' },
      copy: {
        en: 'The application surfaces the prediction and supporting signals for human review.',
        zh: '应用界面向审核人员呈现预测结果与相关信号。',
      },
    },
  ]
  const [active, setActive] = useState(0)
  const view = views[active]

  return (
    <section id="walkthrough" className="scroll-mt-28 mt-24 md:mt-32">
      <StoryIntro
        index="05"
        title={{ en: 'Four views of one review decision.', zh: '一次审核决策的四个视图。' }}
        copy={{
          en: 'Dataset shape, modality signals, fusion, and the review interface are shown together.',
          zh: '数据分布、模态信号、融合结果与审核界面在同一流程中展开。',
        }}
      />

      <div className="mt-4 bg-[#ece3df]">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {views.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
              className={`border-b border-[#191919]/10 px-5 py-5 text-left transition-colors duration-200 lg:border-l lg:first:border-l-0 ${
                active === index ? 'bg-[#191919] text-white' : 'hover:bg-white/45'
              }`}
            >
              <span className="text-[8px] opacity-45">0{index + 1}</span>
              <span className="mt-2 block text-xs font-medium">{t(item.label)}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative min-h-[430px] bg-white sm:min-h-[620px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={view.image}
                src={optimizedImagePath(view.image, 'webp')}
                alt={localize(view.title, language)}
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={view.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-end p-7 sm:p-9"
            >
              <p className="font-serif text-5xl tracking-[-0.045em]">{view.value}</p>
              <h3 className="mt-6 font-serif text-3xl tracking-tight">
                {localize(view.title, language)}
              </h3>
              <p className="mt-4 text-sm leading-6 text-[#191919]/52">
                {localize(view.copy, language)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export function ProjectStory({ project }: StoryProps) {
  switch (project.slug) {
    case 'drivemind':
      return <DriveMindStory />
    case 'medsynth':
      return <MedSynthStory />
    case 'slope-sentinel':
      return <SlopeStory />
    case 'graph-interest':
      return <GraphStory />
    case 'vidharm':
      return <VidHarmStory />
    default:
      return null
  }
}
