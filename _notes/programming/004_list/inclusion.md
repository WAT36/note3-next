---
title: "リストから条件に合う要素のみを取得した新しいリストを作成する"
date: "2019-10-27T06:35:30+09:00"
excerpt: "リストから条件に合う要素のみを取得した新しいリストを作成する"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-27T06:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストから条件に合う要素のみを取得した新しいリストを作成する方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// (記事参照)
```

Java ではリストの要素を１個１個見ていって、条件に合っていたら別リストにその要素を追加させていけば、そのリストが条件に合う要素のみを格納したリストになる。  
（単純だが、もっといい方法が無いか模索中）

一例として、文字列のリストから３文字以上の要素のみを取り出したリストを作る例を示す。

```java
import java.util.ArrayList;
import java.util.List;
class Main{
  public static void main(String args[]){

    List<String> l = new ArrayList<>();
    l.add("a");
    l.add("bb");
    l.add("ccc");
    l.add("dddd");
    System.out.println(l);

    List<String> m = new ArrayList<>();
    for(int i=0;i<l.size();i++){
      if(l.get(i).length() >= 3){
        m.add(l.get(i));
      }
    }
    System.out.println(m);
  }
}
```

実行結果

```
> java Main
[a, bb, ccc, dddd]
[ccc, dddd]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
[要素 for 要素 in リスト(イテラブルオブジェクト) if 条件]
```

Python では**リスト内包表記**という方法を用いる。  
リストの中でイテラブルオブジェクトの要素を条件に従い取り出す形で定義すると、イテラブルオブジェクトの要素の中で指定した条件に合う要素だけが残ったリストを返してくれる。

使用例を以下に示す。

```python
>>> a=["a","bb","ccc","dddd"]
>>>
>>> a
['a', 'bb', 'ccc', 'dddd']
>>>
>>> [s for s in a if len(s) >= 3]
['ccc', 'dddd']
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Array.filter((value, index) => {
  // 条件式。要素valueが条件に合えばtrue,合わなければfalseを返す式を置く。
});
```

javascript には Array オブジェクトに**filter**メソッドがある。これは、Array オブジェクト内の要素を１個１個見ていき、指定した条件に合う要素だけを残すメソッドである。

利用するには filter メソッドの引数に関数を入力する。この関数は、引数に value,index をおく。value は要素、index はインデックスを指す。(利用しない場合、index は書かなくても良い)それに応じて、式で value 等に対して条件に合致するなら true を、しない場合は false を返すような処理を作成する。実行後、true が返された要素のみで作られた Array オブジェクトが返される。

実行例を以下に見せる。これは、Array オブジェクト中にある奇数の要素のみを取り出すものである。

```javascript
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let odds = arr.filter((value, index) => {
  return value % 2 !== 0;
});
console.log(odds);
```

実行結果

```
[1, 3, 5, 7, 9]
```

</div>
