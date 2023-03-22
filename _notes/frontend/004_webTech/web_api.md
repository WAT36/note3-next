---
title: "Web系API"
date: "2023-03-23T00:28:12.000Z"
excerpt: 'Web系APIについて'
tag: ["Web","HTML","CSS"]
updatedAt: '2023-03-23T00:28:12.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
---

HTMLに関連する各種APIについて。


# マルチメディアグラフィックスAPI

HTMLでの音声・動画といったマルチメディアに関する設定や操作を、JavaScript等といった外部ソースから制御することができる。詳しい実装方法については現在は述べないが、設定できる内容の種類についてを述べる。


## マルチメディア

HTMLでは、audio要素で音声コンテンツ、video要素で動画コンテンツを埋め込むことができる。

この埋め込んだマルチメディアコンテンツを、JavaScriptを使って制御することができる。

制御できる内容は以下の通り。

- 音声・動画プレイヤーのデザイン変更
- コンテンツの再読み込み
- 再生開始・中断

また、マルチメディアコンテンツの以下のような情報をJavaScriptで取得することができる。

- コンテンツが再生・早送り可能な状態か
- ネットワーク状況
- コンテンツの場所
- 音量
- トラック情報


## ストリーミング

ストリーミングとは、マルチメディアコンテンツをダウンロードと同時に(ダウンロードできている部分の)再生を行う技術である。

通常はコンテンツのダウンロードが全て終わってから再生するが、通信状況が悪い場合やコンテンツの容量が大きい場合は非常に時間がかかる場合もあり、コンテンツの利用をスムーズに行えない場合が多い。そのためにストリーミング技術を利用する方法が増えている。

そのような通信状況等に応じて、適切なビットレートのコンテンツを選択し、ストリーミング再生を実現する技術を**Adaptive Streaming技術**と呼ぶ。

Adaptive Streaming技術には、Apple社が開発したプロトコルである**HLS(HTTP Live Streaming)**、Adobe社やMicrosoft社などにより開発された**MPEG-DASH**のようなプロトコルも存在する。

また、JavaScriptのAPIにもストリーミングに対応したものが用意されている。例として**Media Source Extensions**はHLSやMPEG-DASHのように、ストリーミング配信されるコンテンツを再生するために作られたAPIである。


## グラフィックス

画像ファイルは、jpegやpngファイルを用意して表示するが、HTML5ではJavascript等の外部ソースを利用しても表示できる。

JavaScriptを使って画像を描画し、HTMLで表示するには**canvas要素**を利用する。canvasは画像をビットマップ形式（１ピクセル毎に色を指定する方式）で描画する。そのため、拡大縮小すると画像が粗くなる。

利用方法は以下の通り。

- HTMLにcanvas要素を用意する。
- Javascriptでcanvas要素を参照し、描画用のcontextオブジェクトを取得する
- Javascriptを使って描画する

Javascriptを使った描画では、以下のような操作が可能である。

- 線を描く
- 円、四角を描く
- 色を塗る
- テキストを書く
- 画像ファイルを読み込む
- 拡大・縮小・回転する

canvasを使ったコード例を以下に示す。

html

```html
<p>canvas例</p>
<canvas id="sample" width="100" height="100"></canvas>
<script src="/js_sample_pages/api.js"></script>
```

javascript

```javascript
var canvas = document.getElementById('sample');
var ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.rect(0,0,100,100);
ctx.strokeStyle = '#F00';
ctx.fillStyle = '#FF0';
ctx.stroke();
ctx.fill();
```

表示例(canvas)

<hr>
<hr>

<p>canvas例</p>
<canvas id="sample" width="100" height="100"></canvas>
<script src="/js_sample_pages/api.js"></script>

<hr>
<hr>

また、ベクター形式の画像である**SVG (Scalable Vector Graphics)**という方式もある。

SVGはベクター形式のため、拡大縮小などしても画像が粗くならないという特徴がある。SVGではXML形式で画像を作成する。

SVGを有効活用したライブラリとして、**D3.js**などがある。以下にSVGの例を示す。

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

# デバイスアクセスAPI

デバイスに関する情報を取得できるAPIについてを述べる。

## Geolocation API

GeoLocation APIは、ユーザーの位置情報を取得するためのAPIである。

Geolocation APIは、無線LAN、Wi-Fi、携帯キャリアの基地局、GPS、IPアドレスなどといったソースを基にユーザーの位置情報を取得する。

取得できる情報の例は、以下の通り。

- 緯度
- 経度
- 高度
- 方角
- 速度


## DeviceOrientation Event

DeviceOrientation Eventは、デバイスの傾きが変化したときに発生するイベントである。

取得できる情報の例は以下の通り。

- デバイスが差す方角
- デバイスの上下方向の傾き
- デバイスの左右方向の傾き


## Touch Events

Touch Eventsは、タッチパネルなどの画面を指で操作しているときに発生するイベント類である。

取得できる情報の例は以下の通り。

- 画面をタッチ
- 画面をタッチしたまま動かす
- 画面から離す


## Pointer Events

Pointer Eventsは、マウスカーソルなどといったポインタと呼ばれる要素に関するイベントである。

取得できる情報の例は以下の通り。

- ポインタが要素の上に乗る
- ポインタが要素の上から離れる
- ポインタが動作状態になる
- ポインタが非動作状態になる
- ポインタが動く


## DOM3 Events (UI Events)

DOM3 Events (UI Events)は、マウスやキーボードなどの入力操作を取り扱うためのイベントである。

例は以下の通り。

<table>
    <thead>
        <th>イベントの種類</th>
        <th>概要</th>
    </thead>
    <tr>
        <td>UIイベント</td>
        <td>UIやHTML文書の操作に関するイベント</td>
    </tr>
    <tr>
        <td>フォーカスイベント</td>
        <td>フォーカスの状態変化に関するイベント</td>
    </tr>
    <tr>
        <td>マウスイベント</td>
        <td>マウス操作に関するイベント</td>
    </tr>
    <tr>
        <td>ホイールイベント</td>
        <td>マウス等ホイールの操作に関するイベント</td>
    </tr>
    <tr>
        <td>入力イベント</td>
        <td>キーボード入力の操作に関するイベント</td>
    </tr>
</table>


# オフラインストレージAPI

外部のインフラやリソースを利用せずとも、ブラウザ上でデータを保存できる方法がある。ここでは主にその方法についてを述べる。

## Web Storage

Web Storageは、キーと値の組み合わせによってブラウザにデータを蓄積し、利用するAPIである。

Web Storageは、大きく**セッションストレージ**と**ローカルストレージ**の２種類に分けられる。セッションストレージはウィンドウやタブが閉じられるとデータも消失するが、ローカルストレージはデータが消失されず、次にページを開いたときにでもそのデータを利用することができる。

### ローカルストレージ

ローカルストレージを使うと、Webブラウザ自体に情報を記憶し、再度そのページに訪れたときにその保存しておいた情報を使うことが可能になる。

以下にサンプルを載せる。

html

```html
<h2 id="title">ローカルストレージありの場合。下のボックスをクリックすると色が変化します。ページを更新しても変わらないはず。</h2>
<h2 id="title_nonstorage">ローカルストレージなしの場合。ページを更新すると戻ります。</h2>
<div id="red"   class="box" style="width: 50px; height: 50px; margin: 20px; background: red"></div>
<div id="green" class="box" style="width: 50px; height: 50px; margin: 20px; background: green"></div>
<div id="blue"  class="box" style="width: 50px; height: 50px; margin: 20px; background: blue"></div>
<script src="/js_sample_pages/api.js"></script>
```

javascript

```javascript
window.onload = function(){
    var title = document.getElementById('title');
    var title_nonstorage = document.getElementById('title_nonstorage');
    var boxes = document.getElementsByClassName('box');

    // localStorageを変数に格納
    var storage = localStorage;
    // localStorageから'textcolor'の値を取得
    var tc = storage.getItem('textcolor');
    // localStorageに'textcolor'の値があれば、文字色を書き換え
    if(tc){
        title.style.color = tc;
    }

    for(var i=0,l=boxes.length;i<l;i++){
        boxes[i].addEventListener('click',function(){
            title.style.color = this.id;
            storage.setItem('textcolor',this.id);
            title_nonstorage.style.color = this.id;
        })
    }
}
```

表示例

<hr>
<hr>
<h2 id="title">ローカルストレージありの場合。下のボックスをクリックすると色が変化します。ページを更新しても変わらないはず。</h2>
<h2 id="title_nonstorage">ローカルストレージなしの場合。ページを更新すると戻ります。</h2>
<div id="red"   class="box" style="width: 50px; height: 50px; margin: 20px; background: red"></div>
<div id="green" class="box" style="width: 50px; height: 50px; margin: 20px; background: green"></div>
<div id="blue"  class="box" style="width: 50px; height: 50px; margin: 20px; background: blue"></div>
<script src="/js_sample_pages/api.js"></script>
<hr>
<hr>

色付きのボックスをクリックすると文字の色が変化する。色を変えた後にページを更新すると、ローカルストレージを設定してないものは最初の状態に戻ってしまうが、ローカルストレージを利用している物は色を保持させているので、更新しても色は変わらない。



## Indexed Database API

Indexed Database APIはWeb Storageと同様にキーと値のペアによってデータを蓄積するAPIである。蓄積するのはJavaScriptのオブジェクトである。

Web Storageと比べると、インデックスやトランザクションを利用できることが特徴である。トランザクションとは、データベースの一連の処理のことである。


## Application cache

Application cacheは、マニフェストファイルと呼ばれる設定ファイルに指定したファイルをローカルのブラウザにキャッシュとして置くことで、オフラインでのページ閲覧を可能にするものである。このキャッシュの制御は、APIを通じて行う。


## Web Workers

Web Workersは、ブラウザでのスクリプト処理をバックグラウンドで実行するためのものである。

通常は、HTMLのパース、外部ソースなどのスクリプト処理が終わるまでユーザーは画面の操作が行えず、またそのスクリプト処理が大きいとユーザーの操作が行えない時間が増えてしまう。

そこで、Web Workersでバックグラウンドで実行することで、画面の操作への影響を減らし、またスクリプト処理を並列で多種動かせるので、大量の処理を行わせることができる。


## Service Workers

Service Workersは、Webページとは別にバックグラウンドでスクリプトを実行する環境である。

先程のWeb WorkersがWebページの内部で動作するのに対し、Service WorkersはWebページとは別に動作する。

Service Workersを利用することで、リソースをキャッシュしてオフラインでも利用可能にしたり、バックグラウンドでの同期など、Webページやユーザの操作を必要としない機能を提供することができる。

別環境なので、Webページを開いたタブが閉じられても、Service Workersは必要に応じて動作する。


## Push API

Push APIは、アプリケーションがサーバーからのプッシュ通知を受信できるようにするAPIである。

Service Workerと組み合わせることで、アプリケーションが動作にかかわらず受信できる。

Push APIはあくまでプッシュ通知を受信するだけなので、プッシュ通知の表示やメッセージの表示などは、これとは別に実施する必要がある。

## fetch

fetchは、Service Worker上で指定したリソースを取得する際に利用するAPIである。


# 通信系API

通信に関するAPIを述べる。

## XMLHttpRequest

XMLHttpRequestは、JavaScriptでHTTP通信を実現するAPIである。

これにより、ページを遷移せずにHTTP通信を行い、データを取得することが可能になる。


## WebSocket API

WebSocket APIは、JavaScriptでWebSocketプロトコル通信を実現するAPIである。

WebSocketプロトコルは、ブラウザとサーバのどちらからもデータを送信可能な双方向通信を実現するための仕様である。

WebSocketを利用することで、チャットのような双方向通信が頻繁に発生するアプリケーションを作ることができる。


## Server-Sent Events

Server-Sent Eventsは、サーバからのプッシュ通信を実現するAPIである。

通常のHTTPではクライアントからサーバにリクエストを送信し、レスポンスが変えると通信が終了するが、Server-Sent Eventsでは、サーバからレスポンスを受け取っても通信を終了せず、接続を維持する。

サーバはその接続を利用してメッセージを継続して送信するが、サーバからしかデータを送信できないという特徴がある。


## WebRTC

WebRTC(Web Real-Time Communication)は、ブラウザでリアルタイムなコミュニケーションを実現するための仕組みである。WebRTCを使うことで、ブラウザ間のビデオチャットやボイスチャット、会議システムなどが実現可能です。
