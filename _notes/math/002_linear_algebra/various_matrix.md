---
title: "さまざまな行列"
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

# 零行列

すべての成分が 0 である行列を零行列と呼び、$O$（アルファベットの大文字オー）で表す。

$$
O =

\begin{bmatrix}
0 &   \cdots & 0 \\
\vdots &  \quad & \vdots \\
0 &   \cdots & 0
\end{bmatrix} \quad
$$

- 型を明示したいときは $m×n$ 型の零行列と呼び、$O_{m×n}$ と書く。

- 成分がすべて 0 の行ベクトルおよび列ベクトルは零ベクトルと呼び、$\mathbf{o}$（アルファベット小文字のオーの太字）で表す。

$$

o =

\begin{bmatrix}
0 & 0 &   \cdots & 0
\end{bmatrix} \quad

または \quad

\begin{bmatrix}
0  \\
\vdots \\
0
\end{bmatrix} \quad


$$

# 単位行列

対角成分がすべて 1 で、それ以外が 0 の正方行列を**単位行列**と呼び、$I$ で表す。

$$

I =

\begin{bmatrix}
1 & 0 & \cdots & 0 \\
0 & 1 & \ddots & \vdots \\
\vdots & \ddots & \ddots & \vdots \\

0 &   \cdots & 0 & 1
\end{bmatrix} \quad

 (右辺は

\begin{bmatrix}
1 & \quad & O \\
\quad & \ddots & \quad \\
O & \quad & 1
\end{bmatrix} \quad

とも略記される)


$$

- 型を強調したいときは $n$ 次単位行列と呼び、$I_n$ と書く。
- 零行列と同様、単に $I$ と書かれていても次数が違えば別の単位行列になる。

# クロネッカーの記号

$$

\delta_{ij}

=

\left\{
\begin{array}{ll}
1 & (i = j) \\
0 & (i \neq j)
\end{array}
\right.


$$

で定義される記号 $\delta_{ij}$ を **クロネッカーのデルタ**と呼ぶ。

単位行列 $I$ は $(i,j)$ 成分が $\delta_{ij}$ である正方行列とみなせる。すなわち

$$
I = [  \delta_{ij} ]
$$

で表される。

# べき行列

非負整数 $k$ に対し、正方行列 $A$ の $k$ 乗（べき乗）を

$$

A^k

=

\left\{
\begin{array}{ll}
A \cdots A (Aがk個) & (k \geqq 1) \\
I & (k = 0)
\end{array}
\right.


$$

と定める。特に、ある自然数 $k$ で $A^k = O$ となる正方行列 $A$ を**べき零行列**、$A^2 = A$ を満たす正方行列 $A$ を**べき等行列**と呼ぶ。

# 転置行列

$m×n$ 行列 $A$ の行と列を入れ替えて得られる $n×m$ 行列を $A$ の**転置行列**と呼び、${}^t\! A$ で表す。すなわち、

$$

A=

\begin{bmatrix}
a_{11} & a_{12} & \cdots  & a_{1n} \\
a_{21} & a_{22} & \cdots  & a_{2n} \\

\vdots & \vdots &  \quad &  \vdots \\
a_{m1} & a_{m2} &   \cdots  & a_{mn}
\end{bmatrix} \quad

ならば、

{}^t\! A =

\begin{bmatrix}
a_{11} & a_{21} & \cdots  & a_{m1} \\
a_{12} & a_{22} & \cdots  & a_{m2} \\

\vdots & \vdots &  \quad &  \vdots \\
a_{1n} & a_{2n} &   \cdots  & a_{mn}
\end{bmatrix} \quad


$$

特に、${}^t\! A$ の $(i,j)$ 成分は $A$ の $(j,i)$ 成分に一致する。

## 転置行列の性質

転置行列では、以下の式が成り立つ。

1. ${}^t\! ({}^t\! A) = A$
2. ${}^t\! (A+B) = {}^t\! A + {}^t\! B$
3. ${}^t\! (kA) = k {}^t\! A$
4. ${}^t\! (AB) = {}^t\! B {}^t\! A$

[証明]

1〜3 は定義から直ちに従う。

4 について、$A=[a_{ij}]$、$B=[b_{ij}]$をそれぞれ $m×n$ 型、 $n×l$ 型の行列とする。

まず型を確認する。$AB$ は $m×l$ 型なので ${}^t\! (AB)$ は $l×m$ 型となる。

一方、${}^t\! B$、${}^t\! A$ はそれぞれ $l×n$、$n×m$ 型であることから、${}^t\! B {}^t\! A$ も $l×m$ 型となり、${}^t\! (AB)$ と同じ型になる。

また、対応する $(i,j)$ 成分が一致することは、次のとおり確認できる。

${}^t\! (AB)$の$(i,j)$成分

= $AB$ の$(j,i)$成分

= $a_{j1}b_{1i} + a_{j2}b_{2i} + \cdots + a_{jn}b_{ni}$

${}^t\! B {}^t\! A$の$(i,j)$成分

= ${}^t\! B {}$の第 $i$ 行と${}^t\! A {}$の第 $j$ 列の対応する成分同士の積和

= $B$ の第 $i$ 列と $A$ の第 $j$ 行の対応する成分同士の積和

= $b_{1i}a_{j1} + b_{2i}a_{j2} + \cdots + b_{ni}a_{jn}$

## 対称行列・交代行列

${}^t\! A  = A$ を満たす正方行列 $A$ を**対称行列**と呼び、

${}^t\! A  = - A$ を満たす正方行列 $A$ を**交代行列**と呼ぶ。

またすなわち、

$A$ が対称行列ならば任意の $i,j$ に対して $a_{ij} = a_{ji}$、

$A$ が交代行列ならば任意の $i,j$ に対して $a_{ij} + a_{ji} = 0$

# 三角行列

対角成分より下（または上）にある成分がすべて 0 になっている正方行列、すなわち

$$

\begin{bmatrix}
a_{11} & \cdots & a_{1n} \\
\quad & \ddots & \vdots \\
O &   \quad  & a_{nn}
\end{bmatrix} \quad

または

\begin{bmatrix}
a_{11} & \quad & O \\
\vdots & \ddots & \quad \\
a_{n1} & \cdots & a_{nn} \\
\end{bmatrix} \quad


$$

を上三角行列（または下三角行列）と呼ぶ。

# 逆行列

正方行列 $A$ に対し

$$

AX = I \quad かつ \quad XA = I


$$

を満たす正方行列 $X$ が存在するとき、

$X$ を $A$ の逆行列と呼び、$A^{-1}$ で表す。（A インバースと読む。）

またこの時、 $A$ を**正則行列**（または単に正則である）という。

- 正方行列 $A$ に対して逆行列 $A^{-1}$ が常に存在するとは限らず、存在するとしても 1 つに限る。実際、$X$ のほかに正方行列 $Y$ も $AY=I$ かつ $YA=I$ を満たすと仮定すると、$Y=IY=(XA)Y=X(AY)=XI=X$ となり $X$ に一致する。

## 逆行列の性質

$A,B$ が正則行列ならば、$A^{-1},AB,{}^t\! A$はいずれも正則で

$$

\begin{aligned}
 1.&\quad (A^{-1})^{-1} = A \\
 2.&\quad (AB)^{-1} = B^{-1} A^{-1} \\
 3.&\quad ({}^t\! A)^{-1} = {}^t\! (A^{-1})
\end{aligned}


$$

[証明]

(1)

$A$ は正則なので、逆行列$A^{-1}$が存在し、$AA^{-1} = A^{-1}A = I$が成り立つ。

この式で $A$ を $X$ に置き換えると

$$

XA^{-1} = A^{-1}X = I


$$

よって$A^{-1}$は正則、$X=A$が$A^{-1}$の逆行列$(A^{-1})^{-1}$である。

(2)

$B^{-1}A^{-1}$と$AB$との積を計算すると

$$

(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AIA^{-1} = AA^{-1} = I \\

(B^{-1}A^{-1})(AB) = B^{-1}(A^{-1} A)B = B^{-1} IB = B^{-1} B = I


$$

よって、$AB$ は正則であり、$(AB)^{-1} = B^{-1} A^{-1}$である。

(3)

$AA^{-1} = A^{-1}A = I$の転置をとると

$$

{}^t\! (A^{-1}) {}^t\! A = {}^t\! A {}^t\! (A^{-1}) = I


$$

よって、${}^t\! A$は正則であり、$({}^t\! A)^{-1} = {}^t\! (A^{-1})$である。

# 行列の分割

行列 $A$ を縦横に区切り、4 つのブロックに分けることを考える。

各ブロックを行列とみなして、

$$

A =

\left[
\begin{array}{c:c}
A_{11} &  A_{12} \\ \hdashline
A_{21} & A_{22}
\end{array} \quad
\right]


$$

と表す。このように縦横に区切って行列 $A$ を複数のブロックに分けることを $A$ の**分割**と呼ぶ。

また、分割に現れる各ブロックの行列 $A_{11},A_{12},A_{21},A_{22}$ を $A$ の**小行列**という。

## ベクトルの分割

$A=[a_{ij}]$を $m×n$ 行列とする。$A$ の各列ベクトルを

$$

\mathbf{a}_1 =

\begin{bmatrix}
a_{11}  \\
a_{21}  \\
\vdots \\
a_{m1}
\end{bmatrix}
,
\quad

\mathbf{a}_2 =

\begin{bmatrix}
a_{12}  \\
a_{22}  \\
\vdots \\
a_{m2}
\end{bmatrix}
,

\quad

\cdots
,
\quad

\mathbf{a}_n =

\begin{bmatrix}
a_{1n}  \\
a_{2n}  \\
\vdots \\
a_{mn}
\end{bmatrix}

\quad


$$

とおく時、$A$ の分割

$$

A=[\mathbf{a}_1,\mathbf{a}_2, \cdots , \mathbf{a}_n]


$$

を $A$ の列ベクトル分割という。

同様に、$A$ の行ベクトルをそれぞれ

$$

\mathbf{a’}_1 =

\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n}
\end{bmatrix}

,
\\

\mathbf{a’}_2 =

\begin{bmatrix}
a_{21} & a_{22} & \cdots & a_{2n}
\end{bmatrix}

,
\\
\vdots
\\
\mathbf{a’}_m =

\begin{bmatrix}
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
\\


$$

とおくとき、$A$ の分割

$$

A =

\begin{bmatrix}
\mathbf{a’}_{1}  \\
\mathbf{a’}_{2}  \\
\vdots \\
\mathbf{a’}_{m}
\end{bmatrix} \quad


$$

を $A$ の行ベクトル分割という。

特に単位行列において、

$$

e_1 =

\begin{bmatrix}
1  \\
0  \\
0  \\
\vdots \\
0
\end{bmatrix} \quad

,

e_2 =

\begin{bmatrix}
0  \\
1  \\
0  \\
\vdots \\
0
\end{bmatrix} \quad

,

\cdots

e_n =

\begin{bmatrix}
0  \\
0  \\
0  \\
\vdots \\
1
\end{bmatrix} \quad

,


$$

とおく。このとき各$e_i$を**n 次基本ベクトル**という。

このとき

$$

I = [e_1,e_2, \cdots, e_n]


$$

は単位行列 $I$ の列ベクトル分割になる。
