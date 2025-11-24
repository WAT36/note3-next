---
title: "指定文字列が含まれているかを確認する"
date: "2019-10-15T19:27:48.000Z"
excerpt: "文字列中にある文字列が含まれているかを確認する方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: '2025-11-24T22:13:44.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

文字列中に特定の文字列を含んでいるかを確認したい場合どうするか？
ここではその方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
"Hello".contains("ell"); // true
```

Java では String の **contains()** メソッドで文字列の包含を確認する。

含まれていれば `true`、そうでなければ `false` を返す。

実行例

```java
String s = "apple,banana,cherry";
boolean result = s.contains("banana"); // true
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
"ell" in "Hello"  # True
```

Python では **in** 演算子で文字列の包含を確認する。

含まれていれば `True`、そうでなければ `False` を返す。

実行例

```python
s = "apple,banana,cherry"
result = "banana" in s  # True
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
"Hello".includes("ell"); // true
"Hello".startsWith("He"); // true
"Hello".endsWith("lo"); // true
```

JavaScript では **includes()** メソッドで文字列の包含を確認する。

**startsWith()** と **endsWith()** で開始・終了の確認も可能。

実行例

```javascript
let s = "apple,banana,cherry";
let result = s.includes("banana"); // true
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
    result := strings.Contains(s, "ell") // true
}
```

Go 言語では **strings** パッケージの **Contains()** 関数で文字列の包含を確認する。

**HasPrefix()** と **HasSuffix()** で開始・終了の確認も可能。

実行例

```go
s := "apple,banana,cherry"
result := strings.Contains(s, "banana") // true
```

</div>
