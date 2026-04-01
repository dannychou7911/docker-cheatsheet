# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

多主題開發者 Cheatsheet 平台，目前收錄 Docker 與 k9s 兩個主題。
- **線上版:** https://dannychou7911.github.io/docker-cheatsheet/
- **GitHub:** https://github.com/dannychou7911/docker-cheatsheet

## Tech Stack

- **Framework:** Vue 3 + TypeScript + Vite
- **Styling:** Tailwind CSS v4（`@tailwindcss/vite` plugin，CSS-first `@theme` 設定）
- **Routing:** vue-router 4（hash mode，`createWebHashHistory`）
- **Testing:** Vitest + Vue Test Utils（jsdom 環境）
- **Fonts:** Inter（正文）+ JetBrains Mono（程式碼）

## Commands

```bash
npm run dev        # 啟動開發伺服器
npm run build      # vue-tsc 型別檢查 + vite build
npm run preview    # 預覽 production build
npm test           # vitest watch mode
npm run test:run   # vitest 單次執行
```

## Architecture

```
src/
├── assets/main.css          # Tailwind @theme + 自訂樣式
├── components/
│   ├── cheatsheet/          # CommandCard, ConceptCard, SectionBlock, CopyButton, SearchInput, HeroSection
│   ├── home/                # TopicCard
│   └── layout/              # NavBar, Sidebar, MobileHeader, BackToTop
├── composables/             # use-clipboard, use-search, use-toc, use-mobile-sidebar
├── data/                    # types.ts, docker.ts, k9s.ts
├── router/                  # hash mode router（/, /docker, /k9s）
└── views/                   # HomeView, DockerView, K9sView
```

**資料流：** `data/*.ts` → `*View.vue` → `SectionBlock` → `CommandCard` / `ConceptCard`

**新增主題步驟：**
1. 在 `src/data/` 新增資料檔（實作 `CheatsheetTopic` 介面）
2. 在 `src/views/` 新增對應 View
3. 在 `src/router/index.ts` 加入路由
4. 在 `src/components/layout/NavBar.vue` 加入導航項目
5. 在 `src/views/HomeView.vue` 加入 TopicCard

## Design System

完整設計規範記錄在 `DESIGN.md`。關鍵設計決策：
- **深色主題**（bg: `#0F172A`），設計概念「Code dark + run green」
- 色彩 token 定義在 `src/assets/main.css` 的 `@theme` 區塊，`dock-` namespace（共 12 個 token）
- Section 色彩對應：`SectionColor` 型別（accent, green, purple, yellow, orange, red, dim）

## Deployment

GitHub Pages，透過 GitHub Actions 自動部署：
- Workflow: `.github/workflows/deploy.yml`
- 觸發條件：push 到 `main` branch 或手動 `workflow_dispatch`
- Build：`npm ci && npm run build`，部署 `dist/` 目錄
- Base path：`/docker-cheatsheet/`（設定在 `vite.config.ts`）

## Data Model

```typescript
CheatsheetTopic { id, title, description, heroTitle, heroDesc, sections: Section[] }
Section { id, title, color: SectionColor, commands?: Command[], concepts?: Concept[] }
Command { cmd, syntax, desc, examples: ExampleLine[], flags?: Flag[], copyText?: string }
Concept { title, desc, details?: string[] }
```
