---
title: "DOM"
excerpt: ""
coverImage: ""
date: "2025-03-17T23:11:29.000Z"
updatedAt: "2025-03-17T23:11:29.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

DOM とは Document Object Model の略で、HTML(または XML)の各要素にアクセスするための仕組みである。Javascript ではこれを用いて、HTML を操作することが可能になる。

## DOM ツリー

DOM ツリーとは、HTML や XML の構成をツリー状に表現したものである。

例えば、以下のような HTML があったとする。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>タイトル</title>
  </head>

  <body>
    <h1>見出し1</h1>
    <div id="main">
      <p>Hello!</p>
      <p>World!</p>
    </div>
  </body>
</html>
```

表示例

<hr>
<iframe width="400" height="300" src="/js_sample_pages/dom_sample.html">
</iframe>
<hr>

これを DOM ツリーで書き表すと以下のようになる。

<img src="/img/front-end/dom.png" width=100%>

また、この DOM ツリー内の各要素を**ノード**と言う。

## 要素の取得方法

では、Javascript からこの DOM をどのように操作するのか？まずは、このノード(要素)を取得する方法についてを述べる。

### ID 名で取得

Javascript から、要素の ID 名を使ってノードを取得する方法は以下の通り。

```javascript
document.getElementById("ID名");
```

実際に実行してみよう。先程のサンプルページをブラウザで開き、Javascript コンソールを起動して入力・適用すると以下のようになる。

```
> var main = document.getElementById('main')
< undefined
> console.log(main)
[Log] <div id="main">
<p>Hello!</p>
<p>World!</p>
</div>
< undefined
```

最後の console.log において、id が'main'の要素を取得し表示している。

### タグ名での取得

タグ名での取得は以下の通り。

```javascript
document.getElementsByTagName("タグ名");
```

同様に、先程記載した例の HTML に適用すると以下のようになり、p 要素を取得している。

```
> var p = document.getElementsByTagName('p');
< undefined
> console.log(p)
[Log] HTMLCollection (2)
0
<p>Hello!</p>
1
<p>World!</p>

< undefined
```

### クラス名で取得

同様に、要素のクラス名を使ってノードを取得する方法は以下の通り。

```javascript
document.getElementsByClassName("クラス名");
```

### 親要素を取得

Javascript で取得したノードの親要素を取得するには、**parentNode**を使用する。

先程の'ID 名で取得'で取得したノードの親要素を取得する例を以下に示す。

```javascript
//ID名で取得
var id = document.getElementById("ID名");

//親要素の取得
var parent = id.parentNode;
```

使用例

```
> var id = document.getElementById('main')
< undefined
> var parent = id.parentNode
< undefined
> console.log(parent)
[Log] <body>
<h1>見出し1</h1>
<div id="main">
<p>Hello!</p>
<p>World!</p>
</div>
</body>

< undefined
```

### 子要素の取得

子要素を取得する方法はいくつかある。

子要素のうち最初の要素を取得するには**firstChild**、最後の要素は**lastChild**、子要素を全て配列として取得するには**childNodes**を利用する。

```javascript
//例、ID名で取得
var id = document.getElementById("ID名");

//子要素のうち最初の要素を取得
var first = id.firstChild;

//子要素のうち最後の要素を取得
var last = id.lastChild;

//子要素を全て配列として取得
var child = id.childNodes;
```

使用例

```
> var id = document.getElementById('main');
< undefined
> var first = id.firstChild;
< undefined
> console.log(first)
[Log] #text "
        "
< undefined
> var last = id.lastChild;
< undefined
> console.log(last);
[Log] #text "
    "
< undefined
> var child = id.childNodes;
< undefined
> console.log(child)
[Log] NodeList (5)
0 #text " "
1
<p>Hello!</p>
2 #text " "
3
<p>World!</p>
4 #text " "

< undefined
```

### 要素の情報の取得

例で示した HTML において、取得した要素の内部の情報は、**innerText**を使うことで取得できる。

```javascript
var target = document.getElementById("main").firstElementChild;

//要素の内部の情報(テキスト)を取得
var text = target.innerText;
console.log(text);
```

### フォームの取得

HTML のフォームを取得するには、**forms**を利用する。

document.forms とする事で、HTML 文書内のフォームを全て取得できる。フォームが複数あった場合は、配列として取得できる。

```javascript
//フォームを全て取得
var forms = document.forms;
```

### その他の要素を取得するプロパティ

その他、DOM の特定の要素を取得するプロパティは以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">プロパティ名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">previousSibling</td>
        <td style="border:none;">同じ階層で前にある要素</td>
    </tr>
    <tr>
        <td style="border:none;">nextSibling</td>
        <td style="border:none;">同じ階層で後にある要素</td>
    </tr>
    <tr>
        <td style="border:none;">attributes</td>
        <td style="border:none;">ノードの属性リスト</td>
    </tr>
    <tr>
        <td style="border:none;">className</td>
        <td style="border:none;">クラス名</td>
    </tr>
    <tr>
        <td style="border:none;">clientWidth</td>
        <td style="border:none;">要素の幅</td>
    </tr>
    <tr>
        <td style="border:none;">clientHeight</td>
        <td style="border:none;">要素の高さ</td>
    </tr>
    <tr>
        <td style="border:none;">clientLeft</td>
        <td style="border:none;">要素の左ボーダーの幅</td>
    </tr>
    <tr>
        <td style="border:none;">clientTop</td>
        <td style="border:none;">要素の上ボーダーの幅</td>
    </tr>
    <tr>
        <td style="border:none;">dir</td>
        <td style="border:none;">テキストの方向</td>
    </tr>
    <tr>
        <td style="border:none;">innerHTML</td>
        <td style="border:none;">ノード内のHTML要素</td>
    </tr>
    <tr>
        <td style="border:none;">innerText,textContent</td>
        <td style="border:none;">ノード内のプレーンテキスト</td>
    </tr>
    <tr>
        <td style="border:none;">lang</td>
        <td style="border:none;">言語</td>
    </tr>
    <tr>
        <td style="border:none;">namespaceURI</td>
        <td style="border:none;">名前空間のURI</td>
    </tr>
    <tr>
        <td style="border:none;">nodeName</td>
        <td style="border:none;">ノードの名前</td>
    </tr>
    <tr>
        <td style="border:none;">nodeType</td>
        <td style="border:none;">ノードの型</td>
    </tr>
    <tr>
        <td style="border:none;">nodeValue</td>
        <td style="border:none;">ノードの値</td>
    </tr>
    <tr>
        <td style="border:none;">prefix</td>
        <td style="border:none;">名前空間の識別子</td>
    </tr>
    <tr>
        <td style="border:none;">style</td>
        <td style="border:none;">要素のstyle属性の宣言オブジェクト</td>
    </tr>
    <tr>
        <td style="border:none;">tagName</td>
        <td style="border:none;">要素名</td>
    </tr>
    <tr>
        <td style="border:none;">tabIndex</td>
        <td style="border:none;">要素のタブインデックス番号</td>
    </tr>
    <tr>
        <td style="border:none;">title</td>
        <td style="border:none;">タイトル属性</td>
    </tr>
</table>

## DOM の操作方法

DOM で取得した要素の操作方法について述べる。

### 要素の情報の変更

取得した要素の内部の情報を変更するのも、**innerText**を使うことで行える。

```javascript
var target = document.getElementById("main").firstElementChild;

//要素の内部の情報(テキスト)を変更する
target.innerText = "テキストを変更しました";
```

使用例

```
> var target = document.getElementById('main').firstElementChild;
< undefined
> target.innerText = 'テキストが変更されました'
< "テキストが変更されました"
```

適用後の画面(スクショ)

<img src="/img/front-end/dom_changed.png">

### 要素の削除

取得した要素を削除したいときは**removeChild()**メソッドを利用する。

ただし、removeChild()メソッドは、その名の通り消したい要素の親要素で利用する。消したい要素から呼び出すのではないので注意。

親要素を呼び出したい時は、**parentNode**を利用する。

```javascript
var target = document.getElementById("main").firstElementChild;

//要素を削除する
target.parentNode.removeChild(target);
```

使用例

```
> var target = document.getElementById('main').firstElementChild;
< undefined
> target.parentNode.removeChild(target);
< <p>Hello!</p>
```

適用後の画面(スクショ)

<img src="/img/front-end/dom_changed2.png">

### 要素の追加

要素を追加したい時は、<u>要素の作成</u>と<u>要素の挿入</u>の２ステップが必要になる。

要素の作成には、**createElement('タグ名')**を利用する。

その後、要素を挿入するには**appendChild(子要素)**を利用する。

このメソッドは、その名の通り、呼び出した要素の子要素を追加するメソッドである。

```javascript
var target = document.createElement("p");
target.innerText = "追加された要素";

//要素を挿入する
var main = document.getElementById("main");
main.appendChild(target);
```

使用例

```
> var target = document.createElement('p');
< undefined
> target.innerText = '追加された要素';
< "追加された要素"
> var main = document.getElementById('main');
< undefined
> main.appendChild(target);
< <p>追加された要素</p>
```

適用後の画面(スクショ)

<img src="/img/front-end/dom_changed3.png">

### セレクタ API

セレクタ API と言うメソッドを使って要素を取得する方法がある。

例としては、**querySelector()**メソッドや**querySelectorAll()**メソッドを使う。querySelector メソッドを使うと、該当する要素のうち最初の要素のみを取得し、qurySelectorAll メソッドは該当する要素を全て取得する。

```javascript
var target = document.querySelectorAll("p");

//要素を変更する
for (var i = 0, l = target.length; i < l; i++) {
  target[i].style.color = "red";
}
```

使用例

```
> var target = document.querySelectorAll('p');
< undefined
> for(var i=0,l=target.length;i<l;i++){
    target[i].style.color='red';
}
< "red"
```

適用後の画面(スクショ)

<img src="/img/front-end/dom_changed4.png">

### その他の DOM を操作するメソッド

その他、DOM を操作するメソッドは以下の通り。

<table style="border:none;">
    <tr>
        <th style="border:none;">メソッド名</td>
        <th style="border:none;">意味</td>
    </tr>
    <tr>
        <td style="border:none;">createAttribute()</td>
        <td style="border:none;">属性のノードを作成</td>
    </tr>
    <tr>
        <td style="border:none;">createTextNode()</td>
        <td style="border:none;">テキストのノードを作成</td>
    </tr>
    <tr>
        <td style="border:none;">createComment()</td>
        <td style="border:none;">HTMLのコメントのノードを作成</td>
    </tr>
    <tr>
        <td style="border:none;">createEntryReference()</td>
        <td style="border:none;">実態を参照するノードを作成</td>
    </tr>
    <tr>
        <td style="border:none;">createProcessingInstruction()</td>
        <td style="border:none;">処理命令のノードを作成</td>
    </tr>
    <tr>
        <td style="border:none;">insertBefore()</td>
        <td style="border:none;">指定したノードの直前に追加</td>
    </tr>
    <tr>
        <td style="border:none;">setAttributeNode()</td>
        <td style="border:none;">指定された属性ノードを追加</td>
    </tr>
    <tr>
        <td style="border:none;">hasAttribute()</td>
        <td style="border:none;">指定された属性の有無を返す</td>
    </tr>
    <tr>
        <td style="border:none;">removeAttribute()</td>
        <td style="border:none;">指定された属性の削除</td>
    </tr>
</table>
