---
title: "リストaまたはbに入っている要素を表示（和集合）"
date: "2019-10-26T21:35:30+09:00"
excerpt: "リスト2つの和集合をとる方法。"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-26T21:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

2 つのリストの少なくとも一つに入っている要素のみを表示する方法についてを示す。  
なお、リスト内の要素に重複している要素はないことを前提とする。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// リストaとリストbの和集合をとる
import java.util.HashSet;
import java.util.Set;

リストa.addAll(リストb); //aにbの要素全て追加
Set<Integer> set_a = new HashSet<Integer>(リストa); // リストaをSet型にして重複排除
リストa = new ArrayList<Integer>(set_a); // Set型にしたaをまたList型に戻す
```

Java での考え方としては

- **addAll()** メソッドを利用してリスト a にリスト b の要素を全て加える
- リストを**Set**にして重複要素を排除する
- 作成した Set を再び List にすると最終的にリスト a または b に入っている要素が残る

のようなアルゴリズムが考えられる。使用例を以下に示す。

```java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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

    List<Integer> b = new ArrayList<Integer>();
    b.add(2);
    b.add(4);
    b.add(100);
    b.add(0);
    listprint("b", b);

    //a <- b
    a.addAll(b);

    //a(Set) <- a(List)
    Set<Integer> set_a = new HashSet<Integer>(a);

    //a(List) <- a(Set);
    a = new ArrayList<Integer>(set_a);

    listprint("a or b", a);
  }
}
```

実行結果

```
> java Main
a: 1 3 100 0
b: 2 4 100 0
a or b: 0 1 2 3 100 4
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# リストaとリストbの和集合をとる
list(set(リストa) | set(リストb))
```

Python ではリストを set 型に変換し、その後 **|** 演算子を使うと、両リストの少なくとも一つにある要素が残る。  
リストに戻したい時は、計算後の set を list()で変換してリストにする。

```python
>>>
>>> a=[1,9,8,7,6,5,3,2]
>>> b=[2,3,4]
>>> a_or_b = set(a) | set(b)
>>> a_or_b
{1, 2, 3, 4, 5, 6, 7, 8, 9}
>>>
>>> list(a_or_b)
[1, 2, 3, 4, 5, 6, 7, 8, 9]
>>>
```

</div>
