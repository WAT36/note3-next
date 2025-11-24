---
title: "標準出力"
date: "2019-10-12T17:19:30.000Z"
excerpt: ""
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: '2025-11-24T22:13:44.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

標準出力とはプログラムから値を出力することで、通常はコンソール画面上に出力される。ここではその方法について示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
System.out.println("Hello, World!");
```

Java で標準出力を扱うには、**System.out.println()** メソッドを使用する。

出力後改行したくない時は、**System.out.print()** を利用する。

実行例

```
$ javac Main.java
$ java Main
Hello, World!
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
print("Hello, World!")
```

Python で標準出力を扱うには、組み込み関数の **print()** を使用する。

改行したくない場合は、end パラメータに "" を指定する。

実行例

```
$ python main.py
Hello, World!
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
console.log("Hello, World!");
```

JavaScript(Node.js)で標準出力を扱うには、**console.log()** 関数を使用する。

実行例

```
$ node main.js
Hello, World!
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
package main
import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

Go 言語で標準出力を扱うには、**fmt** パッケージの **Println()** 関数を使用する。

出力後改行したくない時は、**fmt.Print()** を利用する。
フォーマット付き出力には **fmt.Printf()** を使用する。

実行例

```
$ go run main.go
Hello, World!
```

</div>
