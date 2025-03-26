---
title: "セクション"
date: "2019-11-04T20:34:30.000Z"
excerpt: "HTMLのセクションについて"
tag: ["HTML"]
updatedAt: '2025-03-25T23:16:20.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

セクションとは章や節といった様なもので、HTML では見出しとそれに対応する文書の部分(セクショニングコンテンツ)といった様なものである。

HTML には種類は様々だが、セクションを構成するための要素がいくつか存在する。

# 見出し

見出しに関する要素を以下に載せる。

## h1~h6 要素

h1,h2,h3,h4,h5,h6 は、見出しを構成する要素である。

h1 が一番上の階層で、その次に大きいのが h2、その次が h3、、というように続く。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="XJWgWdQ" data-pen-title="html-h1" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/XJWgWdQ">
  html-h1</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## アウトライン

HTML 文書から見出しの要素だけを抜き出し、文書内のセクションが一目でわかる様にしたものを**アウトライン**という。

例えば Qiita などでは、ページ右の部分に見出しの部分だけが表示される様になっている。これもアウトラインだと思ってくれれば良い。

(当ブログでは先代(Hugo)の時はページの右側にアウトラインが表示されるようになっていたが、現版(Gatsby)ではそのような設定がないため表示されていない。そのような設定があるとわかり次第（または自作で）対応予定である。しばしお待ちを・・)

# セクションを表す要素

以下にセクションを表す際に利用する要素を記載する。

## article 要素

article 要素は独立したセクションを表す要素である。

そのため、他のセクションの一部となっている要素は含むことはできない。

適用例としては、雑誌や新聞の記事、ブログのコメントなどがある。

記法例

```
<h1>MYブログ</h1>

<article>
    <h2>3/9 その１</h2>
    <p>(3/9の内容・・)</p>
</article>

<article>
    <h2>3/10 その１</h2>
    <p>(3/10の内容・・)</p>
</article>

```

## aside 要素

aside 要素は補足や脚注のような、そのセクションの内容からは別扱いのしたほうが良さそうなセクションを表す場合に利用する。

記法例

```
<aside>
    <h3>補足</h3>
    <p>aside要素で</p>
    <p>補足を表す</p>
</aside>
```

## nav 要素

nav 要素は、そのページがサイト内でどこに位置するかなどといった、ナビゲーションを示すセクションを表す場合に利用する。

記法例

```
<nav>
    <ul>
        <li>Top</li>
        <li>プログラミング</li>
        <li>フロントエンド</li>
    </ul>
</nav>
```

## section 要素

section 要素はこれまでに述べた３つの要素のような特別な意味は持たない、一般的なセクションを表す際に用いる要素である。

記法例

```
<section>
    <h2>セクション</h2>
        <p>111</p>
        <p>222</p>
</section>
```

# セクショニング・ルート

セクショニング・ルートとは、セクションのルートとして扱われる要素のことである。

セクショニング・ルートの下に属するセクションはそのセクショニング・ルート独自のアウトラインを持つことができる。

また、そのセクションやアウトラインはそのセクショニング・ルートの外のセクションには影響を及ぼさない。

セクショニング・ルートになる要素としては、以下の要素が挙げられている。

- body 要素
- blockquote 要素
- fieldset 要素
- figure 要素
- td 要素
- details 要素

# その他、セクションに関する要素

## header 要素

header 要素は、セクションまたはセクショニング・ルートのヘッダーであることを示す要素である。

body 要素のヘッダーとなる場合、ページ全体のヘッダーになる。

一般的にヘッダーには見出し、ナビゲーションなどを含む。（必須ではない）

```
<body>
<header>
    <h1>ヘッダー</h1>
    <nav>
        <ul>
            <li>ホーム</li>
            <li>お知らせ</li>
        </ul>
    </nav>
</header>
</body>
```

## footer 要素

footer 要素は header 要素と逆で、セクションまたはセクショニング・ルートのフッターであることを示す要素である。

header 要素の時と同様に、body 要素のフッターとなる場合はページ全体のフッターになる。

一般的にフッターには問い合わせ先や著作権情報についてを記載する。（必須ではない）

```
・・・
    <footer>
        <ul>
            <li>著作権情報</li>
            <li>お問い合わせ</li>
        </ul>
    </footer>
</body>
```

## main 要素

main 要素はその範囲がページにおけるメインコンテンツであることを示す要素である。

main 要素の内容には、そのページで固有の内容を記述する様にする。他のページでも共通して利用される様な要素(ナビゲーションや著作権情報など)はここには含めない様にする。

```
<body>

    <main>
        <article>
            <h2>記事</h2>
            ・・・
            ・・・
        </article>
    </main>

</body>
```

## address 要素

address 要素は、問い合わせ先を示す要素である。

対象となるのはその要素から最も近い body または address 要素であり、その要素の内容に対する問い合わせ先を示す。

```
<body>
・・・
    <address>
        お問い合わせ：aaa@example.com
    </address>
</body>
```
