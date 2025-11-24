---
title: "文字列を分割する"
date: "2019-10-14T20:19:29.000Z"
excerpt: "文字列をある文字(位置)で分割する方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: '2025-11-25T00:12:02.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

文字列に対して、ある文字を境に複数に分割したいという場面もあるだろう。
ここではその方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
"a,b,c".split(","); // ["a", "b", "c"]
```

Java では String の **split()** メソッドで文字列を分割する。

第 1 引数に区切り文字、第 2 引数に分割回数を指定する（省略可）。

実行例

```java
String s = "apple,banana,cherry";
String[] parts = s.split(","); // ["apple", "banana", "cherry"]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
"a,b,c".split(",")  # ["a", "b", "c"]
```

Python では文字列の **split()** メソッドで文字列を分割する。

第 1 引数に区切り文字、第 2 引数に分割回数を指定する（省略可）。

実行例

```python
s = "apple,banana,cherry"
parts = s.split(",")  # ["apple", "banana", "cherry"]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
"a,b,c".split(","); // ["a", "b", "c"]
```

JavaScript では文字列の **split()** メソッドで文字列を分割する。

第 1 引数に区切り文字、第 2 引数に分割回数を指定する（省略可）。

実行例

```javascript
let s = "apple,banana,cherry";
let parts = s.split(","); // ["apple", "banana", "cherry"]
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
    s := "a,b,c"
    parts := strings.Split(s, ",") // ["a", "b", "c"]
}
```

Go 言語では **strings** パッケージの **Split()** 関数で文字列を分割する。

第 1 引数に文字列、第 2 引数に区切り文字を指定する。

実行例

```go
s := "apple,banana,cherry"
parts := strings.Split(s, ",") // ["apple", "banana", "cherry"]
```

</div>
