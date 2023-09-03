---
title: "配列"
date: "2019-10-18T19:35:30+09:00"
excerpt: "配列を定義する方法。"
tag: ["Java", "Javascript"]
programming: ["Java", "Javascript"]
updatedAt: "2019-10-18T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

配列とは、同じデータ型の値をまとめて扱いたい時に利用するデータ構造である。ここでは配列の定義方法についてを述べる。

なお、Python には配列という概念は存在しない（リストとひっくるめている？）のでここでは述べない。

<div class="note_content_by_programming_language" id="note_content_Java">

Java では以下の形式で配列を宣言する。

```
データ型[] 配列名 = new データ型[要素数];
```

この方法により、配列内に指定したデータ型の値を、指定した要素数の数まで入れることができる。

配列への値の代入及び取得は、以下のようにインデックスを指定して行う。

```
配列名[インデックス] = 値;
変数 = 配列名[インデックス];
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

Javascript では以下の形式で配列を宣言する。Java のような要素数の指定は不要である。

```
var 配列名 = [(値、カンマ区切りで複数入力可)]
```

配列への値の代入及び取得は、Java と同じようにインデックスを指定して行う。

```
配列名[インデックス] = 値;
変数 = 配列名[インデックス];
```

</div>

<hr>

## 配列の長さ(要素数)を確認する

配列の長さ、つまりは入っている要素の数を表示する方法についてを述べる。

<div class="note_content_by_programming_language" id="note_content_Java">

Java では配列オブジェクトに**length**という属性があり、それが配列の長さを示している。

```
配列.length
```

この方法により、配列の長さを表示することができる。

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

Javascript も Java と同じく配列に**length**という属性がある。それが配列の長さを示している。

```
配列.length
```

</div>

<hr>

## 配列に値を追加する

言語により概念が異なるが、配列に値を追加する方法についてを述べる。

なお、Java では配列の長さが固定されているので、値を追加するという概念は基本ない。（配列の指定したインデックスに値を入れることは可能）

Javascript では配列の長さは固定されてはおらず、リストのように配列の後ろに値を追加することができる。（じゃあそれはリストではないか？とも考えてはいるが）

<div class="note_content_by_programming_language" id="note_content_Javascript">

Javascript では以下の形式で配列に要素を追加できる。

```
配列.push(要素)
```

</div>
