---
title: "論理演算子"
date: "2024-04-17T00:32:18.000Z"
excerpt: "論理演算・ビット演算(AND,OR,XOR)を利用する方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2024-04-17T00:32:18.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

論理演算及びビット演算で利用する論理演算子についてを示す。

論理演算とは、真偽値（真または偽）を扱うための演算で、2 つ以上(NOT は 1 つも可)の真偽値の組み合わせから 1 つの真偽値を算出する演算である。

ビット演算とは、主に数値に対してビット単位での演算を行うための演算である。

論理演算子は、主に AND,OR,XOR,NOT の種類がある。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
boolean a = true;
boolean b = false;

int c = 0;
int d = 1;

// 論理演算
a && b //AND
a || b // OR
a ^ b  //XOR
!a     //NOT

// ビット演算
c & d //AND
c | d // OR
c ^ d //XOR
~c    //NOT
```

Java での論理演算子は以下の通り。

|     | 論理演算 | ビット演算 |
| :-: | :------: | :--------: |
| AND |    &&    |     &      |
| OR  |   ｜｜   |     ｜     |
| XOR |    ^     |     ^      |
| NOT |    !     |     ~      |

以下に使用例を示す。

```java
class Main{
    public static void main(String args[]){
        boolean a = true;
        boolean b = false;

        int c = 3; //0011
        int d = 5; //0101

        System.out.println(a && b);
        System.out.println(a || b);
        System.out.println(a ^ b);
        System.out.println(!a);

        System.out.println(c & d); // 0001
        System.out.println(c | d); // 0111
        System.out.println(c ^ d); // 0110
        System.out.println(~c);    // 11...1100
    }
}
```

実行結果

```
false
true
true
false
1
7
6
-4
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
a = True
b = False
c = 0
d = 1

# 論理演算
a and b # AND
a or  b # OR
a != b  # XOR
not a   # NOT

# ビット演算
c & d # AND
c | d # OR
c ^ d # XOR
~c    # NOT
```

Python での論理演算子は以下の通り。

|     | 論理演算 | ビット演算 |
| :-: | :------: | :--------: |
| AND |   and    |     &      |
| OR  |    or    |     ｜     |
| XOR |    !=    |     ^      |
| NOT |   not    |     ~      |

以下に使用例を示す。

```python
>>> a = True
>>> b = False
>>> c = 3
>>> d = 5
>>>
>>> a and b
False
>>> a or b
True
>>> a != b
True
>>> not a
False
>>>
>>> c & d
1
>>> c | d
7
>>> c ^ d
6
>>> ~c
-4
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var a = true;
var b = false;
var c = 0;
var d = 1;

// 論理演算
a && b; //AND
a || b; // OR
!a; //NOT

// ビット演算
c & d; //AND
c | d; // OR
c ^ d; //XOR
~c; //NOT
```

Javascript での論理演算子は以下の通り。

|     | 論理演算 | ビット演算 |
| :-: | :------: | :--------: |
| AND |   and    |     &      |
| OR  |    or    |     ｜     |
| XOR |  (なし)  |     ^      |
| NOT |   not    |     ~      |

Javascript の論理演算では XOR は存在しない（私調べですが、もしあったらコメントお願いします。。）

以下に使用例を示す。

```javascript
var a = true;
var b = false;
var c = 3;
var d = 5;

console.log(a && b);
console.log(a || b);
console.log(!a);

console.log(c & d);
console.log(c | d);
console.log(c ^ d);
console.log(~c);
```

実行結果

```
> false
> true
> false
> 1
> 7
> 6
> -4
```

</div>
