---
title: "動画・音声(JavaScript)"
excerpt: ""
coverImage: ""
date: '2025-03-25T23:16:20.000Z'
updatedAt: '2025-03-25T23:16:20.000Z'
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

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">readyState</td>
        <td style="border:none;">メディア要素の準備状態、詳細は別表</td>
    </tr>
    <tr>
        <td style="border:none;">networkState</td>
        <td style="border:none;">ネットワークの状態。詳細は別表</td>
    </tr>
    <tr>
        <td style="border:none;">error</td>
        <td style="border:none;">エラーの状態。詳細は別表</td>
    </tr>
    <tr>
        <td style="border:none;">paused</td>
        <td style="border:none;">再生が中断されている場合はtrueを返す。そうでない場合はfalse</td>
    </tr>
    <tr>
        <td style="border:none;">ended</td>
        <td style="border:none;">再生が完了した場合はtrue、そうでない場合はfalseを返す</td>
    </tr>
    <tr>
        <td style="border:none;">duration</td>
        <td style="border:none;">再生時間の長さ(秒)を返す</td>
    </tr>
    <tr>
        <td style="border:none;">currentTime</td>
        <td style="border:none;">現在の再生位置(秒)を返す</td>
    </tr>
</table>

うち、readyState で返る値は以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">状態名</td>
        <th style="border:none;">数値</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">HAVE_NOTHING</td>
        <td style="border:none;">0</td>
        <td style="border:none;">利用可能でない状態</td>
    </tr>
    <tr>
        <td style="border:none;">HAVE_METADATA</td>
        <td style="border:none;">1</td>
        <td style="border:none;">メディアリソースに関する情報が取得済みである状態</td>
    </tr>
    <tr>
        <td style="border:none;">HAVE_CURRENT_DATA</td>
        <td style="border:none;">2</td>
        <td style="border:none;">現在の再生位置に対応するデータが利用可能</td>
    </tr>
    <tr>
        <td style="border:none;">HAVE_FUTURE_DATA</td>
        <td style="border:none;">3</td>
        <td style="border:none;">現在の再生位置及びその後に対応するデータが利用可能</td>
    </tr>
</table>

また、networkState で返る値は以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">状態名</td>
        <th style="border:none;">数値</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">NETWORK_EMPTY</td>
        <td style="border:none;">0</td>
        <td style="border:none;">初期化されていない状態</td>
    </tr>
    <tr>
        <td style="border:none;">NETWORK_IDLE</td>
        <td style="border:none;">1</td>
        <td style="border:none;">一時停止された時など、ネットワークを利用していない状態</td>
    </tr>
    <tr>
        <td style="border:none;">NETOWRK_LOADING</td>
        <td style="border:none;">2</td>
        <td style="border:none;">データをダウンロード中の状態</td>
    </tr>
    <tr>
        <td style="border:none;">NETWORK_NO_SOURCE</td>
        <td style="border:none;">3</td>
        <td style="border:none;">利用するリソースが見つかってない</td>
    </tr>
</table>

error で返る値は以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">状態名</td>
        <th style="border:none;">数値</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">MEDIA_ERR_ABORTED</td>
        <td style="border:none;">1</td>
        <td style="border:none;">リソースのフェッチがユーザにより中止された時</td>
    </tr>
    <tr>
        <td style="border:none;">MEDIA_ERR_NETWORK</td>
        <td style="border:none;">2</td>
        <td style="border:none;">リソースのフェッチがネットワークエラーにより中止された時</td>
    </tr>
    <tr>
        <td style="border:none;">MEDIA_ERR_DECODE</td>
        <td style="border:none;">3</td>
        <td style="border:none;">リソースのデコード中にエラーが発生した時</td>
    </tr>
    <tr>
        <td style="border:none;">MEDIA_ERR_SRC_NOT_SUPPORTED</td>
        <td style="border:none;">4</td>
        <td style="border:none;">src属性に指定されたリソースが不適切</td>
    </tr>
</table>

<hr>

次に、audio,video 要素で利用できるメソッドを述べる。以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">load()</td>
        <td style="border:none;">該当の要素をリセットし、リソースをロードする</td>
    </tr>
    <tr>
        <td style="border:none;">play()</td>
        <td style="border:none;">再生を開始する。再生が完了している場合は最初から再生する</td>
    </tr>
    <tr>
        <td style="border:none;">pause()</td>
        <td style="border:none;">再生を中断する</td>
    </tr>
</table>

<hr>

また、audio,video 要素で利用できる主なイベントハンドラは以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">イベントハンドラ</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">onplay</td>
        <td style="border:none;">再生が開始された時</td>
    </tr>
    <tr>
        <td style="border:none;">onplaying</td>
        <td style="border:none;">中断していた再生が再度再生可能となった時</td>
    </tr>
    <tr>
        <td style="border:none;">ontimeupdate</td>
        <td style="border:none;">現在の再生位置が変化した時</td>
    </tr>
    <tr>
        <td style="border:none;">onpause</td>
        <td style="border:none;">再生が中断された時</td>
    </tr>
    <tr>
        <td style="border:none;">onwaiting</td>
        <td style="border:none;">データの受信を待っている時</td>
    </tr>
    <tr>
        <td style="border:none;">onended</td>
        <td style="border:none;">再生が完了した時</td>
    </tr>
    <tr>
        <td style="border:none;">onerror</td>
        <td style="border:none;">再生中にエラーが発生した時</td>
    </tr>
</table>

<hr>

試しに、これらのイベントハンドラを利用した例を以下に示してみよう。現在の動画ファイルの状態を表示する図を以下に記載する。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="emYKJrR" data-pen-title="js-img" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/emYKJrR">
  js-img</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>
