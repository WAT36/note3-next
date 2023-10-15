---
title: "N次元線形回帰モデル"
date: "2019-11-03T06:01:30+09:00"
excerpt: "N次元線形回帰モデルについて"
tag: ["Python"]
updatedAt: "2019-11-03T06:01:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

先程までの章では 1 次元(直線モデル)、2 次元(面モデル)の入力データを扱ってきたが、そこから更に次元を広げた N 次元の入力データの場合はどうなるだろうか。
ここではそれについてを述べる。

N 次元での入力データから予測値 y を算出する式は以下の式で表される。

$$
\tag{1}  y=w_{0} x_{0} + w_{1} x_{1} + w_{2} x_{2} + \cdots + w_{N-1} x_{N-1} + w_{N} (w_{i} は実数)
$$

N 次元の時も 1 次元 2 次元の時と同様に式(1)の様な形で表される。この式の形で表されるモデルは**線形回帰モデル**と呼ばれている。

式(1)において、最後の$w_{N}$には入力データがない事に注意する。 (切片である)

ここでは簡略化のため、以降$w_{N} = 0$として考える。すると式(1)は以下の様になる。

$$
\tag{2}  y=w_{0} x_{0} + w_{1} x_{1} + w_{2} x_{2} + \cdots + w_{N-1} x_{N-1}
$$

この式(2)を行列表記で書き直すと、以下の様になる。

$$
\begin{aligned}
\tag{3}  y  &= w_{0} x_{0} + w_{1} x_{1} + w_{2} x_{2} + \cdots + w_{N-1} x_{N-1} \\
            &=  \left[
                    \begin{array}{ccc}
                    w_{0} & \cdots & w_{N-1}
                    \end{array}
                \right]
                \left[
                    \begin{array}{cccc}
                    x_{0} \\
                    \vdots \\
                    x_{N-1}
                    \end{array}
                \right]
            \\
            &= {\bf w} ^\mathrm{T} {\bf x}
\end{aligned}
$$

ここで

$$
  {\bf w} = \left[
    \begin{array}{cccc}
      w_{0} \\
      w_{1} \\
      \vdots \\
      w_{N-1}
    \end{array}
  \right]
  ,
    {\bf x} = \left[
    \begin{array}{cccc}
      x_{0} \\
      x_{1} \\
      \vdots \\
      x_{N-1}
    \end{array}
  \right]
$$

とおく。

<hr>

では、ここから N 次元線形回帰モデルの解析解を求めてみよう。

これまでと同様にして、平均二乗誤差 J は以下の様に表される。

$$
\begin{aligned}
\tag{4}  J( {\bf w} ) &= \frac{1}{N} \sum_{n=0}^{N-1} ( y(x_{n}) - t_{n} )^2 \\
                      &= \frac{1}{N} \sum_{n=0}^{N-1} ( {\bf w} ^\mathrm{T} {\bf x}_{n} - t_{n} )^2
\end{aligned}
$$

ここも同様にして、式(4)を$w_{i}$で偏微分すると、以下の様になる。

$$
\begin{aligned}
\tag{5}  \frac{\partial J}{\partial w_{i} }
            &= \frac{1}{N} \sum_{n=0}^{N-1} \frac{\partial }{\partial w_{i} } ( {\bf w} ^\mathrm{T} {\bf x}_{n} - t_{n} )^2 \\
            &= \frac{2}{N} \sum_{n=0}^{N-1} ( {\bf w} ^\mathrm{T} {\bf x}_{n} - t_{n} ) x_{n,i}
\end{aligned}
$$

なお、$x_{n,i}$は n 番目の入力データにおける i 番目のパラメータである。

また、${\bf w}^{T}{\bf x}$を$w_{i}$で偏微分すると、$x_{n,i}$だけが残る事に注意する。

J を最小にする${\bf w}$では、全ての $w_{i}$ について傾き 0、つまり式(5)が０になるので、次の式が全ての i で成り立つ。

$$
\begin{aligned}
\tag{6}  \frac{2}{N} \sum_{n=0}^{N-1} ( {\bf w} ^\mathrm{T} {\bf x}_{n} - t_{n} ) x_{n,i} &= 0 \\
\Leftrightarrow  \sum_{n=0}^{N-1} ( {\bf w} ^\mathrm{T} {\bf x}_{n} - t_{n} ) x_{n,i} &= 0
\end{aligned}
$$

式(6)は全ての i (0≦i≦N-1) で成り立つ。つまり以下の式が成り立つ。

$$
\begin{aligned}
\tag{7} \sum_{n=0}^{N-1} ( {\bf w} ^\mathrm{T} {\bf x}_{n} - t_{n} ) x_{n,0} &= 0 \\
        \sum_{n=0}^{N-1} ( {\bf w} ^\mathrm{T} {\bf x}_{n} - t_{n} ) x_{n,1} &= 0 \\
        \vdots \\
        \sum_{n=0}^{N-1} ( {\bf w} ^\mathrm{T} {\bf x}_{n} - t_{n} ) x_{n,N-1} &= 0
\end{aligned}
$$

この式をベクトルを使って書き換えると以下の式の様になる。

$$
\begin{aligned}
\tag{8} &\sum_{n=0}^{N-1} ( {\bf w} ^\mathrm{T} {\bf x}_{n} - t_{n} ) [ x_{n,0}, x_{n,1}, \cdots , x_{n,N-1} ]
        =
                \left[
                    \begin{array}{ccc}
                    0 & 0 & \cdots & 0
                    \end{array}
                \right]  \\
        \Leftrightarrow
        &\sum_{n=0}^{N-1} ( {\bf w} ^\mathrm{T} {\bf x}_{n} - t_{n} ) {\bf x}_{n} ^\mathrm{T}
        =
                \left[
                    \begin{array}{ccc}
                    0 & 0 & \cdots & 0
                    \end{array}
                \right] \\
        \Leftrightarrow
        &\sum_{n=0}^{N-1} ( {\bf w} ^\mathrm{T} {\bf x}_{n} {\bf x}_{n} ^\mathrm{T}
                          - t_{n} {\bf x}_{n} ^\mathrm{T} )
        =
                \left[
                    \begin{array}{ccc}
                    0 & 0 & \cdots & 0
                    \end{array}
                \right] \\
        \Leftrightarrow
        & {\bf w} ^\mathrm{T} \sum_{n=0}^{N-1} {\bf x}_{n} {\bf x}_{n} ^\mathrm{T}
          -  \sum_{n=0}^{N-1} t_{n} {\bf x}_{n} ^\mathrm{T}
        =
                \left[
                    \begin{array}{ccc}
                    0 & 0 & \cdots & 0
                    \end{array}
                \right]
\end{aligned}
$$

ここで

$$
\begin{aligned}
\tag{9}
         \sum_{n=0}^{N-1} {\bf x}_{n} {\bf x}_{n} ^\mathrm{T}
        &=
         \sum_{n=0}^{N-1}
                \left[
                    \begin{array}{cccc}
                    x_{n,0} \\
                    x_{n,1} \\
                    \vdots \\
                    x_{n,N-1}
                    \end{array}
                \right]
                \left[
                    \begin{array}{ccc}
                    x_{n,0} & x_{n,1} & \cdots & x_{n,N-1}
                    \end{array}
                \right] \\
        &=
          \sum_{n=0}^{N-1}
                \left[
                    \begin{array}{cccc}
                    x_{n,0}^2 & x_{n,0} x_{n,1} & \cdots & x_{n,0} x_{n,N-1} \\
                    x_{n,1} x_{n,0} & x_{n,1}^2 & \cdots & x_{n,1} x_{n,N-1} \\
                    \vdots & \vdots & \ddots & \vdots \\
                    x_{n,N-1} x_{n,0} & x_{n,N-1} x_{n,1} & \cdots & x_{n,N-1}^2
                    \end{array}
                \right] \\
        &=
                \left[
                    \begin{array}{llll}
                    \displaystyle \sum_{n=0}^{N-1} x_{n,0}^2 & \displaystyle \sum_{n=0}^{N-1} x_{n,0} x_{n,1} & \cdots & \displaystyle \sum_{n=0}^{N-1} x_{n,0} x_{n,N-1} \\
                    \displaystyle \sum_{n=0}^{N-1} x_{n,1} x_{n,0} & \displaystyle \sum_{n=0}^{N-1} x_{n,1}^2 & \cdots & \displaystyle \sum_{n=0}^{N-1} x_{n,1} x_{n,N-1} \\
                    \vdots & \vdots & \ddots & \vdots \\
                    \displaystyle \sum_{n=0}^{N-1} x_{n,N-1} x_{n,0} & \displaystyle \sum_{n=0}^{N-1} x_{n,N-1} x_{n,1} & \cdots & \displaystyle \sum_{n=0}^{N-1} x_{n,N-1}^2
                    \end{array}
                \right] \\
        &=
                \left[
                    \begin{array}{llll}
                    x_{0,0} & x_{1,0} & \cdots & x_{N-1,0} \\
                    x_{0,1} & x_{1,1} & \cdots & x_{N-1,1} \\
                    \vdots & \vdots & \ddots & \vdots \\
                    x_{0,N-1} & x_{1,N-1} & \cdots & x_{N-1,N-1}
                    \end{array}
                \right]
                \left[
                    \begin{array}{llll}
                    x_{0,0} & x_{0,1} & \cdots & x_{0,N-1} \\
                    x_{1,0} & x_{1,1} & \cdots & x_{1,N-1} \\
                    \vdots & \vdots & \ddots & \vdots \\
                    x_{N-1,0} & x_{N-1,1} & \cdots & x_{N-1,N-1}
                    \end{array}
                \right] \\
        &= {\bf X} ^\mathrm{T} {\bf X}


\end{aligned}
$$

$$
\begin{aligned}
\tag{10}
         \sum_{n=0}^{N-1} t_{n} {\bf x}_{n} ^\mathrm{T}
        &=
         \sum_{n=0}^{N-1}
                t_{n}
                \left[
                    \begin{array}{ccc}
                    x_{n,0} & x_{n,1} & \cdots & x_{n,N-1}
                    \end{array}
                \right] \\
        &=
          \sum_{n=0}^{N-1}
                \left[
                    \begin{array}{ccc}
                    t_{n} x_{n,0} & t_{n} x_{n,1} & \cdots & t_{n} x_{n,N-1}
                    \end{array}
                \right] \\
        &=
                \left[
                    \begin{array}{llll}
                    \displaystyle \sum_{n=0}^{N-1} t_{n} x_{n,0} & \displaystyle \sum_{n=0}^{N-1} t_{n} x_{n,1} & \cdots & \displaystyle \sum_{n=0}^{N-1} t_{n} x_{n,N-1}
                    \end{array}
                \right] \\
        &=
                \left[
                    \begin{array}{ccc}
                    t_{0} & t_{1} & \cdots & t_{N-1}
                    \end{array}
                \right]
                \left[
                    \begin{array}{llll}
                    x_{0,0} & x_{0,1} & \cdots & x_{0,N-1} \\
                    x_{1,0} & x_{1,1} & \cdots & x_{1,N-1} \\
                    \vdots & \vdots & \ddots & \vdots \\
                    x_{N-1,0} & x_{N-1,1} & \cdots & x_{N-1,N-1}
                    \end{array}
                \right] \\
        &= {\bf t} ^\mathrm{T} {\bf X}
\end{aligned}
$$

とおく、ここで

$$
\tag{11}
        {\bf t}
        =
                \left[
                    \begin{array}{cccc}
                    t_{0} \\
                    t_{1} \\
                    \vdots \\
                    t_{N-1}
                    \end{array}
                \right]
        ,
        {\bf X}
        =
                \left[
                    \begin{array}{cccc}
                    x_{0,0} & x_{0,1} & \cdots & x_{0,N-1} \\
                    x_{1,0} & x_{1,1} & \cdots & x_{1,N-1} \\
                    \vdots & \vdots & \ddots & \vdots \\
                    x_{N-1,0} & x_{N-1,1} & \cdots & x_{N-1,N-1}
                    \end{array}
                \right]
$$

である。

これより、式(8)は以下式(12)の様に書き換えられる。

$$
\begin{aligned}
\tag{12}  & {\bf w} ^\mathrm{T} \sum_{n=0}^{N-1} {\bf x}_{n} {\bf x}_{n} ^\mathrm{T}
          -  \sum_{n=0}^{N-1} t_{n} {\bf x}_{n} ^\mathrm{T}
        &=
                \left[
                    \begin{array}{ccc}
                    0 & 0 & \cdots & 0
                    \end{array}
                \right] \\
        \Leftrightarrow
        & {\bf w} ^\mathrm{T} {\bf X} ^\mathrm{T} {\bf X} -  {\bf t} ^\mathrm{T} {\bf X}
        &=
                \left[
                    \begin{array}{ccc}
                    0 & 0 & \cdots & 0
                    \end{array}
                \right]
\end{aligned}
$$

式(12)で${\bf t}^{T}{\bf X}$を右辺に移項すると

$$
\tag{13}  {\bf w} ^\mathrm{T}  {\bf X} ^\mathrm{T} {\bf X}
        = {\bf t} ^\mathrm{T}  {\bf X}
$$

ここで両辺を転置すると、$({\bf AB})^{T} = {\bf B}^{T}{\bf A}^{T}$より式(13)は

$$
\begin{aligned}
\tag{14}   ( {\bf w} ^\mathrm{T}  {\bf X} ^\mathrm{T} {\bf X} )^\mathrm{T}
        &= ( {\bf t} ^\mathrm{T}  {\bf X} )^\mathrm{T} \\
           ( {\bf X} ^\mathrm{T} {\bf X} )^\mathrm{T} ({\bf w} ^\mathrm{T}) ^\mathrm{T}
        &= {\bf X} ^\mathrm{T}  {\bf t} \\
           ( {\bf X} ^\mathrm{T} {\bf X} ) {\bf w}
        &= {\bf X} ^\mathrm{T}  {\bf t}
\end{aligned}
$$

となり、この式(14)に左から$({\bf X}^{T}{\bf X})^{-1}$をかける事により、${\bf w}$は以下の式(15)の様に表される。

$$
\tag{15}   {\bf w} = ( {\bf X} ^\mathrm{T}  {\bf X} )^{-1} {\bf X} ^\mathrm{T} {\bf t}
$$

よって、長くなったが式(15)により${\bf w}$の値が導出された。またこれが N 次元線形回帰モデルの解となる。

そして、式(15)の右辺の式 $({\bf X}^{T}{\bf X})^{-1}{\bf X}^{T}$
は**ムーアーペンローズの擬似逆行列**という名が付けられている。

<hr>

さて、式(2)で計算の簡略化のため$w_{N}=0$としたと書いたが、$w_{N} \neq 0$の場合も勿論ある。その場合${\bf w}$や${\bf x}$の次数が異なるがどうすれば良いのか？

その場合、$w_{N}$にもダミー用のパラメータである$x_{N}$を追加する。

ここで、常に$x_{N}=1$ となる様に設定する。

$$
\begin{aligned}
\tag{16}     y &= w_{0} x_{0} + w_{1} x_{1} + w_{2} x_{2} + \cdots + w_{N-1} x_{N-1} + w_{N} \\
           \Leftrightarrow  y &= w_{0} x_{0} + w_{1} x_{1} + w_{2} x_{2} + \cdots + w_{N-1} x_{N-1} + w_{N} x_{N} ( x_{N} = 1)
\end{aligned}
$$

この式(16)に対しムーアーペンローズの擬似逆行列を作成すれば、w が求められる。これにより$w_{N} \neq 0$の場合においても解が求められた。
