---
title: "行列式"
excerpt: ""
coverImage: ""
date: "2026-02-15T00:13:19.000Z"
updatedAt: "2026-02-15T00:13:19.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

ここでは行列式についてを記載する。

まずは、前提知識として順列を記載する。

# 順列

$n$ 個の文字 $1,2, \ldots , n$ を一列に並べたものを、

n 次の*順列*（permutation）という。

例えば $n=3$ のとき、すべての順列は

$$
(1,2,3),\quad (1,3,2),\quad (2,1,3),\quad (2,3,1),\quad (3,1,2),\quad (3,2,1)
$$

の $3! = 6$ 通りである。一般に $n$ 次の順列は全部で $n!$ 通り存在する。

## 転倒

順列 $(i_1, i_2, \ldots, i_n)$ において、$k < l$ であるにもかかわらず $i_k > i_l$​ となっている組 $(i_k, i_l)$ のことを、その順列の **転倒（inversion）** という。

つまり「左側にある数が右側にある数より大きい」という「順序の逆転」が起きているペアのことである。

例： 順列 $(3, 1, 2)$ における転倒を列挙する。

|                          |          |
| :----------------------- | :------- | -------- |
| 組 $(i_k, i_l)  (k < l)$ | 大小関係 | 転倒か？ |
| $(3, 1)$                 | $3 > 1$  | ✓        |
| $(3, 2)$                 | $3 > 2$  | ✓        |
| $(1, 2)$                 | $1 < 2$  | ✗        |

転倒は 2 個である。

## 転倒数

順列 $\sigma = (i_1, i_2, \ldots, i_n)$ における転倒の総数を、$\sigma$ の
転倒数（number of inversions）といい、$\text{inv}(\sigma)$
と書く。

$\text{inv}(\sigma) = \#\{(k, l) \mid k < l,\ i_k > i_l\}$

$n=3$ の全順列の転倒数：

|         |                   |        |
| :------ | :---------------- | :----- |
| 順列    | 転倒              | 転倒数 |
| (1,2,3) | なし              | 0      |
| (1,3,2) | (3,2)             | 1      |
| (2,1,3) | (2,1)             | 1      |
| (2,3,1) | (2,1),(3,1)       | 2      |
| (3,1,2) | (3,1),(3,2)       | 2      |
| (3,2,1) | (3,2),(3,1),(2,1) | 3      |

## 符号

転倒数の偶奇によって、順列を二種類に分類する。

定義： 順列 $\sigma$ の転倒数 $\text{inv}(\sigma)$ が偶数のとき $\sigma$ を
**偶置換**（even permutation）、奇数のとき **奇置換**（odd permutation）という。

また、順列の符号（sign）を

$\text{sgn}(\sigma) = (-1)^{\text{inv}(\sigma)}$

と定義する。偶置換なら $\text{sgn}(\sigma) = +1$、奇置換なら $\text{sgn}(\sigma) = -1$ となる。

# 行列式

n 次正方行列 $A = (a_{ij})$ に対して、一つの数値を対応させる関数を
**行列式（determinant）** といい、$\det A$ または $|A|$ と表す。

$n$ 次正方行列 $A = (a_{ij})$ の行列式は、
$n$ 次のすべての順列 $\sigma = (j_1, j_2, \ldots, j_n)$ を用いて次のように定義される。

$$
\det A = \sum_{\sigma \in S_n} \text{sgn}(\sigma)\, a_{1j_1} a_{2j_2} \cdots a_{nj_n}
$$

ここで、

- $S_n$ は $n$ 次の全順列の集合（$n!$ 個の要素を持つ）
- $\text{sgn}(\sigma) = (-1)^{\text{inv}(\sigma)}$ は順列 $\sigma$ の符号
- 各項は「各行から一つずつ、かつ各列から一つずつ」要素を選んだ積

**低次の場合の具体例**

- 2 次の行列式

$$
A = \begin{pmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{pmatrix}

2次の順列は
$(1,2)$ と $(2,1)$ の2通り。転倒数はそれぞれ 0 と 1 なので


$$

\det A = a*{11}a*{22} - a*{12}a*{21}

$$

- 3次の行列式


$$

A = \begin{pmatrix} a*{11} & a*{12} & a*{13} \\ a*{21} & a*{22} & a*{23} \\ a*{31} & a*{32} & a\_{33} \end{pmatrix}

$$

3次の順列は $3! = 6$ 通りあり、


$$

\begin{align}
\det A &= a*{11}a*{22}a*{33} + a*{12}a*{23}a*{31} + a*{13}a*{21}a*{32} \\
&\quad - a*{11}a*{23}a*{32} - a*{12}a*{21}a*{33} - a*{13}a*{22}a*{31}
\end{align}

$$

これは **サラスの公式** としても知られている。


# 行列式の基本性質

行列式は以下の重要な性質を持つ。

## 行（列）の線形性

行列 $A$ の第 $i$ 行を $\boldsymbol{a}_i$​ と書くとき、


$$

\det
\begin{pmatrix}
\boldsymbol{a}\_1 \\
\vdots \\
k\boldsymbol{a}\_i \\
\vdots \\
\boldsymbol{a}\_n
\end{pmatrix}
= k \det A

$$


$$

\det
\begin{pmatrix}
\boldsymbol{a}\_1 \\
\vdots \\
\boldsymbol{b} + \boldsymbol{c} \\
\vdots \\
\boldsymbol{a}\_n
\end{pmatrix}

=

\det
\begin{pmatrix}
\boldsymbol{a}\_1 \\
\vdots \\
\boldsymbol{b} \\
\vdots \\
\boldsymbol{a}\_n
\end{pmatrix}

-

\det
\begin{pmatrix}
\boldsymbol{a}\_1 \\
\vdots \\
\boldsymbol{c} \\
\vdots \\
\boldsymbol{a}\_n
\end{pmatrix}

$$


## 行（列）の交換

二つの行を入れ替えると、行列式の符号が反転する。


$$

\text{第 $i$ 行と第 $j$ 行を交換} \Longrightarrow \det A' = -\det A

$$


## 行（列）の基本変形

ある行に別の行の定数倍を加えても、行列式の値は変わらない。


$$

\text{第 $i$ 行に第 $j$ 行の $k$ 倍を加える} \Longrightarrow \det A' = \det A

$$


## 値が0になる行列式

- １つの行成分が全て0ならば、行列式の値は0である。すなわち


$$

\boldsymbol{a}\_i = \boldsymbol{0} \text{ならば} \det A = 0

$$

- ２つの行が等しいならば、行列式の値は０である。すなわち


$$

\boldsymbol{a}\_i = \boldsymbol{a}\_j (i \neq j) \text{ならば} \det A = 0

$$

- ２つの行が比例していれば、行列式の値は０である。すなわち


$$

\boldsymbol{a}\_j = c \boldsymbol{a}\_i (i \neq j) \text{ならば} \det A = 0

$$

## 次数を下げる公式１

$n$ 次正方行列 $A$ が次のような形をしているとする。


$$

A = \begin{pmatrix}
a*{11} & a*{12} & a*{13} & \cdots & a*{1n} \\
0 & a*{22} & a*{23} & \cdots & a*{2n} \\
0 & a*{32} & a*{33} & \cdots & a*{3n} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
0 & a*{n2} & a*{n3} & \cdots & a\_{nn}
\end{pmatrix}

$$

つまり、第1列の第2成分以降がすべて0であるとき、


$$

\det A = a*{11} \cdot \det \begin{pmatrix}
a*{22} & a*{23} & \cdots & a*{2n} \\
a*{32} & a*{33} & \cdots & a*{3n} \\
\vdots & \vdots & \ddots & \vdots \\
a*{n2} & a*{n3} & \cdots & a*{nn}
\end{pmatrix}

$$

​が成り立つ。つまり、$(1,1)$ 成分を係数として外に出し、残りの $(n-1)$ 次の小行列の行列式との積で表せる。


応用して、

### 単位行列


$$

\det I_n = 1

$$

### 対角行列


$$

\det
\begin{pmatrix} d_1 & 0 & \cdots & 0 \\
0 & d_2 & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & d_n
\end{pmatrix}
= d_1 d_2 \cdots d_n

$$

### 三角行列

上三角行列および下三角行列の行列式は、対角成分の積に等しい。


$$

\det
\begin{pmatrix}
a*{11} & * & \cdots & _ \\
0 & a_{22} & \cdots & \* \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & a*{nn}
\end{pmatrix}
= a*{11} a*{22} \cdots a*{nn}

$$


## 行列の積と行列式

$A, B$ を $n$ 次正方行列とするとき、


$$

\det(AB) = \det A \cdot \det B

$$

この性質は行列式の最も重要な性質の一つである。

特にA が正則（可逆）ならば


$$

\det A^{-1} = \frac{1}{\det A}

$$

である。


$$
