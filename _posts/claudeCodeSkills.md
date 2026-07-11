---
title: "Claude Code を使いこなす諸機能"
excerpt: ""
coverImage: ""
date: "2026-07-01T22:24:54.000Z"
updatedAt: "2026-07-01T22:24:54.000Z"
tag: ["AI"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Claude Code を入れたはいいけど、なんとなく使っているだけ——そんな方に向けて、`CLAUDE.md`・`Skills`・`Hooks`・`Subagents`・`AGENTS.md` といった諸機能を実際に手を動かしながら学べるハンズオンを書きました。

# 前提

- Claude Code はインストール済み
- Node.js が使える環境
- ターミナルの基本操作ができる

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

- なぜ必要か

Claude Code はあなたのプロジェクトのルールを最初から知りません。「テストは `npm test` で実行して」「コメントは日本語で書いて」——これを毎回会話で伝えるのは非効率です。`CLAUDE.md` に書いておけば、Claude が自動的に読んで理解してくれます。

## ハンズオン：CLAUDE.md を作る

プロジェクトルートに `CLAUDE.md` を作成します。

```bash
touch CLAUDE.md
```

以下の内容を書きます。

```markdown
# claude-code-hands-on

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

`CLAUDE.md` は Claude Code 専用ですが、`AGENTS.md` は Codex、Cursor、Gemini CLI など複数の AI ツールで共通して使えるフォーマットです。今は Claude Code しか使っていない場合も、将来を見越して書いておく価値があります。

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

  - Claude Code だけ使う → `CLAUDE.md` で十分
  - 複数の AI ツールを使い分けている → `AGENTS.md` も用意する

---

# 3. Skills — 繰り返し使う手順を「スキル」として登録する

- なぜ便利か

「このプロジェクトのコードレビューをするときはこの観点でチェックしてほしい」——こういった定型の指示を毎回書くのは手間です。Skills に登録しておけば、呼び出すだけで動いてくれます。

## ハンズオン：PR レビュースキルを作る

ディレクトリを作成します。

```bash
mkdir -p .claude/skills/pr-review
touch .claude/skills/pr-review/SKILL.md
```

`.claude/skills/pr-review/SKILL.md` に以下を書きます。

```
# Skill: PR Review

## 概要

このスキルはプルリクエストのコードレビューを行う手順を定義します。

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
/pr-review src/utils.js をレビューしてください
```

登録した手順とアウトプット形式でレビューが返ってきます。

![](/assets/posts/claudeCodeSkills/skills.png)

---

# 4. Hooks — 自動で走るガードレールを設定する

- なぜ必要か

`CLAUDE.md` にルールを書いても、Claude が「解釈」する余地があります。Hooks は **ルールをアーキテクチャとして強制する** 仕組みです。「.env ファイルへの書き込みを必ずブロックする」のような動作は、Hooks で設定するのが確実です。

## 設定ファイルの場所

Hooks の設定は以下のいずれかに書きます。

- プロジェクト単位：`.claude/settings.json`
- ユーザー全体：`~/.claude/settings.json`

## ハンズオン 1：Hook が動作していることをログで確認する

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

## ハンズオン 2：危険なファイルへの書き込みをブロックする

`.claude/settings.json` を以下のように更新します。

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path // \"\"' | grep -q '\\.env' && echo '{\"continue\": false, \"stopReason\": \".env ファイルへの書き込みは禁止されています\"}' || exit 0"
          }
        ]
      }
    ],
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

Claude Code のプロンプトで以下を試してみます。

```plaintext
.env ファイルに TEST=hello と書いてください
```

Hook が発火して書き込みがブロックされます。`CLAUDE.md` の指示と違い、Claude は理由をつけてこれを回避できません。

![](/assets/posts/claudeCodeSkills/hooks2.png)

## Hooks のタイミング一覧

| タイミング     | 説明                 | 主なユースケース       |
| -------------- | -------------------- | ---------------------- |
| `PreToolUse`   | ツール実行の直前     | 危険操作のブロック     |
| `PostToolUse`  | ツール実行成功の直後 | 自動フォーマット、通知 |
| `SessionStart` | セッション開始時     | 環境チェック           |
| `SessionEnd`   | セッション終了時     | ログ保存、後片付け     |

---

# 5. Subagents — 専門エージェントに作業を丸投げする

- なぜ便利か

1 つの会話で全部やろうとすると、コンテキストがどんどん膨らんで精度が落ちます。Subagents を使うと、専門のエージェントを独立したコンテキストで動かせるため、メインの会話が汚染されません。

## ハンズオン：コードレビュー専門エージェントを作る

```bash
mkdir -p .claude/agents
touch .claude/agents/code-reviewer.md
```

`.claude/agents/code-reviewer.md` に以下を書きます。

```markdown
---
name: code-reviewer
description: コードレビューを行う専門エージェント。コード品質・セキュリティ・パフォーマンスの観点で分析します。
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
│   │   └── pr-review/
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
