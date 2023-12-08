---
title: "Next.jsの始め方"
excerpt: "Next.jsプロジェクトの作成方法について"
coverImage: "/assets/blog/firstPost/nextjs-logo.png"
date: "2023-12-04T21:41:50.000Z"
updatedAt: "2023-12-04T21:41:50.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: "/assets/blog/firstPost/nextjs-logo.png"
---

この３代目ブログは Next.js で作られているのだが、一応記録として Next.js プロジェクトを作る方法についてを書き留めておくことにした。

# Next.js とは

まず最初に Next.js とは何かについて。

Next.js は、React をベースに作られたオープンソースの Web アプリケーションフレームワークである。静的 Web サイト生成やサーバーサイドレンダリング（表示する Web ページの内容をサーバー側で生成してユーザーに送る手法）などの機能がある。

Next.js は、以下のサイトで公開されている。

https://nextjs.org/

# Node.js、npm のインストール

Next.js は Node.js 製のモジュールであるため、利用には Node.js の実行環境が必要である。

Node.js が無い場合はインストールしておくこと。公式ページ[^1]からインストールできます。

ターミナルから Node.js のバージョンを確認し、表示できるかでインストールされているか確認します。

```shell
$ node --version
v19.0.0

$ npm --version
8.6.0
```

# プロジェクト作成

Next.js のプロジェクトを作成します。

プロジェクト作成には、create-next-app コマンドを実行して作成します。

create-next-app コマンドが入ってない場合は npm install で入手してください。

```shell
$ npm install -g create-next-app
```

ターミナルから以下のコマンドを実行します。

—ts オプションを付けると、TypeScript を利用したプロジェクトが作成されます。

```bash
npx create-next-app@latest --ts (プロジェクト名)
```

すると Next.js のプロジェクトができます。

![](/assets/posts/createNext/createNextApp.png)

---

[^1]: [Node.js(公式ページ)](https://nodejs.org/)

# 開発用サーバーの起動

作成されたプロジェクトのディレクトリに移動して

dev コマンドを打つと開発用サーバが起動します

```shell
$ cd (作成されたプロジェクトのディレクトリ名)
$ npm run dev
```

これによりサーバが起動し、ブラウザで http://localhost:3000 を開くとサンプルページが出ます

![](/assets/posts/createNext/nextSample.png)

その他、build コマンドでコードをビルドして.next 以下に保存でき、start コマンドでその結果をもとにサーバーを立ち上げられる事も可能です。

```shell
$ npm run build
$ npm run start
```

## プロジェクトの基本的な構成

create-next-app を実行すると Next.js プロジェクトとファイル群が作成されます。

作成されるファイルの構成と意味合いは以下の通りです。

| フォルダ名        | 意味                                                                            |
| ----------------- | ------------------------------------------------------------------------------- |
| node_modules      | Node.js のモジュール群。`npm installするとpackage.jsonを元にインストールされる` |
| pages             | 各ページのファイル群、コンポーネントなど                                        |
| public            | 画像などの静的ファイル                                                          |
| styles            | CSS などスタイルシート                                                          |
| README.md         | 説明書。各自に応じて変更                                                        |
| package.json      | npm コマンドの定義と利用するモジュールの定義                                    |
| package-lock.json | インストールしたモジュールの情報が記載される                                    |

# 新しいページの作成方法

Next.js では pages ディレクトリ以下にある ts ファイル一つが一つのページに対応します。

例えば pages/sample.tsx というファイルを作ってサーバ起動すると、0.0.0.0:3000/sample という URL でアクセスできます。

ファイル内部でコンポーネントの他に実装する関数やその関数の返す値によって、レンダリング手法が変わってきます。どのようなレンダリング手法が使われたかはビルド時の結果でわかります。

Sample.tsx

```typescript
export default function Sample() {
  return <p>Hello! Next.js!!</p>;
}
```
