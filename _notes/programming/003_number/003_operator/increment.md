---
title: "インクリメント・デクリメント"
date: "2019-10-17T19:35:30+09:00"
excerpt: "インクリメント・デクリメント(変数の値を1増やす・減らす)演算を利用する方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-17T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

インクリメント・デクリメント(変数の値を 1 増やす・減らす)演算について。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
int x=0;

// 最後にインクリメント・デクリメントを実行する場合
x++;
x--;
// 最初にインクリメント・デクリメントを実行する場合
++x;
--x;
```

Java ではインクリメント・デクリメントの演算子（ **++**、**--** ）がそれぞれ用意されている。

利用するには変数の前または後ろに付け加えて書く。

ただし、変数の前に書いた場合と後ろに書いた場合とで、計算が行われるタイミングが異なるので注意する。

これら演算子は他の数式と組み合わせて記述することができるが、変数の前に置いた場合は先にインクリメント・デクリメント計算が行われてから全体の計算式を実行し、後に置いた場合は全体の計算式が実行されてからインクリメント・デクリメント計算が行われる。

実行例を以下に示す。

```java
import java.util.Map;
import java.util.HashMap;
class Main{
  public static void main(String args[]){

    int a = 0;

    //aをインクリメント(1増やす)。a->1
    a++;
    System.out.println("a:"+ a);

    //aをデクリメント(1減らす)。a->0
    a--;
    System.out.println("a:"+ a);

    //aをインクリメントしてから全体の計算式実行（aに1足してからprintln）
    System.out.println("a:"+ ++a);

    //全体の計算式実行してからaをインクリメント（printlnしてからaに1を足す）
    System.out.println("a:"+ a++);

    //a表示（↑のprintlnの後にaがインクリメントされているので、aは2）
    System.out.println("a:"+ a);
  }
}
```

実行結果

```
> java Main
a:1
a:0
a:1
a:1
a:2
```

変数のインクリメント・デクリメントを行うタイミングに注意して設定する事。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
x = 0
# pythonには演算子は存在しない
# 実行させるなら以下

x = x + 1 # (x += 1)
x = x - 1 # (x -= 1)
```

Python では Java 等のようなインクリメント・デクリメント用の演算子は**存在しない**。

そのため、インクリメントは`(変数) += 1`、デクリメントは `(変数) -= 1` という形で行う。

```python
>>> a = 0
>>> a
0
>>> a += 1
>>> a
1
>>>
>>> a -= 1
>>> a
0
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var x = 0;

// 最後にインクリメント・デクリメントを実行する場合
x++;
x--;
// 最初にインクリメント・デクリメントを実行する場合
++x;
--x;
```

Javascript にもインクリメント・デクリメント演算子が（ **++**、**--** ）がそれぞれ用意されている。

利用法は Java と同じ。

```
(変数)++;
(変数)--;
```

</div>
