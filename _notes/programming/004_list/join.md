---
title: "リストの全要素を連結して１つの文字列に変換する"
date: "2019-10-27T05:35:30+09:00"
excerpt: "リストの全要素を連結して１つの文字列に変換する方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-27T05:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストの全要素を連結して 1 つの文字列にする方法についてを示す。
なお、前提としてここでいうリスト内にある要素は全て文字列型とする。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
String.join("",リスト)
```

Java では String に **join()** というメソッドがある。これは引数にデリミタと Iterable 変数を指定し、Iterable の中にある要素を全てデリミタで繋げて出力するというメソッドである。

`public static String join(CharSequence delimiter, Iterable<? extends CharSequence> elements)`

使用例を以下に示す。

```java
import java.util.ArrayList;
import java.util.List;
class Main{
  public static void main(String args[]){

    List<String> l = new ArrayList<>();
    l.add("a");
    l.add("bb");
    l.add("ccc");
    l.add("dddd");

    System.out.println(l + " -> " + String.join("",l));
  }
}
```

実行結果

```
> java Main
[a, bb, ccc, dddd] -> abbcccdddd
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
''.join(リスト)
```

Python では文字列の関数に **join()** というのがあり、引数にリスト等を指定してやると、リスト内の要素を呼び出し元の文字列で繋げた文字列を返す。
呼び出し元を **""** にすると、リスト内の要素が全て連結された形で出てくる。

使用例を以下に示す。

```python
>>> a=["a","bb","ccc","dddd"]
>>>
>>> a
['a', 'bb', 'ccc', 'dddd']
>>>
>>> ''.join(a)
'abbcccdddd'
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Array.join("");
// または
Array.toString();
```

Javascript では Array オブジェクトに**join**メソッドがあり、これを利用すると Array オブジェクト内の要素を引数で指定した文字列で連結し、1 つの文字列を作成する。

指定した文字列を空文字`""`にすると、Array オブジェクトの要素を全てそのまま繋げた文字列を出力する。

また、Array オブジェクトの**toString**メソッドを使っても要素を連結した文字列を出力できる。ただしこちらは要素をカンマで繋げた形で出力される。

例を以下に示す。

```javascript
let arr = ["aaa", "bbb", "ccc"];
let arrJoin = arr.join("");
console.log(arrJoin); // aaabbbccc
let arrString = arr.toString();
console.log(arrString); // aaa,bbb,ccc
```

</div>
