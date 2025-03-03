---
title: "その他"
date: "2019-11-05T23:42:30.000Z"
excerpt: "CSSその他の設定について"
tag: ["CSS"]
updatedAt: "2023-03-10T21:07:35.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

CSS についてその他、括れてない手法についてを述べる。

# グラデーション

CSS で、画像が指定可能なところにおいては、画像の場所を示す url()の代わりに、 **linear-gradient()** または **radial-gradient()** と言う書式を使い、グラデーションを表示させることができる。

以下でその方法についてを述べる。

## linear-gradient プロパティ

linear-graient プロパティは、直線状のグラデーションを設定するプロパティである。

書式は以下の通り。

```
linear-gradient(方向,色1,色2)
```

ここで、引数の「方向」に設定する値は以下の通り。

| 値                         | 意味                                 |
| :------------------------- | :----------------------------------- |
| 数値(角度)                 | 指定した角度を境としたグラデーション |
| to [top,bottom,left,right] | 指定した方向へのグラデーション       |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="raNyjpO" data-pen-title="css-linear-gradient" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/raNyjpO">
  css-linear-gradient</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## radial-gradient プロパティ

radial-gradient プロパティは、放射状のグラデーションを設定するプロパティである。

書式は以下の通り。

```
radial-gradient(at 中心の位置,中心の色,外側の色)
```

ここで、引数の「中心の位置」に設定する値は以下の通り。

| 値               | 意味                                                      |
| :--------------- | :-------------------------------------------------------- |
| top              | 一番上(縦方向の 0%)                                       |
| bottom           | 一番下(縦方向の 100%)                                     |
| left             | 一番左(横方向の 0%)                                       |
| right            | 一番右(横方向の 100%)                                     |
| center           | 中央(縦・横方向の 50%)                                    |
| (パーセンテージ) | それぞれの方向に対するパーセンテージ。数値の後に%をつける |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="KwKWaZj" data-pen-title="css-radial-gradient" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/KwKWaZj">
  css-radial-gradient</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# リスト関連のプロパティ

リスト関連について、紹介し切れていないプロパティについてを述べる。

## list-style-type プロパティ

list-style-type プロパティは、リストの行頭記号の種類を設定するプロパティである。

設定する値と意味は以下の通り。

| 値                   | 意味                                    |
| :------------------- | :-------------------------------------- |
| none                 | 行頭記号を消す                          |
| disc                 | 黒丸にする                              |
| circle               | 白抜きの丸にする                        |
| square               | 四角にする                              |
| decimal              | 数字にする                              |
| decimal-leading-zero | 先頭に 0 をつけた数字にする(01,02,03..) |
| lower-roman          | 小文字のローマ数字にする                |
| upper-roman          | 大文字のローマ数字にする                |
| lower-latin          | 小文字のアルファベットにする            |
| upper-latin          | 大文字のアルファベットにする            |
| lower-alpha          | 小文字のアルファベットにする            |
| upper-alpha          | 大文字のアルファベットにする            |
| lower-greek          | 小文字のギリシャ文字にする              |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="XJWMpEd" data-pen-title="css-list-style-type" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/XJWMpEd">
  css-list-style-type</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## list-style-image プロパティ

list-style-image プロパティは、リストの行頭記号に表示する画像を設定するプロパティである。

設定する値と意味は以下の通り。

| 値       | 意味                                                      |
| :------- | :-------------------------------------------------------- |
| url(...) | 画像の URL を指定し、その画像が行頭記号として表示される。 |
| none     | 画像を行頭記号として表示させない                          |

使用例

```html
<style type="text/css">
  ul.image {
    list-style-image: url(/assets/note/frontend/css/list-style-image.png);
  }
</style>
<ul class="image">
  <li>その１</li>
  <li>その２</li>
  <li>その３</li>
</ul>
```

表示例

<style type="text/css">
ul.image {
    list-style-image: url(/assets/note/frontend/css/list-style-image.png);
}
</style>
<ul class="image">
    <li>その１</li>
    <li>その２</li>
    <li>その３</li>
</ul>
<hr>

## list-style-position プロパティ

list-style-position プロパティは、行頭記号の表示位置を設定するプロパティである。

設定する値と意味は以下の通り。

| 値      | 意味                                       |
| :------ | :----------------------------------------- |
| outside | テキストを表示させる領域の外側に表示させる |
| inside  | テキストを表示させる領域の内側に表示させる |

使用例

```html
<ul style="list-style-position:inside">
  <li>その１</li>
  <li>その２</li>
  <li>その３</li>
</ul>
<br />
<ul style="list-style-position:outside">
  <li>その１</li>
  <li>その２</li>
  <li>その３</li>
</ul>
```

表示例

<ul style="list-style-position:inside">
<li>その１</li>
<li>その２</li>
<li>その３</li>
</ul>
<br>
<ul style="list-style-position:outside">
<li>その１</li>
<li>その２</li>
<li>その３</li>
</ul>

## list-style プロパティ

list-style プロパティは、前述の list-style 系のプロパティの値を空白区切りでまとめて指定できるプロパティである。

使用例

```html
<ul style="list-style:lower-greek inside">
  <li>その１</li>
  <li>その２</li>
  <li>その３</li>
</ul>
```

表示例

<ul style="list-style:lower-greek inside">
<li>その１</li>
<li>その２</li>
<li>その３</li>
</ul>

# テーブル関連のプロパティ

テーブル関連について、紹介し切れていないプロパティについてを述べる。

## caption-side プロパティ

caption-side プロパティは、キャプションを表の上か下かどちらかに表示させるかを設定するプロパティである。

値は top,bottom のいずれかを指定する。

使用例

```html
<table>
  <caption style="caption-side:bottom">
    キャプションbottom
  </caption>
  <tr>
    <td>0,0</td>
    <td>1,0</td>
  </tr>
  <tr>
    <td>0,1</td>
    <td>1,1</td>
  </tr>
</table>
```

表示例

<table>
    <caption style="caption-side:bottom">キャプションbottom</caption>
    <tr>
        <td>0,0</td>
        <td>1,0</td>
    </tr>
    <tr>
        <td>0,1</td>
        <td>1,1</td>
    </tr>
</table>
<hr>

## border-collapse プロパティ

border-collapse プロパティは、ボーダーを隣接するセルと重ねて表示するか、離して標示するかを設定するプロパティである。

値は collapse(隣接するセルと重ねて表示)、separate(隣接するセルと離して表示)のいずれかである。

使用例

```html
<table style="border-collapse: collapse;">
  <caption>
    collapse
  </caption>
  <tr>
    <td style="border: solid 1px;">0,0</td>
    <td style="border: solid 1px;">1,0</td>
  </tr>
  <tr>
    <td style="border: solid 1px;">0,1</td>
    <td style="border: solid 1px;">1,1</td>
  </tr>
</table>
```

表示例

<table style="border-collapse: collapse;">
    <caption>collapse</caption>
    <tr>
        <td style="border: solid 1px;">0,0</td>
        <td style="border: solid 1px;">1,0</td>
    </tr>
    <tr>
        <td style="border: solid 1px;">0,1</td>
        <td style="border: solid 1px;">1,1</td>
    </tr>
</table>
<hr>

## border-spacing プロパティ

border-spacing プロパティは、テーブルにおいて隣接するセルのボーダーとボーダーの間隔を設定するプロパティである。

先述の border-collapse プロパティの値が separate のときに有効となり、値は単位付きの数値を指定する。

使用例

```html
<table style="border-collapse: separate;border-spacing: 2px">
  <caption>
    separate 2px
  </caption>
  <tr>
    <td style="border: solid 1px;">0,0</td>
    <td style="border: solid 1px;">1,0</td>
  </tr>
  <tr>
    <td style="border: solid 1px;">0,1</td>
    <td style="border: solid 1px;">1,1</td>
  </tr>
</table>
```

表示例

<table style="border-collapse: separate;border-spacing: 2px">
    <caption>separate 2px</caption>
    <tr>
        <td style="border: solid 1px;">0,0</td>
        <td style="border: solid 1px;">1,0</td>
    </tr>
    <tr>
        <td style="border: solid 1px;">0,1</td>
        <td style="border: solid 1px;">1,1</td>
    </tr>
</table>
<hr>

## empty-cells プロパティ

empty-cells プロパティは、テーブルのセルが空白の時にボーダーを表示するかしないかを設定するプロパティである。

値は show(表示する),hide(表示しない)のいずれかを指定する。

使用例

```html
<table
  style="border-collapse: separate;border-spacing: 2px; empty-cells: show;"
>
  <caption>
    separate 2px
  </caption>
  <tr>
    <td style="border: solid 1px;">0,0</td>
    <td style="border: solid 1px;"></td>
  </tr>
  <tr>
    <td style="border: solid 1px;"></td>
    <td style="border: solid 1px;">1,1</td>
  </tr>
</table>
```

表示例

<table style="border-collapse: separate;border-spacing: 2px; empty-cells: show;">
    <caption>separate 2px</caption>
    <tr>
        <td style="border: solid 1px;">0,0</td>
        <td style="border: solid 1px;"></td>
    </tr>
    <tr>
        <td style="border: solid 1px;"></td>
        <td style="border: solid 1px;">1,1</td>
    </tr>
</table>
<hr>

# 内容を追加するプロパティ

内容を追加するプロパティについて。

## content プロパティ

content プロパティは、CSS でコンテンツ（テキスト・画像など）を追加するためのプロパティである。

content プロパティでは、擬似要素:before、:after を利用して要素の前後どちらに挿入するかを決定する。

設定する値と意味は以下の通り。

| 値                                                   | 意味                                              |
| :--------------------------------------------------- | :------------------------------------------------ |
| テキスト(ダブルクォートまたはシングルクォートで囲う) | 入力したテキストがそのまま挿入される              |
| url(...)                                             | 指定した画像が挿入される。                        |
| attr(...)                                            | 指定した属性で指定されている文字列が挿入される。  |
| counter(...)                                         | カウンタ変数(後述)の値が挿入される。              |
| open-quote、close-quote                              | quotes プロパティで設定されている値が挿入される。 |
| none                                                 | コンテンツを追加しない                            |

使用例

```html
<style type="text/css">
  p.content::before {
    content: "「contentプロパティで挿入された文字です」";
  }
</style>
<p class="content">ここはp要素の内容です</p>
```

表示例

<style type="text/css">
p.content::before {
    content:"「contentプロパティで挿入された文字です」";
}
</style>
<p class="content">ここはp要素の内容です</p>
<hr>

## quotes プロパティ

quotes プロパティは、q 要素または content プロパティで引用符を追加(open-quote,close-quote)するときにどの引用符を使うかを指定するプロパティである。

使用するには、使う引用符を半角スペースで区切ってペアで指定する。

使用例

```html
<style type="text/css">
  q.quotes {
    quotes: "->->" "<-<-";
  }
</style>
<q class="quotes">ここはq要素で囲まれています</q>
```

表示例

<style type="text/css">
q.quotes {
    quotes:"->->" "<-<-";
}
</style>

<q class="quotes">ここは q 要素で囲まれています</q>

<hr>

## counter-reset プロパティ

counter-reset プロパティは、値をリセット(0 にする)したいカウンタ変数を指定するプロパティである。

値にはカウンタとして用いる変数を指定する。

(使用例は次とまとめる)

## counter-increment プロパティ

counter-increment プロパティは、カウンタ変数の値を 1 増やすプロパティである。

値にはカウンタとして用いる変数を指定する。

使用例

```html
<style type="text/css">
  body {
    counter-reset: chapter;
  }

  p.counter::before {
    counter-increment: chapter;
    content: counter(chapter);
  }
</style>
<p class="counter">p要素1個目</p>
<p class="counter">p要素2個目</p>
<p class="counter">p要素3個目</p>
<p class="counter">p要素4個目</p>
<p class="counter">p要素5個目</p>
```

表示例

<style type="text/css">
body {
    counter-reset: chapter;
}

p.counter::before {
    counter-increment: chapter;
    content: counter(chapter);
}
</style>
<p class="counter">p要素1個目</p>
<p class="counter">p要素2個目</p>
<p class="counter">p要素3個目</p>
<p class="counter">p要素4個目</p>
<p class="counter">p要素5個目</p>
<hr>
