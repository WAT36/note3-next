---
title: "文字コード（アスキーコード）を取得する"
date: "2019-10-12T21:43:32.000Z"
excerpt: '1文字からその文字の文字コード（アスキーコード）を取得する'
tag: ["Java","Python","Javascript"]
programming: ["Java","Python","Javascript"]
updatedAt: '2019-10-12T21:43:32.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
mode: programming
---

コンピュータは二進数しか扱えないため、文字データも二進数（つまり整数）として扱われる。

つまり１文字のデータに対して対応する整数が割り当てられており、コンピュータはその数を特定の文字と認識し処理する。この数の事を文字コードという。

文字１文字から、その文字の文字コードを取得する方法を記載する。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
char c = 'a';
int a = c;              // char型データ'a'を文字コードに変換
System.out.println(a);  // 97

String s = "aaaaa";
c = s.charAt(0);        // sの0文字目をchar型で返す 
System.out.println(c);  // a
a = c;
System.out.println(a);  // 97

//a = s                 // Stringをそのまま文字コード変換するとコンパイルエラー
```

クラスはここではMain.javaとする

Javaでは１文字のchar型と文字列のString型があるが、

文字コードに変換できるのは **char型** のほうであり、String型の変換はできない。

char型のデータをint型の変数に代入するのは可能なのか？という疑問もあるだろうが、

Javaには代入する変数とデータの型が違っていても、片方がもう片方の型に変換が可能であれば代入は行える。（キャスト,型変換）

char型の変数はint型、double型などの数値データ型に変換が可能であり、この例ではint型の変数に代入できる。

対してString型はint,doubleなどの数値データ型には変換できないので、変換したい1文字をchar型として取り出してから行う。

実行結果
```
$ javac Main.java 
$ java Main
97
a
97
```
</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
ord("文字")
```

Pythonで文字から文字コードを取得するには **ord()** 関数を利用する。
ord()関数は1文字を受け取りその文字コードを出力する。入力する文字は半角でも全角でも良い。
２文字以上を入力するとエラーになる。

```python
>>> ord("a")
97
>>> ord("aa")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: ord() expected a character, but string of length 2 found
>>>
>>> 
>>> ord("あ") 
12354
>>>
```

また、逆の文字コードから対応する文字を出力する関数 **chr()** もある。

```python
>>> chr(97)
'a'
>>> chr(98)
'b'
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var s = "abc"

console.log(s.charCodeAt(0))
console.log(s.charCodeAt(1))
console.log(s.charCodeAt(2))
```

Javascriptで文字から文字コードを取得するには、文字列の関数 **charCodeAt()** を利用する。
引数には文字コードを取得したい文字列の何文字目かを入力する。

実行結果

```
97
98
99
```

</div>
