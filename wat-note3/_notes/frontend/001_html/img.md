---
title: "画像・動画・音声"
date: "2019-11-04T23:35:30+09:00"
excerpt: 'HTMLでの画像、音声、動画について'
tag: ["HTML"]
updatedAt: '2023-02-18T12:07:04.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
---

画像・動画・音声についての要素を述べる。

# img要素

img要素は画像を表示させたい時、及びそれが利用できない時に代わりに表示させるテキストを指定する要素である。

属性がいくつかあり、それらを利用する。

|属性|意味|
|:---|:---|
|src|表示する画像の相対パスまたはアドレス|
|alt|画像が利用できない場合に代わりに使用されるテキスト(ブラウザによる)|
|width|幅(整数値)|
|height|高さ(整数値)|

使用例

```
<img src="/front-end/img.jpg" width="100" height="100" alt="宗谷岬、青空">
```

実行例

<img src="/assets/note/frontend/html/img/img.jpg" width="100" height="100" alt="宗谷岬、青空">
<hr>



# picture要素

picture要素はHTML5以降で追加された新しい要素で、複数のsource要素(後述)と一つのimg要素を取りまとめる要素である。これにより、最適なsource要素による画像、source要素が使えないブラウザではimg要素の画像が使われ、柔軟な画像の選定が行われる。

（使用例はsource要素のところを参照）

## source要素

source要素は、picture要素・video要素・audio要素の子要素として使用する要素で、複数記述、及び使用条件を指定することで、ブラウザに適した形で画像等を表示できる。

|属性|意味|
|:---|:---|
|media|画像の使用条件|
|srcset|候補画像等のパス|
|sizes|使用条件と画像の表示幅|

使用例

```
<picture>
    <source media="(min-width: 200em)" srcset="/front-end/img3.jpg" title="img3.jpg">
    <source media="(min-width: 100em)" srcset="/front-end/img2.jpg" title="img2.jpg">
    <img src="/front-end/img.jpg" width="100" height="100" alt="宗谷岬、青空">
</picture>
```

実行例（表示する画面により表示される画像が分かれる）

<picture>
    <source media="(min-width: 200em)" srcset="/assets/note/frontend/html/img/img3.jpg" title="img3.jpg">
    <source media="(min-width: 100em)" srcset="/assets/note/frontend/html/img/img2.jpg" title="img2.jpg">
    <img src="/assets/note/frontend/html/img/img.jpg" width="100" height="100" alt="宗谷岬、青空">
</picture>
<hr>



# video要素

video要素は、動画を再生するための要素である。

指定する属性は以下の通り。

|属性|意味|
|:---|:---|
|src|ファイルのアドレス・パス|
|controls|再生・停止ボタンを表示させる|
|autoplay|再生を自動で開始させる|
|loop|再生を繰り返す(ループ)|
|muted|デフォルトでミュート(音量0)にする|
|width|幅を指定する|
|height|高さを指定する|

例を以下に示す。

```
<video src="/front-end/IMG_3279.MOV.mp4" controls muted width="500" height="200" ></video>
```

実行例
<video src="/assets/note/frontend/html/img/IMG_3279.MOV.mp4" controls muted width="500" height="200" ></video>
<hr>

(ちなみにこの動画は私が学生時代に研究室の窓から外の吹雪を撮ったものである)


# audio要素

audio要素は音声を再生するための要素である。

基本的には、video要素から視覚的な内容を排除したものであり、使う属性もvideo要素とほとんど同じ。

|属性|意味|
|:---|:---|
|src|ファイルのアドレス・パス|
|controls|再生・停止ボタンを表示させる|
|autoplay|再生を自動で開始させる|
|loop|再生を繰り返す(ループ)|
|muted|デフォルトでミュート(音量0)にする|


先程の動画ファイルをaudio要素で表示させてみよう。

```
<audio src="/front-end/IMG_3279.MOV.mp4" controls ></audio>
```

実行例は以下の通り。

<audio src="/assets/note/frontend/html/img/IMG_3279.MOV.mp4" controls ></audio>
<hr>


# track要素

track要素はvideo要素やaudio要素の子要素として利用する要素で、字幕などの外部テキストトラックファイルを指定する場合に使用する要素である。

使用するテキストトラックファイルは、WebVTT形式(.vtt形式)またはTTML形式ファイルである。

指定する主な属性は以下の通り。

|属性|意味|
|:---|:---|
|src|ファイルのアドレス・パス|
|srclang|外部テキストファイルの言語|
|kind|外部テキストファイルをどのように使用するかの指定|

また、kind属性には以下の値を指定する。

|値|意味|
|:---|:---|
|subtitles|音は聞こえるが理解できない人向けの字幕、映像に重ねて表示|
|captions|音が（明瞭に）聞こえない人向けの字幕、映像に重ねて表示|
|descriptions|映像が（明瞭には）見えない場合向けの解説、合成音声で読み上げる|
|chapters|映像のチャプターのタイトル、操作により一覧を表示|
|metadata|スクリプトから利用する事を想定したメタデータ|


先程の動画ファイルを利用して実行例を示す。

```
<video src="/front-end/IMG_3279.MOV.mp4" controls muted width="500" height="200" >
    <track default kind="captions"
           srclang="ja"
           src="/front-end/track.vtt">
</video>
```

ちなみに字幕として利用するvttファイル(track.vtt)は以下の通り。

```
WEBVTT

00:00:00.000 --> 00:00:15.000
これは字幕です。15秒まで表示されます。

00:00:15.000 --> 00:00:30.000
雪が降ってます。
```

表示例（使用環境により、表示されない場合もあります・・）

<video src="/assets/note/frontend/html/img/IMG_3279.MOV.mp4" controls muted width="500" height="200" >
    <track default kind="captions"
           srclang="ja"
           src="/assets/note/frontend/html/img/track.vtt">
</video>
<hr>


# embed要素

embed要素は、動画や音声などをプラグインを使って組み込む際に使う要素である。

src属性で外部コンテンツを読み込み、ブラウザに追加インストールされたプラグインでコンテンツを利用する。

よく使われるものとしては、.swfファイル(Flash)、.mpgファイル(MPEG)など。

|属性|意味|
|:---|:---|
|src|組み込むファイルのパス|
|type|組み込むデータの種類|
|width|幅を指定する|
|height|高さを指定する|


# map要素

一つの画像に複数のリンクを設定することをイメージマップという。map要素はこのイメージマップを設定する時に使用する要素である。

具体的に画像のどの部分をどのリンクに対応させるかは、map要素の子要素として使う後述のarea要素で指定する。

map要素のname属性でイメージマップに名前を定義し、画像を定義しているimg要素の**usemap**属性でその名前を指定するとイメージマップを画像に適用できる。


## area要素

area要素は、イメージマップにおいて指定した領域を指定したリンク先に紐付ける要素である。

使用する主な属性は以下の通り。

|属性|意味|
|:---|:---|
|coords|領域の座標|
|shape|領域の形状|
|href|リンク先のアドレス|

ここで、shape属性で指定できる値は決まっており、以下の通りである。また、それに応じてcoords属性で指定する値も変わってくる。


|値|図形|coords属性に指定する値|
|:---|:---|:---|
|rect|長方形|左上のx座標,左上のy座標,右下のx座標,右下のy座標|
|circle|円|円の中心のx座標,円の中心のy座標,半径|
|poly|多角形|各座標をx座標、y座標の順に指定|
|default|画像全体|(指定しない)|

使用例

```
<img src="/front-end/area.png" usemap="#top" width="100" height="100">

<map name="top">
    <area href="https://wat36.github.io/note2-gatsby/" shape="rect" coords="0,0,100,50"></area>
    <area href="https://github.com/WAT36" shape="rect" coords="0,50,100,100"></area>
</map>
```

表示例（画像の上半分がこのブログのトップ、下半分は私のGithubへのリンク）

<img src="/assets/note/frontend/html/img/area.png" usemap="#top" width="100" height="100">

<map name="top">
    <area href="https://wat36.github.io/note2-gatsby/" shape="rect" coords="0,0,100,50"></area>
    <area href="https://github.com/WAT36" shape="rect" coords="0,50,100,100"></area>
</map>
<hr>


# object要素

object要素は、画像や音声の他、様々な形式の外部データを組み込むための要素である。

|属性|意味|
|:---|:---|
|data|組み込むデータのアドレス|
|type|組み込むデータの種類|
|width|幅を指定する|
|height|高さを指定する|

## param要素

param要素は、object要素における任意のパラメータ(属性)を指定する要素である。

object要素内では他の要素よりも前に配置させる。

|属性|意味|
|:---|:---|
|name|パラメータ名|
|value|パラメータの値|
