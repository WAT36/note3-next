---
title: "Prettierを導入してみた"
excerpt: "コードフォーマッターについて、Prettierの導入・設定・利用方法"
coverImage: ""
date: "2024-09-24T22:59:51.000Z"
updatedAt: "2024-09-24T22:59:51.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

先ほどのリントルールに加え、Node.js をやり始めてコードフォーマッターに初めて触れて関心を持ったので、これを機会にまとめておく。

# Prettier とは

Prettier は、ソースコードを自動的に整形して、定められたコーディングスタイルやフォーマット規則に従うようにするコードフォーマッターツールである。

prettier では Node.js の代表的なコードフォーマッターとして挙げられている。また Node.js だけでなく、Typescript,HTML,CSS,JSON ファイルに対してもフォーマットを行える。他言語でのコードフォーマッターは調べたところ以下のようなものがある。

| 言語   | ツール名 |
| ------ | -------- |
| Python | black    |
| Go     | gofmt    |
| Rust   | rustfmt  |
