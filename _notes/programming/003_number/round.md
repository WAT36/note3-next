---
title: "切り上げ・切り捨て"
date: "2019-10-16T20:35:30+09:00"
excerpt: "小数点以下切り上げ・切り捨てする方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-16T20:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

小数点以下切り上げ・切り捨てする方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
Math.ceil(3.14);  // 4.0
Math.floor(3.14); // 3.0
```

Java では Math クラスにあるメソッド **ceil()** を利用することで小数点以下切り上げを行える。

`public static double ceil(double d)`

このメソッドは引数に入力した数値以上で最も大きい整数を返す。戻り値は double 型。

また、Math クラスにあるメソッド **floor()** を利用することで小数点以下切り捨てを行える。

`public static double floor(double d)`

このメソッドは引数に入力した数値以下で最も大きい整数を返す。戻り値は double 型。

```java
import java.lang.Math;
class Main{
    public static void main(String args[]){
        double a = 10.1;
        double b = 10.0;
        double c =  9.9;

        System.out.println(Math.ceil(a));
        System.out.println(Math.ceil(b));
        System.out.println(Math.ceil(c));

        System.out.println(Math.floor(a));
        System.out.println(Math.floor(b));
        System.out.println(Math.floor(c));
    }
}
```

実行結果

```bash
> java Main
11.0
10.0
10.0
10.0
10.0
9.0
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
import math
math.ceil(3.14)   # 4
math.floor(3.14)  # 3
```

主に方法は二つある。

`math.ceil(x)`

python にも math モジュールに **ceil()** 関数がある。それを利用すると小数点以下切り上げが行える。

```python
>>> import math
>>> a=10.1
>>> b=10.0
>>> c=9.9
>>>
>>> math.ceil(a)
11
>>> math.ceil(b)
10
>>> math.ceil(c)
10
>>>
```

<hr>

また、もう一つの方法として、割り算の結果を切り上げしたい時は  
以下の計算式により結果を切り上げることができる。  
(a÷b の結果を切り上げたい時)

```python
- (-a // b)
```

実行例を以下に示す。

```python
>>> a=5
>>> b=2
>>>
>>> a/b
2.5
>>> -(-a//b)
3
>>>
```

<hr>
<hr>

切り捨てに関しても、主に方法は二つある。

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
Math.ceil(3.14); // 4
Math.floor(3.14); // 3
```

Javascript には Math オブジェクトに **ceil()** 関数がある。それを利用すると小数点以下切り上げが行える。

`Math.ceil(x)`

同様に、Math オブジェクトに **floor()** 関数がある。それを利用すると小数点以下切り捨てが行える。

`Math.floor(x)`

```javascript
let a = 10.1;
let b = 10.0;
let c = 9.9;

console.log(Math.ceil(a));
console.log(Math.ceil(b));
console.log(Math.ceil(c));
console.log(Math.floor(a));
console.log(Math.floor(b));
console.log(Math.floor(c));
```

実行結果

```bash
11
10
10
10
10
9
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
import "math"

math.Ceil(3.14)  // 4
math.Floor(3.14) // 3
```

Go 言語では **math** パッケージの **Ceil()** 関数で小数点以下切り上げを行う。

`func Ceil(x float64) float64`

この関数は引数に入力した数値以上で最も小さい整数を返す。戻り値は float64 型。

また、**math** パッケージの **Floor()** 関数で小数点以下切り捨てを行う。

`func Floor(x float64) float64`

この関数は引数に入力した数値以下で最も大きい整数を返す。戻り値は float64 型。

実行例

```go
package main

import (
    "fmt"
    "math"
)

func main() {
    a := 10.1
    b := 10.0
    c := 9.9

    fmt.Println(math.Ceil(a))  // 11
    fmt.Println(math.Ceil(b))  // 10
    fmt.Println(math.Ceil(c))  // 10

    fmt.Println(math.Floor(a)) // 10
    fmt.Println(math.Floor(b)) // 10
    fmt.Println(math.Floor(c)) // 9
}
```

実行結果

```bash
11
10
10
10
10
9
```

</div>
