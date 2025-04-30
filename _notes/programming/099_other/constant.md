---
title: "定数"
date: "2019-11-01T02:37:30+09:00"
excerpt: "定数について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-11-01T02:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

変数は値を記憶するための入れ物であり、基本、何度でも値を代入することが可能である。

これに対し**定数**とは、値の入れ物という点では変数と同じだが、値を一度しか代入できず、代入後は別の値を再代入することはできない物のことを言う。

ここでは、各言語における定数の宣言方法についてを述べる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
final データ型 定数名 = 初期値;
```

Java で定数を宣言するには、宣言時にデータ型の前に**final**修飾子をつける。

定数として宣言すると、初期化以降は値を代入し直すことはできない。

例

```java
final int N = 50;
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python には定数という仕様は存在しない。

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
const 定数名 = 値;
```

Javascript では **const** 命令を用いて定数を宣言する。

記法は上記のとおり。

例

```Javascript
const A = 10
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
const 定数名 = 値;

const (
  定数名1 = 値1
  定数名2 = 値2
  定数名3 = 値3
  //  値2,3を省略すると、定数2,3には値1が入る
)
```

Go も同じく **const** を用いて定数を宣言できる。

()で囲むことで、一度に複数定義することもできる。

なお値を省略すると、直前で宣言されている値が入る。上記の場合だと値 2,3 を省略すると、定数 2,3 には値 1 が入るようになる。

型を与えたい場合は、定数名の後に型を書くことで明示的に型あり定数を定義できる。

</div>
