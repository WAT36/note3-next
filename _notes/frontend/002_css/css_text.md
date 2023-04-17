---
title: "CSSでのテキスト"
date: "2019-11-05T22:38:30.000Z"
excerpt: 'CSSでのテキストの設定について'
tag: ["CSS"]
updatedAt: '2023-03-03T20:07:33.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
---


CSSでのテキストの表現方法についてを示す。

# text-shadowプロパティ

text-shadowプロパティは、テキストに影を表示させるプロパティである。

設定できる値は以下の通り。

|値|意味|
|:---|:---|
|none|影を表示させない|
|色|影の色|
|数値(2~3個、単位付)|影の表示位置(1番目から左右、上下、ぼかし範囲の指定)|


使用例

```
<p style="text-shadow: 5px 5px 5px red">
テキストに影を表示させる
</p>
```

表示例

<p style="text-shadow: 5px 5px 5px red">
テキストに影を表示させる
</p>
<hr>


# text-decoration関連のプロパティ

text-decoration系のプロパティは、文字に下線・上線・取消線を引いたり、及びその線種を指定するプロパティである。

プロパティ名・指定する値・意味は以下の通り。

|プロパティ|値|意味|
|:---|:---|:---|
|text-decoration-line|underline|下線|
|〃|overline|上線|
|〃|line-through|取消線|
|text-decoration-color|(色を示す値)|線に色を付ける|
|text-decoration-style|solid|実線|
|〃|double|二重線|
|〃|dotted|点線|
|〃|dashed|破線|
|〃|wavy|波線|
|text-decoration|上記で指定する値を空白区切りで区切ってまとめて指定||


使用例

```
<p>テキストに<span style="text-decoration:underline;">下線</span>を付けてみる</p>
```

表示例

<p>テキストに<span style="text-decoration:underline;">下線</span>を付けてみる</p>
<hr>


# word-breakプロパティ

word-breakプロパティは、行の折り返しの設定を行うプロパティである。

設定できる値は以下の通り。

|値|意味|
|:---|:---|
|break-all|全ての文字で折り返しが行える|
|keep-all|空白文字が連続しないところでは折り返されない|
|normal|テキストの言語のルールに従い折り返される|



使用例

```
<p style="word-break:break-all">break-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-all</p>
<p style="word-break:keep-all" >keep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-all</p>
```

表示例

<p style="word-break:break-all">break-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-allbreak-all</p>
<p style="word-break:keep-all" >keep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-allkeep-all</p>
<hr>


# hyphensプロパティ

hyphensプロパティは、ハイフネーションの設定を行うプロパティである。

ハイフネーションとは、語の途中でハイフン(-)を使って改行させる仕様のことである。

設定できる値は以下の通り。

|値|意味|
|:---|:---|
|manual|<code>& shy;</code>の場所でのみハイフネーションが行われる|
|none|ハイフネーションは一切行わない(<code>& shy;</code>も無視される)|
|auto|言語に応じてブラウザが適当な箇所でハイフネーションを行う(lang属性による言語の指定が必要となる)|

使用例

```
<p style="hyphens:manual">au&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;to</p>
```

表示例

<p style="hyphens:manual">au&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;toau&shy;to</p>
<hr>


# white-spaceプロパティ

white-spaceプロパティは、「連続する空白文字を１つにまとめるか」など、空白文字に関する設定を行うプロパティである。

設定できる値と意味は以下の通り。

|値|意味|
|:---|:---|
|normal|半角スペース・改行・タブを一つの半角スペースにまとめる。幅が広くなった場合、行を折り返す。|
|nowrap|半角スペース・改行・タブを一つの半角スペースにまとめる。幅が広くなっても行は折り返さない。|
|pre|半角スペース・改行・タブはまとめず、入力した通りに表示される。幅が広くなっても行は折り返さない。|
|pre-wrap|半角スペース・改行・タブはまとめず、入力した通りに表示される。幅が広くなった場合、行を折り返す。|

使用例

```
<p style="white-space:normal"  >  あ    い  う  え  お  か  き  く  け  こ  </p>
<p style="white-space:pre-wrap">  あ    い  う  え  お  か  き  く  け  こ  </p>
```

表示例

<hr>
<p style="white-space:normal"  >  あ    い  う  え  お  か  き  く  け  こ  </p>
<p style="white-space:pre-wrap">  あ    い  う  え  お  か  き  く  け  こ  </p>
<hr>



# text-alignプロパティ

text-alignプロパティは、要素の行揃えを設定するプロパティである。


設定できる値と意味は以下の通り。

|値|意味|
|:---|:---|
|left|左揃え|
|right|右揃え|
|center|中央揃え|
|justify|両端揃え|

使用例

```
<p style="text-align:left"   >あいうえおかきくけこさしすせそ</p>
<p style="text-align:right"  >あいうえおかきくけこさしすせそ</p>
<p style="text-align:center" >あいうえおかきくけこさしすせそ</p>
```

表示例

<hr>
<p style="text-align:left"   >あいうえおかきくけこさしすせそ</p>
<p style="text-align:right"  >あいうえおかきくけこさしすせそ</p>
<p style="text-align:center" >あいうえおかきくけこさしすせそ</p>
<hr>


# vertical-alignプロパティ

vertical-alignプロパティは、行の中での文字の縦方向の揃え位置を設定するプロパティである。

設定できる値と意味は以下の通り。

|値|意味|
|:---|:---|
|baseline|親要素(アルファベット)のベースラインに合わせる|
|top|上揃え|
|middle|中央揃え|
|bottom|下揃え|
|super|上付き文字の位置に揃える|
|sub|下付き文字の位置に揃える|

使用例

```
<div>
<span style="font-size:30px">a</span>
<span style="font-size:10px;vertical-align:baseline">bcde</span>
<span style="font-size:10px;vertical-align:top">fghi</span>
<span style="font-size:10px;vertical-align:middle">jklm</span>
<span style="font-size:10px;vertical-align:bottom">nopq</span>
</div>
```

表示例

<div>
<span style="font-size:30px">a</span>
<span style="font-size:10px;vertical-align:baseline">bcde</span>
<span style="font-size:10px;vertical-align:top">fghi</span>
<span style="font-size:10px;vertical-align:middle">jklm</span>
<span style="font-size:10px;vertical-align:bottom">nopq</span>
</div>
<hr>


# line-heightプロパティ

line-heightプロパティは、行間を設定するプロパティである。

設定できる値と意味は以下の通り。

|値|意味|
|:---|:---|
|数値(単位なし)|この数値とフォントサイズを掛けた値が行間になる|
|数値(単位px)|pxの長さが行間になる|
|パーセンテージ|フォントサイズに対するパーセンテージが行間になる|
|normal|ブラウザが妥当とする行間に設定する|

使用例

```
<p style="line-height:100px">
あいうえお<br>
かきくけこ<br>
さしすせそ<br>
たちつてと<br>
なにぬねの<br>
</p>
```

表示例

<p style="line-height:100px">
あいうえお<br>
かきくけこ<br>
さしすせそ<br>
たちつてと<br>
なにぬねの<br>
</p>
<hr>


# text-indentプロパティ

text-indentプロパティは、要素の１行目のインデントを設定するプロパティである。

設定できる値と意味は以下の通り。

|値|意味|
|:---|:---|
|数値(単位px)|pxの値に応じてインデントされる|
|パーセンテージ|幅に対するパーセンテージの分だけ|


使用例

```
<p style="text-indent:10px">あいうえお<p>
<p style="text-indent:20px">かきくけこ<p>
<p style="text-indent:30px">さしすせそ<p>
<p style="text-indent:5%">たちつてと<p>
<p style="text-indent:10%">なにぬねの<p>
<p style="text-indent:15%">はひふへほ<p>
```

表示例

<p style="text-indent:10px">あいうえお<p>
<p style="text-indent:20px">かきくけこ<p>
<p style="text-indent:30px">さしすせそ<p>
<p style="text-indent:5%">たちつてと<p>
<p style="text-indent:10%">なにぬねの<p>
<p style="text-indent:15%">はひふへほ<p>
<hr>

# letter-spacingプロパティ

letter-spacingプロパティは、文字の間隔を設定するプロパティである。

設定できる値と意味は以下の通り。

|値|意味|
|:---|:---|
|数値(単位px)|pxの値に応じて文字間隔が設定される|
|normal|標準の間隔にする|

使用例

```
<p style="letter-spacing:10px">あいうえお<p>
<p style="letter-spacing:20px">かきくけこ<p>
```

表示例

<p style="letter-spacing:10px">あいうえお<p>
<p style="letter-spacing:20px">かきくけこ<p>
<hr>


# word-spacing プロパティ

word-spacingプロパティは、単語の間隔を設定するプロパティである。


設定できる値と意味は以下の通り。

|値|意味|
|:---|:---|
|数値(単位px)|pxの値に応じて文字間隔が設定される|
|normal|標準の間隔にする|

使用例

```
<p style="word-spacing:10px">I do my best.<p>
<p style="word-spacing:20px">I will pass HTML5 Proffesinal Certification examination.<p>
```

表示例

<p style="word-spacing:10px">I do my best.<p>
<p style="word-spacing:20px">I will pass HTML5 Proffesinal Certification examination.<p>
<hr>


# text-transformプロパティ

text-transformプロパティは、アルファベットの大文字小文字を変換して表示させるプロパティである。

設定できる値と意味は以下の通り。

|値|意味|
|:---|:---|
|uppercase|半角アルファベットを全て大文字にする|
|normal|半角アルファベットを全て小文字にする|
|capitalize|半角アルファベットの単語の先頭一文字のみを大文字にする|
|none|変化させない|

使用例

```
<p style="text-transform:uppercase">How are you?<p>
<p style="text-transform:lowercase">I do my best.<p>
<p style="text-transform:capitalize">I will pass html5 proffesinal certification examination.<p>
```

表示例

<p style="text-transform:uppercase">How are you?<p>
<p style="text-transform:lowercase">I do my best.<p>
<p style="text-transform:capitalize">I will pass html5 proffesinal certification examination.<p>
<hr>


# directionプロパティ

directionプロパティは、テキストの表記の方向を設定するプロパティである。


設定できる値と意味は以下の通り。

|値|意味|
|:---|:---|
|ltr|左から右に表記する|
|rtl|右から左に表記する|

使用例は下のunicode-bidiプロパティで示す。


# unicode-bidiプロパティ

unicode-bidiプロパティは、Unicodeの文字表記の方向を上書きするプロパティである。

設定できる値と意味は以下の通り。

|値|意味|
|:---|:---|
|normal|上書きしない|
|embed|directionプロパティで設定した値を組み込む|
|bidi-override|既存のunicodeの文字表記の設定を無効にし、directionプロパティで設定した値で上書きする。|

使用例

```
<p style="direction:ltr">How are you?<p>
<p style="direction:rtl">I do my best.<p>
<p style="direction:rtl;unicode-bidi:bidi-override">I will pass html5 proffesinal certification examination.<p>
```

表示例

<p style="direction:ltr">How are you?<p>
<p style="direction:rtl">I do my best.<p>
<p style="direction:rtl;unicode-bidi:bidi-override">I will pass html5 proffesinal certification examination.<p>
<hr>