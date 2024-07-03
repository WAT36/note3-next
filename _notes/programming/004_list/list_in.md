---
title: "指定した要素がリスト内にあるか調べる"
date: "2019-10-27T03:35:30+09:00"
excerpt: "指定した要素がリスト内にあるか調べる方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-27T03:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

ある要素がリスト内に存在するかを調べる方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
リスト.contains(値)
```

Java では List クラスに **contains()** というメソッドがある。これは呼び出し元のリストに引数に指定した要素が含まれていた場合に true、そうでない場合 false を返すメソッドである。

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

```python
値 in リスト
```

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
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Array.indexOf(要素) !== -1;
```

ここは Array オブジェクトの**indexOf**メソッドを利用する。

indexOf メソッドは、引数に指定した要素が Array オブジェクトにあるか探し、あった場合はそのインデックスを返すのだが、ない場合は-1 を返す。これを利用し、indexOf メソッドで返ってくる値が-1 でなかったら存在し、-1 の場合は存在しないと判断できる。

実行例を以下に示す。

```javascript
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let elm = 11;
console.log(
  `${elm}はarrに存在${arr.indexOf(elm) !== -1 ? "します" : "しません"}`
);
```

実行結果

```
11はarrに存在しません
```

</div>
