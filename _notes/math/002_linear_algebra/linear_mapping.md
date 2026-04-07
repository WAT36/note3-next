---
title: "線形写像"
excerpt: ""
coverImage: ""
date: "2026-04-01T19:47:55.000Z"
updatedAt: "2026-04-01T19:47:55.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

# 線形写像

2 つのベクトル空間の間で「ベクトル空間の構造を保つ写像」を考える。

定義（線形写像）： ベクトル空間 $V$ から $W$ への写像 $f: V \to W$ が任意の $\boldsymbol{u}, \boldsymbol{v} \in V$ とスカラー $c \in \mathbb{R}$ に対して

加法の保存： $f(\boldsymbol{u} + \boldsymbol{v}) = f(\boldsymbol{u}) + f(\boldsymbol{v})$

スカラー倍の保存： $f(c\boldsymbol{v}) = cf(\boldsymbol{v})$

を満たすとき、$f$ を $V$ から $W$ への**線形写像**という。この 2 条件はまとめて

$$
f(c_1\boldsymbol{u} + c_2\boldsymbol{v}) = c_1 f(\boldsymbol{u}) + c_2 f(\boldsymbol{v})
$$

と書くことができ、これを**線形性**という。

![](/assets/note/math/002_linear_algebra/linear_algebra/linear_map_definition.svg)

線形写像の重要な基本性質として、**零ベクトルは零ベクトルに写る**ことが挙げられます。$c = 0$ とすれば
$f(\boldsymbol{0}) = f(0 \cdot \boldsymbol{v}) = 0 \cdot f(\boldsymbol{v}) = \boldsymbol{0}$
が従います。

## 表現行列

$V$ の基底 $\{\boldsymbol{v}_1, \ldots, \boldsymbol{v}_n\}$、$W$ の基底 $\{\boldsymbol{w}_1, \ldots, \boldsymbol{w}_m\}$ を固定すると、線形写像 $f: V \to W$
は $m \times n$ 行列 $A$ で完全に表現されます。

この行列$A$を **表現行列** といいます。

$f(\boldsymbol{v}_j)$ を $W$ の基底で展開したときの係数を $j$ 列目に並べれば表現行列が得られます。

$$
f(\boldsymbol{v}_j)
=
a_{1j}\boldsymbol{w}_1 + a_{2j}\boldsymbol{w}_2 + \cdots + a_{mj}\boldsymbol{w}_m \implies A =
\begin{pmatrix}
a_{11} & \cdots & a_{1n} \\
\vdots & \ddots & \vdots \\
a_{m1} & \cdots & a_{mn}
\end{pmatrix}
$$

![](/assets/note/math/002_linear_algebra/linear_algebra/matrix_representation_of_linear_map.svg)

定理： 有限次元ベクトル空間間の線形写像と行列は一対一に対応する。基底を固定するたびに写像が行列に、行列が写像に翻訳される

## 基底の取り替え行列

「基底を固定すると線形写像が行列で表現される」ことを学びました。しかし基底の選び方は一意ではありません。同じ写像でも基底が変われば表現行列が変わる——この変換の法則を体系的に扱うのが本章の目標です。まず座標の変換から始めます。$\mathbb{R}^n$ の 2 つの基底

$$
B = \{\boldsymbol{b}_1, \ldots, \boldsymbol{b}_n\}, \qquad B' = \{\boldsymbol{b}_1', \ldots, \boldsymbol{b}_n'\}
$$

を考えます。同じベクトル
$\boldsymbol{x}$ を $B$ で表した座標と $B'$ で表した座標は一般に異なります。これらを結びつける行列が **基底の取り替え行列（推移行列）** です。

![](/assets/note/math/002_linear_algebra/linear_algebra/change_of_basis_motivation.svg)

**定義（基底の取り替え行列）：** $\mathbb{R}^n$ の基底 $B = \{\boldsymbol{b}_1, \ldots, \boldsymbol{b}_n\}$ から基底 $B' = \{\boldsymbol{b}_1', \ldots, \boldsymbol{b}_n'\}$ への**取り替え行列**（推移行列）$P$ とは、任意のベクトルの $B$ に関する座標 $[\boldsymbol{x}]_B$​ を $B'$ に関する座標 $[\boldsymbol{x}]_{B'}$​ に変換する行列である。

$$
[x]B[\boldsymbol{x}]\_{B'} = P\,[\boldsymbol{x}]\_B[x]B′​=P[x]B​
$$

構成法： $B$ の各基底ベクトル $\boldsymbol{b}_j$​ を $B'$ の線形結合で表し、その係数を $j$ 列目に並べれば $P$ が得られます。すなわち

$$
\boldsymbol{b}_j = p_{1j}\boldsymbol{b}_1' + p_{2j}\boldsymbol{b}_2' + \cdots + p_{nj}\boldsymbol{b}_n' \implies P =
\begin{pmatrix}
p_{11} & \cdots & p_{1n} \\
\vdots & \ddots & \vdots \\
p_{n1} & \cdots & p_{nn}
\end{pmatrix}
$$

標準基底 $E = \{\boldsymbol{e}_1, \ldots, \boldsymbol{e}_n\}$ を経由すると計算が整理されます。

![](/assets/note/math/002_linear_algebra/linear_algebra/change_of_basis_construction.svg)

特に $B$ が標準基底 $E$ のとき $M_E = I$（単位行列）なので、

$P = M_{B'}^{-1}$

つまり新しい基底ベクトルを列に並べた行列の逆行列が取り替え行列になります。

# 像と核

線形写像には 2 つの重要な部分空間が自然に伴います。

定義（核・像）： 線形写像 $f: V \to W$ に対し

$$
\ker(f) = \{\boldsymbol{v} \in V \mid f(\boldsymbol{v}) = \boldsymbol{0}\} \quad \text{（核、kernel）}
$$

$$
\mathrm{Im}(f) = \{f(\boldsymbol{v}) \mid \boldsymbol{v} \in V\} \quad \text{（像、image）}
$$

と定める。$\ker(f)$ は $V$ の部分空間、$\mathrm{Im}(f)$ は $W$ の部分空間になる。

![](/assets/note/math/002_linear_algebra/linear_mapping/kernel_and_image.svg)

$\ker(f)$ が部分空間であることは、$f(\boldsymbol{u}) = f(\boldsymbol{v}) = \boldsymbol{0}$ のとき $f(\boldsymbol{u}+\boldsymbol{v}) = \boldsymbol{0}$、$f(c\boldsymbol{u}) = c\boldsymbol{0} = \boldsymbol{0}$ から確かめられます。$\mathrm{Im}(f)$ についても同様です。

## 線形写像の次元定理

核と像の次元には、先ほどの次元定理が線形写像の形で現れます。

定理（線形写像の次元定理）： 線形写像 $f: V \to W$ において $V$ が有限次元ならば

$$
\dim \ker(f) + \dim \mathrm{Im}(f) = \dim V
$$

![](/assets/note/math/002_linear_algebra/linear_mapping/rank_nullity_linear_map.svg)

行列写像 $f_A(\boldsymbol{x}) = A\boldsymbol{x}$ に適用すると、$\ker(f_A) = \ker(A)$、$\mathrm{Im}(f_A) = \text{列空間}$ となり、前章の次元定理 $\mathrm{rank}(A) + \dim\ker(A) = n$ と完全に一致します。
