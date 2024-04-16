---
title: "Null"
date: "2019-11-01T05:37:30+09:00"
excerpt: "Nullについて"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-11-01T05:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

プログラミングでよく見る Null について。

Null とは何なのか？

Null とは何もない、何も入ってない、という状態を示す語である。

変数に何も値が定義されていないとき、変数の値を参照しようとすると Null が返ってくる。

よく 0 と勘違いされることが多いが、変数の値を参照して 0 が返ってきたときは、0 という値が変数に入っているという意味であり何も値が定義されていないという意味ではないので注意。

言語により仕様が違うこともあるので、それぞれの言語での Null を以下に述べていく。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
null
```

Java では参照型のデータ型において、何も参照していない状態を表す時に null を利用する。

参照型の変数に直接 null を代入することも可能である。変数が null であるかを確認するには、比較演算子(==)を用いる。

int や char などの基本データ型には null は入れられないので注意すること。基本データ型には、宣言時に自動的に(型により決められている)初期値が入る。

null の変数に対しメソッド呼び出しを行った場合、NullPointerException 例外が発生するので注意。

例

```java
import java.util.*;

class Main{
  public static void main(String args[]){
    String s = null;
    System.out.println(s);
    System.out.println(s.length());
  }
}
```

実行結果

```
$ java Main
null
Exception in thread "main" java.lang.NullPointerException
        at Main.main(Main.java:7)
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
None
```

Python では**None**という語が null である状態を示す。

同じく変数に直接 None を代入することも可能である。

None となっている変数の関数や属性などを呼び出すとエラーになるので注意。

```python
>>> v = None
>>> v
>>> #Noneは表示されない
>>>
>>> a={1:'a',2:'b'}
>>>
>>> a[1]
'a'
>>>
>>> a=None
>>> a[1]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'NoneType' object is not subscriptable
>>> #Noneの関数・属性を呼び出すとエラー
```

</div>
