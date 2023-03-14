---
title: "CSSでの背景"
date: "2019-11-05T21:38:30.000Z"
excerpt: 'CSSでの背景の設定について'
tag: ["CSS"]
updatedAt: '2023-03-03T20:07:33.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
---


CSSでの背景の設定方法についてを述べる。

# background-colorプロパティ

background-colorプロパティは背景色を設定するプロパティである。

divを使い、使用例を示す。

```
<div style="background-color:red">
background<br>
color<br>
の<br>
テスト<br>
</div>
```

表示例

<div style="background-color:red">
background<br>
color<br>
の<br>
テスト<br>
</div>
<hr>


# background-imageプロパティ

background-imageプロパティは、背景に画像を表示させるプロパティである。

値には、 **url(画像のパス)** の形で画像を指定し入力する。

CSSで利用するには、body要素に適用させる。

使用例を以下に示す。

```
<div style="background-image: url(/front-end/img_small.jpg)">
background<br>
image<br>
の<br>
テスト<br>
</div>
```

表示例

<div style="background-image: url('/assets/note/frontend/css/img_small.jpg')">
background<br>
image<br>
の<br>
テスト<br>
</div>
<hr>


# background-clipプロパティ

background-clipプロパティは、背景画像をボックスのどの領域に表示させるかを設定するプロパティである。

設定できる値は以下の通り。

|値|意味|
|:---|:---|
|border-box|ボーダー以内の領域に表示させる|
|padding-box|パディング以内の領域に表示させる|
|content-box|要素内容を表示させる領域に表示させる|

使用例

```
<style type="text/css">
    div#clip {
        width:300px; height:200px; padding:10px;
        border:dashed 3px black; 
        color:white;
        background-image:url(/assets/note/frontend/css/img_small.jpg);
        background-clip:content-box;
    }
</style>
<div id="clip" width="400" height="300">
</div>
```

表示例

<style type="text/css">
    div#clip {
        width:300px; height:200px; padding:10px;
        border:dashed 3px black; 
        color:white;
        background-image:url(/assets/note/frontend/css/img_small.jpg);
        background-clip:content-box;
    }
</style>
<div id="clip" width="400" height="300">
</div>
<hr>


# background-repeatプロパティ

background-repeatプロパティは、背景画像を繰り返して表示させるか、及びその表示のさせ方を設定するプロパティである。

設定する値は以下の通り。デフォルトではrepeatである。

|値|意味|
|:---|:---|
|repeat-x|横方向に画像を連続して表示させる|
|repeat-y|縦方向に画像を連続して表示させる|
|repeat|画像を全体に連続して表示させる|
|no-repeat|画像を１つだけ表示させる|


使用例

```
<style type="text/css">
    div.repeat {
        background-image: url(/assets/note/frontend/css/img_small.jpg);
        background-repeat: repeat-x;
    }

    h4.repeat {
        color:greenyellow
    }
</style>
<div class="repeat" width="500" height="400">
    <h4 class="repeat">background-repeatのサンプル</h1>
    <p>１行目</p>
    <p>２行目</p>
    <p>３行目</p>
    <p>４行目</p>
    <p>５行目</p>
</div>
```

表示例

<style type="text/css">
    div.repeat {
        background-image: url(/assets/note/frontend/css/img_small.jpg);
        background-repeat: repeat-x;
    }

    h4.repeat {
        color:greenyellow
    }
</style>
<div class="repeat" width="500" height="400">
    <h4 class="repeat">background-repeatのサンプル</h1>
    <p>１行目</p>
    <p>２行目</p>
    <p>３行目</p>
    <p>４行目</p>
    <p>５行目</p>
</div>
<hr>


# background-sizeプロパティ

background-sizeプロパティは、背景画像を表示するサイズを設定するプロパティである。

値は以下のキーワードか、幅・高さを示す数値２つを指定する。（数値を１つ指定した場合は幅として認識される。）デフォルトはautoである。

|値|意味|
|:---|:---|
|contain|画像の縦横比を保った状態で、画像全体が表示される最大サイズにする|
|cover|画像の縦横比を保った状態で、画像全体が表示される最小サイズにする|
|auto|画像の縦横比を保った状態|
|(数値)%|背景の表示領域に対するパーセンテージ分のサイズにする|


使用例

```
<style type="text/css">
    div.size {
        background-image: url(/assets/note/frontend/css/img_small.jpg);
        background-size: contain;
    }

    h4.size {
        color:greenyellow
    }
</style>
<div class="size" width="500" height="400">
    <h4 class="size">background-sizeのサンプル</h1>
    <p>１行目</p>
    <p>２行目</p>
    <p>３行目</p>
    <p>４行目</p>
    <p>５行目</p>
</div>
```

表示例

<style type="text/css">
    div.size {
        background-image: url(/assets/note/frontend/css/img_small.jpg);
        background-size: contain;
    }

    h4.size {
        color:greenyellow
    }
</style>
<div class="size" width="500" height="400">
    <h4 class="size">background-sizeのサンプル</h1>
    <p>１行目</p>
    <p>２行目</p>
    <p>３行目</p>
    <p>４行目</p>
    <p>５行目</p>
</div>
<hr>


# background-originプロパティ

background-originプロパティは、ボックスにおいて画像を表示させる基準となる位置を設定する要素である。

設定する値は以下の通り。

|値|意味|
|:---|:---|
|border-box|ボーダー領域の左上を基準とする|
|padding-box|パディング領域の左上を基準とする|
|content-box|要素内容を表示させる領域の左上を基準とする|

使用例

```
<style type="text/css">
    div.origin {
        width:300px; height:200px; padding:10px;
        border:dashed 3px black; 
        color:white;
        background-image:url(/assets/note/frontend/css/img_small.jpg);
        background-origin:content-box;
    }
</style>
<div class="origin" width="400" height="300">
</div>
```

表示例

<style type="text/css">
    div.origin {
        width:300px; height:200px; padding:10px;
        border:dashed 3px black; 
        color:white;
        background-image:url(/assets/note/frontend/css/img_small.jpg);
        background-origin:content-box;
    }
</style>
<div class="origin" width="400" height="300">
</div>
<hr>


# background-positionプロパティ

background-positionプロパティは、背景に画像を表示させる位置を設定するプロパティである。画像が繰り返し表示される場合には、まずその位置に画像が表示され、そこから繰り返し表示される。

設定する値は縦方向と横方向の２つで、以下の通り。

|値|意味|
|:---|:---|
|top|一番上(縦方向の0%)|
|bottom|一番下(縦方向の100%)|
|left|一番左(横方向の0%)|
|right|一番右(横方向の100%)|
|center|中央(縦・横方向の50%)|
|(パーセンテージ)|それぞれの方向に対するパーセンテージ。数値の後に%をつける|


使用例

```
<style type="text/css">
    div.position {
        background-image: url(/assets/note/frontend/css/img_small.jpg);
        background-repeat: no-repeat;
        background-position: 100% 100%;
    }

    h4.position {
        color:black
    }
</style>
<div class="position" width="500" height="400" src="/assets/note/frontend/css/img_small.jpg">
    <h4 class="position">background-positionのサンプル</h1>
    <p>１行目</p>
    <p>２行目</p>
    <p>３行目</p>
    <p>４行目</p>
    <p>５行目</p>
</div>
```

表示例

<style type="text/css">
    div.position {
        background-image: url(/assets/note/frontend/css/img_small.jpg);
        background-repeat: no-repeat;
        background-position: 100% 100%;
    }

    h4.position {
        color:black
    }
</style>
<div class="position" width="500" height="400" src="/assets/note/frontend/css/img_small.jpg">
    <h4 class="position">background-positionのサンプル</h1>
    <p>１行目</p>
    <p>２行目</p>
    <p>３行目</p>
    <p>４行目</p>
    <p>５行目</p>
</div>
<hr>


# background-attachment プロパティ

background-attachmentプロパティは、ページをスクロールしたときに背景画像も一緒にスクロールさせるか否かを設定する。


設定する値は以下の通り。

|値|意味|
|:---|:---|
|scroll|背景画像も一緒にスクロールする|
|fixed|スクロールしても背景画像を動かさない|

使用例

```
<style type="text/css">
    div.attachment {
        background-image: url(/assets/note/frontend/css/img_small.jpg);
        background-attachment: fixed;
    }

    h4.attachment {
        color:greenyellow
    }
</style>
<div class="attachment" width="500" height="200" src="/assets/note/frontend/css/img_small.jpg" scrolling="yes">
    <h4 class="attachment">background-attachmentのサンプル</h1>
    <p>１行目</p>
    <p>２行目</p>
    <p>３行目</p>
    <p>４行目</p>
    <p>５行目</p>
</div>
```

表示例

<style type="text/css">
    div.attachment {
        background-image: url(/assets/note/frontend/css/img_small.jpg);
        background-attachment: fixed;
    }

    h4.attachment {
        color:greenyellow
    }
</style>
<div class="attachment" width="500" height="200" src="/assets/note/frontend/css/img_small.jpg" scrolling="yes">
    <h4 class="attachment">background-attachmentのサンプル</h1>
    <p>１行目</p>
    <p>２行目</p>
    <p>３行目</p>
    <p>４行目</p>
    <p>５行目</p>
</div>
<hr>



# backgroundプロパティ

backgroundプロパティは、これまでに出てきた背景関連のプロパティの値をまとめて指定できるプロパティである。

一部例外はあるが、値をスペースで区切れば複数指定できる。

使用例

```
<style type="text/css">
    div.all {
        background: gray url(/assets/note/frontend/css/img_small.jpg) no-repeat fixed center;
    }

    h4.all {
        color:greenyellow
    }
</style>
<div class="all" width="500" height="400" src="/assets/note/frontend/css/img_small.jpg">
    <h4 class="all">background-attachmentのサンプル</h1>
    <p>１行目</p>
    <p>２行目</p>
    <p>３行目</p>
    <p>４行目</p>
    <p>５行目</p>
</div>
```

表示例

<style type="text/css">
    div.all {
        background: gray url(/assets/note/frontend/css/img_small.jpg) no-repeat fixed center;
    }

    h4.all {
        color:greenyellow
    }
</style>
<div class="all" width="500" height="400" src="/assets/note/frontend/css/img_small.jpg">
    <h4 class="all">background-attachmentのサンプル</h1>
    <p>１行目</p>
    <p>２行目</p>
    <p>３行目</p>
    <p>４行目</p>
    <p>５行目</p>
</div>
<hr>