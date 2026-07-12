---
title: "Claude CodeのCLAUDE.md・Skills・Hooks・Subagentsを試す"
excerpt: ""
coverImage: "/assets/posts/claudeCodeSkills/welcome.png"
date: "2026-07-01T22:24:54.000Z"
updatedAt: "2026-07-01T22:24:54.000Z"
tag: ["AI"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Claude Code を入れたものの、なんとなく対話しているだけ——そんな方に向けて、CLAUDE.md、Skills、Hooks、Subagents といった主要な拡張機能に加え、複数のコーディングエージェントで指示を共有するための AGENTS.md を、実際に手を動かしながら試します。

# 前提

- Claude Code はインストール済み
- Node.js が使える環境
- ターミナルの基本操作ができる

※ 本記事は 2026 年 7 月時点の Claude Code をもとに作成しています。Claude Code は継続的に更新されているため、実行時には公式ドキュメントもあわせて確認してください。

---

# 全体像：機能の役割分担

まず頭に入れておきたいのが、各機能の「役割分担」です。

| 機能          | 一言で言うと               | いつ使う                           |
| ------------- | -------------------------- | ---------------------------------- |
| **CLAUDE.md** | プロジェクトの説明書       | 毎回同じ説明をしたくないとき       |
| **AGENTS.md** | 複数 AI ツール共通ルール   | 複数の AI ツールを使い分けるとき   |
| **Skills**    | 再利用できる専門手順       | 繰り返し使うフローがあるとき       |
| **Hooks**     | 自動で走るガードレール     | 確実に実行させたい処理があるとき   |
| **Subagents** | 専門エージェントへの丸投げ | 重い・専門的な作業を分離したいとき |

---

# ハンズオン用プロジェクトのセットアップ

まず、練習用のシンプルなプロジェクトを作ります。

```bash
mkdir claude-code-hands-on
cd claude-code-hands-on
npm init -y
mkdir src
touch src/index.js src/utils.js
```

`src/index.js` に以下を貼り付けます。

```javascript
const { greet, add } = require("./utils");

console.log(greet("World"));
console.log(add(1, 2));
```

`src/utils.js` に以下を貼り付けます。

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

function add(a, b) {
  return a + b;
}

module.exports = { greet, add };
```

これでハンズオンの準備は完了です。

---

# 1. CLAUDE.md — プロジェクトの説明書を作る

Claude Code はあなたのプロジェクトのルールを最初から知りません。「テストは `npm test` で実行して」「コメントは日本語で書いて」——これを毎回会話で伝えるのは非効率です。`CLAUDE.md` に書いておけば、Claude が自動的に読んで理解してくれます。

## ハンズオン：CLAUDE.md を作る

プロジェクトルートに `CLAUDE.md` を作成します。

```bash
touch CLAUDE.md
```

以下の内容を書きます。

```markdown
@AGENTS.md

## Claude Code 固有の指示

- 作業前に変更方針を簡潔に説明すること

## プロジェクト概要

Node.js の練習プロジェクト。Claude Code ハンズオン用。

## よく使うコマンド

- `node src/index.js` — 実行
- `npm test` — テスト実行（現時点では未設定）

## コーディング規約

- 関数にはかならずコメントを書くこと
- コメントは日本語で書くこと
- セミコロンは省略しないこと

## 触ってはいけないファイル

- `package-lock.json` は手動で編集しないこと
```

- 動作確認

Claude Code を起動してみます。

```bash
claude
```

Claude Code のプロンプトで以下を入力してみましょう。

```plaintext
src/utils.js に新しい関数 multiply を追加してください
```

コメントが日本語で書かれ、セミコロンがある状態で出力されるはずです。`CLAUDE.md` の指示が効いています。

```javascript
// 2つの数値を掛け算して結果を返す
function multiply(a, b) {
  return a * b;
}
```

---

# 2. AGENTS.md — 複数 AI ツール共通のルールブック

- CLAUDE.md との違い

`CLAUDE.md` は Claude Code 専用ですが、`AGENTS.md` は Codex、Cursor、Gemini CLI など複数のコーディングエージェント間で共有しやすい指示ファイルです。

ただし、Claude Code は AGENTS.md を直接は自動読み込みしません。Claude Code でも内容を利用するには、CLAUDE.md から AGENTS.md をインポートします。

## ハンズオン：AGENTS.md を作る

```bash
touch AGENTS.md
```

AGENTS.md は以下のように書きます。

````
## テストコマンド

```bash
npm test
```

## コーディング規約

- セミコロンは省略しないこと
- 関数コメントは日本語で書くこと

## 禁止操作

- .env ファイルへの直接書き込み禁止
- node_modules/ の手動編集禁止

## プロジェクト構造

- `src/` — アプリケーションコード
- `tests/` — テストコード（今後追加予定）

````

- 使い分けの目安

  - Claude Code だけを使う場合は CLAUDE.md
  - 複数ツールで指示を共有する場合は AGENTS.md
  - Claude Code からは CLAUDE.md 内の@AGENTS.md で読み込む
  - Claude Code 固有の指示だけを CLAUDE.md に追記する

---

# 3. Skills — 繰り返し使う手順を「スキル」として登録する

「このプロジェクトのコードレビューをするときはこの観点でチェックしてほしい」——こういった定型の指示を毎回書くのは手間です。Skills に登録しておけば、呼び出すだけで動いてくれます。

## ハンズオン：PR レビュースキルを作る

ディレクトリを作成します。

```bash
mkdir -p .claude/skills/code-review
touch .claude/skills/code-review/SKILL.md
```

`.claude/skills/code-review/SKILL.md` に以下を書きます。

```
---
name: code-review
description: 変更されたコードを、機能面・コード品質・セキュリティの観点からレビューするときに使用します。
---

# PR Review

## チェック項目

### 1. 機能面

- 仕様通りに動くか
- エッジケースが考慮されているか
- エラーハンドリングがあるか

### 2. コード品質

- 関数が単一責務になっているか
- 変数名・関数名がわかりやすいか
- 重複コードがないか

### 3. セキュリティ

- 外部入力のバリデーションがあるか
- 機密情報がハードコードされていないか

## アウトプット形式

レビュー結果は以下の形式で出力してください。

**総評：** （一言）

**Good 👍**

- （良い点を箇条書き）

**要修正 🔧**

- （修正が必要な点を箇条書き）

**提案 💡**

- （あってもなくてもよい提案）

```

- 動作確認

Claude Code のプロンプトで以下を入力します。

```plaintext
/code-review src/utils.js をレビューしてください
```

登録した手順とアウトプット形式でレビューが返ってきます。

![](/assets/posts/claudeCodeSkills/skills.png)

---

# 4. Hooks — 自動で走るガードレールを設定する

`CLAUDE.md` にルールを書いても、Claude が「解釈」する余地があります。Hooks は **ルールをアーキテクチャとして強制する** 仕組みです。「.env ファイルへの書き込みを必ずブロックする」のような動作は、Hooks で設定するのが確実です。

## 設定ファイルの場所

Hooks の設定は以下のいずれかに書きます。

- プロジェクト単位：`.claude/settings.json`
- ユーザー全体：`~/.claude/settings.json`

## ハンズオン ：Hook が動作していることをログで確認する

まず設定ファイルを作ります。

```bash
mkdir -p .claude
touch .claude/settings.json
```

`.claude/settings.json` に以下を書きます。

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path // \"\"' | xargs -I{} sh -c 'echo \"[$(date)] {} が編集されました\" >> /tmp/claude-hook.log'"
          }
        ]
      }
    ]
  }
}
```

- ポイント：`echo` の stdout はチャットに表示されない

`echo '編集されました'` のようなコマンドを書いても、その出力は Claude Code のチャット画面には表示されません。PostToolUse hook の stdout は Claude に渡されないためです。

動作確認するには、**ログファイルへの書き出し**が確実です。

- 動作確認

別ターミナルで以下を実行しておきます。

```bash
tail -f /tmp/claude-hook.log
```

この状態で Claude Code から何かファイルを編集してもらうと、編集のたびにログが追記されます。

```bash
[Fri Jul  4 12:00:00 JST 2026] src/utils.js が編集されました
```

ログが流れれば Hook は正常に動作しています。

## 代表的な Hook イベント

Hook イベントは多数ありますが、代表的なものを以下に記載します。

| タイミング     | 説明                 | 主なユースケース       |
| -------------- | -------------------- | ---------------------- |
| `PreToolUse`   | ツール実行の直前     | 危険操作のブロック     |
| `PostToolUse`  | ツール実行成功の直後 | 自動フォーマット、通知 |
| `SessionStart` | セッション開始時     | 環境チェック           |
| `SessionEnd`   | セッション終了時     | ログ保存、後片付け     |

---

# 5. Subagents — 専門エージェントに作業を丸投げする

1 つの会話に大量の検索結果やログ、ファイル内容が蓄積すると、メインのコンテキストを圧迫し、後続の作業に必要な情報を扱いにくくなることがあります。Subagents を使うと、専門のエージェントを独立したコンテキストで動かせるため、メインの会話に大量の途中経過を持ち込まずに済みます。

Skills と混同しがちですが、Skills は「どう進めるかという手順」を再利用する仕組みで、Subagents は「誰に、どのコンテキストと権限で任せるか」を分離する仕組み、と考えると整理しやすいです。

## ハンズオン：コードレビュー専門エージェントを作る

```bash
mkdir -p .claude/agents
touch .claude/agents/code-reviewer.md
```

`.claude/agents/code-reviewer.md` に以下を書きます。

```markdown
---
name: code-reviewer
description: コード品質・セキュリティ・パフォーマンスの観点からコードをレビューします。実装後の確認に使用します。
tools: Read, Grep, Glob
---

# Code Reviewer Agent

あなたはコードレビューの専門家です。以下の観点でコードを分析してください。

## レビュー観点

### コード品質

- 可読性：変数名・関数名は意図が伝わるか
- 単一責務：1 つの関数が複数の役割を持っていないか
- DRY 原則：同じロジックが重複していないか

### セキュリティ

- 外部入力のバリデーションがあるか
- 機密情報がコードに直書きされていないか

### パフォーマンス

- 不要なループや重複処理がないか
- 非同期処理が適切に扱われているか

## アウトプット形式

以下のフォーマットで出力してください。

**総評：** （Good / 要修正 / 要改善）

**Good 👍**
（良い点）

**要修正 🔧**
（修正必須な問題点と修正案）

**提案 💡**
（任意の改善提案）
```

- 動作確認

Claude Code のプロンプトで以下を入力します。

```plaintext
code-reviewer エージェントを使って src/utils.js をレビューしてください
```

独立したコンテキストでレビュー専門エージェントが動き、結果が返ってきます。

![](/assets/posts/claudeCodeSkills/subagentResult.png)

---

# ファイル構成のまとめ

ここまで作成したファイルを整理すると、以下のような構成になっています。

```plaintext
claude-code-hands-on/
├── CLAUDE.md                         # Claude Code 向け説明書
├── AGENTS.md                         # 複数AIツール共通ルール
├── .claude/
│   ├── settings.json                 # Hooks 設定
│   ├── skills/
│   │   └── code-review/
│   │       └── SKILL.md              # PR レビュースキル
│   └── agents/
│       └── code-reviewer.md          # コードレビュー専門エージェント
├── src/
│   ├── index.js
│   └── utils.js
└── package.json
```

---

# どれから始めるか：優先順位

1. **CLAUDE.md**（今日からできる。一番効果が出やすい）
2. **Skills**（繰り返しやっている作業を登録する）
3. **Hooks**（自動フォーマットや危険操作のブロックを設定する）
4. **Subagents**（専門タスクを切り出したくなったら）
5. **AGENTS.md**（複数の AI ツールを使い始めたら）

---

# まとめ

| 機能      | やること                     | 効果                               |
| --------- | ---------------------------- | ---------------------------------- |
| CLAUDE.md | プロジェクトのルールを書く   | 毎回同じ説明が不要になる           |
| AGENTS.md | 複数 AI 共通ルールを書く     | ツールを変えてもルールが統一される |
| Skills    | 定型手順を登録する           | 呼び出すだけで専門的な動作をする   |
| Hooks     | 自動処理・ブロックを設定する | 人手を介さず確実に実行される       |
| Subagents | 専門エージェントを作る       | 複雑なタスクを分離して精度を保つ   |

これらは「全部一気にやる」必要はありません。まず `CLAUDE.md` を書くところから始めて、徐々に自分のワークフローに合わせて拡張していくのが一番続きます。
