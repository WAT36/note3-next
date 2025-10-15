---
title: "文字コード（アスキーコード）を取得する"
date: "2019-10-12T21:43:32.000Z"
excerpt: "1文字からその文字の文字コード（アスキーコード）を取得する"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2025-06-30T20:44:30.000Z"
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
char c = 'a';
int code = c; // 97
```

Java では **char** 型を **int** 型に代入することで文字コードを取得する。

String 型の場合は `charAt()` で 1 文字を取得してから変換する。

実行例

```java
char c = 'a';
int code = c; // 97

String s = "abc";
code = s.charAt(0); // 'a' の文字コード 97
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
ord("a")  # 97
chr(97)   # "a"
```

Python では組み込み関数の **ord()** で文字から文字コードを取得する。

逆に文字コードから文字を取得するには **chr()** を使用する。

実行例

```python
code = ord("a")  # 97
char = chr(97)   # "a"
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
"abc".charCodeAt(0); // 97
```

JavaScript では文字列の **charCodeAt()** メソッドで文字コードを取得する。

引数には文字列の何文字目かを指定する（0 から開始）。

実行例

```javascript
let s = "abc";
let code = s.charCodeAt(0); // 97 ('a'の文字コード)
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
r := 'a'
fmt.Printf("%v", r) // 97
```

Go 言語では **rune** 型で文字の Unicode コードポイントを取得する。

シングルクォートで囲むと rune 型になり、数値として扱える。

実行例

```go
r := 'a'
fmt.Println(r)        // 97
fmt.Printf("%c", r)   // a
```

</div>
