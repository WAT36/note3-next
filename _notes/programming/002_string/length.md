---
title: "文字列の長さ"
date: "2019-10-16T17:19:30.000Z"
excerpt: "文字列の長さ（文字数）を調べる方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: '2025-11-24T22:13:44.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

文字列の長さ（＝文字列が何文字であるか）を取得する方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
"Hello".length(); // 5
```

Java では String の **length()** メソッドで文字列の長さを取得する。

実行例

```java
String s = "Hello";
int len = s.length(); // 5
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
len("Hello")  # 5
```

Python では組み込み関数の **len()** で文字列の長さを取得する。

実行例

```python
s = "Hello"
length = len(s)  # 5
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
"Hello".length; // 5
```

JavaScript では文字列の **length** プロパティで文字列の長さを取得する。

実行例

```javascript
let s = "Hello";
let len = s.length; // 5
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
package main
import "fmt"

func main() {
    s := "Hello"
    length := len(s) // 5
}
```

Go 言語では組み込み関数の **len()** で文字列の長さを取得する。

実行例

```go
s := "Hello"
length := len(s) // 5
```

</div>
