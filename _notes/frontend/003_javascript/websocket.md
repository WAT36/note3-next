---
title: "通信(Javascript)"
excerpt: ""
coverImage: ""
date: "2025-03-23T18:25:48.000Z"
updatedAt: "2025-03-23T18:25:48.000Z"
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

# XMLHttpRequest

XMLHttpRequest は、Javascript から呼び出し可能な HTTP 通信を提供する API である。

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
