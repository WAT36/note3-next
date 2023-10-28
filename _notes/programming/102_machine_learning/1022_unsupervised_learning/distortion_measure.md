---
title: "歪み尺度"
date: "2019-11-05T02:01:30+09:00"
excerpt: "歪み尺度について"
tag: ["Python"]
updatedAt: "2019-11-05T02:01:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

教師あり学習では、学習が進み精度が高くなることの指標として、平均交差エントロピー誤差のような関数を利用していた。

教師なし学習、今回のクラスタリングの場合でもこのような関数を設定し利用することはできないだろうか。

実は、クラスタリングにおいてもそのような関数があり、**歪み尺度**と呼ばれている。

歪み尺度とは、全ての入力データにおいてそれが属するクラスタの中心位置との距離の 2 乗の和を取ったものである。

この値が小さくなればなるほど、クラスタリングがうまく行われているとみなせる。

歪み尺度を求める式を以下に示す。

$$
\tag{1}
    J = \sum_{x_{i} \in クラスタk}^{}  \sum_{k=0}^{クラスタ数-1} | x_{i} - { \bf \mu }_{k} | ^2
$$

では、前述のクラスタリングに歪み尺度を求めるコードを追加してみよう。

k-means 法のコードに歪み尺度を求めるコードを追加し、学習  するループごとにおいて歪み尺度を計算し、表示してみる。

```python
import numpy as np

k=-1
x=[]
mu=[]
R=[]

## 新規追加　歪み尺度を求める関数
def distortion_measure(x,mu,r):
    #クラスタ数
    k=r.shape[1]
    #歪み尺度
    J=0
    #計算
    for i in range(k):
        xi=x[r[:,i]==1]
        for j in range(xi.shape[0]):
            J+=(xi[j][0]-mu[i][0])**2 +(xi[j][1]-mu[i][1])**2

    return J


#R計算
def calc_r(X,Mu):

    #初期化　入力データx、μとR用意
    x=np.array(X)
    mu=np.array(Mu)
    k=len(mu)
    R=np.zeros((len(x),k))

    for i in range(len(x)):
        ri=np.zeros(k)
        ri[0]=1
        R[i]=ri

    flag=True
    count=1

    while(flag):
        flag=False

        #Rを計算し更新
        for i in range(len(x)):
            d=[(x[i][0]-mu[j][0])**2 + (x[i][1]-mu[j][1])**2  for j in range(k)]
            ri=np.zeros(k)
            ri[d.index(min(d))]=1
            if(not np.allclose(R[i],ri)):
                flag=True
            R[i]=ri

        #μを調整
        for i in range(k):
            x_i=x[R[:,i]==1]
            mu_ix=np.mean(x_i[:,0])
            mu_iy=np.mean(x_i[:,1])
            mu[i]=np.array([mu_ix,mu_iy])

        ##この部分を新規追加 学習終了後に歪み尺度を計算して表示
        J=distortion_measure(x,mu,R)
        print("学習{0}回目,歪み尺度:{1}".format(count,J))

        count+=1

    return mu,R
```

実行結果(コンソール)

```
$ python do_k_means.py
学習1回目,歪み尺度:144.6011020740245
学習2回目,歪み尺度:151.78653084347673
学習3回目,歪み尺度:136.5863856799487
学習4回目,歪み尺度:134.59275424760008
学習5回目,歪み尺度:134.59275424760008
```

となり、初めは尺度が上がっているが、学習が進むにつれ歪み尺度が少なくなっていき、学習の精度が高くなっていることが伺える。
