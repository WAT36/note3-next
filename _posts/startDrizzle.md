---
title: "Drizzle ORM入門"
excerpt: "TypeScript製の軽量ORM「Drizzle」の基本概念からCRUD操作のハンズオンまでを紹介。"
coverImage: "/assets/posts/startDrizzle/drizzle.svg"
date: '2026-04-04T17:34:55.000Z'
updatedAt: '2026-04-04T17:38:07.000Z'
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

近年、TypeScript プロジェクトにおけるデータベース操作の選択肢が増えています。Prisma などのライブラリがある中で、**Drizzle ORM** は「SQL ライクな書き心地」と「軽量・高パフォーマンス」を両立する ORM として急速に注目を集めています。

この記事では、Drizzle ORM の基本概念から、実際に手を動かして動作確認するところまでを解説します。

---

# Drizzle ORM とは

Drizzle ORM[^1] は、TypeScript 製の軽量 ORM です。以下の特徴があります。

| 特徴                 | 説明                                                   |
| -------------------- | ------------------------------------------------------ |
| **SQL ライクな API** | SQL を知っていればすぐ書ける。抽象化しすぎない設計思想 |
| **型安全**           | スキーマ定義から TypeScript の型が自動推論される       |
| **軽量**             | ランタイム依存が極めて少なく、バンドルサイズが小さい   |
| **サーバーレス対応** | Edge Runtime や Cloudflare Workers でも動作可能        |
| **複数 DB 対応**     | PostgreSQL / MySQL / SQLite をサポート                 |
| **Drizzle Kit**      | マイグレーション管理ツールが同梱                       |

Drizzle の設計思想は「If you know SQL, you know Drizzle」とされ、「ORM が生成するクエリがわからない」という問題を解決するために設計されています。書いたコードがほぼそのまま SQL に対応するため、パフォーマンスチューニングやデバッグが容易です。

---

# 他の ORM との比較

Drizzle と他の ORM、例として Prisma,TypeORM との比較点を記載します。

| 観点               | Drizzle              | Prisma                                            | TypeORM                   |
| ------------------ | -------------------- | ------------------------------------------------- | ------------------------- |
| クエリの書き方     | SQL ライク           | 独自 DSL / Prisma Client                          | デコレータ / QueryBuilder |
| 型安全性           | ◎（推論ベース）      | ◎（コード生成ベース）                             | △                         |
| バンドルサイズ     | 非常に小さい         | 大きい（Engine が必要）                           | 中程度                    |
| サーバーレス適性   | ◎                    | △（環境によっては Cold Start の影響を受けやすい） | △                         |
| マイグレーション   | Drizzle Kit          | Prisma Migrate                                    | 内蔵マイグレーション      |
| 学習コスト         | SQL 知識があれば低い | 独自概念の理解が必要                              | 中程度                    |
| エコシステム成熟度 | 成長中               | 非常に成熟                                        | 成熟                      |

---

# 環境構築

今回は **PostgreSQL + Node.js** の構成でハンズオンを進めます。

## プロジェクト初期化

```bash
mkdir drizzle-handson
cd drizzle-handson
npm init -y
```

## 必要パッケージのインストール

```bash
# Drizzle ORM 本体と PostgreSQL ドライバ
npm install drizzle-orm postgres dotenv

# Drizzle Kit（マイグレーション & Studio 用 / 開発依存）
npm install -D drizzle-kit

# TypeScript 関連
npm install -D typescript tsx @types/node
```

## TypeScript 設定

```bash
npx tsc --init
```

`tsconfig.json` を以下のように調整します。

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["src/**/*"]
}
```

`package.json` に以下を追加します。

```json
{
  "type": "module"
}
```

## ディレクトリ構成

今回のハンズオンで作成するファイル構成は以下の通りです。

```
drizzle-handson/
├── src/
│   ├── db/
│   │   ├── schema.ts      # スキーマ定義
│   │   └── index.ts       # DB接続
│   └── index.ts           # ハンズオン用メインファイル
├── drizzle.config.ts      # Drizzle Kit 設定
├── tsconfig.json
└── package.json
```

## Drizzle Kit 設定ファイル

`drizzle.config.ts` をプロジェクトルートに作成します。

```typescript
/// <reference types="node" />
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

## 環境変数

`.env` ファイルを作成します（Docker などで PostgreSQL を用意してください）。

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/drizzle_handson
```

今回利用する DB ですが、Docker で PostgreSQL をサクッと立てる場合は以下で行えます。

```bash
docker run --name drizzle-pg -e POSTGRES_PASSWORD=password -e POSTGRES_DB=drizzle_handson -p 5432:5432 -d postgres:16
```

---

# スキーマ定義

Drizzle の最大の特徴の一つが、**TypeScript コードでスキーマを定義し、それがそのまま型情報になる** 点です。

`src/db/schema.ts` を作成します。

```typescript
import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

// ===== Users テーブル =====
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ===== Posts テーブル =====
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  content: text("content"),
  authorId: integer("author_id")
    .references(() => users.id)
    .notNull(),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: '2026-04-04T17:38:07.000Z'
});
```

## スキーマ定義のポイント

- `pgTable()` で PostgreSQL のテーブルを定義（MySQL なら `mysqlTable`、SQLite なら `sqliteTable`）
- カラム型関数（`serial`, `varchar`, `text` など）がそのまま SQL の型に対応
- `.references()` で外部キー制約を宣言的に記述
- 定義したテーブルオブジェクトがそのままクエリビルダーで使われ、型が推論される

---

# マイグレーション

## マイグレーションファイルの生成

```bash
npx drizzle-kit generate
```

`drizzle/` ディレクトリに SQL マイグレーションファイルが生成されます。中身は純粋な SQL なので、何が実行されるか一目瞭然です。

## マイグレーションの実行

```bash
npx drizzle-kit migrate
```

## 手軽に試すなら push

開発初期段階でマイグレーションファイルの管理が不要な場合は、`push` コマンドでスキーマを直接 DB に反映できます。

```bash
npx drizzle-kit push
```

**`generate` + `migrate` vs `push` の使い分け:**

- `push` → プロトタイピング・個人開発向け。手軽だがマイグレーション履歴が残らない
- `generate` + `migrate` → チーム開発・本番運用向け。SQL ファイルがバージョン管理される

---

# CRUD 操作ハンズオン

## DB 接続の設定

`src/db/index.ts` を作成します。

```typescript
/// <reference types="node" />
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);

export const db = drizzle(client, { schema });
```

## メインファイル

`src/index.ts` を作成し、各 CRUD 操作を順番に試していきます。

```typescript
import { eq, like, and, desc, count } from "drizzle-orm";
import { db } from "./db/index.js";
import { users, posts } from "./db/schema.js";

async function main() {
  // ============================================
  // CREATE: ユーザーの作成
  // ============================================
  console.log("--- CREATE: ユーザー作成 ---");

  const [alice] = await db
    .insert(users)
    .values({
      name: "Alice",
      email: "alice@example.com",
    })
    .returning();

  const [bob] = await db
    .insert(users)
    .values({
      name: "Bob",
      email: "bob@example.com",
    })
    .returning();

  console.log("Created:", alice, bob);

  // 複数レコードを一括挿入
  const newUsers = await db
    .insert(users)
    .values([
      { name: "Charlie", email: "charlie@example.com" },
      { name: "Diana", email: "diana@example.com" },
    ])
    .returning();

  console.log("Bulk created:", newUsers);

  // ============================================
  // CREATE: 投稿の作成
  // ============================================
  console.log("\n--- CREATE: 投稿作成 ---");

  const [post1] = await db
    .insert(posts)
    .values({
      title: "Drizzle入門",
      content: "Drizzle ORMは軽量で型安全なORMです。",
      authorId: alice.id,
      published: true,
    })
    .returning();

  await db.insert(posts).values([
    {
      title: "TypeScriptの型システム",
      content: "TypeScriptの型システムについて解説します。",
      authorId: alice.id,
      published: true,
    },
    {
      title: "下書き記事",
      content: "この記事はまだ公開されていません。",
      authorId: bob.id,
      published: false,
    },
  ]);

  console.log("Post created:", post1);

  // ============================================
  // READ: 全件取得
  // ============================================
  console.log("\n--- READ: 全件取得 ---");

  const allUsers = await db.select().from(users);
  console.log("All users:", allUsers);

  // ============================================
  // READ: 条件付き取得（WHERE）
  // ============================================
  console.log("\n--- READ: 条件付き取得 ---");

  const activeUsers = await db
    .select()
    .from(users)
    .where(eq(users.isActive, true));
  console.log("Active users:", activeUsers);

  // LIKE 検索
  const aliceSearch = await db
    .select()
    .from(users)
    .where(like(users.name, "%Ali%"));
  console.log("Search result:", aliceSearch);

  // 複数条件（AND）
  const filtered = await db
    .select()
    .from(users)
    .where(and(eq(users.isActive, true), like(users.email, "%example.com")));
  console.log("Filtered:", filtered);

  // ============================================
  // READ: 特定カラムのみ取得
  // ============================================
  console.log("\n--- READ: 特定カラム取得 ---");

  const userNames = await db
    .select({
      id: users.id,
      name: users.name,
    })
    .from(users);
  console.log("User names:", userNames);

  // ============================================
  // READ: ORDER BY / LIMIT / OFFSET
  // ============================================
  console.log("\n--- READ: ソート & ページング ---");

  const sortedUsers = await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt))
    .limit(2)
    .offset(0);
  console.log("Sorted (page 1):", sortedUsers);

  // ============================================
  // READ: 集計（COUNT）
  // ============================================
  console.log("\n--- READ: 集計 ---");

  const [userCount] = await db.select({ count: count() }).from(users);
  console.log("User count:", userCount);

  // ============================================
  // UPDATE
  // ============================================
  console.log("\n--- UPDATE ---");

  const [updatedAlice] = await db
    .update(users)
    .set({ name: "Alice Updated" })
    .where(eq(users.id, alice.id))
    .returning();
  console.log("Updated:", updatedAlice);

  // ============================================
  // DELETE
  // ============================================
  console.log("\n--- DELETE ---");

  // まず Diana の投稿がないことを確認してから削除
  const [deletedUser] = await db
    .delete(users)
    .where(eq(users.email, "diana@example.com"))
    .returning();
  console.log("Deleted:", deletedUser);

  // 最終確認
  console.log("\n--- 最終状態 ---");
  const finalUsers = await db.select().from(users);
  console.log("Final users:", finalUsers);

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

## 実行

```bash
npx tsx src/index.ts
```

すると DB 操作が行えます。

## 各操作と SQL の対応

Drizzle の大きな特徴は、このようにコードと SQL がほぼ 1 対 1 に対応する点です。

| Drizzle コード                                                 | 対応する SQL                                              |
| -------------------------------------------------------------- | --------------------------------------------------------- |
| `db.select().from(users)`                                      | `SELECT * FROM users`                                     |
| `db.select().from(users).where(eq(users.id, 1))`               | `SELECT * FROM users WHERE id = 1`                        |
| `db.insert(users).values({ name: "Alice", email: "..." })`     | `INSERT INTO users (name, email) VALUES ('Alice', '...')` |
| `db.update(users).set({ name: "Bob" }).where(eq(users.id, 1))` | `UPDATE users SET name = 'Bob' WHERE id = 1`              |
| `db.delete(users).where(eq(users.id, 1))`                      | `DELETE FROM users WHERE id = 1`                          |

---

# リレーション

Drizzle には **Relational Queries API** という機能があり、リレーションを定義して Prisma ライクなネストした取得が可能です。

## リレーション定義

`src/db/schema.ts` に追記します。

```typescript
import { relations } from "drizzle-orm";

// ... 既存のテーブル定義の下に追加 ...

// Users のリレーション
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

// Posts のリレーション
export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
```

## リレーションを使ったクエリ

```typescript
// ユーザーと投稿をまとめて取得
const usersWithPosts = await db.query.users.findMany({
  with: {
    posts: true,
  },
});

console.log(JSON.stringify(usersWithPosts, null, 2));

// 公開済み投稿のみを持つユーザーを取得
const usersWithPublishedPosts = await db.query.users.findMany({
  with: {
    posts: {
      where: eq(posts.published, true),
    },
  },
});

// 投稿と著者情報を一緒に取得
const postsWithAuthor = await db.query.posts.findMany({
  with: {
    author: true,
  },
  where: eq(posts.published, true),
  orderBy: [desc(posts.createdAt)],
});
```

補足： `db.query.*` を使うには、`drizzle()` に `{ schema }` を渡している必要があります（6.1 の DB 接続設定で対応済み）。

---

# Drizzle Studio

Drizzle Kit には **Drizzle Studio** というブラウザベースの DB ビューアが付属しています。

```bash
npx drizzle-kit studio
```

ブラウザで `https://local.drizzle.studio` が開き、テーブルの閲覧・編集が GUI で行えます。開発中のデータ確認に非常に便利です。（※ CLI 実行時に自動でブラウザが開きます）

![](/assets/posts/startDrizzle/drizzleStudioDemo.png)

---

Drizzle ORM についての DB 操作を今回は軽く行いましたが、もしさらに深く実践、学びたい場合には、以下のトピックに挑戦してみてください。

- **トランザクション** (`db.transaction()`)
- **Prepared Statements** によるパフォーマンス最適化
- **カスタム SQL** (`sql` テンプレートリテラル)
- **インデックス定義** とパフォーマンスチューニング
- **Zod との連携**（`drizzle-zod` パッケージ）
- **Next.js / Hono との統合** による実践的な API 構築

---

[^1]: [Drizzle（公式ページ）](https://orm.drizzle.team/)
