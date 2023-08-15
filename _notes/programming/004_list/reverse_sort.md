---
title: "リストを逆順にソート"
date: "2019-10-26T20:35:30+09:00"
excerpt: "リスト内の要素を逆順にソートする方法。"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-26T20:35:30+09:00"
author:
name: Tatsuroh Wakasugi
picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リスト内の要素を逆順にソートする方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

Java ではリストを逆順にソートするメソッドは無いため、前述の リストのソート と リストを逆順にする 方法を組み合わせて利用する。  
実行例を以下に示す。

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Collections;
class Main{
  public static void main(String args[]){
    List<Integer> l = new ArrayList<Integer>();
    l.add(1);
    l.add(3);
    l.add(-2);
    l.add(100);

    for(int i=0;i<l.size();i++){
        System.out.print(l.get(i) + " ");
    }

    System.out.println();
    Collections.sort(l);
    Collections.reverse(l);

    for(int i=0;i<l.size();i++){
      System.out.print(l.get(i) + " ");
    }
  }
}
```

実行結果

```
> java Main
1 3 -2 100
100 3 1 -2
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python では[リストをソート]({{< relref "/docs/programming/list/sort.md" >}})する方法で述べた 2 つの関数において、それぞれ引数**reverse**があり、それを True に設定してやると逆順にソートしてくれる。（デフォルトではこの引数 reverse は False になっている）

```python
>>> a=[1,9,8,7,6,5,3,2]
>>>
>>> sorted(a,reverse=True)
[9, 8, 7, 6, 5, 3, 2, 1]
>>>
>>> a
[1, 9, 8, 7, 6, 5, 3, 2]
>>>
>>> a.sort(reverse=True)
>>> a
[9, 8, 7, 6, 5, 3, 2, 1]
>>>
```

</div>
