---
title: "レスポンシブWebデザイン"
date: "2023-03-21T14:26:21.000Z"
excerpt: 'レスポンシブWebデザインについて'
tag: ["Web","HTML","CSS"]
updatedAt: '2023-03-21T14:26:21.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
link:
  css: ['/assets/note/frontend/web_other/mediaquery.css']
---

# レスポンシブWebデザイン

レスポンシブWebデザインについて。

レスポンシブWebデザインとは、1つのHTMLを画面幅などの特性が異なったデバイスに応じて、自動的にレイアウトやデザインを変更しそれぞれに対応させるといったWebサイトの開発手法の一つである。

現代では様々なタイプのPCに加え、スマートフォンやタブレットのような機器までもが登場し、またその種類も多様化してきている。

また、その度に各機器用のHTMLを作成していると、開発や運用も大変になる。

そのため、なるべく多くの機器に少ないHTMLファイルで対応できるように、このような開発手法が登場した。

このような方法を実装するには、各機器用のCSSを用意し、必要に応じて切り替えて利用する方法(CSSメディアクエリ)が使われる。

## メリットとデメリット

レスポンシブWebデザインのメリットとデメリットにはどのようなものがあるだろうか。

まず、メリットとしては

- 作るHTMLは1つで済み、開発運用コストが削減できる
- 画面サイズさえ合えば、現在存在しない機器にも対応可能
- HTMLは1つなので、特定デバイス向けのサイトは作らずに済む。またそのようなサイトがある場合と比べ、リダイレクトの時間を削減できる。

デメリットとしては

- 1つのHTMLを複数のCSSで使い回すような構造は逆に困難・高コストになる場合もある
- HTML/CSSの容量が大きくなる時もあり、場合によってはページ表示や動作が遅くなることもある
- 画面遷移の変更には対応できない

のようなものがある。


# レスポンシブWebデザインで用いる技術

レスポンシブWebデザインに必要な技術についてを述べる。


## メディアクエリ

メディアクエリとはCSSの仕様の1つで、機器の特性に応じてCSSを切り替える方式である。レスポンシブWebデザインのキーとなる技術である。

設定方法は2つあり、1つはHTMLのlink要素でCSSファイルを読み込む際に、**media属性**を利用する方法である。

例

```html
<link rel="stylesheet" media="screen and (max-width:500px)" href="style.css">
```

この例は、幅が500px以内の画面に対し、指定したCSSを適用する、と言う意味になる。（具体的な属性名などの意味は後述）

もう1つは、CSSに@**media**識別子を利用して条件を記述する方法である。

例

```css
@media screen and (max-width:500px) {
}
```

これらの設定方法において、設定する値は**メディア型**と呼ばれる対象とするメディアを示す値、そして**メディア特性**と呼ばれる幅や高さといった情報を示す値である。値は空白区切りで複数設定できる。


メディア型の値は以下の通り。

<table style="border:none;">
    <thead>
        <th style="border:none;">値</th>
        <th style="border:none;">意味</th>
    </thead>
    <tr>
        <td style="border:none;">all</td>
        <td style="border:none;">全ての機器</td>
    </tr>
    <tr>
        <td style="border:none;">screen</td>
        <td style="border:none;">PCやスマートフォンなどの画面</td>
    </tr>
    <tr>
        <td style="border:none;">print</td>
        <td style="border:none;">プリンタ</td>
    </tr>
    <tr>
        <td style="border:none;">projection</td>
        <td style="border:none;">プロジェクタ</td>
    </tr>
    <tr>
        <td style="border:none;">tv</td>
        <td style="border:none;">テレビ</td>
    </tr>
    <tr>
        <td style="border:none;">handheld</td>
        <td style="border:none;">携帯用機器</td>
    </tr>
    <tr>
        <td style="border:none;">tty</td>
        <td style="border:none;">文字幅が固定の端末</td>
    </tr>
    <tr>
        <td style="border:none;">speech</td>
        <td style="border:none;">スピーチ・シンセサイザー</td>
    </tr>
    <tr>
        <td style="border:none;">braille</td>
        <td style="border:none;">点字ディスプレイ</td>
    </tr>
</table>


メディア特性の値は以下の通り。


<table style="border:none;">
    <thead>
        <th style="border:none;">値</th>
        <th style="border:none;">意味</th>
    </thead>
    <tr>
        <td style="border:none;">width<br>min-width<br>max-width</td>
        <td style="border:none;">画面の幅(の最小/最大値)</td>
    </tr>
    <tr>
        <td style="border:none;">height<br>min-height<br>max-height</td>
        <td style="border:none;">画面の高さ(の最小/最大値)</td>
    </tr>
    <tr>
        <td style="border:none;">device-width<br>device-min-width<br>device-max-width</td>
        <td style="border:none;">デバイスの幅(の最小/最大値)</td>
    </tr>
    <tr>
        <td style="border:none;">device-height<br>device-min-height<br>device-max-height</td>
        <td style="border:none;">デバイスの高さ(の最小/最大値)</td>
    </tr>
    <tr>
        <td style="border:none;">aspect-ratio<br>min-aspect-ratio<br>max-aspect-ratio</td>
        <td style="border:none;">画面のアスペクト比(の最小/最大値)。水平/垂直の整数で指定</td>
    </tr>
    <tr>
        <td style="border:none;">device-aspect-ratio<br>min-device-aspect-ratio<br>max-device-aspect-ratio</td>
        <td style="border:none;">デバイスのアスペクト比(の最小/最大値)。水平/垂直の整数で指定</td>
    </tr>
    <tr>
        <td style="border:none;">grid</td>
        <td style="border:none;">グリッド(1)かそれ以外(0)の画面であるか</td>
    </tr>
    <tr>
        <td style="border:none;">resolution<br>min-resolution<br>max-resolution</td>
        <td style="border:none;">デバイスの解像度(の最小/最大値)</td>
    </tr>
</table>


使用例(css)

```css
@media screen and (min-width:0px){
    p.mediaquery{
      color: greenyellow;
    }
}
  
@media screen and (min-width:300px){
    p.mediaquery{
      color: red;
    }
}
  
@media screen and (min-width:600px){
    p.mediaquery{
      color: blue;
    }
}
```

(html)

```html
<p class="mediaquery">メディアクエリのテスト</p>

<p class="mediaquery">幅0px以上で緑、幅300px以上で赤、幅600px以上で青になるはず。</p>

<p class="mediaquery">ブラウザの幅を変えると色が変化します</p>
```


表示例

<p class="mediaquery">メディアクエリのテスト</p>

<p class="mediaquery">幅0px以上で緑、幅300px以上で赤、幅600px以上で青になるはず。</p>

<p class="mediaquery">ブラウザの幅を変えると色が変化します</p>

---

## 可変グリッド

可変グリッドとは、グリッドの幅がウィンドウ幅に応じて変化するシステムである。

グリッドとは、基準となるラインを設定し、そのラインに沿って画像やテキストを配置する方式である。

グリッドのラインがコンテンツを配置する基準となっているので、見やすいデザインを作ることができる。

実装するには、グリッド幅に関してはCSSで幅を%などの相対値で指定することによって実現させる。

または、Javascriptなどのライブラリやフレームワークを使ってCSSを動的に変更させて実装する方法もある。


## 可変イメージ

可変イメージとは、画像をウィンドウ幅に応じて変更していく手法である。

可変イメージは、img要素の「max-width」属性を100%とすれば実現可能となる。


使用例

```html
<img src="/assets/note/frontend/html/img/img.jpg" style="max-width: 100%">
```

表示例（ブラウザの幅を変えるとサイズが変化します）

<img src="/assets/note/frontend/html/img/img.jpg" style="max-width: 100%">



## ビューポート

ビューポートとは、ブラウザの表示領域のことである。Webブラウザでサイトを閲覧する時は、ビューポートのサイズをもとにコンテンツが表示される。

ビューポートの幅や高さは、スマートフォンなどのデバイスのそれとは異なることが多い。そのため、デバイスによっては、サイトを表示するとコンテンツが小さく表示される場合があるので、注意が必要である。

ビューポートに関する指定は、HTMLのmeta要素で行う。name属性に**viewport**を指定し、content属性にそれぞれ値を指定する。

指定できるプロパティと意味は以下の通り。

<table style="border:none;">
    <thead>
        <th style="border:none;">値</th>
        <th style="border:none;">意味</th>
    </thead>
    <tr>
        <td style="border:none;">width</td>
        <td style="border:none;">ビューポートの幅</td>
    </tr>
    <tr>
        <td style="border:none;">height</td>
        <td style="border:none;">ビューポートの高さ</td>
    </tr>
    <tr>
        <td style="border:none;">initial-scale</td>
        <td style="border:none;">表示倍率の初期値</td>
    </tr>
    <tr>
        <td style="border:none;">minimum-scale</td>
        <td style="border:none;">表示倍率の最小値</td>
    </tr>
    <tr>
        <td style="border:none;">maximum-scale</td>
        <td style="border:none;">表示位置の最大値</td>
    </tr>
</table>


## リセットCSS

各Webブラウザには、デフォルトでCSSが設定されており、開発者側でCSSを設定しなくてもWebブラウザが設定しているCSSにより、サイトのコンテンツの表示が変わることがある。

しかし、このWebブラウザが設定しているCSSを考慮しないまま開発者側でCSSを作っていくと、あるブラウザではうまく表示されても別のブラウザでは表示されなくなる、と言うような事態が起きる場合もある。

そのため、このブラウザによるCSSを打ち消し、ブラウザ間の表示を揃えるためのCSSをまずは適用させる。このようなCSSを**リセットCSS**と言う。

リセットCSSはオープンソースとして公開されているものがいくつかあり、それを利用する場合が多い。
