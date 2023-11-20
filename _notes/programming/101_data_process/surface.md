---
title: "2変数関数のグラフ(3D面グラフ)を作成する"
date: "2019-11-02T11:37:30+09:00"
excerpt: "2変数関数のグラフ(３D面グラフ)を作成する方法について"
tag: ["Python"]
programming: ["Python"]
updatedAt: "2019-11-02T11:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

<div class="note_content_by_programming_language" id="note_content_Python">

2 変数関数のグラフとして、3D 面グラフで表示するには mpl_toolkits.mplot3d の関数 **Axes3D** を利用する。

前述の「2 変数関数を定義する」で定義した関数を 3D 面グラフに表示する例を示す。

```python
>>>
>>> from mpl_toolkits.mplot3d import Axes3D
>>>
>>> import math
>>> import numpy as np
>>> import matplotlib.pyplot as plt
>>>
>>> def f(x,y):
...     return math.sqrt(x**2 + y**2)
...
>>>
>>> x = np.linspace(-3,3,61)
>>> y = np.linspace(-3,3,61)
>>>
>>> z=np.zeros((len(x),len(y)))
>>>
>>> for xi in range(len(x)):
...     for yi in range(len(y)):
...             z[yi,xi] = f(x[xi],y[yi])
...
>>> #x,yの交点の座標（格子点）を作成する。xxには格子点のx座標、yyには格子点のy座標が入る
>>> xx,yy = np.meshgrid(x,y)
>>>
>>> xx
array([[-3. , -2.9, -2.8, ...,  2.8,  2.9,  3. ],
       [-3. , -2.9, -2.8, ...,  2.8,  2.9,  3. ],
       [-3. , -2.9, -2.8, ...,  2.8,  2.9,  3. ],
       ...,
       [-3. , -2.9, -2.8, ...,  2.8,  2.9,  3. ],
       [-3. , -2.9, -2.8, ...,  2.8,  2.9,  3. ],
       [-3. , -2.9, -2.8, ...,  2.8,  2.9,  3. ]])
>>>
>>>
>>> yy
array([[-3. , -3. , -3. , ..., -3. , -3. , -3. ],
       [-2.9, -2.9, -2.9, ..., -2.9, -2.9, -2.9],
       [-2.8, -2.8, -2.8, ..., -2.8, -2.8, -2.8],
       ...,
       [ 2.8,  2.8,  2.8, ...,  2.8,  2.8,  2.8],
       [ 2.9,  2.9,  2.9, ...,  2.9,  2.9,  2.9],
       [ 3. ,  3. ,  3. , ...,  3. ,  3. ,  3. ]])
>>>
>>> # subplot。projection='3d'の指定をする
>>> ax = plt.subplot(1,1,1,projection='3d')
>>>
>>> # plot_surfaceで3D面グラフをプロットする
>>> ax.plot_surface(xx,yy,z,rstride=1,cstride=1,alpha=0.3,color='blue',edgecolor='black')
<mpl_toolkits.mplot3d.art3d.Poly3DCollection object at 0x11bbfcac8>
>>>
>>> ax.set_zticks((0,0.2))
[<matplotlib.axis.XTick object at 0x11bbf5400>, <matplotlib.axis.XTick object at 0x1120316a0>]
>>>
>>> ax.view_init(75,-95)
>>>
>>> plt.show()
>>>
```

実行結果

![](/assets/note/programming/101_data_process/surface/Figure_12.png)

**Axes3D** は 3D グラフを表示するのに使うライブラリである。

**plot_surface** は 3 次元面グラフを作成する Axes3D の関数である。plot_surface にグラフ表示したい x,y,z 座標のデータを入力する。rstride,cstride には表示するグリッド線の間隔を指定する。

</div>
