---
title: "辞書(Map)に要素を追加する"
date: "2019-10-28T01:36:30+09:00"
excerpt: "辞書(Map)に要素を追加するついて"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-28T01:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)に要素(キー・値)を追加する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

Java では Map クラスに **put()** というメソッドがあり、引数にキー・値を指定すると、その Map 内にキー・値が入る。  
`V put(K key, V value)`  
既に同じキーがあった場合は上書きされて入る。

実行例を以下に示す。

```java
import java.util.Map;
import java.util.HashMap;
class Main{
  public static void main(String args[]){

    Map<String,String> m = new HashMap<>();

    m.put("key","value");
    m.put("key2","value");
    m.put("key","value3");

    System.out.println(m);
  }
}
```

実行結果

```
> java Main
{key2=value, key=value3}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python では以下のような記法で辞書にキー・値を追加できる。

`辞書[キー] = 値`

既に同じキーがあった場合は、値が上書きされる。  
実行例を以下に示す。

```python
>>> d["key"] = "value"
>>>
>>> d
{'key': 'value'}
>>>
>>> d["key2"] = "value2"
>>>
>>> d
{'key': 'value', 'key2': 'value2'}
>>>
>>> d["key"] = "value3"
>>> d
{'key': 'value3', 'key2': 'value2'}
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

Javascript において、連想配列にデータを追加する方法は普通の配列と同じようにすれば良い。
添字には任意の文字列を指定する。

例を以下に示す。

```javascript
var temperature = new Array();

temperature["Tokyo"] = 20;
temperature["Sapporo"] = 15;
temperature["Naha"] = 25;
```

</div>
