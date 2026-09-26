# WAT Note(III)

このリポジトリは、Next.js と TypeScript で構築した個人ブログです。Markdown をソースにした静的サイトとしてビルドし、CDN/オブジェクトストレージ環境にデプロイ可能な構成になっています。
利用している技術スタックや設計方針、開発・テスト・デプロイの方法をまとめます。

## 特徴 / Features

- **静的サイト生成 (SSG) と完全静的エクスポート**: `output: "export"` による静的書き出し。`trailingSlash: true` で GitHub Pages / CDN での配信に最適化。
- **Markdown ベース**: 記事は `/_posts` の Markdown で管理。GFM、数式、シンタックスハイライト対応。
- **検索**: Algolia + React InstantSearch によるクライアントサイド検索。
- **デザイン**: Tailwind CSS によるユーティリティファーストなスタイリング。
- **状態管理**: Recoil (一部 localstorage 利用) をポイントで採用。
- **RSS 配信**: ビルド時に RSS を自動生成。
- **ドキュメント/デザインレビュー**: Storybook + Chromatic で UI の可視化とレビュー。
- **ビジュアルリグレッションテスト**: Playwright でスナップショット比較。

## 技術スタック / Tech Stack

- **フレームワーク**: Next.js 16 (`next@^16.0.8`)、React 18
- **言語**: TypeScript (`typescript@^5.6.2`)
- **パッケージマネージャ**: pnpm
- **ビルド/ランタイム**: ESM、`tsx` によるビルド後スクリプト実行
- **スタイル**: Tailwind CSS 3、PostCSS、Autoprefixer
- **Markdown/HTML パイプライン**:
  - `remark`, `remark-parse`, `remark-gfm`, `remark-html`, `remark-math`
  - `rehype-katex`, `rehype-stringify`, `remark-rehype`, `unified`
  - コードハイライト: `highlight.js`
- **検索**: `algoliasearch`, `react-instantsearch`, `@algolia/client-search`
- **状態管理**: `recoil`
- **RSS**: `feed`（`src/lib/generateRSS.ts` をビルド後に実行）
- **テスト**:
  - E2E/VRT: Playwright (`@playwright/test`)
  - Unit/DOM: Vitest (`vitest`, `@vitest/coverage-v8`, `@vitest/browser`) + `jsdom`
- **ドキュメント/UI カタログ**: Storybook 10（`@storybook/react-vite` 構成）+ Chromatic
- **設定/その他**: `dotenv`, `gray-matter`（Front Matter 解析）、`husky`（Git フック）
- **アクセス解析**: `@next/third-parties`（Google Analytics）
- **AI レビュー**: `openai`（記事レビュー用ツール）
- **インフラ（任意）**: AWS CDK (`aws-cdk-lib`, `constructs`) による IaC。`infra/` 参照。

## ディレクトリ構成（抜粋）

```
note3-next/
  _posts/            # 記事の Markdown
  _notes/            # 補助用ノート等（任意）
  public/            # 静的アセット
  src/
    pages/           # ルーティング（Next.js Pages）
    components/      # UI コンポーネント
    lib/             # RSS 生成などのユーティリティ
    styles/          # グローバル/レイヤー別スタイル
    hooks/           # カスタムフック
    atoms/           # Recoil atoms/selectors
    api/             # 取得・整形ロジック 等
    interfaces/      # 型定義
  tests/             # Playwright / Vitest テスト
  tools/             # 運用スクリプト（Algolia 同期、更新日時更新、AI レビュー等）
  .storybook/        # Storybook 設定
  .husky/            # Git フック（pre-commit / pre-push）
  infra/             # CDK スタック（任意）
```

## セットアップ / Getting Started

```bash
# 依存関係のインストール
pnpm install --frozen-lockfile

# 開発サーバ起動
pnpm dev
# http://localhost:3000
```

## スクリプト / package.json scripts

- `dev`: 開発サーバ起動 (Next.js)
- `build`: 本番ビルド + RSS 生成（`tsx src/lib/generateRSS.ts`）
- `start`: 静的書き出しでない場合のサーバ起動（基本は `out/` を配信）
- `typecheck`: TypeScript 型チェック
- `storybook`: Storybook 開発サーバ
- `build-storybook`: Storybook 静的ビルド
- `chromatic`: Chromatic へ Storybook をアップロード
- `git:push`: `git push` 後に Chromatic を実行
- `test:vrt`: Playwright によるスナップショット更新（VRT 基準更新）
- `test:vrt-report`: Playwright レポート表示
- `test`: Vitest によるユニットテスト実行
- `prepare`: husky の Git フックをセットアップ（`pnpm install` 時に自動実行）
- `review`: 記事の AI レビュー（詳細は「[記事の AI レビュー](#記事の-ai-レビュー)」参照）

## Markdown / 数式 / ハイライト

- **GFM**: テーブル、チェックボックス等に対応（`remark-gfm`）
- **数式**: `remark-math` + `rehype-katex` で \(\LaTeX\) 記法をサポート
- **ハイライト**: `highlight.js` によるコードブロックのシンタックスハイライト

## 検索（Algolia）

- クライアント検索に `algoliasearch` + `react-instantsearch` を使用
- インデクシング戦略は運用環境に合わせて設定し、必要に応じて Crawler や API 経由で同期

## テスト / 品質保証

- **VRT (Visual Regression Testing)**: Playwright のスナップショット（`test-snapshots/`）で視覚差分を検出
  - 期待どおりの見た目変更時は `pnpm test:vrt` でスナップショット更新
  - 差分の可視化は `pnpm test:vrt-report`
- **Unit/DOM**: Vitest + jsdom によりロジックやコンポーネント単位のテストを実施
- **Storybook + Chromatic**: コンポーネントの回帰や Visual Check を PR レビューに組み込み可能

## ビルド/出力

- `next.config.js`
  - `output: "export"` で `out/` に完全静的出力
  - `trailingSlash: true` で階層配信フレンドリー
  - `turbopack: {}` で Turbopack を利用

## デプロイ

- 静的サイトとして `out/` を配信
  - 例: GitHub Pages、CloudFront + S3、Vercel（Static Export）など
- インフラをコード化する場合は `infra/` の AWS CDK を利用（任意）

## コンテンツの追加

1. `/_posts` に Markdown を追加（Front Matter 対応）
2. ビルドで HTML 化・一覧へ反映、RSS も再生成

## 記事の AI レビュー

`tools/review/reviewPost.ts` で、`/_posts` の記事をレビュープロンプトと組み合わせて AI にレビューさせられます。

### 使い方

```bash
# ChatGPT 画面用：プロンプト＋記事をクリップボードにコピー（API は呼ばない・費用なし）
pnpm review algolia --copy

# OpenAI API でレビューし、結果をファイルに保存
pnpm review algolia
pnpm review _posts/algolia.md   # パス指定も可

# 別のプロンプトを使う
pnpm review algolia --prompt tools/review/prompts/typo.md
```

- `--copy`: 実行後、ChatGPT の入力欄に `⌘V` で貼り付けて送信する（macOS の `pbcopy` を使用）
- API モード: 結果は `tools/review/results/<記事名>_<YYYYMMDD-HHmmss>.md` に保存（git 管理外）

### 設定（API モードのみ）

`.env` に以下を設定します。API の利用には OpenAI のクレジットが必要です。

```
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5-mini   # 任意。未指定時は gpt-5-mini
```

### レビュープロンプト

- 既定のプロンプトは `tools/review/prompts/default.md`。自由に編集・追加可能
- プロンプト内の `{{title}}` / `{{excerpt}}` / `{{tags}}` は記事の Front Matter の値に置換される

## ライセンス

- 本リポジトリのコードは個人利用を前提としています。再利用ポリシーは必要に応じて追記します。

---

質問・バグ報告・提案などは Issue または PR にてお気軽にお知らせください。
