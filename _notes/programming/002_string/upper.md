---
title: "英字大文字に変換"
date: "2019-10-11T20:32:45.000Z"
excerpt: "英字文字列を全て英字大文字にする方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2024-03-17T17:19:18.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

英字の文字列の値を全て大文字にする方法について。

例えば`"aaa"`という値を`"AAA"`という値に変換したい場合はどうするか。その方法をここで述べる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
String s = "aaa";
s.toUpperCase(); // "AAA"
```

クラスはここでは Main.java とする

Java では String クラスに **toUpperCase()** というメソッドがあり、これにより文字列を全て英大文字に変換して表示してくれる。

ただし、文字列自体が変換されるわけではないので、反映させたい場合は出力を元の変数に代入してやる必要がある。以下に例を示す。

```java
class Main{
    public static void main(String args[]){
      String s = "aaa";

      // 文字列を大文字にする
      s = s.toUpperCase();
    }
}
```

実行すると

```
AAA
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
s = "aaa"
s.upper() # "AAA"
```

Python は文字列型の str オブジェクトにメソッド **upper()** があり、これにより文字列を全て大文字にできる。

ただし、これも文字列自体が変換されるわけではないので、反映させたい場合は出力を元の変数に代入してやる必要がある。
以下に例を示す。

```python
s = "aaa"
s = s.upper()
print(s)
```

実行すると

```
AAA
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var s = "aaa";
s.toUpperCase(); // "AAA"
```

Javascript ではメソッド **toUpperCase()** により文字列を全て大文字にできる。

ただし、これも文字列自体が変換されるわけではないので、反映させたい場合は出力を元の変数に代入してやる必要がある。
以下に例を示す。

```javascript
var s = "aaa";
s = s.toUpperCase();
console.log(s);
```

実行すると

```
AAA
```

</div>
