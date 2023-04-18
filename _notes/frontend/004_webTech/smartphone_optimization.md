---
title: "スマートフォン最適化"
date: "2023-03-22T08:44:34.000Z"
excerpt: 'スマートフォン最適化の主な手法について'
tag: ["Web","HTML","CSS"]
updatedAt: '2023-03-22T08:44:34.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
link:
  css: ['/assets/note/frontend/web_other/splite.css']
---

スマートフォン最適化手法についてを述べる。

## CSSスプライト

CSSスプライトとは、複数の画像をつなげて1つのファイルにまとめ、それをCSSで表示範囲を指定する事で画像を利用する方法である。

複数の画像を個々に利用していると、その画像の数だけ読み込みの通信をすることになり、通信速度が遅くなる場合がある。

その対策として、今回のような複数の画像を1つにまとめると言う方法がある。これにより通信回数が削減され、通信速度の向上が見込まれる。

この手法は、通信が遅く不安定であるモバイル環境において有効である。

実装方法としては、CSSのbackground-imageプロパティで背景画像を連結して繰り返し表示させ、width,heightで表示範囲、background-positionで表示位置を調整する。


使用例(css)

```css
.splite {
    background-image: url(/assets/note/frontend/html/img/img.jpg);
    width: 50px;
    height: 50px;
    background-position: 100% 100%;
}

.splite1 {
    background-position: 0 0px;
}

.splite2 {
    background-position: 0 -50px;
}

.splite3 {
    background-position: 0 -100px;
}
```

使用例(html)

```
<p class="splite splite1"></p>
<p class="splite splite2"></p>
<p class="splite splite3"></p>
```

表示例

<p class="splite splite1"></p>
<p class="splite splite2"></p>
<p class="splite splite3"></p>


## 高画像度画面向けの対応


デバイスによって、ディスプレイのピクセルの長さがCSSで扱うピクセルの長さと異なる場合がある。

これは、解像度の違いより画素の大きさが異なることなどにより発生する。

これにより、拡大、縮小等によって画像がぼやけて表示されるというような問題が発生する場合がある。

この問題を回避するには、メディアクエリを利用する事で、デバイスの特性により適用するCSSを使い分けていく。


## ホーム画面ショートカットアイコン

AndroidやiOSといったスマートフォン向けのOSでは、Webサイトへアクセスするためのショートカットをアプリケーションのようにホーム画面へ配置することができます。

この際のアイコンは、HTMLのlink要素でrel属性に**apple-touch-icon**と指定することで、設定することが可能になります。


```
<link rel="apple-touch-icon" href="xxx.png">
```

また、href属性に画像を設定することで、アイコン画像としても使用できます。
アイコン画像はOSによっては自動的にハイライトや影がつくことがありますが、これを避けたい場合にはrel属性に**apple-touch-icon-precomposed**を指定します。


## スタンドアロンモード

iOSのみの設定だが、Webサイトをアドレスバーやツールバーを消した形であるフルスクリーンで表示させる**スタンドアローンモード**を設定することができる。

使用方法は、meta要素で**name="apple-mobile-web-capable" content="yes"**と指定すれば良い。

## a要素での電話発信

通話機能を持つデバイスには、a要素を利用する事で簡単に電話を発信する設定をすることができる。

方法は、a要素のhref属性の値を**tel:(電話番号)**とすれば良い。

使用例(html)、表示例は省略

```html
<a href="tel:xxxxxxxxxxx">管理者へTEL</a>
```


## script要素のasync属性/defer属性

script要素でJavascript等の外部ソースを読み込む時、HTMLのパース(読み込み)を中断して外部ソースの読み込みを開始し、それが終わり次第HTMLの読み込みを再度開始する。

しかし、それによりHTML読み込みの待ち時間が発生してしまい、通信環境が遅くなりがちなモバイル環境においては悪影響になる場合がある。

このような場合に対処するための属性が、script要素に設定するasync/defer属性である。

### async属性

async属性は、HTMLパース処理を中止することなく非同期に外部ソースの読み込みを行う。外部ソースの読み込みが終了後に、HTMLパース処理の終了を待つことなくその外部ソースの処理が実行される。

使用例(html)、表示例は省略

```html
<script src="example.js" async></script>
```


### defer属性

defer属性は、async属性と同様にHTMLパース処理を中止することなく非同期に外部ソースを読み込むが、その外部ソースの処理実行はHTMLパース処理が終了後に行われる。

使用例(html)、表示例は省略

```html
<script src="example.js" defer></script>
```
