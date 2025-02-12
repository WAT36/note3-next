---
title: "リストaにありリストbに入ってない要素のみを表示（差集合）"
date: "2019-10-26T22:35:30+09:00"
excerpt: "リスト2つの差集合をとる方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-26T22:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リスト a にありリスト b に入ってない要素のみを表示する方法についてを示す。  
なお、リスト内の要素に重複している要素はないことを前提とする。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// リストaとリストbの差集合をとる
import java.util.HashSet;
import java.util.Set;

リストa.removeAll(リストb); //リストaのうちリストbにもある要素は削除し他は残す
```

Java では List クラスに **removeAll()** というメソッドがある。これは呼び出し元のリストに含まれている要素の内、引数に指定したリスト内に含まれている要素を削除し、他の要素は全て残すというメソッドである。  
`boolean removeAll(Collection<?> c)`  
このメソッドを活用することにより２つのリストの差集合をとることができる。ただし同じ値の要素が複数入っていた場合はその数だけ要素が残るということもあるので、重複している値を１つにするには **Set()** 等を使い重複を排除する。

使用例を以下に示す。

```java
import java.util.ArrayList;
import java.util.List;
class Main{

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
    m.add(0);

    System.out.println("l  :" + l);
    System.out.println("m  :" + m);

    l.removeAll(m);

    System.out.println("l-m:" + l);
  }
}
```

実行結果

```
> java Main
l  :[1, 3, 100, 0]
m  :[2, 4, 100, 0]
l-m:[1, 3]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# リストaとリストbの差集合をとる
list(set(リストa) - set(リストb))
```

Python ではリストを set 型に変換し、その後 **-** 演算子を使うと、引かれた set にのみある要素のみが残る。  
リストに戻したい時は、計算後の set を list()で変換してリストにする。

```python
>>> a=[1,9,8,7,6,5,3,2]
>>> b=[2,3,4]
>>>
>>> a_minus_b=set(a)-set(b)
>>> a_minus_b
{1, 5, 6, 7, 8, 9}
>>>
>>> list(a_minus_b)
[1, 5, 6, 7, 8, 9]
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
//Array_a,Array_bの2つのArrayオブジェクトがあるとする
Array_a.filter((value) => !Array_b.includes(value));
```

2 つの Array オブジェクトに対し片方のみにある要素のみを取り出す(差集合)には、ここも専用のメソッドが見当たらない（あればお知らせください。。）ため、
積集合と同様に Array オブジェクトの**filter**メソッドと**includes**メソッドを利用する。

先ほどの積集合と逆で、includes メソッドで false が返ってくるときに true となるように、`!include`とすれば良い。

実行例を以下に示す。

```javascript
let arrA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let arrB = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
console.log(arrA.filter((value) => !arrB.includes(value)));
```

実行結果

```
[1, 2, 3, 4]
```

</div>
