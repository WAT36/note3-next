---
title: "切り捨て"
date: "2019-10-16T19:35:30+09:00"
excerpt: "小数点以下切り捨てする方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-16T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

小数点以下切り捨てする方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
Math.floor(数値)
```

Java では Math クラスにあるメソッド **floor()** を利用することで小数点以下切り捨てを行える。

`public static double floor(double d)`

このメソッドは引数に入力した数値以下で最も大きい整数を返す。戻り値は double 型。

```java
import java.lang.Math;
class Main{
    public static void main(String args[]){
        double a = 10.1;
        double b = 10.0;
        double c =  9.9;

        System.out.println(Math.floor(a));
        System.out.println(Math.floor(b));
        System.out.println(Math.floor(c));
    }
}
```

実行結果

```
>  java Main
10.0
10.0
9.0
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
import math
math.floor(数値)

#　または
数値 // 1
```

主に方法は二つある。

`math.floor(x)`

python にも math モジュールに **floor()** 関数がある。それを利用すると小数点以下切り捨てが行える。

```python
>>> import math
>>> a=10.1
>>> b=10.0
>>> c=9.9
>>>
>>> math.floor(a)
10
>>> math.floor(b)
10
>>> math.floor(c)
9
>>>
```

<hr>

`//`

また、python には割り算の結果を丸める演算子 **//** があるので、これを使って１で割っても切り捨てが行える。  
(先ほどの続き)

```python
>>>
>>> a//1
10.0
>>> b//1
10.0
>>> c//1
9.0
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Math.floor(数値);
```

Javascript には Math オブジェクトに **floor()** 関数がある。それを利用すると小数点以下切り捨てが行える。

`Math.floor(x)`

```javascript
let a = 10.1;
let b = 10.0;
let c = 9.9;

console.log(Math.floor(a));
console.log(Math.floor(b));
console.log(Math.floor(c));
```

実行結果

```
10
10
9
```

</div>
