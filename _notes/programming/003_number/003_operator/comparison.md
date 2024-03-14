---
title: "比較演算子"
date: "2019-10-16T21:35:30+09:00"
excerpt: "数値の比較をする方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
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
```

Javascript での主な比較演算子は上の通り。

Javascript では、==演算子でオブジェクト型とプリミティブ型を比較すると、**オブジェクト型がプリミティブ型に変換された上で比較**される。さらに、文字列と数値を比較すると、文字列が数値に変換されて比較される。
例えば、以下のようなコードは全て true になる。

```javascript
console.log(Number(100) == 100);
console.log(String(100) == 100);
console.log("100" == 100);
```

</div>
