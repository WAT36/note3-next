---
title: "その他の要素"
date: "2019-11-04T23:38:30.000Z"
excerpt: "ここで述べられていない、その他のHTML要素について"
tag: ["HTML"]
updatedAt: "2023-02-23T11:24:26.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

その他の要素についてを述べる。

# div 要素

div 要素はこれまでに述べた要素とは違い、決められた役割や意味を持たない要素である。

使うのに適切な要素が無い場合に利用する要素で、class 属性などを利用する事で用途を示す。

```
<body>
    <div class="question">問題</div>
    <div class="answer">答え</div>
</body>
```

# span 要素

span 要素も div 要素と同じく、決められた役割や意味を持たない要素である。

div 要素と違う点は、div 要素はブロックレベルの要素、span 要素はインライン要素という点。(詳しい意味は CSS の所で)

```
<body>
    <span class="question">問題</div>
    <span class="answer">答え</div>
</body>
```

# figure 要素

figure 要素は、それが文書から参照される、自己完結型のコンテンツ(フローコンテンツ)であることを示す要素である。

この要素の中には、図やソースコードなどを入れる。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="yyLvVor" data-pen-title="html-figure" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/yyLvVor">
  html-figure</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# figcaption 要素

figcaption 要素は、figure 要素で示したコンテンツにキャプションを示すための要素である。

使用例

```
<figure id="fig">
    <figcaption>宗谷岬の交差点</figcaption>
    <img src="/assets/note/frontend/html/img/img.jpg" width="100" height="100" alt="宗谷岬、青空">
</figure>
```

表示例

<figure id="fig">
    <figcaption>宗谷岬の交差点</figcaption>
    <img src="/assets/note/frontend/html/img/img.jpg" width="100" height="100" alt="宗谷岬、青空">
</figure>
<hr>

# details 要素

details 要素は、ディスクロージャーウィジェット(折りたたみ)を示すための要素である。

**open**属性を指定すると、最初から開かれた状態で表示される。

使用例

```
<details>
    <p>その１</p>
    <p>その２</p>
    <p>その３</p>
</details>
```

表示例

<details>
    <p>その１</p>
    <p>その２</p>
    <p>その３</p>
</details>
<hr>

# summary 要素

summary 要素は、ディスクロージャーウィジェットにおける見出しを示すための要素である。summary 要素で示された内容は、ディスクロージャーウィジェットが開いても開いてなくても表示される。

使用例

```
<details>
    <summary>リスト</summary>
    <p>その１</p>
    <p>その２</p>
    <p>その３</p>
</details>
```

表示例

<details>
    <summary>リスト</summary>
    <p>その１</p>
    <p>その２</p>
    <p>その３</p>
</details>
<hr>

# iframe 要素

iframe 要素は、文書の中で別の文書を表示する領域(ブラウジングコンテキスト)を示す要素である。

使用する主な属性は以下の通り。

| 属性   | 意味                     |
| :----- | :----------------------- |
| src    | 表示させる文書のアドレス |
| srcdoc | 表示させる HTML データ   |
| name   | 表示させる領域の名前     |
| width  | 横                       |
| height | 縦                       |

使用例は省略する。

# hr 要素

hr 要素は区切りのための水平線を引く要素である。段落・話題・場面が変わるところなどで利用する。

使用例

```
<hr>
```

表示例

<hr>

# script 要素

script 要素は、文書内に実行できるコードを組み込むための要素である。

コードは要素内容として直接書くか、src 属性にコードのアドレスを指定して読み込ませる。

例えば、HTML コード内で Javascript を適用させたい場合は、script タグを書き type 属性に`text/javascript`または`application/javascript`と指定し、内部に Javascript コードを記載する。

外部ファイルを組み込ませたい場合は、src 属性を書いてファイル名を指定する。

（以下例）

```html
・・・
<script type="text/javascript">
    //Javascriptコードを記載する
    //
</script>
・・・
<script src="組み込ませたい外部ファイル名">
・・・
```

<hr>

# noscript 要素

noscript 要素は、script 要素で組み込んだコード(スクリプト)が無効であった場合に利用される要素である。

よって、コード(スクリプト)が有効なときには、この要素は実行されない。

<hr>

# template 要素

template 要素は、その部分がコードによって挿入される部分であることを示す。

<hr>

# canvas 要素

canvas 要素は、コードによって図を描画したいときに利用する要素である。

これとは別に描画を行うコード(JavaScript など)を用意し、それにより描画されたビットマップイメージが入る。

canvas 要素が実行できない環境では、要素内容に指定した内容が表示される。

(以上、使用例は js やれるようになったらやります・・・)
