---
title: "ウィンドウ"
date: "2023-04-21T20:38:58.000Z"
excerpt: 'Javascriptでのウィンドウの操作について'
tag: ["Web","HTML","Javascript"]
updatedAt: '2023-04-21T20:38:58.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
link:
  javascript: ['/assets/note/frontend/javascript/window.js']
---

# ウィンドウ

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

javascript

```javascript
window.onload = function() {
    var h = document.getElementById('height');
    h.innerText = window.innerHeight + 'px';

    var l = document.getElementById('length');
    l.innerText = window.innerWidth + 'px';

};

window.onresize = function() {
    var h = document.getElementById('height');
    h.innerText = window.innerHeight + 'px';

    var l = document.getElementById('length');
    l.innerText = window.innerWidth + 'px';
};
```

html

```html
<div>ウィンドウの高さ</div>
<div id="height">x px</div>
<br>
<div>ウィンドウの幅</div>
<div id="length">x px</div>
```

表示例

<hr>
<hr>
<div>ウィンドウの高さ</div>
<div id="height">x px</div>
<br>
<div>ウィンドウの幅</div>
<div id="length">x px</div>
<hr>
<hr>

上記は、ウィンドウの大きさを変えると値が変化する。


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

先述のメソッドのうち、 **setInterval(), setTimeout()** は指定時間後に実行するメソッドである。

以下に、その一例を示す。

javascript

```javascript
window.onload = function() {
    var t = document.getElementById('time');
    var interval = window.setInterval(
        function() {
            var nowDate = new Date();
            t.innerHTML = nowDate.toLocaleTimeString();
        }
        ,1000
    );
};
```

html

```html
<p>現在時刻</p>
<p id="time">XX:XX:XX</p>
```

表示例

<p>現在時刻</p>
<p id="time">XX:XX:XX</p>
<script type="text/javascript" src="/js_sample_pages/window_sample.js"></script>

上記は１秒毎に現在時刻を取得して更新するプログラムになる。１秒毎に現在時刻を取得する仕組みをタイマー処理(setInterval)で表現している。
