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

```java
// 変数名、値は任意
char c = 'c'; // 1文字のみ
String s = "文字列" // 2文字以上も可能
```

Java で文字を扱うには、基本データ型であり 1 文字のみを扱える**char**型と、

2 文字以上の文字列を扱える**String**型がある。（もう少し言うと StringBuilder 型というのもあるがここでは割愛する）

char 型の場合は 1 文字をシングルクォート('')で囲んで宣言する。char 型で 2 文字以上の文字を宣言するとコンパイルエラ
ーとなる。

String 型の場合は文字列をダブルクォート("")で囲んで宣言する。文字列は 0 文字から扱える。

使用例

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

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python では文字列を扱うには

```python
# 変数名、値は任意
s1 = "文字列"
s2 = '文字列'
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
// 変数名、値は任意
var s1 = "Hello! World!";
var s2 = "Hello! World!";
```

</div>
