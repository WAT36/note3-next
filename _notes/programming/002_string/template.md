---
title: "テンプレート文字列"
excerpt: "文字列の中に変数の値、改行を入れたい時"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
date: "2024-06-08T18:47:45.000Z"
updatedAt: '2025-11-24T22:13:44.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

変数や式を埋め込んだ文字列のことを **テンプレート文字列** という。

これにより、変数の値や式の結果に応じた文字列を作成でき、また改行を用いることで複数行にわたる文字列を作成することもできる。

ここでは、各言語におけるテンプレート文字列の宣言方法についてを述べる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
String.format("Hello %s", name);
```

Java では **String.format()** でテンプレート文字列を作成する。

**StringBuilder** や **printf()** も利用可能。

実行例

```java
String name = "佐藤";
String message = String.format("こんにちは、%sさん！", name);
System.out.println(message); // こんにちは、佐藤さん！
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
f"Hello {name}"
```

Python では **f-string** でテンプレート文字列を作成する。

**format()** メソッドや **%** 演算子も利用可能。

実行例

```python
name = "佐藤"
message = f"こんにちは、{name}さん！"
print(message)  # こんにちは、佐藤さん！
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
`Hello ${name}`;
```

JavaScript ではバッククォート「`」でテンプレート文字列を作成する。

**${}** で変数を埋め込み、改行も可能。

実行例

```javascript
let name = "佐藤";
let message = `こんにちは、${name}さん！`;
console.log(message); // こんにちは、佐藤さん！
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
fmt.Sprintf("Hello %s", name)
```

Go 言語では **fmt.Sprintf()** でテンプレート文字列を作成する。

**fmt.Printf()** や **strings.Replace()** も利用可能。

実行例

```go
package main
import "fmt"

func main() {
    name := "佐藤"
    message := fmt.Sprintf("こんにちは、%sさん！", name)
    fmt.Println(message) // こんにちは、佐藤さん！
}
```

</div>
