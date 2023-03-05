---
title: "CSSでのフォント"
date: "2019-11-05T23:38:30.000Z"
excerpt: 'CSSでのフォントの設定について'
tag: ["CSS"]
updatedAt: '2023-03-06T08:35:42.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
---


CSSでのフォントについて示す。

# Webフォント

CSSでフォントを指定しても、ユーザーの環境にそのフォントがインストールされていなければ使用することは基本できない。

しかし、**@font-face**という書式を使用することで、Web上にあるフォントを利用でき、自身のブラウザに表示させることができる。

設定できる値は以下の通り。

|値|意味|
|:---|:---|
|font-family|利用するフォントの名前|
|src|フォントのURL。url(...)の形で指定する|



使用例として、下記のhtmlをiframeに組み込んで表示させてみる。

(フォントはGoogle Fonts([https://fonts.google.com/specimen/Rowdies?sidebar.open&selection.family=Rowdies](https://fonts.google.com/specimen/Rowdies?sidebar.open&selection.family=Rowdies))から拝借しました)


使用例

```
<style>
    @font-face {
        font-family: Rowdies;
        src: url(/front-end/Rowdies-Regular.ttf)
    }

    p#font-face {
        font-family: Rowdies
    }
</style>
<p id="font-face">
The sample of font-face.
</p>
```

表示例

<style>
    @font-face {
        font-family: Rowdies;
        src: url(/front-end/Rowdies-Regular.ttf)
    }

    p#font-face {
        font-family: Rowdies
    }
</style>
<p id="font-face">
The sample of font-face.
</p>
<hr>



# font-familyプロパティ

font-familyプロパティは、フォントの種類を設定するプロパティである。

値にはフォントの種類名を記述する。スペース区切りで複数入力することもできる。その際は、左にあるものから優先されて使われる。


使用例

```
<p style="font-family:serif;">The example of font 1</p>
<p style="font-family:cursive;">The example of font 2</p>
```

表示例

<p style="font-family:serif;">The example of font 1</p>
<p style="font-family:cursive;">The example of font 2</p>
<hr>


# font-sizeプロパティ

font-sizeプロパティは、フォントサイズを設定するプロパティである。

設定できる値と意味は以下の通り。

|値|意味|
|:---|:---|
|数値(単位px)|数値に応じたフォントサイズになる|
|パーセンテージ(単位%)|親要素のフォントサイズに対するパーセンテージ分のフォントサイズになる|
|xx-small|小|
|x-small|↑|
|small|↑|
|medium|中|
|large|↓|
|x-large|↓|
|xx-large|大|

使用例

```
<p style="font-size:xx-small;">xx-small</p>
<p style="font-size:medium;">medium</p>
<p style="font-size:xx-large;">xx-large</p>
```

表示例

<p style="font-size:xx-small;">xx-small</p>
<p style="font-size:medium;">medium</p>
<p style="font-size:xx-large;">xx-large</p>
<hr>


# font-weightプロパティ

font-weightプロパティは、フォントの太さを設定するプロパティである。

設定できる値と意味は以下の通り。

|値|意味|
|:---|:---|
|bold|太字にする|
|100|細|
|200|↑|
|300|↑|
|400|↑|
|500|中|
|600|↓|
|700|↓|
|800|↓|
|900|太|
|bolder|現在の太さよりも一段階太くする|
|lighter|現在の太さよりも一段階細くする|
|normal|標準の太さ(400)にする|


使用例

```
<p style="font-weight:100;">font-weight:100</p>
<p style="font-weight:300;">font-weight:300</p>
<p style="font-weight:500;">font-weight:500</p>
<p style="font-weight:700;">font-weight:700</p>
<p style="font-weight:900;">font-weight:900</p>
```

表示例

<p style="font-weight:100;">font-weight:100</p>
<p style="font-weight:300;">font-weight:300</p>
<p style="font-weight:500;">font-weight:500</p>
<p style="font-weight:700;">font-weight:700</p>
<p style="font-weight:900;">font-weight:900</p>
<hr>


# font-styleプロパティ


font-styleプロパティは、イタリックまたは斜体の書体を選択するためのプロパティである。

設定できる値と意味は以下の通り。

|値|意味|
|:---|:---|
|oblique|斜体で表示する。|
|italic|イタリック体で表示する。フォントにイタリック体での表示形式がない場合は、「oblique」の時と同じになる|
|normal|標準のフォントで表示|


使用例

```
<p style="font-style:oblique;">oblique</p>
<p style="font-style:italic ;">italic</p>
```

表示例

<p style="font-style:oblique;">oblique</p>
<p style="font-style:italic ;">italic</p>
<hr>


# font-variantプロパティ

font-variantプロパティは、フォントをスモールキャップ（小文字を小さい大文字で表す形式）で表したい時に利用するプロパティである。

設定できる値と意味は以下の通り。

|値|意味|
|:---|:---|
|normal|標準のフォントで表示|
|small-caps|スモールキャップで表示。ただしスモールキャップが設定されていないフォントでは、単純に大文字を縮小したものを小文字として表示する。|

使用例

```
<p style="font-variant:normal    ;">ABCDEFGhijklmn</p>
<p style="font-variant:small-caps;">ABCDEFGhijklmn</p>
```

表示例

<p style="font-variant:normal    ;">ABCDEFGhijklmn</p>
<p style="font-variant:small-caps;">ABCDEFGhijklmn</p>
<hr>


# fontプロパティ

fontプロパティは、これまでに出たfont-xx関連のプロパティの値をまとめて指定できるプロパティである。

値はスペース区切りで複数入力する方式だが、左から以下の順番で指定するという決まりがあるので注意。

- font-weight,font-style,font-variantの値（省略可）
- font-sizeの値（省略不可）
- line-heightの値をfont-sizeの後にスラッシュを書いて指定（省略可）
- font-familyの値（省略不可）

使用例

```
<p style="font: oblique xx-large cursive;">ABCDEFGhijklmn</p>
<p style="font: 900 small-caps medium serif;">ABCDEFGhijklmn</p>
```

表示例

<p style="font: oblique xx-large cursive;">ABCDEFGhijklmn</p>
<p style="font: 900 small-caps medium serif;">ABCDEFGhijklmn</p>
<hr>
