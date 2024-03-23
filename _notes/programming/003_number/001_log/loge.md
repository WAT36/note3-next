---
title: "自然対数(底e)"
date: "2019-10-16T18:19:30.000Z"
excerpt: "自然対数(底e)を計算する方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-16T18:19:30.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

自然対数を算出する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
Math.log(数値)
```

Java では java.lang.Math クラス内にある **log()** メソッドがこの役割を果たす。

`public static double log(double a)`

```java
class Main{
    public static void main(String args[]){
        int a = 100;
        int b = 500;

        System.out.println(Math.log(a));
        System.out.println(Math.log(b));
    }
}
```

実行結果

```
> java Main
4.605170185988092
6.214608098422191
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
import math
math.log(数値)
```

python で自然対数を算出するには math モジュールにある関数 **log()** 関数を使用する。

`math.log(x)`

使用するには math モジュールをインポートする。

```python
>>> import math
>>> a = 100
>>> b = 500
>>>
>>> print(math.log(a))
4.605170185988092
>>> print(math.log(b))
6.214608098422191
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Math.log(数値);
```

Javascript で自然対数を算出するには Math オブジェクトにある **log()** 関数を使用する。

`Math.log(x)`

```javascript
let a = 100;
let b = 500;

console.log(Math.log(a));
console.log(Math.log(b));
```

実行結果

```
4.605170185988092
6.214608098422191
```

</div>
