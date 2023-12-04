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

# 必要環境

Next.js は Node.js 製のモジュールであるため、利用には Node.js の実行環境が必要である。

Node.js が無い場合はインストールしておくこと。

インストール方法についてはここでは割愛する。

ターミナルから Node.js のバージョンを確認し、表示できるかでインストールされているか確認する。

```shell
$ node --version
```

# プロジェクト作成

Next.js のプロジェクトを作成します。

プロジェクト作成には、create-next-app コマンドを実行して作成します。

create-next-app コマンドが入ってない場合は npm install でインストールしてください。

```jsx
npm install -g create-next-app
```

以下のコマンドを実行します。

—ts オプションを付けると、TypeScript を利用したプロジェクトが作成されます。

```bash
npx create-next-app@latest --ts (プロジェクト名)
```

すると Next.js のプロジェクトができます。
