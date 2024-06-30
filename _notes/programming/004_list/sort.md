---
title: "リストのソート"
date: "2019-10-26T19:35:30+09:00"
excerpt: "リスト内の要素をソートする方法。"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-26T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リスト内の要素をソートする方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
import java.util.Collections;
Collections.sort(リスト)    // リストがソートされる（インプレース）

// 逆順にソートしたい時は以下も行う
Collections.reverse(リスト) // リストが逆順になる（インプレース）
```

Java ではリストに関するメソッドがあるライブラリ**java.util.Collections**に、リストをソートするメソッド **sort()** があるので、それを利用する。

逆順にソートしたい時は、ソート した後に リストを逆順にする reverse メソッドを利用する。

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

    for(int i=0;i<l.size();i++){
      System.out.print(l.get(i) + " ");
    }

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
-2 1 3 100
100 3 1 -2
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
リスト.sort() # インプレースで処理。リスト自体もソートされる
# または
sorted(リスト) # インプレースではない。ソートされたリストが返され、リスト自体はそのまま

# 逆順にソートしたい時
リスト.sort(reverse=True)
# または
sorted(リスト,reverse=True)
```

Python ではリストをソートする関数は以下の 2 つがある。

- 組み込み関数**sorted()**
- リストの関数**sort()**

sorted 関数は引数に受け取ったリストをソートしたものを返す。この時、リスト自体はソートされた形にはならない。  
sort 関数は引数は無く、ソートしたいリストの関数として呼び出し利用する。実行後、リストはインプレース(コピーを取らず、そのリストオブジェクトを直接ソートする)でソートされる。

またこの 2 つの関数においてはそれぞれ引数**reverse**があり、それを True に設定してやると逆順にソートしてくれる。（デフォルトではこの引数 reverse は False になっている）

```python
>>> a=[1,9,8,7,6,5,3,2]
>>>
>>> sorted(a)
[1, 2, 3, 5, 6, 7, 8, 9]
>>> a
[1, 9, 8, 7, 6, 5, 3, 2]
>>>
>>> a.sort()
>>> a
[1, 2, 3, 5, 6, 7, 8, 9]
>>>
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
