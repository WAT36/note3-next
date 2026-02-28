---
title: "Mastraで始めるAIエージェント開発"
excerpt: ""
coverImage: "/assets/posts/startMastra/mastra.png"
date: "2026-02-17T14:49:19.000Z"
updatedAt: "2026-02-17T14:49:19.000Z"
tag: ["AI"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

近年、AI エージェントの開発が注目を集めています。しかし、実際に AI エージェントを構築しようとすると、LLM の統合、ツールの連携、ワークフローの管理など、多くの複雑な要素を扱う必要があります。

そこで登場するのが**Mastra**です。本記事では、Mastra の基本概念から実際に動く AI エージェントを作成するまでを、ハンズオン形式で解説します。

# Mastra とは？

Mastra[^1]は、TypeScript 製のオープンソース AI エージェント開発フレームワークです。静的サイトジェネレーター「Gatsby.js」の開発チームによって作られており、モダンな Web 開発の感覚で AI エージェントを構築できることが特徴です。

## Mastra の主要コンポーネント

| コンポーネント | 説明                                                       |
| -------------- | ---------------------------------------------------------- |
| **Agent**      | LLM を活用して自律的にタスクを実行する中核機能             |
| **Tools**      | エージェントが利用できる外部機能（API 呼び出し、計算など） |
| **Workflow**   | 複数のステップを組み合わせた処理フローの定義               |
| **RAG**        | 外部知識を検索して回答を生成する機能                       |
| **Memory**     | 会話履歴や状態を保持する機能                               |

## なぜ Mastra を選ぶのか？

- **TypeScript ネイティブ**: 型安全性と優れた開発者体験
- **オールインワン**: エージェント開発に必要な機能が統合済み
- **自動生成機能**: REST API、Swagger UI、Playground が自動で生成される
- **柔軟な LLM 対応**: OpenAI、Anthropic、Google Gemini など複数のプロバイダーに対応

---

# 環境構築

## 前提条件

- Node.js 18 以上
- npm または pnpm
- OpenAI API キー（または他の LLM プロバイダーの API キー）

## プロジェクトの作成

Mastra には公式の CLI が用意されており、簡単にプロジェクトを作成できます。

```bash
# Mastraプロジェクトの作成
npx create-mastra@latest mastra-first-agent

# プロジェクトディレクトリに移動
cd mastra-first-agent
npm i @ai-sdk/openai
```

CLI の対話形式で以下を選択します：

- **Components to install**: Agents（必須）、Tools、Workflows など必要なものを選択
- **Default LLM provider**: OpenAI、Anthropic、Gemini などから選択
- **Example code**: Yes（サンプルコードを含める）

## 環境変数の設定

プロジェクトルートに`.env`ファイルを作成し、API キーを設定します。

```bash
# .env
OPENAI_API_KEY=your-api-key-here
```

---

# ハンズオン 1：最初のエージェントを作成する

まずは最もシンプルなエージェントを作成してみましょう。

## エージェントの定義

`src/mastra/agents/index.ts`を以下のように編集します。

```typescript
import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";

// エージェントの定義
export const myFirstAgent = new Agent({
  id: "my-first-agent",
  name: "My First Agent",
  instructions: `
    あなたは親切で丁寧なアシスタントです。
    ユーザーの質問に対して、分かりやすく回答してください。
    日本語で応答してください。
  `,
  model: openai("gpt-4o-mini"),
});
```

## Mastra インスタンスへの登録

`src/mastra/index.ts`でエージェントを登録します。

```typescript
import { Mastra } from "@mastra/core";
import { myFirstAgent } from "./agents";

export const mastra = new Mastra({
  agents: {
    myFirstAgent,
  },
});
```

## 動作確認

開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで`http://localhost:4111`にアクセスすると、Mastra Playground が表示されます。ここでエージェントと対話してテストできます。

![](/assets/posts/startMastra/mastraPlayground.png)

---

# ハンズオン 2：ツールを追加する

エージェントに**ツール**を追加することで、外部 API の呼び出しや計算などの機能を持たせることができます。

## 天気取得ツールの作成

`src/mastra/tools/index.ts`を作成します。

```typescript
import { createTool } from "@mastra/core/tools";
import { z } from "zod";

// 天気を取得するツール（モック）
export const getWeatherTool = createTool({
  id: "get-weather",
  description: "指定された都市の現在の天気を取得します",
  inputSchema: z.object({
    city: z.string().describe("天気を取得したい都市名"),
  }),
  outputSchema: z.object({
    city: z.string(),
    temperature: z.number(),
    condition: z.string(),
  }),
  execute: async (context) => {
    const { city } = context;

    // 実際のアプリケーションでは外部APIを呼び出します
    // ここではモックデータを返します
    const mockWeatherData: Record<
      string,
      { temperature: number; condition: string }
    > = {
      東京: { temperature: 22, condition: "晴れ" },
      大阪: { temperature: 24, condition: "曇り" },
      札幌: { temperature: 15, condition: "雨" },
    };

    const weather = mockWeatherData[city] || {
      temperature: 20,
      condition: "不明",
    };

    return {
      city,
      temperature: weather.temperature,
      condition: weather.condition,
    };
  },
});
```

## エージェントにツールを追加

`src/mastra/agents/index.ts`に以下を追加します。

```typescript
import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";
import { getWeatherTool } from "../tools";

export const weatherAgent = new Agent({
  id: "weather-agent",
  name: "Weather Agent",
  instructions: `
      あなたは天気情報を提供するアシスタントです。
      ユーザーが天気について質問したら、get-weatherツールを使用して
      天気情報を取得し、分かりやすく伝えてください。
      日本語で応答してください。
    `,
  model: openai("gpt-4o-mini"),
  tools: {
    getWeatherTool,
  },
});
```

最後に、`src/mastra/index.ts`にこのエージェントを登録しましょう。

```typescript
import { Mastra } from "@mastra/core";
import { myFirstAgent, weatherAgent } from "./agents";

export const mastra = new Mastra({
  agents: {
    myFirstAgent, // ハンズオン１
    weatherAgent, // ハンズオン２
  },
});
```

これで「東京の天気を教えて」と聞くと、エージェントがツールを呼び出して天気情報を返してくれます。

![](/assets/posts/startMastra/mastraAgents.png)

![](/assets/posts/startMastra/mastraWeatherAgent.png)

# ハンズオン 3：ワークフローを作成する

複数のステップを組み合わせた処理を定義するには**ワークフロー**を使用します。

## ブログ記事生成ワークフロー

トピックを受け取り、アウトラインを作成してから本文を生成するワークフローを作成します。

`src/mastra/workflows/index.ts`を作ります。

```typescript
import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { myFirstAgent } from "../agents";

// ステップ1: アウトラインの生成
const generateOutline = createStep({
  id: "generate-outline",
  inputSchema: z.object({
    topic: z.string().describe("ブログ記事のトピック"),
  }),
  outputSchema: z.object({
    outline: z.string(),
  }),
  execute: async ({ inputData }) => {
    const response = await myFirstAgent.generate(
      `以下のトピックについて、ブログ記事のアウトラインを作成してください：${inputData.topic}`
    );
    return { outline: response.text };
  },
});

// ステップ2: 本文の生成
const generateContent = createStep({
  id: "generate-content",
  inputSchema: z.object({
    outline: z.string(),
  }),
  outputSchema: z.object({
    content: z.string(),
  }),
  execute: async ({ inputData }) => {
    const response = await myFirstAgent.generate(
      `以下のアウトラインに基づいて、ブログ記事の本文を作成してください：\n${inputData.outline}`
    );
    return { content: response.text };
  },
});

// ワークフローの定義
export const blogWorkflow = createWorkflow({
  id: "blog-generator",
  inputSchema: z.object({
    topic: z.string(),
  }),
  outputSchema: z.object({
    content: z.string(),
  }),
});

// ステップの連結
blogWorkflow.then(generateOutline).then(generateContent).commit();
```

## ワークフローの登録

`src/mastra/index.ts`に登録します。

```typescript
import { Mastra } from "@mastra/core";
import { myFirstAgent, weatherAgent } from "./agents";
import { blogWorkflow } from "./workflows";

export const mastra = new Mastra({
  agents: {
    myFirstAgent, // ハンズオン１
    weatherAgent, // ハンズオン２
  },
  workflows: {
    blogWorkflow, // ハンズオン３
  },
});
```

再度起動して画面を開くと、workflow の欄に作成したワークフローが表示されます。

![](/assets/posts/startMastra/mastraWorkflow.png)

起動すると、記事内容が出力されます。

![](/assets/posts/startMastra/mastraExecuteWorkflow.png)

```json
{
  "content": "# TypeScriptの型システムの魅力\n\n## 1. はじめに ..(中略).. ログラミング体験を得ることができるでしょう。"
}
```

# プログラムからエージェントを呼び出す

Playground だけでなく、プログラムから直接エージェントを呼び出すこともできます。

`src/run-agent.ts`を作成します。

```typescript
import "dotenv/config";
import { mastra } from "./mastra";

async function main() {
  // エージェントの取得
  const agent = mastra.getAgent("myFirstAgent");

  // テキスト生成
  const response = await agent.generate("TypeScriptの利点を3つ教えてください");
  console.log(response.text);

  // ストリーミング生成
  const stream = await agent.stream("Mastraの特徴を説明してください");
  if (Symbol.asyncIterator in stream) {
    for await (const chunk of stream as AsyncIterable<any>) {
      process.stdout.write(chunk.text);
    }
  } else if (Array.isArray(stream)) {
    for (const chunk of stream) {
      process.stdout.write(chunk.text);
    }
  } else {
    process.stdout.write((await stream.text) ?? "");
  }
}

main();
```

実行例

```bash
$ npx tsx src/run-agent.ts
TypeScriptの利点を3つ挙げますね。

1. **型安全性**: TypeScriptは静的型付けを提供します。これにより、変数や関数の型を明示的に定義でき、型に関するエラーをコンパイル時に検出できます。これにより、バグの発生を減らし、コードの信頼性が向上します。

2. **コードの可読性と保守性**: 型情報があることで、コードの意図が明確になり、他の開発者が理解しやすくなります。また、IDE（統合開発環境）での補完機能やリファクタリングが強化され、開発効率が向上します。

3. **最新のJavaScript機能のサポート**: TypeScriptは最新のJavaScript（ES6以降）の機能をサポートしており、トランスパイルすることで古いブラウザでも動作するコードに変換できます。これにより、最新の言語機能を利用しながら、広範な互換性を保つことができます。

これらの利点により、TypeScriptは大規模なアプリケーション開発に特に適しています。
Mastra（マストラ）は、主に以下のような特徴を持つプラットフォームやサービスです：

1. **多機能性**: Mastraは、さまざまな機能を統合して提供することが多く、ユーザーが一つのプラットフォームで多くの作業を行えるように設計されています。

2. **ユーザーフレンドリーなインターフェース**: 直感的なデザインが施されており、初心者でも使いやすいのが特徴です。

3. **カスタマイズ性**: ユーザーのニーズに応じて、機能や設定をカスタマイズできる柔軟性があります。

4. **データ分析機能**: データの収集や分析が可能で、ビジネスの意思決定をサポートします。

5. **セキュリティ**: データの保護に関する機能が充実しており、安心して利用できる環境が整っています。

6. **サポート体制**: ユーザー向けのサポートが充実しており、問題が発生した際にも迅速に対応してくれます。

具体的な機能や用途は、Mastraのバージョンや提供されるサービスによって異なる場合がありますので、詳細は公式サイトや関連資料を参照することをお勧めします。
$
```

# REST API として公開する

Mastra は自動的に REST API を生成します。開発サーバー起動後、以下のエンドポイントが利用可能です。

```bash
# エージェントへのリクエスト
curl -X POST http://localhost:4111/api/agents/myFirstAgent/generate \\n  -H "Content-Type: application/json" \\n  -d '{"messages": [{"role": "user", "content": "こんにちは"}]}'
```

Swagger UI は`http://localhost:4111/swagger-ui`で確認できます。

---

# まとめ

本記事では、Mastra の基本的な使い方を紹介しました。

## 学んだこと

1. **Mastra の概要**: TypeScript 製の AI エージェント開発フレームワーク
2. **エージェントの作成**: LLM を活用した基本的なエージェント
3. **ツールの追加**: エージェントに外部機能を持たせる方法
4. **ワークフロー**: 複数ステップの処理を定義する方法

Mastra は活発に開発が進んでいるフレームワークです。公式ドキュメント（https://mastra.ai/docs）も参考にしながら、ぜひAIエージェント開発に挑戦してみてください。

---

[^1]: [Mastra 公式サイト](https://mastra.ai/)
