---
title: "辞書(Map)から最大・最小のキーを取得"
date: "2019-10-28T04:36:30+09:00"
excerpt: "辞書(Map)から最大・最小のキーを取得する方法ついて"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-28T04:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)から最大のキーを取得する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
import java.util.Collections;
Collections.max(m.keySet())
Collections.min(m.keySet())
```

Java で Map にあるキーの最大値・最小値を取得するには以下の手順で行う。

- Map のメソッド **keySet()** を使い、キーのみを Set に格納したデータを取得する
- そのキーの Set を Collections クラスの **max()** または **min()** メソッドを用いて最大・最小値を取得する

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
    String maxkey = Collections.max(key);

    System.out.println("max key: " + maxkey);
    System.out.println("min key: " + minkey);
  }
}
```

実行結果

```
> java Main
{key2=value2, key3=value3, key=value}
max key: key3
min key: key
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
max(m)
min(m)
```

Python では単に組み込み関数 **max()** を使えば、辞書にある最大のキーを取得できる。

```python
>>> d={'key':'value', 'key2':'value2', 'key3':'value3'}
>>> d
{'key': 'value', 'key2': 'value2', 'key3': 'value3'}
>>>
>>> max(d)
'key3'
>>> min(d)
'key'
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// 工事中・・・
```

</div>
