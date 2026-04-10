import type { CheatsheetTopic } from './types'

export const gitTopic: CheatsheetTopic = {
  id: 'git',
  title: 'Git',
  description: '新手友善的 Git 版本控制指令速查表',
  heroTitle: 'Git Cheatsheet',
  heroDesc:
    '新手友善的版本控制指令速查表 — 從<strong class="text-dock-text">基礎操作</strong>到<strong class="text-dock-text">進階 rebase</strong>，白話解說讓你快速上手',
  sections: [
    // ===== 核心觀念 =====
    {
      id: 'concepts',
      title: 'Git 核心觀念',
      color: 'accent',
      concepts: [
        {
          title: 'Git 的三個區域',
          desc: 'Git 把你的檔案分成三個區域來管理。理解這三區是搞懂所有 Git 指令的基礎。',
          diagram: `graph LR
  WD["📝 Working Directory\n（工作目錄）"] -->|"git add"| SA["📦 Staging Area\n（暫存區）"]
  SA -->|"git commit"| REPO["🗄️ Repository\n（本地儲存庫 .git）"]
  SA -->|"git restore --staged"| WD
  REPO -->|"git restore"| WD`,
          details: [
            'Working Directory：你正在編輯的檔案',
            'Staging Area：用 git add 標記「準備提交」的檔案',
            'Repository：用 git commit 正式存入的歷史紀錄',
          ],
        },
        {
          title: 'Branch（分支）',
          desc: '分支就像平行宇宙，讓你在不影響主線的情況下開發新功能或修 bug。',
          diagram: `gitGraph
  commit id: "A"
  commit id: "B"
  branch feature
  commit id: "C"
  commit id: "D"
  checkout main
  commit id: "E"
  merge feature id: "merge"`,
          details: [
            '每個分支是一條獨立的 commit 歷史線',
            '開發完成後合併（merge）回主分支',
            'main / master 是預設的主分支名稱',
          ],
        },
        {
          title: 'Remote（遠端）',
          desc: '遠端是存放在伺服器上的 Git 儲存庫（如 GitHub、GitLab）。本地和遠端透過 push / pull 同步。',
          diagram: `graph LR
  LOCAL["💻 Local\n（本地儲存庫）"] -->|"git push"| REMOTE["☁️ Remote\n（遠端儲存庫）"]
  REMOTE -->|"git pull / fetch"| LOCAL`,
          details: [
            'origin 是預設的遠端名稱',
            'git clone 會自動設定 origin 指向來源網址',
          ],
        },
      ],
    },

    // ===== 基本常用指令 =====
    {
      id: 'basics',
      title: '基本常用指令',
      color: 'green',
      commands: [
        {
          cmd: 'git init',
          syntax: 'git init',
          desc: '在目前資料夾建立一個全新的 Git 儲存庫。會產生一個隱藏的 .git 資料夾來記錄版本歷史。',
          examples: [
            { type: 'comment', text: '# 在目前資料夾初始化 Git' },
            { type: 'command', text: 'git init' },
          ],
          copyText: 'git init',
        },
        {
          cmd: 'git clone',
          syntax: 'git clone <網址>',
          desc: '從遠端下載一個完整的 Git 儲存庫到本地，包含所有歷史紀錄和分支。',
          examples: [
            { type: 'command', text: 'git clone https://github.com/user/repo.git' },
            { type: 'comment', text: '# 下載到指定資料夾' },
            { type: 'command', text: 'git clone https://github.com/user/repo.git my-folder' },
          ],
          copyText: 'git clone https://github.com/user/repo.git',
        },
        {
          cmd: 'git status',
          syntax: 'git status',
          desc: '查看目前工作目錄的狀態：哪些檔案被修改了、哪些已加入暫存區、哪些還未被追蹤。',
          examples: [
            { type: 'command', text: 'git status' },
            { type: 'comment', text: '# 精簡版（更簡潔的輸出）' },
            { type: 'command', text: 'git status -s' },
          ],
          copyText: 'git status',
        },
        {
          cmd: 'git add',
          syntax: 'git add <檔案>',
          desc: '把檔案加入暫存區（Staging Area），標記為「準備提交」。這是 commit 前的必要步驟。',
          examples: [
            { type: 'comment', text: '# 加入指定檔案' },
            { type: 'command', text: 'git add index.html' },
            { type: 'comment', text: '# 加入所有變更的檔案' },
            { type: 'command', text: 'git add .' },
            { type: 'comment', text: '# 只加入已追蹤檔案的變更（不含新檔案）' },
            { type: 'command', text: 'git add -u' },
          ],
          copyText: 'git add .',
        },
        {
          cmd: 'git commit',
          syntax: 'git commit -m "<訊息>"',
          desc: '將暫存區的變更正式存入歷史紀錄。每次 commit 就像一個存檔點，你隨時可以回到這個狀態。',
          examples: [
            { type: 'command', text: 'git commit -m "feat: 新增登入功能"' },
            { type: 'comment', text: '# 跳過 git add，直接提交已追蹤檔案的變更' },
            { type: 'command', text: 'git commit -am "fix: 修正首頁排版"' },
          ],
          flags: [
            { flag: '-m', desc: '指定 commit 訊息' },
            { flag: '-a', desc: '自動 add 已追蹤的檔案' },
            { flag: '--amend', desc: '修改最後一次 commit（訊息或內容）' },
          ],
          copyText: 'git commit -m "feat: 新增功能"',
        },
        {
          cmd: 'git log',
          syntax: 'git log [選項]',
          desc: '查看 commit 歷史紀錄。預設會顯示完整資訊，加選項可以精簡輸出。',
          examples: [
            { type: 'command', text: 'git log' },
            { type: 'comment', text: '# 一行一筆，更清楚' },
            { type: 'command', text: 'git log --oneline' },
            { type: 'comment', text: '# 圖形化顯示分支線圖' },
            { type: 'command', text: 'git log --oneline --graph --all' },
          ],
          copyText: 'git log --oneline --graph --all',
        },
        {
          cmd: 'git diff',
          syntax: 'git diff [選項]',
          desc: '查看檔案的差異。不加選項是看「工作目錄 vs 暫存區」的差異。',
          examples: [
            { type: 'comment', text: '# 查看尚未暫存的變更' },
            { type: 'command', text: 'git diff' },
            { type: 'comment', text: '# 查看已暫存、準備 commit 的變更' },
            { type: 'command', text: 'git diff --staged' },
            { type: 'comment', text: '# 比較兩個分支的差異' },
            { type: 'command', text: 'git diff main..feature' },
          ],
          copyText: 'git diff --staged',
        },
      ],
    },

    // ===== 分支操作 =====
    {
      id: 'branch',
      title: '分支操作',
      color: 'purple',
      commands: [
        {
          cmd: 'git branch',
          syntax: 'git branch [選項] [名稱]',
          desc: '管理分支：列出、建立、刪除。分支就是一個指向 commit 的「標籤」，切換分支非常快速。',
          examples: [
            { type: 'comment', text: '# 列出所有本地分支' },
            { type: 'command', text: 'git branch' },
            { type: 'comment', text: '# 列出所有分支（含遠端）' },
            { type: 'command', text: 'git branch -a' },
            { type: 'comment', text: '# 建立新分支（不切換過去）' },
            { type: 'command', text: 'git branch feature/login' },
            { type: 'comment', text: '# 刪除已合併的分支' },
            { type: 'command', text: 'git branch -d feature/login' },
            { type: 'comment', text: '# 強制刪除分支（不管有沒有合併）' },
            { type: 'command', text: 'git branch -D feature/login' },
          ],
          copyText: 'git branch -a',
        },
        {
          cmd: 'git checkout / git switch',
          syntax: 'git switch <分支名>',
          desc: '切換到另一個分支。git switch 是 Git 2.23+ 新增的指令，比 checkout 更直覺、不容易搞混。',
          examples: [
            { type: 'comment', text: '# 切換分支（推薦用 switch）' },
            { type: 'command', text: 'git switch main' },
            { type: 'comment', text: '# 建立新分支並切換過去' },
            { type: 'command', text: 'git switch -c feature/login' },
            { type: 'comment', text: '# 舊寫法（也能用）' },
            { type: 'command', text: 'git checkout -b feature/login' },
          ],
          copyText: 'git switch -c feature/login',
        },
        {
          cmd: 'git merge',
          syntax: 'git merge <分支名>',
          desc: '將指定分支的變更合併到目前所在的分支。如果有衝突需要手動解決。',
          examples: [
            { type: 'comment', text: '# 先切到 main，再把 feature 合併進來' },
            { type: 'command', text: 'git switch main' },
            { type: 'command', text: 'git merge feature/login' },
            { type: 'comment', text: '# 合併但不自動 commit（方便檢查）' },
            { type: 'command', text: 'git merge --no-commit feature/login' },
          ],
          copyText: 'git merge feature/login',
        },
        {
          cmd: 'git stash',
          syntax: 'git stash [指令]',
          desc: '暫時把目前的修改「藏起來」，讓工作目錄回到乾淨狀態。適合臨時要切分支但還不想 commit 的時候。',
          examples: [
            { type: 'comment', text: '# 暫存目前修改' },
            { type: 'command', text: 'git stash' },
            { type: 'comment', text: '# 取回最近一次暫存的修改' },
            { type: 'command', text: 'git stash pop' },
            { type: 'comment', text: '# 列出所有暫存' },
            { type: 'command', text: 'git stash list' },
            { type: 'comment', text: '# 暫存時加個說明，方便辨識' },
            { type: 'command', text: 'git stash push -m "修到一半的登入功能"' },
          ],
          copyText: 'git stash',
        },
      ],
    },

    // ===== Rebase 相關 =====
    {
      id: 'rebase',
      title: 'Rebase 變基',
      color: 'yellow',
      concepts: [
        {
          title: 'Rebase vs Merge 差在哪？',
          desc: '兩者都是整合分支的方法，但結果不同。Merge 保留分叉歷史，Rebase 讓歷史變成一條直線。',
          diagram: `graph TB
  subgraph merge ["🔀 Merge（合流）— 保留分支歷史"]
    direction LR
    MA["A"] --> MB["B"] --> MC["C"] --> MF["merge commit"]
    MB --> MD["D"] --> ME["E"] --> MF
  end
  subgraph rebase ["♻️ Rebase（接力）— 一條直線"]
    direction LR
    RA["A"] --> RB["B"] --> RC["C"] --> RD["D'"] --> RE["E'"]
  end`,
          details: [
            'Merge 像是「合流」：兩條河匯合，保留各自軌跡',
            'Rebase 像是「接力」：把 feature 的 commit 搬到 main 最新的後面，歷史變一條線',
            '簡單原則：自己的分支用 rebase 整理，共享的分支用 merge 合併',
          ],
        },
        {
          title: '什麼時候該用 Rebase？',
          desc: '一般建議：還沒 push 到遠端的 commit 可以 rebase；已經 push 並和別人共享的分支，用 merge 比較安全。',
          details: [
            '適合 rebase：更新自己的 feature 分支到 main 最新狀態',
            '適合 rebase：整理 commit 歷史讓它更乾淨',
            '不建議 rebase：已經 push 到遠端且有其他人在用的分支',
            '⚠️ rebase 會改寫 commit 歷史，已共享的分支要小心使用',
          ],
        },
      ],
      commands: [
        {
          cmd: 'git rebase',
          syntax: 'git rebase <目標分支>',
          desc: '把目前分支的 commit「搬到」目標分支的最新 commit 後面，讓歷史變成一條直線。',
          examples: [
            { type: 'comment', text: '# 在 feature 分支上，把 commit 搬到 main 最新的後面' },
            { type: 'command', text: 'git switch feature/login' },
            { type: 'command', text: 'git rebase main' },
            { type: 'comment', text: '# 互動式 rebase（可以編輯、合併、刪除 commit）' },
            { type: 'command', text: 'git rebase -i main' },
          ],
          copyText: 'git rebase main',
        },
        {
          cmd: 'git rebase -i（互動式）',
          syntax: 'git rebase -i <起點>',
          desc: '互動式 rebase 讓你可以對每個 commit 做操作：修改訊息、合併多個 commit、調整順序、刪除等。',
          examples: [
            { type: 'comment', text: '# 編輯最近 3 個 commit' },
            { type: 'command', text: 'git rebase -i HEAD~3' },
            { type: 'comment', text: '# 編輯器會顯示：' },
            { type: 'command', text: 'pick abc1234 第一個 commit' },
            { type: 'command', text: 'pick def5678 第二個 commit' },
            { type: 'command', text: 'pick ghi9012 第三個 commit' },
            { type: 'comment', text: '# 常用操作：' },
            { type: 'command', text: 'pick   = 保留這個 commit（不動）' },
            { type: 'command', text: 'reword = 保留 commit 但修改訊息' },
            { type: 'command', text: 'squash = 合併到前一個 commit（保留訊息）' },
            { type: 'command', text: 'fixup  = 合併到前一個 commit（丟掉訊息）' },
            { type: 'command', text: 'drop   = 刪除這個 commit' },
          ],
          copyText: 'git rebase -i HEAD~3',
        },
        {
          cmd: 'git rebase --abort / --continue',
          syntax: 'git rebase --abort / --continue',
          desc: 'Rebase 過程中遇到衝突時，解決完衝突用 --continue 繼續；想放棄用 --abort 回到 rebase 前的狀態。',
          examples: [
            { type: 'comment', text: '# 衝突解決後，繼續 rebase' },
            { type: 'command', text: 'git add .' },
            { type: 'command', text: 'git rebase --continue' },
            { type: 'comment', text: '# 放棄 rebase，回到原本狀態' },
            { type: 'command', text: 'git rebase --abort' },
          ],
          copyText: 'git rebase --continue',
        },
      ],
    },

    // ===== 推送到遠端 / Force Push =====
    {
      id: 'push-remote',
      title: '推送到遠端與 Force Push',
      color: 'red',
      concepts: [
        {
          title: '⚠️ Force Push 注意事項',
          desc: 'git push --force 會強制覆蓋遠端歷史。如果別人已經基於舊歷史開發，他們的工作會出問題。',
          details: [
            '什麼時候會需要 force push？',
            '→ rebase 後本地歷史和遠端不同，需要強制推送',
            '→ 用 --amend 修改了已 push 的 commit',
            '',
            '安全建議：',
            '→ 用 --force-with-lease 取代 --force（更安全）',
            '→ --force-with-lease 會檢查遠端是否被別人更新過',
            '→ 如果有人先 push 了新 commit，它會拒絕覆蓋',
            '→ ⛔ 絕對不要對 main / master 做 force push',
          ],
        },
      ],
      commands: [
        {
          cmd: 'git push',
          syntax: 'git push [遠端] [分支]',
          desc: '把本地的 commit 推送到遠端儲存庫。第一次推送新分支要加 -u 設定上游追蹤。',
          examples: [
            { type: 'comment', text: '# 推送到已設定的上游分支' },
            { type: 'command', text: 'git push' },
            { type: 'comment', text: '# 第一次推送新分支，設定上游追蹤' },
            { type: 'command', text: 'git push -u origin feature/login' },
          ],
          flags: [
            { flag: '-u', desc: '設定上游追蹤（之後只需 git push）' },
            { flag: 'origin', desc: '遠端名稱（預設是 origin）' },
          ],
          copyText: 'git push -u origin feature/login',
        },
        {
          cmd: 'git push（不同分支名）',
          syntax: 'git push <遠端> <本地分支>:<遠端分支>',
          desc: '把本地分支推送到遠端的「不同名稱」分支。冒號左邊是本地，右邊是遠端。',
          examples: [
            { type: 'comment', text: '# 本地 dev 推送到遠端 development' },
            { type: 'command', text: 'git push origin dev:development' },
            { type: 'comment', text: '# 本地 feature/login 推送到遠端 feature/auth' },
            { type: 'command', text: 'git push origin feature/login:feature/auth' },
            { type: 'comment', text: '# 刪除遠端分支（推送「空的」到遠端）' },
            { type: 'command', text: 'git push origin :old-branch' },
          ],
          copyText: 'git push origin dev:development',
        },
        {
          cmd: 'git push --force / --force-with-lease',
          syntax: 'git push --force-with-lease',
          desc: '強制推送（force push）會覆蓋遠端歷史。rebase 後通常需要 force push，但請優先使用更安全的 --force-with-lease。',
          examples: [
            { type: 'comment', text: '# ✅ 推薦：安全的 force push（會檢查遠端有無新 commit）' },
            { type: 'command', text: 'git push --force-with-lease' },
            { type: 'comment', text: '# ⚠️ 暴力 force push（直接覆蓋，不檢查）' },
            { type: 'command', text: 'git push --force' },
            { type: 'comment', text: '# 常見流程：rebase 後推送' },
            { type: 'command', text: 'git rebase main' },
            { type: 'command', text: 'git push --force-with-lease' },
          ],
          flags: [
            { flag: '--force', desc: '強制覆蓋遠端（危險）' },
            { flag: '--force-with-lease', desc: '安全版 force push（推薦）' },
          ],
          copyText: 'git push --force-with-lease',
        },
      ],
    },

    // ===== 同步遠端 =====
    {
      id: 'sync',
      title: '同步與拉取',
      color: 'orange',
      commands: [
        {
          cmd: 'git pull',
          syntax: 'git pull [選項] [遠端] [分支]',
          desc: '從遠端下載最新的變更並合併到本地。相當於 git fetch + git merge。',
          examples: [
            { type: 'comment', text: '# 拉取並合併' },
            { type: 'command', text: 'git pull' },
            { type: 'comment', text: '# 拉取並用 rebase 整合（讓歷史更乾淨）' },
            { type: 'command', text: 'git pull --rebase' },
          ],
          flags: [
            { flag: '--rebase', desc: '用 rebase 取代 merge 來整合' },
          ],
          copyText: 'git pull --rebase',
        },
        {
          cmd: 'git fetch',
          syntax: 'git fetch [選項] [遠端]',
          desc: '從遠端下載最新資訊，但不會自動合併。適合先看看遠端有什麼變更再決定怎麼處理。',
          examples: [
            { type: 'comment', text: '# 下載遠端最新資訊' },
            { type: 'command', text: 'git fetch' },
            { type: 'comment', text: '# 下載並清除已刪除的遠端分支' },
            { type: 'command', text: 'git fetch --prune' },
            { type: 'comment', text: '# 看看遠端和本地有什麼差異' },
            { type: 'command', text: 'git fetch' },
            { type: 'command', text: 'git log main..origin/main --oneline' },
          ],
          flags: [
            { flag: '--prune', desc: '清除本地已不存在於遠端的分支追蹤' },
            { flag: '--all', desc: '下載所有遠端的資訊' },
          ],
          copyText: 'git fetch --prune',
        },
        {
          cmd: 'git remote',
          syntax: 'git remote [選項]',
          desc: '管理遠端儲存庫的連線設定。',
          examples: [
            { type: 'comment', text: '# 列出所有遠端' },
            { type: 'command', text: 'git remote -v' },
            { type: 'comment', text: '# 新增遠端' },
            { type: 'command', text: 'git remote add upstream https://github.com/original/repo.git' },
            { type: 'comment', text: '# 修改遠端網址' },
            { type: 'command', text: 'git remote set-url origin https://github.com/user/new-repo.git' },
          ],
          copyText: 'git remote -v',
        },
      ],
    },

    // ===== 實用 Optional 指令 =====
    {
      id: 'optional',
      title: '實用進階指令',
      color: 'dim',
      commands: [
        {
          cmd: 'git pull --prune',
          syntax: 'git pull --prune',
          desc: '拉取遠端最新變更的同時，清除本地追蹤中已經被遠端刪掉的分支。保持本地分支清單乾淨。',
          examples: [
            { type: 'comment', text: '# 拉取 + 清除過期的遠端分支追蹤' },
            { type: 'command', text: 'git pull --prune' },
            { type: 'comment', text: '# 效果等同於：' },
            { type: 'command', text: 'git fetch --prune && git merge' },
          ],
          copyText: 'git pull --prune',
        },
        {
          cmd: 'git cherry-pick',
          syntax: 'git cherry-pick <commit-hash>',
          desc: '挑選特定的 commit 套用到目前的分支。適合只需要某個修復、不需要整個分支的情境。',
          examples: [
            { type: 'comment', text: '# 挑選單一 commit' },
            { type: 'command', text: 'git cherry-pick abc1234' },
            { type: 'comment', text: '# 挑選多個 commit' },
            { type: 'command', text: 'git cherry-pick abc1234 def5678' },
          ],
          copyText: 'git cherry-pick abc1234',
        },
        {
          cmd: 'git reset',
          syntax: 'git reset [模式] <commit>',
          desc: '把分支指標往回移動。根據模式不同，可以只撤銷 commit、保留或丟棄檔案變更。',
          examples: [
            { type: 'comment', text: '# 撤銷 commit，保留檔案變更在暫存區' },
            { type: 'command', text: 'git reset --soft HEAD~1' },
            { type: 'comment', text: '# 撤銷 commit，保留檔案變更但移出暫存區（預設）' },
            { type: 'command', text: 'git reset HEAD~1' },
            { type: 'comment', text: '# ⚠️ 撤銷 commit 並丟掉所有變更（危險！）' },
            { type: 'command', text: 'git reset --hard HEAD~1' },
          ],
          flags: [
            { flag: '--soft', desc: '保留變更在暫存區' },
            { flag: '--mixed', desc: '保留變更但移出暫存區（預設）' },
            { flag: '--hard', desc: '丟掉所有變更（不可逆）' },
          ],
          copyText: 'git reset --soft HEAD~1',
        },
        {
          cmd: 'git restore',
          syntax: 'git restore [選項] <檔案>',
          desc: '復原檔案的變更。Git 2.23+ 新增的指令，取代部分 git checkout 的功能。',
          examples: [
            { type: 'comment', text: '# 放棄工作目錄的變更（回到上次 commit 的狀態）' },
            { type: 'command', text: 'git restore index.html' },
            { type: 'comment', text: '# 把檔案從暫存區移回工作目錄（取消 git add）' },
            { type: 'command', text: 'git restore --staged index.html' },
          ],
          flags: [
            { flag: '--staged', desc: '從暫存區移回工作目錄' },
          ],
          copyText: 'git restore --staged index.html',
        },
        {
          cmd: 'git reflog',
          syntax: 'git reflog',
          desc: '顯示所有 HEAD 的移動紀錄，包含已經被 reset 的 commit。救回誤刪的 commit 全靠它！',
          examples: [
            { type: 'comment', text: '# 查看所有操作紀錄' },
            { type: 'command', text: 'git reflog' },
            { type: 'comment', text: '# 找到誤刪的 commit hash 後，可以用 reset 救回' },
            { type: 'command', text: 'git reset --hard abc1234' },
          ],
          copyText: 'git reflog',
        },
        {
          cmd: 'git clean',
          syntax: 'git clean [選項]',
          desc: '刪除工作目錄中未被 Git 追蹤的檔案。適合清理產生的暫存檔或 build 產出物。',
          examples: [
            { type: 'comment', text: '# 先預覽會刪除哪些檔案' },
            { type: 'command', text: 'git clean -n' },
            { type: 'comment', text: '# 確認後真的刪除' },
            { type: 'command', text: 'git clean -f' },
            { type: 'comment', text: '# 連資料夾一起刪除' },
            { type: 'command', text: 'git clean -fd' },
          ],
          flags: [
            { flag: '-n', desc: '預覽模式（不真的刪）' },
            { flag: '-f', desc: '確認刪除' },
            { flag: '-d', desc: '連未追蹤的資料夾也刪' },
          ],
          copyText: 'git clean -n',
        },
      ],
    },
  ],
}
