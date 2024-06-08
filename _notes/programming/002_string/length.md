---
title: "文字列の長さ"
date: "2019-10-16T17:19:30.000Z"
excerpt: "文字列の長さ（文字数）を調べる方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-16T17:19:30.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

文字列の長さ（＝文字列が何文字であるか）を取得する方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
"文字列".length()
```

Java では String クラスに **length()** というメソッドがあり、これはその文字列の長さ（＝文字数）を返す。

`public int length()`

実行例を以下に示す。

```java
class Main{
    public static void main(String args[]){
        String a = "ab";
        String b = "11223344";
        String c = "**************";

        System.out.println(a.length());
        System.out.println(b.length());
        System.out.println(c.length());
    }
}
```

実行結果

```
$ javac Main.java
$ java Main
2
8
14
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
len("文字列")
```

Python では引数の文字列の長さ（＝文字数）を返す関数 **len()** があるので、それを利用する。

`len(str)`

```python
>>> a = "ab"
>>> b = "11223344"
>>> c = "**************"
>>>
>>> len(a)
2
>>> len(b)
8
>>> len(c)
14
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
"文字列".length;
```

Javascript では文字列に長さ（＝文字数）を保持しているプロパティ **length** があるので、それを利用する。

`String.length`

```javascript
let a = "ab";
let b = "11223344";
let c = "**************";

console.log(a.length);
console.log(b.length);
console.log(c.length);
```

実行結果

```
2
8
14
```

</div>
