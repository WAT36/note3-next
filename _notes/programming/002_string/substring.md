---
title: "文字列を切り出す"
excerpt: "文字列のp文字目からq文字目を切り出して取得する方法"
coverImage: ""
date: "2024-06-24T20:17:32.000Z"
updatedAt: '2025-11-25T00:12:02.000Z'
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

<div class="note_content_by_programming_language" id="note_content_Java">

```java
"Hello".substring(1, 4); // "ell"
```

Java では **String.substring()** メソッドで文字列の一部分を切り出す。

開始位置と終了位置（含まない）を指定する。

実行例

```java
String s = "Hello";
String result = s.substring(1, 4); // "ell"
System.out.println(result);
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
"Hello"[1:4]  # "ell"
```

Python では **スライス記法** で文字列の一部分を切り出す。

**[開始:終了]** で範囲を指定する（終了位置は含まない）。

実行例

```python
s = "Hello"
result = s[1:4]  # "ell"
print(result)
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
"Hello".substring(1, 4); // "ell"
```

JavaScript では **String.substring()** メソッドで文字列の一部分を切り出す。

開始位置と終了位置（含まない）を指定する。

実行例

```javascript
let s = "Hello";
let result = s.substring(1, 4); // "ell"
console.log(result);
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
s[1:4]  // "ell"
```

Go 言語では **スライス記法** で文字列の一部分を切り出す。

**[開始:終了]** で範囲を指定する（終了位置は含まない）。

実行例

```go
package main
import "fmt"

func main() {
    s := "Hello"
    result := s[1:4]  // "ell"
    fmt.Println(result)
}
```

</div>
