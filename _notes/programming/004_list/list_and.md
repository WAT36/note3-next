---
title: "リストa,bに共通して入っている要素のみを表示（積集合）"
date: "2019-10-26T21:35:30+09:00"
excerpt: "リスト2つの積集合(共通する要素)をとる方法。"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-26T21:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

2 つのリストに共通して入っている要素のみを表示する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

Java では List クラスに **retainAll()** というメソッドがある。これは呼び出し元のリストに含まれている要素の内、引数に指定したリスト内にも含まれている要素のみを残し、他の要素は全て削除するというメソッドである。  
`boolean retainAll(Collection<?> c)`  
このメソッドを活用することにより２つのリストに共通して入っている要素のみを取り出すことができる。ただし同じ値の要素が複数入っていた場合はその数だけ要素が残るということもあるので、重複している値を１つにするには **Set()** 等を使い重複を排除する。

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

    List<Integer> m = new ArrayList<Integer>();
    m.add(2);
    m.add(4);
    m.add(100);
    m.add(100);

    listprint("l", l);
    listprint("m", m);

    l.retainAll(m);

    listprint("l", l);
  }
}
```

実行結果

```
> java Main
l: 1 3 100 0
m: 2 4 100 100
l: 100
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python ではリストを set 型に変換し、その後 **&** 演算子を使うと、重複している要素のみが残る。  
リストに戻したい時は、計算後の set を list()で変換してリストにする。

```python
>>> a=[1,9,8,7,6,5,3,2]
>>> b=[2,3,4]
>>>
>>> a_and_b=set(a) & set(b)
>>> a_and_b
{2, 3}
>>>
>>> list(a_and_b)
[2, 3]
>>>
```

</div>
