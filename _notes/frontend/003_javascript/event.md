---
title: "イベント"
excerpt: ""
coverImage: ""
date: "2025-03-20T00:30:55.000Z"
updatedAt: "2025-03-20T00:30:55.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Javascript の**イベント**についてを記す。

イベントとは、ユーザーの画面上での何らかの操作を、プログラム上で検知し、利用できるようにする機能である。

画面上での操作とは、例えばあるボタンを押した、あるテキストをフォーカスした、などがある。

例として、以下のようなコードを記載する。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="gbOeGyv" data-pen-title="js-event" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/gbOeGyv">
  js-event</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

上記のテキストの上にカーソルを持ってくると、指定したイベントが発動してテキストの内容と色が変化する。

イベントに対応して処理を実行する仕組みを**イベントハンドラ**という。イベントハンドラには処理を 1 つのみ定義できる。

1 つのイベントに処理を複数定義する仕組みもあり、そちらは**イベントリスナ**という。

# イベントハンドラの種類

イベントの種類としては、主に以下のようなものがある。

- ウィンドウイベント
- フォームイベント
- キーボードイベント
- マウスイベント
- タッチイベント
- ドラッグ&ドロップイベント

## ウィンドウイベント

ウィンドウイベントとは、ブラウザのボタンが押された時、ページが遷移した時などといった、ウィンドウの状態が変化したときに発生する。

ウィンドウイベントのイベントハンドラの種類を以下に記載する。

<table style="border:none;">
    <tr>
        <td style="border:none;">onafterprint</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">印刷直後</td>
    </tr>
    <tr>
        <td style="border:none;">onbeforeprint</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">印刷直前</td>
    </tr>
    <tr>
        <td style="border:none;">onbeforeunload</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">ページ遷移直前</td>
    </tr>
    <tr>
        <td style="border:none;">onblur</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">フォーカスが外れた時</td>
    </tr>
    <tr>
        <td style="border:none;">onerror</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">Javascriptエラーが発生した時</td>
    </tr>
    <tr>
        <td style="border:none;">onfocus</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">フォーカスされた</td>
    </tr>
    <tr>
        <td style="border:none;">onhashchange</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">URLのハッシュが変更</td>
    </tr>
    <tr>
        <td style="border:none;">onload</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">ページの読み込みが完了した時</td>
    </tr>
    <tr>
        <td style="border:none;">onmessage</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">メッセージを受信</td>
    </tr>
    <tr>
        <td style="border:none;">onoffline</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">ネットワークがオンラインからオフラインになった時</td>
    </tr>
    <tr>
        <td style="border:none;">ononline</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">ネットワークがオフラインからオンラインになった時</td>
    </tr>
    <tr>
        <td style="border:none;">onpagehide</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">他のページへの遷移などで元のページが隠された時</td>
    </tr>
    <tr>
        <td style="border:none;">onpageshow</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">ページの読み込みが完了した時</td>
    </tr>
    <tr>
        <td style="border:none;">onpopstate</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">履歴が取り出された時</td>
    </tr>
    <tr>
        <td style="border:none;">onredo</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">やり直す(redo)ボタンが押された時</td>
    </tr>
    <tr>
        <td style="border:none;">onresize</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">ウィンドウのサイズが変更された時</td>
    </tr>
    <tr>
        <td style="border:none;">onstorage</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">ローカルストレージまたはセッションストレージが変更された時</td>
    </tr>
    <tr>
        <td style="border:none;">onundo</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">やり直す(redo)ボタンが押された時</td>
    </tr>
    <tr>
        <td style="border:none;">onunload</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">他ページに移動した時</td>
    </tr>
</table>

## フォームイベント

フォームイベントとは、フォーム上をフォーカスした、フォームを入力した場合など、フォームの状態が変化した場合に発生するイベントである。

フォームイベントのイベントハンドラの種類を以下に記載する。

<table style="border:none;">
    <tr>
        <td style="border:none;">onblur</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">フォーカスが外れた時</td>
    </tr>
    <tr>
        <td style="border:none;">onchange</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">変更された時</td>
    </tr>
    <tr>
        <td style="border:none;">onfocus</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">フォーカスされた</td>
    </tr>
    <tr>
        <td style="border:none;">onformchange</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">フォームの値が変更された時</td>
    </tr>
    <tr>
        <td style="border:none;">onforminput</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">フォームの値が入力された時</td>
    </tr>
    <tr>
        <td style="border:none;">onselect</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">要素が選択された時</td>
    </tr>
    <tr>
        <td style="border:none;">onsubmit</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">送信(submit)ボタンが押された時</td>
    </tr>
</table>

## キーボードイベント

キーボードイベントとはキーを押すなど、キーボードの状態が変化した場合に発生するイベントである。

イベントハンドラは以下の通り。

<table style="border:none;">
    <tr>
        <td style="border:none;">onkeydown</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">キーが押された</td>
    </tr>
    <tr>
        <td style="border:none;">onkeypress</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">キーが押して離された</td>
    </tr>
    <tr>
        <td style="border:none;">onkeyup</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">キーが離された</td>
    </tr>
</table>

## マウスイベント

マウスイベントはマウスのボタンを押す、ドラッグするなど、マウスの状態が変化した場合に生ずるイベントである。

イベントハンドラは以下の通り。

<table style="border:none;">
    <tr>
        <td style="border:none;">onclick</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">ボタンがクリックされた</td>
    </tr>
    <tr>
        <td style="border:none;">oncontextmenu</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">マウスの右ボタンが押された</td>
    </tr>
    <tr>
        <td style="border:none;">ondblclick</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">ダブルクリックされた時</td>
    </tr>
    <tr>
        <td style="border:none;">ondrag</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">ドラッグされた時</td>
    </tr>
    <tr>
        <td style="border:none;">ondragend</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">ドラッグが終わった時</td>
    </tr>
    <tr>
        <td style="border:none;">ondragstart</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">ドラッグが始まった時</td>
    </tr>
    <tr>
        <td style="border:none;">onmousedown</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">ボタンが押された時</td>
    </tr>
    <tr>
        <td style="border:none;">onmousemove</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">マウスポインタが移動された時</td>
    </tr>
    <tr>
        <td style="border:none;">onmouseout</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">マウスポインタが要素から外れた時</td>
    </tr>
    <tr>
        <td style="border:none;">onmouseover</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">マウスポインタが要素上に入った時</td>
    </tr>
    <tr>
        <td style="border:none;">onmousemove</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">マウスポインタが移動された時</td>
    </tr>
    <tr>
        <td style="border:none;">onscroll</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">スクロールバーを操作した時</td>
    </tr>
</table>

## タッチイベント

タッチイベントは、タッチパネルの画面を触るなど、タッチパネルの状態が変化した場合に発生する。

イベントハンドラを以下に示す。

<table style="border:none;">
    <tr>
        <td style="border:none;">ontouchstart</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">指が置かれた時</td>
    </tr>
    <tr>
        <td style="border:none;">ontouchmove</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">指がドラッグされた時</td>
    </tr>
    <tr>
        <td style="border:none;">ontouchend</td>
        <td style="border:none;">・・</td>
        <td style="border:none;">指が離れた時</td>
    </tr>
</table>

## ドラッグ&ドロップイベント

ドラッグ&ドロップイベントは先述したマウスイベントの一種である。

設定方法は、以下の通り。

- ドラッグする要素に draggable 属性を設定
- ドラッグする要素にドラッグ開始時のハンドラを設定
- ハンドラにドラッグ(・ドロップ)時の処理を記述

サンプルコードを以下に示す。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="mydxBZq" data-pen-title="js-dragdropevent" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/mydxBZq">
  js-dragdropevent</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# イベントリスナ

先程の例でもあったように、イベントハンドラでは処理を 1 つしか定義できない。複数定義するにはどうすれば良いか。

ここで、 **addEventListener()** を利用すると、1 つのイベントに複数の処理を登録できる。

```
要素.addEventListener(イベント名,イベントリスナ,伝播の可否)
```

先述したドラッグ&ドロップの例をイベントリスナで実装してみよう。以下のようになる。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="NPWYOqv" data-pen-title="js-addEventListener" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/NPWYOqv">
  js-addEventListener</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## イベントリスナの削除

イベントリスナを削除するには、**removeEventListener()**メソッドを利用する。

```
要素.removeEventListener(イベント名,イベントハンドラ,伝播の可否);
```

# イベントの発火と伝播

今度は以下のような例を考えてみる。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xbxWywN" data-pen-title="js-event-fire" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/xbxWywN">
  js-event-fire</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

この例では、id="main"の中に id="target"の要素があり、またその両方にイベントが設定されている。

この時に、id="target"の部分にカーソルを持ってくると、親の id="main"のイベントも走ってしまう。

このような事象はなぜ発生してしまうのだろうか？

ここにはイベントのメカニズムが関わっている。ユーザーの操作でイベントが発生した時、ブラウザは DOM ツリーの上の方からそのターゲットを探しにいく。

そこで、対象の要素を発見した時、イベントが**発火**し、設定された処理が動く。

実はここで終わらず、今度はその箇所から親要素に向けてイベントは**伝播**していく。その際に、設定されているイベントがある場合、そのタイミングでそのイベントの処理が走ってしまう。

図に示すと以下の通り。まずは DOM ツリーの一番上から探して行き、

<img src="/assets/note/frontend/js/event_ignition.png">

該当のイベントが発火すると、その場所から上へと辿って行き(伝播)、途上でイベントがあった場合はそれも走る。

<img src="/assets/note/frontend/js/event_propagation.png">

このような、イベントの伝播をさせたくない場合は、javascript の addEventListener での処理関数の引数に**event**を指定し、さらに処理内容に **event.stopPropagation()** を追加させる。これにより、伝播をストップできる。

使用例を以下に示す。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xbxWywN" data-pen-title="js-event-fire" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/xbxWywN">
  js-event-fire</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# カスタムイベント

これまで述べたものではイベントの発生はブラウザ上での特定の操作が行われた時に限られていたが、任意のタイミングでイベントを発生させることもできる。(テストなどで利用する)

その方法がここで述べる**カスタムイベント**であり、やり方は以下の 2 つである。

- Event コンストラクタでイベントオブジェクトを生成
- イベントリスナを登録した要素オブジェクトの dispatchEvent()でイベントを発生させる

**dispatchEvent()**は、任意にイベントを発生するメソッドである。

```
要素.dispatchEvent(イベントオブジェクト)
```

例えば先程の例において、カスタムイベントを適用してみよう。下の例では、指定した要素がドラッグされると、テキストが「ドラッグされました」と変わるが、ここではウィンドウがロードされると同時にドラッグイベントが発生し、実際にドラッグしなくても処理が実行される。それにより、自動で「ドラッグされました」に変わる。

javascript

```javascript
window.onload = function () {
  //イベントリスナ登録(dragHandlerと同じ)
  document.getElementById("from3").addEventListener(
    "drag",
    function () {
      //動作対象のオブジェクトを取得
      var p = document.getElementById("status3");

      //ドラッグするデータの識別子をDataTransferオブジェクトにセット
      event.dataTransfer.setData("text", "ドラッグされました！");

      //動作結果を表示
      p.innerHTML = "ドラッグされました！";
    },
    false
  );

  //ドラッグイベントの作成
  var customEvent = new Event("drag");

  //イベント発生
  document.getElementById("from3").dispatchEvent(customEvent);
};
```

html

```html
<div id="from3" draggable="true">
  <p>この要素をドラッグすると・・</p>
</div>
<br />
<div>
  <p id="status3">まだドラッグされてません</p>
</div>
```

表示例

<hr>
<hr>
<div id="from3" draggable="true">
<p>この要素をドラッグすると・・</p>
</div>
<br>
<div>
<p id="status3">まだドラッグされてません</p>
</div>
<hr>
<hr>
