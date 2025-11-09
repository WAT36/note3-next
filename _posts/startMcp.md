---
title: "MCPサーバーを立てる"
excerpt: "MCPサーバーの紹介およびCursorで利用する方法"
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

MCP（Model Context Protocol）は、AI アプリケーション（Cursor や ChatGPT など）を外部システムに接続するためのオープンソース標準プロトコルです。

簡単に言うと、MCP は AI モデルのための標準化されたアプローチで、USB-C ケーブルがデバイスに対して果たす役割と同じようなものになります。

## MCP でできること

MCP を使えば、AI アプリケーションはデータソース（ローカルファイル、データベースなど）、ツール（検索エンジン、計算機など）、ワークフロー（専門的な処理など）に接続できます。

具体的には

- ローカルのファイルシステムへのアクセス
- データベースへのクエリ実行
- Slack、GitHub、Google Drive などの外部サービスとの連携
- 天気情報やニュースなどの API 呼び出し
- 独自の業務システムとの統合

などが行えます。

## MCP の仕組み

MCP は、以下の 3 つのコンポーネントで構成されています。

### MCP サーバー

外部のデータやツールへのアクセスを提供する側です。例えば

- ファイルシステムにアクセスするサーバー
- GitHub のリポジトリ情報を取得するサーバー
- データベースにクエリを実行するサーバー

などがあります。

### MCP クライアント

AI アプリケーション（Cursor、ChatGPT など）が MCP サーバーと通信するためのインターフェースです。

### MCP プロトコル

クライアントとサーバーが共通の「言語」で話すためのルールです。これにより、異なる開発者が作ったサーバーでも、どのクライアントからでも使えるようになります。

# ハンズオン：最小の MCP サーバーを作って Cursor から利用する

あなたのローカル PC で

「Cursor からローカルの MCP サーバー（stdio 方式）を使う」

という体験をします。

## 前提

- Node.js（v18 以上）
- npm または pnpm
- Cursor

## プロジェクト作成

今回の MCP サーバー用の Node.js プロジェクトを作成します。

最初に記載しておきますが、今回作成するプロジェクトは以下のような構成になります。

```plaintext
mcp-demo
├── .cursor/
|   └── mcp.json
├── node_modules/
├── package-lock.json
├── package.json
├── server.ts
└── tsconfig.json
```

まず、以下のコマンドを実行してください。

```bash
mkdir mcp-demo
cd mcp-demo
npm init -y
npm i @modelcontextprotocol/sdk zod
npm i -D typescript tsx @types/node
npx tsc --init
```

tsconfig.json は、以下の通りに設定してください。（要点のみ記載）

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist"
  },
  "include": ["server.ts"]
}
```

package.json の scripts を以下の通り定義します。

```json
{
  "scripts": {
    "dev": "tsx server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

## MCP サーバーファイルを作成

MCP サーバーのファイルである server.ts を作ります。

このサーバーは 「今日の日付を返すだけ」という超シンプルな MCP サーバーです。

McpServer と stdio トランスポート（StdioServerTransport）で、入力なしのツール current_date を 1 つだけ公開します。

```typescript
// server.ts
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "local-date-server",
  version: "1.0.0",
});

// 入力なし→現在日時を返す最小ツール
server.registerTool(
  "current_date",
  {
    title: "Current Date Tool",
    description: "Return current date/time and weekday (ja-JP)",
    inputSchema: {},
    outputSchema: { now: z.string(), weekday: z.string() },
  },
  async () => {
    const d = new Date();
    const output = {
      now: d.toISOString(),
      weekday: d.toLocaleDateString("ja-JP", { weekday: "long" }),
    };
    return {
      content: [{ type: "text", text: JSON.stringify(output) }],
      structuredContent: output,
    };
  }
);

// === stdio で待ち受け（Cursor などがサブプロセスとして起動）===
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
main().catch((e) => {
  console.error("MCP server failed:", e);
  process.exit(1);
});
```

## 起動

作り終えたら、ローカルで動作するか確認します。

とりあえず起動できれば OK です（実行自体は Cursor 側から行います）

```bash
npm run dev
```

## Cursor 側の設定

Cursor は グローバル または プロジェクト単位で MCP サーバーを登録できます。

ここではプロジェクト単位（.cursor/mcp.json）で設定します。

プロジェクト直下にフォルダを作って設定ファイルを置きます。

```bash
mkdir -p .cursor
```

.cursor/mcp.json を以下のように作成します。

```json
{
  "mcpServers": {
    "local-date-server": {
      "command": "node",
      "args": ["node_modules/.bin/tsx", "server.ts"],
      "transport": { "type": "stdio" },
      "env": {}
    }
  }
}
```

## Cursor で利用する

作成したプロジェクト mcp-demo を Cursor で開きます。

右下または左下にある 「Settings」アイコン をクリックし、設定画面を開きます。

検索バーに「MCP」または「Model Context Protocol」と入力します。

作成したサーバー名が表示されるはずなので、OFF になっていたらチェックを ON にして下さい。

![](/assets/posts/startMcp/checkMCPServer.png)

新しいチャットで、例えば「current_date ツールを実行して」

と指示すると、local-date-server が起動され、MCP ツールが呼ばれます。

（実行時には「Run Tool」ボタンの承認が求められることがあります。）

![](/assets/posts/startMcp/exeLocalDate.png)

これであなたは MCP サーバーを構築・連携・実行する体験を完了しました！

---

今回は簡単で基本的な例をお見せしましたが、外部サービスや外部の API との連携などもやれたら今後やりたいですね。

また注意点として、MCP サーバーは LLM が直接 API キーを扱わないため安全ですが、

社内システムとつなぐ場合は**認可設定を慎重に**しましょう。
