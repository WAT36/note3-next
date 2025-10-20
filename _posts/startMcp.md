---
title: "MCPサーバーを立てる"
excerpt: "MCPサーバーの紹介およびChhatGPTに適用する方法"
coverImage: ""
date: "2025-10-19T23:57:07.000Z"
updatedAt: "2025-10-19T23:57:07.000Z"
tag: ["AI"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

生成 AI 関連でよく聞く「MCP サーバー」についてを調べたので書いていく。

# MCP とは

MCP（Model Context Protocol）は、AI アプリケーション（Claude や ChatGPT など）を外部システムに接続するためのオープンソース標準プロトコルです。

簡単に言うと、MCP は AI モデルのための標準化されたアプローチで、USB-C ケーブルがデバイスに対して果たす役割と同じようなものです。

## MCP でできること

MCP を使えば、AI アプリケーションはデータソース（ローカルファイル、データベースなど）、ツール（検索エンジン、計算機など）、ワークフロー（専門的な処理など）に接続できます。

具体的には

- ローカルのファイルシステムへのアクセス
- データベースへのクエリ実行
- Slack、GitHub、Google Drive などの外部サービスとの連携
- 天気情報やニュースなどの API 呼び出し
- 独自の業務システムとの統合

などが行えます。

## MCP の仕組み：3 つのコンポーネント

MCP は、以下の 3 つの要素で構成されています。

### 1. MCP サーバー

外部のデータやツールへのアクセスを提供する側です。例えば

- ファイルシステムにアクセスするサーバー
- GitHub のリポジトリ情報を取得するサーバー
- データベースにクエリを実行するサーバー

などがあります。

### 2. MCP クライアント

AI アプリケーション（Claude Desktop、Cursor、ChatGPT など）が MCP サーバーと通信するためのインターフェースです。

### 3. MCP プロトコル

クライアントとサーバーが共通の「言語」で話すためのルールです。これにより、異なる開発者が作ったサーバーでも、どのクライアントからでも使えるようになります。

# ハンズオン：最小の MCP サーバーを作って ChatGPT とつなげる

あなたのローカル PC で

> 「ChatGPT から、MCP サーバーを通じてローカルの API を呼び出す」

という体験をします。

---

## 🧩 前提

- Node.js（v18 以上）
- npm または pnpm
- ChatGPT (GPT-4-turbo 以上, MCP 対応版)
  - ※ChatGPT Desktop アプリ or Web 版（MCP 接続対応環境）

---

## ステップ 1. プロジェクト作成

```bash
mkdir mcp-demo
cd mcp-demo
npm init -y
npm install express zod @modelcontextprotocol/sdk
npm install --save-dev @types/express
```

## ステップ 2. MCP サーバーファイルを作成

`server.ts`（または `server.js`）を作ります。

このサーバーは**「今日の日付を返すだけ」**という超シンプルな MCP サーバーです。

```typescript
// server.ts
import express from "express";
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

// 1) MCPサーバー本体
const server = new McpServer({
  name: "date-info-server",
  version: "1.0.0",
});

// 2) ツール登録（今日の日付を返すだけ）
server.registerTool(
  "current_date",
  {
    title: "Current Date Tool",
    description: "Return current date/time and weekday in ja-JP",
    inputSchema: {}, // 入力なし
    outputSchema: {
      // 返却の構造化出力（任意）
      now: z.string(),
      weekday: z.string(),
    },
  },
  async () => {
    const d = new Date();
    const output = {
      now: d.toISOString(),
      weekday: d.toLocaleDateString("ja-JP", { weekday: "long" }),
    };
    return {
      // LLM向けのテキスト応答
      content: [{ type: "text", text: JSON.stringify(output) }],
      // 構造化データ（Apps/Inspector等が利用）
      structuredContent: output,
    };
  }
);

// 3) HTTPエンドポイント（/mcp にJSON-RPCを出す）
const app = express();
app.use(express.json());

app.post("/mcp", async (req, res) => {
  // リクエスト毎にTransportを作成するのが推奨
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  res.on("close", () => transport.close());

  // サーバーをトランスポートへ接続
  await server.connect(transport);

  // リクエスト処理（JSON-RPC）
  await transport.handleRequest(req, res, req.body);
});

const port = parseInt(process.env.PORT || "3000", 10);
app
  .listen(port, () => {
    console.log(`✅ MCP server running at http://localhost:${port}/mcp`);
  })
  .on("error", (err) => {
    console.error("Server error:", err);
    process.exit(1);
  });
```

## ステップ 3. 起動

```bash
npx ts-node server.ts
#node server.js
```

起動すると

```bash
✅ MCP server running on http://localhost:3001
```

と出れば OK です。

## ステップ 4. ChatGPT 側で接続する

### ChatGPT Desktop アプリを使っている場合

1. ChatGPT アプリの左下「⚙️ 設定 → アプリとコネクター → 高度な設定 → 開発者モード を有効化
2. 右上の「作成する」をクリック
3. フォームを埋めて完成する。今回はたとえば以下を入力：

   ```plaintext
   Name: Local Date Server
   URL: http://localhost:3001
   ```

4. 「Connect」を押す

接続成功すると、ChatGPT が自動で MCP サーバーのリソースを認識します。

---

## ステップ 5. ChatGPT に話しかける

ChatGPT に次のように入力します：

> この MCP サーバーから現在の日付情報を取得して。

すると、ChatGPT が MCP サーバーを通じてデータを取得し、

以下のような結果を返すはずです。

```json
{
  "now": "2025-10-06T09:10:00.123Z",
  "weekday": "月曜日"
}
```

これであなたは **MCP サーバーを構築・連携・実行する体験**を完了しました！

---

今回は簡単で基本的な例をお見せしましたが、

応用として以下のような、自分の API を MCP 化していく拡張例などもございます。

| 機能例                               | やること                                |
| ------------------------------------ | --------------------------------------- |
| GitHub API を呼びたい                | axios で GitHub REST API 呼び出しを実装 |
| AWS のリソース一覧を取得したい       | AWS SDK を使って Lambda 一覧などを返す  |
| DynamoDB の内容を ChatGPT に見せたい | DynamoDB から fetch して返す            |
| Supabase/PostgreSQL 連携             | DB クエリを投げて結果を返す             |

応用例などもやれたら今後やりたいですね。

また注意点として、MCP サーバーは LLM が直接 API キーを扱わないため安全ですが、

**社内システムとつなぐ場合は認可設定を慎重に**しましょう。

以上。
