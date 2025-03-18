---
title: "このブログにhilight.jsを導入してみた"
excerpt: "記事中のコードを美しく表示するhighlight.jsの紹介と導入方法について"
coverImage: ""
date: "2025-03-13T23:05:56.000Z"
updatedAt: "2025-03-13T23:05:56.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

このブログにはコードスニペットをよく使っているが、シンプルな`<code>`タグだけでは、すべてのテキストが同じ色で表示され、コードの構造や重要な部分が分かりにくくなってしまっていた。

これを見やすく表示したいと思い何かないか探していたところ、「**highlight.js**」というライブラリがあると知り、今回このブログに導入してみることにした。

## highlight.js とは？

highlight.js[^1]は、Web ページ上のコードに構文ハイライトを適用する JavaScript ライブラリで、以下のような特徴がある。

- 190 以上のプログラミング言語に対応
- 100 以上のスタイル（テーマ）から選択可能
- 自動言語検出機能
- 軽量で高速
- どのような HTML でも動作

試しに、導入前と導入後の違いを見てみよう。

**導入前**:

```plaintext
function hello() {
  console.log("Hello, World!");
  return true;
}
```

**導入後**:

```jsx
function hello() {
  console.log("Hello, World!");
  return true;
}
```

ご覧の通りで、導入後は、キーワード、文字列、関数名などが色分けされ、コードの可読性が大幅に向上します。

## 導入方法

highlight.js を導入する手順を見ていきましょう。

このブログは Next.js のため React での導入例になりますが、他のフレームワークを利用の場合は適宜置き換えてください。

なお、CDN を利用して導入する方法もあります。ここでは割愛しますが、公式ページ[^2]の Usage をご覧ください。

### 1. パッケージのインストール

まず、必要なパッケージをインストールします。

```bash
npm install highlight.js
```

### 2. スタイルシートの追加

Next.js の`_app.js(x)`（Typescript の場合は`_app.ts(x)`）ファイルにスタイルシートをインポートします。

（Next.js のバージョンによっては読み込み先が変わる可能性があるので、適宜置き換えてください。）

```jsx
import "highlight.js/styles/github.css"; // githubテーマを使用する場合
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

好みに応じて別のテーマを選ぶこともできます。例えば、ダークテーマが好みなら以下をご利用ください。

```jsx
import "highlight.js/styles/github-dark.css";
```

その他のテーマについては、公式ページのデモ[^3]のページにいくつか種類がありますので、そちらをご確認ください。

### 3. コードブロックをハイライトする機能の実装

次にコードブロックを利用するコンポーネント内で、useEffect を利用しハイライト機能を適用します。

```jsx
// components/CodeBlock.jsx
import { useEffect } from "react";
import hljs from "highlight.js";

const CodeBlock = ({ code, language }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

export default CodeBlock;
```

これにより、該当の箇所に highlight.js が適用されるはずです。

highlight.js を導入することで、Next.js ブログのコードスニペットは見やすく、プロフェッショナルな印象になります。この記事で紹介した方法を参考に、ぜひご自身のブログに実装してみてください！

---

[^1]: [highlight.js(公式ページ)](<[https://highlightjs.org](https://highlightjs.org/)>)
[^2]: [highlight.js(Usage)](https://highlightjs.org/#usage)
[^3]: [highlight.js(Demo)](https://highlightjs.org/demo)
