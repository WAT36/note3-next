---
title: "ESLintを導入してみた"
excerpt: "リントツールについて、ESLintの導入・設定・利用方法"
coverImage: ""
date: "2024-09-12T22:01:56.000Z"
updatedAt: "2024-09-12T22:01:56.000Z"
tag: ["Node.js"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Node.js をやり始めて ESLint に初めて触れて関心を持ったので、これを機会にまとめておく。

# ESLint とは

ESLint とはリントツール(静的コード解析用ツール)とも言われ、主にソースコードを解析して構文エラーやスタイル違反といった、コードの品質に関する問題などを検出するためのツールである。

リントツールを利用することで、ソースコードに一貫したコードスタイルを保たせつつ、読みやすいコードが書けるようになるため保守性の向上が見込めるというメリットがある。

ESLint は、Node.js で主に利用されているリントツールである。他言語でのリントツールとしては調べたところ以下のような物がある。

| 言語   | ツール名     |
| ------ | ------------ |
| Python | pylint,black |
| CSS    | stylelint    |
| Go     | golint       |
