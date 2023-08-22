---
title: "リストから条件に合う要素のみを取得した新しいリストを作成する"
date: "2019-10-27T06:35:30+09:00"
excerpt: "リストから条件に合う要素のみを取得した新しいリストを作成する"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-27T06:35:30+09:00"
author:
name: Tatsuroh Wakasugi
picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストから条件に合う要素のみを取得した新しいリストを作成する方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

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

Python では**リスト内包表記**という方法を用いる。  
リストの中でイテラブルオブジェクトの要素を条件に従い取り出す形で定義すると、イテラブルオブジェクトの要素の中で指定した条件に合う要素だけが残ったリストを返してくれる。  
表記例は以下の通り。

`[要素 for 要素 in イテラブルオブジェクト if 条件]`

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
