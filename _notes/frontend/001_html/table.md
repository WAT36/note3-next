---
title: "テーブル(表)"
date: "2019-11-04T23:37:30.000Z"
excerpt: 'HTMLでのテーブル(表)について'
tag: ["HTML"]
updatedAt: '2023-02-21T08:40:39.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
---

テーブル(表)を作る要素についてを述べる。

# table要素

table要素は１つのテーブル(表)を表す要素である。

table要素の中で後述の行や列を表す要素を定義していく。

一般的には、次の順で定義する。

- caption要素
- colgroup要素
- thead要素
- tbody要素
- tr要素
- tfoot要素

これら及び、他のtable要素内で利用する要素についてを以下で述べていく。

## tr要素

tr要素(table rowの略)は、テーブルの１行を表すための要素である。

具体的な使用例については、以下のtd要素で共に示す。

## td要素

td要素(table data cellの略)は、テーブルの１行内の１列分のデータ(セル)を表すための要素である。

先のtable要素、tr要素を含め、使用例を以下に示す。

```
<table>
    <tr>
        <td>0,0</td>
        <td>0,1</td>
    </tr>
    <tr>
        <td>1,0</td>
        <td>1,1</td>
    </tr>
</table>
```

表示例

<table>
    <tr>
        <td>0,0</td>
        <td>0,1</td>
    </tr>
    <tr>
        <td>1,0</td>
        <td>1,1</td>
    </tr>
</table>
<hr>


## th要素

th要素(table header cellの略)は、見出し用のデータ(セル)を表すための要素である。

使用例を以下に示す。

```
<table>
    <tr>
        <th>0,0</th>
        <th>0,1</th>
    </tr>
    <tr>
        <td>1,0</td>
        <td>1,1</td>
    </tr>
</table>
```

表示例

<table>
    <tr>
        <th>0,0</th>
        <th>0,1</th>
    </tr>
    <tr>
        <td>1,0</td>
        <td>1,1</td>
    </tr>
</table>
<hr>


## thead要素

thead要素(table headerの略)は、見出しとなるデータ(セル)をグループ化する要素である。

thead要素の中には、見出しとするtr要素を入れる。

使用例を以下に示す。

```
<table>
    <thead>
        <tr>
            <th>0,0</th>
            <th>0,1</th>
            <th>0,2</th>
        </tr>
    </thead>
    <tr>
        <td>1,0</td>
        <td>1,1</td>
        <td>1,2</td>
    </tr>
    <tr>
        <td>2,0</td>
        <td>2,1</td>
        <td>2,2</td>
    </tr>
</table>
```

表示例

<table>
    <thead>
        <tr>
            <th>0,0</th>
            <th>0,1</th>
            <th>0,2</th>
        </tr>
    </thead>
    <tr>
        <td>1,0</td>
        <td>1,1</td>
        <td>1,2</td>
    </tr>
    <tr>
        <td>2,0</td>
        <td>2,1</td>
        <td>2,2</td>
    </tr>
</table>
<hr>

## tbody要素

tbody要素(table bodyの略)は、表の本体の部分をグループ化して表す要素である。

使用例を以下に示す。

```
<table>
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
    <tr>
        <td>2,0</td>
        <td>2,1</td>
        <td>2,2</td>
    </tr>
</table>
```

表示例

<table>
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
    <tr>
        <td>2,0</td>
        <td>2,1</td>
        <td>2,2</td>
    </tr>
</table>
<hr>


## tfoot要素

tfoot要素(table footerの略)は、表のフッター部分を表す要素である。

使用例

```
<table>
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


## caption要素

caption要素は、表のキャプション(タイトル)を示すための要素である。

使用例

```
<table>
    <caption>行列のインデックス</caption>
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


## colgroup要素

colgroup要素は、表の列をグループ化する要素である。

span属性でグループ化する列数を指定し、そこにwidthなどの属性を適用してやると、その列のセル全体に適用される。

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


## col要素

col要素は、**span属性のない**colgroup要素によって表された１列以上の縦列を表す要素である。

使用するにはcolgroup要素の中で利用する。

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
