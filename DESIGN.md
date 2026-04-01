# Docker Cheatsheet — Design System

本文件記錄此專案的 UI/UX 設計概念與原則，由 **UI/UX Pro Max** skill 生成設計系統後建構。

## Design Tool

- **生成工具:** Claude Code + ui-ux-pro-max skill
- **搜尋關鍵字:** `developer tool documentation cheatsheet reference minimal`

## Pattern

- **類型:** FAQ/Documentation Landing
- **目標:** 降低查找成本，讓新手快速找到需要的 Docker 指令
- **結構:** Hero with search bar → 分類章節 → 指令卡片（說明 + 範例 + 一鍵複製）

## Style

- **風格名稱:** Vibrant & Block-based
- **關鍵字:** Bold, energetic, playful, block layout, geometric shapes, high color contrast, duotone, modern
- **適合場景:** Startups, creative agencies, developer tools, consumer-facing products
- **效能:** Good
- **無障礙:** 需確保 WCAG 合規

## Color Palette

深色主題，以「Code dark + run green」為設計概念。

| Token        | Hex       | 用途                       |
| ------------ | --------- | -------------------------- |
| `bg`         | `#0F172A` | 頁面背景（Slate 900）      |
| `surface`    | `#1E293B` | 卡片/區塊背景（Slate 800） |
| `surface2`   | `#334155` | 次級表面/邊框（Slate 700） |
| `accent`     | `#38BDF8` | 主強調色（Sky 400）        |
| `green`      | `#22C55E` | CTA / 成功狀態             |
| `yellow`     | `#FACC15` | 警告/提示                  |
| `red`        | `#F87171` | 錯誤/危險操作              |
| `purple`     | `#A78BFA` | 輔助色                     |
| `orange`     | `#FB923C` | 輔助色                     |
| `text`       | `#F8FAFC` | 主要文字（Slate 50）       |
| `muted`      | `#94A3B8` | 次要文字（Slate 400）      |
| `dim`        | `#64748B` | 輔助文字（Slate 500）      |

## Typography

| 用途     | 字體            | 風格                                               |
| -------- | --------------- | -------------------------------------------------- |
| 正文/標題 | Inter           | Minimal, clean, swiss, functional, neutral         |
| 程式碼   | JetBrains Mono  | Developer-friendly monospace                       |

- **字重:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **載入方式:** Google Fonts（preconnect 優化）

## Layout

- **框架:** Tailwind CSS (CDN)
- **結構:** 固定側邊欄目錄 + 主內容區（響應式）
- **響應式策略:** Mobile-first，手機版以漢堡選單觸發側邊欄
- **間距原則:** `px-4 md:px-6 lg:px-8`（隨螢幕尺寸遞增）
- **Z-index 規範:** `z-50` 用於固定導航，`z-40` 用於下拉選單

## Interactive Features

| 功能           | 說明                                                     |
| -------------- | -------------------------------------------------------- |
| 側邊目錄導航   | 左側固定，點擊跳轉章節，滾動時自動高亮當前位置           |
| 搜尋           | `Ctrl+K` / `Cmd+K` 快捷鍵，即時篩選並高亮匹配指令       |
| 一鍵複製       | 每個指令卡片附複製按鈕，複製後顯示打勾回饋               |
| 回到頂部       | 滾動後出現的浮動按鈕                                     |
| RWD            | 手機版漢堡選單觸發側邊欄                                 |

## Accessibility

依據 ui-ux-pro-max UX Guidelines 實作：

- **色彩對比:** 文字與背景維持 WCAG 4.5:1 以上對比度
- **Focus states:** 所有互動元素具備可見的 focus ring
- **Skip link:** 提供「跳至主要內容」連結，減少鍵盤使用者的 Tab 次數
- **鍵盤導航:** Tab 順序與視覺順序一致
- **Reduced motion:** 偵測 `prefers-reduced-motion`，停用動畫與過渡效果
- **搜尋無結果:** 顯示提示訊息而非空白畫面

## Content Structure

頁面共 9 個章節分類：

1. 基礎指令
2. 容器管理
3. 映像檔管理
4. Volume 資料管理
5. Network 網路
6. Docker Compose
7. Compose YAML 結構
8. 清理與維護
9. Dockerfile 常用指令

每個指令卡片包含：

- **指令名稱**（等寬字體）
- **白話說明**（中文，新手導向）
- **實際範例**（可一鍵複製）
