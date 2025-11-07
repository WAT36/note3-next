---
title: "さまざまな行列"
excerpt: ""
coverImage: ""
date: "2025-11-02T22:53:41.000Z"
updatedAt: "2025-11-02T22:53:41.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

# 零行列

成分が全て０である行列を零行列といい、$O$（アルファベットの大文字オー）で表す。

$$
O =

\begin{bmatrix}
0 &   \cdots & 0 \\
\vdots &  \quad & \vdots \\
0 &   \cdots & 0
\end{bmatrix} \quad
$$

- 零行列の型を記載したいときは、m×n 型の零行列といい、$O_{m×n}$と書く。

- 成分が全て０である行ベクトルおよび列ベクトルは零ベクトルといい、$o$（アルファベット小文字のオーの太字）で表す。

$$

o =

\begin{bmatrix}
0 & 0 &   \cdots & 0
\end{bmatrix} \quad

または

\begin{bmatrix}
0  \\
\vdots \\
0
\end{bmatrix} \quad


$$

# 単位行列

正方行列で、対角成分が全て１で、他の成分が全て０である行列を**単位行列**といい、I で表す。

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

- 型を強調したいときは、n 次単位行列といい、$I_n$と書く。
- 零行列と同様、単に I と表されている時、次数が違えば異なる単位行列である。

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

で定義される記号 $ \delta\_{ij} $ を **クロネッカーのデルタ**という。

単位行列 I は、(i,j)成分が $ \delta\_{ij} $ の正方行列と言える。すなわち

$$
I = [  \delta_{ij} ]
$$

# べき行列

k を非負整数とし、正方行列 A に対して、A の k 乗（またはべき乗）を

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

と定める。特に、ある自然数 k に対して、$A^k = O$となる正方行列 A を**べき零行列**、$A^2 = A$を満たす正方行列 A を**べき等行列**という。

# 転置行列

m×n 行列 A の行と列をそっくり入れ替えてできる n×m を A の転置行列といい、${}^t\! A$で表す。すなわち、

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

特に、${}^t\! A$の$(i,j)$成分 = $A$の$(j,i)$成分である。

## 転置行列の性質

転置行列では、以下の式が成り立つ。

1. ${}^t\! ({}^t\! A) = A$
2. ${}^t\! (A+B) = {}^t\! A + {}^t\! B$
3. ${}^t\! (kA) = k {}^t\! A$
4. ${}^t\! (AB) = {}^t\! B {}^t\! A

[証明]

1,2,3,は定義から直ちに導ける。

4.について、$A=[a_{ij}]$、$B=[b_{ij}]$をそれぞれ m×n 型、n×l 型の行列とする。

まず、型が同じことを見る。$AB$は m×l 型であるから、${}^t\! (AB)$は l×m 型である。

一方、${}^t\! B {}^t\! A$はそれぞれ l×n、n×m 型であることから、${}^t\! B {}^t\! A$は l×m 型となる。よって、${}^t\! (AB)$、${}^t\! B {}^t\! A$は同じ型である。

また、対応する(i,j)成分同士が等しいことは、以下で示せる。

${}^t\! (AB)$の(i,j)成分

= AB の(j,i)成分

= $a*{j1} b*{1i} + a*{j2} b*{2i} + \cdots + a*{jn} b*{ni} $

${}^t\! B {}^t\! A$の(i,j)成分

= ${}^t\! B {}$の第 i 行と${}^t\! A {}$の第 j 列の対応する成分同士の積和

= B の第 i 列と A の第 j 行の対応する成分同士の積和

= $b*{1i} a*{j1} + b*{2i} a*{j2} + \cdots + b*{ni} a*{jn} $
