---
title: "CSSでのボックス"
date: "2019-11-05T23:39:30.000Z"
excerpt: "CSSでのボックスの設定について"
tag: ["CSS"]
updatedAt: "2023-03-07T00:21:20.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

CSS で扱うボックスについて。

前述した通り、HTML では要素内容の表示にはボックスと呼ばれる単位で表示される。

ボックスの詳細は以下の図の通り。

<img src="/assets/note/frontend/css/css_box.png">

CSS では、ボックスの各部分の長さなどを設定することができる。

ここでは、ボックスに関連する CSS のプロパティについてを記載する。

# マージン関連のプロパティ

CSS では、ボックスのマージンの長さを設定することができる。

そのためのプロパティは以下の通り。

| プロパティ    | 意味                                    |
| :------------ | :-------------------------------------- |
| margin-top    | マージンの上部分                        |
| margin-bottom | マージンの下部分                        |
| margin-left   | マージンの左部分                        |
| margin-right  | マージンの右部分                        |
| margin        | マージンの各部分(指定できる値は 1~4 個) |

中でも、margin プロパティは設定した値の数で、以下の通りに意味合いが変わってくる。

| 値の数 | 適用箇所     | 例                          |
| :----- | :----------- | :-------------------------- |
| 1      | 上下左右全て | margin 10px;                |
| 2      | 上下 左右    | margin 10px 10px;           |
| 3      | 上 左右 下   | margin 10px 10px 10px;      |
| 4      | 上 右 下 左  | margin 10px 10px 10px 10px; |

margin 関連のプロパティに設定する値は以下の通り。

| 値            | 意味                                               |
| :------------ | :------------------------------------------------- |
| 数値(単位 px) | px の値が長さになる                                |
| 数値(単位%)   | 要素内容を表示する領域の幅に対する比率の長さになる |
| auto          | ボックスの状況から自動設定する                     |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jEOrLZv" data-pen-title="css-box-margin" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/jEOrLZv">
  css-box-margin</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# パディング関連のプロパティ

同様に、CSS ではボックスのパディングの長さを設定することができる。

そのためのプロパティは以下の通り。

| プロパティ     | 意味                                      |
| :------------- | :---------------------------------------- |
| padding-top    | パディングの上部分                        |
| padding-bottom | パディングの下部分                        |
| padding-left   | パディングの左部分                        |
| padding-right  | パディングの右部分                        |
| padding        | パディングの各部分(指定できる値は 1~4 個) |

同様に、padding プロパティは設定した値の数で、以下の通りに意味合いが変わってくる。

| 値の数 | 適用箇所     | 例                           |
| :----- | :----------- | :--------------------------- |
| 1      | 上下左右全て | padding 10px;                |
| 2      | 上下 左右    | padding 10px 10px;           |
| 3      | 上 左右 下   | padding 10px 10px 10px;      |
| 4      | 上 右 下 左  | padding 10px 10px 10px 10px; |

padding 関連のプロパティに設定する値は以下の通り。

| 値            | 意味                                               |
| :------------ | :------------------------------------------------- |
| 数値(単位 px) | px の値が長さになる                                |
| 数値(単位%)   | 要素内容を表示する領域の幅に対する比率の長さになる |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="VYwjzXK" data-pen-title="css-box-padding" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/VYwjzXK">
  css-box-padding</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# ボーダー関連のプロパティ

同じように、CSS ではボックスのボーダーの種類を設定することができる。

そのためのプロパティは以下の通り。

| プロパティ名        | 設定対象                                               | 設定する値                                                                                                                                                                |
| :------------------ | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| border-top-style    | 上のボーダーの線種                                     | solid:実線<br>double:二重線<br>dotted:点線<br>dashed:破線<br>groove:溝線<br>inset:内側が低くなるような線<br>outset:内側が高くなるような線<br>none,hidden:表示しない<br>他 |
| border-bottom-style | 下のボーダーの線種                                     | 〃                                                                                                                                                                        |
| border-left-style   | 左のボーダーの線種                                     | 〃                                                                                                                                                                        |
| border-right-style  | 右のボーダーの線種                                     | 〃                                                                                                                                                                        |
| border-style        | 上下左右のボーダーの線種(値 1~4 個)                    | 〃                                                                                                                                                                        |
| border-top-width    | 上のボーダーの太さ                                     | 数値(単位 px):数値に応じた太さ<br>thin:細い<br>medium:中くらい<br>thick:太い<br>他                                                                                        |
| border-bottom-width | 下のボーダーの太さ                                     | 〃                                                                                                                                                                        |
| border-left-width   | 左のボーダーの太さ                                     | 〃                                                                                                                                                                        |
| border-right-width  | 右のボーダーの太さ                                     | 〃                                                                                                                                                                        |
| border-width        | 上下左右のボーダーの太さ(値 1~4 個)                    | 〃                                                                                                                                                                        |
| border-top-color    | 上のボーダーの色                                       | 色を示す値                                                                                                                                                                |
| border-bottom-color | 下のボーダーの色                                       | 〃                                                                                                                                                                        |
| border-left-color   | 左のボーダーの色                                       | 〃                                                                                                                                                                        |
| border-right-color  | 右のボーダーの色                                       | 〃                                                                                                                                                                        |
| border-color        | 上下左右のボーダーの色(値 1~4 個)                      | 〃                                                                                                                                                                        |
| border-top          | 上のボーダーの線種・太さ・色                           | 線種・太さ・色を示す値を空白区切りで指定                                                                                                                                  |
| border-bottom       | 下のボーダーの線種・太さ・色                           | 〃                                                                                                                                                                        |
| border-left         | 左のボーダーの線種・太さ・色                           | 〃                                                                                                                                                                        |
| border-right        | 右のボーダーの線種・太さ・色                           | 〃                                                                                                                                                                        |
| border              | 上下左右のボーダーの線種・太さ・色(全てに同じ値を適用) | 〃                                                                                                                                                                        |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="zxYBXBe" data-pen-title="css-box-border" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/zxYBXBe">
  css-box-border</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# ボックス関連のプロパティ

ボックス全体に関するプロパティを示す。

| 値の数     | 適用箇所                                                                                                |
| :--------- | :------------------------------------------------------------------------------------------------------ |
| box-sizing | 適用箇所を示す。例として<br>content-box:要素内容を表示する領域のみ<br>border-box:ボーダー領域まで含める |
| width      | ボックスの幅                                                                                            |
| height     | ボックスの高さ                                                                                          |
| min-width  | ボックスの最小の幅                                                                                      |
| min-height | ボックスの最小の高さ                                                                                    |
| max-width  | ボックスの最大の幅                                                                                      |
| max-height | ボックスの最大の高さ                                                                                    |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WbNxWoX" data-pen-title="css-box" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/WbNxWoX">
  css-box</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## border-radius プロパティ

border-radius プロパティは、ボックスの角を丸くするプロパティである。

| プロパティ                 | 設定対象                  |
| :------------------------- | :------------------------ |
| border-top-left-radius     | 左上の角丸                |
| border-top-right-radius    | 右上の角丸                |
| border-bottom-right-radius | 右下の角丸                |
| border-bottom-left-radius  | 左下の角丸                |
| border-radius              | 上下左右の角丸(値 1~4 個) |

値には、丸くする部分を円の 1/4 とした時の円弧とした時の、円の半径を単位付きの数値(px,%など)で指定する。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RNwROpR" data-pen-title="css-border-radius" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/RNwROpR">
  css-border-radius</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## box-shadow プロパティ

| 値            | 意味                                                                                                         |
| :------------ | :----------------------------------------------------------------------------------------------------------- |
| 数値(単位 px) | 2~4 個まで指定でき、意味は１個目から右にずらす範囲、下にずらす範囲、ぼかす範囲、四方に拡張させる範囲を表す。 |
| 色を示す値    | 影の色を示す。                                                                                               |
| inset         | この値を入れると、影が内側に表示される。                                                                     |
| none          | 影を表示しない。                                                                                             |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="azbZxJr" data-pen-title="css-box-shadow" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/azbZxJr">
  css-box-shadow</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## float プロパティ

float プロパティは、ボックスを左または右に寄せて配置し、後続の要素をその反対側に記載させるようにするプロパティである。

指定する値と意味は以下の通り。

| 値    | 意味                                               |
| :---- | :------------------------------------------------- |
| left  | ボックスを左側に寄せ、後続の要素を右側に配置させる |
| right | ボックスを右側に寄せ、後続の要素を左側に配置させる |
| none  | ボックスを寄せない                                 |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vEYKMpX" data-pen-title="css-float" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/vEYKMpX">
  css-float</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## clear プロパティ

clear プロパティは、float プロパティで寄せられたボックスの反対側に、後続の要素がくる状態を解除するプロパティである。

指定する値と意味は以下の通り。

| 値    | 意味                                                                                          |
| :---- | :-------------------------------------------------------------------------------------------- |
| left  | 直前に float:left があった時、後続の要素が右に来るという状態を解除する                        |
| right | 直前に float:right があった時、後続の要素が左に来るという状態を解除する                       |
| both  | 直前に float:left または right があった時、後続の要素が左右どちらかに来るという状態を解除する |
| none  | float 関連の解除をしない                                                                      |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="NPWRwXG" data-pen-title="css-clear" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/NPWRwXG">
  css-clear</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## display プロパティ

display プロパティは、要素の表示形式を設定するプロパティである。

インライン要素をブロックレベル要素に、あるいはその逆などの表示をさせることができる。

| プロパティ名       | 設定対象                             |
| :----------------- | :----------------------------------- |
| inline             | インライン要素と同じ表示にする       |
| block              | ブロックレベル要素と同じ表示にする   |
| list-item          | リストと同じ表示にする               |
| table              | テーブル(table 要素)と同じ表示にする |
| inline-table       | インラインテーブルと同じ表示にする   |
| table-row-group    | tbody 要素と同じ表示にする           |
| table-header-group | thead 要素と同じ表示にする           |
| table-footer-group | tfoot 要素と同じ表示にする           |
| table-row          | tr 要素と同じ表示にする              |
| table-column-group | colgroup 要素と同じ表示にする        |
| table-column       | col 要素と同じ表示にする             |
| table-cell         | td 要素と同じ表示にする              |
| table-caption      | caption 要素と同じ表示にする         |
| ruby               | ruby 要素と同じ表示にする            |
| ruby-base          | rb 要素と同じ表示にする              |
| ruby-text          | rt 要素と同じ表示にする              |
| none               | ボックスが無い状態で表示する         |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ByaLmYy" data-pen-title="css-display" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/ByaLmYy">
  css-display</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## visibility プロパティ

visiblity プロパティは、ボックスが透明になったかのように見えなくさせることのできるプロパティである。

指定する値と意味は以下の通り。

| 値       | 意味                                                         |
| :------- | :----------------------------------------------------------- |
| visible  | ボックスを見える状態にする                                   |
| hidden   | ボックスを見えなくさせる                                     |
| collapse | テーブル内の要素に指定された場合、その要素は表示されなくなる |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="emYdeME" data-pen-title="css-visibility" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/emYdeME">
  css-visibility</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## overflow プロパティ

overflow プロパティは、要素内容がボックスに入りきらなくなった時に、はみ出た部分を表示するかしないかなどの設定をするプロパティである。

指定する値と意味は以下の通り。

| 値      | 意味                                                                           |
| :------ | :----------------------------------------------------------------------------- |
| visible | ボックスからはみ出た部分も表示する                                             |
| hidden  | ボックスからはみ出た部分は表示しない                                           |
| scroll  | ボックスからはみ出た部分は表示しないが、スクロールによって表示できるようにする |
| auto    | 状況に応じてスクロール可能にする                                               |

使用例

```
<p style="background-color: #66ff99; height:100px; width:100px; overflow:visible">
あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん
</p>
<br>
<br>
<br>
<p style="background-color: #66ff99; height:100px; width:100px; overflow:hidden">
あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん
</p>
<br>
<br>
<br>
<p style="background-color: #66ff99; height:100px; width:100px; overflow:scroll">
あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん
</p>
```

表示例

<p style="background-color: #66ff99; height:100px; width:100px; overflow:visible">
あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん
</p>
<br>
<br>
<br>
<p style="background-color: #66ff99; height:100px; width:100px; overflow:hidden">
あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん
</p>
<br>
<br>
<br>
<p style="background-color: #66ff99; height:100px; width:100px; overflow:scroll">
あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん
</p>
<hr>
