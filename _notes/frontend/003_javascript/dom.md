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

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="LEYQbMy" data-pen-title="js-dom-sample" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/LEYQbMy">
  js-dom-sample</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

これを DOM ツリーで書き表すと以下のようになる。

<img src="/assets/note/frontend/js/dom.png" width=100%>

また、この DOM ツリー内の各要素を**ノード**と言う。

## 要素の取得方法

では、Javascript からこの DOM をどのように操作するのか？まずは、このノード(要素)を取得する方法についてを述べる。

### ID 名で取得

Javascript から、要素の ID 名を使ってノードを取得する方法は以下の通り。

```javascript
document.getElementById("ID名");
```

実際に確認してみよう。先程のサンプルページにおいて、Javascript で getElementById を利用して取得した結果は以下のようになる。
（表示に使用している CODEPEN というライブラリでは、現状このページで Javascript のコンソール出力を確認できないため、確認したい方は右上の「EDIT ON CODEPEN」>左下の「Console」を見て確認してください。）

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="zxYRoQB" data-pen-title="js-getElementById" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/zxYRoQB">
  js-getElementById</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

HTML 側最後の箇所において、取得結果を表示している。

### タグ名での取得

タグ名での取得は以下の通り。

```javascript
document.getElementsByTagName("タグ名");
```

同様に、先程記載した例の HTML に適用すると以下のようになり、p 要素を取得している。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="JojpxxR" data-pen-title="js-getElementsByTagName" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/JojpxxR">
  js-getElementsByTagName</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

### クラス名で取得

同様に、要素のクラス名を使ってノードを取得する方法は以下の通り。例は同じなので割愛する。

```javascript
document.getElementsByClassName("クラス名");
```

### 親要素を取得

Javascript で取得したノードの親要素を取得するには、**parentNode**を使用する。

先程の'ID 名で取得'で取得したノードの親要素を取得する例を以下に示す。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="raNJPXO" data-pen-title="js-parentNode" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/raNJPXO">
  js-parentNode</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

### 子要素の取得

子要素を取得する方法はいくつかある。

子要素のうち最初の要素を取得するには**firstElementChild**、最後の要素は**lastElementChild**、子要素を全て配列として取得するには**childNodes**を利用する。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="EaxQMjg" data-pen-title="js-childNode" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/EaxQMjg">
  js-childNode</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

### 要素の情報の取得

例で示した HTML において、取得した要素の内部の情報は、**innerText**を使うことで取得できる。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="mydXgeN" data-pen-title="js-innerText" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/mydXgeN">
  js-innerText</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

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

例を以下に記載する。HTML コード内では"Hello!"になっているが、Javascript により"テキストを変更しました"と変えられて表示されている。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PwoQgNw" data-pen-title="js-innerText2" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/PwoQgNw">
  js-innerText2</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

### 要素の削除

取得した要素を削除したいときは**removeChild()**メソッドを利用する。

ただし、removeChild()メソッドは、その名の通り消したい要素の親要素で利用する。消したい要素から呼び出すのではないので注意。

親要素を呼び出したい時は、**parentNode**を利用する。

使用例。removeChild()で"main"内の最初の要素 Hello!が削除されて表示される。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="JojLrro" data-pen-title="js-removeChild" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/JojLrro">
  js-removeChild</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

### 要素の追加

要素を追加したい時は、<u>要素の作成</u>と<u>要素の挿入</u>の２ステップが必要になる。

要素の作成には、**createElement('タグ名')**を利用する。

その後、要素を挿入するには**appendChild(子要素)**を利用する。

このメソッドは、その名の通り、呼び出した要素の子要素を追加するメソッドである。

使用例を以下に示す。appendChild()で末尾に新しい要素が追加される。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ByarwJJ" data-pen-title="js-createElement" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/ByarwJJ">
  js-createElement</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

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
