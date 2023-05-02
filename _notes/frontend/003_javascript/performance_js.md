---
title: "パフォーマンス系API(Javascript)"
date: "2023-05-02T23:15:16.000Z"
excerpt: ''
tag: ["Web","HTML","Javascript"]
updatedAt: '2023-05-02T23:15:16.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
draft: true
---

# パフォーマンス系API(Javascript)

Javascriptのパフォーマンスに関するAPIを述べる。

# Web Workers

Web Workersは、Webアプリケーションでバックグラウンドスクリプトを生成するためのAPIである。これは独立したスレッドで動作するので、UIや他のスクリプトによるユーザインタラクションの処理をブロックする事なく処理を行える。

Web Workersを作成するには、Workerオブジェクトを利用して作成する。引数にはスクリプトのファイル名を取る。

```javascript
var worker = new Worker('スクリプト名')
```

Workerに関するAPIは以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">terminate()</td>
        <td style="border:none;">Workerを終了する</td>
    </tr>
    <tr>
        <td style="border:none;">postMessage()</td>
        <td style="border:none;">Workerにメッセージを送信する</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">イベントハンドラ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">onerror</td>
        <td style="border:none;">エラーが発生した時</td>
    </tr>
    <tr>
        <td style="border:none;">onmessage</td>
        <td style="border:none;">メッセージを受信した時</td>
    </tr>
</table>

<hr>

また、WorkerオブジェクトにはグローバルオブジェクトとしてWorkerGlobalScopeオブジェクトを有している。

WorkerGlobalScopeのAPI類は以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">self</td>
        <td style="border:none;">WorkerGlobalScopeオブジェクト自身</td>
    </tr>
    <tr>
        <td style="border:none;">location</td>
        <td style="border:none;">Workerが作成されたときのWorkerLocationオブジェクト</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">close()</td>
        <td style="border:none;">Workerをクローズする</td>
    </tr>
    <tr>
        <td style="border:none;">importScripts()</td>
        <td style="border:none;">外部スクリプトファイルをワーカーに読み込む</td>
    </tr>
    <tr>
        <td style="border:none;">postMessage()</td>
        <td style="border:none;">Workerにメッセージを送信する</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">イベントハンドラ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">onerror</td>
        <td style="border:none;">エラーが発生した時</td>
    </tr>
    <tr>
        <td style="border:none;">onoffline</td>
        <td style="border:none;">オフラインになった時</td>
    </tr>
    <tr>
        <td style="border:none;">ononline</td>
        <td style="border:none;">オンラインになった時</td>
    </tr>
    <tr>
        <td style="border:none;">onmessage</td>
        <td style="border:none;">メッセージを受信した時</td>
    </tr>
</table>

このうちlocationプロパティで得られるWorkLocationオブジェクトのプロパティは以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">href</td>
        <td style="border:none;">このオブジェクトが示すURL</td>
    </tr>
    <tr>
        <td style="border:none;">protocol</td>
        <td style="border:none;">プロトコル</td>
    </tr>
    <tr>
        <td style="border:none;">host</td>
        <td style="border:none;">ホスト</td>
    </tr>
    <tr>
        <td style="border:none;">hostname</td>
        <td style="border:none;">ホスト名</td>
    </tr>
    <tr>
        <td style="border:none;">port</td>
        <td style="border:none;">ポート</td>
    </tr>
    <tr>
        <td style="border:none;">search</td>
        <td style="border:none;">検索ワード</td>
    </tr>
</table>


# High Resolution Time API

High Resolution Time APIは、ミリ秒以下の分解能を持つ時刻を扱うためのAPIである。

使用するには、W3CのHigh Resolution Timeで定義されている**Performance**オブジェクトを利用する。

実際に時刻を取得するには、 **performance.now()** メソッドを利用する。

このメソッドにより得られるデータはDOMHighResTimeStamp型は、ナノ秒精度のタイムスタンプを表す。


# Application Cache

Application Cacheは、マニフェストファイルに指定したファイルをローカルにキャッシュすることで、ネットワークがオフラインでもブラウザからページを閲覧できる仕組みを提供するAPIである。

全体的な流れを示した図は以下の通り。

<img src="/img/front-end/applicationcache.png" width=50%>

Application Cacheは、Javascriptでは**ApplicationCache**オブジェクトを利用して扱う。

ApplicationCacheのAPI類は以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">status</td>
        <td style="border:none;">Application Cacheの状態(下表参照)</td>
    </tr>
</table>

このstatusで得られる値は以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">値</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">UNCACHED</td>
        <td style="border:none;">キャッシュが存在しない</td>
    </tr>
    <tr>
        <td style="border:none;">IDLE</td>
        <td style="border:none;">キャッシュがアイドル状態</td>
    </tr>
    <tr>
        <td style="border:none;">CHECKING</td>
        <td style="border:none;">キャッシュの更新を確認中</td>
    </tr>
    <tr>
        <td style="border:none;">DOWNLOADING</td>
        <td style="border:none;">キャッシュをダウンロード中</td>
    </tr>
    <tr>
        <td style="border:none;">OBSOLETE</td>
        <td style="border:none;">キャッシュが廃止された状態</td>
    </tr>
</table>

<hr>

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">update()</td>
        <td style="border:none;">キャッシュの更新を行う</td>
    </tr>
    <tr>
        <td style="border:none;">abort()</td>
        <td style="border:none;">キャッシュのダウンロードを中断する</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">イベントハンドラ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">onchecking</td>
        <td style="border:none;">キャッシュのチェック中</td>
    </tr>
    <tr>
        <td style="border:none;">onerror</td>
        <td style="border:none;">エラーが発生した時</td>
    </tr>
    <tr>
        <td style="border:none;">ondownloading</td>
        <td style="border:none;">キャッシュのダウンロード中</td>
    </tr>
    <tr>
        <td style="border:none;">onprogress</td>
        <td style="border:none;">キャッシュ処理の進行中</td>
    </tr>
    <tr>
        <td style="border:none;">oncached</td>
        <td style="border:none;">キャッシュ済み</td>
    </tr>
</table>

# Page Visibility

Page Visibility APIは、Webページが見えている状態にあるかを示すAPIである。

このようなページの状態を取得するために、Documentオブジェクトへの拡張として次のようなプロパティが追加されている。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">hidden</td>
        <td style="border:none;">ページが隠された、見えていない状態の時true、そうで無い場合falseを返す。</td>
    </tr>
    <tr>
        <td style="border:none;">visibilityState</td>
        <td style="border:none;">ドキュメントの可視性を示す。値はvisible(少なくとも部分的には可視状態)、hidden(見えていない)、prerender(プレレンダリングされてユーザから見えない)、unload(アンロードされている)のいずれか</td>
    </tr>
</table>

また、以下のイベントも追加されている。

<table style="border:none;">
    <tr>
        <th style="border:none;">イベントハンドラ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">visibilitychange</td>
        <td style="border:none;">ドキュメントの可視性が変化した時</td>
    </tr>
</table>

# Navigation Timing

Navigation Timingは、ブラウザがページにアクセスする際のページの読み込み時間、DNSにおける名前解決などの各所要時間の計測を行う。

利用するには、**Performance**オブジェクトを利用して行う。このPerformanceオブジェクトはWindowオブジェクトから取得できる。

PerformanceオブジェクトのAPI類を以下に記載する。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">timing</td>
        <td style="border:none;">PerformanceTimingオブジェクト</td>
    </tr>
</table>

PerformanceTimingオブジェクトは以下のプロパティを持つ。これらを参照することで、各種の処理時刻を取得できる。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">unloadEventStart</td>
        <td style="border:none;">アンロードの開始時刻</td>
    </tr>
    <tr>
        <td style="border:none;">unloadEventEnd</td>
        <td style="border:none;">アンロードの終了時刻</td>
    </tr>
    <tr>
        <td style="border:none;">redirectStart</td>
        <td style="border:none;">HTTPリダイレクトの開始時刻</td>
    </tr>
    <tr>
        <td style="border:none;">redirectEnd</td>
        <td style="border:none;">HTTPリダイレクトの終了時刻</td>
    </tr>
    <tr>
        <td style="border:none;">fetchStart</td>
        <td style="border:none;">リソースフェッチの開始時刻</td>
    </tr>
    <tr>
        <td style="border:none;">domainLookupStart</td>
        <td style="border:none;">DNSルックアップの開始時刻</td>
    </tr>
    <tr>
        <td style="border:none;">domainLookupEnd</td>
        <td style="border:none;">DNSルックアップの終了時刻</td>
    </tr>
    <tr>
        <td style="border:none;">connectStart</td>
        <td style="border:none;">サーバとの接続の開始時刻</td>
    </tr>
    <tr>
        <td style="border:none;">connectEnd</td>
        <td style="border:none;">サーバとの接続の終了時刻</td>
    </tr>
    <tr>
        <td style="border:none;">requestStart</td>
        <td style="border:none;">サーバへのリクエストの開始時刻</td>
    </tr>
    <tr>
        <td style="border:none;">responseStart</td>
        <td style="border:none;">サーバからのレスポンスの受信を開始した時刻</td>
    </tr>
    <tr>
        <td style="border:none;">responseEnd</td>
        <td style="border:none;">サーバからのレスポンスの受信を終了した時刻</td>
    </tr>
    <tr>
        <td style="border:none;">domLoading</td>
        <td style="border:none;">ドキュメントのロード開始の準備ができた時刻</td>
    </tr>
    <tr>
        <td style="border:none;">domComplete</td>
        <td style="border:none;">ドキュメントの準備が完了した時刻</td>
    </tr>
    <tr>
        <td style="border:none;">loadEventStart</td>
        <td style="border:none;">ドキュメントのロードイベントが開始した時刻</td>
    </tr>
    <tr>
        <td style="border:none;">loadEventEnd</td>
        <td style="border:none;">ドキュメントのロードイベントが終了した時刻</td>
    </tr>
</table>
