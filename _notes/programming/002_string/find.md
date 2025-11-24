---
title: "文字列2が文字列1の何文字目から始まるかを確認する"
date: "2019-10-15T20:19:30.000Z"
excerpt: "文字列中にある文字列が含まれているときにその位置を確認する"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: '2025-11-24T22:13:44.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

先程の文字列中に指定文字列が含まれるか　の派生で、具体的にその位置を確認したい場合どうするか？

ここではその方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
"Hello".indexOf("ell"); // 1
```

Java では String の **indexOf()** メソッドで文字列の位置を取得する。

見つからない場合は `-1` を返す。第 2 引数で開始位置を指定可能。

実行例

```java
String s = "apple,banana,cherry";
int pos = s.indexOf("banana"); // 6
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
"Hello".find("ell")    # 1
"Hello".rfind("l")     # 3
```

Python では文字列の **find()** メソッドで文字列の位置を取得する。

**rfind()** で右から検索も可能。見つからない場合は `-1` を返す。

実行例

```python
s = "apple,banana,cherry"
pos = s.find("banana")  # 6
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
"Hello".indexOf("ell"); // 1
"Hello".lastIndexOf("l"); // 3
```

JavaScript では文字列の **indexOf()** メソッドで文字列の位置を取得する。

**lastIndexOf()** で右から検索も可能。見つからない場合は `-1` を返す。

実行例

```javascript
let s = "apple,banana,cherry";
let pos = s.indexOf("banana"); // 6
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
    pos := strings.Index(s, "ell") // 1
}
```

Go 言語では **strings** パッケージの **Index()** 関数で文字列の位置を取得する。

見つからない場合は `-1` を返す。**LastIndex()** で右から検索も可能。

実行例

```go
s := "apple,banana,cherry"
pos := strings.Index(s, "banana") // 6
```

</div>
