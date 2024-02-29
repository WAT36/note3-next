---
title: "Web系API"
date: "2023-03-23T00:28:12.000Z"
excerpt: "Web系APIについて"
tag: ["Web", "HTML", "CSS"]
updatedAt: "2023-03-23T00:28:12.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
link:
  javascript: ["/assets/note/frontend/web_other/webApi.js"]
---

HTML に関連する各種 API について。

# マルチメディアグラフィックス API

HTML での音声・動画といったマルチメディアに関する設定や操作を、JavaScript 等といった外部ソースから制御することができる。詳しい実装方法については現在は述べないが、設定できる内容の種類についてを述べる。

## マルチメディア

HTML では、audio 要素で音声コンテンツ、video 要素で動画コンテンツを埋め込むことができる。

この埋め込んだマルチメディアコンテンツを、JavaScript を使って制御することができる。

制御できる内容は以下の通り。

- 音声・動画プレイヤーのデザイン変更
- コンテンツの再読み込み
- 再生開始・中断

また、マルチメディアコンテンツの以下のような情報を JavaScript で取得することができる。

- コンテンツが再生・早送り可能な状態か
- ネットワーク状況
- コンテンツの場所
- 音量
- トラック情報

## ストリーミング

ストリーミングとは、マルチメディアコンテンツをダウンロードと同時に(ダウンロードできている部分の)再生を行う技術である。

通常はコンテンツのダウンロードが全て終わってから再生するが、通信状況が悪い場合やコンテンツの容量が大きい場合は非常に時間がかかる場合もあり、コンテンツの利用をスムーズに行えない場合が多い。そのためにストリーミング技術を利用する方法が増えている。

そのような通信状況等に応じて、適切なビットレートのコンテンツを選択し、ストリーミング再生を実現する技術を**Adaptive Streaming 技術**と呼ぶ。

Adaptive Streaming 技術には、Apple 社が開発したプロトコルである**HLS(HTTP Live Streaming)**、Adobe 社や Microsoft 社などにより開発された**MPEG-DASH**のようなプロトコルも存在する。

また、JavaScript の API にもストリーミングに対応したものが用意されている。例として**Media Source Extensions**は HLS や MPEG-DASH のように、ストリーミング配信されるコンテンツを再生するために作られた API である。

## グラフィックス

画像ファイルは、jpeg や png ファイルを用意して表示するが、HTML5 では Javascript 等の外部ソースを利用しても表示できる。

JavaScript を使って画像を描画し、HTML で表示するには **canvas 要素** を利用する。canvas は画像をビットマップ形式（１ピクセル毎に色を指定する方式）で描画する。そのため、拡大縮小すると画像が粗くなる。

利用方法は以下の通り。

- HTML に canvas 要素を用意する。
- Javascript で canvas 要素を参照し、描画用の context オブジェクトを取得する
- Javascript を使って描画する

Javascript を使った描画では、以下のような操作が可能である。

- 線を描く
- 円、四角を描く
- 色を塗る
- テキストを書く
- 画像ファイルを読み込む
- 拡大・縮小・回転する

canvas を使ったコード例を以下に示す。

html

```html
<p>canvas例</p>
<canvas id="sample" width="100" height="100"></canvas>
<script src="/assets/note/frontend/web_other/webApi.js"></script>
```

javascript

```javascript
var canvas = document.getElementById("sample");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(0, 0, 100, 100);
ctx.strokeStyle = "#F00";
ctx.fillStyle = "#FF0";
ctx.stroke();
ctx.fill();
```

表示例(canvas)

<hr>
<hr>

<p>canvas例</p>
<canvas id="sample" width="100" height="100"></canvas>

<hr>
<hr>

また、ベクター形式の画像である **SVG (Scalable Vector Graphics)** という方式もある。

SVG はベクター形式のため、拡大縮小などしても画像が粗くならないという特徴がある。SVG では XML 形式で画像を作成する。

SVG を有効活用したライブラリとして、 **D3.js** などがある。以下に SVG の例を示す。

html

```html
<p>svg例</p>
<svg width="200" height="200">
  <circle cx="100" cy="100" r="50" stroke="red" fill="yellow" />
</svg>
```

表示例

<hr>
<hr>
<p>svg例</p>
<svg width="200" height="200">
    <circle cx="100" cy="100" r="50" stroke="red" fill="yellow" />
</svg>
<hr>
<hr>

# デバイスアクセス API

デバイスに関する情報を取得できる API についてを述べる。

## Geolocation API

GeoLocation API は、ユーザーの位置情報を取得するための API である。

Geolocation API は、無線 LAN、Wi-Fi、携帯キャリアの基地局、GPS、IP アドレスなどといったソースを基にユーザーの位置情報を取得する。

取得できる情報の例は、以下の通り。

- 緯度
- 経度
- 高度
- 方角
- 速度

## DeviceOrientation Event

DeviceOrientation Event は、デバイスの傾きが変化したときに発生するイベントである。

取得できる情報の例は以下の通り。

- デバイスが差す方角
- デバイスの上下方向の傾き
- デバイスの左右方向の傾き

## Touch Events

Touch Events は、タッチパネルなどの画面を指で操作しているときに発生するイベント類である。

取得できる情報の例は以下の通り。

- 画面をタッチ
- 画面をタッチしたまま動かす
- 画面から離す

## Pointer Events

Pointer Events は、マウスカーソルなどといったポインタと呼ばれる要素に関するイベントである。

取得できる情報の例は以下の通り。

- ポインタが要素の上に乗る
- ポインタが要素の上から離れる
- ポインタが動作状態になる
- ポインタが非動作状態になる
- ポインタが動く

## DOM3 Events (UI Events)

DOM3 Events (UI Events)は、マウスやキーボードなどの入力操作を取り扱うためのイベントである。

例は以下の通り。

| イベントの種類     | 概要                                   |
| :----------------- | :------------------------------------- |
| UI イベント        | UI や HTML 文書の操作に関するイベント  |
| フォーカスイベント | フォーカスの状態変化に関するイベント   |
| マウスイベント     | マウス操作に関するイベント             |
| ホイールイベント   | マウス等ホイールの操作に関するイベント |
| 入力イベント       | キーボード入力の操作に関するイベント   |

# オフラインストレージ API

外部のインフラやリソースを利用せずとも、ブラウザ上でデータを保存できる方法がある。ここでは主にその方法についてを述べる。

## Web Storage

Web Storage は、キーと値の組み合わせによってブラウザにデータを蓄積し、利用する API である。

Web Storage は、大きく**セッションストレージ**と**ローカルストレージ**の２種類に分けられる。セッションストレージはウィンドウやタブが閉じられるとデータも消失するが、ローカルストレージはデータが消失されず、次にページを開いたときにでもそのデータを利用することができる。

### ローカルストレージ

ローカルストレージを使うと、Web ブラウザ自体に情報を記憶し、再度そのページに訪れたときにその保存しておいた情報を使うことが可能になる。

以下にサンプルを載せる。

html

```html
<p id="title">
  ローカルストレージありの場合：下のボックスをクリックすると色が変化します。ページを更新しても変わらないはず。
</p>
<p id="title_nonstorage">
  ローカルストレージなしの場合：ページを更新すると戻ります。
</p>
<div
  id="red"
  class="box"
  style="width: 50px; height: 50px; margin: 20px; background: red"
></div>
<div
  id="green"
  class="box"
  style="width: 50px; height: 50px; margin: 20px; background: green"
></div>
<div
  id="blue"
  class="box"
  style="width: 50px; height: 50px; margin: 20px; background: blue"
></div>
<script src="/assets/note/frontend/web_other/webApi.js"></script>
```

javascript

```javascript
window.onload = function () {
  var title = document.getElementById("title");
  var title_nonstorage = document.getElementById("title_nonstorage");
  var boxes = document.getElementsByClassName("box");

  // localStorageを変数に格納
  var storage = localStorage;
  // localStorageから'textcolor'の値を取得
  var tc = storage.getItem("textcolor");
  // localStorageに'textcolor'の値があれば、文字色を書き換え
  if (tc) {
    title.style.color = tc;
  }

  for (var i = 0, l = boxes.length; i < l; i++) {
    boxes[i].addEventListener("click", function () {
      title.style.color = this.id;
      storage.setItem("textcolor", this.id);
      title_nonstorage.style.color = this.id;
    });
  }
};
```

表示例

<hr>
<hr>
<p id="title">ローカルストレージありの場合：下のボックスをクリックすると色が変化します。ページを更新しても変わらないはず。</p>
<p id="title_nonstorage">ローカルストレージなしの場合：ページを更新すると戻ります。</p>
<div id="red"   class="box" style="width: 50px; height: 50px; margin: 20px; background: red"></div>
<div id="green" class="box" style="width: 50px; height: 50px; margin: 20px; background: green"></div>
<div id="blue"  class="box" style="width: 50px; height: 50px; margin: 20px; background: blue"></div>
<hr>
<hr>

色付きのボックスをクリックすると文字の色が変化する。色を変えた後にページを更新すると、ローカルストレージを設定してないものは最初の状態に戻ってしまうが、ローカルストレージを利用している物は色を保持させているので、更新しても色は変わらない。

## Indexed Database API

Indexed Database API は Web Storage と同様にキーと値のペアによってデータを蓄積する API である。蓄積するのは JavaScript のオブジェクトである。

Web Storage と比べると、インデックスやトランザクションを利用できることが特徴である。トランザクションとは、データベースの一連の処理のことである。

## Application cache

Application cache は、マニフェストファイルと呼ばれる設定ファイルに指定したファイルをローカルのブラウザにキャッシュとして置くことで、オフラインでのページ閲覧を可能にするものである。このキャッシュの制御は、API を通じて行う。

## Web Workers

Web Workers は、ブラウザでのスクリプト処理をバックグラウンドで実行するためのものである。

通常は、HTML のパース、外部ソースなどのスクリプト処理が終わるまでユーザーは画面の操作が行えず、またそのスクリプト処理が大きいとユーザーの操作が行えない時間が増えてしまう。

そこで、Web Workers でバックグラウンドで実行することで、画面の操作への影響を減らし、またスクリプト処理を並列で多種動かせるので、大量の処理を行わせることができる。

## Service Workers

Service Workers は、Web ページとは別にバックグラウンドでスクリプトを実行する環境である。

先程の Web Workers が Web ページの内部で動作するのに対し、Service Workers は Web ページとは別に動作する。

Service Workers を利用することで、リソースをキャッシュしてオフラインでも利用可能にしたり、バックグラウンドでの同期など、Web ページやユーザの操作を必要としない機能を提供することができる。

別環境なので、Web ページを開いたタブが閉じられても、Service Workers は必要に応じて動作する。

## Push API

Push API は、アプリケーションがサーバーからのプッシュ通知を受信できるようにする API である。

Service Worker と組み合わせることで、アプリケーションが動作にかかわらず受信できる。

Push API はあくまでプッシュ通知を受信するだけなので、プッシュ通知の表示やメッセージの表示などは、これとは別に実施する必要がある。

## fetch

fetch は、Service Worker 上で指定したリソースを取得する際に利用する API である。

# 通信系 API

通信に関する API を述べる。

## XMLHttpRequest

XMLHttpRequest は、JavaScript で HTTP 通信を実現する API である。

これにより、ページを遷移せずに HTTP 通信を行い、データを取得することが可能になる。

## WebSocket API

WebSocket API は、JavaScript で WebSocket プロトコル通信を実現する API である。

WebSocket プロトコルは、ブラウザとサーバのどちらからもデータを送信可能な双方向通信を実現するための仕様である。

WebSocket を利用することで、チャットのような双方向通信が頻繁に発生するアプリケーションを作ることができる。

## Server-Sent Events

Server-Sent Events は、サーバからのプッシュ通信を実現する API である。

通常の HTTP ではクライアントからサーバにリクエストを送信し、レスポンスが変えると通信が終了するが、Server-Sent Events では、サーバからレスポンスを受け取っても通信を終了せず、接続を維持する。

サーバはその接続を利用してメッセージを継続して送信するが、サーバからしかデータを送信できないという特徴がある。

## WebRTC

WebRTC(Web Real-Time Communication)は、ブラウザでリアルタイムなコミュニケーションを実現するための仕組みである。WebRTC を使うことで、ブラウザ間のビデオチャットやボイスチャット、会議システムなどが実現可能です。
