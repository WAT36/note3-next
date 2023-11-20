---
title: "グラフにグリッド線を表示させる"
date: "2019-11-02T07:37:30+09:00"
excerpt: "グラフにグリッド線を表示させる方法について"
tag: ["Python"]
programming: ["Python"]
updatedAt: "2019-11-02T07:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

<div class="note_content_by_programming_language" id="note_content_Python">

グラフにグリッド線(方眼)を表示するには pyplot の関数 **grid()** を利用する。引数には True を入れる。

例として、前述の「グラフに色をつける」で作成したグラフにグリッド線を表示させた例を示す。

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
>>> #タイトル設定
>>> plt.title('$f_w(x)$')
Text(0.5, 1.0, '$f_w(x)$')
>>>
>>> #x軸にラベル表示
>>> plt.xlabel('x')
Text(0.5, 0, 'x')
>>>
>>> #y軸にラベル表示
>>> plt.ylabel('y')
Text(0, 0.5, 'y')
>>>
>>> #グラフにグリッド線表示
>>> plt.grid(True)
>>>
>>> #グラフ表示
>>> plt.show()
>>>
```

実行結果

![](/assets/note/programming/101_data_process/grid/Figure_8.png)

</div>
