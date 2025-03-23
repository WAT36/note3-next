---
title: "グラフィックス"
excerpt: ""
coverImage: ""
date: "2025-03-23T10:37:17.000Z"
updatedAt: "2025-03-23T10:37:17.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

グラフィックス及びアニメーションについてを述べる。

# Canvas(2D)

Canvas を利用すると、Javascript でブラウザ上に図を描画することができる。

Canvas を利用するには、HTML で canvas 要素を用意する。

html

```html
<canvas id="sample" width="100" height="100"></canvas>
```

Javascript から、この canvas 要素を参照し、図の描画を行う。

Javascript のサンプルコードを以下に示す。

```javascript
//canvas要素取得
var canvas = document.getElementById("sample");
//2d用　コンテキストオブジェクト取得
var context = canvas.getContext("2d");

//円を描画
context.beginPath();
context.fillStyle = "red";
context.arc(30, 30, 20, 0, Math.PI * 2, false);
context.stroke();
```

表示例

<hr>
<hr>
<canvas id="sample" width="100" height="100"></canvas>
<script type="text/javascript" src="/js_sample_pages/graphics_sample.js"></script>
<hr>
<hr>

javascript では、まず canvas 要素を取得して、その後に getContext()関数で'2d'を指定する事で 2d 用のコンテキストオブジェクトを取得する。

その後に、コンテキストオブジェクトのプロパティ、関数を利用して図形の描画を行う。

コンテキストオブジェクトの主なプロパティ、関数は以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">canvas</td>
        <td style="border:none;">操作しているcanvasオブジェクト</td>
    </tr>
    <tr>
        <td style="border:none;">globalAlpha</td>
        <td style="border:none;">図の透明度</td>
    </tr>
    <tr>
        <td style="border:none;">globalCompositeOperation</td>
        <td style="border:none;">図の合成方法</td>
    </tr>
    <tr>
        <td style="border:none;">strokeStyle</td>
        <td style="border:none;">線の色やスタイル</td>
    </tr>
    <tr>
        <td style="border:none;">fillStyle</td>
        <td style="border:none;">塗り潰しの色やスタイル</td>
    </tr>
    <tr>
        <td style="border:none;">shadowOffsetX</td>
        <td style="border:none;">水平方向の影の距離</td>
    </tr>
    <tr>
        <td style="border:none;">shadowOffsetY</td>
        <td style="border:none;">垂直方向の影の距離</td>
    </tr>
    <tr>
        <td style="border:none;">shadowBlur</td>
        <td style="border:none;">影のぼかし効果の設定</td>
    </tr>
    <tr>
        <td style="border:none;">shadowColor</td>
        <td style="border:none;">影の色</td>
    </tr>
    <tr>
        <td style="border:none;">lineWidth</td>
        <td style="border:none;">線の幅</td>
    </tr>
    <tr>
        <td style="border:none;">lineCap</td>
        <td style="border:none;">線の端の形状</td>
    </tr>
    <tr>
        <td style="border:none;">lineJoin</td>
        <td style="border:none;">線の接合箇所の形状</td>
    </tr>
    <tr>
        <td style="border:none;">font</td>
        <td style="border:none;">テキストのフォント</td>
    </tr>
    <tr>
        <td style="border:none;">textAlign</td>
        <td style="border:none;">テキストのアラインメント設定('start','end','left','right','center'のいずれか)</td>
    </tr>
</table>

<table style="border:none;">
    <tr>
        <th style="border:none;">関数</td>
        <th style="border:none;">意味</td>
        <th style="border:none;">引数</td>
    </tr>
    <tr>
        <td style="border:none;">save()</td>
        <td style="border:none;">現在の描画状態を保存する</td>
        <td style="border:none;">なし</td>
    </tr>
    <tr>
        <td style="border:none;">scale()</td>
        <td style="border:none;">拡大・縮小する</td>
        <td style="border:none;">水平方向の伸縮率,垂直方向の伸縮率</td>
    </tr>
    <tr>
        <td style="border:none;">rotate()</td>
        <td style="border:none;">回転する</td>
        <td style="border:none;">回転する角度[rad]</td>
    </tr>
    <tr>
        <td style="border:none;">rect()</td>
        <td style="border:none;">四角形を描画する</td>
        <td style="border:none;">左上の点のx座標、左上の点のy座標,幅、高さ</td>
    </tr>
    <tr>
        <td style="border:none;">arc()</td>
        <td style="border:none;">円弧を描画する</td>
        <td style="border:none;">円の中心のx座標,円の中心のy座標,半径,円弧の開始位置[rad],円弧の終了位置[rad],時計回り(false)か反時計回り(true)</td>
    </tr>
    <tr>
        <td style="border:none;">createLinearGradient()</td>
        <td style="border:none;">線形グラデーションを指定する</td>
        <td style="border:none;">グラデーション開始点のx座標、y座標,グラデーション終了点のx座標、y座標</td>
    </tr>
    <tr>
        <td style="border:none;">createRadialGradient()</td>
        <td style="border:none;">円形グラデーションを指定する</td>
        <td style="border:none;">グラデーション開始円中心のx座標,y座標,半径、グラデーション終了円中心のx座標,y座標,半径</td>
    </tr>
    <tr>
        <td style="border:none;">clearRect()</td>
        <td style="border:none;">四角形の形にクリアする</td>
        <td style="border:none;">rect()と同じ</td>
    </tr>
    <tr>
        <td style="border:none;">fillRect()</td>
        <td style="border:none;">塗り潰された四角形を描く</td>
        <td style="border:none;">rect()と同じ</td>
    </tr>
    <tr>
        <td style="border:none;">strokeRect()</td>
        <td style="border:none;">輪郭の四角形を描く</td>
        <td style="border:none;">rect()と同じ</td>
    </tr>
    <tr>
        <td style="border:none;">fill()</td>
        <td style="border:none;">現在の塗り潰し設定で塗りつぶす</td>
        <td style="border:none;">なし</td>
    </tr>
    <tr>
        <td style="border:none;">stroke()</td>
        <td style="border:none;">現在のスタイルで輪郭を描く</td>
        <td style="border:none;">なし</td>
    </tr>
    <tr>
        <td style="border:none;">beginPath()</td>
        <td style="border:none;">現在のパスをリセットする</td>
        <td style="border:none;">なし</td>
    </tr>
    <tr>
        <td style="border:none;">strokeText()</td>
        <td style="border:none;">輪郭のテキストを指定した座標に描画する</td>
        <td style="border:none;">描く文字列,文字列の左下の点のx座標,文字列の左下の点のy座標</td>
    </tr>
    <tr>
        <td style="border:none;">fillText()</td>
        <td style="border:none;">塗り潰しのテキストを指定した座標に描画する</td>
        <td style="border:none;">strokeText()と同じ</td>
    </tr>
    <tr>
        <td style="border:none;">moveTo()</td>
        <td style="border:none;">新しい開始点を座標指定する</td>
        <td style="border:none;">点のx座標、点のy座標</td>
    </tr>
    <tr>
        <td style="border:none;">lineTo()</td>
        <td style="border:none;">直前の座標と指定した座標を結ぶ直線を引く</td>
        <td style="border:none;">点のx座標、点のy座標</td>
    </tr>
    <tr>
        <td style="border:none;">quadraticCurveTo()</td>
        <td style="border:none;">２次ベジェ曲線を引く</td>
        <td style="border:none;">制御点のx座標,y座標、終点のx座標,y座標</td>
    </tr>
    <tr>
        <td style="border:none;">bezierCurveTo()</td>
        <td style="border:none;">３次ベジェ曲線を引く</td>
        <td style="border:none;">第１制御点のx座標,y座標、第２制御点のx座標,y座標、終点のx座標,y座標</td>
    </tr>
</table>

色々使った例を以下に示す。

html

```html
<canvas id="sample2" width="400" height="200"></canvas>
```

Javascript

```javascript
//canvas要素取得
var canvas2 = document.getElementById("sample2");
//2d用　コンテキストオブジェクト取得
var context2 = canvas2.getContext("2d");

//円を描画
context2.beginPath();
context2.strokeStyle = "red";
context2.fillStyle = "yellow";
context2.arc(30, 30, 20, 0, Math.PI * 2, false);
context2.stroke();
context2.fill();

//四角形を描画
context2.beginPath();
context2.strokeStyle = "blue";
context2.fillStyle = "green";
context2.rect(10, 120, 40, 40);
context2.stroke();

//線
context2.beginPath();
context2.lineWidth = 1;
context2.moveTo(200, 120);
context2.lineTo(250, 120);
context2.stroke();
context2.beginPath();
context2.lineWidth = 5;
context2.moveTo(200, 140);
context2.lineTo(250, 140);
context2.stroke();
context2.lineWidth = 10;
context2.moveTo(200, 160);
context2.lineTo(250, 160);
context2.stroke();

//円弧
context2.beginPath();
context2.lineWidth = 1;
context2.arc(200, 20, 30, Math.PI / 4, (Math.PI * 3) / 4, false);
context2.stroke();

//テキスト
context2.beginPath();
context2.strokeStyle = "black";
context2.fillStyle = "black";
context2.strokeText("Text", 300, 40);
context2.fillText("Text", 300, 60);

//テキスト(フォント、文字サイズ)
context2.beginPath();
context2.font = "bold 20px sans-serif";
context2.fillText("Text", 300, 100);
context2.font = "italic 20px sans-serif";
context2.fillText("Text", 300, 120);

//テキスト(シャドー)
context2.beginPath();
context2.font = "bold 20px sans-serif";
context2.shadowColor = "red";
context2.shadowBlur = 3;
context2.shadowOffsetX = 3;
context2.shadowOffsetY = 3;
context2.fillText("Text", 300, 140);
```

表示例

<hr>
<hr>
<canvas id="sample2" width="400" height="200"></canvas>
<script type="text/javascript" src="/js_sample_pages/graphics_sample.js"></script>
<hr>
<hr>

# SVG

SVG(Scalable Vector Graphics)とは、ベクター形式の画像フォーマットである。ベクター形式とは、点と点で結ばれた線で図形を表す方法である。これに対し、Canvas はピクセル形式での描画となる。

SVG は、XML タグを使用して描画を行う。そのために使われる XML 要素は主に以下の通りである。

<table style="border:none;">
    <tr>
        <th style="border:none;">要素名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">circle</td>
        <td style="border:none;">円を作成する</td>
    </tr>
    <tr>
        <td style="border:none;">ellipse</td>
        <td style="border:none;">楕円を作成する</td>
    </tr>
    <tr>
        <td style="border:none;">line</td>
        <td style="border:none;">線を作成する</td>
    </tr>
    <tr>
        <td style="border:none;">polygon</td>
        <td style="border:none;">多角形を作成する</td>
    </tr>
    <tr>
        <td style="border:none;">rect</td>
        <td style="border:none;">四角形を作成する</td>
    </tr>
</table>

使用例を以下に示す。

html

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle
    cx="100"
    cy="100"
    r="30"
    stroke="black"
    stroke-width="3"
    fill="blue"
  ></circle>
</svg>
```

表示例

<hr>
<hr>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <circle cx="100" cy="100" r="30" stroke="black" stroke-width="3" fill="blue"></circle>
</svg>
<hr>
<hr>
