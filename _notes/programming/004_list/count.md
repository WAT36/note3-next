---
title: "指定した要素がリスト内にいくつあるか調べる"
date: "2019-10-27T02:35:30+09:00"
excerpt: "指定した要素がリスト内にいくつあるか調べる方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-27T02:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

指定した要素がリスト内にいくつあるか調べる方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// 作成中・・・
```

Java では具体的なメソッドが(調べたところ)無いため、リストの要素を一個一個見ていって調べる。  
（他に方法があるかもしれないので、後に要調査。）

```java
iimport java.util.ArrayList;
import java.util.List;
class Main{
  public static void main(String args[]){

    List<String> l = new ArrayList<>();
    l.add("a");
    l.add("b");
    l.add("c");
    l.add("d");
    l.add("a");
    l.add("a");

    System.out.println("l:" + l );

    int count=0;
    for(int i=0;i<l.size();i++){
        if(l.get(i)=="a"){
            count++;
        }
    }

    System.out.println("a:" + count);
  }
}
```

実行結果

```
>java Main
l:[a, b, c, d, a, a]
a:3
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
リスト.count(値)
```

Python ではリストの関数に **count()** があり、これは引数に指定した要素がリスト内にいくつあるかを返してくれる。

```python
>>> l=['a','b','c','d','a','a']
>>>
>>> l
['a', 'b', 'c', 'd', 'a', 'a']
>>>
>>> l.count('a')
3
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let count = 0;
Array.forEach((value, index, array) => value === 指定要素 && count++);
```

ここも専用のメソッドは見当たらないため、Array オブジェクトの**forEach**メソッドを利用する。

forEach メソッドは、Array オブジェクト内の要素を順に見ていって処理するメソッドである。利用するには引数に関数を入力する。この関数は、引数に value,index,array をおく。value は要素、index はインデックス, array は元の Array オブジェクトを指す。(利用しない場合、index,array は書かなくても良い。)それに応じて、式で value,index,array 等を利用し、処理をさせる。

これを利用し、まず最初に要素数を数える変数を宣言し、forEach メソッド内で要素 value が指定した値(または条件)に合致したときに その変数を 1 増やすような式を書けば良い。

実行例を以下に見せる。これは、Array オブジェクト中にある 2 をカウントし出力するものである。

実行例を以下に示す。

```javascript
let count = 0;
let arr = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2];
let result = arr.forEach((value) => {
  return value === 2 && count++;
});
console.log(count);
// 6
```

</div>
