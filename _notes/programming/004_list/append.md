---
title: "リストに要素を加える"
date: "2019-10-23T19:35:30+09:00"
excerpt: "リストに要素を加える方法。"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-23T19:35:30+09:00"
author:
name: Tatsuroh Wakasugi
picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストに要素を加える方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

Java では List クラスに**add()**というメソッドがあり、引数の要素をリストの最後に追加する。  
`boolean add(E e)`  
型の問題などで要素を追加できない時はエラーとなる。  
また、オーバーロードとしてリストの指定した位置に要素を追加する add メソッドもある。  
`void add(int index, E element)`  
実行例を以下に示す。

```java
import java.util.ArrayList;
import java.util.List;
class Main{
  public static void main(String args[]){
    List<Integer> l = new ArrayList<Integer>();
    l.add(1);
    l.add(3);
    l.add(1,100);

    for(int i=0;i<l.size();i++){
        System.out.println(l.get(i));
    }
  }
}
```

実行結果

```
> java Main
1
100
3
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python ではリストの関数として

- リストの末尾に要素を追加したい場合は**append()**
- リストの末尾以外の指定した位置に要素を追加したい場合は**insert()**

の関数があるので、適宜使い分ける。  
(リストの末尾に要素 x を追加したい時)  
`list.append(x)`  
(リストの指定した位置 i に要素 x を追加したい時)  
`list.insert(i, x)`

```python
>>> a=[]
>>> a.append(1)
>>> a.append(3)
>>>
>>> a
[1, 3]
>>>
>>> a.insert(1,100)
>>> a
[1, 100, 3]
>>>
```

</div>
