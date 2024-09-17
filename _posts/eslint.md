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

# 導入方法

まずは Node.js のプロジェクト用のディレクトリを作る。移動して Node.js プロジェクトを作る

```bash
mkdir lint_test
cd lint_test

npm init
```

Node.js プロジェクトを作ると package.json が作られる。

ここで、以下コマンドを実行すると、eslint の初期設定が行われ、インストールされる。

```bash
npm init @eslint/config@latest
```

実行するといくつか選択肢を聞かれるので、各々の環境に応じて選択する。

以下はその例である。

```bash
npm init @eslint/config@latest
@eslint/create-config: v1.3.1

✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · typescript
✔ Where does your code run? · browser
The config that you've selected requires the following dependencies:

eslint, globals, @eslint/js, typescript-eslint, eslint-plugin-react
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
☕️Installing...
```

すると、eslint.config.js（または eslint.config.mjs）が作られる。
