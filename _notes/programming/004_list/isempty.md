---
title: "リストが空であるか判別する"
date: "2019-10-27T11:35:30+09:00"
excerpt: "リストが空であるか判別する方法"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-27T11:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストが空（＝要素が何も入っていない状態）であるか判別する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
リスト.isEmpty()
```

Java では List クラスにリストが空であるかを判別するメソッド **isEmpty()** がある。  
`boolean isEmpty()`
空の場合は true を、そうでない場合は false を返す。

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Collections;
class Main{
  public static void main(String args[]){
    List<Integer> l = new ArrayList<Integer>();

    System.out.println(l.isEmpty());

    l.add(1);
    l.add(3);
    l.add(-2);
    l.add(100);

    System.out.println(l.isEmpty());
  }
}
```

実行結果

```
> java Main
true
false
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
len(リスト) == 0
```

Python にはリストが空であるかを判別するための関数は無い。  
リストが空であるかを判別するには、以下の方法を利用するなどしてみる。

- リストの長さが 0 であるかで確認する
- 関数 bool()を使って Boolean 値に変換する。この時リストが空なら False、そうでない時は True を返す。

リストの長さが 0 であるかを調べるには単純に len(リスト) == 0 を行えばよいが、  
もう一つの、実はリストが空でない場合、bool で変換すると True を返す特性があるという。これを使用してもよい。

```python
>>> a=[]
>>> a
[]
>>>
>>> len(a) == 0  #リストが空であるか?
True
>>> bool(a)      #空のリストをboolで変換する
False
>>>
>>>
>>> b=[1,2,3,4,5]
>>> b
[1, 2, 3, 4, 5]
>>>
>>> len(b) == 0 #リストが空であるか?
False
>>> bool(b)     #空でないリストをboolで変換する
True
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Array.length === 0;
```

ここでは Array オブジェクトの長さが 0 であるかを判別することで空であるかを判定する。

以下に例を示す。

```javascript
let arr = [];
console.log(`arrは空${arr.length === 0 ? "です" : "でない"}`);
```

実行結果

```
arrは空です
```

</div>
