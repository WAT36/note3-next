---
title: "一変数関数f(x)をグラフに描画する"
date: "2019-11-02T01:37:30+09:00"
excerpt: "一変数関数f(x)をグラフに描画する方法について"
tag: ["Python"]
programming: ["Python"]
updatedAt: "2019-11-02T01:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

定義した一変数関数 f(x)をグラフに描画する方法を示す。

<div class="note_content_by_programming_language" id="note_content_Python">

一変数関数 f(x)を描画するには、まず自分で一変数関数を定義し、そこに入力するデータを用意し、実際に関数に入力して得られるデータを用意する。  
入力データと出力データを plot すると関数のグラフの概形が得られる。

例として、３次関数 f(x) = x<sup>3</sup>を-10~10 の範囲で描画して見る。

```python
>>> import numpy as np
>>> import matplotlib.pyplot as plt
>>>
>>> #f(x)定義
>>> def f(x):
...     return x**3
...
>>> #入力データxを-10~10の整数で用意
>>> x=np.arange(-10,11,1)
>>> x
array([-10,  -9,  -8,  -7,  -6,  -5,  -4,  -3,  -2,  -1,   0,   1,   2,
         3,   4,   5,   6,   7,   8,   9,  10])
>>>
>>> #出力データy=f(x)を用意
>>> y=f(x)
>>> y
array([-1000,  -729,  -512,  -343,  -216,  -125,   -64,   -27,    -8,
          -1,     0,     1,     8,    27,    64,   125,   216,   343,
         512,   729,  1000])
>>>
>>> #x,yをプロット(描画)する
>>> plt.plot(x,y)
[<matplotlib.lines.Line2D object at 0x104089860>]
>>>
>>> plt.show()
```

実行結果

![](/assets/note/programming/101_data_process/func_plot/Figure_2.png)

</div>
