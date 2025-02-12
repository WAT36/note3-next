---
title: "辞書(Map)からキーのリストを取得"
date: "2019-10-28T08:36:30+09:00"
excerpt: "辞書(Map)からキーのリストを取得する方法について"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-28T08:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)からキーのリストを取得する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
m.keySet();
```

Java では Map クラスに **keySet()** というメソッドがある。これにより Map のキーを Set で取得することができる。

`Set<K> keySet()`

List に変換したい時は List の変数の初期化時にこの Set を指定してやればよい。  
実行例を以下に示す。

```java
import java.util.Set;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
class Main{
  public static void main(String args[]){

    Map<String,String> m = new HashMap<>();

    m.put("key","value");
    m.put("key2","value2");
    m.put("key3","value3");

    System.out.println(m);

    Set<String> key = m.keySet();
    List<String> keylist = new ArrayList<>(key);

    System.out.println(keylist);
  }
}
```

実行結果

```
> java Main
{key2=value2, key3=value3, key=value}
[key2, key3, key]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
m.keys()
```

Python は辞書の関数に **keys()** という関数があり、これを利用することで辞書のキーのイテラブルオブジェクトを取得できる。  
ただし、この keys 関数で返されるオブジェクトはリストではなく dict_keys 型なので注意。リストに変換したい場合は list()を使って変換する。  
for 文でループさせたい時は `for i in 辞書.keys()` のようにすればよい。  
実行例を以下に示す。

```python
>>> d={'key':'value', 'key2':'value2', 'key3':'value3'}
>>> d
{'key': 'value', 'key2': 'value2', 'key3': 'value3'}
>>>
>>> keylist=d.keys()
>>>
>>> keylist
dict_keys(['key', 'key2', 'key3'])
>>>
>>> list(keylist)
['key', 'key2', 'key3']
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Map.keys();
```

Javascript において、Map オブジェクトのキーリストを取得するには、 Map オブジェクトの**keys()** メソッドを利用する。

keys()メソッドでは、キーの値が入ったイテレーターオブジェクトが返る。一個ずつ見たい時は、for...of を利用することで１つずつ取り出せる。

例を以下に示す。

```javascript
let temperature = new Map();

temperature.set("Tokyo", 20);
temperature.set("Sapporo", 15);
temperature.set("Naha", 25);

console.log(temperature.keys());
```

結果

```
MapIterator {'Tokyo', 'Sapporo', 'Naha'}
```

</div>
