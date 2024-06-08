---
title: "辞書(Map)から最小のキーを取得"
date: "2019-10-28T05:36:30+09:00"
excerpt: "辞書(Map)から最小のキーを取得する方法ついて"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-28T05:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)から最小のキーを取得する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
import java.util.Collections;
Collections.min(m.keySet());
```

Java で Map にあるキーの最小値を取得するには、最大値と同じで以下の手順で行う。

- Map のメソッド **keySet()** を使い、キーのみを Set に格納したデータを取得する
- そのキーの Set を Collections クラスの **min()** メソッドを用いて最小値を取得する(参考：リストの内一番小さい要素を調べる)

Map クラスの keySet()メソッドは、Map にあるキーを Set に格納したものを返すメソッドである。Set は List から重複要素を除外させたデータ構造である。  
`Set<K> keySet()`

実行例を以下に示す。

```java
import java.util.Set;
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

    Set<String> key = m.keySet();
    String minkey = Collections.min(key);

    System.out.println("min key: " + minkey);
  }
}
```

実行結果

```
> java Main
{key2=value2, key3=value3, key=value}
min key: key
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
min(m)
```

Python では単に組み込み関数 **min()** を使えば、辞書にある最小のキーを取得できる。

```python
>>> d={'key':'value', 'key2':'value2', 'key3':'value3'}
>>> d
{'key': 'value', 'key2': 'value2', 'key3': 'value3'}
>>>
>>> min(d)
'key'
>>>
```

</div>
