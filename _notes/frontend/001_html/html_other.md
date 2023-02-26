---
title: "その他の要素"
date: "2019-11-04T23:38:30.000Z"
excerpt: 'ここで述べられていない、その他のHTML要素について'
tag: ["HTML"]
updatedAt: '2023-02-23T11:24:26.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
---


その他の要素についてを述べる。

# div要素

div要素はこれまでに述べた要素とは違い、決められた役割や意味を持たない要素である。

使うのに適切な要素が無い場合に利用する要素で、class属性などを利用する事で用途を示す。

```
<body>
    <div class="question">問題</div>
    <div class="answer">答え</div>
</body>
```

# span要素

span要素もdiv要素と同じく、決められた役割や意味を持たない要素である。

div要素と違う点は、div要素はブロックレベルの要素、span要素はインライン要素という点。(詳しい意味はCSSの所で)

```
<body>
    <span class="question">問題</div>
    <span class="answer">答え</div>
</body>
```


# figure要素

figure要素は、それが文書から参照される、自己完結型のコンテンツ(フローコンテンツ)であることを示す要素である。

この要素の中には、図やソースコードなどを入れる。

使用例

```
<figure id="fig">
    <img src="/assets/note/frontend/html/img/img.jpg" width="100" height="100" alt="宗谷岬、青空">
</figure>
```

表示例

<figure id="fig">
    <img src="/assets/note/frontend/html/img/img.jpg" width="100" height="100" alt="宗谷岬、青空">
</figure>
<hr>


# figcaption要素

figcaption要素は、figure要素で示したコンテンツにキャプションを示すための要素である。

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


# details要素

details要素は、ディスクロージャーウィジェット(折りたたみ)を示すための要素である。

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

# summary要素

summary要素は、ディスクロージャーウィジェットにおける見出しを示すための要素である。summary要素で示された内容は、ディスクロージャーウィジェットが開いても開いてなくても表示される。

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


# iframe要素

iframe要素は、文書の中で別の文書を表示する領域(ブラウジングコンテキスト)を示す要素である。

使用する主な属性は以下の通り。

|属性|意味|
|:---|:---|
|src|表示させる文書のアドレス|
|srcdoc|表示させるHTMLデータ|
|name|表示させる領域の名前|
|width|横|
|height|縦|

使用例は省略する。



# hr要素

hr要素は区切りのための水平線を引く要素である。段落・話題・場面が変わるところなどで利用する。


使用例

```
<hr>
```

表示例

<hr>


# script要素

script要素は、文書内に実行できるコードを組み込むための要素である。

コードは要素内容として直接書くか、src属性にコードのアドレスを指定して読み込ませる。

例えば、HTMLコード内でJavascriptを適用させたい場合は、scriptタグを書きtype属性に```text/javascript```または```application/javascript```と指定し、内部にJavascriptコードを記載する。

外部ファイルを組み込ませたい場合は、src属性を書いてファイル名を指定する。

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

# noscript要素

noscript要素は、script要素で組み込んだコード(スクリプト)が無効であった場合に利用される要素である。

よって、コード(スクリプト)が有効なときには、この要素は実行されない。

<hr>

# template要素

template要素は、その部分がコードによって挿入される部分であることを示す。

<hr>

# canvas要素

canvas要素は、コードによって図を描画したいときに利用する要素である。

これとは別に描画を行うコード(JavaScriptなど)を用意し、それにより描画されたビットマップイメージが入る。

canvas要素が実行できない環境では、要素内容に指定した内容が表示される。

(以上、使用例はjsやれるようになったらやります・・・)
