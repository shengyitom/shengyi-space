import type { LocalizedText } from './site'

export type EvidenceState = 'Verified' | 'Documented' | 'Prototype'

export type EvidenceIndexItem = {
  label: LocalizedText
  detail: LocalizedText
  state: EvidenceState
}

export type EngineeringDecision = {
  title: LocalizedText
  detail: LocalizedText
}

export type EvaluationRow = {
  metric: string
  value: string
  context: LocalizedText
}

export type EvidenceArtifact = {
  src: string
  title: LocalizedText
  caption: LocalizedText
  kind: LocalizedText
  span?: 'wide' | 'half'
  fit?: 'cover' | 'contain'
  position?: 'center' | 'top'
}

export type ProjectEvidence = {
  sourceNote: LocalizedText
  index: EvidenceIndexItem[]
  decisions: EngineeringDecision[]
  evaluation: {
    title: LocalizedText
    summary: LocalizedText
    rows: EvaluationRow[]
    note: LocalizedText
  }
  artifacts: EvidenceArtifact[]
  limitations: LocalizedText[]
}

const text = (en: string, zh: string): LocalizedText => ({ en, zh })

export const projectEvidence: Record<string, ProjectEvidence> = {
  drivemind: {
    sourceNote: text(
      'Repository records used here include the project interface, training outputs, results.csv, validation images, and system documentation.',
      '本页使用的仓库记录包括项目界面、训练输出、results.csv、验证图像与系统文档。',
    ),
    index: [
      {
        label: text('Model training', '模型训练'),
        detail: text('80 recorded YOLOv8 epochs', '80 轮 YOLOv8 训练记录'),
        state: 'Verified',
      },
      {
        label: text('Evaluation', '模型评估'),
        detail: text('Curves, CSV, and confusion matrix', '曲线、CSV 与混淆矩阵'),
        state: 'Verified',
      },
      {
        label: text('Inference evidence', '推理证据'),
        detail: text('Saved validation predictions', '已保存验证集预测结果'),
        state: 'Verified',
      },
      {
        label: text('Decision product', '决策产品'),
        detail: text('Context, history, and comparison UI', '上下文、历史与对比界面'),
        state: 'Verified',
      },
      {
        label: text('Risk logic', '风险逻辑'),
        detail: text('0–100 explainable rule layer', '0–100 可解释规则层'),
        state: 'Documented',
      },
    ],
    decisions: [
      {
        title: text('Separate perception from decision.', '将感知与决策分离。'),
        detail: text(
          'YOLOv8 produces scene evidence; a separate context layer combines weather, road, speed, visibility, and driver state before a recommendation is made.',
          'YOLOv8 只负责产生场景证据；独立上下文层再融合天气、道路、速度、能见度与驾驶员状态，最终形成建议。',
        ),
      },
      {
        title: text('Prefer an inspectable risk engine.', '优先采用可检查的风险引擎。'),
        detail: text(
          'A transparent 0–100 rule score makes contributing factors visible, which is more appropriate for a decision-support prototype than an opaque end-to-end score.',
          '透明的 0–100 规则评分可以显示各影响因素；对于决策支持原型，它比不透明的端到端分数更合适。',
        ),
      },
      {
        title: text('Make every run a reusable record.', '让每次分析都成为可复用记录。'),
        detail: text(
          'Results are persisted for history, multi-scene comparison, chart analysis, and PDF export.',
          '分析结果会被保存，用于历史查询、多场景对比、图表分析与 PDF 导出。',
        ),
      },
    ],
    evaluation: {
      title: text('Detection checkpoint evidence', '目标检测权重证据'),
      summary: text(
        'The repository contains an 80-epoch YOLOv8 run. The strongest mAP50 row occurs at epoch 55; the values below are read directly from results.csv.',
        '仓库中保留了一次 80 轮 YOLOv8 训练。mAP50 最佳记录出现在第 55 轮；以下数据直接读取自 results.csv。',
      ),
      rows: [
        {
          metric: 'mAP50',
          value: '0.543',
          context: text('Best recorded value · epoch 55', '最佳记录值 · 第 55 轮'),
        },
        {
          metric: 'mAP50–95',
          value: '0.345',
          context: text('At the same checkpoint', '同一权重记录'),
        },
        {
          metric: 'Precision',
          value: '0.799',
          context: text('Bounding-box precision', '目标框精确率'),
        },
        {
          metric: 'Recall',
          value: '0.479',
          context: text('Bounding-box recall', '目标框召回率'),
        },
      ],
      note: text(
        'This detector is at research-prototype stage. Lower recall and confusion with background define the next model iteration before any safety-oriented deployment.',
        '当前检测器处于研究原型阶段。较低召回率以及与背景类别的混淆，明确了进入安全场景部署前的优化方向。',
      ),
    },
    artifacts: [
      {
        src: '/projects/drivemind/training.png',
        title: text('80-epoch training record', '80 轮训练记录'),
        caption: text(
          'Loss, precision, recall, mAP50, and mAP50–95 retained as one training artifact.',
          '在同一训练产物中保留损失、精确率、召回率、mAP50 与 mAP50–95。',
        ),
        kind: text('Evaluation', '评估'),
        span: 'wide',
        fit: 'contain',
      },
      {
        src: '/projects/drivemind/confusion-matrix.png',
        title: text('Validation confusion matrix', '验证集混淆矩阵'),
        caption: text(
          'Class-level evidence exposes the strong truck/car classes and the weak motorcycle/background boundary.',
          '类别级证据同时呈现卡车、汽车的有效识别，以及摩托车与背景边界上的不足。',
        ),
        kind: text('Evaluation', '评估'),
        fit: 'contain',
      },
      {
        src: '/projects/drivemind/prediction.jpg',
        title: text('Saved validation predictions', '已保存的验证集预测'),
        caption: text(
          'Model boxes are preserved on validation frames alongside the aggregate metrics.',
          '预测框与汇总指标一同保留在验证图像上。',
        ),
        kind: text('Inference', '推理'),
        fit: 'cover',
      },
      {
        src: '/projects/drivemind/history.png',
        title: text('Decision history workspace', '决策历史工作台'),
        caption: text(
          'The application turns an inference into searchable, comparable decision records.',
          '应用将单次推理转化为可查询、可比较的决策记录。',
        ),
        kind: text('Product', '产品'),
        span: 'wide',
        fit: 'cover',
        position: 'top',
      },
    ],
    limitations: [
      text(
        'Recall remains substantially below precision, so missed objects are a known risk.',
        '召回率明显低于精确率，漏检仍是已知风险。',
      ),
      text(
        'The rule-based risk layer needs scenario calibration and validation with domain experts.',
        '规则风险层仍需通过更多场景和领域专家进行校准验证。',
      ),
      text(
        'The current interface demonstrates decision support. Integration with a vehicle control loop remains future work.',
        '当前界面用于决策支持演示，尚未接入真实车辆控制闭环。',
      ),
    ],
  },

  medsynth: {
    sourceNote: text(
      'Repository records used here include dataset summaries, generated sample grids, epoch metrics, training curves, checkpoints, and the project completion report.',
      '本页使用的仓库记录包括数据集摘要、生成样例、逐轮指标、训练曲线、模型权重与项目完成报告。',
    ),
    index: [
      {
        label: text('Dataset pipeline', '数据流水线'),
        detail: text('98,781 prepared MRI slices', '98,781 张预处理 MRI 切片'),
        state: 'Verified',
      },
      {
        label: text('Training record', '训练记录'),
        detail: text('17 captured metric epochs', '17 轮可视化指标记录'),
        state: 'Verified',
      },
      {
        label: text('Qualitative evidence', '定性证据'),
        detail: text('Real → fake → recovered grids', '真实 → 生成 → 重建对比'),
        state: 'Verified',
      },
      {
        label: text('Quantitative evaluation', '量化评估'),
        detail: text('PSNR, SSIM, MAE, and MSE', 'PSNR、SSIM、MAE 与 MSE'),
        state: 'Documented',
      },
      {
        label: text('Application layer', '应用层'),
        detail: text('Six Streamlit workflows', '六类 Streamlit 工作流'),
        state: 'Documented',
      },
    ],
    decisions: [
      {
        title: text('Use unpaired translation.', '采用非配对模态转换。'),
        detail: text(
          'CycleGAN avoids requiring perfectly aligned T1/T2 pairs, which are difficult to obtain in medical imaging datasets.',
          'CycleGAN 不要求严格对齐的 T1/T2 配对样本，更符合医学影像数据难以获得完美配对的现实。',
        ),
      },
      {
        title: text('Preserve anatomy through multiple objectives.', '通过多项目标保持解剖结构。'),
        detail: text(
          'Adversarial, cycle, identity, SSIM, and VGG19 perceptual objectives jointly constrain modality style and anatomical preservation.',
          '对抗、循环一致性、身份、SSIM 与 VGG19 感知目标共同约束模态风格与解剖结构保留。',
        ),
      },
      {
        title: text('Trade resolution for iteration speed.', '以分辨率换取迭代速度。'),
        detail: text(
          'The recorded run uses 128×128 images, 3,000 samples per domain, AMP, and early stopping so the research loop remains tractable on a 12 GB GPU.',
          '记录实验采用 128×128 图像、每域 3,000 个样本、AMP 与早停，使研究循环能在 12 GB GPU 上完成。',
        ),
      },
    ],
    evaluation: {
      title: text('Bidirectional MRI translation', '双向 MRI 模态转换'),
      summary: text(
        'The report evaluates both T1→T2 and T2→T1. The asymmetry is important: T1→T2 performs better across every retained metric.',
        '项目报告同时评估 T1→T2 与 T2→T1。结果具有明显方向差异：T1→T2 在所有记录指标上表现更好。',
      ),
      rows: [
        {
          metric: 'T1→T2 PSNR',
          value: '16.41 dB',
          context: text('±1.04 · pixel fidelity', '±1.04 · 像素保真度'),
        },
        {
          metric: 'T1→T2 SSIM',
          value: '0.479',
          context: text('±0.079 · structure similarity', '±0.079 · 结构相似性'),
        },
        {
          metric: 'T2→T1 PSNR',
          value: '14.96 dB',
          context: text('±1.05 · pixel fidelity', '±1.05 · 像素保真度'),
        },
        {
          metric: 'T2→T1 SSIM',
          value: '0.384',
          context: text('±0.106 · structure similarity', '±0.106 · 结构相似性'),
        },
      ],
      note: text(
        'These metrics describe a working research baseline. Clinical validation would require an expert reader study and diagnostic-equivalence testing.',
        '这些指标描述了一个可运行的研究基线。临床验证仍需要医学专家盲评与诊断等价性测试。',
      ),
    },
    artifacts: [
      {
        src: '/projects/medsynth/comparison.png',
        title: text('Epoch 16 synthesis grid', '第 16 轮生成对比'),
        caption: text(
          'Real, translated, and cycle-recovered images make both modality change and structural drift visible.',
          '真实、模态转换与循环重建图像并排呈现，使模态变化和结构偏移都可被观察。',
        ),
        kind: text('Qualitative result', '定性结果'),
        span: 'wide',
        fit: 'contain',
      },
      {
        src: '/projects/medsynth/training-curves.png',
        title: text('Multi-objective training curves', '多目标训练曲线'),
        caption: text(
          'Generator, discriminator, adversarial, cycle, identity, and SSIM losses are recorded separately.',
          '生成器、判别器、对抗、循环一致性、身份与 SSIM 损失被分别记录。',
        ),
        kind: text('Training', '训练'),
        fit: 'contain',
      },
      {
        src: '/projects/medsynth/metrics-epoch17.png',
        title: text('Latest retained epoch metrics', '最新保留轮次指标'),
        caption: text(
          'The epoch-17 artifact exposes the instability expected in adversarial optimization.',
          '第 17 轮指标产物清楚呈现了对抗训练中预期存在的波动。',
        ),
        kind: text('Evaluation', '评估'),
        fit: 'contain',
      },
      {
        src: '/projects/medsynth/comparison-epoch06.png',
        title: text('Earlier iteration sample', '早期迭代样例'),
        caption: text(
          'An earlier checkpoint is retained so progress can be judged across multiple epochs.',
          '项目保留了较早权重样例，便于跨轮次判断训练进展。',
        ),
        kind: text('Iteration', '迭代'),
        span: 'wide',
        fit: 'contain',
      },
    ],
    limitations: [
      text(
        'The recorded run uses 128×128 inputs and a 3,000-image sample from each prepared domain.',
        '记录实验使用 128×128 输入和每域 3,000 张采样数据，并未使用全部预处理数据。',
      ),
      text(
        'SSIM values remain modest, especially for T2→T1, indicating structural fidelity still needs work.',
        'SSIM 仍然有限，尤其是 T2→T1，说明结构保真度仍需继续提升。',
      ),
      text(
        'Ablation studies, LPIPS, 3D consistency, and medical-expert review remain future work.',
        '消融实验、LPIPS、三维一致性与医学专家评审仍属于后续工作。',
      ),
    ],
  },

  'slope-sentinel': {
    sourceNote: text(
      'Repository records used here include sixteen product screens, the development specification, frontend and backend manifests, workflow diagrams, and the API-oriented implementation structure.',
      '本页使用的仓库记录包括 16 张产品截图、开发方案、前后端依赖清单、流程图与面向 API 的实现结构。',
    ),
    index: [
      {
        label: text('Product surface', '产品界面'),
        detail: text('16 captured operational screens', '16 张业务界面截图'),
        state: 'Verified',
      },
      {
        label: text('Warning loop', '预警闭环'),
        detail: text('Risk → warning → response', '风险 → 预警 → 响应'),
        state: 'Verified',
      },
      {
        label: text('Emergency workflow', '应急工作流'),
        detail: text('Orders, resources, and tracking', '工单、资源与进度跟踪'),
        state: 'Verified',
      },
      {
        label: text('System architecture', '系统架构'),
        detail: text('Vue, Spring, FastAPI, GIS', 'Vue、Spring、FastAPI、GIS'),
        state: 'Documented',
      },
      {
        label: text('External integrations', '外部数据接入'),
        detail: text('Weather, satellite, and devices', '气象、卫星与监测设备'),
        state: 'Prototype',
      },
    ],
    decisions: [
      {
        title: text('Make the map the operating surface.', '让地图成为业务操作界面。'),
        detail: text(
          'Slope objects, risk points, satellite results, devices, resources, and response routes share one spatial context through OpenLayers.',
          '边坡对象、风险点、卫星结果、监测设备、资源与响应路线通过 OpenLayers 共享同一空间上下文。',
        ),
      },
      {
        title: text('Design around a closed operational loop.', '围绕业务闭环设计。'),
        detail: text(
          'The information architecture follows monitor → assess → warn → dispatch → close → review, so dashboards and CRUD pages support one continuous event.',
          '信息架构遵循监测 → 评估 → 预警 → 调度 → 关闭 → 复盘，使驾驶舱与管理页面共同服务于一个连续事件。',
        ),
      },
      {
        title: text('Decouple analysis from business state.', '将分析服务与业务状态解耦。'),
        detail: text(
          'Spring Boot owns identity, archives, warnings, and orders, while FastAPI is reserved for remote-sensing and risk-analysis tasks.',
          'Spring Boot 管理身份、档案、预警与工单，FastAPI 则专门承载遥感和风险分析任务。',
        ),
      },
    ],
    evaluation: {
      title: text('Operational coverage evidence', '业务覆盖证据'),
      summary: text(
        'Workflow coverage is the primary evaluation axis for this system. Retained screens cover monitoring, warning, dispatch, response, and event closure.',
        '工作流覆盖度是该系统的主要评估维度。保留界面覆盖监测、预警、派单、处置与事件闭环。',
      ),
      rows: [
        {
          metric: 'Captured screens',
          value: '16',
          context: text('Dashboard, archives, monitoring, AI, warnings, orders, reports', '驾驶舱、档案、监测、AI、预警、工单与报表'),
        },
        {
          metric: 'Core modules',
          value: '7',
          context: text('Defined in the implementation specification', '开发方案中定义的核心业务模块'),
        },
        {
          metric: 'Delivery surfaces',
          value: '3',
          context: text('PC console · H5 response · command center', 'PC 管理端 · H5 响应端 · 指挥大屏'),
        },
        {
          metric: 'Data layers',
          value: '3',
          context: text('MySQL · Redis · MinIO', 'MySQL · Redis · MinIO'),
        },
      ],
      note: text(
        'The design document lists targets of 1,000 slopes, 500 devices, and 200 concurrent users. A retained load-test report is still required to evaluate those targets.',
        '设计文档列出了 1,000 个边坡、500 台设备与 200 并发用户的目标，后续仍需通过正式压测报告进行评估。',
      ),
    },
    artifacts: [
      {
        src: '/projects/slope-sentinel/command-center.png',
        title: text('Emergency command center', '应急指挥中心'),
        caption: text(
          'Warnings, topology, resources, work orders, device state, and AI tasks are composed into one operational view.',
          '预警、拓扑、资源、工单、设备状态与 AI 任务被组织在同一指挥视图中。',
        ),
        kind: text('Command', '指挥'),
        span: 'wide',
        fit: 'cover',
        position: 'top',
      },
      {
        src: '/projects/slope-sentinel/warning-center.png',
        title: text('Graded warning center', '分级预警中心'),
        caption: text(
          'Warning state, affected objects, confidence, and handling progress remain visible together.',
          '预警状态、影响对象、置信信息与处置进度在同一页面中可见。',
        ),
        kind: text('Warning', '预警'),
        fit: 'cover',
        position: 'top',
      },
      {
        src: '/projects/slope-sentinel/work-orders.png',
        title: text('Emergency work-order queue', '应急工单队列'),
        caption: text(
          'Each risk can become an assigned operational task with ownership and progress.',
          '每项风险都可以转化为包含负责人和处理进度的业务任务。',
        ),
        kind: text('Workflow', '工作流'),
        fit: 'cover',
        position: 'top',
      },
      {
        src: '/projects/slope-sentinel/work-order-detail.png',
        title: text('Tracked response detail', '处置过程详情'),
        caption: text(
          'The detail view preserves ownership, timeline, evidence, resources, and closure state.',
          '详情页面保留责任人、时间线、证据、资源与关闭状态。',
        ),
        kind: text('Response', '处置'),
        span: 'wide',
        fit: 'cover',
        position: 'top',
      },
    ],
    limitations: [
      text(
        'Real satellite, weather, and device adapters remain integration work; current flows support controlled demonstration data.',
        '真实卫星、气象与设备适配仍需继续集成；当前流程主要支持受控演示数据。',
      ),
      text(
        'Capacity figures currently remain architecture targets pending benchmark testing.',
        '容量数字目前属于架构目标，仍需基准测试确认。',
      ),
      text(
        'Risk scoring needs calibration against field events before it can support safety-critical operations.',
        '风险评分必须通过真实现场事件校准后，才能用于安全关键业务。',
      ),
    ],
  },

  'graph-interest': {
    sourceNote: text(
      'Repository records used here include graph_stats.json, the sampled graph record, training_history.json, evaluation_results.csv, generated reports, and implementation documentation.',
      '本页使用的仓库记录包括 graph_stats.json、采样图记录、training_history.json、evaluation_results.csv、生成报告与实现文档。',
    ),
    index: [
      {
        label: text('Raw graph', '原始图数据'),
        detail: text('Nodes, edges, and degree statistics', '节点、边与度数统计'),
        state: 'Verified',
      },
      {
        label: text('Training history', '训练历史'),
        detail: text('20 epochs with time and LR', '20 轮损失、耗时与学习率'),
        state: 'Verified',
      },
      {
        label: text('Ranking evaluation', '排序评估'),
        detail: text('Recall, Precision, NDCG, HR', 'Recall、Precision、NDCG、HR'),
        state: 'Verified',
      },
      {
        label: text('Recommendation layer', '推荐层'),
        detail: text('Top-K and explanation workflow', 'Top-K 与推荐解释流程'),
        state: 'Documented',
      },
      {
        label: text('Baseline comparison', '基线对比'),
        detail: text('Comparison artifact pending', '对比实验产物待补充'),
        state: 'Prototype',
      },
    ],
    decisions: [
      {
        title: text('Model interactions as structure.', '把交互建模为结构。'),
        detail: text(
          'User–answer behavior becomes a bipartite graph so collaborative signals can travel beyond isolated profile features.',
          '用户—回答行为被构造成二部图，使协同信号可以超越孤立的用户画像进行传播。',
        ),
      },
      {
        title: text('Use a sampled graph for iteration.', '使用采样图进行迭代。'),
        detail: text(
          'The full graph contains 159.22 million edges; a retained sampled graph with 6.61 million edges makes local training and debugging feasible.',
          '完整图包含 1.5922 亿条边；保留的 661 万边采样图让本地训练与调试成为可能。',
        ),
      },
      {
        title: text('Keep evaluation artifacts machine-readable.', '让评估产物保持机器可读。'),
        detail: text(
          'Training history and ranking metrics are stored as JSON/CSV and used directly in the project record.',
          '训练历史与排序指标以 JSON/CSV 保存，并直接用于项目记录。',
        ),
      },
    ],
    evaluation: {
      title: text('Graph scale and ranking baseline', '图规模与排序基线'),
      summary: text(
        'The retained artifacts show a large graph and a converging training objective, but weak ranking quality. Presenting both is more useful than hiding the gap.',
        '保留产物证明图规模很大、训练目标能够收敛，但排序质量仍然较弱。完整呈现二者，比隐藏差距更有价值。',
      ),
      rows: [
        {
          metric: 'Full graph',
          value: '1.09M',
          context: text('1,088,545 nodes · 159.22M edges', '1,088,545 个节点 · 1.5922 亿条边'),
        },
        {
          metric: 'Training loss',
          value: '0.890→0.713',
          context: text('20 retained epochs', '20 轮保留训练记录'),
        },
        {
          metric: 'Recall@20',
          value: '0.0122',
          context: text('Read from evaluation_results.csv', '读取自 evaluation_results.csv'),
        },
        {
          metric: 'NDCG@20',
          value: '0.0050',
          context: text('Read from evaluation_results.csv', '读取自 evaluation_results.csv'),
        },
      ],
      note: text(
        'Some narrative documents contain higher example metrics, but the website deliberately uses the lower values in the retained evaluation CSV because they are the reproducible artifact.',
        '部分说明文档中出现了更高的示例指标，但网站刻意采用评估 CSV 中较低的实际数值，因为它们才是可复现产物。',
      ),
    },
    artifacts: [
      {
        src: '/projects/graph-interest/training-report.png',
        title: text('Training report', '训练报告'),
        caption: text(
          'Loss, cosine learning-rate schedule, and per-epoch runtime are retained in a single generated report.',
          '损失、余弦学习率计划与每轮运行时间被保留在同一份生成报告中。',
        ),
        kind: text('Training', '训练'),
        span: 'wide',
        fit: 'contain',
      },
      {
        src: '/projects/graph-interest/loss-curve.png',
        title: text('Optimization trace', '优化轨迹'),
        caption: text(
          'The curve drops consistently before flattening near 0.713, making convergence behavior inspectable.',
          '损失持续下降，并在约 0.713 附近趋于平缓，使收敛行为可以被检查。',
        ),
        kind: text('Evaluation', '评估'),
        span: 'wide',
        fit: 'contain',
      },
    ],
    limitations: [
      text(
        'Actual Recall@K and NDCG@K are low; the current model should be treated as a graph-learning baseline.',
        '实际 Recall@K 与 NDCG@K 较低，当前模型应被视为图学习基线。',
      ),
      text(
        'Interaction sparsity and popularity bias require stronger sampling, negatives, and side information.',
        '交互稀疏与热门偏置需要更强的采样、负样本与侧信息处理。',
      ),
      text(
        'No reproducible matrix-factorization or popularity baseline was retained for direct comparison.',
        '仓库中未保留可复现的矩阵分解或热门度基线用于直接对比。',
      ),
    ],
  },

  vidharm: {
    sourceNote: text(
      'Repository records used here include the dataset inventory, class-distribution plots, vision and multimodal metrics JSON, confusion matrices, workflow diagrams, and review application.',
      '本页使用的仓库记录包括数据集盘点、类别分布图、视觉与多模态指标 JSON、混淆矩阵、流程图与审核应用。',
    ),
    index: [
      {
        label: text('Dataset audit', '数据盘点'),
        detail: text('3,589 videos across 3 splits', '3,589 条视频，三个数据划分'),
        state: 'Verified',
      },
      {
        label: text('Vision baseline', '视觉基线'),
        detail: text('30 epochs and test matrix', '30 轮训练与测试混淆矩阵'),
        state: 'Verified',
      },
      {
        label: text('Multimodal run', '多模态实验'),
        detail: text('Vision, audio, and text features', '视觉、音频与文本特征'),
        state: 'Verified',
      },
      {
        label: text('Review interface', '审核界面'),
        detail: text('Upload and result workflow', '上传与结果审核流程'),
        state: 'Verified',
      },
      {
        label: text('Production calibration', '生产校准'),
        detail: text('Threshold and policy tuning', '阈值与策略调优'),
        state: 'Prototype',
      },
    ],
    decisions: [
      {
        title: text('Audit the data before training.', '先盘点数据，再开始训练。'),
        detail: text(
          'The repository records split size, label counts, frame statistics, duration, FPS, and missing-file anomalies before model experiments.',
          '在模型实验前，仓库先记录各划分规模、标签数量、帧统计、时长、FPS 与缺失文件异常。',
        ),
      },
      {
        title: text('Keep modal paths separable.', '保持各模态路径可分离。'),
        detail: text(
          'Frame, audio, and text/CLIP features are prepared independently so single-modal and fused systems can be evaluated against each other.',
          '视频帧、音频与文本/CLIP 特征被独立准备，使单模态与融合系统可以相互对照。',
        ),
      },
      {
        title: text('Expose uncertainty to a reviewer.', '把不确定性呈现给审核者。'),
        detail: text(
          'The product uses a review workflow that keeps human judgment inside a sensitive decision.',
          '产品采用人工审核工作流，在敏感决策中保留人工判断。',
        ),
      },
    ],
    evaluation: {
      title: text('Vision vs. multimodal baseline', '视觉与多模态基线对比'),
      summary: text(
        'On the retained 419-item evaluation subset, multimodal fusion improves both accuracy and macro F1, but overall quality remains constrained by severe class imbalance.',
        '在保留的 419 条评估子集上，多模态融合同时提升了准确率与宏平均 F1，但整体质量仍受到严重类别不均衡的限制。',
      ),
      rows: [
        {
          metric: 'Vision macro F1',
          value: '0.457',
          context: text('Accuracy 0.508 · n=419', '准确率 0.508 · n=419'),
        },
        {
          metric: 'Multimodal F1',
          value: '0.493',
          context: text('Accuracy 0.558 · n=419', '准确率 0.558 · n=419'),
        },
        {
          metric: 'F1 gain',
          value: '+0.036',
          context: text('Absolute improvement over vision', '相对视觉基线的绝对提升'),
        },
        {
          metric: 'Majority class',
          value: '77.1%',
          context: text('2,767 of 3,589 videos', '3,589 条视频中的 2,767 条'),
        },
      ],
      note: text(
        'The 0.493 F1 establishes the current multimodal baseline. Deployment work still requires class rebalancing, confidence calibration, and stronger temporal modeling.',
        '0.493 的 F1 构成当前多模态基线。部署前仍需进行类别重平衡、置信度校准与更强的时序建模。',
      ),
    },
    artifacts: [
      {
        src: '/projects/vidharm/business-flow.png',
        title: text('End-to-end review flow', '端到端审核流程'),
        caption: text(
          'The diagram connects upload, preprocessing, multimodal inference, risk output, human review, and record storage.',
          '流程图连接上传、预处理、多模态推理、风险输出、人工审核与记录存储。',
        ),
        kind: text('Architecture', '架构'),
        span: 'wide',
        fit: 'contain',
      },
      {
        src: '/projects/vidharm/label-distribution.png',
        title: text('Dataset imbalance', '数据集类别不均衡'),
        caption: text(
          'The majority class contains 2,767 items while the smallest contains only 90, explaining part of the class-level error.',
          '多数类别包含 2,767 条数据，而最小类别仅有 90 条，这解释了部分分类误差。',
        ),
        kind: text('Data audit', '数据盘点'),
        fit: 'contain',
      },
      {
        src: '/projects/vidharm/confusion-matrix.png',
        title: text('Vision test confusion matrix', '视觉基线测试混淆矩阵'),
        caption: text(
          'The 419-item matrix exposes minority-class confusion alongside the aggregate score.',
          '419 条样本的混淆矩阵在汇总指标之外呈现少数类别的混淆情况。',
        ),
        kind: text('Evaluation', '评估'),
        fit: 'contain',
      },
      {
        src: '/projects/vidharm/upload-interface.png',
        title: text('Human review entry point', '人工审核入口'),
        caption: text(
          'A practical upload flow turns research artifacts into a repeatable reviewer interaction.',
          '实用的上传流程将研究产物转化为可重复的审核者交互。',
        ),
        kind: text('Product', '产品'),
        span: 'wide',
        fit: 'cover',
        position: 'top',
      },
    ],
    limitations: [
      text(
        'The dataset is severely imbalanced: the majority label accounts for more than three quarters of all videos.',
        '数据集严重不均衡：多数标签占全部视频的四分之三以上。',
      ),
      text(
        'The vision run shows overfitting as training loss falls while validation loss rises after the early epochs.',
        '视觉实验存在过拟合：训练损失持续下降，而验证损失在早期轮次后上升。',
      ),
      text(
        'Multimodal F1 remains below 0.5 and requires calibration before any real moderation workflow.',
        '多模态 F1 仍低于 0.5，进入真实审核流程前需要进一步校准。',
      ),
    ],
  },
}
