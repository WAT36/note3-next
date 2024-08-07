---
title: "リストの指定したインデックスの要素を削除する"
date: "2019-10-27T00:35:30+09:00"
excerpt: "リストの指定したインデックスの要素を削除する方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-27T00:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストの指定した位置の要素を削除する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
リスト.remove(削除する位置) // インプレースで処理
```

Java では List クラスにリストの指定した位置（インデックス）の要素を削除するメソッド **remove()** がある。  
`E remove(int index)`  
このメソッドはリストから指定したインデックスの要素を取り出して返す。その後リストでは取り出されたインデックスよりも後続の要素を左に移動する動作を行う。

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
    System.out.println(l.remove(1));    //lの1番目の要素を取り出して返す

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
3
1 -2 100
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
リスト.pop(削除する位置)
# または
del リスト[削除する位置]
```

Python での方法は次の 2 つがある。

- リストの関数 **pop()** を利用する。
- **del** 文を利用する

pop 関数はリストの指定した位置（インデックス）を引数とし、実行するとリストからそのインデックスの要素を取り出し、返す。  
del 文は リスト[インデックス] の形で入力を行い、実行するとリストからそのインデックスの要素が取り出されるが、値は返されない。

以下に実行例を示す。

```python
>>> a=[1,9,8,7,6,5,3,2]
>>>
>>> a
[1, 9, 8, 7, 6, 5, 3, 2]
>>>
>>> #pop では値が返ってくる
>>> a.pop(1)
9
>>>
>>> a
[1, 8, 7, 6, 5, 3, 2]
>>>
>>> #delでは取り出された値は返ってこない (返り値無し)
>>> del a[1]
>>>
>>> a
[1, 7, 6, 5, 3, 2]
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Array.splice(削除する位置, 1);
// 先頭の要素を削除したい場合は以下も可
Array.shift();
// 末尾の要素を削除したい場合は以下も可
Array.pop();
```

javascript で Array オブジェクト中の指定した位置の要素を削除したい時は、基本的には**splice**メソッドを使う。

splice メソッドは、指定した位置から指定した数の文だけの要素を、指定した要素に置き換えるメソッドである。

ここでは、指定した位置から 1 個分(=指定した位置のみ)を、要素無しに置き換えているので、指定した位置の要素が削除されることになる。

また、Array オブジェクトの先頭または末尾の要素を削除したい場合は、それぞれ**shift**、**pop**メソッドがあるので、こちらを使った方が良い。

shift,pop メソッドは、実行するとそれぞれ Array オブジェクトの先頭、末尾の要素が返ってくる。その後元の Array オブジェクトは先頭、末尾の要素が削除された状態になる。

例を以下に示す。

```javascript
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

arr.splice(4, 1);
console.log(arr);

arr.shift();
console.log(arr);

arr.pop();
console.log(arr);
```

実行結果

```
[1, 2, 3, 4, 6, 7, 8, 9, 10]
[2, 3, 4, 6, 7, 8, 9, 10]
[2, 3, 4, 6, 7, 8, 9]
```

</div>
