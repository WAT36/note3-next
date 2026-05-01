---
title: "固有値と固有ベクトル"
excerpt: ""
coverImage: ""
date: "2026-04-25T11:40:48.000Z"
updatedAt: "2026-04-25T11:40:48.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

線形代数において「行列が空間をどのように変形するか」を理解する鍵となるのが、固有値と固有ベクトルです。本節ではその定義から始め、固有多項式による計算法、対角化、そして対称行列に対するスペクトル定理まで扱います。

# 固有値と固有ベクトル

行列 $A$ による変換 $\boldsymbol{v} \mapsto A\boldsymbol{v}$ を考えます。一般にベクトルは変換によって方向も大きさも変わりますが、特別なベクトル $\boldsymbol{v}$ については変換後も方向が変わらず、大きさだけがスカラー倍になる場合があります。

定義（固有値・固有ベクトル）： $n$ 次正方行列 $A \in \mathbb{R}^{n \times n}$ に対し、 $\boldsymbol{0}$ でないベクトル $\boldsymbol{v} \in \mathbb{R}^n$ とスカラー $\lambda \in \mathbb{R}$（または $\mathbb{C}$）が

$$
A\boldsymbol{v} = \lambda\boldsymbol{v}Av=λv
$$

を満たすとき、$\lambda$ を $A$ の **固有値** （eigenvalue）、$\boldsymbol{v}$ を $\lambda$ に対応する **固有ベクトル** （eigenvector）という。

固有ベクトルに $\boldsymbol{0}$ を含めない理由は、$A\boldsymbol{0} = \lambda\boldsymbol{0}$ がすべての $\lambda$ に対して自明に成り立ってしまうためです。

![](/assets/note/math/002_linear_algebra/eigenvalue/eigenvalue_definition.svg)

固有値 $\lambda$ の値によって、固有ベクトルの変換の様子は大きく異なります。

![](/assets/note/math/002_linear_algebra/eigenvalue/eigenvalue_cases.svg)

# 固有多項式と特性方程式

固有値を実際に求めるための系統的な方法を導きます。

$A\boldsymbol{v} = \lambda\boldsymbol{v}$ を変形すると

$$
(A - \lambda I)\boldsymbol{v} = \boldsymbol{0}
$$

$\boldsymbol{v} \neq \boldsymbol{0}$ の解が存在するための必要十分条件は、行列 $(A - \lambda I)$ が正則でないこと、すなわち

$$
\det(A - \lambda I) = 0
$$

です。

定義（固有多項式・特性方程式）： $\lambda$ の多項式

$$
p(\lambda) = \det(A - \lambda I)
$$

を $A$ の **固有多項式** （characteristic polynomial）という。方程式 $p(\lambda) = 0$ を **特性方程式**（characteristic equation）という。

$A$ が $n$ 次正方行列のとき、$p(\lambda)$ は $\lambda$ の $n$ 次多項式（最高次の係数は $(-1)^n$）になります。代数学の基本定理より、$\mathbb{C}$ 上では重複度を込めてちょうど $n$ 個の固有値が存在します。

![](/assets/note/math/002_linear_algebra/eigenvalue/characteristic_polynomial.svg)

# 固有空間

定義（固有空間）： 固有値 $\lambda$ に対する固有空間を

$$
V_\lambda = \ker(A - \lambda I) = \{ \boldsymbol{v} \in \mathbb{R}^n \mid A\boldsymbol{v} = \lambda\boldsymbol{v} \}Vλ​=ker(A−λI)={v∈Rn∣Av=λv}
$$

と定義する。固有空間は $\mathbb{R}^n$ の部分空間であり、その次元

$$
\dim V_\lambda = n - \mathrm{rank}(A - \lambda I)
$$

を $\lambda$ の **幾何学的重複度** という。

一方、固有多項式における $\lambda$ の根の重複度を **代数的重複度** といいます。常に

$$
\text{幾何学的重複度} \leq \text{代数的重複度}
$$

が成り立ちます。等号が成立するかどうかが対角化可能性の鍵です。

# 対角化

定義（対角化可能）： $n$ 次正方行列 $A$ が、正則行列 $P$ によって

$$
P^{-1}AP = \Lambda = \begin{pmatrix} \lambda_1 & & \\ & \ddots & \\ & & \lambda_n \end{pmatrix}
$$

と変換できるとき、$A$ は **対角化可能** （diagonalizable）であるという。このとき $P$ の各列は固有ベクトル、$\Lambda$ の対角成分は対応する固有値です。

定理（対角化可能条件）： $n$ 次正方行列 $A$ が対角化可能であることは、$\mathbb{R}^n$（または $\mathbb{C}^n$）の基底をなす $n$ 個の 1 次独立な固有ベクトルが存在することと同値である。

証明： $A\boldsymbol{p}_i = \lambda_i\boldsymbol{p}_i$​ （ $i = 1, \ldots, n）が成り立つとき、 $P = (\boldsymbol{p}_1\ \cdots\ \boldsymbol{p}_n)$ とおくと $AP = P\Lambda$。 $P$ が正則（ $\boldsymbol{p}_i$​ が 1 次独立）のとき両辺左から $P^{-1}$ をかけて $P^{-1}AP = \Lambda$。

// 対角化の十分条件・必要十分条件

# トレースと行列式の固有値表示

固有値は行列の重要な不変量と密接に関係しています。

定理： $n$ 次正方行列 $A$ の固有値を $\lambda_1, \ldots, \lambda_n$​（重複度込み）とするとき

$$
\mathrm{tr}(A) = \lambda_1 + \lambda_2 + \cdots + \lambda_n, \qquad \det(A) = \lambda_1 \lambda_2 \cdots \lambda_n
$$

証明の概略： 固有多項式 $p(\lambda) = \det(A - \lambda I) = (-1)^n(\lambda - \lambda_1)\cdots(\lambda - \lambda_n)$ を展開して $\lambda^{n-1}$ の係数と定数項を比較することで得られる。

特に $\det(A) = 0 \iff$ 固有値に $0$ が含まれる $\iff A$ が正則でない、という重要な結果が従います。
