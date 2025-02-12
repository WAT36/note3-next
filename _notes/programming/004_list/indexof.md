---
title: "指定した要素のリスト内でのインデックスを調べる"
date: "2019-10-27T08:35:30+09:00"
excerpt: "指定した要素のリスト内でのインデックスを調べる方法"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-27T08:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

指定した要素がリスト内でどの位置にいるかを調べる方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
リスト.indexOf(要素)
//末尾から数えたい時は
リスト.lastIndexOf(要素)
```

Java では List クラスにある **indexOf()** というメソッドで、要素があるインデックスを取得することができる。

`int indexOf(Object o)`

なお、リスト内に指定した要素が複数入っていた場合は、一番最初にある要素のインデックスを返す。  
指定した要素がリスト内にない場合は、-1 を返す。

また、リストで後ろの方から検索を行う **lastIndexOf()** というメソッドもある。

`int lastIndexOf(Object o)`

indexOf とは逆に、リスト内に指定した要素が複数入っていた場合は、一番最後にある要素のインデックスを返す。

実行例を下記に示す。

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
    l.add(3);

    listprint("l", l);

    System.out.println("index of \'1\': " + l.indexOf(1));
    System.out.println("index of \'3\': " + l.indexOf(3));
    System.out.println("index of \'5\': " + l.indexOf(5));

    System.out.println("last index of \'1\': " + l.lastIndexOf(1));
    System.out.println("last index of \'3\': " + l.lastIndexOf(3));
    System.out.println("last index of \'5\': " + l.lastIndexOf(5));
  }
}
```

実行結果

```
> java Main
l: 1 3 100 0 3
index of '1': 0
index of '3': 1
index of '5': -1
last index of '1': 0
last index of '3': 4
last index of '5': -1
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
リスト.index(値)
```

Python ではリストの関数に **index()** というのがあり、引数に指定した要素のリスト内でのインデックスを返してくれる。  
`list.index(x[, start[, end]])`  
指定した要素 x がリスト内に複数ある場合は、リスト内の最初の要素のインデックスを返す。  
リストの指定した範囲内のみで調べたい場合は、引数 start,end に値を設定して行うと、指定した範囲内で行える。  
指定した要素 x がリスト内に無い場合 ValueError が返される。

```python
>>> a=[1,3,100,0,3]
>>>
>>> a.index(1)      #a全体で1を探索
0
>>> a.index(3)      #a全体で3を探索
1
>>> a.index(3,1)    #a[1]以降で3を探索
1
>>> a.index(3,2)    #a[2]以降で3を探索
4
>>> a.index(3,5)    #a[5]以降で3を探索 -> 無いのでエラー
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: 3 is not in list
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Array.indexOf(要素 [,検索開始位置])
//末尾から数えたい時は
Array.lastIndexOf(要素 [,検索開始位置])
```

Javascript では Array オブジェクトに**indexOf**メソッドがあり、これを利用すると指定した要素と同じ要素を先頭から探し出し、Array オブジェクトのどの位置にあるかを出力してくれる。（先頭からでなく、指定した位置から検索したい時は、第２引数にその位置を指定する。）

先頭からではなく、末尾から検索したいときは、同じく Array オブジェクトの**lastIndexOf**メソッドを利用する。こちらも同じく指定した位置から検索したい時は、第２引数にその位置を指定する。

例を以下に示す。

```javascript
let arr = ["a", "b", "c", "b", "a"];
console.log(arr.indexOf("b")); // 1
console.log(arr.indexOf("b", 2)); // 3
console.log(arr.lastIndexOf("b")); // 3
console.log(arr.lastIndexOf("b", 2)); // 1
```

</div>
