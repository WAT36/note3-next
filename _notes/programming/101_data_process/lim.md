---
title: "x,y軸の表示範囲を指定する"
date: "2019-11-02T04:37:30+09:00"
excerpt: "x,y軸の表示範囲を指定する方法について"
tag: ["Python"]
programming: ["Python"]
updatedAt: "2019-11-02T04:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

<div class="note_content_by_programming_language" id="note_content_Python">

グラフの軸の表示範囲は入力した座標の最大値、最小値に基づいて決定されるが、  
こちらで x,y 軸の表示範囲を指定したい場合、x 軸は**xlim(min,max)**、y 軸は **ylim(min,max)** という関数を使って指定する。

例として、前述の「グラフに色をつける」で作成したグラフに表示範囲を指定した例を示す。

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
>>> #x軸は-3~3の範囲で表示
>>> plt.xlim(-3,3)
(-3, 3)
>>>
>>> #y軸は-20~20の範囲で表示
>>> plt.ylim(-20,20)
(-20, 20)
>>>
>>> plt.show()
>>>
```

実行結果

![](/assets/note/programming/101_data_process/lim/Figure_5.png)

-3≦x≦3、-20≦y≦20 の範囲でグラフが表示された。

</div>
