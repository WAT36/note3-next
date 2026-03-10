---
title: "TanStack Router"
excerpt: ""
coverImage: ""
date: "2026-03-09T22:12:47.000Z"
updatedAt: "2026-03-09T22:12:47.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

こんにちは！今回は、React アプリケーションのルーティングライブラリとして注目を集めている **TanStack Router** について、初学者向けに解説していきます。

従来の React Router とは異なるアプローチで、**100%型安全**なルーティングを実現するこのライブラリの魅力を、ハンズオン形式で学んでいきましょう。

---

## TanStack Router とは？

### 概要

TanStack Router は、[Tanner Linsley](https://github.com/tannerlinsley)氏（TanStack Query や TanStack Table の作者）が開発した、**TypeScript ファーストのルーティングライブラリ**です。

### 主な特徴

| 特徴                             | 説明                                                 |
| -------------------------------- | ---------------------------------------------------- |
| **100%型安全**                   | パス、パラメータ、検索クエリがすべて型チェックされる |
| **ファイルベースルーティング**   | Next.js のようなファイル構造でルートを自動生成       |
| **組み込みのデータローディング** | ルートレベルでのデータ取得をネイティブサポート       |
| **検索パラメータの状態管理**     | URL の検索パラメータを型安全に扱える                 |
| **DevTools**                     | 開発時のデバッグを強力にサポート                     |

### React Router との違い

```
React Router:
- 長い歴史と大きなコミュニティ
- v6で大幅に改善されたが、型安全性は限定的
- 学習リソースが豊富

TanStack Router:
- TypeScriptとの親和性が非常に高い
- パスのtypoをコンパイル時に検出可能
- 検索パラメータの型定義が容易
```

---

## 環境構築

### 前提条件

- Node.js 18 以上
- npm または yarn または pnpm
- TypeScript の基本的な知識

### プロジェクトのセットアップ

```bash
# Viteでプロジェクトを作成
npm create vite@latest tanstack-router-demo -- --template react-ts

# プロジェクトディレクトリに移動
cd tanstack-router-demo

# TanStack Routerをインストール
npm install @tanstack/react-router

# 開発用のViteプラグインとルーター生成ツールをインストール
npm install -D @tanstack/router-plugin @tanstack/router-devtools
```

---

## ハンズオン：基本的なルーティングを実装する

### Step 1: Vite 設定の更新

まず、`vite.config.ts`を編集して TanStack Router のプラグインを追加します。

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
});
```

### Step 2: ルートファイルの構造を作成

以下のようなディレクトリ構造を作成します。

```
src/
├── routes/
│   ├── __root.tsx      # ルートレイアウト
│   ├── index.tsx       # "/" のページ
│   ├── about.tsx       # "/about" のページ
│   └── posts/
│       ├── index.tsx   # "/posts" のページ
│       └── $postId.tsx # "/posts/:postId" のページ（動的ルート）
├── main.tsx
└── routeTree.gen.ts    # 自動生成される
```

### Step 3: ルートレイアウトの作成

```typescript
// src/routes/__root.tsx
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav
        style={{
          padding: "1rem",
          borderBottom: "1px solid #ccc",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          🏠 ホーム
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          📖 About
        </Link>
        <Link to="/posts" style={{ textDecoration: "none" }}>
          📝 記事一覧
        </Link>
      </nav>
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});
```

### Step 4: 各ページコンポーネントの作成

```typescript
// src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <h1>🎉 TanStack Router デモへようこそ！</h1>
      <p>このサイトでTanStack Routerの基本的な使い方を学びましょう。</p>
    </div>
  );
}
```

```typescript
// src/routes/about.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <h1>📖 About</h1>
      <p>TanStack Routerは、型安全なルーティングを提供するライブラリです。</p>
      <h2>主な特徴</h2>
      <ul>
        <li>TypeScriptファースト設計</li>
        <li>ファイルベースルーティング</li>
        <li>組み込みのデータローディング</li>
      </ul>
    </div>
  );
}
```

```typescript
// src/routes/posts/index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";

// サンプルデータ
const posts = [
  { id: 1, title: "TanStack Routerの基本" },
  { id: 2, title: "動的ルートの使い方" },
  { id: 3, title: "データローディングのベストプラクティス" },
];

export const Route = createFileRoute("/posts/")({
  component: PostsPage,
});

function PostsPage() {
  return (
    <div>
      <h1>📝 記事一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "0.5rem" }}>
            <Link
              to="/posts/$postId"
              params={{ postId: String(post.id) }}
              style={{ textDecoration: "none", color: "#0066cc" }}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Step 5: 動的ルート（パラメータ付き）の作成

```typescript
// src/routes/posts/$postId.tsx
import { createFileRoute } from "@tanstack/react-router";

// サンプルデータ
const postsData: Record<string, { title: string; content: string }> = {
  "1": {
    title: "TanStack Routerの基本",
    content: "TanStack Routerは型安全なルーティングを実現します...",
  },
  "2": {
    title: "動的ルートの使い方",
    content: "$接頭辞を使ってパラメータを受け取ることができます...",
  },
  "3": {
    title: "データローディングのベストプラクティス",
    content: "loaderオプションを使用してデータを事前に取得できます...",
  },
};

export const Route = createFileRoute("/posts/$postId")({
  component: PostDetailPage,
});

function PostDetailPage() {
  // paramsは型安全！ postIdが自動的に推論される
  const { postId } = Route.useParams();
  const post = postsData[postId];

  if (!post) {
    return <div>記事が見つかりませんでした</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p style={{ color: "#666", marginTop: "1rem" }}>記事ID: {postId}</p>
    </div>
  );
}
```

### Step 6: main.tsx の設定

```typescript
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// 自動生成されるルートツリーをインポート
import { routeTree } from "./routeTree.gen";

// ルーターインスタンスを作成
const router = createRouter({ routeTree });

// 型安全のためのモジュール拡張
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

### Step 7: 開発サーバーの起動

```bash
npm run dev
```

これで、`http://localhost:5173` でアプリケーションが起動します！

---

## 型安全性を体験してみよう

TanStack Router の最大の魅力は型安全性です。以下のコードをエディタで試してみてください。

```typescript
// ✅ 正しいパス - 型チェックOK
<Link to="/posts/$postId" params={{ postId: "1" }}>記事1</Link>

// ❌ 存在しないパス - コンパイルエラー！
<Link to="/nonexistent">存在しないページ</Link>

// ❌ パラメータの指定漏れ - コンパイルエラー！
<Link to="/posts/$postId">パラメータがない</Link>
```

IDE の補完機能を使うと、利用可能なルートが自動的にサジェストされるのも便利なポイントです。

---

## 検索パラメータの型安全な扱い

TanStack Router では、検索パラメータも型安全に扱えます。

```typescript
// src/routes/posts/index.tsx を拡張
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

// 検索パラメータのスキーマを定義
const postsSearchSchema = z.object({
  page: z.number().optional().default(1),
  filter: z.enum(["all", "published", "draft"]).optional().default("all"),
});

export const Route = createFileRoute("/posts/")({
  // 検索パラメータのバリデーション
  validateSearch: postsSearchSchema,
  component: PostsPage,
});

function PostsPage() {
  // 検索パラメータを型安全に取得
  const { page, filter } = Route.useSearch();

  return (
    <div>
      <h1>📝 記事一覧</h1>
      <p>現在のページ: {page}</p>
      <p>フィルター: {filter}</p>

      {/* 検索パラメータ付きのリンク */}
      <Link to="/posts" search={{ page: 2, filter: "published" }}>
        2ページ目（公開済みのみ）
      </Link>
    </div>
  );
}
```

---

## データローディング

ルートにローダーを定義して、ページ表示前にデータを取得することもできます。

```typescript
// src/routes/posts/$postId.tsx
import { createFileRoute } from "@tanstack/react-router";

// 非同期でデータを取得する関数（実際はAPIコール）
async function fetchPost(postId: string) {
  // シミュレートされたAPI呼び出し
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id: postId,
    title: `記事 ${postId}`,
    content: "記事の内容...",
  };
}

export const Route = createFileRoute("/posts/$postId")({
  // ページ表示前にデータをロード
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId);
    return { post };
  },
  component: PostDetailPage,
});

function PostDetailPage() {
  // loaderのデータを取得（型安全！）
  const { post } = Route.useLoaderData();

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
```

---

## まとめ

TanStack Router は、以下のような場面で特に威力を発揮します。

- **大規模な TypeScript プロジェクト** - 型安全性によりリファクタリングが安全に行える
- **複雑な検索パラメータを扱うアプリ** - フィルターやページネーションの管理が楽になる
- **チーム開発** - 型定義により、ルートの仕様が明確になる
