---
title: "勾配法(最急降下法)"
date: "2019-11-03T03:01:30+09:00"
excerpt: "勾配法(最急降下法)について"
tag: ["Python"]
updatedAt: "2019-11-03T03:01:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

前述の平均二乗誤差で最も誤差が小さくなる $w_{0},w_{1}$を正確に求めるにはどうすればよいのか？

その一例として、ここでは**勾配法**という方法についてを述べる。

勾配法とは曲面(2 変数関数のグラフ)において、最初にある座標を定めて曲面の傾きを求め、そこから傾きの方向(=曲面の座標が低くなる方向)へ座標を移していく、という動作を繰り返し、最終的に傾き 0 の座標にたどり着くことで曲面が最も小さくなる座標を求めるという方法である。

前述の平均二乗誤差 $J$ において、この勾配法を利用し最も $J$ が小さくなる $w_{0},w_{1}$の組み合わせを求めることを考える。

平均二乗誤差 $J$ の($w_{0},w_{1}$)での傾きは以下のように表される。

$$
\nabla J =
\left[
\begin{array}{c}
\displaystyle \frac{\partial J}{\partial w_{0}}  \\
\\
\displaystyle \frac{\partial J}{\partial w_{1}}  \\
\end{array}
\right]
=
\left[
\begin{array}{c}
\displaystyle \frac{2}{N} \sum_{n=0}^{N-1} (y_{n} - t_{n})x_{n}   \\
\\
\displaystyle \frac{2}{N} \sum_{n=0}^{N-1} (y_{n} - t_{n})  \\
\end{array}
\right]
$$

この値はそれぞれ J の $w_{0},w_{1}$ に関する傾きを示している。

これを利用し、$w_{0},w_{1}$ の座標を移動させることで、傾きが 0 かつ J の値が低くなる方向へと近づけていく。

$\bm{w} = [w_{0},w_{1}]$ とし、t 回移動させた後の $\bm{w}$ を $\bm{w}(t)$ とすると、以下の漸化式が成り立つ。

$$
\bm w(t+1) = \bm w(t) = \alpha \nabla J |_{w(t)}
$$

ここで $\alpha$ は**学習率**と呼ばれるパラメータで、1 回の移動で $\bm{w}$ をどれだけ移動させるかの度合を示す。

$w_{0},w_{1}$ それぞれで表すと以下のようになる。

$$
\bm w_{0}(t+1) = \bm w_{0}(t) = \alpha \frac{\partial J}{\partial w_{0}} |_{w_{0}(t),w_{1}(t)}
$$

$$
\bm w_{1}(t+1) = \bm w_{1}(t) = \alpha \frac{\partial J}{\partial w_{1}} |_{w_{0}(t),w_{1}(t)}
$$

それではこの式を利用するために、この式に出てくる J を $w_{0},w_{1}$ で偏微分した値を求めてみよう。

まず J は前述の平均二乗誤差の定義から以下のような式である。

$$
J = \frac{1}{N} \sum_{n=0}^{N-1} (y_{n} - t_{n})^{2}
$$

ここで

$$
y_{n} = w_{0} x + w_{1}
$$

より

$$
J = \frac{1}{N} \sum_{n=0}^{N-1} (w_{0} x_{n} + w_{1} - t_{n})^{2}
$$

これを $w_{0},w_{1}$ でそれぞれ偏微分すると

$$
\frac{\partial J}{\partial w_{0}}
= \frac{2}{N} \sum_{n=0}^{N-1} (w_{0} x_{n} + w_{1} - t_{n}) x_{n}
= \frac{2}{N} \sum_{n=0}^{N-1} (y_{n} - t_{n}) x_{n}
$$

$$
\frac{\partial J}{\partial w_{1}}
= \frac{2}{N} \sum_{n=0}^{N-1} (w_{0} x_{n} + w_{1} - t_{n})
= \frac{2}{N} \sum_{n=0}^{N-1} (y_{n} - t_{n})
$$

になる。これより、上式は

$$
\bm w_{0}(t+1) = \bm w_{0}(t) - \alpha \frac{2}{N} \sum_{n=0}^{N-1} (y_{n} - t_{n}) x_{n}
$$

$$
\bm w_{1}(t+1) = \bm w_{1}(t) - \alpha \frac{2}{N} \sum_{n=0}^{N-1} (y_{n} - t_{n}) x_{n}
$$

となる。これを利用して求めてみよう。

コード例を以下に記載する。

まずは平均二乗誤差 J の $w_{0},w_{1}$ における勾配を求める関数を d_mse とおくと以下のようになる。(w,x,t を入力とする)

```python
import numpy as np
def d_mse(w,x,t):
    y = w[0] * x + w[1]
    d_w0 = 2 * np.mean((y-t)*x)
    d_w1 = 2 * np.mean(y-t)
    return d_w0,d_w1
```

試しに、 $w=[10,10]$ での平均二乗誤差を算出してみる。データは前章で使ったデータを利用する。

```python
import numpy as np
#入力値
x = np.array([167.9,164.3,171.6,172.7,162.8,170.2,172.3,163.8,168.8,167.2,172.3,166.4,173.1,176.9,178.4,167.1,177.4,173.7,172.0,174.1])
#実測値
t  = np.array([58.0,58.2,60.1,65.2,55.0,60.9,61.9,56.4,62.9,57.0,64.9,55.9,68.0,67.9,69.1,60.8,65.6,66.1,59.9,69.5])

#x,tをnpyファイルに保存
np.save('x.npy',x)
np.save('t.npy',t)


def d_mse(w,x,t):
    # 略

d_w = d_mse([10,10],x,t)

print(d_w)
```

実行結果

```
(564976.373, 3308.6699999999996)
```

$w=[10,10]$ では $w_{0}$ 方向への勾配が大きいことがわかる。

ではこの $J$ の勾配を算出する関数 d_mse を利用した勾配法を行う関数 steepest_descent_method(x,t)を実装してみよう。
w は先ほどの[10,10]から始めるものとし、学習率 $\alpha$ は今回は 0.000034 として行う。

```python
import numpy as np
def steepest_descent_method(x,t,a,n):
    w=[10,10]           #wの初期値
    alpha=a             #学習率
    N=n                 #繰り返し回数
    min_dJ=0.1          #勾配法をやめる勾配の絶対値の閾値
    w_i=np.zeros([N,2]) #w_i[j]にはj回の勾配法で算出したwの値が入る
    w_i[0,:]=w          #w_iの最初の1行をwにする
    for i in range(1,N):
        dJ=d_mse(w_i[i-1],x,t)
        w_i[i,0]=w_i[i-1,0]-alpha*dJ[0] #w0(t+1)=w0(t)-α*∂J/∂w0
        w_i[i,1]=w_i[i-1,1]-alpha*dJ[1] #w1(t+1)=w1(t)-α*∂J/∂w1
        if( max(np.absolute(dJ)) < min_dJ):
            break
    w0=w_i[i,0]
    w1=w_i[i,1]
    w_i=w_i[:i,:]
    return w0,w1,dJ,w_i
```

これを利用し、平均二乗誤差 $J$ の最小値を勾配法を用いて求めて見る。

```python
import numpy as np

def d_mse(w,x,t):
    #(略)

def steepest_descent_method(x,t,a,n):
    #(略)

#入力値
x = np.load('x.npy')
#実測値
t = np.load('t.npy')

w0,w1,dJ,w_history = steepest_descent_method(x,t,0.000034,10000000)
print("繰り返し回数:"+str(w_history.shape[0]))
print("w0:{0:.9f} ,w1:{1:.9f}".format(w0,w1))
print("dJ:"+str(dJ))

```

実行結果

```
繰り返し回数:6800910
w0:0.464910324 ,w1:-17.121946810
dJ:(-0.0005856056965058088, 0.09999999786601492)
```

となるように、一回ずつシミュレーションを行っていくことで、より最適な値を求めることが可能となる。

しかし、実は勾配法のようなシミュレーションをせずとも、式の計算だけで最適な $w_{0},w_{1}$ が求められてしまうパターンもある。  
それについては次章で解説する。
