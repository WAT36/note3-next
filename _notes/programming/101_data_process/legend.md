---
title: "グラフの凡例を表示する"
date: "2019-11-02T03:37:30+09:00"
excerpt: "グラフの凡例を表示する方法について"
tag: ["Python"]
programming: ["Python"]
updatedAt: "2019-11-02T03:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

<div class="note_content_by_programming_language" id="note_content_Python">

グラフに凡例を表示させるには、まずグラフを表示するときに使った pyplot の関数 plot の引数に **label** というパラメータがあるので、そこに指定する。  
凡例をグラフのどこに表示するかは自動で決まるが、こちらで指定したい場合は plot の関数 **legend** を利用する。

例として、前述の「グラフに色をつける」で作成したグラフに凡例を表示する例を示す。

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
>>> #グラフに凡例を表示
>>> plt.legend(loc="upper left")
<matplotlib.legend.Legend object at 0x113bbbf60>
>>>
>>> plt.show()
>>>
```

実行結果

![](/assets/note/programming/101_data_process/legend/Figure_4.png)

グラフに凡例を表示する際は、legend 関数の引数 **loc** に表示させたい位置を入力する。  
入力できる値は以下の通り。

- 'best'
- 'upper right'
- 'upper left'
- 'lower left'
- 'lower right'
- 'right'
- 'center left'
- 'center right'
- 'lower center'
- 'upper center'
- 'center'

'best'にすると凡例を最適な位置に配置してくれる。

</div>
