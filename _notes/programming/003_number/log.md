---
title: "対数"
date: "2019-10-16T19:19:30.000Z"
excerpt: "対数を計算する方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: '2025-06-16T08:22:45.000Z'
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
//常用対数
Math.log10(数値)
//自然対数
Math.log(数値)
//底a,真数bの対数を取りたいとき
Math.log(b)/Math.log(a)
```

Java では java.lang.Math クラス内にある **log10()** メソッドがこの役割を果たす。

`public static double log10(double a)`

自然対数は java.lang.Math クラス内にある **log()** メソッドがこの役割を果たす。

`public static double log(double a)`

任意の底での対数を算出するメソッドは無いため、

底の変換公式 を用いて前述の**log10()**、**loge()** を利用し算出する。

```java
import java.lang.Math;
class Main{
    public static void main(String args[]){
        int a = 2;
        int b = 4;
        int c = 1024;

        //常用対数
        System.out.println(Math.log10(100));

        //log2(n)を算出する
        System.out.println(Math.log(b)/Math.log(a)); //log(2)4
        System.out.println(Math.log(c)/Math.log(a)); //log(2)1024
    }
}
```

実行結果

```
> java Main
2.0
2.0
10.0
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
import math
math.log10(数値)  # 常用対数
math.log(数値)    # 自然対数
math.log(b,a)     # 底a,真数bの対数を取りたいとき
```

python で常用対数を算出するには math モジュールにある関数 **log10()** 関数を使用する。

`math.log10(x)`

自然対数を算出するには math モジュールにある関数 **log()** 関数を使用する。

`math.log(x)`

また任意の数を底とする対数を算出する関数が存在し、

それは自然対数を算出する時にも利用した math モジュールにある **log()** 関数である。

log(x,y)関数は、y を底とした x の対数を返す。

y を略した場合（引数１つの場合）、底は自動的に e となり、自然対数になる。(→ 自然対数)

使用するには math モジュールをインポートする。

```python
>>> import math
>>> a=2
>>> b=4
>>> c=1024
>>>
>>> math.log10(100)
2.0
>>> math.log(b,a)
2.0
>>> math.log(c,a)
10.0
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// 常用対数
Math.log10(数値);
// 自然対数
Math.log(数値);
// 底a,真数bの対数を取りたいとき
Math.log(b) / Math.log(a);
```

Javascript で常用対数を算出するには Math オブジェクトにある関数 **log10()** 関数を使用する。

`Math.log10(x)`

自然対数を算出するには Math オブジェクトにある **log()** 関数を使用する。

`Math.log(x)`

また任意の底での対数を算出する関数は無いため、

底の変換公式 を用いて前述の **Math.log()** などを利用し算出する。

```javascript
let a = 2;
let b = 4;
let c = 1024;

//常用対数
console.log(Math.log10(100));

//log2(n)を算出する
console.log(Math.log(b) / Math.log(a)); //log(2)4
console.log(Math.log(c) / Math.log(a)); //log(2)1024
```

実行結果

```
2
2
10
```

</div>
