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

Worker オブジェクトのメソッド、イベントハンドラは主に以下の通り。

| メソッド      | 説明                          |
| :------------ | :---------------------------- |
| terminate()   | Worker を終了する             |
| postMessage() | Worker にメッセージを送信する |

| イベントハンドラ | 説明                               |
| :--------------- | :--------------------------------- |
| onerror          | エラーが発生した場合に発火する     |
| onmessage        | メッセージを受信した場合に発火する |

Web Worker の使用例を以下に記載する。なおここで利用しているフレームワークでは Web Worker 用の別ファイルを用意する事はできないため、Web Worker 用のコードをインラインで指定し Blob URL でファイルとして利用している。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ZYEVZqm" data-pen-title="js-webworkers" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/ZYEVZqm">
  js-webworkers</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# High Resolution Time API

High Resolution Time API とは、ミリ秒以下の分解能を持つ時刻を扱うための API である。

通常の Date.now() よりも 精度が高く（サブミリ秒）、一貫したタイミング が測定可能であり、パフォーマンス計測やベンチマーク、アニメーションタイミング、ゲーム開発などに活用される。

利用するには、`performance.now()` メソッドを利用する。

このメソッドにより`DOMHighResTimeStamp`型が返される。これはナノ秒精度の時刻印タイムスタンプを表す。

以下に、その使用例を示す。ここでは、素数を数える処理の時間を計測して表示している。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="LEYMoeW" data-pen-title="ja-highresolutiontime-api" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/LEYMoeW">
  ja-highresolutiontime-api</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# Service Worker

... 作成中
