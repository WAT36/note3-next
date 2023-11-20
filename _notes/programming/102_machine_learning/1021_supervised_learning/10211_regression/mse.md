---
title: "平均二乗誤差"
date: "2019-11-03T02:01:30+09:00"
excerpt: "平均二乗誤差について"
tag: ["Python"]
updatedAt: "2019-11-03T02:01:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

前述の「直線モデル」にて、データに応じた最適な$w_{0},w_{1}$を決めれば最適な関係式が得られると書いたが、
どのようにして最適な $w_{0},w_{1}$を求めれば良いのか？

関係式が最適になるようにするには、入力値に対する実際の結果と関係式による出力結果との差（誤差）が小さくなるようにすればよい。

前述に倣い、入力を $x_{i}$、実際の結果を $t_{i}$、関係式による出力結果を $y_{i} (= w_{0} x_{i} + w_{1} )(i = 1,2,・・・,n)$ とすると、それぞれの誤差は

$$|y_{i}-t_{i}|$$

となる。  
このままやってもよいのだが、計算の簡略化[^1]のために、この誤差の 2 乗をとり、さらに全ての i における平均を取ると以下のような値になる。

$$
 \frac{1}{N} \sum_{i=0}^N (y_{i}-t_{i})^2
$$

この値を**平均二乗誤差**(mean square error)といい、この値がなるべく小さくなるような $w_{0},w_{1}$を求めることを考える。

以下、$w,x,t$ を入力とし、平均二乗誤差を算出するコードを記載する。

```python
import numpy as np

def mse(w,x,t):
    y = w[0]*x + w[1]            # 理論値
    mse = np.mean( (y - t)**2 )  # 平均二乗誤差を算出
    return mse
```

この関数 mse において、求めたいのは出力 mse が最も小さくなるような w\[0\],w\[1\]の組み合わせである。  
そのため、指定した $w_{0},w_{1}$ の範囲で mse を算出し、mse を $w_{0},w_{1}$ のグラフとして可視化させ、どこで一番小さくなるかを確認してみよう。  
とりあえず、$w_{0},w_{1}$ を-30~30 の範囲で絞り、mse を算出してみる。

```python
#入力値
x = np.array([167.9,164.3,171.6,172.7,162.8,170.2,172.3,163.8,168.8,167.2,172.3,166.4,173.1,176.9,178.4,167.1,177.4,173.7,172.0,174.1])
#実測値
t  = np.array([58.0,58.2,60.1,65.2,55.0,60.9,61.9,56.4,62.9,57.0,64.9,55.9,68.0,67.9,69.1,60.8,65.6,66.1,59.9,69.5])

#w0,w1を-30~30の組み合わせでそれぞれ指定してmse算出
w0 = np.linspace(-30,30,100)
w1 = np.linspace(-30,30,100)

#平均二乗誤差J,全てのw0,w1の組み合わせで算出
J = np.zeros((len(w0),len(w1)))
for i0 in range(100):
    for i1 in range(100):
            J[i1,i0]=mse((w0[i0],w1[i1]),x,t)

```

次に、算出した mse をグラフ(3 次元と等高線)で可視化させる。

```python
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt

#グラフの表示サイズ
plt.figure(figsize=(9,4))
#２グラフの間隔を調整
plt.subplots_adjust(wspace=0.5)

#subplot,1*2の1つ目に表示するグラフ作成
ax = plt.subplot(1,2,1,projection='3d')

ww0,ww1 = np.meshgrid(w0,w1)

ax.plot_surface(ww0,ww1,J,rstride=10,cstride=10,alpha=0.3,color='blue',edgecolor='black')

ax.set_xticks([i for i in range(-50,60,10)])
ax.set_yticks([i for i in range(-50,60,10)])

ax.set_xlabel('w0')
ax.set_ylabel('w1')

#等高線グラフ
plt.subplot(1,2,2)
cont = plt.contour(ww0,ww1,J,30,colors='black',levels=[100000,1000000,10000000,100000000])
cont.clabel(fmt='%1.0f',fontsize=8)
plt.xlabel('w0')
plt.ylabel('w1')
plt.grid(True)
plt.show()
```

実行結果

![](/assets/note/programming/102_machine_learning/1021_supervised_learning/10211_regression/mse/Figure_18.png)

グラフによると、$w_{0} = 0$ のあたりで平均二乗誤差 J が最低となり、最適になるように思えるが、もう少し厳密な値を調べてみたい。  
そこでこのグラフを用いて J が最小となる $w_{0},w_{1}$の組み合わせを次章で求めてみる。

[^1]: 誤差の二乗を取る理由は諸説あるが、ほとんどはこの理由（らしい）。
