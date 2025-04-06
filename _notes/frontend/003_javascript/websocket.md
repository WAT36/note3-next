---
title: "通信(Javascript)"
excerpt: ""
coverImage: ""
date: "2025-03-25T23:47:20.000Z"
updatedAt: '2025-04-06T15:09:35.000Z'
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

# 通信(Javascript)

Javascript における通信の方法についてを述べる。

# WebSocket

WebSocket は HTTP とは異なる、双方向通信を実現する通信プロトコルである。

WebSocket を表すオブジェクトは、次のコンストラクタで作成できる。

```javascript
WebSocket(url);
```

引数には、接続先のサーバの URL を入力する。なお、このコンストラクタを呼び出しオブジェクトを生成するタイミングで、サーバとの接続を開始する。

WebSocket の主な API は以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">url</td>
        <td style="border:none;">接続先のURL</td>
    </tr>
    <tr>
        <td style="border:none;">readyState</td>
        <td style="border:none;">現在の接続状態</td>
    </tr>
    <tr>
        <td style="border:none;">bufferedAmount</td>
        <td style="border:none;">WebSocketオブジェクト内にあるデータのサイズを示す。0の時、プログラムから送信指示があったデータはネットワークに送信されている状態。</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">send()</td>
        <td style="border:none;">サーバにデータを送信する</td>
    </tr>
    <tr>
        <td style="border:none;">close()</td>
        <td style="border:none;">サーバとの接続を切断する</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">イベントハンドラ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">onopen</td>
        <td style="border:none;">サーバとの接続確立が成功した時</td>
    </tr>
    <tr>
        <td style="border:none;">onmessage</td>
        <td style="border:none;">サーバから新しいメッセージが届いた時</td>
    </tr>
    <tr>
        <td style="border:none;">onclose</td>
        <td style="border:none;">サーバとの接続がクローズした時</td>
    </tr>
    <tr>
        <td style="border:none;">onerror</td>
        <td style="border:none;">エラーが発生した時</td>
    </tr>
</table>

また、readyState プロパティで得られる値は以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">値</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">CONNECTING</td>
        <td style="border:none;">接続中</td>
    </tr>
    <tr>
        <td style="border:none;">OPEN</td>
        <td style="border:none;">接続確立済みでサーバとの通信が可能な状態</td>
    </tr>
    <tr>
        <td style="border:none;">CLOSING</td>
        <td style="border:none;">接続切断中</td>
    </tr>
    <tr>
        <td style="border:none;">CLOSED</td>
        <td style="border:none;">接続切断済み</td>
    </tr>
</table>

WebSocket の接続確立におけるこれら API の利用を示した図を以下に記載する。

<img src="/assets/note/frontend/js/websocket.png" width=100%>

## サンプル

例として、Websocket を使った簡単な例を示してみる。

なお、通信が必要なのでこれとは別にローカルで受信用のサーバーも立てておくことを前提とする。

先に、受信用のサーバーを Node.js で立てるサンプルコードを記載する。

### 必要なモジュールのインストール

まずは、Node.js プロジェクトを立ち上げ、必要なモジュール`ws`をインストールする。

```bash
npm init -y
npm install ws
```

### サーバーを立ち上げる

以下にサーバーのサンプルコードを記載する。

```javascript
// WebSocket モジュールを import
import { WebSocketServer } from "ws";

// ポート 3000 で WebSocket サーバーを起動
const wss = new WebSocketServer({ port: 3000 });

// クライアントが接続した時の処理
wss.on("connection", (ws) => {
  console.log("クライアントが接続しました。");

  // クライアントからメッセージを受信
  ws.on("message", (message) => {
    console.log(message);

    // すべてのクライアントにメッセージをブロードキャスト
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // クライアントが切断した時の処理
  ws.on("close", () => {
    console.log("クライアントが切断しました。");
  });
});
```

次に、サーバーを起動する。

```bash
node server.js
```

### クライアント（フロントエンド）から送信して確認する

サーバーを立ち上げた状態で、画面側から通信して確認してみましょう。

以下の例を確認ください。サーバー側で `ws://localhost:3000` が起動していれば、チャットアプリのような通信が行えるはずです。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="OPJaXRV" data-pen-title="js-websocket" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/OPJaXRV">
  js-websocket</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# XMLHttpRequest

XMLHttpRequest は、Javascript から呼び出し可能な HTTP 通信を提供する API である。

もともとは XML データをやり取りするために作られたが、現在は JSON や HTML、テキストなども扱える。

これにより、スクリプトが HTTP 通信を行うことが可能になり、画面遷移を伴わずに、HTTP リクエストを送信することができる。

この技術を利用したものを Ajax と呼ぶこともあり、Single Page Application の実現にも利用される。

XMLHttpRequest の API は以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">readyState</td>
        <td style="border:none;">現在の接続状態</td>
    </tr>
    <tr>
        <td style="border:none;">timeout</td>
        <td style="border:none;">リクエストのタイムアウト時間</td>
    </tr>
    <tr>
        <td style="border:none;">withCredentials</td>
        <td style="border:none;">クロスドメイン通信時にユーザの認証情報を含める場合にはtrue,それ以外はfalse</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">open()</td>
        <td style="border:none;">リクエストメソッド(GET,POSTなど)、リクエスト先URL、非同期フラグ、ユーザ名、パスワードを設定する</td>
    </tr>
    <tr>
        <td style="border:none;">setRequestHeader()</td>
        <td style="border:none;">リクエストヘッダを追加する</td>
    </tr>
    <tr>
        <td style="border:none;">send()</td>
        <td style="border:none;">サーバにデータを送信する</td>
    </tr>
    <tr>
        <td style="border:none;">abort()</td>
        <td style="border:none;">通信を中止する</td>
    </tr>
    <tr>
        <td style="border:none;">getResponseHeader()</td>
        <td style="border:none;">レスポンスヘッダ引数で指定された名前を持つ値を返す</td>
    </tr>
    <tr>
        <td style="border:none;">getAllResponseHeader()</td>
        <td style="border:none;">レスポンスヘッダを返す</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">イベントハンドラ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">onloadstart</td>
        <td style="border:none;">リクエストを開始した</td>
    </tr>
    <tr>
        <td style="border:none;">onprogress</td>
        <td style="border:none;">データを送信（受信）中</td>
    </tr>
    <tr>
        <td style="border:none;">onabort</td>
        <td style="border:none;">通信が中止された時</td>
    </tr>
    <tr>
        <td style="border:none;">onerror</td>
        <td style="border:none;">エラーが発生した時</td>
    </tr>
    <tr>
        <td style="border:none;">onload</td>
        <td style="border:none;">リクエストが正常に完了した時</td>
    </tr>
    <tr>
        <td style="border:none;">ontimeout</td>
        <td style="border:none;">リクエストがタイムアウトした時</td>
    </tr>
</table>

XMLHttpRequest の API の一連の流れを示した図を以下に記載する。

<img src="/assets/note/frontend/js/xmlhttprequest.png" width=100%>

以下に一例を示す。ここでは、サーバーとして JSONPlaceholder を利用している。JSONPlaceholder とは、テスト等のために提供される無料の REST API サービスである。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="XJWoWPq" data-pen-title="js-xmlhttprequest" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/XJWoWPq">
  js-xmlhttprequest</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# Server-Sent Events

Server-Sent Events は、Web サーバからブラウザへのデータプッシュを受信するためのインタフェースである。

Server-Sent Events では、サーバから MIME-type text/event-stream の形式でデータを送信する事ができる。

API 類は以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">readyState</td>
        <td style="border:none;">現在の接続状態</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">EventSource()</td>
        <td style="border:none;">EventSourceオブジェクトのコンストラクタで、サーバへの接続を開始する。引数には接続先URLを入力</td>
    </tr>
    <tr>
        <td style="border:none;">close()</td>
        <td style="border:none;">サーバ接続を切断する</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">イベントハンドラ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">onopen</td>
        <td style="border:none;">サーバとの接続確立が成功した時</td>
    </tr>
    <tr>
        <td style="border:none;">onmessage</td>
        <td style="border:none;">サーバから新しいメッセージが届いた時</td>
    </tr>
    <tr>
        <td style="border:none;">onerror</td>
        <td style="border:none;">エラーが発生した時</td>
    </tr>
</table>

また、readyState プロパティで得られる値は以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">値</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">CONNECTING</td>
        <td style="border:none;">接続中</td>
    </tr>
    <tr>
        <td style="border:none;">OPEN</td>
        <td style="border:none;">接続確立済みでサーバとの通信が可能な状態</td>
    </tr>
    <tr>
        <td style="border:none;">CLOSED</td>
        <td style="border:none;">接続切断済み</td>
    </tr>
</table>

Server-Sent Events の API の一連の流れを示した図を以下に記載する。

<img src="/assets/note/frontend/js/serversentevent.png" width=100%>

## サンプル

使用例を記載する。

なお、ここも通信が必要なのでこれとは別にローカルで受信用のサーバーも立てておくことを前提とする。

先に、受信用のサーバーを Node.js で立てるサンプルコードを記載する。

### 必要なモジュールのインストール

まずは、Node.js プロジェクトを立ち上げ、必要なモジュール`express`をインストールする。

```bash
npm init -y
npm install express
```

### サーバーを立ち上げる

以下にサーバーのサンプルコードを記載する。

```javascript
import express from "express";

const app = express();
const PORT = 4000;

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // CORS 許可
  next();
});

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const send = () => {
    const now = new Date().toLocaleTimeString();
    res.write(`data: 現在時刻は ${now} です\n\n`);
  };

  // 最初のメッセージ
  send();

  // 3秒ごとにメッセージ送信
  const interval = setInterval(send, 3000);

  // クライアントが切断したら終了
  req.on("close", () => {
    clearInterval(interval);
  });
});

app.listen(PORT, () => {
  console.log(`✅ SSE サーバーが http://localhost:${PORT} で起動中`);
});
```

次に、サーバーを起動する。

```bash
node server.js
```

### クライアント（フロントエンド）から送信して確認する

同様にサーバーを立ち上げた状態で、画面側から通信して確認してみましょう。

以下の例を確認ください。サーバー側で `http://localhost:4000` が起動していれば、通信が行えるはずです。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WbNLvOm" data-pen-title="js-server-sent-event" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/WbNLvOm">
  js-server-sent-event</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>
