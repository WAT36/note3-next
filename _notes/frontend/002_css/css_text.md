---
title: "CSSでのテキスト"
date: "2019-11-05T22:38:30.000Z"
excerpt: "CSSでのテキストの設定について"
tag: ["CSS"]
updatedAt: '2025-03-25T23:16:20.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

CSS でのテキストの表現方法についてを示す。

# text-shadow プロパティ

text-shadow プロパティは、テキストに影を表示させるプロパティである。

設定できる値は以下の通り。

| 値                   | 意味                                                 |
| :------------------- | :--------------------------------------------------- |
| none                 | 影を表示させない                                     |
| 色                   | 影の色                                               |
| 数値(2~3 個、単位付) | 影の表示位置(1 番目から左右、上下、ぼかし範囲の指定) |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PwoZJpr" data-pen-title="css-text-shadow" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/PwoZJpr">
  css-text-shadow</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# text-decoration 関連のプロパティ

text-decoration 系のプロパティは、文字に下線・上線・取消線を引いたり、及びその線種を指定するプロパティである。

プロパティ名・指定する値・意味は以下の通り。

| プロパティ            | 値                                                 | 意味           |
| :-------------------- | :------------------------------------------------- | :------------- |
| text-decoration-line  | underline                                          | 下線           |
| 〃                    | overline                                           | 上線           |
| 〃                    | line-through                                       | 取消線         |
| text-decoration-color | (色を示す値)                                       | 線に色を付ける |
| text-decoration-style | solid                                              | 実線           |
| 〃                    | double                                             | 二重線         |
| 〃                    | dotted                                             | 点線           |
| 〃                    | dashed                                             | 破線           |
| 〃                    | wavy                                               | 波線           |
| text-decoration       | 上記で指定する値を空白区切りで区切ってまとめて指定 |                |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="mydVBmo" data-pen-title="css-text-decoration" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/mydVBmo">
  css-text-decoration</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# word-break プロパティ

word-break プロパティは、行の折り返しの設定を行うプロパティである。

設定できる値は以下の通り。

| 値        | 意味                                         |
| :-------- | :------------------------------------------- |
| break-all | 全ての文字で折り返しが行える                 |
| keep-all  | 空白文字が連続しないところでは折り返されない |
| normal    | テキストの言語のルールに従い折り返される     |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="KwKzdWX" data-pen-title="css-word-break" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/KwKzdWX">
  css-word-break</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# hyphens プロパティ

hyphens プロパティは、ハイフネーションの設定を行うプロパティである。

ハイフネーションとは、語の途中でハイフン(-)を使って改行させる仕様のことである。

設定できる値は以下の通り。

| 値     | 意味                                                                                            |
| :----- | :---------------------------------------------------------------------------------------------- |
| manual | <code>& shy;</code>の場所でのみハイフネーションが行われる                                       |
| none   | ハイフネーションは一切行わない(<code>& shy;</code>も無視される)                                 |
| auto   | 言語に応じてブラウザが適当な箇所でハイフネーションを行う(lang 属性による言語の指定が必要となる) |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="yyLOYbp" data-pen-title="css-hyphens" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/yyLOYbp">
  css-hyphens</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# white-space プロパティ

white-space プロパティは、「連続する空白文字を１つにまとめるか」など、空白文字に関する設定を行うプロパティである。

設定できる値と意味は以下の通り。

| 値       | 意味                                                                                             |
| :------- | :----------------------------------------------------------------------------------------------- |
| normal   | 半角スペース・改行・タブを一つの半角スペースにまとめる。幅が広くなった場合、行を折り返す。       |
| nowrap   | 半角スペース・改行・タブを一つの半角スペースにまとめる。幅が広くなっても行は折り返さない。       |
| pre      | 半角スペース・改行・タブはまとめず、入力した通りに表示される。幅が広くなっても行は折り返さない。 |
| pre-wrap | 半角スペース・改行・タブはまとめず、入力した通りに表示される。幅が広くなった場合、行を折り返す。 |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jEOqbwG" data-pen-title="css-white-spaces" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/jEOqbwG">
  css-white-spaces</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# text-align プロパティ

text-align プロパティは、要素の行揃えを設定するプロパティである。

設定できる値と意味は以下の通り。

| 値      | 意味     |
| :------ | :------- |
| left    | 左揃え   |
| right   | 右揃え   |
| center  | 中央揃え |
| justify | 両端揃え |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="EaxKVvO" data-pen-title="css-text-align" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/EaxKVvO">
  css-text-align</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# vertical-align プロパティ

vertical-align プロパティは、行の中での文字の縦方向の揃え位置を設定するプロパティである。

設定できる値と意味は以下の通り。

| 値       | 意味                                           |
| :------- | :--------------------------------------------- |
| baseline | 親要素(アルファベット)のベースラインに合わせる |
| top      | 上揃え                                         |
| middle   | 中央揃え                                       |
| bottom   | 下揃え                                         |
| super    | 上付き文字の位置に揃える                       |
| sub      | 下付き文字の位置に揃える                       |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xbxVwXB" data-pen-title="css-vertical-align" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/xbxVwXB">
  css-vertical-align</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# line-height プロパティ

line-height プロパティは、行間を設定するプロパティである。

設定できる値と意味は以下の通り。

| 値             | 意味                                             |
| :------------- | :----------------------------------------------- |
| 数値(単位なし) | この数値とフォントサイズを掛けた値が行間になる   |
| 数値(単位 px)  | px の長さが行間になる                            |
| パーセンテージ | フォントサイズに対するパーセンテージが行間になる |
| normal         | ブラウザが妥当とする行間に設定する               |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="pvoyxZy" data-pen-title="css-line-height" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/pvoyxZy">
  css-line-height</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# text-indent プロパティ

text-indent プロパティは、要素の１行目のインデントを設定するプロパティである。

設定できる値と意味は以下の通り。

| 値             | 意味                             |
| :------------- | :------------------------------- |
| 数値(単位 px)  | px の値に応じてインデントされる  |
| パーセンテージ | 幅に対するパーセンテージの分だけ |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="OPJNBoe" data-pen-title="css-text-indent" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/OPJNBoe">
  css-text-indent</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# letter-spacing プロパティ

letter-spacing プロパティは、文字の間隔を設定するプロパティである。

設定できる値と意味は以下の通り。

| 値            | 意味                                |
| :------------ | :---------------------------------- |
| 数値(単位 px) | px の値に応じて文字間隔が設定される |
| normal        | 標準の間隔にする                    |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vEYGVVQ" data-pen-title="css-letter-spacing" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/vEYGVVQ">
  css-letter-spacing</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# word-spacing プロパティ

word-spacing プロパティは、単語の間隔を設定するプロパティである。

設定できる値と意味は以下の通り。

| 値            | 意味                                |
| :------------ | :---------------------------------- |
| 数値(単位 px) | px の値に応じて文字間隔が設定される |
| normal        | 標準の間隔にする                    |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="LEYNgXr" data-pen-title="css-word-spacing" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/LEYNgXr">
  css-word-spacing</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# text-transform プロパティ

text-transform プロパティは、アルファベットの大文字小文字を変換して表示させるプロパティである。

設定できる値と意味は以下の通り。

| 値         | 意味                                                   |
| :--------- | :----------------------------------------------------- |
| uppercase  | 半角アルファベットを全て大文字にする                   |
| normal     | 半角アルファベットを全て小文字にする                   |
| capitalize | 半角アルファベットの単語の先頭一文字のみを大文字にする |
| none       | 変化させない                                           |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="JojXmzv" data-pen-title="css-text-transform" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/JojXmzv">
  css-text-transform</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# direction プロパティ

direction プロパティは、テキストの表記の方向を設定するプロパティである。

設定できる値と意味は以下の通り。

| 値  | 意味               |
| :-- | :----------------- |
| ltr | 左から右に表記する |
| rtl | 右から左に表記する |

使用例は下の unicode-bidi プロパティで示す。

# unicode-bidi プロパティ

unicode-bidi プロパティは、Unicode の文字表記の方向を上書きするプロパティである。

設定できる値と意味は以下の通り。

| 値            | 意味                                                                                      |
| :------------ | :---------------------------------------------------------------------------------------- |
| normal        | 上書きしない                                                                              |
| embed         | direction プロパティで設定した値を組み込む                                                |
| bidi-override | 既存の unicode の文字表記の設定を無効にし、direction プロパティで設定した値で上書きする。 |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="VYwaRRY" data-pen-title="css-unicode-bidi" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/VYwaRRY">
  css-unicode-bidi</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>
