---
title: "論理和(OR)"
date: "2019-10-17T18:35:30+09:00"
excerpt: 'ORビット演算を利用する方法。'
tag: ["Java","Python","Javascript"]
programming: ["Java","Python","Javascript"]
updatedAt: '2019-10-17T18:35:30+09:00'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
mode: programming
---


ORビット演算をする方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

`(左辺) | (右辺)`  

JavaではORのビット演算子 **|** を使用する。

論理演算の時とは違い、こちらは | 1個なので注意。数値型リテラルでも、boolean型でも入力可。  

```java
class Main{
    public static void main(String args[]){
        boolean a = true;
        boolean b = false;

        int c = 3; //0011
        int d = 5; //0101

        System.out.println(a | a);
        System.out.println(a | b);
        System.out.println(b | b);

        System.out.println(c | c); //0011 -> 3
        System.out.println(c | d); //0111 -> 7
        System.out.println(d | d); //0101 -> 5
    }
}
```

実行結果

```
> java Main
true
true
false
3
7
5
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

`(左辺) | (右辺)`  

ビット演算に関してはpythonもjavaと同じで **|** を使用する。

```python
>>> 
>>> a = True
>>> b = False
>>> c = 3
>>> d = 5
>>> 
>>> print(a | a)
True
>>> print(a | b)
True
>>> print(b | b)
False
>>>
>>> print(c | c)
3
>>> print(c | d)
7
>>> print(d | d)
5
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

`(左辺) | (右辺)`  

ビット演算に関してはJavascriptもjavaと同じで **|** を使用する。

```javascript
> 0 | 1
< 1
> a = 2
< 2
> b = 3
< 3
> a | b
< 3
```

</div>

