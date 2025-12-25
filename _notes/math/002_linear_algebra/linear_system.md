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

## 変形定理

ここで、以下の定理がある。

> 任意の行列 $A$ は、適当な行基本変形を何回か行うことにより、必ず階段行列 $B$ に変形できる。特に、（一連の行基本変形に対応する基本行列の積の形をした）正則行列 $P$ が存在して
>
> $$
> B=PA
> $$
>
> と表せる。

[証明略]

## 行列の階数

階段行列における零ベクトルでない行の数（すなわち階段行列の段の数）$k$ は、変形の仕方に関係しない定数である。

この定数 $k$ を行列 $A$ の階数といい、$\mathrm{rank}A$で表す。零行列の階数は０となる。

# 連立１次方程式の解法

## 係数行列

連立１次方程式

$$

\begin{equation}
\left\{ \,
\begin{aligned}
& a_{11} x_1 & + a_{12} x_2 & + \cdots & + a_{1n} x_n & = b_1 \\
& a_{21} x_1 & + a_{22} x_2 & + \cdots & + a_{2n} x_n & = b_2 \\

&                   &                       &  \cdots \cdots &              & \\
& a_{m1} x_1 & + a_{m2} x_2 & + \cdots & + a_{mn} x_n & = b_m \\
\end{aligned}
\right.
\end{equation}


$$

の解法についてを考える。

ここで係数、未知数および右辺の定数が作る行列をそれぞれ

$$

A =

\begin{bmatrix}
a_{11}  & a_{12}  & \cdots & a_{1n} \\
a_{21}  & a_{22}  & \cdots & a_{2n} \\
\vdots & \vdots & \quad & \vdots \\
a_{m1}  & a_{m2}  & \cdots & a_{mn}
\end{bmatrix} \quad

\mathbf{x} =

\begin{bmatrix}
x_{1}  \\
x_{2}  \\
\vdots \\
x_{n}
\end{bmatrix} \quad

\mathbf{b} =

\begin{bmatrix}
b_{1}  \\
b_{2}  \\
\vdots \\
b_{m}
\end{bmatrix} \quad


$$

とおくと、上記の連立１次方程式は以下のように表せる。

$$

A \mathbf{x} = \mathbf{b}
$$

この$m×n$行列$A$を連立１次方程式の**係数行列**といい、$A$に右辺のベクトル b を付け加えた$m×(n+1)$行列

$$

[A,\mathbf{b}] =

\begin{bmatrix}
a_{11}  & a_{12}  & \cdots & a_{1n} & b_{1} \\
a_{21}  & a_{22}  & \cdots & a_{2n} & b_{2} \\
\vdots & \vdots & \quad & \vdots & \vdots \\
a_{m1}  & a_{m2}  & \cdots & a_{mn} & b_{m}
\end{bmatrix} \quad


$$

を連立１次方程式の**拡大係数行列**という。

また、未知数の作る$n$次ベクトル$x$を未知数ベクトル、右辺の作る$m$次ベクトル$b$を定数項ベクトルという。

## 解の存在条件

連立１次方程式は、もしその係数行列が行基本変形によって単位行列に変形されるならば、ただ１組の解を持つ。

しかし、一般には不定や不能の場合もあり、係数行列が単位行列まで変形できるとは限らない。

では、どんな行列にまで変形すれば解が見通せるようになるだろうか。

その答えとして考案されたのが先ほどの階段行列である。

先ほどの変形定理より、行基本変形によって拡大係数行列を階段行列に変形することができる。

拡大係数行列 $[A,\mathbf{b}]$ を階段行列に変形したとき、係数行列部分 $A$ の階段行列における**ゼロでない行の個数**が $rank(A)$ を表す。

階段行列に変形した後の形を観察することで、解の存在条件を判定できる。

拡大係数行列 $[A,\mathbf{b}]$ を階段行列に変形したとき、

**(1) 解が存在しない場合**

階段行列の中に

$$

(0 \ 0 \ \cdots \ 0 \ | \ c) \quad (c \neq 0)


$$

の形の行が現れる。

これは「 $0=c$ 」( $c \neq 0$) という矛盾した式を意味するため、解は存在しない。このとき、$rank(A)<rank([A,\mathbf{b}])$ となる。

**(2) 解が存在する場合**

階段行列に上記のような矛盾した行が現れない。すなわち、すべてのゼロ行は拡大部分も 0 である。このとき、$rank(A)=rank([A,\mathbf{b}])$ となっています。

これより、次の解の存在条件が得られる。

連立 1 次方程式 $Ax = \mathbf{b}$ が解を保つための必要十分条件は

$$

rank(A)=rank([A,\mathbf{b}])


$$

が成り立つことである。

## 解の自由度

上記の解の存在条件で、解が存在する場合、次のように分類される。

- **解が一意に定まる**: $rank(A)=n$ (未知数の個数に等しい)
  すべての変数が主変数となり、自由度がありません。
- **解が無数に存在する**: $rank(A)<n$、$n−rank(A)$ 個の自由変数が存在し、それらに任意の値を与えることで無数の解が得られる。

ここで解が無数に存在する場合の、

$$

n−rank(A)


$$

を**解の自由度**という。自由度とは、任意に値を選べる変数(自由変数)の個数を表す。
