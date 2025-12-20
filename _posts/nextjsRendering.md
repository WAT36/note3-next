---
title: "Next.jsのレンダリング方式整理"
excerpt: ""
coverImage: "/assets/blog/firstPost/nextjs-logo.png"
date: "2025-12-12T16:57:46.000Z"
updatedAt: "2025-12-12T16:57:46.000Z"
tag: ["フロントエンド"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Next.js のレンダリング方式について、思い出しきれなくなったため今一度各レンダリング方式の特徴と使い分けを整理したい。

本記事では、Next.js(App Router)における各レンダリング方式の違いと使い分けを、実際に動かしながら整理します。

# Next.js のレンダリング方式

Next.js には主に以下の 4 つのレンダリング方式があります。

1. **SSG (Static Site Generation)** - 静的サイト生成
2. **SSR (Server-Side Rendering)** - サーバーサイドレンダリング
3. **ISR (Incremental Static Regeneration)** - 増分静的再生成
4. **CSR (Client-Side Rendering)** - クライアントサイドレンダリング

それぞれ、HTML をいつ・どこで生成するかが異なります。

今回は、ハンズオンを通してそれぞれ実行して確認してみます。

# ハンズオン：環境情報

- **Next.js**: 14.x または 15.x
- **React**: 18.x 以降
- **Node.js**: 18.x 以降推奨

※本記事では**Next.js 14 以降の App Router**を使用します。

# プロジェクトのセットアップ

まず、Next.js プロジェクトを作成しましょう。

```bash
# Next.jsプロジェクトの作成
npx create-next-app@latest nextjs-rendering-demo

# 対話式で以下のように選択
# ✔ Would you like to use TypeScript? Yes
# ✔ Would you like to use ESLint? Yes
# ✔ Would you like to use Tailwind CSS? No (今回は使わない)
# ✔ Would you like to use `src/` directory? No
# ✔ Would you like to use App Router? Yes
# ✔ Would you like to customize the default import alias? No

# プロジェクトディレクトリに移動
cd nextjs-rendering-demo

# 開発サーバーの起動
npm run dev
```

これでローカル環境で `http://localhost:3000` にアクセスすることで表示できます。

---

# 1. SSG (Static Site Generation)

SSG は、ビルド時に静的な HTML ファイルを生成する方式です。一度生成された HTML は、すべてのユーザーに同じ内容が配信されます。

## 特徴

- **パフォーマンス**: 最速。すでに生成済みの HTML を返すだけ
- **SEO**: 優秀。クローラーがすぐにコンテンツを読める
- **更新頻度**: 低頻度向け。更新するには再ビルドが必要
- **コスト**: 低い。CDN で配信可能

## ハンズオン: ブログ記事一覧を作る

`app/blog/page.tsx` ファイルを作成してみましょう。

```tsx
type Post = {
  id: number;
  title: string;
  content: string;
};

async function getPosts(): Promise<Post[]> {
  // ビルド時に実行される
  // 実際にはAPIやデータベースから取得
  return [
    { id: 1, title: "最初の記事", content: "これはSSGで生成された記事です" },
    { id: 2, title: "2つ目の記事", content: "ビルド時に生成されます" },
    { id: 3, title: "Next.js入門", content: "Next.jsの基本を学びましょう" },
  ];
}

export default async function BlogPage() {
  const posts = await getPosts();
  const buildTime = new Date().toISOString();

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        color: "black",
      }}
    >
      <h1 style={{ color: "white" }}>ブログ記事一覧 (SSG)</h1>
      <p
        style={{
          background: "#fff3cd",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ffc107",
        }}
      >
        ビルド時刻: {buildTime}
      </p>

      <div>
        {posts.map((post) => (
          <article
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              margin: "15px 0",
              borderRadius: "5px",
              background: "#f9f9f9",
            }}
          >
            <h2 style={{ margin: "0 0 10px 0" }}>{post.title}</h2>
            <p style={{ margin: 0, color: "#555" }}>{post.content}</p>
          </article>
        ))}
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "15px 20px",
          background: "#e7f3ff",
          borderRadius: "5px",
        }}
      >
        <h3>SSGのポイント</h3>
        <ul>
          <li>ページを何度更新してもビルド時刻は変わりません</li>
          <li>ビルド時に一度だけHTMLが生成されます</li>
          <li>超高速で表示されます</li>
        </ul>
      </div>
    </div>
  );
}
```

- 実行方法

```bash
# 開発サーバーを起動
npm run dev
```

ブラウザで`http://localhost:3000/blog`にアクセスすると、以下のような画面が出ると思います。

![](/assets/posts/nextjsRendering/ssgExample.png)

開発モードでは動的に見えますが、本番ビルドすると静的 HTML が生成されます。

- 本番ビルドで確認

```bash
# ビルド実行
npm run build

# 本番モードで起動
npm start
```

これで再び`http://localhost:3000/blog`にアクセスしてみましょう。何度更新してもビルド時刻が変わらないことを確認できると思います。

---

# 2. SSR (Server-Side Rendering)

SSR は、リクエストのたびにサーバーで HTML を生成する方式です。ユーザーごと・アクセスごとに異なる内容を表示できます。

## 特徴

- **パフォーマンス**: 中程度。毎回サーバーで生成するため
- **SEO**: 優秀。サーバーでレンダリング済みの HTML を返す
- **更新頻度**: 高頻度向け。常に最新データを表示
- **コスト**: 高い。サーバーが常に必要

## ハンズオン: 現在時刻とユーザーエージェントを表示

`app/dashboard/page.tsx` ファイルを作成しましょう。

```tsx
import { headers } from "next/headers";

// SSRを強制的に有効化
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "Unknown";
  const currentTime = new Date().toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        color: "black",
      }}
    >
      <h1 style={{ color: "white" }}>ダッシュボード (SSR)</h1>

      <div
        style={{
          background: "#f0f0f0",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <p style={{ fontSize: "18px", margin: "10px 0" }}>
          <strong>現在時刻:</strong> {currentTime}
        </p>
        <p style={{ fontSize: "14px", margin: "10px 0", color: "#555" }}>
          <strong>あなたのブラウザ:</strong>
          <br />
          {userAgent}
        </p>
      </div>

      <div
        style={{
          padding: "15px 20px",
          background: "#d4edda",
          borderRadius: "5px",
          border: "1px solid #c3e6cb",
        }}
      >
        <h3>SSRの動作確認</h3>
        <ol>
          <li>このページを更新(F5)してください</li>
          <li>現在時刻が更新されることを確認</li>
          <li>これがSSR(リクエストごとにHTML生成)の証拠です</li>
        </ol>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px 20px",
          background: "#e7f3ff",
          borderRadius: "5px",
        }}
      >
        <h3>SSRのポイント</h3>
        <ul>
          <li>ページを更新するたびに時刻が変わります</li>
          <li>リクエストごとにサーバーでHTMLが生成されます</li>
          <li>常に最新のデータを表示できます</li>
        </ul>
      </div>
    </div>
  );
}
```

- 実行方法

```bash
# 開発サーバーを起動
npm run dev
```

- 本番ビルドで確認

```bash
# ビルド実行
npm run build

# 本番モードで起動
npm start
```

ブラウザで`http://localhost:3000/dashboard`にアクセスしましょう。以下のような画面が出ると思います。

ページを何度か更新(F5 キー)すると、時刻が変わることを確認できると思います。

![](/assets/posts/nextjsRendering/ssrExample.png)

---

# 3. ISR (Incremental Static Regeneration)

ISR は、SSG と SSR の良いとこ取りです。最初は SSG のように静的生成し、指定した時間が経過したら自動的に再生成します。

## 特徴

- **パフォーマンス**: 高速。基本的には静的ファイルを返す
- **SEO**: 優秀
- **更新頻度**: 中頻度向け。自動的に更新される
- **コスト**: 中程度

## ハンズオン: 10 秒ごとに更新されるニュース一覧

`app/news/page.tsx` ファイルを作成します。

```tsx
type News = {
  id: number;
  title: string;
  timestamp: string;
};

async function getNews(): Promise<News[]> {
  // 実際にはAPIから取得
  const now = new Date().toLocaleString("ja-JP");

  return [
    {
      id: 1,
      title: "Next.js 15がリリースされました",
      timestamp: now,
    },
    {
      id: 2,
      title: "ISRで自動更新される記事の例",
      timestamp: now,
    },
    {
      id: 3,
      title: "パフォーマンス最適化のベストプラクティス",
      timestamp: now,
    },
  ];
}

// 10秒ごとに再生成
export const revalidate = 10;

export default async function NewsPage() {
  const news = await getNews();
  const generatedAt = new Date().toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        color: "black",
      }}
    >
      <h1 style={{ color: "white" }}>最新ニュース (ISR)</h1>

      <div
        style={{
          background: "#fff3cd",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "20px",
          border: "1px solid #ffc107",
        }}
      >
        <p style={{ margin: "5px 0" }}>
          <strong>生成時刻:</strong> {generatedAt}
        </p>
        <p
          style={{
            margin: "5px 0",
            fontSize: "14px",
            color: "#856404",
          }}
        >
          このページは10秒ごとに自動再生成されます
        </p>
      </div>

      <div>
        {news.map((item) => (
          <article
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              margin: "15px 0",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ margin: "0 0 10px 0", color: "#333" }}>
              {item.title}
            </h2>
            <p
              style={{
                color: "#888",
                fontSize: "13px",
                margin: 0,
              }}
            >
              更新日時: {item.timestamp}
            </p>
          </article>
        ))}
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px 20px",
          background: "#d1ecf1",
          borderRadius: "5px",
          border: "1px solid #bee5eb",
        }}
      >
        <h3>ISRの動作確認方法</h3>
        <ol>
          <li>このページにアクセスして生成時刻を確認</li>
          <li>10秒以上待ってからページを更新(F5)</li>
          <li>生成時刻が変わっていることを確認</li>
          <li>連続で更新しても、10秒経過するまで時刻は変わりません</li>
        </ol>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px 20px",
          background: "#e7f3ff",
          borderRadius: "5px",
        }}
      >
        <h3>ISRのポイント</h3>
        <ul>
          <li>初回アクセス時は静的HTMLを返すので超高速</li>
          <li>指定時間(10秒)後に誰かがアクセスすると再生成</li>
          <li>再生成中も古いページを表示(ダウンタイムなし)</li>
          <li>SSGの速度とSSRの鮮度の良いとこ取り</li>
        </ul>
      </div>
    </div>
  );
}
```

- 実行方法

```bash
# 開発サーバーを起動
npm run dev
```

- 本番ビルドで確認

ISR は本番環境で真価を発揮します。

```bash
# ビルド実行
npm run build

# 本番モードで起動
npm start
```

同様に`http://localhost:3000/news`にアクセスしてみましょう。以下のような画面が出ると思います。

10 秒待ってから更新を繰り返すと、時刻が変わることを確認できます。

![](/assets/posts/nextjsRendering/isrExample.png)

---

# 4. CSR (Client-Side Rendering)

CSR は、ブラウザ上で JavaScript を使ってコンテンツを生成する方式です。従来の React アプリと同じ動作です。

## 特徴

- **パフォーマンス**: 初回は遅いが、以降は高速
- **SEO**: 不利になりやすい（初期 HTML に内容が含まれないため）
- **更新頻度**: リアルタイム向け
- **コスト**: 低い。サーバー負荷が少ない

## ハンズオン: リアルタイムカウンターとデータフェッチ

`app/interactive/page.tsx` ファイルを作成します。

```tsx
"use client"; // クライアントコンポーネントとして明示

import { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function InteractivePage() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchTime, setFetchTime] = useState("");

  useEffect(() => {
    // クライアントサイドでデータ取得
    const startTime = new Date();

    fetch("https://jsonplaceholder.typicode.com/users?_limit=3")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
        setFetchTime(startTime.toLocaleString("ja-JP"));
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        color: "black",
      }}
    >
      <h1 style={{ color: "white" }}>インタラクティブページ (CSR)</h1>

      <div
        style={{
          background: "#e3f2fd",
          padding: "20px",
          margin: "20px 0",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>カウンター</h2>
        <p
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            margin: "20px 0",
            color: "#1976d2",
          }}
        >
          カウント: {count}
        </p>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            cursor: "pointer",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
            fontWeight: "bold",
          }}
        >
          増やす
        </button>
        <button
          onClick={() => setCount(0)}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            cursor: "pointer",
            background: "#757575",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          リセット
        </button>
      </div>

      <div
        style={{
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>ユーザー一覧 (API取得)</h2>
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ fontSize: "18px" }}>読み込み中...</p>
          </div>
        ) : (
          <>
            <p
              style={{
                fontSize: "13px",
                color: "#666",
                marginBottom: "15px",
              }}
            >
              データ取得時刻: {fetchTime}
            </p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {users.map((user) => (
                <li
                  key={user.id}
                  style={{
                    margin: "12px 0",
                    padding: "12px",
                    background: "white",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                >
                  <strong style={{ color: "#333" }}>{user.name}</strong>
                  <br />
                  <span style={{ fontSize: "14px", color: "#666" }}>
                    {user.email}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
        <p
          style={{
            color: "#666",
            fontSize: "14px",
            marginTop: "15px",
            padding: "10px",
            background: "#fff3cd",
            borderRadius: "5px",
          }}
        >
          このデータはブラウザ(クライアント)で取得されました
        </p>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px 20px",
          background: "#fff3e0",
          borderRadius: "5px",
          border: "1px solid #ffb74d",
        }}
      >
        <h3>CSRの動作確認</h3>
        <ol>
          <li>カウンターボタンをクリックして動作を確認</li>
          <li>ページのソースを表示(Ctrl+U)してください</li>
          <li>HTMLにユーザーデータが含まれていないことを確認</li>
          <li>これがCSR(ブラウザでデータ取得)の証拠です</li>
        </ol>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px 20px",
          background: "#e7f3ff",
          borderRadius: "5px",
        }}
      >
        <h3>CSRのポイント</h3>
        <ul>
          <li>JavaScriptが実行されて初めてコンテンツが表示</li>
          <li>ユーザー操作に即座に反応できる</li>
          <li>SEOには不利(初期HTMLが空)</li>
          <li>インタラクティブなUIに最適</li>
        </ul>
      </div>
    </div>
  );
}
```

- 実行方法

```bash
# 開発サーバーを起動
npm run dev
```

# ブラウザで以下の URL

`http://localhost:3000/interactive`にアクセスすると、以下のような画面が出ると思います。

カウンターをクリックして動作を確認してみましょう。

また、ページのソースを表示すると、HTML にユーザーデータが含まれていないことを確認できます。

![](/assets/posts/nextjsRendering/csrExample.png)

---

# ビルド結果の見方

`npm run build` を実行すると、各ページがどのレンダリング方式を使っているか確認できます。出力例を以下に記載します。

```bash
`Route (app)                              Size     First Load JS
┌ ○ /                                    [数値]   [数値] kB
├ ○ /blog                                [数値]   [数値] kB  ← SSG
├ λ /dashboard                           [数値]   [数値] kB  ← SSR
├ ○ /news                                [数値]   [数値] kB  ← ISR
└ ○ /interactive                         [数値]   [数値] kB  ← CSR

凡例:
○  (Static)  = SSG/ISR (静的生成)
λ  (Dynamic) = SSR (動的生成)`
```

# 選び方のフローチャート

意見が分かれる部分もありますが、どの画面にどのレンダリング方式を採用するかは以下に沿って決めると良いと思います。

```plaintext
SEOが重要か?
├─ YES → コンテンツは頻繁に変わるか?
│         ├─ YES → 毎回最新が必要? → YES: SSR / NO: ISR
│         └─ NO → SSG
└─ NO → ユーザー操作が多い? → YES: CSR / NO: SSG
```

# 実践的な使い分け例

例えばですが、使い分けとしては以下のような例が挙げられると思います。

## ブログサイト

- 記事一覧: **SSG** (`app/blog/page.tsx`)
- 記事詳細: **SSG** または **ISR** (`app/blog/[slug]/page.tsx`)
- コメント欄: **CSR** (クライアントコンポーネント)
- 管理画面: **CSR**

## EC サイト

- トップページ: **SSG**
- 商品一覧: **ISR** (在庫が変動)
- 商品詳細: **ISR** (価格・在庫更新)
- カート: **CSR** (リアルタイム操作)
- マイページ: **SSR** (ユーザーごとに異なる)

## ニュースサイト

- トップページ: **ISR** (短い間隔、例: 60 秒)
- カテゴリページ: **ISR**
- 記事詳細: **ISR**
- ライブコメント: **CSR**

# まとめ

Next.js の各レンダリング方式を理解することで、用途に応じた最適なパフォーマンスとユーザー体験を提供できます。

- **SSG**: 変更が少ないコンテンツに最適。ブログや商品紹介ページに
- **SSR**: 常に最新データが必要な場合に使用。ダッシュボードやユーザーページに
- **ISR**: SSG と SSR の良いとこ取り。ニュースサイトや EC サイトに
- **CSR**: インタラクティブな UI に適している。管理画面やリアルタイム機能に

実際のプロジェクトでは、これらを組み合わせて使うことが多いです。各ページの要件に応じて、最適なレンダリング方式を選択しましょう。

---
