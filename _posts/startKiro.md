---
title: 'Kiroを使ってみた'
excerpt: 'AWSのエージェント型IDE「Kiro」について'
coverImage: '/assets/posts/startKiro/kiro-color.svg'
date: '2026-09-08T00:29:11.000Z'
updatedAt: '2026-09-08T00:29:11.000Z'
tag: ["AI"]
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
ogImage:
  url: ''
---

昨今いろんなAIエージェント搭載のIDEが登場しているが、今回は **Kiro** が気になっていたので使ってみました。

---

# Kiroとは

KiroはAWSが開発・運営するエージェント型の開発環境です。IDE、CLI、Webなど複数のインターフェースが提供されており、本記事ではその中でも Kiro IDE を実際に使ってみます。

Kiro IDEはCode OSSをベースに構築されており、VS Codeの設定・テーマ・キーバインドを引き継げます。拡張機能についても、Open VSXで提供されている互換拡張を利用できます。

## 背景：「バイブコーディング」問題

AI補完ツールが普及したことで、「とりあえずプロンプトを投げてコードを受け取る」という  
いわゆる **バイブコーディング（vibe coding）** が一般化しました。  
しかし、この手法には課題があります。

- 局所的には動作していても、プロジェクト全体の設計やアーキテクチャとずれることがある
- 複雑な機能では、要件やエッジケースが十分に考慮されないことがある
- 会話だけで進めると、設計上の意思決定が後から追いづらくなることがある

Kiro はこの問題を解決するために、**コードを書く前に仕様を明示化するフロー** を導入しています。

一言で言うと、 **「プロンプト → 仕様書 → 設計ドキュメント → コード」** という流れで開発を進めるAI IDEです。

---

# 主な特徴

| 機能 | 概要 |
|------|------|
| **Spec（仕様書）駆動開発** | 自然言語のプロンプトから要件・設計・タスクを自動生成 |
| **Steering（ステアリング）** | プロジェクト固有のルール・規約をAIに永続的に記憶させる |
| **Agent Hooks** | ファイル保存・作成などのイベントをトリガーに自動タスクを実行 |
| **MCP サポート** | MCPサーバーを通して、AWSのドキュメントや外部API、データベースなどのツール・データソースと連携 |
| **VS Code 互換** | 既存の拡張機能・設定がそのまま使える |
| **マルチプラットフォーム** | Windows / macOS / Linux に対応 |

Kiroが向いているケースとしては、主に以下のような場合であると考えます。

- 要件が複雑で、実装前に設計を固めたいプロジェクト
- チームでAIの出力に一貫性を持たせたい場合
- AWSサービスと連携する開発でも、MCPやAWS関連ツールを組み合わせて利用できる

---

# インストールと初期設定

## ダウンロード

kiro.dev[^1] から自分のOSに合ったインストーラーをダウンロードします。  
インストール手順は VS Code とほぼ同じです。

## 認証

起動後、利用するアカウントでサインインします。

## VS Code 設定のインポート

初回セットアップ時に VS Code の拡張・設定をインポートできます。  
既存環境をそのまま移行できるので、学習コストが低いのも魅力です。

---


# 3つのコア機能を理解する

Kiro のワークフローは以下の3つの機能を中心に構成されています。

```whitespace
[Steering] プロジェクト全体の文脈・ルール（永続的）
    ↓
[Spec]     特定機能の仕様・設計・タスク（機能ごと）
    ↓
[Hooks]    イベントドリブンな自動化（継続的）
```

---

## 1. Steering（ステアリング）

**「毎回 AI に同じことを説明しなくて済む仕組み」** です。

従来のAI補完ツールでは、セッションが変わるたびに「このプロジェクトは TypeScript を使っています」「命名規則は camelCase です」などを説明し直す必要がありました。
Steering はこの問題を解決します。

- `.kiro/steering/` ディレクトリにMarkdownファイルとして保存する
- プロジェクトの規約や技術スタックなどをKiroのコンテキストとして利用できる
- ファイルごとに、常に読み込む・特定ファイルに対してだけ読み込む・手動で読み込む、といった適用方法を設定できる

**Steering ファイルの生成方法：**

1. Kiro パネルを開く（アクティビティバーの Kiro アイコンをクリック）
2. **「Generate Steering Docs」** をクリック
3. Kiro がプロジェクト構造を解析して `.kiro/steering/` に自動生成

**生成されるファイル例：**

```whitespace
.kiro/steering/
├── product.md    # プロジェクトの概要・目的
├── tech.md       # 使用技術スタック・ライブラリ
└── structure.md  # ディレクトリ構成・命名規約
```

SteeringはKiroが読みやすいよう、必要なルールやプロジェクト情報を簡潔・具体的に記述します。情報を詰め込みすぎるとコンテキストを圧迫するため、AIに必要な内容へ絞るのがおすすめです。

---

## 2. Spec（スペック）

**「プロンプトから仕様書・設計書・タスクリストを自動生成する機能」** です。

Kiro の最大の特徴がこの Spec です。
Spec セッションを開始すると、Kiro はコードを書く前に以下の3段階を経ます。

Feature Specには複数の進め方がありますが、ここでは最も基本的な Requirements-First を例に説明します。

### Phase 1: Requirements（要件）

あなたの入力：「商品レビュー機能を追加して」

Kiro が生成するもの：

- ユーザーストーリー
- EARS（Easy Approach to Requirements Syntax）記法による受入条件
- エッジケースの列挙

### Phase 2: Design（設計）

プロジェクトの内容に応じて、例えば以下のような設計情報が生成されます。

- アーキテクチャの方針
- データフロー図（Mermaid 形式）
- TypeScript インターフェース定義
- API エンドポイント設計
- DB スキーマ

### Phase 3: Tasks（タスク）

設計を承認すると、実装ステップに分解：

- 実装タスクの一覧（チェックボックス形式）
- 依存関係の整理

`tasks.md`から個別のタスクをStart Taskで実行できます。また、すべてのタスクをまとめて実行することもでき、その場合は依存関係を考慮して並列実行されることがあります。  
Kiroでは変更内容をdiffで確認できます。Supervisedモードでは変更ごとにレビューしてaccept/rejectできるため、重要なコードでは確認しながら進めることも可能です。  

Spec ファイルは `.kiro/specs/<feature-name>/` に保存されます：

```whitespace
.kiro/specs/review-system/
├── requirements.md
├── design.md
└── tasks.md
```

---

## 3. Agent Hooks（エージェントフック）

**「IDEのイベントをトリガーに、AIタスクを自動実行する仕組み」** です。

例えば：

- AIエージェントが React コンポーネントを変更・保存したとき → テストファイルを自動更新
- 新しいファイルを作成したとき → セキュリティスキャンを実行
- TypeScriptファイルを保存したとき → lintや型チェックを実行
- スキーマ変更時 → 関連コードの型定義を同期

Hook ファイルは `.kiro/hooks/` に JSON 形式で保存されます：

```json
{
  "version": "v1",
  "hooks": [
    {
      "name": "lint-on-save",
      "trigger": "PostFileSave",
      "matcher": "\\.ts$",
      "action": {
        "type": "command",
        "command": "npm run lint"
      },
      "timeout": 30,
      "enabled": true
    }
  ]
}
```

Hookは自然言語から生成するほか、UIや.kiro/hooks/*.jsonを編集して設定できます。  

> **Note:** Hooks はリポジトリレベルで保存されるため、チームメンバーが
> リポジトリをチェックアウトすれば全員が同じ自動化の恩恵を受けられます。

---

# ハンズオン：ToDoアプリの機能をSpecで実装する

ここでは **「ToDoアプリにタグ絞り込み機能を追加する」** という例でSpec機能を体験します。

## Step 1: プロジェクトを開く

既存のプロジェクト（ここでは React + TypeScript の ToDoアプリとします）を Kiro で開きます。

```bash
kiro .
```

## Step 2: Steering を生成する

初回はまず Steering を生成します。

1. Kiro パネルを開く
2. **「Generate Steering Docs」** をクリック

コマンドパレット(Ctrl(command)+shift+p)から入力すると出てきます

![](/assets/posts/startKiro/generateSteeringDocs.png)

3. 生成された `.kiro/steering/tech.md` を開いて内容を確認・修正

`.kiro/steering/tech.md` の例：

```markdown
## 技術スタック
- フロントエンド: React 18 + TypeScript
- スタイリング: Tailwind CSS
- 状態管理: useState（グローバル状態は Context API）
- テスト: Vitest + Testing Library
- 命名規則: コンポーネントは PascalCase、関数は camelCase
```

## Step 3: Spec セッションを開始する

1. Kiro のチャットパネルで **Spec モード** を選択

![](/assets/posts/startKiro/specMode.png)

2. 以下のプロンプトを入力

```whitespace
ToDoアプリにタグによる絞り込み機能を追加したい。
ユーザーはToDoアイテムに複数のタグを付けられ、
タグをクリックすると該当タグを持つアイテムだけ表示される。
```

## Step 4: Requirements を確認・承認する

Kiro が生成した要件を確認します。例：

``` markdown
## 要件

### 機能要件
- ユーザーはToDoアイテム作成・編集時に1つ以上のタグを付与できる
- タグ一覧がUIに表示される
- タグをクリックすると、そのタグを持つToDoのみ表示する
- 複数タグの AND/OR 絞り込みをサポートする

### EARS 記法による受入条件
- When ユーザーがタグをクリックする
  Then 該当タグを持つToDoアイテムのみが表示される
- When タグが選択されていない
  Then すべてのToDoアイテムが表示される
```

作成された内容に問題なければ承認します。必要に応じて直接編集も可能です。

![](/assets/posts/startKiro/requirements.png)

## Step 5: Design を確認・承認する

要件が確定すると、Kiro がコードベースを解析して設計書を生成します。以下は作成される一例です。

```markdown
## 設計

### データ構造
interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  tags: Tag[];  // 既存の型に追加
}

### 追加コンポーネント
- TagBadge: タグ表示用の小さなバッジ
- TagFilter: タグ絞り込み用のフィルタUI
- TagSelector: アイテム編集時のタグ選択UI

### 状態管理
- selectedTags: Tag[] を Context で管理
- フィルタリングは useMemo で最適化
```

設計を確認・修正して 承認します。

![](/assets/posts/startKiro/design.png)

## Step 6: Tasks を実行する

タスクリストが生成されます。例：

```markdown
## タスク
- [ ] Tag 型定義を types.ts に追加
- [ ] TodoItem に tags フィールドを追加
- [ ] TagBadge コンポーネントを作成
- [ ] TagFilter コンポーネントを作成
- [ ] TagSelector コンポーネントを作成
- [ ] フィルタリングロジックを TodoContext に追加
- [ ] 各コンポーネントのテストを作成
```

**Start task** をクリックすると、上から順にタスクを実行してコードを生成します。
各タスクの差分を確認しながら進められます。

![](/assets/posts/startKiro/tasks.png)

## Step 7: Hook を設定する（オプション）

`.tsx` ファイルを保存したとき自動でテストを更新するように Hook を設定します。  
※ このトリガーは Kiro（エージェント）自身がファイルを変更・保存した場合にのみ発火 します。開発者がエディタで手動保存しただけでは発火しない点に注意してください。  

![](/assets/posts/startKiro/agentsHooks.png)

Kiro パネルで **「Agent Hooks」** → **「+」** をクリックして以下を入力：

```whitespace
Reactコンポーネントファイル（.tsx）を保存したときに、
対応するテストファイルを自動で確認・更新してください。
```

Kiro が最適な Hook 設定を JSON で生成します。

---

# 他のAI開発ツールとの使い分け

Kiroは、Claude CodeやCursorなどと比べて、**実装前に仕様や設計を整理しながら開発できること**が大きな特徴です。

Specを使えば、Requirements・Design・TasksをMarkdownとして残せるため、要件が複雑な機能開発や、チームで設計意図を共有したい場合に向いています。

一方で、小さな修正やバグ修正ではSpecを作る工程がやや大げさになることもあります。そのような場合は、Claude CodeやCursorなどで直接コードを修正した方が素早く進められます。

ざっくり使い分けると、以下のようになります。

| やりたいこと                | 向いているツール                 |
| --------------------- | ------------------------ |
| 要件から整理して新機能を作りたい      | **Kiro**                 |
| 仕様・設計をドキュメントとして残したい   | **Kiro**                 |
| 複雑な機能を実装前に整理したい       | **Kiro**                 |
| 既存コードの調査・バグ修正         | **Claude Code**          |
| GitやCLIを含む作業をまとめて任せたい | **Claude Code**          |
| 普段のコーディング中にAIを使いたい    | **CursorなどのAI IDE**      |
| 小さな変更を素早く行いたい         | **Claude Code / Cursor** |

Kiroは「何をどう作るか」を整理してから実装したい場面に強く、Claude CodeやCursorは、すでにやることが決まっている作業を素早く進めたい場面に向いていると感じました。

どれか1つに統一する必要はなく、Kiroで仕様や設計を作り、その内容をもとにClaude Codeで実装するといった使い分けもできます。


---

# 料金について

Kiro は **クレジット制** の料金モデルを採用しています。

| プラン | 内容 |
|--------|------|
| Free（無料） | 月額50クレジット付与（繰り返し） |
| Pro / Pro+ / Pro Max / Power | 月額 $20〜$200、1,000〜10,000クレジット |
| 追加クレジット | $0.04 / クレジット（購入から12ヶ月有効） |
| 新規ユーザー特典 | 初回有料プラン加入時に $20 分のボーナスクレジット |

※料金は変更される可能性があるため、最新情報は公式料金ページ[^2]を参照してください

---

# まとめ

Kiroは単にコード生成を高速化するだけでなく、仕様・設計・タスクを明文化しながら、より構造的にAIと開発を進めることを重視したツールです。

- 小さなスクリプトや素早いプロトタイプには従来のバイブコーディングが有効
- 本番リリースを見据えた機能開発・チーム開発では Kiro の Spec 駆動フローが力を発揮する

まずは無料トライアルで Spec セッションを1回試してみてください。
**「プロンプトを出したら仕様書が生まれる」** という体験は、開発への向き合い方を変えてくれます。

---

[^1]: [kiro](https://kiro.dev)
[^2]: [kiro - pricing](https://kiro.dev/pricing/)