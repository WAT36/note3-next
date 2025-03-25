---
title: "ウィンドウ"
excerpt: ""
coverImage: ""
date: "2025-03-25T23:42:20.000Z"
updatedAt: "2025-03-25T23:42:20.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

ウィンドウオブジェクトとは、ブラウザ上の各ウィンドウを示すオブジェクトである。このオブジェクトには様々なプロパティ、メソッドなどを含んでいる。

# 主なプロパティ

ウィンドウオブジェクトの主なプロパティは以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">closed</td>
        <td style="border:none;">ウィンドウが閉じられている場合true</td>
    </tr>
    <tr>
        <td style="border:none;">innerHeight</td>
        <td style="border:none;">ウィンドウの内側の高さ</td>
    </tr>
    <tr>
        <td style="border:none;">innerWidth</td>
        <td style="border:none;">ウィンドウの内側の幅</td>
    </tr>
    <tr>
        <td style="border:none;">length</td>
        <td style="border:none;">ウィンドウのframeの数</td>
    </tr>
    <tr>
        <td style="border:none;">name</td>
        <td style="border:none;">ウィンドウの名前</td>
    </tr>
    <tr>
        <td style="border:none;">outerHeight</td>
        <td style="border:none;">ウィンドウの外側の高さ</td>
    </tr>
    <tr>
        <td style="border:none;">outerWidth</td>
        <td style="border:none;">ウィンドウの外側の幅</td>
    </tr>
    <tr>
        <td style="border:none;">pageXOffset</td>
        <td style="border:none;">スクロールで表示されている画面の横位置</td>
    </tr>
    <tr>
        <td style="border:none;">pageYOffset</td>
        <td style="border:none;">スクロールで表示されている画面の縦位置</td>
    </tr>
    <tr>
        <td style="border:none;">self</td>
        <td style="border:none;">ウィンドウオブジェクト自身</td>
    </tr>

</table>

例えばウィンドウの縦横の長さを表示するプログラムを作ってみる。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xbxWyjb" data-pen-title="js-window" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/xbxWyjb">
  js-window</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

上記は、ウィンドウ(codepen)の大きさを変えると値が変化する。

# 主なメソッド

ウィンドウオブジェクトの主なメソッドは以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">alert()</td>
        <td style="border:none;">引数に指定したメッセージを警告ダイアログに出力</td>
    </tr>
    <tr>
        <td style="border:none;">blur()</td>
        <td style="border:none;">ウィンドウからフォーカスを外す</td>
    </tr>
    <tr>
        <td style="border:none;">close()</td>
        <td style="border:none;">ウィンドウを閉じる</td>
    </tr>
    <tr>
        <td style="border:none;">confirm()</td>
        <td style="border:none;">パラメータに指定されたメッセージを確認ダイアログに出力</td>
    </tr>
    <tr>
        <td style="border:none;">createPopup()</td>
        <td style="border:none;">ポップアップウィンドウを作成</td>
    </tr>
    <tr>
        <td style="border:none;">focus()</td>
        <td style="border:none;">ウィンドウをフォーカスする</td>
    </tr>
    <tr>
        <td style="border:none;">moveBy()</td>
        <td style="border:none;">現在位置からウィンドウを移動（相対指定）</td>
    </tr>
    <tr>
        <td style="border:none;">moveTo()</td>
        <td style="border:none;">ウィンドウを移動する（絶対指定）</td>
    </tr>
    <tr>
        <td style="border:none;">open()</td>
        <td style="border:none;">ウィンドウを作成</td>
    </tr>
    <tr>
        <td style="border:none;">resizeBy()</td>
        <td style="border:none;">現在のウィンドウサイズを変更（相対指定）</td>
    </tr>
    <tr>
        <td style="border:none;">resizeTo()</td>
        <td style="border:none;">現在のウィンドウサイズを変更（絶対指定）</td>
    </tr>
    <tr>
        <td style="border:none;">scrollBy()</td>
        <td style="border:none;">ウィンドウをスクロール（相対指定）</td>
    </tr>
    <tr>
        <td style="border:none;">scrollTo()</td>
        <td style="border:none;">ウィンドウをスクロール（絶対指定）</td>
    </tr>
    <tr>
        <td style="border:none;">setInterval()</td>
        <td style="border:none;">指定した処理を定期的に実行</td>
    </tr>
    <tr>
        <td style="border:none;">setTimeout()</td>
        <td style="border:none;">指定した処理を指定時間後に一度実行する</td>
    </tr>

</table>

# タイマー処理

先述のメソッドのうち、**setInterval(), setTimeout()**は指定時間後に実行するメソッドである。

以下に、その一例を示す。

javascript

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="qEBKbbV" data-pen-title="js-timer" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/qEBKbbV">
  js-timer</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

上記は１秒毎に現在時刻を取得して更新するプログラムになる。１秒毎に現在時刻を取得する仕組みをタイマー処理(setInterval)で表現している。
