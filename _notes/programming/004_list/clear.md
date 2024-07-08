---
title: "リストを空にする"
date: "2019-10-27T12:35:30+09:00"
excerpt: "リストを空にする方法"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-27T12:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストから全ての要素を削除する方法についてを述べる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
リスト.clear()
```

Java では List クラスにあるメソッド**clear()** を利用する。

`void clear()`

実行例を以下に示す。

```java
import java.util.List;
import java.util.ArrayList;

class Main{
  public static void main(String args[]){

    List<Integer> l = new ArrayList<>();

    l.add(1);
    l.add(2);
    l.add(3);
    l.add(4);

    System.out.println("clear前" + l);

    l.clear();

    System.out.println("clear後" + l);
  }
}
```

実行結果

```
$ java Main
clear前[1, 2, 3, 4]
clear後[]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
リスト.clear()
```

Python ではリストにある関数 **clear()** を使う。

```python
>>> a=[1,2,3,4,5,6]
>>>
>>> a
[1, 2, 3, 4, 5, 6]
>>>
>>> a.clear()
>>>
>>> a
[]
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let arr = [1, 2, 3]; // 例
arr.length = 0;
//  または
arr = [];
```

Array オブジェクトを空にするメソッドは見当たらない（調べ）ため、ここでは主に 2 つの方法を示す。

- Array オブジェクトの長さを 0 に設定する
- Array オブジェクトの変数に空の配列を代入する

以下に例を示す。

```javascript
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.length = 0;
console.log(arr);
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr = [];
console.log(arr);
```

実行結果

```
[]
[]
```

</div>
