---
title: "(Python)タプル"
date: "2019-10-27T15:36:30+09:00"
excerpt: "タプル(Python)について"
tag: ["Python"]
programming: ["Python"]
updatedAt: "2019-10-27T15:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

Python で使うタプルについてを述べる。

<div class="note_content_by_programming_language" id="note_content_Python">

```python
(1,2,3)
```

タプルとは Python で使われるデータ構造で、リストと同様に複数のデータを格納できるシーケンス型のデータ構造である。丸括弧 **( )** で表記される。  
リストと同じように見えるが、違う点はタプルは **変更不能** という点であり、中の値は変えることはできない。  
実行例を以下に示す。

```python
>>> #タプルの宣言
>>> a = (1,2,3)
>>> a
(1, 2, 3)
>>>
>>> #リストと同様にインデックスを指定した値の参照は行える
>>> a[0]
1
>>> a[1]
2
>>>
>>> #タプルでは値の書き換えは行えない
>>> a[0] = 4
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
>>>
```

</div>
