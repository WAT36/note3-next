---
title: "Claude CodeのCLAUDE.md・Skills・Hooks・Subagentsを試す"
excerpt: "Claude CodeのCLAUDE.md、AGENTS.md、Skills、Hooks、Subagentsの役割と使い方を、Node.jsのサンプルを通して試します。"
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

Claude Code を入れたものの、なんとなく対話しているだけ——そんな方に向けて、`CLAUDE.md`、Skills、Hooks、Subagents といった主要な拡張機能に加え、複数のコーディングエージェントで指示を共有するための `AGENTS.md` を、実際に手を動かしながら試します。

# 前提

- Claude Code はインストール済み
- Node.js が使える環境
- ターミナルの基本操作ができる
- macOS または Linux 環境
- `jq`がインストール済み

※ 本記事は 2026 年 7 月時点の Claude Code をもとに作成しています。Claude Code は継続的に更新されているため、実行時には公式ドキュメントもあわせて確認してください。

---

# 全体像：機能の役割分担

まず頭に入れておきたいのが、各機能の「役割分担」です。

| 機能          | 一言で言うと                   | いつ使う                                   |
| ------------- | ------------------------------ | ------------------------------------------ |
| **CLAUDE.md** | プロジェクトの説明書           | 毎回同じ説明をしたくないとき               |
| **AGENTS.md** | 複数 AI ツール共通ルール       | 複数の AI ツールを使い分けるとき           |
| **Skills**    | 再利用できる専門手順           | 繰り返し使うフローがあるとき               |
| **Hooks**     | 特定のタイミングで走る自動処理 | ログ記録や検査などを自動化したいとき       |
| **Subagents** | 独立した専門エージェント       | 専門タスクや大量の途中経過を分離したいとき |

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

Claude Code はあなたのプロジェクトのルールを最初から知りません。「動作確認は `node src/index.js` で行って」「コメントは日本語で書いて」——これを毎回会話で伝えるのは非効率です。`CLAUDE.md` に書いておけば、Claude が自動的に読んで理解してくれます。

## ハンズオン：CLAUDE.md を作る

プロジェクトルートに `CLAUDE.md` を作成します。

```bash
touch CLAUDE.md
```

以下の内容を書きます。

※先頭の`@AGENTS.md` は、次章で作成する `AGENTS.md` を読み込むための記述です。現時点ではファイルが存在しませんが、次章で追加します。
また、この時点ではまだ `AGENTS.md` を作成していないため、動作確認用のコーディング規約を `CLAUDE.md` にも記載しています。次章で `AGENTS.md` を作成した後は、共通規約をそちらへ移すこともできます。

```markdown
@AGENTS.md

## Claude Code 固有の指示

- 作業前に変更方針を簡潔に説明すること

## プロジェクト概要

Node.js の練習プロジェクト。Claude Code ハンズオン用。

## よく使うコマンド

- `node src/index.js` — アプリケーションを実行する
- 現時点ではテストは未導入

## コーディング規約

- 関数には必ずコメントを書くこと
- コメントは日本語で書くこと
- セミコロンは省略しないこと

## 変更時の注意

- `package.json`へ依存パッケージを追加する前に確認すること
- `node_modules/`は手動で編集しないこと
```

## 動作確認

Claude Code を起動してみます。

```bash
claude
```

Claude Code のプロンプトで以下を入力してみましょう。

```plaintext
src/utils.js に新しい関数 multiply を追加してください。src/index.jsからmultiply(2, 3)を呼び出せるようにしてください。
```

`CLAUDE.md`の指示に従い、日本語のコメントとセミコロンを含む変更になることを確認します。なお、`CLAUDE.md`は自然言語による指示であり、機械的に強制される設定ではありません。

`src/utils.js`

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

function add(a, b) {
  return a + b;
}

// 2つの数値を掛け算して結果を返す
function multiply(a, b) {
  return a * b;
}

module.exports = { greet, add, multiply };
```

`src/index.js`

```javascript
const { greet, add, multiply } = require("./utils");

console.log(greet("World"));
console.log(add(1, 2));
console.log(multiply(2, 3));
```

---

# 2. AGENTS.md — 複数 AI ツール共通のルールブック

## CLAUDE.md との違い

`CLAUDE.md` は Claude Code 専用ですが、 `AGENTS.md` は対応する複数のコーディングエージェント間で指示を共有するために利用できます。

ただし、Claude Code は AGENTS.md を直接は自動読み込みしません。Claude Code でも内容を利用するには、`CLAUDE.md` から `AGENTS.md` をインポートします。

## ハンズオン：AGENTS.md を作る

```bash
touch AGENTS.md
```

`AGENTS.md` は以下のように書きます。

````markdown
## 動作確認コマンド

```bash
node src/index.js
```

## コーディング規約

- 関数には必ず日本語のコメントを書くこと
- セミコロンは省略しないこと

## 禁止操作

- `node_modules/`を手動で編集しないこと
- 依頼されていない依存パッケージを追加しないこと
- 既存の公開 API を無断で変更しないこと

## プロジェクト構造

- `src/` — アプリケーションコード
````

`AGENTS.md` を作成したら、いったん Claude Code を終了して再起動します。これにより、`CLAUDE.md` からインポートした `AGENTS.md` の内容が新しいセッションへ読み込まれます。

## 使い分けの目安

- Claude Code だけを使う場合は CLAUDE.md
- 複数ツールで指示を共有する場合は AGENTS.md
- Claude Code からは CLAUDE.md 内の@AGENTS.md で読み込む
- Claude Code 固有の指示だけを CLAUDE.md に追記する

---

# 3. Skills — 繰り返し使う手順を「スキル」として登録する

「このプロジェクトのコードレビューをするときはこの観点でチェックしてほしい」——こういった定型の指示を毎回書くのは手間です。Skills に登録しておけば、呼び出すだけで動いてくれます。

## ハンズオン：コードレビュースキルを作る

ディレクトリを作成します。

```bash
mkdir -p .claude/skills/project-code-review
touch .claude/skills/project-code-review/SKILL.md
```

`.claude/skills/project-code-review/SKILL.md` に以下を書きます。

```
---
name: project-code-review
description: 変更されたコードを、機能面・コード品質・セキュリティの観点からレビューするときに使用します。
---

# Code Review

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

## 動作確認

Claude Code のプロンプトで以下を入力します。

```plaintext
/project-code-review src/utils.js をレビューしてください
```

登録した手順とアウトプット形式でレビューが返ってきます。

![](/assets/posts/claudeCodeSkills/skills.png)

---

# 4. Hooks — 特定のタイミングで処理を自動実行する

`CLAUDE.md`に書いた内容は Claude に対する自然言語の指示ですが、Hooks は Claude Code の処理中に特定のタイミングでコマンドを自動実行する仕組みです。ファイル編集後のフォーマットやログ記録など、毎回同じ処理を自動化したい場合に利用できます。

## 設定ファイルの場所

Hooks の設定は以下のいずれかに書きます。

- プロジェクト単位：`.claude/settings.json`
- ユーザー全体：`~/.claude/settings.json`

## ハンズオン：Hook が動作していることをログで確認する

まず Hook で実行するファイルを作ります。

```bash
mkdir -p .claude/hooks
touch .claude/hooks/log-file-change.sh
chmod +x .claude/hooks/log-file-change.sh
```

`log-file-change.sh`は以下のようにします。

```bash
#!/bin/sh

file_path=$(jq -r '.tool_input.file_path // ""')

printf '[%s] %s が編集されました\n' \
  "$(date)" \
  "$file_path" \
  >> /tmp/claude-hook.log
```

次に設定ファイルを作ります。

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
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/log-file-change.sh"
          }
        ]
      }
    ]
  }
}
```

## ポイント：通常の stdout はチャットにそのまま表示されない

通常のテキストを stdout へ出力しても、PostToolUse ではその内容がチャット画面にそのまま表示されるわけではありません。今回のように Hook の実行を目視確認するだけなら、ログファイルへ書き出す方法が分かりやすいです。なお、所定の JSON 形式で出力すれば、Hook から Claude へ追加情報を渡すこともできます。

## 動作確認

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

# 5. Subagents — 専門エージェントに作業を委譲する

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

## 動作確認

Claude Code のプロンプトで以下を入力します。

```plaintext
@"code-reviewer (agent)" src/utils.js をレビューしてください
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
│   │   └── project-code-review/
│   │       └── SKILL.md              # コードレビュースキル
│   ├── hooks/
│   │   └── log-file-change.sh
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
3. **Hooks**（ログ記録や自動フォーマットを設定する）
4. **Subagents**（専門タスクを切り出したくなったら）
5. **AGENTS.md**（複数の AI ツールを使い始めたら）

---

# まとめ

| 機能      | やること                   | 効果                               |
| --------- | -------------------------- | ---------------------------------- |
| CLAUDE.md | プロジェクトのルールを書く | 毎回同じ説明が不要になる           |
| AGENTS.md | 複数 AI 共通ルールを書く   | ツールを変えてもルールが統一される |
| Skills    | 定型手順を登録する         | 呼び出すだけで専門的な動作をする   |
| Hooks     | イベントに応じた処理を書く | 定型処理を自動実行できる           |
| Subagents | 専門エージェントを作る     | タスクとコンテキストを分離できる   |

これらは「全部一気にやる」必要はありません。まず `CLAUDE.md` を書くところから始めて、徐々に自分のワークフローに合わせて拡張していくのが一番続きます。
