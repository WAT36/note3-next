---
title: "任意の底の対数"
date: "2019-10-16T19:19:30.000Z"
excerpt: '任意の底の対数を計算する方法。'
tag: ["Java","Python","Javascript"]
programming: ["Java","Python","Javascript"]
updatedAt: '2019-10-16T19:19:30.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
mode: programming
---

任意の底の対数を算出する方法についてを示す。
しかし、任意の底の対数を算出するライブラリは無いことが多い。
そのため、以下の公式を用いて算出を行う。（底の変換公式）

log<sub>a</sub>b = log<sub>c</sub>b / log<sub>c</sub>a

<div class="note_content_by_programming_language" id="note_content_Java">

Javaには任意の底での対数を算出するメソッドは無いため、  

底の変換公式  を用いて前述の**log10()**、**loge()** を利用し算出する。

```java
import java.lang.Math;
class Main{
    public static void main(String args[]){
        int a = 2;
        int b = 4;
        int c = 1024;

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
10.0
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

`math.log(x,y)`  

pythonには任意の数を底とする対数を算出する関数が存在し、  

それは自然対数を算出する時にも利用したmathモジュールにある **log()** 関数である。  

log(x,y)関数は、yを底としたxの対数を返す。  

yを略した場合（引数１つの場合）、底は自動的にeとなり、自然対数になる。(→自然対数)  

使用するにはmathモジュールをインポートする。    

```python
>>> import math
>>> a=2
>>> b=4
>>> c=1024
>>> 
>>> math.log(b,a) 
2.0
>>> math.log(c,a)
10.0
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

Javascriptにも任意の底での対数を算出する関数は無いため、  

底の変換公式  を用いて前述の **Math.log()** などを利用し算出する。

```javascript
let a = 2;
let b = 4;
let c = 1024;

//log2(n)を算出する
console.log(Math.log(b)/Math.log(a)) //log(2)4
console.log(Math.log(c)/Math.log(a)) //log(2)1024
```

実行結果

```
2
10
```

</div>

