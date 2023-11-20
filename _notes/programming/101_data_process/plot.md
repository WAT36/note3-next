---
title: " (折れ線)グラフを描画する"
date: "2019-11-02T00:37:30+09:00"
excerpt: " (折れ線)グラフを描画する方法について"
tag: ["Python"]
programming: ["Python"]
updatedAt: "2019-11-02T00:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

<div class="note_content_by_programming_language" id="note_content_Python">

グラフを描くためには**matplotlib**の**pyplot**ライブラリを利用する。  
ここでは 2 次元の折れ線グラフを作成する。
そのために、グラフに描画するための座標データを作成する。

```python
>>> import numpy as np
>>> import matplotlib.pyplot as plt
>>>
>>> #x軸データ
>>> x = np.array([1,2,3,4,5,6,7,8,9,10])
>>> #y軸データ
>>> y = np.array([100,400,200,700,800,300,500,600,900,400])
>>>
>>> x
array([ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10])
>>> y
array([100, 400, 200, 700, 800, 300, 500, 600, 900, 400])
>>>
>>> #グラフ描画
>>> plt.plot(x,y)
[<matplotlib.lines.Line2D object at 0x105dd6a58>]
>>> #グラフ描写
>>> plt.show()
>>>
```

実行結果

![](/assets/note/programming/101_data_process/plot/Figure_1.png)

</div>
