---
title: "三項演算子"
date: "2019-10-16T22:35:30+09:00"
excerpt: "三項演算子(条件演算子)を利用する方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-16T22:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

条件分岐を行う三項演算子についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
boolean a=true;
int b=0;
int c=1;

a ? b : c
```

Java では三項演算子 " **?** " が実装されている。 例えば上のような式としたとき、a が true なら b を、false なら c を返すという事になる。

三項演算子の前（上記例でいう a）には必ず boolean 値を返すような式にする。

実行例を以下に示す。

```java
class Main{
    public static void main(String args[]){
        System.out.println(true ? "Yes" : "No");

        int a = 0;
        int b = 1;

        System.out.println( a>b ? "a>b" : "a<=b");
    }
}
```

実行結果

```
> java Main
Yes
a<=b
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
a=True
b=0
c=1

b  if  a  else  c
```

Python には三項演算子は実装されてはいない。

しかし、上記のような if,else を利用することで三項演算子と同様の動作を行う式を実装することはできる。

この式では、a が True の時 b を、False なら c を返すという意味である。

無論だが、a には True または False を返すような式を入力する。

実行例を以下に示す。

```python
>>>
>>> a = "Yes" if True else "No"
>>> print(a)
Yes
>>>
>>> a = 0
>>> b = 1
>>>
>>> print( "a>b" if a>b else "a<=b" )
a<=b
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var a = true;
var b = 0;
var c = 1;

a ? b : c;
```

Javascript でも Java と同じく三項演算子 "**?**" が実装されている。利用法も同じである。

条件式 a が true なら b、false なら c を実行する。

</div>
