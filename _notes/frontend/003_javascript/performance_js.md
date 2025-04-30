---
title: "パフォーマンス系API(Javascript)"
excerpt: ""
coverImage: ""
date: "2025-03-25T23:49:20.000Z"
updatedAt: '2025-04-06T15:09:35.000Z'
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

# Page Visibility API

Page Visibility API は、ユーザーが ページを見ているか・見ていないか（Web ページが見えている状態にあるか否か） を検出できる API です。

例えば、以下のような状態であるかを検出します。

- タブが選択されているかどうかを検知
- ユーザーが他のタブに切り替えたか、ウィンドウを最小化したか、画面から離れたかを検出
- アクティブでないときに処理やアニメーション、API 呼び出しを一時停止できる

ページの状態を取得するために、Document オブジェクトに次のプロパティが追加されています。

| プロパティ      | 説明                                                                                                                                                                                                                            |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hidden          | ページがユーザから隠された状態であると見られる場合に true を、そうでない場合に false を返す                                                                                                                                     |
| visibilityState | ドキュメントの可視性を表す値を返す。値は visible（少なくとも部分的に可視状態）、hidden（ユーザーから見えていない）、prerender（プレレンダリングされており、ユーザから見えていない）、unloaded（アンロードされている）のいずれか |

| イベント         | 説明                                         |
| :--------------- | :------------------------------------------- |
| visibilitychange | ドキュメントの可視性が変化した場合に発火する |

以下に使用例を記載する、実際の表示ではわかりにくいかとは思うが、ページ非表示時には hidden となる。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="azbPgdy" data-pen-title="js-page-visibility" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/azbPgdy">
  js-page-visibility</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# Navigation Timing

Navigation Timing とは、Web ページの読み込みにかかる詳細な時間（タイミング）をミリ秒単位で測定できる JavaScript の API です。

ページの表示までにかかるネットワーク・レンダリング・リソース取得などの詳細な遅延、DNS における名前解決などの各所要時間の計測を分析可能になります。

簡単な利用例とプロパティを以下に示します。

```javascript
const navEntry = performance.getEntriesByType("navigation")[0];

console.log("ナビゲーション開始から応答完了:", navEntry.responseEnd);
console.log("DOMContentLoaded:", navEntry.domContentLoadedEventEnd);
console.log("ページロード完了:", navEntry.loadEventEnd);
```

ここで navEntry は以下のような詳細なプロパティを持ちます。

| プロパティ名                | 説明                                              |
| :-------------------------- | :------------------------------------------------ |
| startTime                   | ナビゲーション開始時刻（常に 0）                  |
| redirectStart / redirectEnd | リダイレクトのタイミング                          |
| domainLookupStart / End     | DNS ルックアップのタイミング                      |
| connectStart / End          | TCP 接続のタイミング                              |
| requestStart / responseEnd  | リクエスト送信〜応答完了のタイミング              |
| domInteractive              | DOM が初期化されたタイミング（スクリプト実行可）  |
| domContentLoadedEventEnd    | DOMContentLoaded イベントの完了時間               |
| loadEventEnd                | ページ全体の読み込み完了時刻（画像や CSS も含む） |

以下に Navigation Timing の利用例を記載します。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="zxYbmzQ" data-pen-title="js-navigation-timing" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/zxYbmzQ">
  js-navigation-timing</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# Service Worker

Service Worker とは、Web アプリケーションの バックグラウンドで動作する JavaScript のプロキシ的なスクリプト です。以下のような機能があります。

- キャッシュを利用して、ネットが切れてもページやデータを表示できる
- 高度なキャッシュ戦略（期限付き、優先ルールなど）を独自に設計できる
- サーバーからの通知を Web アプリで受信可能（PWA）
- ユーザーがオフラインでもリクエストし、再接続時に送信（Background Sync）
- CDN や API 経由のレスポンスをキャッシュして高速化

（利用例、はライブラリの都合上割愛します。。要編集）// TODO
