import type { CheatsheetTopic } from './types'

export const k9sTopic: CheatsheetTopic = {
  id: 'k9s',
  title: 'k9s',
  description: 'Kubernetes 終端 UI 管理工具 k9s 的常用操作與 K8s 基礎概念',
  heroTitle: 'k9s Cheatsheet',
  heroDesc:
    '收錄 Kubernetes 核心概念與 k9s 終端管理工具的常用操作，附有<strong class="text-dock-text">白話說明</strong>與<strong class="text-dock-text">快捷鍵</strong>，方便快速上手。',
  sections: [
    {
      id: 'k8s-concepts',
      title: 'Kubernetes 核心概念',
      color: 'accent',
      concepts: [
        {
          title: 'Cluster（叢集）',
          desc: '一組機器（Node）的集合，由 Kubernetes 統一管理。所有的容器化應用都運行在 Cluster 上。',
          details: [
            'Control Plane：管理整個叢集的核心元件',
            'Worker Node：實際運行應用的機器',
          ],
        },
        {
          title: 'Node（節點）',
          desc: 'Cluster 裡的一台機器（實體或虛擬），負責運行 Pod。每個 Node 都有 kubelet 代理程式。',
          details: [
            'Master Node：運行 Control Plane 元件',
            'Worker Node：運行應用 Pod',
          ],
        },
        {
          title: 'Pod',
          desc: 'Kubernetes 最小的部署單位。一個 Pod 裡可以跑一個或多個容器，它們共享網路和儲存。',
          details: [
            '通常一個 Pod 只跑一個容器',
            'Pod 內的容器共享同一個 IP 和 port 空間',
            'Pod 是臨時的，隨時可能被重建',
          ],
        },
        {
          title: 'Deployment',
          desc: '用來宣告「我想要幾個 Pod、跑什麼映像檔」的資源。Deployment 會自動管理 Pod 的建立、更新和回滾。',
          details: [
            '指定 replicas（副本數）',
            '支援滾動更新和回滾',
            '是最常用的工作負載資源',
          ],
        },
        {
          title: 'Service',
          desc: '為一組 Pod 提供穩定的網路入口（固定 IP / DNS 名稱）。即使 Pod 被重建，Service 的位址不變。',
          details: [
            'ClusterIP：只在叢集內部可存取（預設）',
            'NodePort：透過 Node 的 port 對外曝露',
            'LoadBalancer：透過雲端負載均衡器對外曝露',
          ],
        },
        {
          title: 'Namespace',
          desc: '用來隔離和組織資源的虛擬分區。不同的團隊或環境（dev/staging/prod）可以用不同的 Namespace。',
          details: [
            '預設 namespace：default',
            '系統元件在 kube-system',
            '可以用 ResourceQuota 限制資源用量',
          ],
        },
        {
          title: 'ConfigMap & Secret',
          desc: 'ConfigMap 存放非機密的設定資料，Secret 存放敏感資料（密碼、token）。兩者都可以注入 Pod。',
          details: [
            '可以當環境變數注入',
            '可以掛載為檔案',
            'Secret 會做 base64 編碼（非加密）',
          ],
        },
        {
          title: 'Ingress',
          desc: '管理外部 HTTP/HTTPS 流量進入叢集的規則。可以設定域名路由、TLS 憑證等。',
          details: [
            '需要安裝 Ingress Controller（如 nginx-ingress）',
            '支援基於 host 和 path 的路由規則',
          ],
        },
      ],
    },
    {
      id: 'k9s-basics',
      title: 'k9s 基本操作',
      color: 'green',
      commands: [
        {
          cmd: 'k9s',
          syntax: 'k9s',
          desc: '啟動 k9s 終端 UI。預設會連線到 kubeconfig 中目前的 context。',
          examples: [
            { type: 'comment', text: '# 啟動 k9s' },
            { type: 'command', text: 'k9s' },
            { type: 'comment', text: '# 指定 namespace 啟動' },
            { type: 'command', text: 'k9s -n kube-system' },
            { type: 'comment', text: '# 指定 context 啟動' },
            { type: 'command', text: 'k9s --context my-cluster' },
          ],
          flags: [
            { flag: '-n', desc: '指定 namespace' },
            { flag: '--context', desc: '指定 K8s context' },
            { flag: '-c', desc: '指定啟動時的資源類型' },
          ],
          copyText: 'k9s',
        },
        {
          cmd: ':resource',
          syntax: ':pod / :deploy / :svc / :ns / ...',
          desc: '在 k9s 中按 : 後輸入資源類型名稱，快速切換到該資源的列表視圖。',
          examples: [
            { type: 'comment', text: '# 切換到 Pod 列表' },
            { type: 'command', text: ':pod' },
            { type: 'comment', text: '# 切換到 Deployment 列表' },
            { type: 'command', text: ':deploy' },
            { type: 'comment', text: '# 切換到 Service 列表' },
            { type: 'command', text: ':svc' },
            { type: 'comment', text: '# 切換到 Namespace 列表' },
            { type: 'command', text: ':ns' },
            { type: 'comment', text: '# 切換到 Node 列表' },
            { type: 'command', text: ':node' },
          ],
        },
        {
          cmd: '/ (搜尋)',
          syntax: '/ <關鍵字>',
          desc: '在目前的資源列表中搜尋篩選。輸入關鍵字後即時過濾。',
          examples: [
            { type: 'comment', text: '# 搜尋名稱含 "web" 的資源' },
            { type: 'command', text: '/web' },
            { type: 'comment', text: '# 按 Esc 清除搜尋' },
          ],
        },
      ],
    },
    {
      id: 'k9s-navigation',
      title: 'k9s 導航快捷鍵',
      color: 'purple',
      commands: [
        {
          cmd: '通用快捷鍵',
          syntax: '快捷鍵操作',
          desc: 'k9s 中通用的鍵盤快捷鍵，用於導航和操作資源。',
          examples: [
            { type: 'comment', text: '# 進入資源詳細 / 子資源' },
            { type: 'command', text: 'Enter' },
            { type: 'comment', text: '# 返回上一層' },
            { type: 'command', text: 'Esc' },
            { type: 'comment', text: '# 查看資源 YAML' },
            { type: 'command', text: 'y' },
            { type: 'comment', text: '# 描述資源（kubectl describe）' },
            { type: 'command', text: 'd' },
            { type: 'comment', text: '# 編輯資源 YAML' },
            { type: 'command', text: 'e' },
            { type: 'comment', text: '# 刪除資源' },
            { type: 'command', text: 'Ctrl+d' },
            { type: 'comment', text: '# 殺掉資源（強制刪除）' },
            { type: 'command', text: 'Ctrl+k' },
          ],
        },
        {
          cmd: 'Pod 操作快捷鍵',
          syntax: 'Pod 專用操作',
          desc: '在 Pod 列表視圖中可用的快捷鍵。',
          examples: [
            { type: 'comment', text: '# 查看 Pod 日誌' },
            { type: 'command', text: 'l' },
            { type: 'comment', text: '# 進入 Pod 的 shell' },
            { type: 'command', text: 's' },
            { type: 'comment', text: '# Port forward' },
            { type: 'command', text: 'Shift+f' },
            { type: 'comment', text: '# 查看容器列表（多容器 Pod）' },
            { type: 'command', text: 'Enter' },
          ],
        },
      ],
    },
    {
      id: 'k9s-views',
      title: 'k9s 視圖切換',
      color: 'yellow',
      commands: [
        {
          cmd: '視圖快捷鍵',
          syntax: '數字鍵 0-4',
          desc: '在資源列表中按數字鍵可切換不同的視圖模式。',
          examples: [
            { type: 'comment', text: '# 預設視圖' },
            { type: 'command', text: '0' },
            { type: 'comment', text: '# 依 namespace 分組' },
            { type: 'command', text: '1' },
            { type: 'comment', text: '# 排序切換' },
            { type: 'command', text: '2' },
          ],
        },
        {
          cmd: '日誌視圖操作',
          syntax: '日誌快捷鍵',
          desc: '在日誌視圖（按 l 進入）中的操作。',
          examples: [
            { type: 'comment', text: '# 切換自動滾動' },
            { type: 'command', text: 's' },
            { type: 'comment', text: '# 切換顯示時間戳' },
            { type: 'command', text: 't' },
            { type: 'comment', text: '# 切換自動換行' },
            { type: 'command', text: 'w' },
            { type: 'comment', text: '# 返回資源列表' },
            { type: 'command', text: 'Esc' },
          ],
        },
      ],
    },
    {
      id: 'k9s-management',
      title: 'k9s 叢集管理',
      color: 'orange',
      commands: [
        {
          cmd: ':ctx',
          syntax: ':ctx',
          desc: '切換 Kubernetes context（叢集）。列出所有可用的 context 讓你選擇。',
          examples: [
            { type: 'comment', text: '# 開啟 context 選擇列表' },
            { type: 'command', text: ':ctx' },
            { type: 'comment', text: '# 用 Enter 選擇要切換的 context' },
          ],
          copyText: ':ctx',
        },
        {
          cmd: ':xray',
          syntax: ':xray <資源類型>',
          desc: '以樹狀結構顯示資源之間的依賴關係，幫助理解資源間的關聯。',
          examples: [
            { type: 'comment', text: '# 查看 Deployment 的 xray 視圖' },
            { type: 'command', text: ':xray deploy' },
            { type: 'comment', text: '# 查看 Service 的 xray 視圖' },
            { type: 'command', text: ':xray svc' },
          ],
        },
        {
          cmd: ':pulse',
          syntax: ':pulse',
          desc: '顯示叢集的整體健康狀態概覽，包含資源使用量和事件摘要。',
          examples: [
            { type: 'comment', text: '# 開啟 pulse 概覽' },
            { type: 'command', text: ':pulse' },
          ],
          copyText: ':pulse',
        },
      ],
    },
  ],
}
