---
title: "CSSでの色"
date: "2019-11-05T20:38:30.000Z"
excerpt: 'CSSでの色の設定について'
tag: ["CSS"]
updatedAt: '2023-03-03T20:07:33.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
---

CSSで色を利用する方法について。
# CSSでの色の表現

CSSでの色の表現について述べる。


## 16進数の値

方法の一つとして、#(シャープ)と16進数6桁の値で色を表現する方法がある。

6桁の内、上2桁をR(赤),中2桁をG(緑),下2桁をB(青)として、それぞれ0x00~0xff(255)の値で表現する。

例えば、RGB値が10進数で0,0,255の場合は、

```
#0000ff
```

と示すことができる。


## 色を示すキーワード

16進数による数値でなくとも、基本的な色を使いたい場合はその色を示すキーワードを指定することで、その色を使用できる。

キーワードの例は以下のとおり。


<table>
    <tr>
        <th>キーワード</th>
        <th>色</th>
        <th>16進数の値</th>
    </tr>
    <tr>
        <td>white</td>
        <td style="background-color:white">　　</td>
        <td>#ffffff</td>
    </tr>
    <tr>
        <td>black</td>
        <td style="background-color:black">　　</td>
        <td>#000000</td>
    </tr>
    <tr>
        <td>gray</td>
        <td style="background-color:gray">　　</td>
        <td>#808080</td>
    </tr>
    <tr>
        <td>red</td>
        <td style="background-color:red">　　</td>
        <td>#ff0000</td>
    </tr>
    <tr>
        <td>green</td>
        <td style="background-color:green">　　</td>
        <td>#00ff00</td>
    </tr>
    <tr>
        <td>blue</td>
        <td style="background-color:blue">　　</td>
        <td>#0000ff</td>
    </tr>
    <tr>
        <td>yellow</td>
        <td style="background-color:yellow">　　</td>
        <td>#ffff00</td>
    </tr>
    <tr>
        <td>fuchsia</td>
        <td style="background-color:fuchsia">　　</td>
        <td>#ff00ff</td>
    </tr>
    <tr>
        <td>aqua</td>
        <td style="background-color:aqua">　　</td>
        <td>#00ffff</td>
    </tr>
</table>


## rgb(),rgba() による指定

rgb(),rgba()という関数形式の書式を利用すると、RGBの値を10進数のまま指定できる。

rgb()は、r、g、bの値(範囲は0~255)をそれぞれ引数として入力して利用する。

rgba()は、rgb（）に加え不透明度を表すalphaの値(範囲は0.0~1.0)も引数として指定できるようにした関数である。

使用例

```
<table>
    <tr>
        <td style="background-color:rgb(255,0,0)">　　</td>
    </tr>
    <tr>
        <td style="background-color:rgba(255,0,0,0.5)">　　</td>
    </tr>
</table>
```

表示例

<hr>
<table>
    <tr>
        <td style="background-color:rgb(255,0,0)">　　</td>
    </tr>
    <tr>
        <td style="background-color:rgba(255,0,0,0.5)">　　</td>
    </tr>
</table>
<hr>

## hsl(),hsla()による指定

rgb()と違い、hue(色相),saturation(彩度),lightness(明度)の組み合わせで色を表現する **hsl()** でも色を指定できる。

h(色相)は0~359,s(彩度),l(明度)は0%~100%の範囲で値を指定する。

これに加え、不透明度を表すalphaの値(範囲は0.0~1.0)も引数として指定できるようにしたものが **hsla()** である。

使用例

```
<table>
    <tr>
        <td style="background-color:hsl(180,50%,50%)">　　</td>
    </tr>
    <tr>
        <td style="background-color:hsla(180,50%,50%,0.5)">　　</td>
    </tr>
</table>
```

表示例

<hr>
<table>
    <tr>
        <td style="background-color:hsl(180,50%,50%)">　　</td>
    </tr>
    <tr>
        <td style="background-color:hsla(180,50%,50%,0.5)">　　</td>
    </tr>
</table>
<hr>


# CSSでの色の設定

ここで設定した色のHTML文書への適用方法を述べる。

## colorプロパティ

colorプロパティは、要素内容の文字色を設定するプロパティである。全ての要素で利用可能である。

使用例

```
<p style="color:red"  >ここは赤です。</p>
<p style="color:green">ここは緑です。</p>
<p style="color:blue" >ここは青です。</p>
```

表示例

<hr>
<p style="color:red"  >ここは赤です。</p>
<p style="color:green">ここは緑です。</p>
<p style="color:blue" >ここは青です。</p>
<hr>


## opacityプロパティ

opacityプロパティは、要素内容の文字の不透明度を設定するプロパティである。

設定する値は、0.0 (透明) から1.0 (不透明) である。

使用例

```
<p style="opacity:0.2"  >不透明度20%です。</p>
<p style="opacity:0.4"  >不透明度40%です。</p>
<p style="opacity:0.6"  >不透明度60%です。</p>
<p style="opacity:0.8"  >不透明度80%です。</p>
```

表示例

<hr>
<p style="opacity:0.2"  >不透明度20%です。</p>
<p style="opacity:0.4"  >不透明度40%です。</p>
<p style="opacity:0.6"  >不透明度60%です。</p>
<p style="opacity:0.8"  >不透明度80%です。</p>
<hr>
