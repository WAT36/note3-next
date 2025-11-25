---
title: "文字列を宣言する"
date: "2019-10-17T22:05:28.000Z"
excerpt: "文字列を宣言する"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: '2025-11-25T00:12:02.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

文字列のデータ（文字列リテラル）を宣言するにはどうすればよいか？

<div class="note_content_by_programming_language" id="note_content_Java">

```java
String s = "Hello";
char c = 'A';
```

Java では **String** 型で文字列、**char** 型で 1 文字を宣言する。

ダブルクォートで文字列、シングルクォートで 1 文字を囲む。

実行例

```java
String s = "Hello";
char c = 'A';
System.out.println(s); // Hello
System.out.println(c); // A
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
s1 = "Hello"
s2 = 'World'
```

Python では **str** 型で文字列を宣言する。

シングルクォートまたはダブルクォートで囲む。

実行例

```python
s = "Hello"
print(s)  # Hello
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let s1 = "Hello";
let s2 = "World";
```

JavaScript では **string** 型で文字列を宣言する。

シングルクォートまたはダブルクォートで囲む。

実行例

```javascript
let s = "Hello";
console.log(s); // Hello
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
s1 := "Hello"
s2 := `複数行
文字列`
```

Go 言語では **string** 型で文字列を宣言する。

ダブルクォートまたはバッククォート（RAW 文字列リテラル）で囲む。

実行例

```go
s := "Hello"
fmt.Println(s) // Hello
```

</div>
