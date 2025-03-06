---
title: "グローバル属性"
date: "2019-11-04T19:34:30.000Z"
excerpt: "HTMLファイルの大まかな構成について"
tag: ["HTML"]
updatedAt: "2023-02-09T23:15:39.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

グローバル属性とは**全ての要素で指定できる属性**のことを言う。

主に以下のものが挙げられる。

# class 属性

class 属性は、要素に種類・分類(クラス)名を指定するための属性である。

複数の別の要素に同じ名前を指定することができ、そのクラス名を指定するとそれが class 属性に指定されている要素全てが該当されることになる。

スペースで区切れば複数のクラス名を指定することもできる。

CSS などを使うときに、指定した要素全てに css を適用させたい時などによく利用される。

```
<p class="class1">
<p class="class class2 class3">
```

# id 属性

id 属性は、それを指定した要素に一意の名前をつける属性である。

一意の名前なので、同じページ内の他の要素の id 属性に同じ名前をつけることはできない。class 属性とはここが異なる。

id 属性は、ページ内の特定の要素にリンクさせたい場合、また先程の CSS 等で特定の要素にのみ CSS を適用したい場合に用いられる。

```
<p id="id1">
<p id="id2">
```

# lang 属性

lang 属性は要素、属性の言語が何であるかを示す属性である。具体的には、RFC5646（BCP47）で定められた言語コードを入力する。

例えば日本語だと「"ja"」、英語であれば「"en"」、アメリカ英語なら「"en-US"」と指定する。（日本語には、日本での日本語という意味で「"ja-JP"」という値も用意されている。）

lang 属性は HTML 文書全体に適用されるように、html タグに描かれることが多い。

```
<html lang="ja">
```

# title 属性

title 属性は、その要素の補足的な内容を提供するための属性である。

一般的には、ブラウザでカーソルを要素の上に乗せた時にツールチップで表示されるものである。

(使用例、下の"テスト"の上にカーソルを置いてみると・・)

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WbNpqmB" data-pen-title="html-title" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/WbNpqmB">
  html-title</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# dir 属性

dir 属性は、要素のテキストを表示する方向を定義する属性である。設定する値は "ltr"(左から右)、"rtl"(右から左)、"auto"(自動)のいずれかである。

要素をドラッグして範囲選択すると、選択した時の方向が異なる。

(使用例)

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jEOBjRg" data-pen-title="html-dir" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/jEOBjRg">
  html-dir</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# tabindex 属性

tabindex 属性は、Tab キーを押した時のフォーカスの移動順序を示す属性である。tabindex 属性を指定した要素はフォーカスによる移動が可能になる。

1 以上の値を指定した場合はその値の順番通りに移動し、０を指定した場合は要素が出現する順番通りに移動する。

(使用例、Tab を押すと数字の順番通りに移動する)

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RNwgwrG" data-pen-title="html-tabindex" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/RNwgwrG">
  html-tabindex</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# dropzone 属性

dropzone 属性は、その要素にファイルなどをドロップすることが可能な領域であることを示す。

指定する値には"copy"(コピーされる)、"move"(移動する)、"link"(リンクが作成される)がある。ドロップされたデータの処理方法に応じ使い分ける。

# カスタムデータ属性

カスタムデータ属性とは、自分独自に設定できるオリジナルの属性である。使用するのに良い属性などがない場合に利用する、

ただし制約があり、属性名は必ず「data-」という文字列から始まるようにしないといけない。

主に CSS や JavaScript で値を取得するときなどに使われる。

```
<p data-id="1">その１</p>
<p data-id="2">その２</p>
```

# その他のグローバル属性

他、紹介し切れてない主なグローバル属性は以下の通り（この他にもあります）

| グローバル属性  | 意味                                     |
| :-------------- | :--------------------------------------- |
| contenteditable | 要素を編集可能にするかどうか(true/false) |
| spellcheck      | スペル・文法チェックをするか(true/false) |
| hidden          | 要素を表示しない(属性名だけで指定可)     |
