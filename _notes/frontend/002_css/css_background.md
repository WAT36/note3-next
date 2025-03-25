---
title: "CSSでの背景"
date: "2019-11-05T21:38:30.000Z"
excerpt: "CSSでの背景の設定について"
tag: ["CSS"]
updatedAt: "2023-03-03T20:07:33.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

CSS での背景の設定方法についてを述べる。

# background-color プロパティ

background-color プロパティは背景色を設定するプロパティである。

div を使い、使用例を示す。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="XJWmRaE" data-pen-title="css-background-color" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/XJWmRaE">
  css-background-color</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# background-image プロパティ

background-image プロパティは、背景に画像を表示させるプロパティである。

値には、 **url(画像のパス)** の形で画像を指定し入力する。

CSS で利用するには、body 要素に適用させる。

例を以下に示す。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RNwWOJJ" data-pen-title="css-background-image" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/RNwWOJJ">
  css-background-image</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# background-clip プロパティ

background-clip プロパティは、背景画像をボックスのどの領域に表示させるかを設定するプロパティである。

設定できる値は以下の通り。

| 値          | 意味                                 |
| :---------- | :----------------------------------- |
| border-box  | ボーダー以内の領域に表示させる       |
| padding-box | パディング以内の領域に表示させる     |
| content-box | 要素内容を表示させる領域に表示させる |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="QwWjPBe" data-pen-title="css-background-clip" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/QwWjPBe">
  css-background-clip</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# background-repeat プロパティ

background-repeat プロパティは、背景画像を繰り返して表示させるか、及びその表示のさせ方を設定するプロパティである。

設定する値は以下の通り。デフォルトでは repeat である。

| 値        | 意味                             |
| :-------- | :------------------------------- |
| repeat-x  | 横方向に画像を連続して表示させる |
| repeat-y  | 縦方向に画像を連続して表示させる |
| repeat    | 画像を全体に連続して表示させる   |
| no-repeat | 画像を１つだけ表示させる         |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="KwKdYGw" data-pen-title="css-background-repeat" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/KwKdYGw">
  css-background-repeat</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# background-size プロパティ

background-size プロパティは、背景画像を表示するサイズを設定するプロパティである。

値は以下のキーワードか、幅・高さを示す数値２つを指定する。（数値を１つ指定した場合は幅として認識される。）デフォルトは auto である。

| 値      | 意味                                                             |
| :------ | :--------------------------------------------------------------- |
| contain | 画像の縦横比を保った状態で、画像全体が表示される最大サイズにする |
| cover   | 画像の縦横比を保った状態で、画像全体が表示される最小サイズにする |
| auto    | 画像の縦横比を保った状態                                         |
| (数値)% | 背景の表示領域に対するパーセンテージ分のサイズにする             |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="VYwvNqx" data-pen-title="css-background-size" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/VYwvNqx">
  css-background-size</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# background-origin プロパティ

background-origin プロパティは、ボックスにおいて画像を表示させる基準となる位置を設定する要素である。

設定する値は以下の通り。

| 値          | 意味                                       |
| :---------- | :----------------------------------------- |
| border-box  | ボーダー領域の左上を基準とする             |
| padding-box | パディング領域の左上を基準とする           |
| content-box | 要素内容を表示させる領域の左上を基準とする |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="bNGVJzP" data-pen-title="css-background-origin" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/bNGVJzP">
  css-background-origin</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# background-position プロパティ

background-position プロパティは、背景に画像を表示させる位置を設定するプロパティである。画像が繰り返し表示される場合には、まずその位置に画像が表示され、そこから繰り返し表示される。

設定する値は縦方向と横方向の２つで、以下の通り。

| 値               | 意味                                                      |
| :--------------- | :-------------------------------------------------------- |
| top              | 一番上(縦方向の 0%)                                       |
| bottom           | 一番下(縦方向の 100%)                                     |
| left             | 一番左(横方向の 0%)                                       |
| right            | 一番右(横方向の 100%)                                     |
| center           | 中央(縦・横方向の 50%)                                    |
| (パーセンテージ) | それぞれの方向に対するパーセンテージ。数値の後に%をつける |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ZYEQXWB" data-pen-title="css-background-position" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/ZYEQXWB">
  css-background-position</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# background-attachment プロパティ

background-attachment プロパティは、ページをスクロールしたときに背景画像も一緒にスクロールさせるか否かを設定する。

設定する値は以下の通り。

| 値     | 意味                                 |
| :----- | :----------------------------------- |
| scroll | 背景画像も一緒にスクロールする       |
| fixed  | スクロールしても背景画像を動かさない |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="dPyGVXK" data-pen-title="css-background-attachment" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/dPyGVXK">
  css-background-attachment</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# background プロパティ

background プロパティは、これまでに出てきた背景関連のプロパティの値をまとめて指定できるプロパティである。

一部例外はあるが、値をスペースで区切れば複数指定できる。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WbNrZpv" data-pen-title="css-background" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/WbNrZpv">
  css-background</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>
