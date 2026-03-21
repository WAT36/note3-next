---
title: "ベクトル空間"
excerpt: ""
coverImage: ""
date: "2026-03-13T21:27:21.000Z"
updatedAt: "2026-03-13T21:27:21.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

線形代数の出発点は「ベクトル」という概念です。ベクトルには大きく 2 つの捉え方があります。

# 幾何ベクトル

**幾何ベクトル** とは、平面や空間における「向きと大きさを持つ矢印」のことです。たとえば点 A から点 B へ引いた矢印

$$
\overrightarrow{AB}
$$

AB はベクトルであり、矢印の長さが大きさ（ノルム）、矢印の向きが方向を表します。

![](/assets/note/math/002_linear_algebra/vector_space/geometric_vectors.svg)

幾何ベクトルの重要な約束として、始点の位置は問わないことが挙げられます。矢印を平行移動しても、向きと大きさが変わらなければ同じベクトルとみなします（上図の実線と破線）。

# 数ベクトル

**数ベクトル** とは、実数を縦に並べた組のことです。n 個の実数を並べたものを n 次元数ベクトルといい、

$$
\boldsymbol{a} = \begin{pmatrix} a_1 \\ a_2 \\ \vdots \\ a_n \end{pmatrix} \in \mathbb{R}^n
$$

と書きます。幾何ベクトルは座標系を設けることで数ベクトルと対応付けることができ、どちらも「ベクトル空間」という統一的な枠組みで扱われます。

ベクトルの演算（和・スカラー倍）は成分ごとに行います。

$$
\boldsymbol{a} + \boldsymbol{b} = \begin{pmatrix} a_1 + b_1 \\ a_2 + b_2 \end{pmatrix}, \qquad c\boldsymbol{a} = \begin{pmatrix} ca_1 \\ ca_2 \end{pmatrix}
$$

## 数ベクトル空間

数ベクトルを土台に、数ベクトル空間を厳密に定義します。

n 個の実数を縦に並べた列ベクトル全体の集合

$$
\mathbb{R}^n = \left\{ \begin{pmatrix} a_1 \\ a_2 \\ \vdots \\ a_n \end{pmatrix} \ \middle|\ a_1, a_2, \ldots, a_n \in \mathbb{R} \right\}
$$

に、以下の 2 つの演算を定めます。

加法：

$$
\boldsymbol{a} + \boldsymbol{b} = \begin{pmatrix} a_1 \\ \vdots \\ a_n \end{pmatrix} + \begin{pmatrix} b_1 \\ \vdots \\ b_n \end{pmatrix} = \begin{pmatrix} a_1 + b_1 \\ \vdots \\ a_n + b_n \end{pmatrix}
$$

スカラー倍：

$$
\boldsymbol{a} = c\begin{pmatrix} a_1 \\ \vdots \\ a_n \end{pmatrix} = \begin{pmatrix} ca_1 \\ \vdots \\ ca_n \end{pmatrix}
$$

この集合 $\mathbb{R}^n$ と 2 つの演算の組を **n 次元数ベクトル空間** といいます。

# 1 次結合

ベクトルの「組み合わせ可能性」を議論するために、線形結合と独立性の概念が必要です。

定義（線形結合）： ベクトル $\boldsymbol{v}_1, \boldsymbol{v}_2, \ldots, \boldsymbol{v}_k$​ とスカラー $c_1, c_2, \ldots, c_k$​ に対し、

$$
c_1\boldsymbol{v}_1 + c_2\boldsymbol{v}_2 + \cdots + c_k\boldsymbol{v}_k
$$

をこれらの**線形結合（1 次結合）**という。

またこの時、1 次結合として零ベクトル $\boldsymbol{0}$ を表す式

$$
c_1\boldsymbol{v}_1 + c_2\boldsymbol{v}_2 + \cdots + c_k\boldsymbol{v}_k = \boldsymbol{0}
$$

を $\boldsymbol{v}_1, \boldsymbol{v}_2, \ldots, \boldsymbol{v}_k$ の**1 次関係式**という。

# 1 次独立・1 次従属

すべてのスカラーを 0 にした場合のみ線形結合が零ベクトルになるとき、すなわち

$$
\boldsymbol{v}_1 + c_2\boldsymbol{v}_2 + \cdots + c_k\boldsymbol{v}_k = \boldsymbol{0} \implies c_1 = c_2 = \cdots = c_k = 0
$$

が成り立つとき、$\boldsymbol{v}_1, \ldots, \boldsymbol{v}_k$​ は
**1 次独立（線形独立）**であるという。そうでない場合、すなわち全てがゼロでない $c_i$​ の組合せで零ベクトルになるとき、**1 次従属（線形従属）**であるという。

![](/assets/note/math/002_linear_algebra/vector_space/linear_independence.svg)

直感的にいえば、「1 次独立」とは各ベクトルが他のベクトルたちの線形結合では表せない（お互いに「余剰情報がない」）状態のことです。

1 次従属の場合には、あるベクトルを他の残りのベクトルの線形結合で表すことができます。

## 1 次独立と同次連立 1 次方程式

1 次独立性の定義に立ち返ると、そこには自然に連立方程式が現れます。$n$ 次元ベクトル $\boldsymbol{v}_1, \boldsymbol{v}_2, \ldots, \boldsymbol{v}_k \in \mathbb{R}^n$ の 1 次独立性を調べるには、

$$
c1v1+c2v2+⋯+ckvk=0c_1\boldsymbol{v}_1 + c_2\boldsymbol{v}_2 + \cdots + c_k\boldsymbol{v}_k = \boldsymbol{0}
$$

を満たすスカラーの組 $(c_1, \ldots, c_k)$ が自明な解 $c_1 = c_2 = \cdots = c_k = 0$ のみかどうかを問うわけです。これをベクトルの成分で書き下すと、

$$
\begin{pmatrix}
v_{11} & v_{12} & \cdots & v_{1k} \\
v_{21} & v_{22} & \cdots & v_{2k} \\
\vdots & & \ddots & \vdots \\
v_{n1} & v_{n2} & \cdots & v_{nk}
\end{pmatrix}

\begin{pmatrix}
c_1 \\
c_2 \\
\vdots \\
c_k
\end{pmatrix}

=

\begin{pmatrix}
0 \\
0 \\
\vdots \\
0
\end{pmatrix}


$$

​​ すなわち $\boldsymbol{c} = \boldsymbol{0}$ という形になります。右辺がすべてゼロの連立方程式を **同次連立 1 次方程式（homogeneous system）**といいます。

## 行列式の 1 次独立性の判定

$k=n$ の正方の場合、すなわちちょうど $n$ 本の $n$ 次元ベクトルが与えられたときは、行列式（determinant）による簡潔な判定が可能です。

定理（行列式と 1 次独立性）：

$n$ 本の $n$ 次元ベクトル $\boldsymbol{v}_1, \ldots, \boldsymbol{v}_n$​ を列に並べた $n \times n$ 行列を $A = (\boldsymbol{v}_1\ \cdots\ \boldsymbol{v}_n)$ とするとき、

$$
\boldsymbol{v}_1, \ldots, \boldsymbol{v}_n \text{ が1次独立} \iff \det(A) \neq 0v1​,…,vn​ が1次独立⟺det(A)=0
$$
