# 114 學年度交通安全教育訪視及輔導 — 逢甲大學

逢甲大學交通安全教育訪視及輔導網站，用於呈現學校在交通安全教育方面的組織規劃、教學宣導、實施成效等內容。網站使用 **StatiCrypt** 進行靜態密碼保護，訪客需輸入密碼方可瀏覽。

## 網站架構

| 頁面檔案 | 內容說明 |
|---|---|
| `index.html` | 首頁（加密後的版本，含密碼輸入頁面） |
| `TSE_commitee.html` | 交通安全教育組織 |
| `TSE_plan.html` | 交通安全教育計畫 |
| `TSE_promotion.html` | 交通安全教育宣導 |
| `STS_club.html` | 學生交通安全社團 |
| `PSS_incident.html` | 防制學生危安措施 |
| `CTS_facilities.html` | 校內交通安全設施 |
| `IMTS_education.html` | 交通安全教育創新措施 |
| `TS_outstanding.html` | 交通安全特殊優良事蹟 |
| `TS_outstanding_video.html` | 優良事蹟影片 |

## 技術架構

- **前端框架**：Bootstrap 5 + 自訂 CSS
- **字型**：Google Fonts（Lora、Open Sans）
- **圖示**：Font Awesome 6
- **密碼保護**：[StatiCrypt](https://github.com/robinmoisson/staticrypt) v3.5.4

## 專案結構

```
FCUWeb/
├── .staticrypt-src/
│   └── index.html          # 首頁原始碼（未加密版本）
├── css/
│   └── styles.css          # 樣式表（含 Bootstrap）
├── js/
│   └── scripts.js          # JavaScript 腳本
├── index.html              # 首頁（加密後，含密碼保護頁面）
├── *.html                  # 各子頁面
├── staticrypt-template.html # StatiCrypt 密碼頁面模板
├── .staticrypt.json        # StatiCrypt 加密設定
├── package.json            # npm 設定與加密指令
└── .gitignore
```

## 開始使用

### 安裝相依套件

```bash
npm install
```

### 修改首頁內容

1. 編輯 `.staticrypt-src/index.html`（這是首頁的原始碼）
2. 執行加密指令產生密碼保護版本：

```bash
npm run encrypt:index
```

> ⚠️ **注意**：請勿直接編輯根目錄的 `index.html`，該檔案是加密後自動產生的。修改內容請編輯 `.staticrypt-src/index.html`。

3. 加密完成後，根目錄的 `index.html` 會被更新為帶有密碼保護的版本

### 修改子頁面

子頁面（如 `TSE_commitee.html`、`STS_club.html` 等）不受密碼保護，可直接編輯。

## 部署

本網站為純靜態頁面，可直接部署至 GitHub Pages 或任何靜態網站託管服務。
