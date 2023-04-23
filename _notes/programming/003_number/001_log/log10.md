---
title: "常用対数"
date: "2019-10-16T17:19:30.000Z"
excerpt: '常用対数(底10)を計算する方法。'
tag: ["Java","Python","Javascript"]
programming: ["Java","Python","Javascript"]
updatedAt: '2019-10-16T17:19:30.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
mode: programming
---

常用対数(log10)を算出する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

`public static double log10(double a)`   

Javaではjava.lang.Mathクラス内にある **log10()** メソッドがこの役割を果たす。  

利用するにはjava.lang.Mathクラスをインポートする。   


```java
import java.lang.Math;
class Main{
    public static void main(String args[]){
        int a = 100;
        int b = 500;

        System.out.println(Math.log10(a));
        System.out.println(Math.log10(b));
    }
}
```

実行結果

```
$ javac Main.java 
$ java Main
2.0
2.6989700043360187
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

`math.log10(x)`

pythonで常用対数を算出するにはmathモジュールにある関数 **log10()** 関数を使用する。  
使用するにはmathモジュールをインポートする。  

```python
>>> import math
>>> a = 100     
>>> b = 500 
>>> 
>>> math.log10(a)
2.0
>>> math.log10(b)
2.6989700043360187
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

`Math.log10(x)`

Javascriptで常用対数を算出するにはMathオブジェクトにある関数 **log10()** 関数を使用する。  

使用例

```Javascript
let a = 100     
let b = 500 

console.log(Math.log10(a))
console.log(Math.log10(b))
```

実行結果

```
2
2.6989700043360187
```


</div>

