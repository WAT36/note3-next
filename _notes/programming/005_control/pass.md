---
title: "pass文"
date: "2019-10-27T21:36:30+09:00"
excerpt: "pass文について"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-27T21:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

何も処理をしない文、pass 文についてを示す。  
構文としては何か記述が必要だが、特に処理をする必要がないという時に使う。  
言語によりあるものとないものがある。

<div class="note_content_by_programming_language" id="note_content_Java">

Java には存在しない。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python では for,while の中の処理文には最低１行何か書いておく必要がある。  
何もする事が無くても何か書いておかなければならないため、このような時に pass 文を用いる。  
（Java などでは処理分の中に何も書かなくてもコンパイルは通る）  
実行例を示す。

```python
>>>
>>> #whileの無限ループ。Ctrl+Cで止めない限りずっと続く
>>> while(True):
...     pass
...
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
KeyboardInterrupt
>>> #Ctrl+Cを入力した
>>>
>>> #クラスの定義など
>>> class Fruits:
...     def __init__():
...             pass
...
>>>
```

</div>
