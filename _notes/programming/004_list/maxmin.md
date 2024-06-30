---
title: "リスト内の要素の最大値・最小値を取得する"
date: "2019-10-27T09:35:30+09:00"
excerpt: "リスト内の要素の最大値・最小値を取得する方法"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-27T09:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リスト内の要素のうち一番大きい値を取得する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
import java.util.Collections;
// 最大値
Collections.max(リスト)
// 最小値
Collections.min(リスト)
```

Java ではリストに関するメソッドがあるライブラリ**java.util.Collections**に、リスト内の要素の最大値を取得するメソッド **max()** 及び最小値を取得するメソッド **min()** があるので、それを利用する。  
String など文字列のリストの場合は、値を辞書順に並べたときの一番後ろの値が返される。

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

    System.out.println( Collections.max(l) );

    List<String> s = new ArrayList<String>();
    s.add("a");
    s.add("c");
    s.add("banana");
    s.add("010101");

    for(int i=0;i<s.size();i++){
        System.out.print(s.get(i) + " ");
    }

    System.out.println();

    System.out.println( Collections.max(s) );
    System.out.println( Collections.min(s) );
  }
}
```

実行結果

```
> java Main
1 3 -2 100
100
a c banana 010101
c
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
max(リスト)
```

Python には組み込み関数 **max()** 及び **min()** があり、引数として受け取ったイテラブルな値の最大値・最小値を返してくれる。  
要素が文字列の場合は、辞書順に並べたときの一番後ろ・初めの値が返される。

```python
>>> a=[1,9,8,7,6,5,3,2]
>>>
>>> max(a)
9
>>>
>>> b=["a","c","banana","0101"]
>>>
>>> max(b)
'c'
>>> b.append("e")
>>>
>>> max(b)
'e'
>>>
>>> min(a)
1
>>>
>>>
>>> min(b)
'0101'
>>>
```

</div>
