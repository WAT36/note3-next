---
title: "GraphQLについて(その１) ~基本とREST APIとの違いについて~"
excerpt: "GraphQLについての調査と紹介"
coverImage: "/assets/posts/startGraphQL/GraphQLLogo.png"
date: "2025-06-24T22:35:35.000Z"
updatedAt: "2025-06-24T22:35:35.000Z"
tag: ["GraphQL", "API"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

GraphQL がよくわかっていなかったため、簡単な実践を兼ねて調べてみることにした。

まとめると長くなってしまったため、紹介編（本記事）と実践編（次記事）に分けて記載する。

# GraphQL とは

GraphQL[^1] は、API のためのクエリ言語であり、既存のデータに対してクエリを実行するためのランタイムである。Facebook で開発され、2015 年にオープンソース化された。

# GraphQL の特徴

GraphhQL の特徴をいくつか列挙します。

## 1. 単一エンドポイント

REST API では複数のエンドポイントが必要ですが、GraphQL は通常単一のエンドポイント（例：`/graphql`）ですべてを処理します。

## 2. 柔軟なデータ取得

クライアントが必要なデータのみを指定して取得できます。これにより、Over-fetching や Under-fetching の問題（後述）を解決します。

## 3. 強力な型システム

GraphQL は強い型システムを持ち、スキーマによって API の構造を明確に定義します。

## 4. 自己文書化

スキーマ自体が API のドキュメントとして機能し、GraphiQL[^2] などのツールで簡単に探索できます。

## 5. バージョニング不要

新しいフィールドの追加が既存のクエリに影響しないため、API のバージョニングが不要です。

# REST API と GraphQL の違い

ここでは、レストランでの注文に例えて、REST API と GraphQL の違いを説明します。

## レストランの例で理解する

**REST API = 定食レストラン**

- 「A セット」「B セット」など、決められたメニューしか注文できない
- 嫌いな食べ物が入っていても、セット内容は変更できない
- 複数のセットが欲しい場合は、何度も注文する必要がある

**GraphQL = バイキングレストラン**

- 好きな料理を自由に組み合わせて注文できる
- 不要な料理は除いて、必要な分だけ注文可能
- 一度の注文で、複数の料理を まとめて頼める

## 具体的なコード例で比較

ブログサイトで「ユーザー情報と、そのユーザーの最新 3 件の投稿タイトルだけ」が欲しいケースをそれぞれ考えてみましょう。

- REST API の場合（複数回のリクエストが必要）

```typescript
// 1回目：ユーザー情報を取得
const userResponse = await fetch("/api/users/123");
const user = await userResponse.json();
// 結果：{ id: 123, name: "田中太郎", email: "tanaka@example.com", age: 30, address: "東京都..." }
// → 必要ない age や address も含まれている// 2回目：そのユーザーの投稿一覧を取得
const postsResponse = await fetch("/api/users/123/posts");
const posts = await postsResponse.json();
// 結果：[
//   { id: 1, title: "GraphQL入門", content: "長い本文...", createdAt: "2024-01-01", views: 100 },
//   { id: 2, title: "React学習", content: "長い本文...", createdAt: "2024-01-02", views: 50 }
// ]
// → title だけ欲しいのに content や views も含まれている
// 必要なデータを手動で整形
const result = {
  name: user.name,
  latestPosts: posts.slice(0, 3).map((post) => ({ title: post.title })),
};
```

- GraphQL の場合（1 回のリクエストで完了）

```typescript
// 1回のリクエストで必要なデータのみ取得
const response = await fetch("/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `
      {
        user(id: 123) {
          name
          posts(limit: 3) {
            title
          }
        }
      }
    `,
  }),
});

const result = await response.json();
// 結果：{
//   data: {
//     user: {
//       name: "田中太郎",
//       posts: [
//         { title: "GraphQL入門" },
//         { title: "React学習" }
//       ]
//     }
//   }
// }
// → 最初から必要なデータのみ！
```

### Over-fetching（必要以上のデータ取得）

GraphQL では指定したデータだけを取ってくるので、必要以上のデータを取得することはありません。

- REST API の問題

```typescript
// ユーザー名だけ欲しいのに...
GET /api/users/123
// 返ってくるデータ
{
  "id": 123,
  "name": "田中太郎",// ← これだけ欲しい
  "email": "tanaka@example.com",// ← 不要
  "age": 30,// ← 不要
  "address": "東京都...",// ← 不要
  "phone": "090-1234-5678",// ← 不要
  "bio": "長い自己紹介文..."// ← 不要
}
```

- GraphQL の解決

```graphql
{
  user(id: 123) {
    name # 必要な分だけ指定
  }
}
# 結果：{ "data": { "user": { "name": "田中太郎" } } }
```

### 2. Under-fetching（データが足りない）

REST API では API から取得できるデータが「足りない」ために、クライアント側で追加のリクエストを複数回投げなければならない状況(= **Under fetching**)がありますが、GraphQL ではこの問題を解決します。

- REST API の問題

```jsx
// ユーザー一覧を取得
GET / api / users;
// 結果：[{ id: 1, name: "田中太郎" }, { id: 2, name: "佐藤花子" }]// 各ユーザーの投稿数も知りたい → 追加のリクエストが必要
GET / api / users / 1 / posts / count; // 田中太郎の投稿数
GET / api / users / 2 / posts / count; // 佐藤花子の投稿数
// → ユーザーが100人いたら、101回のリクエストが必要！
```

- GraphQL の解決

```graphql
{
  users {
    name
    postCount # 一度に取得可能
  }
}
```

## エンドポイントの違い

特徴で挙げたように、GraphQL ではエンドポイントは１つです。

- REST API：機能ごとに複数の URL

```plaintext
GET    /api/users           # ユーザー一覧
GET    /api/users/123       # 特定ユーザー
GET    /api/users/123/posts # ユーザーの投稿一覧
POST   /api/posts           # 投稿作成
PUT    /api/posts/456       # 投稿更新
DELETE /api/posts/456       # 投稿削除
GET    /api/comments        # コメント一覧
```

- GraphQL：すべて単一の URL

```plaintext
POST /graphql  # すべての操作をここで実行
```

## リクエスト・レスポンスの違い

REST API では HTTP メソッド数種を使い分けますが、GraphQL で使うのは基本 POST のみです。

- REST API：HTTP メソッドで操作を区別

```jsx
// データ取得
GET /api/users/123

// データ作成
POST /api/users
{ "name": "新規ユーザー", "email": "new@example.com" }

// データ更新
PUT /api/users/123
{ "name": "更新されたユーザー" }

// データ削除
DELETE /api/users/123
```

- GraphQL：すべて POST リクエスト、操作はクエリで指定

```jsx
// データ取得（Query）
POST /graphql
{
  "query": "{ user(id: 123) { name email } }"
}

// データ作成（Mutation）
POST /graphql
{
  "query": "mutation { createUser(name: \"新規ユーザー\", email: \"new@example.com\") { id name } }"
}

// データ更新（Mutation）
POST /graphql
{
  "query": "mutation { updateUser(id: 123, name: \"更新されたユーザー\") { id name } }"
}
```

## 主な違いの比較表

| 項目           | REST API                                | GraphQL                          |
| :------------- | :-------------------------------------- | -------------------------------- |
| エンドポイント | 複数の URL                              | 単一の URL（通常 /graphql）      |
| データ取得     | 固定された構造                          | 必要な分だけ自由に指定           |
| リクエスト回数 | 複数回必要な場合が多い                  | 1 回で複雑なデータも取得可能     |
| Over-fetching  | よく発生する                            | 回避できる                       |
| Under-fetching | よく発生する                            | 回避できる                       |
| 学習コスト     | 低い（HTTP の知識があれば理解しやすい） | 中程度（新しい概念の習得が必要） |
| デバッグ       | ブラウザの開発者ツールで簡単            | 専用ツールがあると便利           |

# GraphQL の操作

GraphQL は以下の 3 つの主要な操作を提供します。これらは、データベースでいう「SELECT」「INSERT/UPDATE/DELETE」「リアルタイム通知」に相当します。

## Query（クエリ）

Query はデータベースからデータを取得する操作です。（SQL の SELECT のようなものです）

- 具体例

```graphql
# ユーザー情報を取得
{
  user(id: "123") {
    name
    email
  }
}
```

- REST API との比較

```jsx
// REST APIの場合
GET /api/users/123

// GraphQLの場合
POST /graphql
{
  "query": "{ user(id: \"123\") { name email } }"
}
```

**ポイント**

- 読み取り専用の操作
- 必要なフィールドのみを指定可能
- 複数のリソースを一度に取得可能

## Mutation（ミューテーション）

Mutation はデータの作成、更新、削除を行う操作です。（SQL の INSERT/UPDATE/DELETE のようなものです）

- 具体例

```graphql
# 新しいユーザーを作成
mutation {
  createUser(input: { name: "田中太郎", email: "tanaka@example.com" }) {
    id
    name
    createdAt
  }
}

# ユーザー情報を更新
mutation {
  updateUser(id: "123", input: { name: "田中次郎" }) {
    id
    name
    updatedAt
  }
}

# ユーザーを削除
mutation {
  deleteUser(id: "123") {
    id
    name
  }
}
```

- REST API との比較

```jsx
// REST APIの場合
POST /api/users// 作成
PUT /api/users/123// 更新
DELETE /api/users/123// 削除

// GraphQLの場合（すべて同じエンドポイント）
POST /graphql
{
  "query": "mutation { createUser(...) { ... } }"
}
```

**ポイント**

- データを変更する操作
- 作成・更新・削除すべてを mutation で表現
- 変更後のデータを即座に取得可能

## Subscription（サブスクリプション）

Subscription はデータの変更をリアルタイムで監視・受信する操作です。（WebSocket のようなもの）

- 具体例

```graphql
# 新しいメッセージが投稿されたときに通知を受け取る
subscription {
  messageAdded(channelId: "general") {
    id
    content
    author {
      name
    }
    createdAt
  }
}

# ユーザーのオンライン状態の変更を監視
subscription {
  userStatusChanged {
    id
    name
    isOnline
    lastSeen
  }
}
```

- 使用場面

  - チャットアプリケーション（新しいメッセージの通知）
  - 株価情報（リアルタイム価格更新）
  - ゲーム（他プレイヤーの行動通知）
  - SNS（新しい投稿やいいねの通知）

- REST API との比較

```jsx
// REST APIの場合（ポーリング方式）
setInterval(() => {
  fetch("/api/messages")
    .then((response) => response.json())
    .then((data) => {
      // 新しいメッセージをチェック
    });
}, 1000); // 1秒ごとにチェック// GraphQLの場合（リアルタイム）
const subscription = client.subscribe({
  query: `
    subscription {
      messageAdded {
        id
        content
        createdAt
      }
    }
  `,
});

subscription.subscribe({
  next: (data) => {
    // 新しいメッセージが即座に届く
  },
});
```

- ポイント

  - サーバーからクライアントへのプッシュ通知
  - WebSocket や Server-Sent Events を内部で使用
  - ポーリング不要でリアルタイム通信が可能

### 3 つの操作の使い分け

| 操作         | 用途             | HTTP メソッド相当 | 使用例                         |
| :----------- | :--------------- | :---------------- | :----------------------------- |
| Query        | データ取得       | GET               | ユーザー一覧表示、商品詳細表示 |
| Mutation     | データ変更       | POST/PUT/DELETE   | ユーザー登録、投稿作成、削除   |
| Subscription | リアルタイム受信 | WebSocket         | チャット、通知、ライブ更新     |

# GraphQL のメリット・デメリット

## メリット

- **効率的なデータ取得**: 必要なデータのみを取得
- **開発効率の向上**: フロントエンドとバックエンドの並行開発が容易
- **強力な開発ツール**: GraphiQL、Apollo Client 等の豊富なエコシステム
- **型安全性**: TypeScript との相性が良い

## デメリット

- **学習コスト**: 新しい概念の習得が必要
- **キャッシュの複雑さ**: HTTP キャッシュが使いにくい
- **セキュリティ**: 複雑なクエリによる DoS 攻撃のリスク
- **ファイルアップロード**: 標準的な仕様がない

---

とりあえずは特徴を調べて書いてみた。次の記事では実践として簡単なハンズオンを書いてみたいと思う。

---

[^1]: [GraphQL(公式サイト)](https://graphql.org/)
[^2]: [GraphiQL](https://github.com/skevy/graphiql-app)
