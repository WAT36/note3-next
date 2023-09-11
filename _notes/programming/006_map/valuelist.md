---
title: "辞書(Map)から値のリストを取得"
date: "2019-10-28T09:36:30+09:00"
excerpt: "辞書(Map)から値のリストを取得する方法について"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-28T09:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)から値のリストを取得を取得する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

Java では Map クラスに**values()**というメソッドがある。これにより Map のキーを Collection 型で取得することができる。

`Collection<V> values()`

List に変換したい時は List の変数の初期化時にこの返り値を指定してやればよい。  
実行例を以下に示す。

```java
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

    List<String> valuelist = new ArrayList<>(m.values());

    System.out.println(valuelist);
  }
}
```

実行結果

```
> java Main
{key2=value2, key3=value3, key=value}
[value2, value3, value]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python は辞書の関数に**values()**という関数があり、これを利用することで辞書の値のイテラブルオブジェクトを取得できる。  
ただし、この values 関数で返されるオブジェクトはリストではなく dict_values 型なので注意。リストに変換したい場合は list()を使って変換する。  
for 文でループさせたい時は `for i in 辞書.values()` のようにすればよい。  
実行例を以下に示す。

```python
>>> d={'key':'value', 'key2':'value2', 'key3':'value3'}
>>> d
{'key': 'value', 'key2': 'value2', 'key3': 'value3'}
>>>
>>> valuelist=d.values()
>>>
>>> valuelist
dict_values(['value', 'value2', 'value3'])
>>>
>>> list(valuelist)
['value', 'value2', 'value3']
>>>
>>> for v in valuelist:
...     print(v)
...
value
value2
value3
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

Javascript において、連想配列の値のリストを取得するには、**Object.values()**メソッドを利用する。引数には連想配列のオブジェクトを指定する。

使用法は以下の通り。

```javascript
Object.values(連想配列);
```

例を以下に示す。

```javascript
var temperature = new Array();

temperature["Tokyo"] = 20;
temperature["Sapporo"] = 15;
temperature["Naha"] = 25;

console.log(Object.values(temperature));
```

結果

```
[20, 15, 25]
```

</div>
