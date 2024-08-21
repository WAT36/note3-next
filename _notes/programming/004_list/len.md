---
title: "配列・リストの長さ"
date: "2019-10-22T19:35:30+09:00"
excerpt: "配列・リストの長さ(要素数)を調べる方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-22T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

配列・リストの長さ（＝配列・リストに入っているデータの個数）を取得する方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// 配列
配列.length

// リスト
リスト.size();
```

Java では 配列には**length** というプロパティがありこれが配列の長さを、  
リストは List クラスに **size()** というメソッドがあり、これはリストに入っているデータの個数（＝リストの長さ）を返してくれる。  
`int size()`  
実行例を以下に示す。

```java
import java.util.ArrayList;
import java.util.List;
class Main{
  public static void main(String args[]){
    List<Integer> l = new ArrayList<Integer>();
    l.add(1);
    l.add(3);

    System.out.println(l.size());
  }
}
```

実行結果

```
> java Main
2
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
len(リスト)
```

Python では **len()** という関数があり、引数のリストの長さ（リスト内の要素の数）を返してくれる。

```python
>>> a=[1,2,3]
>>>
>>> len(a)
3
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Array.length;
```

Javascript も Java と同じく Array オブジェクトに**length**という属性がある。それが配列の長さを示している。

```javascript
> [1,2,3,4,5].length
> 5
```

</div>
