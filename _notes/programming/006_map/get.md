---
title: "辞書(Map)からキーを指定して値を取得"
date: "2019-10-28T02:36:30+09:00"
excerpt: "辞書(Map)からキーを指定して値を取得する方法ついて"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-28T02:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)からキーを指定して値を取得する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
m.get("キー名")
```

Java では Map クラスに **get()** というメソッドがあり、引数にキーを指定すると、Map 内でそのキーに対応づけられている値が返る。  
`V get(Object key)`

指定したキーが Map に無い場合は null が返る。

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

    System.out.println(m.get("key"));
    System.out.println(m.get("key2"));

    System.out.println(m.get("key3"));
  }
}
```

実行結果

```
> java Main
value3
value
null
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
m["キー名"]
# または
m.get("キー名")
```

Python では以下の二つの方法がある。

- 単に `辞書[キー]` と書く
- 辞書のメソッド **get()** を使う (使用例： `辞書.get(キー)` )

存在しないキーを指定した場合、  
前者はエラーになるが、後者はデフォルト値として None が返る。このデフォルト値は自分で指定でき、指定したい場合は get メソッドの第２引数に指定する（省略した場合は None になる）。

実行例を以下に示す。

```python
>>> d={}
>>>
>>> d["key"]="value"
>>> d["key2"]="value2"
>>>
>>> d
{'key': 'value', 'key2': 'value2'}
>>>
>>> d["key"]
'value'
>>>
>>> d["key3"]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'key3'
>>>
>>> d.get("key")
'value'
>>>
>>> d.get("key3")
>>>
>>> d.get("key3","Not Found")
'Not Found'
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Map.get(キー);
```

Javascript において、連想配列からデータを取得する方法は普通の配列と同じように添字を指定すれば良い。

例を以下に示す。

```javascript
let temperature = new Map();

temperature.set("Tokyo", 20);
temperature.set("Sapporo", 15);
temperature.set("Naha", 25);

console.log(temperature.get("Tokyo"));
console.log(temperature.get("Naha"));
```

結果

```
20
25
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
マップ[キー]

// マップに該当キーがない場合はvalueに型の初期値(0,""など)、okにfalseが入る
value,ok = マップ[キー]
```

Go でも単純にマップが入っている変数に[キー]の形で指定すれば値を取り出せる。

ただし、マップに指定したキーがない場合、Go ではエラーにならず、各型の初期値(int なら 0、string なら""など)が返されるので、注意。

キーがないか判別したい場合は、上記の ok のように値を返すときに２つの変数を指定する。１つ目の変数には各型の初期値が入るが、２つ目の変数にはキーがあれば true に、ない場合は false が返される。

このように２つ目の変数を使用することで、マップの要素への参照が成功したのかどうかを明確にすることができる。

</div>
