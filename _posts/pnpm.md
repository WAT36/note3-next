---
title: "pnpmについて"
excerpt: "pnpmの格納・参照の仕組み、npmとのコマンド対応、導入ハンズオンなど"
coverImage: '/assets/posts/pnpm/pnpm.svg'
date: '2026-09-29T23:47:35.000Z'
updatedAt: '2026-09-29T23:47:35.000Z'
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
ogImage:
  url: ''
---

npmで長年開発してきた人が「pnpmに乗り換えてみたい」「業務で使うことになった」というケースは増えています。本記事はNode.js/npmの基礎は理解している前提で、pnpm特有の仕組みとコマンド対応、そして最小限のハンズオンを紹介します。

# pnpmとは何か

pnpm（Performant npm）は、npmやYarnと同じ`package.json`・`node_modules`の世界で動作しつつ、**依存関係の格納方法と参照方法**が根本的に異なるパッケージマネージャです。pnpmは「Performant npm」を語源とする、Node.js用のパッケージマネージャで、npmやyarnと同じpackage.json・node_modulesの世界で動きますが、依存の格納方法と参照方法が根本から違います。

pnpmを特徴づけているのは大きく3点です。

1. **コンテンツアドレスストア + ハードリンク**による重複排除
2. **非フラットなnode_modules**による依存の明示性（＝ファントム依存の防止）
3. 依存の解決・取得・リンクを並列化した高速化

具体的には、ダウンロードしたパッケージは「コンテンツアドレスストア」に保存され、プロジェクトの node_modules からはそのストア内のファイルへリンク（ハードリンクやシンボリックリンク／Windowsではジャンクション等）されます。ストアの実際の場所は OS と設定（XDG vars や環境変数 PNPM_STORE_PATH）に依存します。実際のパスは `pnpm store path` で確認できます。

もう一つの重要な違いが「ファントム依存の防止」です。npmはフラットな`node_modules`構造のため、`package.json`に書いていないパッケージ（依存の依存）が誤って`require`できてしまうことがあります。pnpmはシンボリックリンクを使った階層構造でこれを防ぎ、「宣言していないパッケージは使えない」設計になっています。

# npmとのコマンド対応表

まずは手に馴染んでいるnpmコマンドとの対応を押さえましょう。

| npm | pnpm |
|---|---|
| `npm install` | `pnpm install`（`pnpm i`） |
| `npm install <pkg>` | `pnpm add <pkg>` |
| `npm install -D <pkg>` | `pnpm add -D <pkg>` |
| `npm install -g <pkg>` | `pnpm add -g <pkg>` |
| `npm uninstall <pkg>` | `pnpm remove <pkg>` |
| `npm update` | `pnpm update`（`pnpm up`） |
| `npm run build` | `pnpm run build`（`pnpm build`でも可） |
| `package-lock.json` | `pnpm-lock.yaml` |
| （なし／workspaces） | `pnpm-workspace.yaml` |


※ pnpm のバージョンは `pnpm --version`（`pnpm -v`）で確認できます。pnpm が動作する Node.js の最小要件は pnpm のリリースノートや公式ドキュメントに記載されているため、実際の互換性を確認するにはドキュメントページを参照してください。ローカルの Node.js バージョンは `node --version` で確認し、pnpm の要求バージョンと照合してください。

# ハンズオン：pnpmを触ってみる

## インストール

npmでグローバルインストールする場合は次の通りです。

```bash
npm install -g pnpm
```

インストール確認

```bash
pnpm --version
```

## 既存のnpmプロジェクトで試す

手元に`package-lock.json`のあるnpmプロジェクトがあれば、そのままpnpmでインストールし直してみましょう。

```bash
cd your-npm-project
# 既存のlockfileをpnpm-lock.yamlへ変換（推奨）
pnpm import

# 既存の node_modules を削除（Unix/macOSの場合）
rm -rf node_modules

# 依存をインストール
pnpm install
```

`pnpm-lock.yaml`が新しく生成されます。以降のインストール・スクリプト実行はnpmとほぼ同じ感覚で行えます。

```bash
pnpm add lodash
pnpm add -D typescript
pnpm run build
pnpm test
```

## ストアの場所を確認する

コンテンツアドレスストアが実際にどこにあるか確認してみましょう。

```bash
pnpm store path
```

同じマシン内の別プロジェクトで同じバージョンの`lodash`をインストールしても、このストアの実体を再利用（ハードリンク）するため、2回目以降のインストールが高速になることを体感できます。

## モノレポ（pnpm workspace）を組んでみる

pnpmの代表的な強みが**workspace機能**によるモノレポ管理です。簡単な構成を作ってみます。

```bash
mkdir pnpm-workspace-demo && cd pnpm-workspace-demo
mkdir -p packages/ui packages/web
```

ルートに`pnpm-workspace.yaml`を作成します。

```yaml
# pnpm-workspace.yaml
packages:
  - "packages/*"
```

ルートの`package.json`

```json
{
  "name": "pnpm-workspace-demo",
  "private": true,
  "scripts": {
    "build": "pnpm -r run build"
  }
}
```

`packages/ui/package.json`（社内共有ライブラリ想定）

```json
{
  "name": "ui",
  "version": "1.0.0",
  "main": "index.js"
}
```

`packages/web`から`ui`パッケージをワークスペース内の依存として参照します。

```bash
cd packages/web
pnpm add ui@workspace:*
```

これで`packages/web/package.json`の依存に`"ui": "workspace:*"`が追加され、`ui`はnpm registryからではなくローカルの`packages/ui`にシンボリックリンクされます。workspace機能はnpm / yarnでも提供されており、それらでも適用できる内容が多いため、既存のnpm workspacesの知識もある程度活かせます。

全パッケージへの一括実行は`--filter`か`-r`（recursive）を使います。

```bash
# ルートから全パッケージのbuildスクリプトを実行
pnpm -r run build

# 特定パッケージだけに絞って実行
pnpm --filter ui run build
```

## 一時的にツールを実行する（npx相当）

```bash
pnpm dlx create-vite my-app
```

ローカルの`devDependencies`にインストール済みのCLIを実行したい場合は`pnpm exec`を使います。

```bash
pnpm exec eslint .
```

# さらに知っておくと便利な機能

- **`pnpm patch`**: 依存パッケージのソースをその場で修正し、パッチとして固定できる機能。緊急のバグ修正や脆弱性対応に有効
- **`--frozen-lockfile`**: CI環境で`pnpm-lock.yaml`と`package.json`の不整合を検知して失敗させるオプション（npmの`npm ci`に相当）

```bash
# CI用インストール（lockfileと不整合があれば失敗する）
pnpm install --frozen-lockfile
```

# まとめ：最初に押さえておくべき3点

1. `node_modules`の構造がnpmと異なり、**ストア＋ハードリンク**でディスクを節約しつつファントム依存を防止する
2. コマンド体系はnpmとほぼ1対1対応（`install`→`add`が主な違い）で、学習コストは低い
3. **workspace機能**がモノレポ運用の主戦力。`pnpm-workspace.yaml`と`--filter`/`-r`を覚えれば十分戦える

普段npmで書いているスクリプトやCIの多くは、コマンドを`pnpm`に置き換えるだけでほぼそのまま動きます。まずは既存プロジェクトの`node_modules`を一度pnpmで入れ直し、ディスク使用量とインストール速度の違いを体感してみるのがおすすめです。