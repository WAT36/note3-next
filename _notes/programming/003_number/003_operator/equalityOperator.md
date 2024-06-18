---
title: "等価演算子(同値演算子)"
excerpt: "等価演算子と同値演算子について"
coverImage: ""
date: "2024-06-16T22:39:14.000Z"
updatedAt: "2024-06-16T22:39:14.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

値が等しいかを判断する、等価演算子についてを述べる。

Javascript には、これに加えて同値演算子というのもあるので、そちらについても記載する。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// 作成中・・
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# 作成中・・
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
1 == true; // true
1 != true; // false

1 === true; // false
1 !== true; // true
```

javascript では、値が等しいかを判断する演算子は 2 つある。

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
