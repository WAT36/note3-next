---
title: "行列とは"
excerpt: ""
coverImage: ""
date: "2025-10-20T22:41:56.000Z"
updatedAt: "2025-10-20T22:41:56.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

# 行列の定義

いくつかの数の組を長方形状に並べ、以下のように両側をカッコでくくったものを**行列**といい、各々の数を行列の**成分**という。

$$

\begin{bmatrix}
a & b \\
c & d
\end{bmatrix} \quad


$$

行列においては、横の並びを行といい、縦の並びを列という。

一般に、$m,n$ を自然数とし、$mn$ 個の数

$$
a_{ij} \quad (i = 1,2, \cdots , m; j = 1,2, \cdots , n)
$$

を $m$ 個の行と $n$ 個の列からなる長方形状に並べて、両側をカッコでくくった

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

を $m$ 行 $n$ 列の行列、または $m×n$ 行列、$m×n$ 型の行列などという。

上から $i$ 番目の横に並んだ成分の組 $a_{i1},a_{i2},\cdots,a_{in}$ を第 $i$ 行

左から $j$ 番目の縦に並んだ成分の組 $a_{1j},a_{2j},\cdots,a_{mj}$ を第 $j$ 列

という。

また、第 $i$ 行と第 $j$ 列の交わりにある成分 $a_{ij}$ を行列の$(i,j)$成分という。

# 表記法

一般に、行列は大文字 $A,B,C, \cdots $ を用いて

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

のように表す。特に、右辺は単に$(i,j)$成分だけを代表させて

$$
A = [a_{ij}]
$$

のように略記することもある。

- 行と列の個数が等しい $n \times n$ 行列を**n 次正方行列**という。このとき、対角線上に並んだ n 個の成分 $a_{11},a_{22}, \cdots ,a_{nn}$を**対角成分**という。

$$
A =
\begin{bmatrix}
a_{11} & a_{12} &  \cdots & a_{1j} & \cdots  & a_{1n} \\
a_{21} & a_{22} &  \cdots & a_{2j} & \cdots  & a_{2n} \\
\vdots & \vdots &  \quad & \vdots & \quad  & \vdots \\
a_{i1} & a_{i2} &  \cdots & a_{ij} & \cdots  & a_{in} \\
\vdots & \vdots &  \quad & \vdots & \quad  & \vdots \\
a_{n1} & a_{n2} &  \cdots & a_{nj} & \cdots  & a_{nn}
\end{bmatrix} \quad
$$

- １つの行だけからなる $1 \times n$ 行列を（n 次）行ベクトルという。

$$
A =
\begin{bmatrix}
a_{11} & a_{12} &  \cdots & a_{1j} & \cdots  & a_{1n}
\end{bmatrix} \quad
$$

- １つの列だけからなる $m \times 1$ 行列を（m 次）行ベクトルという。

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

ここでは以降行列は大文字で表すが、行ベクトルと列ベクトルは原則として、小文字の太字$ \boldsymbol{a}, \boldsymbol{b}, \cdots , \boldsymbol{x}, \boldsymbol{y}, \cdots $などを用いて表す。
