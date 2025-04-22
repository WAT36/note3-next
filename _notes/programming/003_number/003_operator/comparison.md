---
title: "比較演算子"
date: "2019-10-16T21:35:30+09:00"
excerpt: "数値の比較をする方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-16T21:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

比較演算子についてをまとめる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
int a=0;
int b=1;

a <  b // 未満
a <= b // 以下
a >  b // より大きい
a >= b // 以上
a == b // 等しい
a != b // 等しくない
```

Java での主な比較演算子は上の通り。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
a=0
b=1

a <  b # 未満
a <= b # 以下
a >  b # より大きい
a >= b # 以上
a == b # 等しい
a != b # 等しくない
```

Python での主な比較演算子は上の通り。

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var a = 0;
var b = 1;

a < b; //   未満
a <= b; //  以下
a > b; //   より大きい
a >= b; //  以上
a == b; //  等しい
a != b; //  等しくない
a === b; // 等しい(かつ型も等しい)
a !== b; // 等しくない(あるいは型が等しくない)

// 等価演算子(同値演算子)
1 == true; // true
1 != true; // false

1 === true; // false
1 !== true; // true
```

Javascript での主な比較演算子は上の通り。

Javascript では、==演算子でオブジェクト型とプリミティブ型を比較すると、**オブジェクト型がプリミティブ型に変換された上で比較**される。さらに、文字列と数値を比較すると、文字列が数値に変換されて比較される。
例えば、以下のようなコードは全て true になる。

```javascript
console.log(Number(100) == 100);
console.log(String(100) == 100);
console.log("100" == 100);
```

ここで、javascript では、値が等しいかを判断する演算子は 2 つある。

まずは等価演算子 "**==**" について。

== 演算子は、左辺、右辺の値を比較し、等しい場合に true,等しくない場合に false を返す。

しかし == の場合は、場合によって値の型を変換した上で比較する場合がある。以下の通り。

| 左辺右辺の型 | データ型           | 評価基準                                                            |
| :----------- | :----------------- | :------------------------------------------------------------------ |
| 同じ         | 文字列/数値/論理型 | 単純に双方の値が等しいかを判定                                      |
| 〃           | 配列/オブジェクト  | 参照先が等しいか判定                                                |
| 〃           | null/undefined     | 双方とも null/undefined、または null と undefined の比較は全て true |
| 異なる       | 文字列/数値/論理型 | 文字列/論理型を数値に変換した上で判定                               |
| 〃           | オブジェクト       | 基本型に変換した上で判定                                            |

そのため、例えば `1 == true` の式は true となってしまう。

そのような評価を避けたい場合は、同値演算子 "**===**" を使う。

こちらは評価の際に、データ型の変換は行わずに値を比較する。

これにより、例えば `1 === true` は false になる。

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
a := 0;
b := 1;

a < b; //   未満
a <= b; //  以下
a > b; //   より大きい
a >= b; //  以上
a == b; //  等しい
a != b; //  等しくない
```

Go での主な比較演算子は上の通り。

</div>
