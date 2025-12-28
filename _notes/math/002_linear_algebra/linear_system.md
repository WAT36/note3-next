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

# 同次連立 1 次方程式

連立 1 次方程式 $$A \mathbf{x} = \mathbf{b} $$において、定数項ベクトル$\mathbf{b}$ が$\mathbf{o}$の場合、すなわち、方程式

$$

A \mathbf{x} = \mathbf{o}


$$

を**同次連立 1 次方程式**という。

一般に、未知数 n 個の同次連立 1 次方程式$A \mathbf{x} = \mathbf{o}$において、

- $A \mathbf{x} = \mathbf{o}$は常に自明な解$\mathbf{x} = \mathbf{o}$を持つ。
- $A \mathbf{x} = \mathbf{o}$が自明な解$\mathbf{x} = \mathbf{o}$のみを持つための必要十分条件は

$$

rank A = n


$$

- $A \mathbf{x} = \mathbf{o}$が無数な解を持つための必要十分条件は

$$

rank A <  n


$$

さらに、このとき解の自由度は$n-rankA$である。

## 一般解と基本解

同次連立 1 次方程式 $A \mathbf{x} = \mathbf{o}$ は常に自明な解 $x=\mathbf{o}$ を持つが、$rank(A)<n$ のとき、自明でない解が存在し、解は無数に存在する。

ここで例として、例えば、

$$

\begin{cases}
x_1 + 2x_2 + 3x_3 = 0 \\
2x_1 + 4x_2 + 6x_3 = 0
\end{cases}


$$

このような方程式では、少なくとも**自明な解** (x_1, x_2, x_3) = (0, 0, 0)は常に解になるが、多くの場合自明な解以外の解も存在する。

この例だと、実は第 2 式は第 1 式の 2 倍なので、

$$

x_1 + 2x_2 + 3x_3 = 0


$$

この方程式を満たす $(x_1, x_2, x_3)$の組は無数にある。例えば、

$$

- (x_1, x_2, x_3) = (-2, 1, 0)
- (x_1, x_2, x_3) = (-3, 0, 1)
- (x_1, x_2, x_3) = (-4, 2, 0)
- (x_1, x_2, x_3) = (-5, 1, 1)


$$

など、いくらでも見つけられる。

ここで、係数行列を階段行列に変形する。

$$

A = \begin{pmatrix}
1 & 2 & 3 \\
2 & 4 & 6
\end{pmatrix}
\rightarrow
\begin{pmatrix}
1 & 2 & 3 \\
0 & 0 & 0
\end{pmatrix}


$$

階段行列を見ると、ゼロでない行は 1 個です。これは $rank(A)=1$ を意味する。

階段行列の各行の最初のゼロでない成分（主成分）は、第 1 行では $x_1$ の係数になる。したがって

- **主変数**: $x_1$（方程式によって値が決まる変数）
- **自由変数**: $x_2,x_3$（自由に値を選べる変数）

解の自由度: $3−1=2$（自由変数の個数）

となる。

自由変数 $x_2, x_3$には、どんな値を代入しても構いません。それに応じて、主変数 $x_1$の値が方程式から決まる。

階段行列から得られる方程式は、

$x_1 + 2x_2 + 3x_3 = 0$

これを $x_1$について解くと、

$x_1 = -2 x_2 - 3 x_3$

つまり、$x_2, x_3$ の値を決めれば、自動的に $x_1$の値が決まる。

自由変数を文字（パラメータ）で表す。

$x_2 = c_1, \quad x_3 = c_2 \quad \text{(}c_1, c_2 \text{ は任意の実数)}$

すると、

x_1 = -2c_1 - 3c_2

したがって、解は

$$

\begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} -2c_1 - 3c_2 \\ c_1 \\ c_2 \end{pmatrix}


$$

$$

\begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = c_1\begin{pmatrix} -2 \\ 1 \\ 0 \end{pmatrix} + c_2\begin{pmatrix} -3 \\ 0 \\ 1 \end{pmatrix}


$$

となる。

このような、同次連立 1 次方程式において、すべての解を表現する形を**一般解**という。

また、上記の一般解で現れた 2 つのベクトル

$$

\boldsymbol{x}_1 = \begin{pmatrix} -2 \\ 1 \\ 0 \end{pmatrix}, \quad
\boldsymbol{x}_2 = \begin{pmatrix} -3 \\ 0 \\ 1 \end{pmatrix}


$$

を**基本解**という。

基本解は「解の部品」のようなもので、すべての解は、これらの基本解を組み合わせて（一次結合して）作ることができる。

基本解の持つ重要な性質は次の３点である。（$s=n-rankA$とおく）

- $c_1 \mathbf{x_1} + c_2 \mathbf{x_2} + \cdots + c_s \mathbf{x_s}$ ならば、 $c_1 = c_2 = \cdots = c_s = 0$ である。
- $A \mathbf{x} = \mathbf{o}$の任意の解 $\mathbf{x}$ は、適当な数 $c_1,c_2, \cdots , c_s$を選んで以下のように表される。

$$

\mathbf{x} = c_1 \mathbf{x_1} + c_2 \mathbf{x_2} + \cdots + c_s \mathbf{x_s}


$$

- $A \mathbf{x} = \mathbf{o}$ の基本解の個数は解の自由度に等しい。

同次連立 1 次方程式 $A \mathbf{x} = \mathbf{o}$ の解全体の集合を $A \mathbf{x} = \mathbf{o}$ の**解空間**といい、基本解の集合 ${ \mathbf{x_1} + \mathbf{x_2} + \cdots + \mathbf{x_s} }$ を解空間の**基底**という。
