---
title: "対数"
date: "2019-10-16T19:19:30.000Z"
excerpt: "対数を計算する方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: '2025-11-24T22:13:44.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

主な対数を算出する方法についてを示す。

任意の底の対数の場合は、算出するライブラリは無いことが多いため、以下の公式を用いて算出を行う。（底の変換公式）

log<sub>a</sub>b = log<sub>c</sub>b / log<sub>c</sub>a

<div class="note_content_by_programming_language" id="note_content_Java">

```java
Math.log10(100);  // 常用対数
Math.log(2.718);  // 自然対数
Math.log(b)/Math.log(a);  // 任意の底
```

Java では **Math** クラスで対数を計算する。

**log10()** で常用対数、**log()** で自然対数、底の変換公式で任意の底。

実行例

```java
double result = Math.log10(100); // 2.0
double ln = Math.log(Math.E);    // 1.0
double log2 = Math.log(8)/Math.log(2); // 3.0
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
import math
math.log10(100)      # 常用対数
math.log(2.718)      # 自然対数
math.log(b, a)       # 任意の底
```

Python では **math** モジュールで対数を計算する。

**log10()** で常用対数、**log()** で自然対数、**log(b,a)** で任意の底。

実行例

```python
import math
result = math.log10(100)  # 2.0
ln = math.log(math.e)     # 1.0
log2 = math.log(8, 2)     # 3.0
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Math.log10(100); // 常用対数
Math.log(2.718); // 自然対数
Math.log(b) / Math.log(a); // 任意の底
```

JavaScript では **Math** オブジェクトで対数を計算する。

**log10()** で常用対数、**log()** で自然対数、底の変換公式で任意の底。

実行例

```javascript
let result = Math.log10(100); // 2
let ln = Math.log(Math.E); // 1
let log2 = Math.log(8) / Math.log(2); // 3
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
import "math"
math.Log10(100)      // 常用対数
math.Log(2.718)      // 自然対数
math.Log(b)/math.Log(a)  // 任意の底
```

Go 言語では **math** パッケージで対数を計算する。

**Log10()** で常用対数、**Log()** で自然対数、底の変換公式で任意の底。

実行例

```go
package main
import (
    "fmt"
    "math"
)

func main() {
    result := math.Log10(100) // 2
    ln := math.Log(math.E)    // 1
    log2 := math.Log(8)/math.Log(2) // 3
    fmt.Println(result, ln, log2)
}
```

</div>
