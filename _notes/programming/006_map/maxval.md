---
title: "辞書(Map)から最大の値を取得"
date: "2019-10-28T06:36:30+09:00"
excerpt: "辞書(Map)から最大の値を取得する方法ついて"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-28T06:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)から最大の値を取得する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
import java.util.Collections;
Collections.max(m.values());
```

Java で Map にある値の最大値を取得するには以下の手順で行う。

- Map のメソッド **values()** を使い、値のみを格納した List を取得する
- その値の List を Collections クラスの **max()** メソッドを用いて最大値を取得する(参考：リストの内一番大きい要素を調べる)

Map クラスの values()メソッドは、Map にある値を Collection(List,Set の親クラス)に格納したものを返すメソッドである。  
`Collection<V> values()`

実行例を以下に示す。

```java
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Collections;
class Main{
  public static void main(String args[]){

    Map<String,String> m = new HashMap<>();

    m.put("key","value");
    m.put("key2","value2");
    m.put("key3","value3");

    System.out.println(m);

    List<String> value = new ArrayList<>(m.values());
    String maxval = Collections.max(value);

    System.out.println("max value: " + maxval);
  }
}
```

実行結果

```
> java Main
{key2=value2, key3=value3, key=value}
max value: value3
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
max(m.values())
```

Python では辞書の関数 **values()** で値のみのビューオブジェクト(イテラブル)を取得できるので、これに組み込み関数 **max()** を適用すると、値の最大値を取得できる。

```python
>>> d={'key':'value', 'key2':'value2', 'key3':'value3'}
>>> d
{'key': 'value', 'key2': 'value2', 'key3': 'value3'}
>>>
>>> v=d.values()
>>>
>>> max(v)
'value3'
>>>
```

</div>
