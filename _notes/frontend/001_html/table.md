---
title: "テーブル(表)"
date: "2019-11-04T23:37:30.000Z"
excerpt: "HTMLでのテーブル(表)について"
tag: ["HTML"]
updatedAt: "2023-02-21T08:40:39.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

テーブル(表)を作る要素についてを述べる。

# table 要素

table 要素は１つのテーブル(表)を表す要素である。

table 要素の中で後述の行や列を表す要素を定義していく。

一般的には、次の順で定義する。

- caption 要素
- colgroup 要素
- thead 要素
- tbody 要素
- tr 要素
- tfoot 要素

これら及び、他の table 要素内で利用する要素についてを以下で述べていく。

## tr 要素

tr 要素(table row の略)は、テーブルの１行を表すための要素である。

具体的な使用例については、以下の td 要素で共に示す。

## td 要素

td 要素(table data cell の略)は、テーブルの１行内の１列分のデータ(セル)を表すための要素である。

先の table 要素、tr 要素を含め、使用例を以下に示す。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xbxprbX" data-pen-title="html-table" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/xbxprbX">
  html-table</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## th 要素

th 要素(table header cell の略)は、見出し用のデータ(セル)を表すための要素である。

使用例を以下に示す。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="zxYpzGz" data-pen-title="html-th" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/zxYpzGz">
  html-th</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## thead 要素

thead 要素(table header の略)は、見出しとなるデータ(セル)をグループ化する要素である。

thead 要素の中には、見出しとする tr 要素を入れる。

使用例を以下に示す。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="pvopwjy" data-pen-title="html-thead" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/pvopwjy">
  html-thead</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## tbody 要素

tbody 要素(table body の略)は、表の本体の部分をグループ化して表す要素である。

使用例を以下に示す。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="LEYeLpd" data-pen-title="html-tbody" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/LEYeLpd">
  html-tbody</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## tfoot 要素

tfoot 要素(table footer の略)は、表のフッター部分を表す要素である。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="emYyRJg" data-pen-title="html-tfoot" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/emYyRJg">
  html-tfoot</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## caption 要素

caption 要素は、表のキャプション(タイトル)を示すための要素である。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="JojMwGx" data-pen-title="html-caption" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/JojMwGx">
  html-caption</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## colgroup 要素

colgroup 要素は、表の列をグループ化する要素である。

span 属性でグループ化する列数を指定し、そこに width などの属性を適用してやると、その列のセル全体に適用される。

使用例

```
<table>
    <caption>行列のインデックス</caption>
    <colgroup span="2" width="100">
    <colgroup span="1" width="200">
    <thead>
        <tr>
            <th>0,0</th>
            <th>0,1</th>
            <th>0,2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1,0</td>
            <td>1,1</td>
            <td>1,2</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>2,0</td>
            <td>2,1</td>
            <td>2,2</td>
        </tr>
    </tfoot>
</table>
```

表示例

<table>
    <caption>行列のインデックス</caption>
    <colgroup span="2" width="100">
    <colgroup span="1" width="200">
    <thead>
        <tr>
            <th>0,0</th>
            <th>0,1</th>
            <th>0,2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1,0</td>
            <td>1,1</td>
            <td>1,2</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>2,0</td>
            <td>2,1</td>
            <td>2,2</td>
        </tr>
    </tfoot>
</table>
<hr>

## col 要素

col 要素は、**span 属性のない**colgroup 要素によって表された１列以上の縦列を表す要素である。

使用するには colgroup 要素の中で利用する。

使用例

```
<table>
    <caption>行列のインデックス</caption>
    <colgroup>
        <col span="1" width="50">
        <col span="1" width="100">
    </colgroup>
    <colgroup span="1" width="200">
    <thead>
        <tr>
            <th>0,0</th>
            <th>0,1</th>
            <th>0,2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1,0</td>
            <td>1,1</td>
            <td>1,2</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>2,0</td>
            <td>2,1</td>
            <td>2,2</td>
        </tr>
    </tfoot>
</table>
```

表示例

<table>
    <caption>行列のインデックス</caption>
    <colgroup>
        <col span="1" width="50">
        <col span="1" width="100">
    </colgroup>
    <colgroup span="1" width="200">
    <thead>
        <tr>
            <th>0,0</th>
            <th>0,1</th>
            <th>0,2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1,0</td>
            <td>1,1</td>
            <td>1,2</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>2,0</td>
            <td>2,1</td>
            <td>2,2</td>
        </tr>
    </tfoot>
</table>
<hr>
