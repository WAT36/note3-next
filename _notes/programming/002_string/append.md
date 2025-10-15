---
title: "文字列を繋げる"
date: "2019-10-14T19:58:19.000Z"
excerpt: "文字列に別の文字列を追加する方法"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2024-03-17T22:39:43.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

文字列の末尾に別の文字列を繋げて新しい文字列としてデータを作る方法についてをまとめる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
"Hello" + "World"; // "HelloWorld"
```

Java では **+** 演算子で文字列を連結する。

StringBuilder クラスを使用する場合は **append()** メソッドが効率的。

実行例

```java
String s = "Hello";
s = s + "World"; // "HelloWorld"

StringBuilder sb = new StringBuilder("Hello");
sb.append("World"); // "HelloWorld"
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
"Hello" + "World"   # "HelloWorld"
"Hello" * 3         # "HelloHelloHello"
```

Python では **+** 演算子で文字列を連結し、**\*** 演算子で文字列を繰り返す。

実行例

```python
s = "Hello"
s = s + "World"  # "HelloWorld"
s = s * 2        # "HelloWorldHelloWorld"
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
"Hello" + "World"; // "HelloWorld"
"Hello".concat("World"); // "HelloWorld"
"Hello".repeat(3); // "HelloHelloHello"
```

JavaScript では **+** 演算子または **concat()** メソッドで文字列を連結する。

**repeat()** メソッドで文字列を繰り返すことも可能。

実行例

```javascript
let s = "Hello";
s = s + "World"; // "HelloWorld"
s = s.concat("!"); // "HelloWorld!"
s = "Hi".repeat(2); // "HiHi"
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
package main
import (
    "fmt"
    "strings"
)

func main() {
    s1 := "Hello"
    s2 := "World"
    result := s1 + s2 // "HelloWorld"
}
```

Go 言語では **+** 演算子で文字列を連結する。

効率的な連結には **strings.Builder** または **fmt.Sprintf()** を使用する。

実行例

```go
s := "Hello"
s = s + "World"  // "HelloWorld"

// 効率的な方法
var builder strings.Builder
builder.WriteString("Hello")
builder.WriteString("World")
result := builder.String() // "HelloWorld"
```

</div>
