---
title: "Prettierを導入してみた"
excerpt: "コードフォーマッターについて、Prettierの導入・設定・利用方法"
coverImage: "/assets/posts/prettier/prettier-dark.png"
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

Prettier[^1]は、定められたコーディングスタイルやフォーマット規則に従うようにソースコードを自動的に整形する・修正するコードフォーマッターツールである。

JavaScript、TypeScript、CSS、HTML、JSON など、様々な言語やファイル形式に対応しており、チーム開発でのコードスタイルの統一に大きく貢献できる。他言語でのコードフォーマッターは調べたところ以下のようなものがある。

| 言語   | ツール名 |
| ------ | -------- |
| Python | black    |
| Go     | gofmt    |
| Rust   | rustfmt  |

# リントツールとの違い

前述のリントツール(ESLint)とやることが似ているように見えるが、Prettier 始めとするコードフォーマッターとリントツールは、異なる目的を持っているので以下に記載する。

- **ESLint**: コードの品質チェックを行う。潜在的なバグ、ベストプラクティス違反、非推奨機能の使用などを検出する。コーディングスタイルのルールも設定可能であるが、主目的はコード品質の向上にある。
- **Prettier**: コードの見た目（フォーマット）のみを扱う。インデント、改行、空白、最大行長などの整形を自動で行える。設定項目は少なく、チーム内での統一が容易である。

実際の開発では、Prettier と ESLint を併用することが一般的である。

言い換えれば、コードフォーマッターはコードを整形するための、リントツールはバグを検出するために利用するツールである。

# 導入方法

まずは Node.js のプロジェクト用のディレクトリを作る。

作成後に移動し、さらに Node.js プロジェクトを作成する。

```bash
mkdir lint_test
cd lint_test

npm init
```

Node.js プロジェクトを作ると package.json が作られる。

ここで、以下コマンドを実行すると、prettier のインストールが行われる。

```bash
npm install --save-dev --save-exact prettier
```

次に、prettier の設定ファイルである`.prettierrc`と`.prettierignore`ファイルを作成する。

.prettierrc は prettier を実行する際に読まれる設定ファイルで、フォーマットの際の設定を記述しておくものである。

値がない場合はデフォルトの設定が適用されるが、以下にファイルの設定例を示す。

```json
{
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": false,
  "singleQuote": true
}
```

細かい説明は省略するが、

設定できる値は公式ページ[^2]の詳細説明を参照のこと。

.prettierignore は prettier を実行する際に対象としないファイルを書き記しておくファイルである。

例えばこの.prettierignore と node_modules はフォーマット対象から外すなどする。

```
.prettierignore
node_modules
```

# 実行

例えば以下のファイル src/index.js に対し prettier を適用してみよう。

```js
const calculateTotal = (items) => {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
};

const userInfo = {
  name: "John",
  age: 30,
  email: "john@example.com",
  preferences: {
    theme: "dark",
    notifications: true,
  },
};
```

コマンドラインから実行するには以下の方法で行う。

```bash
# 特定のファイルの整形
npx prettier --write src/index.js

# ディレクトリ内のすべての対応ファイルを整形
npx prettier --write "src/**/*"
```

prettier を適用した後のファイルは以下のようになる。（例。適用ルールによって異なる）

```js
const calculateTotal = (items) => {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
};

const userInfo = {
  name: "John",
  age: 30,
  email: "john@example.com",
  preferences: {
    theme: "dark",
    notifications: true,
  },
};
```

また、実行には package.json に以下のスクリプトを追加すると便利。

```json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,scss,md}\""
  }
}
```

このようにする事で、`npm run format`と実行すると src 以下の対象全ファイルに対し prettier を実行できる。

## まとめ

Prettier の導入により、以下のメリットが得られる。

- コードフォーマットの自動化による開発効率の向上
- チーム内でのコードスタイルの統一
- レビュー時のスタイル指摘の削減

初期設定は少し手間がかかるが、一度導入すれば、その後の開発効率は大きく向上します。特にチーム開発において、Prettier の導入は、コードの一貫性を保つための強力な武器となるでしょう。

---

[^1]: [Prettier(公式ページ)](https://prettier.io/)
[^2]: [Options](https://prettier.io/docs/en/options)
