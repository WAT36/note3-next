---
title: "文字列を宣言する"
date: "2019-10-17T22:05:28.000Z"
excerpt: "1文字からその文字の文字コード（アスキーコード）を取得する"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-17T22:05:28.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

文字列のデータ（文字列リテラル）を宣言するにはどうすればよいか？

<div class="note_content_by_programming_language" id="note_content_Java">

クラスはここでは Main.java とする

```java
class Main{
    public static void main(String args[]){
      char c = 'c';

      System.out.println(c); // c

      String s = "Words";

      System.out.println(s); // Words
    }
}
```

Java で文字を扱うには、基本データ型であり 1 文字のみを扱える**char**型と、
2 文字以上の文字列を扱える**String**型がある。（もう少し言うと StringBuilder 型というのもあるがここでは割愛する
）
char 型の場合は 1 文字をシングルクォート('')で囲んで宣言する。char 型で 2 文字以上の文字を宣言するとコンパイルエラ
ーとなる。

String 型の場合は文字列をダブルクォート("")で囲んで宣言する。文字列は 0 文字から扱える。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python では文字列を扱うには

```
(変数) = "文字列"
```

または

```
(変数) = '文字列'
```

のようにする。
Java とは違い、Python では文字列を宣言するときにはシングルクォート('')、ダブルクォート("")のどちらを利用しても
よい。

```python
>>> s = "a"
>>> print(s)
a
>>> c = 'c'
>>> print(c)
c
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

Javascript でも、シングルクォート('')、ダブルクォート("")を利用して文字列を宣言する。

```javascript
var h1 = "Hello! World!";
var h2 = "Hello! World!";
```

</div>
