---
title: "英字大文字・小文字に変換"
date: "2019-10-11T20:32:45.000Z"
excerpt: "英字文字列を全て英字大文字・小文字にする方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2024-03-17T17:19:18.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

英字の文字列の値を全て大文字・小文字にする方法について。

例えば`"aaa"`という値を`"AAA"`という値に変換したい場合、およびその逆はどうするか。その方法をここで述べる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// 大文字に変換
"文字列".toUpperCase();
// 小文字に変換
"文字列".toLowerCase();
```

クラスはここでは Main.java とする

Java では String クラスに **toUpperCase()** 及び **toLowerCase()** というメソッドがあり、これにより文字列を全て英大文字・小文字に変換して表示してくれる。

ただし、文字列自体が変換されるわけではないので、反映させたい場合は出力を元の変数に代入してやる必要がある。以下に例を示す。

```java
String s = "aAa";
// 文字列を大文字にする
s = s.toUpperCase();
System.out.println(s); // "AAA"
// 文字列を小文字にする
s = s.toLowerCase();
System.out.println(s); // "aaa"
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# 大文字に変換
"文字列".upper()
# 小文字に変換
"文字列".lower()
```

Python は文字列型の str オブジェクトにメソッド **upper()** 及び **lower()** があり、これにより文字列を全て大文字・小文字にできる。

ただし、これも文字列自体が変換されるわけではないので、反映させたい場合は出力を元の変数に代入してやる必要がある。
以下に例を示す。

```python
s = "aAa"
s = s.upper()
print(s) # "AAA"
s = s.lower()
print(s) # "aaa"
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// 大文字に変換
"文字列".toUpperCase();
// 小文字に変換
"文字列".toLowerCase();
```

Javascript ではメソッド **toUpperCase()** 及び**toLowerCase()** により文字列を全て大文字・小文字にできる。

ただし、これも文字列自体が変換されるわけではないので、反映させたい場合は出力を元の変数に代入してやる必要がある。
以下に例を示す。

```javascript
var s = "aAa";
s = s.toUpperCase();
console.log(s); // "AAA"
s = s.toLowerCase();
console.log(s); // "aaa"
```

</div>
