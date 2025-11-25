---
title: "文字列を１文字ずつのリストにする"
date: "2019-10-26T23:35:30+09:00"
excerpt: "文字列を１文字ずつのリストにする方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-26T23:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

文字列を 1 文字ずつのリストに変換する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
String str = "Hello";
List<String> charList = Arrays.asList(str.split(""));
```

Java では**split("")**で文字列を 1 文字ずつの配列に分割し、**Arrays.asList()**でリストに変換する。

```java
String str = "Hello";
List<String> charList = Arrays.asList(str.split(""));
System.out.println(charList);  // [H, e, l, l, o]

// char配列として取得する場合
char[] charArray = str.toCharArray();
System.out.println(Arrays.toString(charArray));  // [H, e, l, l, o]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
str = "Hello"
char_list = list(str)
```

Python では**list()**で文字列を 1 文字ずつのリストに変換する。

```python
str = "Hello"
char_list = list(str)
print(char_list)  # ['H', 'e', 'l', 'l', 'o']

# リスト内包表記を使う方法
char_list2 = [c for c in str]
print(char_list2)  # ['H', 'e', 'l', 'l', 'o']
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let str = "Hello";
let charArray = str.split(""); // または [...str]
```

JavaScript では**split("")**またはスプレッド構文**[...]**で文字列を 1 文字ずつの配列に変換する。

```javascript
let str = "Hello";

// split()を使う方法
let charArray1 = str.split("");
console.log(charArray1); // ['H', 'e', 'l', 'l', 'o']

// スプレッド構文を使う方法
let charArray2 = [...str];
console.log(charArray2); // ['H', 'e', 'l', 'l', 'o']

// Array.from()を使う方法
let charArray3 = Array.from(str);
console.log(charArray3); // ['H', 'e', 'l', 'l', 'o']
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
str := "Hello"
chars := []rune(str)  // Unicode対応
// または
chars := strings.Split(str, "")  // 文字列のスライス
```

Go では**[]rune()**または**strings.Split()**で文字列を 1 文字ずつのスライスに変換する。

- **[]rune()**: Unicode 対応、各文字を rune 型（int32）で取得
- **strings.Split()**: 文字列型のスライスで取得

```go
import (
    "fmt"
    "strings"
)

str := "Hello"

// runeスライスに変換（Unicode対応）
runes := []rune(str)
fmt.Println(runes)  // [72 101 108 108 111]（文字コード）
for _, r := range runes {
    fmt.Printf("%c ", r)  // H e l l o
}
fmt.Println()

// 文字列スライスに変換
chars := strings.Split(str, "")
fmt.Println(chars)  // [H e l l o]

// for rangeで1文字ずつ処理
for _, char := range str {
    fmt.Printf("%c ", char)  // H e l l o
}
```

</div>
