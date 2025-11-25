---
title: "文字列の置換"
date: "2019-10-12T19:46:41.000Z"
excerpt: "文字列を別の文字列に置換する"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: '2025-11-25T00:12:02.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

文字列を別の文字列に置換する方法。

例えば"a"という文字を全て"e"に変えたいとなった時

```
"a" -> "e"
"and" -> "end"
```

など、指定した文字列全ての他、文字列の一部分または文字列中の条件に合う文字列に対する置換を行う方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
"Hello".replace("e", "a"); // "Hallo"
```

Java では String クラスの **replace()** メソッドで文字列を置換する。

文字列自体は変更されないため、結果を変数に代入する必要がある。

実行例

```java
String s = "and";
s = s.replace("a", "e"); // "end"
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
"Hello".replace("e", "a")  # "Hallo"
```

Python では文字列型の **replace()** メソッドで文字列を置換する。

第 3 引数で置換回数を指定できる（省略時は全て置換）。

実行例

```python
s = "and"
s = s.replace("a", "e")  # "end"

s = "andand"
s = s.replace("a", "e", 1)  # "endand"
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
"Hello".replace("e", "a"); // "Hallo"
```

JavaScript では文字列の **replace()** メソッドで文字列を置換する。

文字列を指定した場合は最初の一致のみ、正規表現の場合は全て置換する。

実行例

```javascript
let s = "and and";
s = s.replace("a", "e"); // "end and"
s = s.replace(/a/g, "e"); // "end end"
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
package main
import "strings"

func main() {
    s := "Hello"
    result := strings.Replace(s, "e", "a", -1) // "Hallo"
}
```

Go 言語では **strings** パッケージの **Replace()** 関数で文字列を置換する。

第 4 引数で置換回数を指定する（-1 で全て置換）。

実行例

```go
s := "and"
s = strings.Replace(s, "a", "e", -1) // "end"

s = "andand"
s = strings.Replace(s, "a", "e", 1)   // "endand"
```

</div>
