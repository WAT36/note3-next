---
title: "ESLintを導入してみた"
excerpt: "リントツールについて、ESLintの導入・設定・利用方法"
coverImage: "/assets/posts/eslint/eslint_logo.png"
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

ESLint[^1] とはリントツール(静的コード解析用ツール)とも言われ、主にソースコードを解析して構文エラーやスタイル違反といった、コードの品質に関する問題などを検出するためのツールである。

リントツールを利用することで、ソースコードに一貫したコードスタイルを保たせつつ、読みやすいコードが書けるようになるため保守性の向上が見込めるというメリットがある。

ESLint は、Node.js で主に利用されているリントツールである。他言語でのリントツールとしては調べたところ以下のような物がある。

| 言語   | ツール名     |
| ------ | ------------ |
| Python | pylint,black |
| CSS    | stylelint    |
| Go     | golint       |

# 環境情報

```bash
Node.js: v18.18.0
eslint: v9.10.0
```

# 導入方法

まずは Node.js のプロジェクト用のディレクトリを作る。

作成後に移動し、さらに Node.js プロジェクトを作成する。

```bash
mkdir lint_test
cd lint_test

npm init
```

Node.js プロジェクトを作ると package.json が作られる。

ここで、以下コマンドを実行すると、eslint の初期設定が行われ、インストールが行われる。

```bash
npm init @eslint/config
```

実行するといくつか選択肢を聞かれるので、各々の環境に応じて選択する。

以下はその例である。

```bash
npm init @eslint/config
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

終了後、設定ファイルである `eslint.config.js` （または `eslint.config.mjs` ）が作られる。

# 設定方法

`eslint.config.js` の中身を設定する。以下にその例を記載する。

```bash
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "no-unused-vars": "error",
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];

```

この例だと、`no-unused-vars`では宣言されているがどこにも利用されていない、不要な変数があった場合に error として出力する。
また、eslint 実行時にファイルの指定がなかった場合には、`files:` の後に書かれているファイル名に一致するものが確認対象となる。

この状態で、以下のようなコマンドを実行すると、指定したファイルに対し解析を行う。

```bash
npx eslint (ファイルのパス)
```

また、package.json に以下のようなコマンドを定義しておくと

```bash
"scripts": {
   "lint": "eslint src/",
   "lint:fix": "eslint --fix src/"
}
```

以下のコマンドを実行するだけで、src 以下全ての(config ファイルの files:で指定した内容に合致した)ファイルに対し eslint が実行される。

```bash
npm run lint
```

なお、上記の `lint:fix` のような、fix オプションをつけて実行すると、指摘箇所を自動で修正する。

# ルールについて

ESLint で設定できるルールについては、例で挙げた `no-unused-vars` 以外にも多種多様ある。

代表的なルールに関しては公式ページのルール一覧[^2]で紹介されており、設定推奨なものには ✅ がついているので、各々の環境に応じて設定してみよう。

---

[^1]: [ESLint(公式ページ)](https://eslint.org/)
[^2]: [Rules Reference - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/rules/)
