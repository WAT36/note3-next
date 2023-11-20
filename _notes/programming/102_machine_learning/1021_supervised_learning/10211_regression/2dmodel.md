---
title: "2次元入力の面モデル"
date: "2019-11-03T05:01:30+09:00"
excerpt: "2次元入力の面モデルについて"
tag: ["Python"]
updatedAt: "2019-11-03T05:01:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

先程の勾配法の例では入力データは 1 次元であったが、2 次元であった場合はどうだろうか。

例として、以下のようなデータを用意する。

| 年齢 | 身長  | 体重 |
| :--- | :---- | :--- |
| 6    | 117.9 | 28.0 |
| 16   | 164.3 | 58.2 |
| 19   | 171.6 | 60.1 |
| 18   | 172.7 | 65.2 |
| 9    | 132.8 | 35.0 |
| 16   | 170.2 | 60.9 |
| 12   | 152.3 | 51.9 |
| 14   | 163.8 | 56.4 |
| 15   | 168.8 | 62.9 |
| 7    | 127.2 | 27.0 |
| 10   | 142.3 | 44.9 |
| 12   | 156.4 | 45.9 |
| 17   | 173.1 | 68.0 |
| 18   | 176.9 | 67.9 |
| 15   | 158.4 | 59.1 |
| 8    | 127.1 | 30.8 |
| 11   | 147.4 | 45.6 |
| 7    | 123.7 | 36.1 |
| 11   | 152.0 | 39.9 |
| 19   | 174.1 | 69.5 |

念のため、上記のデータをグラフに表す。

コードは以下の通り。

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

x0 = np.array([117.9,164.3,171.6,172.7,132.8,170.2,152.3,163.8,168.8,127.2,142.3,156.4,173.1,176.9,158.4,127.1,147.4,123.7,152.0,174.1])
x1 = np.array([28.0,58.2,60.1,65.2,35.0,60.9,51.9,56.4,62.9,27.0,44.9,45.9,68.0,67.9,59.1,30.8,45.6,36.1,39.9,69.5])
t = np.array([6,16,19,18,9,16,12,14,15,7,10,12,17,18,15,8,11,7,11,19])

fig=plt.figure()
ax = Axes3D(fig)

ax.set_xlabel("height")
ax.set_ylabel("weight")
ax.set_zlabel("old")

ax.plot(x0,x1,t,marker="o",linestyle='None')

plt.show()
```

グラフを以下の図に示す。

![Figure 20](/assets/note/programming/102_machine_learning/1021_supervised_learning/10211_regression/2dmodel/Figure_20.png)

これらに対して、身長と体重が与えられたときに年齢を予測するような面を作ることを考えてみよう。

まず面の式についてだが、一般的に 3 次元において座標(x,y,z)を通る面の式は

$$
ax+by+cz+d=0    (a,b,c,dは実数)
$$

となっているが、これを変形することにより、($x_{0},x_{1}$)を入力したときに予測値 y を返すような面の式は以下のように表される。

$$
y=w_{0} x_{0} + w_{1} x_{1} + w_{2} (w_{0} , w_{1} , w_{2} は実数)
$$

この式を利用し、予測値と正解値の差の合計が最も小さくなるような$w_{0},w_{1},w_{2}$を算出することを考える。

先程の 1 次元の時と同様に、平均二乗誤差を算出し、解析解を求めてみる。

正解値を t とおくと、まず平均二乗誤差 J は

$$
\begin{aligned}
J &= \frac{1}{N} \sum_{n=0}^{N-1} (y(x_{n}) - t_{n})^2 \\
  &= \frac{1}{N} \sum_{n=0}^{N-1} (w_{0} x_{n,0} + w_{1} x_{n,1} + w_{2} - t_{n})^2
\end{aligned}
$$

となり、この J が最も小さくなるような$w_{0},w_{1},w_{2}$を求めれば良い。

そうなるような$w_{0},w_{1},w_{2}$の値は、J を$w_{0},w_{1},w_{2}$でそれぞれ偏微分した時の値が０になる時である。

J を$w_{0},w_{1},w_{2}$でそれぞれ偏微分、また先ほどと同様に、avg(x)を x の平均値を算出する関数とおくと、各式は以下のように整理される。

$$
\begin{aligned}
 \frac{\partial J}{\partial w_{0} } &= \frac{2}{N} \sum_{n=0}^{N-1} (w_{0} x_{n,0} + w_{1} x_{n,1} + w_{2} - t_{n}) x_{n,0}  \\
  &= 2( w_{0} avg((x_{0})^2) + w_{1} avg(x_{0} x_{1}) + w_{2} avg(x_{0}) - avg(t x_{0} ) )  = 0 \\
 \frac{\partial J}{\partial w_{1} } &= \frac{2}{N} \sum_{n=0}^{N-1} (w_{0} x_{n,0} + w_{1} x_{n,1} + w_{2} - t_{n}) x_{n,1}  \\
  &= 2( w_{0} avg(x_{0} x_{1}) + w_{1} avg( (x_{1})^2 ) + w_{2} avg(x_{1}) - avg(t x_{1} ) )  = 0 \\
 \frac{\partial J}{\partial w_{0} } &= \frac{2}{N} \sum_{n=0}^{N-1} (w_{0} x_{n,0} + w_{1} x_{n,1} + w_{2} - t_{n}) x_{n,0}  \\
  &= 2( w_{0} avg(x_{0}) + w_{1} avg(x_{0} x_{1}) + w_{2} avg(x_{0}) - avg(t x_{0} ) )  = 0
\end{aligned}
$$

この３式をそれぞれ$w_{0},w_{1},w_{2}$について解くと、$w_{0},w_{1},w_{2}$は以下のように表される。

$$
\begin{aligned}
 w_{0} &= \frac{cov(t,x_{1}) cov(x_{0},x_{1}) - var(x_{1}) cov(t,x_{0})}{ cov(x_{0},x_{1})^2 - var(x_{0}) var(x_{1})}   \\
 w_{1} &= \frac{cov(t,x_{0}) cov(x_{0},x_{1}) - var(x_{0}) cov(t,x_{1})}{ cov(x_{0},x_{1})^2 - var(x_{0}) var(x_{1})}  \\
 w_{2} &= - w_{0} avg(x_{0}) - w_{1} avg(x_{1}) + avg(t)
\end{aligned}
$$

ここで、

$$
var(a) = avg(a^{2}) - avg(a)^{2}
$$

$$
cov(a,b) = avg(ab)-avg(a)avg(b)
$$

とする。var(a)は a の分散と呼ばれ、a のばらつき具合を示す値である。

cov(a,b)は a,b の共分散と呼ばれる値で、a,b がどれぐらい影響しあっているかを示す。

では、これらより求める面を実装し、図示してみよう。

コードを以下に示す。

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

x0 = np.array([117.9,164.3,171.6,172.7,132.8,170.2,152.3,163.8,168.8,127.2,142.3,156.4,173.1,176.9,158.4,127.1,147.4,123.7,152.0,174.1])
x1 = np.array([28.0,58.2,60.1,65.2,35.0,60.9,51.9,56.4,62.9,27.0,44.9,45.9,68.0,67.9,59.1,30.8,45.6,36.1,39.9,69.5])
t = np.array([6,16,19,18,9,16,12,14,15,7,10,12,17,18,15,8,11,7,11,19])

fig=plt.figure()
ax = Axes3D(fig)

ax.set_xlabel("height")
ax.set_ylabel("weight")
ax.set_zlabel("old")

ax.plot(x0,x1,t,marker="o",linestyle='None')

###

#t,x0の共分散をcov_tx0とする。以下同様
cov_tx0 = np.mean(t*x0) - np.mean(t)*np.mean(x0)
cov_tx1 = np.mean(t*x1) - np.mean(t)*np.mean(x1)
cov_x0x1 = np.mean(x0*x1) - np.mean(x0)*np.mean(x1)

w0 = (cov_tx1*cov_x0x1 - np.var(x1)*cov_tx0)/(cov_x0x1*cov_x0x1 - np.var(x0)*np.var(x1))
w1 = (cov_tx0*cov_x0x1 - np.var(x0)*cov_tx1)/(cov_x0x1*cov_x0x1 - np.var(x0)*np.var(x1))
w2 = -1 * w0 * np.mean(x0) - w1 * np.mean(x1) + np.mean(t)

print("w0:{0}".format(w0))
print("w1:{0}".format(w1))
print("w2:{0}".format(w2))

def plane(x0,x1):
    return w0*x0 + w1*x1 + w2


h = np.linspace(110,180,71)
w = np.linspace(25,75,71)

old=np.zeros((len(w),len(h)))

for hi in range(len(h)):
     for wi in range(len(w)):
             old[wi,hi] = plane(h[hi],w[wi])

hh,ww = np.meshgrid(h,w)

ax.plot_surface(hh,ww,old,rstride=1,cstride=1,alpha=0.3,color='red',edgecolor='black')

plt.show()

```

実行結果

```
w0:0.1338551780532153
w1:0.11625116831025058
w2:-13.456713550315381
```

![Figure 21](/assets/note/programming/102_machine_learning/1021_supervised_learning/10211_regression/2dmodel/Figure_21.png)

となり、入力データにおいて面モデルでの最も誤差が少ない最適な面が求められる。
