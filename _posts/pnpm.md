---
title: 'pnpmについて'
excerpt: ''
coverImage: '/assets/posts/pnpm/pnpm.svg'
date: '2026-09-27T11:35:12.000Z'
updatedAt: '2026-09-27T11:35:12.000Z'
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

具体的には、ダウンロードしたパッケージをホームディレクトリの共有ストア（既定では~/.local/share/pnpm/storeなど）に1バージョンにつき1回だけ保存し、プロジェクト側のnode_modulesには、そのストアのファイルへのハードリンクが張られます。これにより、複数プロジェクトで同じバージョンのパッケージを使っていてもディスク上には実体が1つしか存在せず、npmで悩まされがちな`node_modules`の肥大化が大幅に解消されます。

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
| `npx <pkg>` | `pnpm dlx <pkg>`（一時実行）/ `pnpm exec <pkg>`（ローカルインストール済み実行） |
| `package-lock.json` | `pnpm-lock.yaml` |
| （なし／workspaces） | `pnpm-workspace.yaml` |

(応用) pnpx は非推奨になっており、代わりにpnpm exec と pnpm dlx を使います。npxに慣れている場合はこの点だけ注意してください。

なお、2026年4月にリリースされたメジャーバージョンの**pnpm 11.0**では、Node 18、19、20、21のサポートは終了し、Node.js 22以降が必要になりました。また設定ファイルの扱いも変わり、pnpm固有の設定は、プロジェクトではpnpm-workspace.yaml、グローバルでは新しい~/.config/pnpm/config.yamlに移す必要があり、package.json内のpnpmフィールドは設定として読まれなくなりました。これから新規に学ぶなら、`.npmrc`ではなく`pnpm-workspace.yaml`に設定を書く前提で覚えておくとよいでしょう。

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
rm -rf node_modules package-lock.json
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
- **`pnpm catalog`**: モノレポ内で複数パッケージが依存するバージョンを一箇所（`pnpm-workspace.yaml`）で一元管理できる機能
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