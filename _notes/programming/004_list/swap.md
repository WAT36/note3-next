---
title: "リスト内の指定した２要素を入れ替える"
date: "2019-10-27T04:35:30+09:00"
excerpt: "リスト内の指定した２要素を入れ替える方法。"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-27T04:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストの指定した２つの位置の要素を入れ替える方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
import java.util.Collections;
Collections.swap(リスト,a,b) //リストのa番目の要素とb番目の要素を入れ替える
```

Java は List の親クラスである Collections クラスに **swap()** メソッドがあるので、これを利用する。  
`public static void swap(List<?> list,int i,int j)`  
使用例を以下に示す。

```java
import java.util.Collections;
import java.util.ArrayList;
import java.util.List;
class Main{

  //List println
  public static void listprint(String name,List<Integer> l){
    System.out.print(name + ": ");
    for(int i=0;i<l.size();i++){
      System.out.print(l.get(i) + " ");
    }
    System.out.println();
  }

  public static void main(String args[]){
    List<Integer> a = new ArrayList<Integer>();
    a.add(1);
    a.add(3);
    a.add(100);
    a.add(0);
    listprint("a", a);

    Collections.swap(a,0,2);

    listprint("a", a);

  }
}
```

実行結果

```
> java Main
a: 1 3 100 0
a: 100 3 1 0
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
#（リストの a 番目、b 番目の要素の入れ替え）
リスト[a],リスト[b] = リスト[b],リスト[a]
```

Python ではリストの 2 要素の交換に関しての関数は特に無いが、上記のように書くことで要素の入れ替えが行える。

使用例を以下に示す。

```python
>>> a=[1,9,8,7,6,5,3,2]
>>> a
[1, 9, 8, 7, 6, 5, 3, 2]
>>>
>>> a[0],a[2] = a[2],a[0]
>>>
>>> a
[8, 9, 1, 7, 6, 5, 3, 2]
>>>
```

</div>
