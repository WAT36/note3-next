---
title: "マルチカラム"
date: "2019-11-05T23:40:30.000Z"
excerpt: "CSSでのマルチカラムの設定について"
tag: ["CSS"]
updatedAt: '2025-03-25T23:16:20.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

マルチカラムとは、ボックスの内部を複数の段に分割してできるレイアウトである。

ここでは、マルチカラムについてを述べる。

# column-count プロパティ

column-count プロパティは、何段組みするかを設定するプロパティである。

値は 1 以上の整数または auto で指定する。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WbNGXyx" data-pen-title="css-column-count" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/WbNGXyx">
  css-column-count</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# column-width プロパティ

column-width プロパティは、段の幅を指定するプロパティである。値は単位付きの数値または auto で指定する。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="raNMEoY" data-pen-title="css-column-width" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/raNMEoY">
  css-column-width</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# columns プロパティ

columns プロパティは、前述の column-count,column-width をまとめて指定できるプロパティである。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WbNGqPx" data-pen-title="css-columns" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/WbNGqPx">
  css-columns</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# column-gap プロパティ

column-gap プロパティは、段の間隔を設定するプロパティである。値は単位付きの数値を指定する。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="azbmevR" data-pen-title="css-column-gap" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/azbmevR">
  css-column-gap</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# column-rule プロパティ

段と段の間にはボーダーと同様の線を引くことができる。その線を設定するプロパティが column-rule 系のプロパティである。

このプロパティにはいくつか種類があり、以下の通りである。

| プロパティ名      | 意味                                           |
| :---------------- | :--------------------------------------------- |
| column-rule-style | 線の線種                                       |
| column-rule-color | 線の色                                         |
| column-rule-width | 線の太さ                                       |
| column-rule       | 上記のプロパティの値を空白区切りでまとめて指定 |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="yyLamVp" data-pen-title="css-column-rule" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/yyLamVp">
  css-column-rule</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# column-span プロパティ

column-span プロパティは、ボックスが段組みされている時に、指定した要素を段の中に収めず、ボックスの幅いっぱい（全ての段を跨いで）に表示させるプロパティである。

値は all(全ての段に跨いで表示)、none（段を跨いで表示させない）が指定できる。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PwoGMWN" data-pen-title="css-column-span" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/PwoGMWN">
  css-column-span</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# フレキシブルボックスレイアウト

display プロパティにおいて、値を flex と指定すると、その内部の子要素を縦、横、逆順などの順番で配置することができる。このような配置をフレキシブルボックスレイアウトという。

順番の指定は、**flex-direction**プロパティで指定できる。指定する値と意味は以下の通り。デフォルトでは row である。

| プロパティ名   | 意味           |
| :------------- | :------------- |
| row            | 横（左から右） |
| row-reverse    | 横（右から左） |
| column         | 縦（上から下） |
| column-reverse | 縦（下から上） |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="YPzpyPa" data-pen-title="css-flex-direction" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/YPzpyPa">
  css-flex-direction</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>
