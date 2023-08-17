---
title: "指定した要素がリスト内にあるか調べる"
date: "2019-10-27T03:35:30+09:00"
excerpt: "指定した要素がリスト内にあるか調べる方法。"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-27T03:35:30+09:00"
author:
name: Tatsuroh Wakasugi
picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

ある要素がリスト内に存在するかを調べる方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

Java では List クラスに**contains()**というメソッドがある。これは呼び出し元のリストに引数に指定した要素が含まれていた場合に true、そうでない場合 false を返すメソッドである。  
`boolean contains(Object o)`

使用例を以下に示す。

```java
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
    List<Integer> l = new ArrayList<Integer>();
    l.add(1);
    l.add(3);
    l.add(100);
    l.add(0);

    listprint("l", l);


  }
}
```

実行結果

```
> java Main
l: 1 3 100 0
true
false
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python では **in** 演算子が利用でき、これにより指定した要素がリスト内に含まれているかを確認できる。  
含まれている場合は True を、そうでない場合は False を返す。

```python
>>> a=[1,9,8,7,6,5,3,2]
>>>
>>> 1 in a
True
>>> 10 in a
False
>>>
```

</div>
