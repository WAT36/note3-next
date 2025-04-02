---
title: "パフォーマンス系API(Javascript)"
excerpt: ""
coverImage: ""
date: "2025-03-25T23:49:20.000Z"
updatedAt: "2025-03-25T23:49:20.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

# Web Workers

Web Workers（ウェブワーカー） は、Web アプリケーションでバックグラウンドスレッド処理の仕組み を実現する、JavaScript の API です。

重たい処理や非同期計算を、 メインスレッド（UI スレッド）とは別のスレッドで実行 できます。

JavaScript は通常、シングルスレッド で動作します。そのため、CPU に重い処理を任せると UI（ボタン、入力、アニメーションなど）が固まります。

Web Worker を使うことで以下のような問題を解決できます。

- ユーザー操作がカクつかない
- 大量の計算や処理が非同期で動く
- メインスレッドとの役割分離が明確

Web Workers は独立したスレッドで動作するので、Web Workers によって実行されるスクリプトは個別のファイルに格納する必要があります。

以下に、Web Workers の構文を記載します。

```javascript
new Worker();
```

Worker オブジェクトの m メソッド、イベントハンドラは主に以下の通り。

| メソッド      | 説明                          |
| :------------ | :---------------------------- |
| terminate()   | Worker を終了する             |
| postMessage() | Worker にメッセージを送信する |

| イベントハンドラ | 説明                               |
| :--------------- | :--------------------------------- |
| onerror          | エラーが発生した場合に発火する     |
| onmessage        | メッセージを受信した場合に発火する |
