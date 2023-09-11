---
title: "辞書(Map)のループ"
date: "2019-10-28T09:36:30+09:00"
excerpt: "辞書(Map)のループの方法について"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-28T09:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)のループを行う方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

Java で Map にループを掛けるには、Map のメソッドである**entrySet()**を利用して Map 内の全てのキー・値の組み合わせを取得し、それを拡張 for 文などでループさせる。

```
for( Map.entry<キーの型,値の型> entry: (Mapの変数).entrySet() ){
    キーの型 key = entry.getKey();
    値の型 value = entry.getValue();
}
```

実行例を以下に示す。

```java
import java.util.Map;
import java.util.HashMap;
class Main{
  public static void main(String args[]){
    Map<String,String> m = new HashMap<>();
    m.put("key1","val1");
    m.put("key2","val2");
    m.put("key3","val3");

    for(Map.Entry<String,String> e : m.entrySet()){
      System.out.println(e.getKey() + " " + e.getValue());
    }
  }
}
```

実行結果

```
> java Main
key1 val1
key2 val2
key3 val3
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python で辞書にループをかけるには、for 文のループに辞書の**items()**関数を使いループすると行える。  
items 関数は辞書にあるキーと値の組み合わせを全て取得する関数である。  
これを利用し、以下のように行うと辞書のループが行える。

```
for k,v in 辞書.items():
    //kにはキー、vには値が入る
    //処理文
```

キーだけを取り出したい時は keys()、値のみで行いたい時は values()関数を利用する。

</div>
