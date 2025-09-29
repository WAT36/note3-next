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

- **フレームワーク**: Next.js 14 (`next@^14.2.5`)
- **言語**: TypeScript (`typescript@^4.9.x`)
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
- **ドキュメント/UI カタログ**: Storybook 8（`@storybook/experimental-nextjs-vite` 構成）+ Chromatic
- **設定/その他**: `dotenv`, `gray-matter`（Front Matter 解析）
- **インフラ（任意）**: AWS CDK (`aws-cdk-lib`, `constructs`) による IaC。`infra/` 参照。

## ディレクトリ構成（抜粋）

```
nextjs-blog/
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
  tests/             # Playwright / Vitest テスト
  .storybook/        # Storybook 設定
  infra/             # CDK スタック（任意）
```

## セットアップ / Getting Started

```bash
# 依存関係のインストール
npm ci

# 開発サーバ起動
npm run dev
# http://localhost:3000
```

## スクリプト / npm scripts

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

## Markdown / 数式 / ハイライト

- **GFM**: テーブル、チェックボックス等に対応（`remark-gfm`）
- **数式**: `remark-math` + `rehype-katex` で \(\LaTeX\) 記法をサポート
- **ハイライト**: `highlight.js` によるコードブロックのシンタックスハイライト

## 検索（Algolia）

- クライアント検索に `algoliasearch` + `react-instantsearch` を使用
- インデクシング戦略は運用環境に合わせて設定し、必要に応じて Crawler や API 経由で同期

## テスト / 品質保証

- **VRT (Visual Regression Testing)**: Playwright のスナップショット（`test-snapshots/`）で視覚差分を検出
  - 期待どおりの見た目変更時は `npm run test:vrt` でスナップショット更新
  - 差分の可視化は `npm run test:vrt-report`
- **Unit/DOM**: Vitest + jsdom によりロジックやコンポーネント単位のテストを実施
- **Storybook + Chromatic**: コンポーネントの回帰や Visual Check を PR レビューに組み込み可能

## ビルド/出力

- `next.config.js`
  - `output: "export"` で `out/` に完全静的出力
  - `trailingSlash: true` で階層配信フレンドリー
  - Node コアモジュールの `fs` などはブラウザバンドルから除外

## デプロイ

- 静的サイトとして `out/` を配信
  - 例: GitHub Pages、CloudFront + S3、Vercel（Static Export）など
- インフラをコード化する場合は `infra/` の AWS CDK を利用（任意）

## コンテンツの追加

1. `/_posts` に Markdown を追加（Front Matter 対応）
2. ビルドで HTML 化・一覧へ反映、RSS も再生成

## ライセンス

- 本リポジトリのコードは個人利用を前提としています。再利用ポリシーは必要に応じて追記します。

---

質問・バグ報告・提案などは Issue または PR にてお気軽にお知らせください。
