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

## 基本行列の正則性

全ての基本行列は正則行列で、その逆行列もまた同じ型の基本行列である。すなわち

- $P_{i}(c)^{-1} = P_{i} ( \frac{1}{c} )$
- $P_{ij}(c)^{-1} = P_{ij}(-c)$
- $P_{ij}^{-1} = P_{ij}$

である。

# 行基本変形

行列の行に関する次の３つの操作を**行基本変形**という。

- 第 i 行を c 倍する（c≠0）
- 第 i 行に第 j 行の c 倍を加える
- 第 i 行と第 j 行を入れ替える

この行基本変形は、行列 $A$ に対して基本行列$P_{i}(c),P_{ij}(c),P_{ij}$を、それぞれ $A$ の左からかけることと同等である。

すなわち「行基本変形 ⇔ 基本行列 × $A$」である。

# 階段行列

$m×n$型の階段行列とは、次の３条件を満たす行列のことを言う。

- ある$k$（$1 \leqq k \leqq m$）に対して、第１行から第$k$行まではどれも零ベクトルでなく、残りの$m-k$個の行は全て零ベクトルである。
- 第$i$行（$1 \leqq i \leqq k$）の成分を左から順に見て、0 でない最初の数は 1 である。また、この１が第$i$行の$q_i$番目にあったとすると

$$

q_1 < q_2 < \cdots < q_k


$$

- 第 $q_i$ 列（1≦i≦k）は m 次基本ベクトル $\mathbf{e_i}$である。

例としては以下のような行列である。

$$

\begin{bmatrix}
0 & 1 & * & 0 & * & * & 0 & * \\

0 & 0 & 0 & 1 & * & * & 0 & * \\
0 & 0 & 0 & 0 & 0 & 0 & 1 & * \\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0
\end{bmatrix} \quad


$$

これは 5×8 階段行列で、$k=3,q_1 = 2,q_2 = 4,q_3 = 7$である。ここで、\*はどんな数でも良い。
