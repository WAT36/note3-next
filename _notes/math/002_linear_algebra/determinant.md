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

n 次の **順列**（permutation）という。

例えば $n=3$ のとき、すべての順列は

$$
(1,2,3),\quad (1,3,2),\quad (2,1,3),\quad (2,3,1),\quad (3,1,2),\quad (3,2,1)
$$

の $3! = 6$ 通りである。一般に $n$ 次の順列は全部で $n!$ 通り存在する。

## 転倒

順列 $(i_1, i_2, \ldots, i_n)$ において、$k < l$ であるにもかかわらず $i_k > i_l$​ となっている組 $(i_k, i_l)$ のことを、その順列の **転倒（inversion）** という。

つまり「左側にある数が右側にある数より大きい」という「順序の逆転」が起きているペアのことである。

例： 順列 $(3, 1, 2)$ における転倒を列挙する。

| 組 $(i_k, i_l)  (k < l)$ | 大小関係 | 転倒か？ |
| :----------------------- | :------- | -------- |
| $(3, 1)$                 | $3 > 1$  | ✓        |
| $(3, 2)$                 | $3 > 2$  | ✓        |
| $(1, 2)$                 | $1 < 2$  | ✗        |

転倒は 2 個である。

## 転倒数

順列 $\sigma = (i_1, i_2, \ldots, i_n)$ における転倒の総数を、$\sigma$ の **転倒数**（number of inversions）といい、$\text{inv}(\sigma)$ と書く。

$\text{inv}(\sigma) = \#\{(k, l) \mid k < l,\ i_k > i_l\}$

$n=3$ の全順列の転倒数：

| 順列    | 転倒              | 転倒数 |
| :------ | :---------------- | :----- |
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
A =
\begin{pmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{pmatrix}
$$

2 次の順列は
$(1,2)$ と $(2,1)$ の 2 通り。転倒数はそれぞれ 0 と 1 なので

$$
\det A = a_{11} a_{22} - a_{12} a_{21}
$$

- 3 次の行列式

$$
A =
\begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{pmatrix}
$$

3 次の順列は $3! = 6$ 通りあり、

$$

\begin{align}
\det A &= a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32} \\
&\quad - a_{11}a_{23}a_{32} - a_{12}a_{21}a_{33} - a_{13}a_{22}a_{31}
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
\boldsymbol{a}_1 \\
\vdots \\
k\boldsymbol{a}_i \\
\vdots \\
\boldsymbol{a}_n
\end{pmatrix}
= k \det A


$$

$$

\det
\begin{pmatrix}
\boldsymbol{a}_1 \\
\vdots \\
\boldsymbol{b} + \boldsymbol{c} \\
\vdots \\
\boldsymbol{a}_n
\end{pmatrix}

=

\det
\begin{pmatrix}
\boldsymbol{a}_1 \\
\vdots \\
\boldsymbol{b} \\
\vdots \\
\boldsymbol{a}_n
\end{pmatrix}

-

\det
\begin{pmatrix}
\boldsymbol{a}_1 \\
\vdots \\
\boldsymbol{c} \\
\vdots \\
\boldsymbol{a}_n
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

## 値が 0 になる行列式

- １つの行成分が全て 0 ならば、行列式の値は 0 である。すなわち

$$

\boldsymbol{a}_i = \boldsymbol{0} \text{ならば} \det A = 0


$$

- ２つの行が等しいならば、行列式の値は０である。すなわち

$$

\boldsymbol{a}_i = \boldsymbol{a}_j (i \neq j) \text{ならば} \det A = 0


$$

- ２つの行が比例していれば、行列式の値は０である。すなわち

$$

\boldsymbol{a}_j = c \boldsymbol{a}_i (i \neq j) \text{ならば} \det A = 0


$$

## 次数を下げる公式１

$n$ 次正方行列 $A$ が次のような形をしているとする。

$$

A = \begin{pmatrix}
a_{11} & a_{12} & a_{13} & \cdots & a_{1n} \\
0 & a_{22} & a_{23} & \cdots & a_{2n} \\
0 & a_{32} & a_{33} & \cdots & a_{3n} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
0 & a_{n2} & a_{n3} & \cdots & a_{nn}
\end{pmatrix}


$$

つまり、第 1 列の第 2 成分以降がすべて 0 であるとき、

$$

\det A = a_{11} \cdot \det \begin{pmatrix}
a_{22} & a_{23} & \cdots & a_{2n} \\
a_{32} & a_{33} & \cdots & a_{3n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{n2} & a_{n3} & \cdots & a_{nn}
\end{pmatrix}


$$

​ が成り立つ。つまり、$(1,1)$ 成分を係数として外に出し、残りの $(n-1)$ 次の小行列の行列式との積で表せる。

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
a_{11} & * & \cdots & * \\
0 & a_{22} & \cdots & * \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & a_{nn}
\end{pmatrix}
= a_{11} a_{22} \cdots a_{nn}


$$

## 行列の積と行列式

$A, B$ を $n$ 次正方行列とするとき、

$$

\det(AB) = \det A \cdot \det B


$$

この性質は行列式の最も重要な性質の一つである。

特に A が正則（可逆）ならば

$$

\det A^{-1} = \frac{1}{\det A}


$$

である。

## 転置と行列式

$$

\det A^T = \det A


$$

行列を転置しても行列式の値は変わらない。したがって「行について成り立つ性質は列についても成り立つ」。

## 行（列）の線形性

行列 $A$ の第 $i$ 行を $\boldsymbol{a}_i$​ と書くとき、

$$

\det
\begin{pmatrix}
\boldsymbol{a}_1 \\
\vdots \\
k\boldsymbol{a}_i \\
\vdots \\
\boldsymbol{a}_n
\end{pmatrix}
= k \det A


$$

$$

\det
\begin{pmatrix}
\boldsymbol{a}_1 \\
\vdots \\
\boldsymbol{b} + \boldsymbol{c} \\
\vdots \\
\boldsymbol{a}_n
\end{pmatrix}
=
\det
\begin{pmatrix}
\boldsymbol{a}_1 \\
\vdots \\
\boldsymbol{b} \\
\vdots \\
\boldsymbol{a}_n
\end{pmatrix}

- \det
  \begin{pmatrix}
  \boldsymbol{a}_1 \\
  \vdots \\
  \boldsymbol{c} \\
  \vdots \\
  \boldsymbol{a}_n
  \end{pmatrix}
$$

## 行列式の展開

行列式は任意の行（または列）に沿って展開することができる。

### 小行列と余因子

行列 $A$ の第 $i$ 行、第 $j$ 列を取り除いた $(n-1)$ 次の小行列を $A_{ij}$​ とする。このとき、

$$
\tilde{a}_{ij} = (-1)^{i+j} \det A_{ij}​
$$

を $(i,j)$ 余因子（cofactor）という。

### 余因子展開

第 $i$ 行に沿った展開

$$
\det A = \sum_{j=1}^n a_{ij} \tilde{a}_{ij} = a_{i1}\tilde{a}_{i1} + a_{i2}\tilde{a}_{i2} + \cdots + a_{in}\tilde{a}_{in}
$$

第 $j$ 列に沿った展開

$$
\det A = \sum_{i=1}^n a_{ij} \tilde{a}_{ij} = a_{1j}\tilde{a}_{1j} + a_{2j}\tilde{a}_{2j} + \cdots + a_{nj}\tilde{a}_{nj}
$$

例： 3 次行列の第 1 行に沿った展開

$$
\det A = a_{11}
\begin{vmatrix}
a_{22} & a_{23} \\
a_{32} & a_{33}
\end{vmatrix}
- a_{12}
\begin{vmatrix}
a_{21} & a_{23} \\
a_{31} & a_{33}
\end{vmatrix}
+ a_{13}
\begin{vmatrix}
a_{21} & a_{22} \\
a_{31} & a_{32}
\end{vmatrix}
$$

## 余因子の性質

$i \neq k$ のとき、

$$
\sum_{j=1}^n a_{ij} \tilde{a}_{kj} = 0
$$

また、$j \neq l$ のとき、

$$
\sum_{i=1}^n a_{ij} \tilde{a}_{il} = 0
$$

## 余因子行列

$n$ 次正方行列 $A = (a_{ij})$ の余因子 $\tilde{a}_{ij}$​ を $(j, i)$ 成分（注意：転置されている）とする行列を $A$ の
余因子行列（cofactor matrix）または余因子転置行列といい、$\tilde{A}$ と表す。

$$
\tilde{A} =
\begin{pmatrix}
\tilde{a}_{11} & \tilde{a}_{21} & \cdots & \tilde{a}_{n1} \\
\tilde{a}_{12} & \tilde{a}_{22} & \cdots & \tilde{a}_{n2} \\
\vdots & \vdots & \ddots & \vdots \\
\tilde{a}_{1n} & \tilde{a}_{2n} & \cdots & \tilde{a}_{nn}
\end{pmatrix}
$$

つまり、$\tilde{A}$ の $(i,j)$ 成分は $\tilde{a}_{ji}$​ である。

## 余因子行列の基本性質

定理：

$$
\tilde{A} = \tilde{A} A = (\det A) I_n
$$

ここで $I_n$​ は $n$ 次単位行列である。

証明： $A\tilde{A}$ の $(i,k)$ 成分を計算する。

$$
(A\tilde{A})_{ik} = \sum_{j=1}^n a_{ij} (\tilde{A})_{jk} = \sum_{j=1}^n a_{ij} \tilde{a}_{kj}
$$

余因子の性質より、これは $\delta_{ik} \det A$ に等しい。したがって、

$$
A\tilde{A} = \begin{pmatrix}
\det A & 0 & \cdots & 0 \\
0 & \det A & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & \det A
\end{pmatrix} = (\det A) I_n
$$

$\tilde{A} A = (\det A) I_n$​ も同様に示される。

## 逆転公式

上記の公式から、$\frac{1}{\det A} A^{-1}$ を乗ずることで、以下の公式が導ける。

$$
A^{-1} = \frac{1}{\det A} \tilde{A}
$$

これを余因子による逆転公式という。

## クラメルの公式

余因子を用いて、連立一次方程式 $A\boldsymbol{x} = \boldsymbol{b}$ の解を明示的に表すことができる。

$ \det A \neq 0 $ のとき、解は

$$
x_i = \frac{\det A_i}{\det A}
$$

ここで、$A_i$​ は $A$ の第 $i$ 列を $\boldsymbol{b}$ で置き換えた行列である。

これは余因子展開を用いて証明される。

# 行列式の図形的意味

## 2 次元の場合：平行四辺形の面積

2 次元平面上の 2 つのベクトル

$$
\boldsymbol{a} = \begin{pmatrix} a_1 \\ a_2 \end{pmatrix}, \quad \boldsymbol{b} = \begin{pmatrix} b_1 \\ b_2 \end{pmatrix}
$$

を列ベクトルとする行列

$$
A = \begin{pmatrix} a_1 & b_1 \\ a_2 & b_2 \end{pmatrix}
$$

を考える。このとき、

$$
\det A = a_1 b_2 - a_2 b_1
$$

の絶対値 $|\det A|$ は、ベクトル $\boldsymbol{a}$ と $\boldsymbol{b}$ が張る平行四辺形の面積に等しい。

(具体例)

$$
\boldsymbol{a} = \begin{pmatrix} 3 \\ 1 \end{pmatrix}, \quad \boldsymbol{b} = \begin{pmatrix} 1 \\ 2 \end{pmatrix}
$$

のとき、

$$
\det A = 3 \cdot 2 - 1 \cdot 1 = 5
$$

したがって、これらのベクトルが張る平行四辺形の面積は 5 である。

### 符号の意味

行列式の符号は、ベクトルの向きを表す：

$\det A > 0$ ： $\boldsymbol{a}$ から $\boldsymbol{b}$ への回転が反時計回り（右手系、正の向き）

$\det A < 0$ ： $\boldsymbol{a}$ から $\boldsymbol{b}$ への回転が時計回り（左手系、負の向き）

$\det A = 0$ ： 2 つのベクトルが平行（同一直線上にある）、面積は 0

したがって、行列式は「符号付き面積」を表すと言える。

## 線形変換

$n$ 次正方行列 $A$ は、$n$ 次元空間の線形変換

$$
\boldsymbol{x} \mapsto A\boldsymbol{x}
$$

を定める。このとき、任意の図形の体積は $|\det A|$ 倍になる。

定理： 領域 $D$ を線形変換 $A$ で写した像を $A(D)$ とすると、

$$
\text{Vol}(A(D)) = |\det A| \cdot \text{Vol}(D)
$$

ここで $\text{Vol}$ は体積（$n$ 次元測度）を表す。

具体例：2 次元の拡大・縮小

$$
A = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}
$$

は、$x$ 方向に 2 倍、$y$ 方向に 3 倍に拡大する変換である。

$$
\det A = 2 \cdot 3 = 6
$$

したがって、任意の図形の面積は 6 倍になる。

## 3 次元の場合：平行六面体の体積

3 次元空間の 3 つのベクトル

$$
\boldsymbol{a} =
\begin{pmatrix}
a_1 \\
a_2 \\
a_3
\end{pmatrix},
\quad
\boldsymbol{b} =
\begin{pmatrix}
b_1 \\
b_2 \\
b_3
\end{pmatrix},
\quad
\boldsymbol{c} =
\begin{pmatrix}
c_1 \\
c_2 \\
c_3
\end{pmatrix}
$$

を列ベクトルとする行列

$$
A =
\begin{pmatrix}
a_1 & b_1 & c_1 \\
a_2 & b_2 & c_2 \\
a_3 & b_3 & c_3
\end{pmatrix}
$$

の行列式の絶対値 $|\det A|$ は、これら 3 つのベクトルが張る平行六面体の体積に等しい。

### スカラー三重積との関係

ベクトルの外積とスカラー積を用いて、

$$
\det A = \boldsymbol{a} \cdot (\boldsymbol{b} \times \boldsymbol{c})
$$

と表すこともできる。これはスカラー三重積（scalar triple product）と呼ばれる。

### 符号の意味

3 次元でも符号は向きを表す。

$\det A > 0$：3 つのベクトルが右手系をなす

$\det A < 0$：3 つのベクトルが左手系をなす

$\det A = 0$：3 つのベクトルが同一平面上にある（一次従属）、体積は $0$
