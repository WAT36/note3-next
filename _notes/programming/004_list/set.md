---
title: "Set型"
date: "2019-10-27T14:35:30+09:00"
excerpt: "Set型について"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-27T14:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

Set 型変数とはリストと似たデータ構造で、リストから要素の重複を除いたものを順不同で集めたデータ構造である。しかし、インデックスを指定して要素を取り出すことは一般的にはできない。  
Set 型変数についてを述べる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
import java.util.Set;
import java.util.HashSet;
Set<String> s = new HashSet<>();

// 値を追加したい時
s.add("a");
```

Java でのリストは**Set**クラスをインポートして利用する。  
しかし、Set クラスはインターフェースであるため、そのまま使用することはできない。  
使用するには、Set の具体的な定義が書いてあるクラスを Set のインスタンスに代入して使う。  
このクラスは複数あるが、ここでは一般的な**HashSet**クラスを利用する。  
なお、HashSet も使用するにはインポートする必要がある。  
実行例を以下に示す。

```java
import java.util.Set;
import java.util.HashSet;

class Main{
  public static void main(String args[]){

    Set<String> s = new HashSet<>();
    s.add("a"); //set.add()  でsetに要素を加える
    s.add("b");
    s.add("c");
    s.add("a"); //"a"は既に入っているので、入らない

    System.out.println(s);
  }
}
```

実行結果

```
$ java Main
[a, b, c]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
{}
{1,2,3}
# または
set()
set([1,2,3])
```

Python で Set 型変数を作るには中括弧 **{}** または **set** 関数を利用する。(set 関数を利用する場合は文字列またはリストを入力する)  
実行例を以下に示す。

```python
>>>
>>> a = {'a','b','c','a','b'}
>>> a
{'a', 'b', 'c'}
>>>
>>>
>>> b = set('abcab')
>>> b
{'a', 'b', 'c'}
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let s = new Set();

// 諸メソッド
Set.size; // 要素数を返す
Set.add(val); // 値valを追加
Set.has(val); // 値valを持つか確認
Set.delete(val); // 値valを削除
Set.clear(); // 全要素を削除
Set.values(); // 全要素を返す
```

Javascript においても Set はあり、**Set オブジェクト**と呼ばれる。

インスタンスオブジェクトを生成するには、**new Set()**として利用する。

また、Set オブジェクトのメソッドやプロパティは以下の通り。

| メソッド等      | 意味                |
| :-------------- | :------------------ |
| Set.size        | 要素数を返す        |
| Set.add(val)    | 値 val を追加       |
| Set.has(val)    | 値 val を持つか確認 |
| Set.delete(val) | 値 val を削除       |
| Set.clear()     | 全要素を削除        |
| Set.values()    | 全要素を返す        |

例を以下に示す。

```javascript
let s = new Set();

// 値追加
s.add("a");
s.add("b");
s.add("c");
s.add("b");
s.add("a");

console.log(s);
//{'a','b','c'}

console.log(s.size);
// 3

console.log(s.has("b"));
// true

s.delete("b");
console.log(s);
//{'a','c'}

console.log(s.values());
//SetIterator{'a','c'}

s.clear();
console.log(s);
// {}
```

</div>
