---
title: "数値型に変換する"
date: "2019-10-12T20:02:08.000Z"
excerpt: "文字列を数値型データに変換する方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-12T20:02:08.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

文字列型で定義された数字を数値型データに変換する方法を述べる。

例えば、文字列として定義した`"10"`という値を数値型の`10`に置き換えたい時など。

ちなみに、逆の数値型を文字列型にする方法もある。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
Integer.parseInt("文字列");
```

Java では各数値型のラッパークラスに **parsexxx(String s)** というメソッドがあり、これにより文字列を数値リテラルに変換してくれる。

int 型の場合は int のラッパークラス Integer に **parseInt** というメソッドがあり、そのメソッドに文字列を入力すると、対応する数値に変換してくれる。上記例では"1"という文字列を parseInt に入力すると、int 型(数値リテラル)の 1 が返る。

数値リテラルに変換できないような文字列を入力すると`NumberFormatException`という例外エラーが発生する。

他の数値型に変換したいときは、それぞれ対応するラッパークラスに parsexx メソッドがあるのでそれを活用する。

以下に使用例を示す。

```java
String s = "10";
int i = Integer.parseInt(s);
System.out.println(i); // 10

s = "AA";
i = Integer.parseInt(s); // NumberFormatExceptionエラーが発生
```

実行例

```
$ javac Main.java
$ java Main
10
Exception in thread "main" java.lang.NumberFormatException: For input string: "AA"
        at java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)
        at java.lang.Integer.parseInt(Integer.java:580)
        at java.lang.Integer.parseInt(Integer.java:615)
        at Main.main(Main.java:10)
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
int("文字列")
int("文字列",x) # x進数に変換
```

Python で数値の文字列を数値リテラルに変換したい時は組み込み関数の **int()** を利用する。

数値リテラルに変換できないような文字列を入力したときは、例外`ValueError`を返す。

また第２引数 x を指定することで x 進数の値に変換できる。デフォルトでは 10 である。

以下に使用例を示す。

```python
s = "10"
print(int(s)) # 10

s="AA"
print(int(s))
```

実行例

```
10
Traceback (most recent call last):
  File "main.py", line 4, in <module>
    print(int(s))
ValueError: invalid literal for int() with base 10: 'AA'
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Number("文字列");
parseInt("文字列");
```

Javascript で数値の文字列を数値型に変換したい時は、

関数 **Number()** 、 **parseInt()** を利用する。
以下に使用例を示す。

```javascript
var s = "1";
console.log(s);

//文字列->数値に変換
console.log(Number(s));
console.log(parseInt(s));
```

実行結果

```
1
1
1
```

(ログだと区別つかんか・・)

</div>
