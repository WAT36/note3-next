---
title: "連立１次方程式と行列"
excerpt: ""
coverImage: ""
date: "2025-12-22T16:19:11.000Z"
updatedAt: "2025-12-22T16:19:11.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

連立 1 次方程式、例えば以下のような式

$$

\begin{equation}
\left\{ \,
\begin{aligned}
& x & - & 2y & + & 3z & = & 1 \\
& 3x & + & y & - & 5z & = & -4 \\
& -2x & + & 6y &- & 9z & = & -2
\end{aligned}
\right.
\end{equation}


$$

は、以下のような行列を使った式に置き換えられる。

$$

\begin{bmatrix}
   1 & -2 & 3 \\
   3 & 1 & -5 \\

   -2 & 6 & -9
\end{bmatrix}

\begin{bmatrix}
x \\
y \\
z
\end{bmatrix}

=

\begin{bmatrix}
1 \\
-4 \\
2
\end{bmatrix}


$$

この式の行列を変形することで、方程式を解く事ができる。ここでは、その方法についてを記載する。

# 基本行列

次の３つの型の正方行列 $P_i (c)$、$P_{ij} (c)$、 $P_{ij}$ を**基本行列**という。

- $P_{i} (c)$：単位行列の第 i 行を c 倍(c≠0)した行列
- $P_{ij} (c)$：単位行列の第 i 行に第 j 行の c 倍を加えた行列
- $P_{ij}$：単位行列の第 i 行と第 j 行を入れ替えた行列

すなわち

$$

P_{i} (c) =

\begin{bmatrix}
1         & \quad  & \quad & \vdots & \quad & \quad & \quad \\
\quad & \ddots & \quad & \vdots & \quad & O       & \quad \\
\quad & \quad  & 1         & \vdots & \quad & \quad & \quad \\
\cdots & \cdots & \cdots & c       & \cdots & \cdots & \cdots \\
\quad & \quad  & \quad & \vdots & 1     & \quad & \quad \\
\quad & O      & \quad & \vdots & \quad & \ddots & \quad \\
\quad & \quad  & \quad & \vdots & \quad & \quad & 1       \\
\end{bmatrix} \quad


$$

(c は第 i 行、第 i 列)

$$

P_{ij} (c) =

\begin{bmatrix}
1         & \quad  & \quad & \quad  & \vdots & \quad & \quad \\
\quad & \ddots & \quad & \quad  & \vdots & O       & \quad \\
\cdots & \cdots & 1       & \cdots  & c        & \cdots & \cdots \\
\quad & \quad   & \quad & \ddots & \vdots & \quad & \quad \\
\quad & \quad   & \quad & \quad & 1          & \quad & \quad \\
\quad & O         & \quad & \quad & \vdots  & \ddots & \quad \\
\quad & \quad  & \quad & \quad & \vdots  & \quad & 1
\end{bmatrix} \quad


$$

(c は第 i 行、第 j 列)

$$

P_{ij} =

\begin{bmatrix}
1         & \quad  & \quad & \vdots  & \quad & \quad & \quad & \vdots & \quad & \quad & \quad \\
\quad & \ddots & \quad & \vdots  & \quad & \quad & \quad & \vdots & \quad & O       & \quad \\
\quad & \quad  & 1         & \vdots  & \quad & \quad & \quad & \vdots & \quad & \quad & \quad \\
\cdots & \cdots & \cdots & 0        & \cdots & \cdots & \cdots & 1       & \cdots & \cdots & \cdots \\
\quad & \quad  & \quad  & \vdots & 1        & \quad  & \quad & \vdots & \quad & \quad & \quad \\
\quad & \quad  & \quad  & \vdots & \quad & \ddots & \quad & \vdots & \quad & \quad & \quad \\
\quad & \quad  & \quad  & \vdots & \quad & \quad & 1         & \vdots & \quad & \quad & \quad \\
\cdots & \cdots & \cdots & 1        & \cdots & \cdots & \cdots & 0       & \cdots & \cdots & \cdots \\
\quad & \quad  & \quad & \vdots  & \quad & \quad & \quad & \vdots & 1        & \quad & \quad \\
\quad & O        & \quad & \vdots  & \quad & \quad & \quad & \vdots & \quad & \ddots & \quad \\
\quad & \quad  & \quad & \vdots  & \quad & \quad & \quad & \vdots & \quad & \quad & 1
\end{bmatrix} \quad


$$

となる。

## 基本行列との積

基本行列を行列 A の左から掛けてみると

- $P_{i} (c)A$：A の第 i 行を c 倍(c≠0)した行列
- $P_{ij} (c)A$：A の第 i 行に第 j 行の c 倍を加えた行列
- $P_{ij}A$：A の第 i 行と第 j 行を入れ替えた行列

となる。
