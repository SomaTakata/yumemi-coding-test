# 🌏都道府県別人口推移可視化

このプロジェクトは、ReactとHighchartsを使用して都道府県別人口推移を可視化します。APIからデータを取得し、都道府県を選択して人口推移を表示するインタラクティブなコンポーネントを提供します。

## 🔗リンク

[ウェブサイト](https://yumemi-coding-test-soma.vercel.app/)

## 📖目次

1. [特徴](#特徴)
2. [技術スタック](#技術スタック)
3. [必要条件](#必要条件)
4. [インストール](#インストール)
5. [セットアップ](#セットアップ)
6. [開発](#開発)
7. [テスト](#テスト)
8. [リンティング](#リンティング)
9. [プロジェクト構成](#プロジェクト構成)
10. [APIエンドポイント](#apiエンドポイント)
11. [関連するプルリクエスト](#関連するプルリクエスト)

## 🌟特徴

- APIから都道府県および人口データを取得
- 都道府県のリストを表示して選択可能
- Highchartsを使用した人口推移の可視化
- 総人口、年少人口、生産年齢人口、老年人口のデータセットを切り替え可能

## 🛠技術スタック

- Frontend : [Next.js](https://nextjs.org/)
- Styling : [TailwindCSS](https://tailwindcss.com/)
- Charting : [HighCharts](https://www.highcharts.com/)
- Icons : [ReactIcons](https://react-icons.github.io/react-icons/)
- Test :
  - [Jest](https://jestjs.io/ja/)
  - [Testing Library](https://testing-library.com/)
- Lintter・Formatter :
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - [Husky](https://typicode.github.io/husky/)
  - [lint-staged](https://github.com/lint-staged/lint-staged)
  - [markuplint](https://markuplint.dev/ja/)
  - [secretlint](https://github.com/secretlint/secretlint)

## 📋必要条件

- Node.js
- pnpm

## 💻インストール

リポジトリをクローン:

```bash
git clone git@github.com:SomaTakata/yumemi-coding-test.git
cd yumemi-coding-test
```

依存関係をインストール:

```bash
pnpm install
```

## 🛠️セットアップ

ルートディレクトリに`.env.local`ファイルを作成し、APIキーを追加:

```bash
RESAS_API_KEY=your_api_key
```

## 🚀開発

開発サーバーを起動:

```bash
pnpm run dev
```

ブラウザで http://localhost:3000/ を開いて結果を確認。

## 🧪テスト

テストを実行:

```bash
pnpm run test
```

## 🔍リンティング

ESLintを実行:

```bash
pnpm run lint
```

リンティングのエラーを修正:

```bash
pnpm run lint:fix
```

## 📂プロジェクト構成

```plaintext
├── README.md
├── jest.config.ts
├── jest.setup.ts
├── next-env.d.ts
├── next.config.mjs
├── node_modules
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
│   ├── next.svg
│   └── vercel.svg
├── src
│   ├── app
│   │   ├── (population-trends)
│   │   │   └── page.tsx
│   │   ├── api
│   │   │   ├── population
│   │   │   │   └── route.ts
│   │   │   └── prefectures
│   │   │       └── route.ts
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── data
│   │   └── regions.ts
│   ├── feature
│   │   └── populationTrends
│   │       ├── components
│   │       │   ├── DataSetSelector
│   │       │   │   ├── DataSetSelector.test.tsx
│   │       │   │   └── index.tsx
│   │       │   ├── LoadingPlaceholder
│   │       │   │   ├── LoadingPlaceholder.test.tsx
│   │       │   │   └── index.tsx
│   │       │   ├── PopulationChart
│   │       │   │   ├── PopulationChart.test.tsx
│   │       │   │   └── index.tsx
│   │       │   ├── PrefectureButton
│   │       │   │   ├── PrefectureButton.test.tsx
│   │       │   │   └── index.tsx
│   │       │   ├── PrefectureSelector
│   │       │   │   ├── PrefectureSelector.test.tsx
│   │       │   │   └── index.tsx
│   │       │   ├── RegionList
│   │       │   │   ├── RegionList.test.tsx
│   │       │   │   └── index.tsx
│   │       │   ├── RegionSelector
│   │       │   │   ├── RegionSelector.test.tsx
│   │       │   │   └── index.tsx
│   │       │   ├── RegionToggleButton
│   │       │   │   ├── RegionToggleButton.test.tsx
│   │       │   │   └── index.tsx
│   │       │   ├── ScrollButton
│   │       │   │   ├── ScrollButton.test.tsx
│   │       │   │   └── index.tsx
│   │       │   └── SelectedPrefectures
│   │       │       ├── SelectedPrefectures.test.tsx
│   │       │       └── index.tsx
│   │       ├── data
│   │       ├── hooks
│   │       │   ├── useFetchPrefectures
│   │       │   │   ├── index.ts
│   │       │   │   └── useFetchPrefectures.test.tsx
│   │       │   ├── usePopulationData
│   │       │   │   ├── index.ts
│   │       │   │   └── usePopulationData.test.tsx
│   │       │   └── usePrefectureSelection
│   │       │       ├── index.ts
│   │       │       └── usePrefectureSelection.test.tsx
│   │       └── pages
│   │           └── PopulationTrendsPage.tsx
│   ├── shared
│   │   ├── components
│   │   │   ├── Button
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.tsx
│   │   │   └── Icon
│   │   │       ├── Icon.test.tsx
│   │   │       └── index.tsx
│   │   ├── data
│   │   ├── hooks
│   │   └── utils
│   └── types
│       ├── index.ts
│       ├── prefecture.ts
│       └── region.ts
├── tailwind.config.ts
├── tsconfig.json
└── tsconfig.tsbuildinfo
```

## 📊APIエンドポイント

- `/api/prefectures`: 都道府県一覧を取得
- `/api/population`: 選択した都道府県の人口データを取得

## 🔄関連するプルリクエスト

関連するプルリクエストの概要をお読みください:

- [ESLint・Prettier・Markuplint・Secretlint・Husky の導入 #9](https://github.com/SomaTakata/yumemi-coding-test/pull/9)
- [UIの実装 #10](https://github.com/SomaTakata/yumemi-coding-test/pull/10)
- [APIの接続 #11](https://github.com/SomaTakata/yumemi-coding-test/pull/11)
- [テストの実装 #12](https://github.com/SomaTakata/yumemi-coding-test/pull/12)
- [CICDの設定 #15](https://github.com/SomaTakata/yumemi-coding-test/pull/15)
- [フォルダ構造の検討 #19](https://github.com/SomaTakata/yumemi-coding-test/pull/19)
