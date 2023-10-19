---
title: "2変数関数を定義する"
date: "2019-11-02T09:37:30+09:00"
excerpt: "2変数関数を定義する方法について"
tag: ["Python"]
programming: ["Python"]
updatedAt: "2019-11-02T09:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

<div class="note_content_by_programming_language" id="note_content_Python">

2 変数関数の定義は関数定義の時に引数を２つ設定すれば良い。  
試しに、f(x,y) = √(x<sup>2</sup> + y<sup>2</sup>)を定義する例を示す。

```python
>>> import math
>>> import numpy as np
>>>
>>> def f(x,y):
...     return math.sqrt(x**2 + y**2)
...
>>>
>>> x = np.linspace(-3,3,61)
>>> y = np.linspace(-3,3,61)
>>>
>>> z = np.zeros((len(x),len(y)))
>>>
>>> for xi in range(len(x)):
...     for yi in range(len(y)):
...             z[yi,xi] = f(x[xi],y[yi])
...
>>>
>>> print(z)
[[4.24264069 4.17252921 4.10365691 ... 4.10365691 4.17252921 4.24264069]
 [4.17252921 4.10121933 4.03112887 ... 4.03112887 4.10121933 4.17252921]
 [4.10365691 4.03112887 3.95979797 ... 3.95979797 4.03112887 4.10365691]
 ...
 [4.10365691 4.03112887 3.95979797 ... 3.95979797 4.03112887 4.10365691]
 [4.17252921 4.10121933 4.03112887 ... 4.03112887 4.10121933 4.17252921]
 [4.24264069 4.17252921 4.10365691 ... 4.10365691 4.17252921 4.24264069]]
>>>
```

実際にグラフに描画する例は次節で示す。

</div>
