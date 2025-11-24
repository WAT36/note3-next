---
title: "数値型に変換する"
date: "2019-10-12T20:02:08.000Z"
excerpt: "文字列を数値型データに変換する方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: '2025-11-25T00:12:02.000Z'
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
Integer.parseInt("10"); // 10
```

Java では各数値型のラッパークラスの **parseXxx()** メソッドで文字列を数値に変換する。

変換できない文字列の場合は `NumberFormatException` が発生する。

実行例

```java
String s = "10";
int i = Integer.parseInt(s); // 10
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
int("10")      # 10
int("10", 16)  # 16進数で16
```

Python では組み込み関数の **int()** で文字列を数値に変換する。

第 2 引数で基数を指定できる（デフォルトは 10）。

変換できない文字列の場合は `ValueError` が発生する。

実行例

```python
s = "10"
i = int(s)  # 10
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Number("10"); // 10
parseInt("10"); // 10
```

JavaScript では **Number()** 及び **parseInt()** 関数で文字列を数値に変換する。

`Number()` は浮動小数点数も変換、`parseInt()` は整数のみ変換する。

実行例

```javascript
let s = "10";
let n = Number(s); // 10
let i = parseInt(s); // 10
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
package main
import (
    "strconv"
    "fmt"
)

func main() {
    i, _ := strconv.Atoi("10") // 10
    f, _ := strconv.ParseFloat("10.5", 64) // 10.5
}
```

Go 言語では **strconv** パッケージの関数で文字列を数値に変換する。

- `strconv.Atoi()`: 文字列を整数に変換
- `strconv.ParseFloat()`: 文字列を浮動小数点数に変換

変換できない文字列の場合はエラーが返される。

実行例

```go
s := "10"
i, err := strconv.Atoi(s) // i = 10, err = nil
```

</div>
