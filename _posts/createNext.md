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

Next.js は、こちらの公式ページ[^1]で公開されている。

# Node.js、npm のインストール

Next.js は Node.js 製のモジュールであるため、利用するには Node.js の実行環境が必要である。

Node.js が無い場合はインストールしておくこと。公式ページ[^2]からインストールできる。

ターミナルから Node.js のバージョンを確認し、表示できるかでインストールされているかを確認する。

```shell
$ node --version
v19.0.0

$ npm --version
8.6.0
```

# 環境情報

今回使用したバージョンは以下の通り。

```txt
node: v19.0.0
npm: v8.19.2
next: v14.0.4
```

# プロジェクト作成

Next.js のプロジェクトを作成する。

プロジェクト作成には、 **create-next-app** コマンドを実行して作成する。

create-next-app コマンドが入ってない場合は npm install で入手する事。

```shell
$ npm install -g create-next-app
```

ターミナルから以下のコマンドを実行する。

—ts オプションを付けると、TypeScript を利用したプロジェクトが作成される。

```shell
$ npx create-next-app@latest --ts (プロジェクト名)
```

すると Next.js のプロジェクトが作られる。

![](/assets/posts/createNext/createNextApp.png)

---

# 開発用サーバーの起動

作成されたプロジェクトのディレクトリに移動して、`npm run dev` コマンドを打つと開発用サーバが起動される。

```shell
$ cd (作成されたプロジェクトのディレクトリ名)
$ npm run dev
```

これによりサーバが起動し、ブラウザで http://localhost:3000 を開くとサンプルページが表示される。

![](/assets/posts/createNext/nextSample.png)

その他、build コマンドでコードをビルドして.next フォルダ以下に保存でき、start コマンドでその結果をもとにサーバーを立ち上げられる事も可能である。

```shell
$ npm run build
$ npm run start
```

## プロジェクトの基本的な構成

create-next-app を実行すると Next.js プロジェクトとファイル群が作成される。

作成されるファイルの構成と意味合いは以下の通り。

| フォルダ名        | 意味                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------ |
| node_modules      | Node.js のモジュール群。`npm installするとpackage.jsonを元にインストールされる`      |
| src/app           | Next.js アプリケーションを構成する各ページのファイル群、コンポーネントなどを配置する |
| public            | 画像などの静的ファイル                                                               |
| README.md         | 説明書。各自に応じて変更する                                                         |
| package.json      | npm コマンドの定義と利用するモジュールの定義                                         |
| package-lock.json | インストールしたモジュールの情報が記載される                                         |

# 新しいページの作成方法

Next.js では src/app ディレクトリ以下にある page.tsx ファイルが一つのページに対応する。

src/app 以下にディレクトリを配置し、そこに別の page.tsx を作成することで、新しいページを作成できる。

例えば src/app/sample/page.tsx というファイルを作ってサーバ起動すると、http://localhost:3000/sample という URL でアクセスできる。

Sample.tsx

```typescript
export default function Sample() {
  return <p>Hello! Next.js!!</p>;
}
```

表示されるページ

![](/assets/posts/createNext/nextSamplePage.png)

その他にも様々な機能がありますが追々書いていきます。。

詳しくは公式ページのレファレンス[^3]もご覧ください。

---

[^1]: [Next.js(公式ページ)](https://nextjs.org/)
[^2]: [Node.js(公式ページ)](https://nodejs.org/)
[^3]: [Start building with Next.js(公式ページ)](https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app)
