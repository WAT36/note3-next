---
title: "標準エラー出力"
date: "2019-10-12T17:25:47.000Z"
excerpt: ""
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: '2025-12-04T22:29:08.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

標準エラー出力とは、先述の標準出力とはまた別の出力の事で、エラー情報として出力される値のことである。ここではその方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
System.err.println("エラーメッセージ");
```

Java で標準エラー出力を扱うには、**System.err.println()** メソッドを使用する。

出力後改行したくない時は、**System.err.print()** を利用する。
エラー情報は通常、例外処理時にエラーメッセージとして出力する。

実行例

```bash
$ javac Main.java
$ java Main
エラーメッセージ
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
import sys
print("エラーメッセージ", file=sys.stderr)
```

Python で標準エラー出力を扱うには、sys モジュールをインポートし、
print()の file パラメータに **sys.stderr** を指定する。

実行例

```bash
$ python main.py
エラーメッセージ
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
console.error("エラーメッセージ");
```

JavaScript(Node.js)で標準エラー出力を扱うには、**console.error()** 関数を使用する。

警告情報を出力したい場合は、**console.warn()** 関数も利用できる。

実行例

```bash
$ node main.js
エラーメッセージ
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
package main
import (
    "fmt"
    "os"
)

func main() {
    fmt.Fprintln(os.Stderr, "エラーメッセージ")
}
```

Go 言語で標準エラー出力を扱うには、**fmt.Fprintln()** 関数と **os.Stderr** を使用する。

fmt.Fprintln(os.Stderr, 値) で標準エラー出力に値を出力する。
出力後改行したくない時は、**fmt.Fprint()** を利用する。

実行例（上のファイルを main.go とする）

```bash
$ go run main.go
エラーメッセージ
```

</div>
