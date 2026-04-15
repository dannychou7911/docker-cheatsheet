import type { CheatsheetTopic } from './types'

export const nanobananaTopic: CheatsheetTopic = {
  id: 'nanobanana',
  title: 'Nano Banana',
  description: 'Gemini CLI 圖片生成 MCP 工具指令速查表',
  heroTitle: 'Nano Banana Cheatsheet',
  heroDesc: 'Gemini CLI 圖片生成工具完整指令參考 — 從生成到編輯一次搞懂',
  sections: [
    // ===== 模型選擇 =====
    {
      id: 'model',
      title: '模型選擇',
      color: 'accent',
      concepts: [
        {
          title: '環境變數 NANOBANANA_MODEL',
          desc: '透過環境變數切換模型，預設為 gemini-3.1-flash-image-preview。',
          details: [
            'gemini-3.1-flash-image-preview — Nano Banana 2（預設模型，v1.0.11+）',
            'gemini-3-pro-image-preview — Nano Banana Pro（高品質模型）',
            'gemini-2.5-flash-image — Nano Banana v1（初代模型）',
          ],
        },
        {
          title: 'API Key 優先順序',
          desc: '認證時依序檢查環境變數，找到第一個有效的即使用。',
          details: [
            'NANOBANANA_API_KEY（主要）',
            'NANOBANANA_GEMINI_API_KEY',
            'NANOBANANA_GOOGLE_API_KEY',
            'GEMINI_API_KEY',
            'GOOGLE_API_KEY',
          ],
        },
        {
          title: '檔案管理',
          desc: '所有生成的圖片儲存至 ./nanobanana-output/（自動建立）。',
          details: [
            '輸入搜尋路徑：cwd → ./images/ → ./input/ → ./nanobanana-output/ → ~/Downloads/ → ~/Desktop/',
            '絕對路徑會直接使用，不搜尋',
            '檔名根據 prompt 自動生成（小寫、移除特殊字元、空格轉底線、截斷至 32 字元）',
            '重複檔名自動加數字後綴：name.png → name_1.png → name_2.png',
          ],
        },
      ],
    },
    // ===== /generate =====
    {
      id: 'generate',
      title: '/generate — 圖片生成',
      color: 'green',
      commands: [
        {
          cmd: '/generate',
          syntax: '/generate "<prompt>" [選項]',
          desc: '從文字 prompt 生成單張或多張圖片，支援風格與變化控制。',
          examples: [
            { type: 'comment', text: '# 單張圖片' },
            { type: 'command', text: '/generate "a watercolor painting of a fox in a snowy forest"' },
            { type: 'comment', text: '# 多張變化 + 預覽' },
            { type: 'command', text: '/generate "sunset over mountains" --count=3 --preview' },
            { type: 'comment', text: '# 風格變化' },
            { type: 'command', text: '/generate "mountain landscape" --styles="watercolor,oil-painting" --count=4' },
            { type: 'comment', text: '# 特定變化 + 自動預覽' },
            { type: 'command', text: '/generate "coffee shop interior" --variations="lighting,mood" --preview' },
            { type: 'comment', text: '# 組合選項' },
            { type: 'command', text: '/generate "friendly robot character" --styles="anime,minimalist" --variations="color-palette"' },
          ],
          flags: [
            { flag: '--count', desc: '生成變化數量（1–8），預設 1' },
            { flag: '--styles', desc: '逗號分隔的藝術風格列表' },
            { flag: '--variations', desc: '逗號分隔的變化類型列表' },
            { flag: '--format', desc: '輸出格式：grid | separate（預設）' },
            { flag: '--seed', desc: '隨機種子，可重現結果' },
            { flag: '--preview', desc: '自動在預設檢視器中開啟圖片' },
          ],
          copyText: '/generate "prompt" --count=3 --preview',
        },
      ],
      concepts: [
        {
          title: '可用風格 --styles',
          desc: '指定藝術風格，可逗號分隔多個值。',
          details: [
            'photorealistic — 攝影品質',
            'watercolor — 水彩畫風格',
            'oil-painting — 油畫技法',
            'sketch — 手繪素描',
            'pixel-art — 像素復古風',
            'anime — 動漫/漫畫風格',
            'vintage — 復古美學',
            'modern — 現代/當代風格',
            'abstract — 抽象藝術',
            'minimalist — 簡約設計',
          ],
        },
        {
          title: '可用變化 --variations',
          desc: '每種 variation 會產生 2 個變化。搭配 --styles 會形成交叉組合，最終受 --count 上限限制。',
          details: [
            'lighting — dramatic lighting / soft lighting',
            'angle — from above / close-up view',
            'color-palette — warm color palette / cool color palette',
            'composition — centered composition / rule of thirds',
            'mood — cheerful mood / dramatic mood',
            'season — in spring / in winter',
            'time-of-day — at sunrise / at sunset',
          ],
        },
      ],
    },
    // ===== /edit =====
    {
      id: 'edit',
      title: '/edit — 圖片編輯',
      color: 'purple',
      commands: [
        {
          cmd: '/edit',
          syntax: '/edit <file> "<prompt>" [選項]',
          desc: '以自然語言指令修改現有圖片。',
          examples: [
            { type: 'command', text: '/edit my_photo.png "add sunglasses to the person"' },
            { type: 'command', text: '/edit portrait.jpg "change background to a beach scene" --preview' },
          ],
          flags: [
            { flag: '--preview', desc: '自動開啟編輯後的圖片' },
          ],
          copyText: '/edit file.png "edit instruction" --preview',
        },
      ],
    },
    // ===== /restore =====
    {
      id: 'restore',
      title: '/restore — 圖片修復',
      color: 'yellow',
      commands: [
        {
          cmd: '/restore',
          syntax: '/restore <file> "<prompt>" [選項]',
          desc: '修復與增強老舊或受損的照片。',
          examples: [
            { type: 'command', text: '/restore old_family_photo.jpg "remove scratches and improve clarity"' },
            { type: 'command', text: '/restore damaged_photo.png "enhance colors and fix tears" --preview' },
          ],
          flags: [
            { flag: '--preview', desc: '自動開啟修復後的圖片' },
          ],
          copyText: '/restore file.jpg "restore instruction" --preview',
        },
      ],
    },
    // ===== /icon =====
    {
      id: 'icon',
      title: '/icon — 圖示生成',
      color: 'orange',
      commands: [
        {
          cmd: '/icon',
          syntax: '/icon "<prompt>" [選項]',
          desc: '生成 app icon、favicon 與 UI 元素，支援多種尺寸與格式。',
          examples: [
            { type: 'comment', text: '# 完整 app icon 套組' },
            { type: 'command', text: '/icon "productivity app with checklist" --sizes="64,128,256,512" --corners="rounded"' },
            { type: 'comment', text: '# Favicon 套組' },
            { type: 'command', text: '/icon "mountain logo" --type="favicon" --sizes="16,32,64" --format="png"' },
            { type: 'comment', text: '# UI 元素' },
            { type: 'command', text: '/icon "notification bell" --type="ui-element" --style="flat" --background="transparent"' },
          ],
          flags: [
            { flag: '--sizes', desc: '圖示尺寸陣列（px）：16, 32, 64, 128, 256, 512, 1024' },
            { flag: '--type', desc: 'app-icon（預設）| favicon | ui-element' },
            { flag: '--style', desc: 'flat | skeuomorphic | minimal | modern（預設）' },
            { flag: '--format', desc: 'png（預設）| jpeg' },
            { flag: '--background', desc: 'transparent（預設）| white | black | 自訂色名' },
            { flag: '--corners', desc: 'rounded（預設）| sharp（僅 app-icon）' },
            { flag: '--preview', desc: '自動開啟圖片' },
          ],
          copyText: '/icon "prompt" --sizes="64,128,256,512" --corners="rounded"',
        },
      ],
    },
    // ===== /pattern =====
    {
      id: 'pattern',
      title: '/pattern — 圖樣/紋理生成',
      color: 'red',
      commands: [
        {
          cmd: '/pattern',
          syntax: '/pattern "<prompt>" [選項]',
          desc: '生成無縫圖樣與紋理，適用於背景與設計元素。',
          examples: [
            { type: 'comment', text: '# 網站背景圖樣' },
            { type: 'command', text: '/pattern "subtle geometric hexagons" --type="seamless" --colors="duotone" --density="sparse"' },
            { type: 'comment', text: '# 材質紋理' },
            { type: 'command', text: '/pattern "brushed metal surface" --type="texture" --style="tech" --colors="mono"' },
            { type: 'comment', text: '# 裝飾壁紙' },
            { type: 'command', text: '/pattern "art deco design" --type="wallpaper" --style="geometric" --size="512x512"' },
          ],
          flags: [
            { flag: '--size', desc: '圖樣 tile 尺寸，預設 256x256' },
            { flag: '--type', desc: 'seamless（預設）| texture | wallpaper' },
            { flag: '--style', desc: 'geometric | organic | abstract（預設）| floral | tech' },
            { flag: '--density', desc: 'sparse | medium（預設）| dense' },
            { flag: '--colors', desc: 'mono | duotone | colorful（預設）' },
            { flag: '--repeat', desc: 'tile（預設）| mirror（僅 seamless）' },
            { flag: '--preview', desc: '自動開啟圖片' },
          ],
          copyText: '/pattern "prompt" --type="seamless" --colors="duotone"',
        },
      ],
    },
    // ===== /story =====
    {
      id: 'story',
      title: '/story — 視覺故事序列',
      color: 'accent',
      commands: [
        {
          cmd: '/story',
          syntax: '/story "<prompt>" [選項]',
          desc: '生成一系列連續圖片，講述視覺故事或展示步驟流程。',
          examples: [
            { type: 'comment', text: '# 產品開發流程' },
            { type: 'command', text: '/story "idea to launched product" --steps=5 --type="process" --style="consistent"' },
            { type: 'comment', text: '# 教學教程' },
            { type: 'command', text: '/story "git workflow tutorial" --steps=6 --type="tutorial" --layout="comic"' },
            { type: 'comment', text: '# 品牌演變時間線' },
            { type: 'command', text: '/story "company logo evolution" --steps=4 --type="timeline" --transition="smooth"' },
          ],
          flags: [
            { flag: '--steps', desc: '連續圖片數量（2–8），預設 4' },
            { flag: '--type', desc: 'story（預設）| process | tutorial | timeline' },
            { flag: '--style', desc: 'consistent（預設）| evolving' },
            { flag: '--layout', desc: 'separate（預設）| grid | comic' },
            { flag: '--transition', desc: 'smooth（預設）| dramatic | fade' },
            { flag: '--format', desc: 'storyboard | individual（預設）' },
            { flag: '--preview', desc: '自動開啟圖片' },
          ],
          copyText: '/story "prompt" --steps=5 --type="process"',
        },
      ],
      concepts: [
        {
          title: 'Prompt 組合邏輯',
          desc: '每一步的 prompt 會自動加上 step N of M 以及對應 type 的上下文。',
          details: [
            'story → narrative sequence, {style} art style',
            'process → procedural step, instructional illustration',
            'tutorial → tutorial step, educational diagram',
            'timeline → chronological progression, timeline visualization',
          ],
        },
      ],
    },
    // ===== /diagram =====
    {
      id: 'diagram',
      title: '/diagram — 技術圖表',
      color: 'purple',
      commands: [
        {
          cmd: '/diagram',
          syntax: '/diagram "<prompt>" [選項]',
          desc: '從文字描述生成專業技術圖表、流程圖與架構圖。',
          examples: [
            { type: 'comment', text: '# 開發工作流' },
            { type: 'command', text: '/diagram "CI/CD pipeline with testing stages" --type="flowchart" --complexity="detailed"' },
            { type: 'comment', text: '# 系統設計' },
            { type: 'command', text: '/diagram "chat application architecture" --type="architecture" --style="technical"' },
            { type: 'comment', text: '# API 文件' },
            { type: 'command', text: '/diagram "REST API authentication flow" --type="sequence" --layout="vertical"' },
            { type: 'comment', text: '# 資料庫設計' },
            { type: 'command', text: '/diagram "social media database schema" --type="database" --annotations="detailed"' },
          ],
          flags: [
            { flag: '--type', desc: 'flowchart（預設）| architecture | network | database | wireframe | mindmap | sequence' },
            { flag: '--style', desc: 'professional（預設）| clean | hand-drawn | technical' },
            { flag: '--layout', desc: 'horizontal | vertical | hierarchical（預設）| circular' },
            { flag: '--complexity', desc: 'simple | detailed（預設）| comprehensive' },
            { flag: '--colors', desc: 'mono | accent（預設）| categorical' },
            { flag: '--annotations', desc: 'minimal | detailed（預設）' },
            { flag: '--preview', desc: '自動開啟圖片' },
          ],
          copyText: '/diagram "prompt" --type="flowchart" --complexity="detailed"',
        },
      ],
      concepts: [
        {
          title: '圖表類型用途',
          desc: '選擇最適合的圖表類型來表達你的需求。',
          details: [
            'flowchart — 流程圖、決策樹、工作流',
            'architecture — 系統架構、微服務、基礎設施',
            'network — 網路拓撲、伺服器配置',
            'database — 資料庫 schema、ER 圖',
            'wireframe — UI/UX 線框圖、頁面佈局',
            'mindmap — 概念圖、想法層級',
            'sequence — 時序圖、API 互動',
          ],
        },
      ],
    },
    // ===== /nanobanana =====
    {
      id: 'nanobanana',
      title: '/nanobanana — 自然語言介面',
      color: 'dim',
      commands: [
        {
          cmd: '/nanobanana',
          syntax: '/nanobanana <自然語言描述>',
          desc: '以自然語言描述需求，自動路由至最適合的工具。不需要記住指令名稱。',
          examples: [
            { type: 'command', text: '/nanobanana create a logo for my tech startup' },
            { type: 'command', text: '/nanobanana I need 5 different versions of a cat illustration in various art styles' },
            { type: 'command', text: '/nanobanana fix the lighting in sunset.jpg and make it more vibrant' },
          ],
          copyText: '/nanobanana create a logo for my tech startup',
        },
      ],
      concepts: [
        {
          title: '自動路由規則',
          desc: '系統根據你的描述自動選擇對應的工具。',
          details: [
            '生成單/多張圖片 → generate_image',
            '編輯現有圖片 → edit_image',
            '修復/增強圖片 → restore_image',
            'App icon、favicon、UI 元素 → generate_icon',
            '無縫圖樣、紋理、背景 → generate_pattern',
            '視覺故事、序列、教程 → generate_story',
            '技術圖表、流程圖、架構圖 → generate_diagram',
          ],
        },
      ],
    },
  ],
}
