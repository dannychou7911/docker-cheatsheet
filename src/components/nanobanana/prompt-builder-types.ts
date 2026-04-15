export interface ParamOption {
  value: string
  label: string
}

export interface ParamDef {
  name: string
  label: string
  type: 'text' | 'number' | 'select' | 'multi-select' | 'boolean'
  required?: boolean
  placeholder?: string
  options?: ParamOption[]
  default?: string | number | boolean
  min?: number
  max?: number
}

export interface CommandDef {
  id: string
  name: string
  syntax: string
  desc: string
  params: ParamDef[]
}

export const commandDefs: CommandDef[] = [
  {
    id: 'generate',
    name: '/generate',
    syntax: '/generate "<prompt>" [選項]',
    desc: '從文字 prompt 生成單張或多張圖片',
    params: [
      { name: 'prompt', label: 'Prompt', type: 'text', required: true, placeholder: '描述要生成的圖片...' },
      { name: '--count', label: 'Count', type: 'number', min: 1, max: 8, default: 1 },
      {
        name: '--styles',
        label: 'Styles',
        type: 'multi-select',
        options: [
          { value: 'photorealistic', label: 'Photorealistic — 攝影品質' },
          { value: 'watercolor', label: 'Watercolor — 水彩畫' },
          { value: 'oil-painting', label: 'Oil Painting — 油畫' },
          { value: 'sketch', label: 'Sketch — 手繪素描' },
          { value: 'pixel-art', label: 'Pixel Art — 像素復古' },
          { value: 'anime', label: 'Anime — 動漫風格' },
          { value: 'vintage', label: 'Vintage — 復古美學' },
          { value: 'modern', label: 'Modern — 現代風格' },
          { value: 'abstract', label: 'Abstract — 抽象藝術' },
          { value: 'minimalist', label: 'Minimalist — 簡約設計' },
        ],
      },
      {
        name: '--variations',
        label: 'Variations',
        type: 'multi-select',
        options: [
          { value: 'lighting', label: 'Lighting — dramatic / soft' },
          { value: 'angle', label: 'Angle — above / close-up' },
          { value: 'color-palette', label: 'Color Palette — warm / cool' },
          { value: 'composition', label: 'Composition — centered / rule of thirds' },
          { value: 'mood', label: 'Mood — cheerful / dramatic' },
          { value: 'season', label: 'Season — spring / winter' },
          { value: 'time-of-day', label: 'Time of Day — sunrise / sunset' },
        ],
      },
      {
        name: '--format',
        label: 'Format',
        type: 'select',
        options: [
          { value: 'separate', label: 'Separate（預設）' },
          { value: 'grid', label: 'Grid' },
        ],
      },
      { name: '--seed', label: 'Seed', type: 'number', placeholder: '隨機種子' },
      { name: '--preview', label: 'Preview', type: 'boolean', default: false },
    ],
  },
  {
    id: 'edit',
    name: '/edit',
    syntax: '/edit <file> "<prompt>" [選項]',
    desc: '以自然語言指令修改現有圖片',
    params: [
      { name: 'file', label: 'File', type: 'text', required: true, placeholder: '圖片檔名，例如 photo.png' },
      { name: 'prompt', label: 'Prompt', type: 'text', required: true, placeholder: '描述要進行的編輯...' },
      { name: '--preview', label: 'Preview', type: 'boolean', default: false },
    ],
  },
  {
    id: 'restore',
    name: '/restore',
    syntax: '/restore <file> "<prompt>" [選項]',
    desc: '修復與增強老舊或受損的照片',
    params: [
      { name: 'file', label: 'File', type: 'text', required: true, placeholder: '圖片檔名，例如 old_photo.jpg' },
      { name: 'prompt', label: 'Prompt', type: 'text', required: true, placeholder: '描述要進行的修復...' },
      { name: '--preview', label: 'Preview', type: 'boolean', default: false },
    ],
  },
  {
    id: 'icon',
    name: '/icon',
    syntax: '/icon "<prompt>" [選項]',
    desc: '生成 app icon、favicon 與 UI 元素',
    params: [
      { name: 'prompt', label: 'Prompt', type: 'text', required: true, placeholder: '描述圖示或 UI 元素...' },
      {
        name: '--sizes',
        label: 'Sizes',
        type: 'multi-select',
        options: [
          { value: '16', label: '16px' },
          { value: '32', label: '32px' },
          { value: '64', label: '64px' },
          { value: '128', label: '128px' },
          { value: '256', label: '256px' },
          { value: '512', label: '512px' },
          { value: '1024', label: '1024px' },
        ],
      },
      {
        name: '--type',
        label: 'Type',
        type: 'select',
        options: [
          { value: 'app-icon', label: 'App Icon（預設）' },
          { value: 'favicon', label: 'Favicon' },
          { value: 'ui-element', label: 'UI Element' },
        ],
      },
      {
        name: '--style',
        label: 'Style',
        type: 'select',
        options: [
          { value: 'modern', label: 'Modern（預設）' },
          { value: 'flat', label: 'Flat' },
          { value: 'skeuomorphic', label: 'Skeuomorphic' },
          { value: 'minimal', label: 'Minimal' },
        ],
      },
      {
        name: '--format',
        label: 'Format',
        type: 'select',
        options: [
          { value: 'png', label: 'PNG（預設）' },
          { value: 'jpeg', label: 'JPEG' },
        ],
      },
      {
        name: '--background',
        label: 'Background',
        type: 'select',
        options: [
          { value: 'transparent', label: 'Transparent（預設）' },
          { value: 'white', label: 'White' },
          { value: 'black', label: 'Black' },
        ],
      },
      {
        name: '--corners',
        label: 'Corners',
        type: 'select',
        options: [
          { value: 'rounded', label: 'Rounded（預設）' },
          { value: 'sharp', label: 'Sharp' },
        ],
      },
      { name: '--preview', label: 'Preview', type: 'boolean', default: false },
    ],
  },
  {
    id: 'pattern',
    name: '/pattern',
    syntax: '/pattern "<prompt>" [選項]',
    desc: '生成無縫圖樣與紋理',
    params: [
      { name: 'prompt', label: 'Prompt', type: 'text', required: true, placeholder: '描述圖樣或紋理...' },
      { name: '--size', label: 'Size', type: 'text', placeholder: '例如 256x256、512x512' },
      {
        name: '--type',
        label: 'Type',
        type: 'select',
        options: [
          { value: 'seamless', label: 'Seamless（預設）' },
          { value: 'texture', label: 'Texture' },
          { value: 'wallpaper', label: 'Wallpaper' },
        ],
      },
      {
        name: '--style',
        label: 'Style',
        type: 'select',
        options: [
          { value: 'abstract', label: 'Abstract（預設）' },
          { value: 'geometric', label: 'Geometric' },
          { value: 'organic', label: 'Organic' },
          { value: 'floral', label: 'Floral' },
          { value: 'tech', label: 'Tech' },
        ],
      },
      {
        name: '--density',
        label: 'Density',
        type: 'select',
        options: [
          { value: 'medium', label: 'Medium（預設）' },
          { value: 'sparse', label: 'Sparse' },
          { value: 'dense', label: 'Dense' },
        ],
      },
      {
        name: '--colors',
        label: 'Colors',
        type: 'select',
        options: [
          { value: 'colorful', label: 'Colorful（預設）' },
          { value: 'mono', label: 'Mono' },
          { value: 'duotone', label: 'Duotone' },
        ],
      },
      {
        name: '--repeat',
        label: 'Repeat',
        type: 'select',
        options: [
          { value: 'tile', label: 'Tile（預設）' },
          { value: 'mirror', label: 'Mirror' },
        ],
      },
      { name: '--preview', label: 'Preview', type: 'boolean', default: false },
    ],
  },
  {
    id: 'story',
    name: '/story',
    syntax: '/story "<prompt>" [選項]',
    desc: '生成視覺故事序列或步驟流程',
    params: [
      { name: 'prompt', label: 'Prompt', type: 'text', required: true, placeholder: '描述故事或流程...' },
      { name: '--steps', label: 'Steps', type: 'number', min: 2, max: 8, default: 4 },
      {
        name: '--type',
        label: 'Type',
        type: 'select',
        options: [
          { value: 'story', label: 'Story（預設）' },
          { value: 'process', label: 'Process' },
          { value: 'tutorial', label: 'Tutorial' },
          { value: 'timeline', label: 'Timeline' },
        ],
      },
      {
        name: '--style',
        label: 'Style',
        type: 'select',
        options: [
          { value: 'consistent', label: 'Consistent（預設）' },
          { value: 'evolving', label: 'Evolving' },
        ],
      },
      {
        name: '--layout',
        label: 'Layout',
        type: 'select',
        options: [
          { value: 'separate', label: 'Separate（預設）' },
          { value: 'grid', label: 'Grid' },
          { value: 'comic', label: 'Comic' },
        ],
      },
      {
        name: '--transition',
        label: 'Transition',
        type: 'select',
        options: [
          { value: 'smooth', label: 'Smooth（預設）' },
          { value: 'dramatic', label: 'Dramatic' },
          { value: 'fade', label: 'Fade' },
        ],
      },
      {
        name: '--format',
        label: 'Format',
        type: 'select',
        options: [
          { value: 'individual', label: 'Individual（預設）' },
          { value: 'storyboard', label: 'Storyboard' },
        ],
      },
      { name: '--preview', label: 'Preview', type: 'boolean', default: false },
    ],
  },
  {
    id: 'diagram',
    name: '/diagram',
    syntax: '/diagram "<prompt>" [選項]',
    desc: '從文字描述生成專業技術圖表',
    params: [
      { name: 'prompt', label: 'Prompt', type: 'text', required: true, placeholder: '描述圖表內容與結構...' },
      {
        name: '--type',
        label: 'Type',
        type: 'select',
        options: [
          { value: 'flowchart', label: 'Flowchart（預設）' },
          { value: 'architecture', label: 'Architecture' },
          { value: 'network', label: 'Network' },
          { value: 'database', label: 'Database' },
          { value: 'wireframe', label: 'Wireframe' },
          { value: 'mindmap', label: 'Mindmap' },
          { value: 'sequence', label: 'Sequence' },
        ],
      },
      {
        name: '--style',
        label: 'Style',
        type: 'select',
        options: [
          { value: 'professional', label: 'Professional（預設）' },
          { value: 'clean', label: 'Clean' },
          { value: 'hand-drawn', label: 'Hand-drawn' },
          { value: 'technical', label: 'Technical' },
        ],
      },
      {
        name: '--layout',
        label: 'Layout',
        type: 'select',
        options: [
          { value: 'hierarchical', label: 'Hierarchical（預設）' },
          { value: 'horizontal', label: 'Horizontal' },
          { value: 'vertical', label: 'Vertical' },
          { value: 'circular', label: 'Circular' },
        ],
      },
      {
        name: '--complexity',
        label: 'Complexity',
        type: 'select',
        options: [
          { value: 'detailed', label: 'Detailed（預設）' },
          { value: 'simple', label: 'Simple' },
          { value: 'comprehensive', label: 'Comprehensive' },
        ],
      },
      {
        name: '--colors',
        label: 'Colors',
        type: 'select',
        options: [
          { value: 'accent', label: 'Accent（預設）' },
          { value: 'mono', label: 'Mono' },
          { value: 'categorical', label: 'Categorical' },
        ],
      },
      {
        name: '--annotations',
        label: 'Annotations',
        type: 'select',
        options: [
          { value: 'detailed', label: 'Detailed（預設）' },
          { value: 'minimal', label: 'Minimal' },
        ],
      },
      { name: '--preview', label: 'Preview', type: 'boolean', default: false },
    ],
  },
]
