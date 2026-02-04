---
title: 'Honoを使ってみた'
excerpt: 'Honoとは何か、その特徴や使い方、多様なランタイムへのデプロイ例を紹介。'
coverImage: '/assets/posts/startHono/honoicon.svg'
date: '2026-02-03T18:52:46.000Z'
updatedAt: '2026-02-03T18:52:46.000Z'
tag: ["API"]
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
ogImage:
  url: ''
---

「Hono」というWebフレームワークをご存知でしょうか。名前の通り日本語の「炎」に由来するこのフレームワークは、現在急速に注目を集めている次世代のJavaScript/TypeScriptフレームワークです。今回はそれについて書いていきます。

# Honoとは何か？

Honoは、Web標準に基づいて構築された小型でシンプル、かつ超高速なWebフレームワークです。Cloudflare Workersをはじめ、Deno、Bun、Vercel、AWS Lambda、Node.jsなど、あらゆるJavaScriptランタイムで動作します。

特徴としては以下のようなものがあります。

- 超高速

HonoのルーターであるRegExpRouterは非常に高速で、線形ループを使用していません。従来のルーターが全てのURLパターンに対して網羅的に探索していたのに対し、Honoでは大きな1つの正規表現にまとめることで探索回数を大幅に削減しています。

- 超軽量

hono/tinyプリセットは12KB未満で、Honoには依存関係がなく、Web標準APIのみを使用しています。この軽量性により、起動が速く、メモリ使用量も少なくなっています。

- マルチランタイム対応

Honoの最大の特徴の1つが、複数のランタイムで同じコードが動作することです。以下の環境で動作します。

  - Node.js
  - Deno
  - Bun
  - Cloudflare Workers
  - AWS Lambda / Lambda@Edge
  - Fastly Compute
  - Vercel
  - その他のエッジ環境

**「一度書けば、どこでも動く」** というのがHonoの哲学です。

- バッテリー同梱

Honoには組み込みミドルウェア、カスタムミドルウェア、サードパーティミドルウェア、ヘルパーが含まれています。認証、CORS、ログ、キャッシュなど、Webアプリケーション開発に必要な機能が最初から揃っています。

# Honoが適している用途

- REST APIやGraphQL APIの構築
- エッジコンピューティングを活用したアプリケーション
- サーバーレス関数（AWS Lambda、Cloudflare Workersなど）
- マイクロサービス
- リアルタイム性が求められるアプリケーション
- 軽量で高速なプロキシサーバー

# 環境構築とセットアップ

それでは実際にHonoを使ってみましょう。

## 前提条件

- Node.js 18以上がインストールされていること
- 基本的なTypeScriptの知識
- ターミナル/コマンドラインの基本操作

## プロジェクトの作成

Honoプロジェクトを作成する最も簡単な方法は、公式のCLIツールを使うことです。

```bash
npm create hono@latest my-first-hono-app
```

実行すると、テンプレートの選択を求められます。

```plaintext
? Which template do you want to use?
  aws-lambda
  bun
  cloudflare-pages
  cloudflare-workers
  deno
  fastly
> nodejs
  vercel
```

今回は`nodejs`を選択してみましょう。

```bash
> npx
> create-hono my-first-hono-app

create-hono version 0.19.4
✔ Using target directory … my-first-hono-app
✔ Which template do you want to use? nodejs
✔ Do you want to install project dependencies? Yes
✔ Which package manager do you want to use? npm
✔ Cloning the template
✔ Installing project dependencies
🎉 Copied project files
Get started with: cd my-first-hono-app
```

プロジェクトが作成されたら、ディレクトリに移動して依存関係をインストールします。

```bash
cd my-first-hono-app
npm install
```

## プロジェクト構造

生成されたプロジェクトの構造は以下のようになっています。

```plaintext
my-first-hono-app/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

# 基本的な使い方

## Hello Worldアプリケーション

`src/index.ts`を開くと、以下のようなコードがあります。

```tsx
import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

```

このシンプルなコードで、基本的なWebサーバーができあがっています。

## 開発サーバーの起動

以下のコマンドで開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで`http://localhost:3000`にアクセスすると、「Hello Hono!」と表示されます。

## JSONレスポンスの返却

API開発では、JSON形式でデータを返すことが一般的です。Honoでは非常に簡単にJSONレスポンスを返せます。

```tsx
app.get('/api/hello', (c) => {
  return c.json({
    message: 'Hello from Hono API!',
    timestamp: new Date().toISOString()
  })
})
```

## パスパラメータとクエリパラメータ

URLからパラメータを取得する方法も簡単です。

```tsx
app.get('/posts/:id', (c) => {
  const id = c.req.param('id')
  const page = c.req.query('page')

  return c.json({
    postId: id,
    page: page || '1'
  })
})
```

`http://localhost:3000/posts/123?page=2`にアクセスすると、以下のようなレスポンスが返ってきます。

```json
{
  "postId": "123",
  "page": "2"
}
```

## レスポンスヘッダーの設定

カスタムヘッダーを追加することも可能です。

```tsx
app.get('/custom', (c) => {
  c.header('X-Custom-Header', 'My Value')
  c.header('X-Powered-By', 'Hono')

  return c.text('Check the headers!')
})
```

# 実践的なCRUDアプリケーション

ここからは、より実践的なCRUDアプリケーションを作成してみましょう。

## ユーザー管理APIの実装

```tsx
import { Hono } from 'hono'

type User = {
  id: number
  name: string
  email: string
}

const app = new Hono()
let users: User[] = []

// ユーザー一覧取得 (Read)
app.get('/users', (c) => {
  return c.json({ users })
})

// 特定ユーザー取得 (Read)
app.get('/users/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  const user = users.find(u => u.id === id)

  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }

  return c.json({ user })
})

// ユーザー作成 (Create)
app.post('/users', async (c) => {
  const { name, email } = await c.req.json()

  const newUser: User = {
    id: Date.now(),
    name,
    email
  }

  users.push(newUser)

  return c.json({ message: 'User created', user: newUser }, 201)
})

// ユーザー更新 (Update)
app.patch('/users/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  const { name, email } = await c.req.json()

  const userIndex = users.findIndex(u => u.id === id)

  if (userIndex === -1) {
    return c.json({ error: 'User not found' }, 404)
  }

  if (name) users[userIndex].name = name
  if (email) users[userIndex].email = email

  return c.json({ message: 'User updated', user: users[userIndex] })
})

// ユーザー削除 (Delete)
app.delete('/users/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  const initialLength = users.length

  users = users.filter(u => u.id !== id)

  if (users.length === initialLength) {
    return c.json({ error: 'User not found' }, 404)
  }

  return c.json({ message: 'User deleted' })
})

export default app
```

## APIのテスト

curlコマンドでAPIをテストしてみましょう。

```plaintext
# ユーザー作成
$ curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"太郎","email":"taro@example.com"}'
{"message":"User created","user":{"id":1770086188714,"name":"太郎","email":"taro@example.com"}}

# ユーザー一覧取得
$ curl http://localhost:3000/users
{"users":[{"id":1770086188714,"name":"太郎","email":"taro@example.com"}]}

# 特定ユーザー取得
$ curl http://localhost:3000/users/1770086188714
{"user":{"id":1770086188714,"name":"太郎","email":"taro@example.com"}}

# ユーザー更新
$ curl -X PATCH http://localhost:3000/users/1770086188714 \
  -H "Content-Type: application/json" \
  -d '{"name":"太郎2"}'
{"message":"User updated","user":{"id":1770086188714,"name":"太郎2","email":"taro@example.com"}}

# ユーザー削除
$ curl -X DELETE http://localhost:3000/users/1770086188714
{"message":"User deleted"}
```

# ミドルウェアの活用

Honoには便利なミドルウェアが豊富に用意されています。

- CORS対応

```tsx
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/api/*', cors())

app.get('/api/data', (c) => {
  return c.json({ data: 'This supports CORS' })
})
```

- Basic認証

```tsx
import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret'
  })
)

app.get('/admin', (c) => {
  return c.text('You are authorized!')
})
```

- ロギング

```tsx
import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono()

app.use('*', logger())

app.get('/', (c) => {
  return c.text('Hello!')
})
```

# バリデーションの実装

Zodと組み合わせることで、型安全なバリデーションが実装できます。

```bash
npm install zod @hono/zod-validator
```

```tsx
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const app = new Hono()

const userSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).max(150).optional()
})

app.post('/users', zValidator('json', userSchema), async (c) => {
  const user = c.req.valid('json')

  // ここでuserは型安全
  return c.json({
    message: 'User created',
    user
  })
})
```

# JSXによるサーバーサイドレンダリング

HonoにはJSXのサポートが組み込まれており、サーバーサイドでHTMLをレンダリングできます。

ファイル名を`.tsx`に変更し、以下のように記述します。

```tsx
import { Hono } from 'hono'
import type { FC } from 'hono/jsx'

const app = new Hono()

const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <title>Hono App</title>
      </head>
      <body>
        {props.children}
      </body>
    </html>
  )
}

const Top: FC<{ messages: string[] }> = (props) => {
  return (
    <Layout>
      <h1>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => (
          <li>{message}</li>
        ))}
      </ul>
    </Layout>
  )
}

app.get('/', (c) => {
  const messages = ['おはよう', 'こんにちは', 'こんばんは']
  return c.html(<Top messages={messages} />)
})

export default app
```

# デプロイ

Honoの大きな利点は、様々なプラットフォームにデプロイできることです。

- AWS Lambdaへのデプロイ

Node.jsアダプタを使用することで、AWS Lambdaでも動作します。

```tsx
import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'

const app = new Hono()

app.get('/', (c) => c.text('Hello from Lambda!'))

export const handler = handle(app)
```

- Vercelへのデプロイ

Vercelアダプタを使用します。

```tsx
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const app = new Hono()

app.get('/', (c) => c.text('Hello from Vercel!'))

export default handle(app)
```

# まとめ

Honoは、以下のような特徴を持つ次世代のWebフレームワークです。

- **超高速で軽量**: 最小限のオーバーヘッドで高速に動作
- **マルチランタイム対応**: 様々な環境で同じコードが動作
- **TypeScriptファースト**: 型安全性が高く、開発者体験が優れている
- **豊富なミドルウェア**: 実用的な機能が最初から揃っている
- **シンプルなAPI**: 学習コストが低く、すぐに使い始められる

ぜひ、実際に手を動かしてHonoの開発を体験してみてください。