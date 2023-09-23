---
title: "辞書(Map)から要素削除"
date: "2019-10-28T03:36:30+09:00"
excerpt: "辞書(Map)から要素削除する方法ついて"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-28T03:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)から要素を削除する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

Java では Map クラスに **remove()** というメソッドがあり、引数にキーを指定すると、Map 内でそのキーの要素が削除される。  
`V remove(Object key)`

指定したキーが Map に無い場合は null が返る。

また、Map から全ての要素を削除したいときは、 **clear()** というメソッドを用いると全ての要素を削除できる。  
`void clear()`

実行例を以下に示す。

```java
import java.util.Map;
import java.util.HashMap;
class Main{
  public static void main(String args[]){

    Map<String,String> m = new HashMap<>();

    m.put("key","value");
    m.put("key2","value2");
    m.put("key3","value3");

    System.out.println(m);

    m.remove("key2");   //key2削除

    System.out.println(m);

    m.clear();          //全削除

    System.out.println(m);
  }
}
```

実行結果

```
> java Main
{key2=value2, key3=value3, key=value}
{key3=value3, key=value}
{}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python では以下の二つの方法がある。

- **del**文を使い要素を削除する (使用例： `del 辞書[キー]`)
- 辞書の関数 **pop()** を使う (使用例： `辞書.pop(キー)` )

どちらの方法でも削除は行える。違う点は、del 文の場合は実行した時何も返されないが、pop 関数の場合は削除された値が返される。  
存在しないキーを指定した場合はエラーになる。

また、辞書から全ての要素を削除したい時は、辞書に **clear()** という関数があるのでこれを使うと便利。

実行例を以下に示す。

```python
>>> d={}
>>> d["key"]="value"
>>> d["key2"]="value2"
>>> d["key3"]="value3"
>>>
>>> d
{'key': 'value', 'key2': 'value2', 'key3': 'value3'}
>>>
>>> del d["key2"]
>>>
>>> d
{'key': 'value', 'key3': 'value3'}
>>>
>>> d.pop("key3")
'value3'
>>>
>>> d
{'key': 'value'}
>>>
>>> del d["key2"]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'key2'
>>>
>>> d.pop("key3")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'key3'
>>>
>>> d
{'key': 'value'}
>>>
>>> d.clear()
>>>
>>> d
{}
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

Javascript において、連想配列から指定した添字のデータを削除するには、特殊演算子**delete**を利用する。

使用法は以下の通り。

```javascript
delete 連想配列.添字;
//または
delete 連想配列[添字];
```

例を以下に示す。

```javascript
var temperature = new Array();

temperature["Tokyo"] = 20;
temperature["Sapporo"] = 15;
temperature["Naha"] = 25;

console.log(temperature["Tokyo"]);

//'Tokyo'のデータを消す
delete temperature["Tokyo"];

console.log(temperature["Tokyo"]);
```

結果

```
20
undefined
```

</div>
