---
title: "正規表現"
date: "2019-11-01T07:37:30+09:00"
excerpt: "正規表現で文字列を扱う"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-11-01T07:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

文字列に正規表現を適用してある文字列パターンを抽出・検索したいという場合があると思う。

その場合に利用する方法を示す。

ちなみに正規表現の文法についてはここでは割愛する。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
Pattern pattern = Pattern.compile("\\d+");
Matcher matcher = pattern.matcher("Hello123World");
boolean found = matcher.find();
```

Java では **Pattern** と **Matcher** クラスで正規表現を扱う。

実行例

```java
import java.util.regex.*;

Pattern pattern = Pattern.compile("\\d+");
Matcher matcher = pattern.matcher("Hello123World");
if (matcher.find()) {
    System.out.println(matcher.group()); // 123
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
import re
match = re.search(r'\d+', 'Hello123World')
result = match.group() if match else None
```

Python では **re** モジュールで正規表現を扱う。

**search()** で検索、**sub()** で置換、**findall()** で全検索が可能。

実行例

```python
import re
s = "Hello123World"
match = re.search(r'\d+', s)
if match:
    print(match.group())  # 123
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let re = /\d+/;
let match = "Hello123World".match(re);
let result = match ? match[0] : null;
```

JavaScript では **RegExp** オブジェクトで正規表現を扱う。

**match()** で検索、**replace()** で置換、**test()** で判定が可能。

実行例

```javascript
let s = "Hello123World";
let match = s.match(/\d+/);
if (match) {
  console.log(match[0]); // 123
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
package main
import (
    "regexp"
    "fmt"
)

func main() {
    re := regexp.MustCompile(`\d+`)
    match := re.FindString("Hello123World")
}
```

Go 言語では **regexp** パッケージで正規表現を扱う。

**FindString()** で検索、**ReplaceAllString()** で置換、**MatchString()** で判定が可能。

実行例

```go
package main
import (
    "regexp"
    "fmt"
)

func main() {
    s := "Hello123World"
    re := regexp.MustCompile(`\d+`)
    match := re.FindString(s)
    fmt.Println(match) // 123
}
```

</div>
