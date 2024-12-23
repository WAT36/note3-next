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

Prettier[^1] は、ソースコードを自動的に整形して、定められたコーディングスタイルやフォーマット規則に従うようにするコードフォーマッターツールである。

prettier では Node.js の代表的なコードフォーマッターとして挙げられている。また Node.js だけでなく、Typescript,HTML,CSS,JSON ファイルに対してもフォーマットを行える。他言語でのコードフォーマッターは調べたところ以下のようなものがある。

| 言語   | ツール名 |
| ------ | -------- |
| Python | black    |
| Go     | gofmt    |
| Rust   | rustfmt  |

# リントツールとの違い

前述のリントツールとやることが似ている？ように見えるが、公式ページに違いが書いてあったため引用する[^2]。

リントツールは、コードを解析してコード内のエラー、潜在的なバグ、不正な構文、非効率なパターンなどを検出するツールである。

prettier 等のコードフォーマッターは、ルール・規約に基づきインデントやスペース、改行等を揃えることでコードの**見た目やスタイルを整える**ためのツールである。

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

設定できる値は以下の公式ページを参照のこと。

https://prettier.io/docs/en/options

.prettierignore は prettier を実行する際に対象としないファイルを書き記しておくファイルである。

例えばこの.prettierignore と node_modules はフォーマット対象から外すなどする。

```
.prettierignore
node_modules
```

# 実行

まずは prettier を適用したいファイルを用意する。

ここでは例として以下のファイル index.js を利用する。

```js
var foo = { bar: "bar string", baz: 11 };
console.log(foo);
```

このファイルに対し、prettier を実行するには以下のコマンドを実行する。

```bash
npx prettier --write index.js
```

すると以下のようにファイルが整形される。（—write オプションを使うことで上書き保存される）

---

[^1]: [Prettier(公式ページ)](https://prettier.io/)
[^2]: [](https://prettier.io/docs/en/comparison)
