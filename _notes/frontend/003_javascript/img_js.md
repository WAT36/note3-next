---
title: "動画・音声(JavaScript)"
excerpt: ""
coverImage: ""
date: "2025-03-25T23:45:20.000Z"
updatedAt: "2025-03-25T23:45:20.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

前述の HTML の章で動画・音声についてを述べたが、実は動画・音声ファイルに関しては Javascript で制御することができる。

動画は video 要素、音声は audio 要素を利用する。ここでは、それに関してを述べる。

## プロパティ

Javascript で、動画、音声を扱う時に利用する主なプロパティは以下の通り。

| プロパティ名 | 意味                                                           |
| :----------- | :------------------------------------------------------------- |
| readyState   | メディア要素の準備状態、詳細は別表                             |
| networkState | ネットワークの状態。詳細は別表                                 |
| error        | エラーの状態。詳細は別表                                       |
| paused       | 再生が中断されている場合は true を返す。そうでない場合は false |
| ended        | 再生が完了した場合は true、そうでない場合は false を返す       |
| duration     | 再生時間の長さ(秒)を返す                                       |
| currentTime  | 現在の再生位置(秒)を返す                                       |

うち、readyState で返る値は以下の通り。

| 状態名            | 数値 | 意味                                               |
| :---------------- | :--- | :------------------------------------------------- |
| HAVE_NOTHING      | 0    | 利用可能でない状態                                 |
| HAVE_METADATA     | 1    | メディアリソースに関する情報が取得済みである状態   |
| HAVE_CURRENT_DATA | 2    | 現在の再生位置に対応するデータが利用可能           |
| HAVE_FUTURE_DATA  | 3    | 現在の再生位置及びその後に対応するデータが利用可能 |

また、networkState で返る値は以下の通り。

| 状態名            | 数値 | 意味                                                   |
| :---------------- | :--- | :----------------------------------------------------- |
| NETWORK_EMPTY     | 0    | 初期化されていない状態                                 |
| NETWORK_IDLE      | 1    | 一時停止された時など、ネットワークを利用していない状態 |
| NETOWRK_LOADING   | 2    | データをダウンロード中の状態                           |
| NETWORK_NO_SOURCE | 3    | 利用するリソースが見つかってない                       |

error で返る値は以下の通り。

| 状態名                      | 数値 | 意味                                                     |
| :-------------------------- | :--- | :------------------------------------------------------- |
| MEDIA_ERR_ABORTED           | 1    | リソースのフェッチがユーザにより中止された時             |
| MEDIA_ERR_NETWORK           | 2    | リソースのフェッチがネットワークエラーにより中止された時 |
| MEDIA_ERR_DECODE            | 3    | リソースのデコード中にエラーが発生した時                 |
| MEDIA_ERR_SRC_NOT_SUPPORTED | 4    | src 属性に指定されたリソースが不適切                     |

<hr>

次に、audio,video 要素で利用できるメソッドを述べる。以下の通り。

| メソッド | 意味                                                     |
| :------- | :------------------------------------------------------- |
| load()   | 該当の要素をリセットし、リソースをロードする             |
| play()   | 再生を開始する。再生が完了している場合は最初から再生する |
| pause()  | 再生を中断する                                           |

<hr>

また、audio,video 要素で利用できる主なイベントハンドラは以下の通り。

| イベントハンドラ | 意味                                                     |
| :--------------- | :------------------------------------------------------- |
| onplay           | 再生が開始された時                                       |
| onplaying        | 中断していた再生が再度再生可能となった時                 |
| ontimeupdate     | 現在の再生位置が変化した時                               |
| onpause          | 再生が中断された時                                       |
| onwaiting        | データの受信を待っている時                               |
| onended          | 再生が完了した時                                         |
| onerror          | 再生中にエラーが発生した時                               |
| onabort          | 再生がエラー以外の原因で停止した場合に発行されるイベント |

<hr>

試しに、これらのイベントハンドラを利用した例を以下に示してみよう。現在の動画ファイルの状態を表示する図を以下に記載する。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="emYKJrR" data-pen-title="js-img" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/emYKJrR">
  js-img</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>
