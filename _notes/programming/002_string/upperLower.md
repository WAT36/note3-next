---
title: "英字大文字・小文字に変換"
date: "2019-10-11T20:32:45.000Z"
excerpt: "英字文字列を全て英字大文字・小文字にする方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: '2025-11-25T00:12:02.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

英字の文字列の値を全て大文字・小文字にする方法について。

例えば`"aaa"`という値を`"AAA"`という値に変換したい場合、およびその逆はどうするか。その方法をここで述べる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
"Hello".toUpperCase(); // "HELLO"
"Hello".toLowerCase(); // "hello"
```

Java では String クラスの **toUpperCase()** 及び **toLowerCase()** メソッドで文字列を大文字・小文字に変換する。

文字列自体は変更されないため、結果を変数に代入する必要がある。

実行例

```java
String s = "aAa";
s = s.toUpperCase(); // "AAA"
s = s.toLowerCase(); // "aaa"
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
"Hello".upper()   # "HELLO"
"Hello".lower()   # "hello"
```

Python では文字列型の **upper()** 及び **lower()** メソッドで文字列を大文字・小文字に変換する。

文字列自体は変更されないため、結果を変数に代入する必要がある。

実行例

```python
s = "aAa"
s = s.upper()  # "AAA"
s = s.lower()  # "aaa"
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
"Hello".toUpperCase(); // "HELLO"
"Hello".toLowerCase(); // "hello"
```

JavaScript では文字列の **toUpperCase()** 及び **toLowerCase()** メソッドで文字列を大文字・小文字に変換する。

文字列自体は変更されないため、結果を変数に代入する必要がある。

実行例

```javascript
let s = "aAa";
s = s.toUpperCase(); // "AAA"
s = s.toLowerCase(); // "aaa"
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
package main
import (
    "strings"
    "fmt"
)

func main() {
    s := "Hello"
    upper := strings.ToUpper(s) // "HELLO"
    lower := strings.ToLower(s) // "hello"
}
```

Go 言語では **strings** パッケージの **ToUpper()** 及び **ToLower()** 関数で文字列を大文字・小文字に変換する。

これらの関数は新しい文字列を返すため、結果を変数に代入する必要がある。

実行例

```go
s := "aAa"
s = strings.ToUpper(s) // "AAA"
s = strings.ToLower(s) // "aaa"
```

</div>
