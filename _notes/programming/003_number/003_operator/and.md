---
title: "論理積(AND)"
date: "2019-10-17T19:35:30+09:00"
excerpt: 'ANDビット演算を利用する方法。'
tag: ["Java","Python","Javascript"]
programming: ["Java","Python","Javascript"]
updatedAt: '2019-10-17T19:35:30+09:00'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
mode: programming
---


ANDビット演算をする方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

`(左辺) & (右辺)`  

JavaではANDのビット演算子 **&** を使用する。

論理演算の時とは違い、こちらは & 1個なので注意。数値型リテラルでも、boolean型でも入力可。  

```java
class Main{
    public static void main(String args[]){
        boolean a = true;
        boolean b = false;

        int c = 3; //0011
        int d = 5; //0101

        System.out.println(a & a);
        System.out.println(a & b);
        System.out.println(b & b);

        System.out.println(c & c); //0011 -> 3
        System.out.println(c & d); //0001 -> 1
        System.out.println(d & d); //0101 -> 5
    }
}
```

実行結果

```
> java Main
true
false
false
3
1
5
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

`(左辺) & (右辺)`  

ビット演算に関してはpythonもjavaと同じで **&** を使用する。

```python
>>> 
>>> a = True
>>> b = False
>>> c = 3
>>> d = 5
>>> 
>>> print(a & a)
True
>>> print(a & b)
False
>>> print(b & b)
False
>>>
>>> print(c & c)
3
>>> print(c & d)
1
>>> print(d & d)
5
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

`(左辺) & (右辺)`  

ビット演算に関してはJavascriptもjavaと同じで **&** を使用する。

```javascript
> 0 & 1
< 0
> a = 2
< 2
> b = 3
< 3
> a & b
< 2
```

</div>

