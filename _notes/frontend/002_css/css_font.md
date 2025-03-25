---
title: "CSSでのフォント"
date: "2019-11-05T23:38:30.000Z"
excerpt: "CSSでのフォントの設定について"
tag: ["CSS"]
updatedAt: "2023-03-06T08:35:42.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

CSS でのフォントについて示す。

# Web フォント

CSS でフォントを指定しても、ユーザーの環境にそのフォントがインストールされていなければ使用することは基本できない。

しかし、**@font-face**という書式を使用することで、Web 上にあるフォントを利用でき、自身のブラウザに表示させることができる。

設定できる値は以下の通り。

| 値          | 意味                                   |
| :---------- | :------------------------------------- |
| font-family | 利用するフォントの名前                 |
| src         | フォントの URL。url(...)の形で指定する |

使用例として、下記の html を iframe に組み込んで表示させてみる。

(フォントは Google Fonts([https://fonts.google.com/specimen/Rowdies?sidebar.open&selection.family=Rowdies](https://fonts.google.com/specimen/Rowdies?sidebar.open&selection.family=Rowdies))から拝借しました)

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jEOqROz" data-pen-title="css-font" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/jEOqROz">
  css-font</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# font-family プロパティ

font-family プロパティは、フォントの種類を設定するプロパティである。

値にはフォントの種類名を記述する。スペース区切りで複数入力することもできる。その際は、左にあるものから優先されて使われる。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="LEYNvbp" data-pen-title="css-font-family" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/LEYNvbp">
  css-font-family</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# font-size プロパティ

font-size プロパティは、フォントサイズを設定するプロパティである。

設定できる値と意味は以下の通り。

| 値                    | 意味                                                                 |
| :-------------------- | :------------------------------------------------------------------- |
| 数値(単位 px)         | 数値に応じたフォントサイズになる                                     |
| パーセンテージ(単位%) | 親要素のフォントサイズに対するパーセンテージ分のフォントサイズになる |
| xx-small              | 小                                                                   |
| x-small               | ↑                                                                    |
| small                 | ↑                                                                    |
| medium                | 中                                                                   |
| large                 | ↓                                                                    |
| x-large               | ↓                                                                    |
| xx-large              | 大                                                                   |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="gbOryLR" data-pen-title="css-font-size" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/gbOryLR">
  css-font-size</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# font-weight プロパティ

font-weight プロパティは、フォントの太さを設定するプロパティである。

設定できる値と意味は以下の通り。

| 値      | 意味                           |
| :------ | :----------------------------- |
| bold    | 太字にする                     |
| 100     | 細                             |
| 200     | ↑                              |
| 300     | ↑                              |
| 400     | ↑                              |
| 500     | 中                             |
| 600     | ↓                              |
| 700     | ↓                              |
| 800     | ↓                              |
| 900     | 太                             |
| bolder  | 現在の太さよりも一段階太くする |
| lighter | 現在の太さよりも一段階細くする |
| normal  | 標準の太さ(400)にする          |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="NPWNmjM" data-pen-title="css-font-weight" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/NPWNmjM">
  css-font-weight</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# font-style プロパティ

font-style プロパティは、イタリックまたは斜体の書体を選択するためのプロパティである。

設定できる値と意味は以下の通り。

| 値      | 意味                                                                                                |
| :------ | :-------------------------------------------------------------------------------------------------- |
| oblique | 斜体で表示する。                                                                                    |
| italic  | イタリック体で表示する。フォントにイタリック体での表示形式がない場合は、「oblique」の時と同じになる |
| normal  | 標準のフォントで表示                                                                                |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PwozKKj" data-pen-title="css-font-style" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/PwozKKj">
  css-font-style</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# font-variant プロパティ

font-variant プロパティは、フォントをスモールキャップ（小文字を小さい大文字で表す形式）で表したい時に利用するプロパティである。

設定できる値と意味は以下の通り。

| 値         | 意味                                                                                                                             |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------- |
| normal     | 標準のフォントで表示                                                                                                             |
| small-caps | スモールキャップで表示。ただしスモールキャップが設定されていないフォントでは、単純に大文字を縮小したものを小文字として表示する。 |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MYWevvz" data-pen-title="css-font-variant" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/MYWevvz">
  css-font-variant</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# font プロパティ

font プロパティは、これまでに出た font-xx 関連のプロパティの値をまとめて指定できるプロパティである。

値はスペース区切りで複数入力する方式だが、左から以下の順番で指定するという決まりがあるので注意。

- font-weight,font-style,font-variant の値（省略可）
- font-size の値（省略不可）
- line-height の値を font-size の後にスラッシュを書いて指定（省略可）
- font-family の値（省略不可）

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="dPyXzVM" data-pen-title="css-font" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/dPyXzVM">
  css-font</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>
