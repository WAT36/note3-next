---
title: "リストの指定した位置に要素追加"
date: "2019-10-24T19:35:30+09:00"
excerpt: "リストの指定した位置に要素を加える方法。"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-24T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストの指定した位置に要素を追加する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

Java では List クラスに **add()** というメソッドがある。前章の「リストへの要素追加」で述べたメソッドと名前が同じであるが、こちらはそれに挿入する位置を引数に追加したメソッドである。  
`void add(int index,E element)`  
このメソッドを活用することによりリストの任意の位置に要素を追加することができる。

使用例を以下に示す。

```java
import java.util.List;
import java.util.ArrayList;
class Main{
  public static void main(String args[]){
    List<String> l = new ArrayList<>();
    l.add("a");
    l.add("b");
    l.add("c");
    l.add("d");

    System.out.println(l);

    //リストの2番目に要素"[2]"を追加
    l.add(2,"[2]");

    System.out.println(l);
  }
}
```

実行結果

```
> java Main
[a, b, c, d]
[a, b, [2], c, d]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python ではリストに関数**insert**がある。これを利用することにより、リストの指定した位置に要素を追加できる。  
`list.insert(i, x)`  
第１引数はリストのインデックスで、その位置に第２引数 x が挿入される。

実行例を以下に示す。

```python
>>> l=[1,2,3,4]
>>>
>>> l
[1, 2, 3, 4]
>>>
>>> l.insert(2,"[2]")
>>>
>>> l
[1, 2, '[2]', 3, 4]
>>>
```

</div>
