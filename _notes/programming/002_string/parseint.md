---
title: "数値型に変換する"
date: "2019-10-12T20:02:08.000Z"
excerpt: '文字列を数値型データに変換する方法。'
tag: ["Java","Python","Javascript"]
programming: ["Java","Python","Javascript"]
updatedAt: '2019-10-12T20:02:08.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
mode: programming
---

文字列型で定義された数字を数値型データに変換する方法を述べる。  

例えば、文字列として定義した`"10"`という値を数値型の`10`に置き換えたい時など。

ちなみに、逆の数値型を文字列型にする方法もある。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
String s = "10";
int i = Integer.parseInt(s);
System.out.println(i); // 10

s = "AA";
i = Integer.parseInt(s); // NumberFormatExceptionエラーが発生
```

Javaでは各数値型のラッパークラスに **parsexxx(String s)** というメソッドがあり、これにより文字列を数値リテラルに変換してくれる。   

int型の場合はintのラッパークラスIntegerに **parseInt** というメソッドがあり、そのメソッドに文字列を入力すると、対応する数値に変換してくれる。上記例では"1"という文字列をparseIntに入力すると、int型(数値リテラル)の1が返る。  

数値リテラルに変換できないような文字列を入力すると```NumberFormatException```という例外エラーが発生する。

他の数値型に変換したいときは、それぞれ対応するラッパークラスにparsexxメソッドがあるのでそれを活用する。


上記コードの実行例

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
s = "10"
print(int(s)) # 10
print(float(s)) # 10.0

s="AA"
print(int(s))
```

Pythonで数値の文字列を数値リテラルに変換したい時は組み込み関数の **int()** や **float()** などを利用する。

数値リテラルに変換できないような文字列を入力したときは、例外```ValueError```を返す。

実行例

```
10
10.0
Traceback (most recent call last):
  File "main.py", line 6, in <module>
    print(int(s))
ValueError: invalid literal for int() with base 10: 'AA'
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var s = "1"
console.log(s); 

//文字列->数値に変換
console.log(Number(s));
console.log(parseInt(s));
console.log(parseFloat(s));
```

Javascriptで数値の文字列を数値型に変換したい時は、

関数 **Number()** 、 **parseInt()** 、 **parseFloat()** を利用する。

実行結果

```
1
1
1
1
```

(ログだと区別つかんか・・)

</div>
