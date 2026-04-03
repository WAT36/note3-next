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
