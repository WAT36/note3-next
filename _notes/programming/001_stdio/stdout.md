---
title: "標準出力"
date: "2019-10-12T17:19:30.000Z"
excerpt: ""
tag: ["Java", "Python", "Node.js", "Go"]
programming: ["Java", "Python", "Node.js", "Go"]
updatedAt: '2025-06-30T20:44:30.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

標準出力とはプログラムから値を出力することで、通常はコンソール画面上に出力される。ここではその方法について示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
System.out.println(変数もしくは値);
```

クラスはここでは Main.java とする

java で画面に出力したい時は **System.out.println()** を利用する。

引数には画面に出力したい変数またはデータを入れる。

出力後改行したくない時は System.out. **print()** を使う。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
print(変数もしくは値)
```

Python でコンソール画面への出力を扱うには組み込み関数の **print()** を使う。

基本、入力された引数を画面に出力する。

改行したくない場合は print()の end パラメータに""を指定する

```python
print(値,end="")
```

</div>
<div class="note_content_by_programming_language" id="note_content_Node.js">

```javascript
console.log(変数もしくは値);
```

Javascript 及び Node.js では、**console.log()** 関数を利用する。
引数には出力したい値及び変数を入力する。

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    fmt.Printf("フォーマット文字列", 値1, 値2, ...)
}
```

Go（Golang）で コンソール出力（標準出力）を行う方法 は、標準ライブラリの fmt パッケージ を利用して行う方法です。

`import "fmt"`はフォーマット付きの出力を行う標準ライブラリです。fmt は "format" の略になります。

fmt の **Println()** 関数を利用することで、コンソール出力を行います。

なお出力した時に改行したくない時は、 **fmt.Print()** 関数を使います。

また、**Printf()** 関数を利用することでも出力できます。

利用するには、フォーマット文字列内に % で始まるプレースホルダ を書き、後ろの引数に対応させて出力します。

</div>
