---
title: "画像・動画・音声"
date: "2019-11-04T23:35:30+09:00"
excerpt: "HTMLでの画像、音声、動画について"
tag: ["HTML"]
updatedAt: '2025-03-25T23:16:20.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

画像・動画・音声についての要素を述べる。

# img 要素

img 要素は画像を表示させたい時、及びそれが利用できない時に代わりに表示させるテキストを指定する要素である。

属性がいくつかあり、それらを利用する。

| 属性   | 意味                                                               |
| :----- | :----------------------------------------------------------------- |
| src    | 表示する画像の相対パスまたはアドレス                               |
| alt    | 画像が利用できない場合に代わりに使用されるテキスト(ブラウザによる) |
| width  | 幅(整数値)                                                         |
| height | 高さ(整数値)                                                       |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MYWEmvj" data-pen-title="html-img" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/MYWEmvj">
  html-img</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# picture 要素

picture 要素は HTML5 以降で追加された新しい要素で、複数の source 要素(後述)と一つの img 要素を取りまとめる要素である。これにより、最適な source 要素による画像、source 要素が使えないブラウザでは img 要素の画像が使われ、柔軟な画像の選定が行われる。

（使用例は source 要素のところを参照）

## source 要素

source 要素は、picture 要素・video 要素・audio 要素の子要素として使用する要素で、複数記述、及び使用条件を指定することで、ブラウザに適した形で画像等を表示できる。

| 属性   | 意味                   |
| :----- | :--------------------- |
| media  | 画像の使用条件         |
| srcset | 候補画像等のパス       |
| sizes  | 使用条件と画像の表示幅 |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="VYwMbQG" data-pen-title="html-picture" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/VYwMbQG">
  html-picture</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# video 要素

video 要素は、動画を再生するための要素である。

指定する属性は以下の通り。

| 属性     | 意味                               |
| :------- | :--------------------------------- |
| src      | ファイルのアドレス・パス           |
| controls | 再生・停止ボタンを表示させる       |
| autoplay | 再生を自動で開始させる             |
| loop     | 再生を繰り返す(ループ)             |
| muted    | デフォルトでミュート(音量 0)にする |
| width    | 幅を指定する                       |
| height   | 高さを指定する                     |

例を以下に示す。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="gbOGWQN" data-pen-title="htlm-video" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/gbOGWQN">
  htlm-video</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

(ちなみにこの動画は私が学生時代に研究室の窓から外の吹雪を撮ったものである)

# audio 要素

audio 要素は音声を再生するための要素である。

基本的には、video 要素から視覚的な内容を排除したものであり、使う属性も video 要素とほとんど同じ。

| 属性     | 意味                               |
| :------- | :--------------------------------- |
| src      | ファイルのアドレス・パス           |
| controls | 再生・停止ボタンを表示させる       |
| autoplay | 再生を自動で開始させる             |
| loop     | 再生を繰り返す(ループ)             |
| muted    | デフォルトでミュート(音量 0)にする |

先程の動画ファイルを audio 要素で表示させてみよう。使用例を以下に示す。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="pvoWXje" data-pen-title="html-audio" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/pvoWXje">
  html-audio</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# track 要素

track 要素は video 要素や audio 要素の子要素として利用する要素で、字幕などの外部テキストトラックファイルを指定する場合に使用する要素である。

使用するテキストトラックファイルは、WebVTT 形式(.vtt 形式)または TTML 形式ファイルである。

指定する主な属性は以下の通り。

| 属性    | 意味                                             |
| :------ | :----------------------------------------------- |
| src     | ファイルのアドレス・パス                         |
| srclang | 外部テキストファイルの言語                       |
| kind    | 外部テキストファイルをどのように使用するかの指定 |

また、kind 属性には以下の値を指定する。

| 値           | 意味                                                           |
| :----------- | :------------------------------------------------------------- |
| subtitles    | 音は聞こえるが理解できない人向けの字幕、映像に重ねて表示       |
| captions     | 音が（明瞭に）聞こえない人向けの字幕、映像に重ねて表示         |
| descriptions | 映像が（明瞭には）見えない場合向けの解説、合成音声で読み上げる |
| chapters     | 映像のチャプターのタイトル、操作により一覧を表示               |
| metadata     | スクリプトから利用する事を想定したメタデータ                   |

先程の動画ファイルを利用して実行例を示す。（使用環境により、表示されない場合もあります・・）

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="emYGwze" data-pen-title="html-track" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/emYGwze">
  html-track</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

ちなみに字幕として利用する vtt ファイル(track.vtt)は以下の通り。

```
WEBVTT

00:00:00.000 --> 00:00:10.000
これは字幕です。10秒まで表示されます。

00:00:10.000 --> 00:00:15.000
雪が降ってます。
```

# embed 要素

embed 要素は、動画や音声などをプラグインを使って組み込む際に使う要素である。

src 属性で外部コンテンツを読み込み、ブラウザに追加インストールされたプラグインでコンテンツを利用する。

よく使われるものとしては、.swf ファイル(Flash)、.mpg ファイル(MPEG)など。

| 属性   | 意味                   |
| :----- | :--------------------- |
| src    | 組み込むファイルのパス |
| type   | 組み込むデータの種類   |
| width  | 幅を指定する           |
| height | 高さを指定する         |

# map 要素

一つの画像に複数のリンクを設定することをイメージマップという。map 要素はこのイメージマップを設定する時に使用する要素である。

具体的に画像のどの部分をどのリンクに対応させるかは、map 要素の子要素として使う後述の area 要素で指定する。

map 要素の name 属性でイメージマップに名前を定義し、画像を定義している img 要素の**usemap**属性でその名前を指定するとイメージマップを画像に適用できる。

## area 要素

area 要素は、イメージマップにおいて指定した領域を指定したリンク先に紐付ける要素である。

使用する主な属性は以下の通り。

| 属性   | 意味               |
| :----- | :----------------- |
| coords | 領域の座標         |
| shape  | 領域の形状         |
| href   | リンク先のアドレス |

ここで、shape 属性で指定できる値は決まっており、以下の通りである。また、それに応じて coords 属性で指定する値も変わってくる。

| 値      | 図形     | coords 属性に指定する値                                 |
| :------ | :------- | :------------------------------------------------------ |
| rect    | 長方形   | 左上の x 座標,左上の y 座標,右下の x 座標,右下の y 座標 |
| circle  | 円       | 円の中心の x 座標,円の中心の y 座標,半径                |
| poly    | 多角形   | 各座標を x 座標、y 座標の順に指定                       |
| default | 画像全体 | (指定しない)                                            |

使用例（画像の上半分がこのブログのトップ、下半分は私の Github へのリンク）

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="gbOGNoa" data-pen-title="html-area" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/gbOGNoa">
  html-area</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# object 要素

object 要素は、画像や音声の他、様々な形式の外部データを組み込むための要素である。

| 属性   | 意味                     |
| :----- | :----------------------- |
| data   | 組み込むデータのアドレス |
| type   | 組み込むデータの種類     |
| width  | 幅を指定する             |
| height | 高さを指定する           |

## param 要素

param 要素は、object 要素における任意のパラメータ(属性)を指定する要素である。

object 要素内では他の要素よりも前に配置させる。

| 属性  | 意味           |
| :---- | :------------- |
| name  | パラメータ名   |
| value | パラメータの値 |
