---
title: "文字コード（アスキーコード）を取得する"
date: "2019-10-12T21:43:32.000Z"
excerpt: "1文字からその文字の文字コード（アスキーコード）を取得する"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2024-03-17T22:30:50.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

コンピュータは二進数しか扱えないため、文字データも二進数（つまり整数）として扱われる。

つまり１文字のデータに対して対応する整数が割り当てられており、コンピュータはその数を特定の文字と認識し処理する。この数の事を文字コードという。

文字１文字から、その文字の文字コードを取得する方法を記載する。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
char c = 'a'; // char型,1文字
int a = c;
```

Java では１文字の char 型と文字列の String 型があるが、

文字コードに変換できるのは **char 型** のほうであり、String 型の変換はできない。

char 型のデータを int 型の変数に代入するのは可能なのか？という疑問もあるだろうが、

Java には代入する変数とデータの型が違っていても、片方がもう片方の型に変換が可能であれば代入は行える。（キャスト,型変換）

char 型の変数は int 型、double 型などの数値データ型に変換が可能であり、この例では int 型の変数に代入できる。

対して String 型は int,double などの数値データ型には変換できないので、変換したい 1 文字を char 型として取り出してから行う。

以下に使用例を示す。

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

実行結果

```
97
a
97
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
ord("a") # 1文字を入力->文字コード
chr(97)  # 数値(文字コード)を入力->対応する文字
```

Python で文字から文字コードを取得するには **ord()** 関数を利用する。
ord()関数は 1 文字を受け取りその文字コードを出力する。入力する文字は半角でも全角でも良い。
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
"文字列".charCodeAt(index); // 文字列のindex文字目の文字コード取得
```

Javascript で文字から文字コードを取得するには、文字列の関数 **charCodeAt()** を利用する。
引数には文字コードを取得したい文字列の何文字目かを入力する。

以下に使用例を示す。

```javascript
var s = "abc";

console.log(s.charCodeAt(0));
console.log(s.charCodeAt(1));
console.log(s.charCodeAt(2));
```

実行結果

```
97
98
99
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
r := 'a'

fmt.Printf("%v",r) // 97
```

Go には **rune**　型というデータ型があります。

これは 1 文字を 1 Unicode コードポイントで表す型で、実体は int32 型と同じですが、用途としては文字の Unicode ポイントとして利用されます。

利用例は以下です。

```go
var ch rune = 'あ'       // シングルクォートで囲むと rune 型になる
fmt.Println(ch)         // → 12354（Unicodeコードポイント）
fmt.Printf("%c\n", ch)  // → あ（文字として出力）
```

文字をシングルクォートで囲んだ場合、rune リテラルとして扱われます。

'あ'は Unicode で 12354 と扱われるため、12354 が出力されます。

</div>
