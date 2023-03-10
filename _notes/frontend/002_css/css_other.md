---
title: "その他"
date: "2019-11-05T23:42:30.000Z"
excerpt: 'CSSその他の設定について'
tag: ["CSS"]
updatedAt: '2023-03-10T21:07:35.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
---


CSSについてその他、括れてない手法についてを述べる。

# グラデーション

CSSで、画像が指定可能なところにおいては、画像の場所を示すurl()の代わりに、 **linear-gradient()** または **radial-gradient()** と言う書式を使い、グラデーションを表示させることができる。

以下でその方法についてを述べる。

## linear-gradientプロパティ

linear-graientプロパティは、直線状のグラデーションを設定するプロパティである。

書式は以下の通り。

```
linear-gradient(方向,色1,色2)
```

ここで、引数の「方向」に設定する値は以下の通り。

|値|意味|
|:---|:---|
|数値(角度)|指定した角度を境としたグラデーション|
|to [top,bottom,left,right]|指定した方向へのグラデーション|


使用例

```html
<style type="text/css">
p.gradient {
    width:300px; height:300px; 
    padding:0px; margin:0px;
    background-image:linear-gradient(180deg,red,blue);
}
</style>
<p class="gradient">linear-gradientの例</p>
```


表示例

<style type="text/css">
p.gradient {
    width:300px; height:300px; 
    padding:0px; margin:0px;
    background-image:linear-gradient(180deg,red,blue);
}
</style>
<p class="gradient">linear-gradientの例</p>
<hr>


## radial-gradientプロパティ

radial-gradientプロパティは、放射状のグラデーションを設定するプロパティである。

書式は以下の通り。

```
radial-gradient(at 中心の位置,中心の色,外側の色)
```

ここで、引数の「中心の位置」に設定する値は以下の通り。

|値|意味|
|:---|:---|
|top|一番上(縦方向の0%)|
|bottom|一番下(縦方向の100%)|
|left|一番左(横方向の0%)|
|right|一番右(横方向の100%)|
|center|中央(縦・横方向の50%)|
|(パーセンテージ)|それぞれの方向に対するパーセンテージ。数値の後に%をつける|

使用例

```html
<style type="text/css">
p.radial-gradient {
    width:300px; height:300px; 
    padding:0px; margin:0px;
    background-image:radial-gradient(at bottom,blue,red);
}
</style>
<p class="radial-gradient">radial-gradientの例</p>
```

表示例

<style type="text/css">
p.radial-gradient {
    width:300px; height:300px; 
    padding:0px; margin:0px;
    background-image:radial-gradient(at bottom,blue,red);
}
</style>
<p class="radial-gradient">radial-gradientの例</p>
<hr>


# リスト関連のプロパティ

リスト関連について、紹介し切れていないプロパティについてを述べる。


## list-style-typeプロパティ

list-style-typeプロパティは、リストの行頭記号の種類を設定するプロパティである。

設定する値と意味は以下の通り。

|値|意味|
|:---|:---|
|none|行頭記号を消す|
|disc|黒丸にする|
|circle|白抜きの丸にする|
|square|四角にする|
|decimal|数字にする|
|decimal-leading-zero|先頭に0をつけた数字にする(01,02,03..)|
|lower-roman|小文字のローマ数字にする|
|upper-roman|大文字のローマ数字にする|
|lower-latin|小文字のアルファベットにする|
|upper-latin|大文字のアルファベットにする|
|lower-alpha|小文字のアルファベットにする|
|upper-alpha|大文字のアルファベットにする|
|lower-greek|小文字のギリシャ文字にする|


使用例

```html
<ul style="list-style-type:circle">
<li>その１</li>
<li>その２</li>
<li>その３</li>
</ul>
<br>
<ul style="list-style-type:lower-greek">
<li>その１</li>
<li>その２</li>
<li>その３</li>
</ul>
```


表示例

<ul style="list-style-type:circle">
<li>その１</li>
<li>その２</li>
<li>その３</li>
</ul>
<br>
<ul style="list-style-type:lower-greek">
<li>その１</li>
<li>その２</li>
<li>その３</li>
</ul>
<hr>


## list-style-image プロパティ

list-style-imageプロパティは、リストの行頭記号に表示する画像を設定するプロパティである。

設定する値と意味は以下の通り。

|値|意味|
|:---|:---|
|url(...)|画像のURLを指定し、その画像が行頭記号として表示される。|
|none|画像を行頭記号として表示させない|

使用例

```html
<style type="text/css">
ul.image {
    list-style-image: url(/front-end/list-style-image.png);
}
</style>
<ul class="image">
    <li>その１</li>
    <li>その２</li>
    <li>その３</li>
</ul>
```

表示例

<style type="text/css">
ul.image {
    list-style-image: url(/front-end/list-style-image.png);
}
</style>
<ul class="image">
    <li>その１</li>
    <li>その２</li>
    <li>その３</li>
</ul>
<hr>


## list-style-position プロパティ

list-style-positionプロパティは、行頭記号の表示位置を設定するプロパティである。

設定する値と意味は以下の通り。

|値|意味|
|:---|:---|
|outside|テキストを表示させる領域の外側に表示させる|
|inside|テキストを表示させる領域の内側に表示させる|


使用例

```html
<ul style="list-style-position:inside">
<li>その１</li>
<li>その２</li>
<li>その３</li>
</ul>
<br>
<ul style="list-style-position:outside">
<li>その１</li>
<li>その２</li>
<li>その３</li>
</ul>
```

表示例

<ul style="list-style-position:inside">
<li>その１</li>
<li>その２</li>
<li>その３</li>
</ul>
<br>
<ul style="list-style-position:outside">
<li>その１</li>
<li>その２</li>
<li>その３</li>
</ul>

## list-style プロパティ

list-styleプロパティは、前述のlist-style系のプロパティの値を空白区切りでまとめて指定できるプロパティである。


使用例

```html
<ul style="list-style:lower-greek inside">
<li>その１</li>
<li>その２</li>
<li>その３</li>
</ul>
```

表示例

<ul style="list-style:lower-greek inside">
<li>その１</li>
<li>その２</li>
<li>その３</li>
</ul>

# テーブル関連のプロパティ

テーブル関連について、紹介し切れていないプロパティについてを述べる。

## caption-sideプロパティ

caption-sideプロパティは、キャプションを表の上か下かどちらかに表示させるかを設定するプロパティである。

値はtop,bottomのいずれかを指定する。


使用例

```html
<table>
    <caption style="caption-side:bottom">キャプションbottom</caption>
    <tr>
        <td>0,0</td>
        <td>1,0</td>
    </tr>
    <tr>
        <td>0,1</td>
        <td>1,1</td>
    </tr>
</table>
```

表示例

<table>
    <caption style="caption-side:bottom">キャプションbottom</caption>
    <tr>
        <td>0,0</td>
        <td>1,0</td>
    </tr>
    <tr>
        <td>0,1</td>
        <td>1,1</td>
    </tr>
</table>
<hr>

## border-collapseプロパティ

border-collapseプロパティは、ボーダーを隣接するセルと重ねて表示するか、離して標示するかを設定するプロパティである。

値はcollapse(隣接するセルと重ねて表示)、separate(隣接するセルと離して表示)のいずれかである。

使用例

```html
<table style="border-collapse: collapse;">
    <caption>collapse</caption>
    <tr>
        <td style="border: solid 1px;">0,0</td>
        <td style="border: solid 1px;">1,0</td>
    </tr>
    <tr>
        <td style="border: solid 1px;">0,1</td>
        <td style="border: solid 1px;">1,1</td>
    </tr>
</table>
```


表示例

<table style="border-collapse: collapse;">
    <caption>collapse</caption>
    <tr>
        <td style="border: solid 1px;">0,0</td>
        <td style="border: solid 1px;">1,0</td>
    </tr>
    <tr>
        <td style="border: solid 1px;">0,1</td>
        <td style="border: solid 1px;">1,1</td>
    </tr>
</table>
<hr>

## border-spacingプロパティ

border-spacingプロパティは、テーブルにおいて隣接するセルのボーダーとボーダーの間隔を設定するプロパティである。

先述のborder-collapseプロパティの値がseparateのときに有効となり、値は単位付きの数値を指定する。


使用例

```html
<table style="border-collapse: separate;border-spacing: 2px">
    <caption>separate 2px</caption>
    <tr>
        <td style="border: solid 1px;">0,0</td>
        <td style="border: solid 1px;">1,0</td>
    </tr>
    <tr>
        <td style="border: solid 1px;">0,1</td>
        <td style="border: solid 1px;">1,1</td>
    </tr>
</table>
```


表示例

<table style="border-collapse: separate;border-spacing: 2px">
    <caption>separate 2px</caption>
    <tr>
        <td style="border: solid 1px;">0,0</td>
        <td style="border: solid 1px;">1,0</td>
    </tr>
    <tr>
        <td style="border: solid 1px;">0,1</td>
        <td style="border: solid 1px;">1,1</td>
    </tr>
</table>
<hr>

## empty-cellsプロパティ

empty-cellsプロパティは、テーブルのセルが空白の時にボーダーを表示するかしないかを設定するプロパティである。

値はshow(表示する),hide(表示しない)のいずれかを指定する。


使用例

```html
<table style="border-collapse: separate;border-spacing: 2px; empty-cells: show;">
    <caption>separate 2px</caption>
    <tr>
        <td style="border: solid 1px;">0,0</td>
        <td style="border: solid 1px;"></td>
    </tr>
    <tr>
        <td style="border: solid 1px;"></td>
        <td style="border: solid 1px;">1,1</td>
    </tr>
</table>
```


表示例

<table style="border-collapse: separate;border-spacing: 2px; empty-cells: show;">
    <caption>separate 2px</caption>
    <tr>
        <td style="border: solid 1px;">0,0</td>
        <td style="border: solid 1px;"></td>
    </tr>
    <tr>
        <td style="border: solid 1px;"></td>
        <td style="border: solid 1px;">1,1</td>
    </tr>
</table>
<hr>


# 内容を追加するプロパティ

内容を追加するプロパティについて。

## contentプロパティ

contentプロパティは、CSSでコンテンツ（テキスト・画像など）を追加するためのプロパティである。

contentプロパティでは、擬似要素:before、:afterを利用して要素の前後どちらに挿入するかを決定する。

設定する値と意味は以下の通り。

|値|意味|
|:---|:---|
|テキスト(ダブルクォートまたはシングルクォートで囲う)|入力したテキストがそのまま挿入される|
|url(...)|指定した画像が挿入される。|
|attr(...)|指定した属性で指定されている文字列が挿入される。|
|counter(...)|カウンタ変数(後述)の値が挿入される。|
|open-quote、close-quote|quotesプロパティで設定されている値が挿入される。|
|none|コンテンツを追加しない|


使用例

```html
<style type="text/css">
p.content::before {
    content:"「contentプロパティで挿入された文字です」";
}
</style>
<p class="content">ここはp要素の内容です</p>
```

表示例

<style type="text/css">
p.content::before {
    content:"「contentプロパティで挿入された文字です」";
}
</style>
<p class="content">ここはp要素の内容です</p>
<hr>

## quotesプロパティ

quotesプロパティは、q要素またはcontentプロパティで引用符を追加(open-quote,close-quote)するときにどの引用符を使うかを指定するプロパティである。

使用するには、使う引用符を半角スペースで区切ってペアで指定する。

使用例

```html
<style type="text/css">
q.quotes {
    quotes:"->->" "<-<-";
}
</style>
<q class="quotes">ここはq要素で囲まれています</q>
```

表示例

<style type="text/css">
q.quotes {
    quotes:"->->" "<-<-";
}
</style>
<q class="quotes">ここはq要素で囲まれています</q>
<hr>

## counter-resetプロパティ

counter-resetプロパティは、値をリセット(0にする)したいカウンタ変数を指定するプロパティである。

値にはカウンタとして用いる変数を指定する。

(使用例は次とまとめる)


## counter-incrementプロパティ

counter-incrementプロパティは、カウンタ変数の値を1増やすプロパティである。

値にはカウンタとして用いる変数を指定する。

使用例

```html
<style type="text/css">
body {
    counter-reset: chapter;
}

p.counter::before {
    counter-increment: chapter;
    content: counter(chapter);
}
</style>
<p class="counter">p要素1個目</p>
<p class="counter">p要素2個目</p>
<p class="counter">p要素3個目</p>
<p class="counter">p要素4個目</p>
<p class="counter">p要素5個目</p>
```

表示例

<style type="text/css">
body {
    counter-reset: chapter;
}

p.counter::before {
    counter-increment: chapter;
    content: counter(chapter);
}
</style>
<p class="counter">p要素1個目</p>
<p class="counter">p要素2個目</p>
<p class="counter">p要素3個目</p>
<p class="counter">p要素4個目</p>
<p class="counter">p要素5個目</p>
<hr>
