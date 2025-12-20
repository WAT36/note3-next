---
title: "行列とは"
excerpt: ""
coverImage: ""
date: '2025-12-21T01:10:48.000Z'
updatedAt: '2025-12-21T01:10:48.000Z'
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

# 行列の定義

複数の数の集合を長方形状に配置し、左右を括弧で囲んだものを**行列**、そこに並ぶそれぞれの値を**成分**と呼ぶ。

$$

\begin{bmatrix}
a & b \\
c & d
\end{bmatrix} \quad


$$

行列では、横方向の並びを行、縦方向の並びを列と呼び分ける。

一般に、自然数 $m,n$ を取り、$mn$ 個の数

$$
a_{ij} \quad (i = 1,2, \cdots , m; j = 1,2, \cdots , n)
$$

$m$ 個の行と $n$ 個の列から成る長方形に並べ、左右を括弧で囲んだ

$$

\begin{bmatrix}
a_{11} & a_{12} &  \cdots & a_{1j} & \cdots  & a_{1n} \\
a_{21} & a_{22} &  \cdots & a_{2j} & \cdots  & a_{2n} \\

\vdots & \vdots &  \quad & \vdots & \quad  & \vdots \\
a_{i1} & a_{i2} &  \cdots & a_{ij} & \cdots  & a_{in} \\
\vdots & \vdots &  \quad & \vdots & \quad  & \vdots \\
a_{m1} & a_{m2} &  \cdots & a_{mj} & \cdots  & a_{mn}
\end{bmatrix} \quad


$$

ものを $m$ 行 $n$ 列の行列、または $m×n$ 行列、$m×n$ 型の行列などと呼ぶ。ここで、

上から $i$ 番目に並ぶ成分 $a_{i1},a_{i2},\cdots,a_{in}$ を第 $i$ 行、

左から $j$ 番目の縦方向に並ぶ $a_{1j},a_{2j},\cdots,a_{mj}$ を第 $j$ 列という。

第 $i$ 行と第 $j$ 列が交わる位置にある成分 $a_{ij}$ を行列の $(i,j)$ 成分と呼ぶ。

# 表記法

行列は通常、大文字 $A,B,C,\cdots$ で表す。

$$
A =
\begin{bmatrix}
a_{11} & a_{12} &  \cdots & a_{1j} & \cdots  & a_{1n} \\
a_{21} & a_{22} &  \cdots & a_{2j} & \cdots  & a_{2n} \\
\vdots & \vdots &  \quad & \vdots & \quad  & \vdots \\
a_{i1} & a_{i2} &  \cdots & a_{ij} & \cdots  & a_{in} \\
\vdots & \vdots &  \quad & \vdots & \quad  & \vdots \\
a_{m1} & a_{m2} &  \cdots & a_{mj} & \cdots  & a_{mn}
\end{bmatrix} \quad
$$

などと書き、右辺を $(i,j)$ 成分で代表させて

$$
A = [a_{ij}]
$$

と簡略に書くこともある。

- 行と列の数が一致する $n \times n$ 行列は**n 次正方行列**と呼ばれ、その対角線上に並ぶ $a_{11},a_{22}, \cdots ,a_{nn}$ を**対角成分**と呼ぶ。

$$
A =
\begin{bmatrix}
a_{11} & a_{12} &  \cdots & a_{1j} & \cdots  & a_{1n} \\
a_{21} & a_{22} &  \cdots & a_{2j} & \cdots  & a_{2n} \\
\vdots & \vdots &  \ddots & \vdots & \quad  & \vdots \\
a_{i1} & a_{i2} &  \cdots & a_{ij} & \cdots  & a_{in} \\
\vdots & \vdots &  \quad & \vdots &  \ddots  & \vdots \\
a_{n1} & a_{n2} &  \cdots & a_{nj} & \cdots  & a_{nn}
\end{bmatrix} \quad
$$

- １行のみで構成される $1 \times n$ 行列は（n 次）行ベクトルと呼ばれる。

$$
A =
\begin{bmatrix}
a_{11} & a_{12} &  \cdots & a_{1j} & \cdots  & a_{1n}
\end{bmatrix} \quad
$$

- １列だけからなる $m \times 1$ 行列は（m 次）列ベクトルと呼ばれる。

$$
A =
\begin{bmatrix}
a_{11} \\
a_{21} \\
\vdots \\
a_{i1} \\
\vdots \\
a_{m1}
\end{bmatrix} \quad
$$

以降では行列は大文字で書き、行ベクトルや列ベクトルについては小文字の太字 $ \boldsymbol{a}, \boldsymbol{b}, \cdots , \boldsymbol{x}, \boldsymbol{y}, \cdots $ を用いることにする。
