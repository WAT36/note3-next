---
title: "軸にラベルを設定する"
date: "2019-11-02T06:37:30+09:00"
excerpt: "軸にラベルを設定する方法について"
tag: ["Python"]
programming: ["Python"]
updatedAt: "2019-11-02T06:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

<div class="note_content_by_programming_language" id="note_content_Python">

グラフの軸にラベルを設定、表示するには pyplot の関数 **xlabel('ラベル名')** 、 **ylabel('ラベル名')** を利用する。

例として、前述の「グラフに色をつける」で作成したグラフの軸にラベルを設定する例を示す。

```python
>>> import numpy as np
>>> import matplotlib.pyplot as plt
>>>
>>>
>>> def f(x,w):
...     return (x-w)*x*(x+w)
...
>>>
>>> x = np.linspace(-3,3,61)
>>>
>>> #y:f(x) = x**3、w=0という凡例をつける
>>> y = f(x,0)
>>> plt.plot(x,y,color='black',label='$w=0$')
[<matplotlib.lines.Line2D object at 0x118e0b748>]
>>>
>>> #y2:f(x) = (x-2)x(x+2)、w=2という凡例をつける
>>> y2 = f(x,2)
>>> plt.plot(x,y2,color='red',label='$w=2$')
[<matplotlib.lines.Line2D object at 0x118e0bb38>]
>>>
>>> #凡例表示
>>> plt.legend(loc="best")
<matplotlib.legend.Legend object at 0x1165a8048>
>>>
>>> #x軸にラベル表示
>>> plt.xlabel('x')
Text(0.5, 0, 'x')
>>>
>>> #y軸にラベル表示
>>> plt.ylabel('y')
Text(0, 0.5, 'y')
>>>
>>>
>>> #グラフ表示
>>> plt.show()
>>>
```

実行結果

![](/assets/note/programming/101_data_process/label/Figure_7.png)

</div>
