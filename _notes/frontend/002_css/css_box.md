---
title: "CSSでのボックス"
date: "2019-11-05T23:39:30.000Z"
excerpt: 'CSSでのボックスの設定について'
tag: ["CSS"]
updatedAt: '2023-03-07T00:21:20.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
---


CSSで扱うボックスについて。

前述した通り、HTMLでは要素内容の表示にはボックスと呼ばれる単位で表示される。

ボックスの詳細は以下の図の通り。

<img src="/assets/note/frontend/css/css_box.png">

CSSでは、ボックスの各部分の長さなどを設定することができる。

ここでは、ボックスに関連するCSSのプロパティについてを記載する。

# マージン関連のプロパティ

CSSでは、ボックスのマージンの長さを設定することができる。

そのためのプロパティは以下の通り。

|プロパティ|意味|
|:---|:---|
|margin-top|マージンの上部分|
|margin-bottom|マージンの下部分|
|margin-left|マージンの左部分|
|margin-right|マージンの右部分|
|margin|マージンの各部分(指定できる値は1~4個)|


中でも、marginプロパティは設定した値の数で、以下の通りに意味合いが変わってくる。

|値の数|適用箇所|例|
|:---|:---|:---|
|1|上下左右全て|margin 10px;|
|2|上下  左右|margin 10px 10px;|
|3|上 左右 下|margin 10px 10px 10px;|
|4|上 右 下 左|margin 10px 10px 10px 10px;|

margin関連のプロパティに設定する値は以下の通り。

|値|意味|
|:---|:---|
|数値(単位px)|pxの値が長さになる|
|数値(単位%)|要素内容を表示する領域の幅に対する比率の長さになる|
|auto|ボックスの状況から自動設定する|


使用例

```
<hr>
<p style="background-color: #66ccff; margin: 10px;">マージン上下左右10px</p>
<hr>
<p style="background-color: #66ccff; margin: 10px 20px;">マージン上下10px、左右20px</p>
<hr>
<p style="background-color: #66ccff; margin: 10px 20px 30px;">マージン上10px、左右20px、下30px</p>
<hr>
<p style="background-color: #66ccff; margin: 10px 20px 30px 40px;">マージン上10px、右20px、下30px、左40px</p>
<hr>
<p style="background-color: #66ccff; margin: auto;">マージンauto</p>
<hr>
```

表示例

<hr>
<p style="background-color: #66ccff; margin: 10px;">マージン上下左右10px</p>
<hr>
<p style="background-color: #66ccff; margin: 10px 20px;">マージン上下10px、左右20px</p>
<hr>
<p style="background-color: #66ccff; margin: 10px 20px 30px;">マージン上10px、左右20px、下30px</p>
<hr>
<p style="background-color: #66ccff; margin: 10px 20px 30px 40px;">マージン上10px、右20px、下30px、左40px</p>
<hr>
<p style="background-color: #66ccff; margin: auto;">マージンauto</p>
<hr>

# パディング関連のプロパティ

同様に、CSSではボックスのパディングの長さを設定することができる。

そのためのプロパティは以下の通り。

|プロパティ|意味|
|:---|:---|
|padding-top|パディングの上部分|
|padding-bottom|パディングの下部分|
|padding-left|パディングの左部分|
|padding-right|パディングの右部分|
|padding|パディングの各部分(指定できる値は1~4個)|

同様に、paddingプロパティは設定した値の数で、以下の通りに意味合いが変わってくる。

|値の数|適用箇所|例|
|:---|:---|:---|
|1|上下左右全て|padding 10px;|
|2|上下  左右|padding 10px 10px;|
|3|上 左右 下|padding 10px 10px 10px;|
|4|上 右 下 左|padding 10px 10px 10px 10px;|


padding関連のプロパティに設定する値は以下の通り。

|値|意味|
|:---|:---|
|数値(単位px)|pxの値が長さになる|
|数値(単位%)|要素内容を表示する領域の幅に対する比率の長さになる|


使用例

```
<hr>
<p style="background-color: #66ff99; padding: 10px;">パディング上下左右10px</p>
<hr>
<p style="background-color: #66ff99; padding: 10px 20px;">パディング上下10px、左右20px</p>
<hr>
<p style="background-color: #66ff99; padding: 10px 20px 30px;">パディング上10px、左右20px、下30px</p>
<hr>
<p style="background-color: #66ff99; padding: 10px 20px 30px 40px;">パディング上10px、右20px、下30px、左40px</p>
<hr>
```

表示例

<hr>
<p style="background-color: #66ff99; padding: 10px;">パディング上下左右10px</p>
<hr>
<p style="background-color: #66ff99; padding: 10px 20px;">パディング上下10px、左右20px</p>
<hr>
<p style="background-color: #66ff99; padding: 10px 20px 30px;">パディング上10px、左右20px、下30px</p>
<hr>
<p style="background-color: #66ff99; padding: 10px 20px 30px 40px;">パディング上10px、右20px、下30px、左40px</p>
<hr>

# ボーダー関連のプロパティ

同じように、CSSではボックスのボーダーの種類を設定することができる。

そのためのプロパティは以下の通り。

|プロパティ名|設定対象|設定する値|
|:---|:---|:---|
|border-top-style|上のボーダーの線種|solid:実線<br>double:二重線<br>dotted:点線<br>dashed:破線<br>groove:溝線<br>inset:内側が低くなるような線<br>outset:内側が高くなるような線<br>none,hidden:表示しない<br>他|
|border-bottom-style|下のボーダーの線種|〃|
|border-left-style|左のボーダーの線種|〃|
|border-right-style|右のボーダーの線種|〃|
|border-style|上下左右のボーダーの線種(値1~4個)|〃|
|border-top-width|上のボーダーの太さ|数値(単位px):数値に応じた太さ<br>thin:細い<br>medium:中くらい<br>thick:太い<br>他|
|border-bottom-width|下のボーダーの太さ|〃|
|border-left-width|左のボーダーの太さ|〃|
|border-right-width|右のボーダーの太さ|〃|
|border-width|上下左右のボーダーの太さ(値1~4個)|〃|
|border-top-color|上のボーダーの色|色を示す値|
|border-bottom-color|下のボーダーの色|〃|
|border-left-color|左のボーダーの色|〃|
|border-right-color|右のボーダーの色|〃|
|border-color|上下左右のボーダーの色(値1~4個)|〃|
|border-top|上のボーダーの線種・太さ・色|線種・太さ・色を示す値を空白区切りで指定|
|border-bottom|下のボーダーの線種・太さ・色|〃|
|border-left|左のボーダーの線種・太さ・色|〃|
|border-right|右のボーダーの線種・太さ・色|〃|
|border|上下左右のボーダーの線種・太さ・色(全てに同じ値を適用)|〃|


使用例

```html
<table style="border-style:double dotted dashed groove">
    <tr>
        <td>border-style</td>
    </tr>
</table>
<br>
<table style="border-style:double; border-width:thin medium thick">
    <tr>
        <td>border-width</td>
    </tr>
</table>
```

表示例

<table style="border-style:double dotted dashed groove">
    <tr>
        <td>border-style</td>
    </tr>
</table>
<br>
<table style="border-style:double; border-width:thin medium thick">
    <tr>
        <td>border-width</td>
    </tr>
</table>
<hr>

# ボックス関連のプロパティ

ボックス全体に関するプロパティを示す。

|値の数|適用箇所|
|:---|:---|
|box-sizing|適用箇所を示す。例として<br>content-box:要素内容を表示する領域のみ<br>border-box:ボーダー領域まで含める|
|width|ボックスの幅|
|height|ボックスの高さ|
|min-width|ボックスの最小の幅|
|min-height|ボックスの最小の高さ|
|max-width|ボックスの最大の幅|
|max-height|ボックスの最大の高さ|

使用例

```html
<p style="background-color: #66ff99;">p sample1</p>
<p style="background-color: #66ff99; width:200px">p sample2</p>
<p style="background-color: #66ff99; width:200px; height:200px">p sample3</p>
```

表示例

<hr>
<p style="background-color: #66ff99;">p sample1</p>
<p style="background-color: #66ff99; width:200px">p sample2</p>
<p style="background-color: #66ff99; width:200px; height:200px">p sample3</p>
<hr>


## border-radiusプロパティ

border-radiusプロパティは、ボックスの角を丸くするプロパティである。

|プロパティ|設定対象|
|:---|:---|
|border-top-left-radius|左上の角丸|
|border-top-right-radius|右上の角丸|
|border-bottom-right-radius|右下の角丸|
|border-bottom-left-radius|左下の角丸|
|border-radius|上下左右の角丸(値1~4個)|

値には、丸くする部分を円の1/4とした時の円弧とした時の、円の半径を単位付きの数値(px,%など)で指定する。


使用例

```html
<p style="background-color: #66ff99; height:100px; border-radius: 10px">p 全10px</p>
<p style="background-color: #66ff99; height:100px; border-radius: 10px 30px">p 左上右下10px,右上左下30px</p>
<p style="background-color: #66ff99; height:100px; border-radius: 10px 30px 50px">p 左上10px,右上左下30px,右下50px</p>
<p style="background-color: #66ff99; height:100px; border-radius: 10px 30px 50px 70px">p 左上10px,右上30px,右下50px,左下70px</p>
```

表示例

<hr>
<p style="background-color: #66ff99; height:100px; border-radius: 10px">p 全10px</p>
<p style="background-color: #66ff99; height:100px; border-radius: 10px 30px">p 左上右下10px,右上左下30px</p>
<p style="background-color: #66ff99; height:100px; border-radius: 10px 30px 50px">p 左上10px,右上左下30px,右下50px</p>
<p style="background-color: #66ff99; height:100px; border-radius: 10px 30px 50px 70px">p 左上10px,右上30px,右下50px,左下70px</p>
<hr>


## box-shadowプロパティ

|値|意味|
|:---|:---|
|数値(単位px)|2~4個まで指定でき、意味は１個目から右にずらす範囲、下にずらす範囲、ぼかす範囲、四方に拡張させる範囲を表す。|
|色を示す値|影の色を示す。|
|inset|この値を入れると、影が内側に表示される。|
|none|影を表示しない。|

使用例

```html
<p style="background-color: #66ff99; height:50px; box-shadow:10px">p 右10px</p>
<br>
<p style="background-color: #66ff99; height:50px; box-shadow:10px 10px">p 右下10px</p>
<br>
<p style="background-color: #66ff99; height:50px; box-shadow:10px 10px 10px">p 右下10px, ぼかし10px</p>
<br>
<p style="background-color: #66ff99; height:50px; box-shadow:10px 10px 10px 10px">p 右下10px, ぼかし10px, 四方10px</p>
<br>
<p style="background-color: #66ff99; height:50px; box-shadow:10px 10px 10px 10px #663399">p 右下10px, ぼかし10px, 四方10px</p>
<br>
<p style="background-color: #66ff99; height:50px; box-shadow:10px 10px 10px 10px inset">p 右下10px, ぼかし10px, 四方10px</p>
```

表示例

<p style="background-color: #66ff99; height:50px; box-shadow:10px">p 右10px</p>
<br>
<p style="background-color: #66ff99; height:50px; box-shadow:10px 10px">p 右下10px</p>
<br>
<p style="background-color: #66ff99; height:50px; box-shadow:10px 10px 10px">p 右下10px, ぼかし10px</p>
<br>
<p style="background-color: #66ff99; height:50px; box-shadow:10px 10px 10px 10px">p 右下10px, ぼかし10px, 四方10px</p>
<br>
<p style="background-color: #66ff99; height:50px; box-shadow:10px 10px 10px 10px #663399">p 右下10px, ぼかし10px, 四方10px</p>
<br>
<p style="background-color: #66ff99; height:50px; box-shadow:10px 10px 10px 10px inset">p 右下10px, ぼかし10px, 四方10px</p>
<hr>

## floatプロパティ

floatプロパティは、ボックスを左または右に寄せて配置し、後続の要素をその反対側に記載させるようにするプロパティである。

指定する値と意味は以下の通り。

|値|意味|
|:---|:---|
|left|ボックスを左側に寄せ、後続の要素を右側に配置させる|
|right|ボックスを右側に寄せ、後続の要素を左側に配置させる|
|none|ボックスを寄せない|

使用例

```
<img src="/assets/note/frontend/css/img_small.jpg" style="float:left">
<p style="background-color: #66ff99;">p要素ボックス左</p>
<p style="background-color: #66ff99;">←左に画像</p>
<br>
<br>
<br>
<img src="/assets/note/frontend/css/img_small.jpg" style="float:right">
<p style="background-color: #66ff99;">p要素ボックス右</p>
<p style="background-color: #66ff99;">右に画像→</p>
<br>
<br>
<br>
```

表示例

<img src="/assets/note/frontend/css/img_small.jpg" style="float:left">
<p style="background-color: #66ff99;">p要素ボックス左</p>
<p style="background-color: #66ff99;">←左に画像</p>
<br>
<br>
<br>
<img src="/assets/note/frontend/css/img_small.jpg" style="float:right">
<p style="background-color: #66ff99;">p要素ボックス右</p>
<p style="background-color: #66ff99;">右に画像→</p>
<br>
<br>
<br>
<hr>

## clearプロパティ

clearプロパティは、floatプロパティで寄せられたボックスの反対側に、後続の要素がくる状態を解除するプロパティである。

指定する値と意味は以下の通り。

|値|意味|
|:---|:---|
|left|直前にfloat:leftがあった時、後続の要素が右に来るという状態を解除する|
|right|直前にfloat:rightがあった時、後続の要素が左に来るという状態を解除する|
|both|直前にfloat:leftまたはright があった時、後続の要素が左右どちらかに来るという状態を解除する|
|none|float関連の解除をしない|


使用例

```
<img src="/assets/note/frontend/css/img_small.jpg" style="float:left">
<p style="background-color: #66ff99">p要素ボックス右<br>←左に画像</p>
<p style="clear:none">clearを指定しないと後続の要素も回り込みます</p>
<br>
<br>
<img src="/assets/note/frontend/css/img_small.jpg" style="float:left">
<p style="background-color: #66ff99">p要素ボックス右<br>←左に画像</p>
<p style="clear:left">clearを指定すると後続の要素は回り込みません</p>
```

表示例

<img src="/assets/note/frontend/css/img_small.jpg" style="float:left">
<p style="background-color: #66ff99">p要素ボックス右<br>←左に画像</p>
<p style="clear:none">clearを指定しないと後続の要素も回り込みます</p>
<br>
<br>
<img src="/assets/note/frontend/css/img_small.jpg" style="float:left">
<p style="background-color: #66ff99">p要素ボックス右<br>←左に画像</p>
<p style="clear:left">clearを指定すると後続の要素は回り込みません</p>
<hr>


## displayプロパティ

displayプロパティは、要素の表示形式を設定するプロパティである。

インライン要素をブロックレベル要素に、あるいはその逆などの表示をさせることができる。

|プロパティ名|設定対象|
|:---|:---|
|inline|インライン要素と同じ表示にする|
|block|ブロックレベル要素と同じ表示にする|
|list-item|リストと同じ表示にする|
|table|テーブル(table要素)と同じ表示にする|
|inline-table|インラインテーブルと同じ表示にする|
|table-row-group|tbody要素と同じ表示にする|
|table-header-group|thead要素と同じ表示にする|
|table-footer-group|tfoot要素と同じ表示にする|
|table-row|tr要素と同じ表示にする|
|table-column-group|colgroup要素と同じ表示にする|
|table-column|col要素と同じ表示にする|
|table-cell|td要素と同じ表示にする|
|table-caption|caption要素と同じ表示にする|
|ruby|ruby要素と同じ表示にする|
|ruby-base|rb要素と同じ表示にする|
|ruby-text|rt要素と同じ表示にする|
|none|ボックスが無い状態で表示する|

使用例

```html
<p style="background-color: #66ff99; display:block">ブロック1</p>
<p style="background-color: #66ff99; display:block">ブロック2</p>
<p style="background-color: #66ff99; display:block">ブロック3</p>
<p style="background-color: #66ff99; display:block">ブロック4</p>
<br>
<p style="background-color: #66ff99; display:inline">インライン1</p>
<p style="background-color: #66ff99; display:inline">インライン2</p>
<p style="background-color: #66ff99; display:inline">インライン3</p>
<p style="background-color: #66ff99; display:inline">インライン4</p>
```

表示例

<hr>
<p style="background-color: #66ff99; display:block">ブロック1</p>
<p style="background-color: #66ff99; display:block">ブロック2</p>
<p style="background-color: #66ff99; display:block">ブロック3</p>
<p style="background-color: #66ff99; display:block">ブロック4</p>
<br>
<p style="background-color: #66ff99; display:inline">インライン1</p>
<p style="background-color: #66ff99; display:inline">インライン2</p>
<p style="background-color: #66ff99; display:inline">インライン3</p>
<p style="background-color: #66ff99; display:inline">インライン4</p>
<hr>


## visibilityプロパティ

visiblityプロパティは、ボックスが透明になったかのように見えなくさせることのできるプロパティである。


指定する値と意味は以下の通り。

|値|意味|
|:---|:---|
|visible|ボックスを見える状態にする|
|hidden|ボックスを見えなくさせる|
|collapse|テーブル内の要素に指定された場合、その要素は表示されなくなる|

使用例

```
<p>下に画像３個、２個目をhiddenさせる</p>
<img src="/assets/note/frontend/css/img_small.jpg" style="display:inline">
<img src="/assets/note/frontend/css/img_small.jpg" style="display:inline; visibility:hidden">
<img src="/assets/note/frontend/css/img_small.jpg" style="display:inline">
<br>
<br>
<p>表</p>
<table style="border:none;">
    <tr>
        <td style="border:none;">0,0</td>
        <td style="border:none; visibility:collapse">1,0</td>
        <td style="border:none;">2,0</td>
    </tr>
    <tr>
        <td style="border:none; visibility:collapse">0,1</td>
        <td style="border:none;">1,1</td>
        <td style="border:none; visibility:collapse">2,1</td>
    </tr>
    <tr>
        <td style="border:none;">0,2</td>
        <td style="border:none; visibility:collapse">1,2</td>
        <td style="border:none;">2,2</td>
    </tr>
</table>
```

表示例

<p>下に画像３個、２個目をhiddenさせる</p>
<img src="/assets/note/frontend/css/img_small.jpg" style="display:inline">
<img src="/assets/note/frontend/css/img_small.jpg" style="display:inline; visibility:hidden">
<img src="/assets/note/frontend/css/img_small.jpg" style="display:inline">
<br>
<br>
<p>表</p>
<table style="border:none;">
    <tr>
        <td style="border:none;">0,0</td>
        <td style="border:none; visibility:collapse">1,0</td>
        <td style="border:none;">2,0</td>
    </tr>
    <tr>
        <td style="border:none; visibility:collapse">0,1</td>
        <td style="border:none;">1,1</td>
        <td style="border:none; visibility:collapse">2,1</td>
    </tr>
    <tr>
        <td style="border:none;">0,2</td>
        <td style="border:none; visibility:collapse">1,2</td>
        <td style="border:none;">2,2</td>
    </tr>
</table>
<hr>

## overflowプロパティ

overflowプロパティは、要素内容がボックスに入りきらなくなった時に、はみ出た部分を表示するかしないかなどの設定をするプロパティである。

指定する値と意味は以下の通り。

|値|意味|
|:---|:---|
|visible|ボックスからはみ出た部分も表示する|
|hidden|ボックスからはみ出た部分は表示しない|
|scroll|ボックスからはみ出た部分は表示しないが、スクロールによって表示できるようにする|
|auto|状況に応じてスクロール可能にする|

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

