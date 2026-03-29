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

# 部分空間

ベクトル空間の「部分」であっても、それ自体がベクトル空間の構造を持つ場合があります。

定義（部分空間）： ベクトル空間 V の空でない部分集合 W が次の 3 条件を満たすとき、W を V の
**部分空間**という。

1. 零ベクトルを含む： $\boldsymbol{0} \in W$

2. 加法について閉じている： $\boldsymbol{u}, \boldsymbol{v} \in W \implies \boldsymbol{u} + \boldsymbol{v} \in W$

3. スカラー倍について閉じている： $\boldsymbol{v} \in W,\ c \in \mathbb{R} \implies c\boldsymbol{v} \in W$

![](/assets/note/math/002_linear_algebra/vector_space/subspace_examples.svg)

部分空間を判定するコツは「閉性を確かめる」ことです。加法とスカラー倍を何度行っても集合の外に出ないかを確認します。特に、任意の部分空間は必ず零ベクトルを含むことに注意してください（$c = 0$ のスカラー倍を考えれば明らかです）。

典型的な部分空間の例（$\mathbb{R}^3$ の場合）

- $\{\boldsymbol{0}\}$（零部分空間）
- 原点を通る直線
- 原点を通る平面
- $\mathbb{R}^3$ 全体

# 生成系

ベクトルの集まりから「作れる」すべてのベクトルの集合を考えます。

定義（生成系・スパン）： ベクトル $\boldsymbol{v}_1, \boldsymbol{v}_2, \ldots, \boldsymbol{v}_k \in V$ に対し、これらのすべての線形結合からなる集合

$$
\mathrm{span}(\boldsymbol{v}_1, \ldots, \boldsymbol{v}_k) = \left\{ c_1\boldsymbol{v}_1 + c_2\boldsymbol{v}_2 + \cdots + c_k\boldsymbol{v}_k \ \middle|\ c_1, \ldots, c_k \in \mathbb{R} \right\}
$$

を $\boldsymbol{v}_1, \ldots, \boldsymbol{v}_k$​ の
**生成系（スパン）**という。また、$\mathrm{span}(\boldsymbol{v}_1, \ldots, \boldsymbol{v}_k) = V$ が成り立つとき、$\boldsymbol{v}_1, \ldots, \boldsymbol{v}_k$​ は $V$ を生成するという。

![](/assets/note/math/002_linear_algebra/vector_space/span_generation.svg)

$\mathrm{span}(\boldsymbol{v}_1, \ldots, \boldsymbol{v}_k)$ は常に部分空間になります。これは 3 条件（零ベクトルを含む・加法で閉じる・スカラー倍で閉じる）がすべて満たされることから確かめられます。

また、生成系は次の事実と深く関わっています。

命題： $\mathrm{span}(\boldsymbol{v}_1, \ldots, \boldsymbol{v}_k)$ の次元は、$\boldsymbol{v}_1, \ldots, \boldsymbol{v}_k$​ の中で 1 次独立なベクトルの最大個数に等しい。

すなわち、1 次従属なベクトルを加えても生成系は広がりません。逆に、1 次独立なベクトルを追加するたびに生成系の次元が 1 つずつ増えていきます。

## 解空間

$m \times n$ 行列 $A$ に対し、同次連立方程式 $A\boldsymbol{x} = \boldsymbol{0}$ の解全体の集合

$$
\ker(A) = \{\boldsymbol{x} \in \mathbb{R}^n \mid A\boldsymbol{x} = \boldsymbol{0}\}
$$

を$A$ の**解空間（または核、kernel）**という。

$\ker(A)$ が $\mathbb{R}^n$ の部分空間であることは、3 条件を確かめることで示せます。

$A\boldsymbol{x} = \boldsymbol{0}$、$A\boldsymbol{y} = \boldsymbol{0}$ ならば

$$
A(\boldsymbol{x}+\boldsymbol{y}) = A\boldsymbol{x}+A\boldsymbol{y} = \boldsymbol{0}+\boldsymbol{0} = \boldsymbol{0}, \qquad A(c\boldsymbol{x}) = cA\boldsymbol{x} = \boldsymbol{0}
$$

が成り立つので、加法とスカラー倍について閉じています。零ベクトルも解であることは明らかです。

## 和空間

2 つの部分空間を「合わせた」空間を定義する。

定義（和空間）： ベクトル空間 $V$ の部分空間 $U$、$W$ に対し、

$$
U + W = \{\boldsymbol{u} + \boldsymbol{w} \mid \boldsymbol{u} \in U,\ \boldsymbol{w} \in W\}
$$

を $U$ と $W$ の**和空間**という。

$U + W$ は $V$ の部分空間であり、$U$ と $W$ の両方を含む最小の部分空間です。

一方、$U \cup W$（集合としての合併）は一般に部分空間にならないことに注意してください。

![](/assets/note/math/002_linear_algebra/vector_space/sum_space_vs_union.svg)

## 直和

定義（直和）： $U + W$ において $U \cap W = \{\boldsymbol{0}\}$ が成り立つとき、この和を**直和**といい、

$$
V = U \oplus WV=U⊕W
$$

と書く。このとき任意の $\boldsymbol{v} \in V$ は $\boldsymbol{v} = \boldsymbol{u} + \boldsymbol{w}$（ $\boldsymbol{u} \in U$、$\boldsymbol{w} \in W$）と
一意に分解できる。

直和の条件 $U \cap W = \{\boldsymbol{0}\}$ は、「$U$ と $W$ は零ベクトル以外に共通点を持たない」ことを意味します。

![](/assets/note/math/002_linear_algebra/vector_space/direct_sum_decomposition.svg)

**定理（直和の同値条件）**： 次の 3 条件は同値です。

1. $U + W$ が直和（$U \cap W = \{\boldsymbol{0}\}$）

2. 任意の $\boldsymbol{v} \in U + W$ の分解 $\boldsymbol{v} = \boldsymbol{u} + \boldsymbol{w}$ が一意

3. $\boldsymbol{u} + \boldsymbol{w} = \boldsymbol{0}$（$\boldsymbol{u} \in U$、$\boldsymbol{w} \in W$）  $\implies \boldsymbol{u} = \boldsymbol{w} = \boldsymbol{0}$

直和の場合、次元公式は $U \cap W = \{\boldsymbol{0}\}$ より $\dim(U \cap W) = 0$ となるので、

$$
\dim(U \oplus W) = \dim U + \dim W
$$

と非常にすっきりした形になります。

# 基底

前章までで「生成系」と「1 次独立」という 2 つの概念を学びました。この 2 つを同時に満たすベクトルの組が基底です。

定義（基底）： ベクトル空間 $V$ のベクトルの組 $\{\boldsymbol{v}_1, \boldsymbol{v}_2, \ldots, \boldsymbol{v}_n\}$ が次の 2 条件を満たすとき、これを $V$ の**基底**という。

1. 生成系： $\mathrm{span}(\boldsymbol{v}_1, \ldots, \boldsymbol{v}_n) = V$

2. 1 次独立： $\boldsymbol{v}_1, \ldots, \boldsymbol{v}_n$​ は 1 次独立

基底は「多すぎず少なすぎない、ちょうどよい生成系」と言い換えることができます。生成系から冗長なベクトルをすべて取り除いたものが基底です。

![](/assets/note/math/002_linear_algebra/vector_space/basis_two_conditions.svg)

基底の本質的な性質は表現の一意性です

定理： $\{\boldsymbol{v}_1, \ldots, \boldsymbol{v}_n\} が $V$ の基底であるとき、$V$ の任意のベクトル $\boldsymbol{x}$ はこの基底の線形結合として唯一通りに表せる。すなわち$\boldsymbol{x} = c_1\boldsymbol{v}_1 + \cdots + c_n\boldsymbol{v}_n$​ を満たすスカラーの組 $(c_1, \ldots, c_n)$ はただ 1 つ存在する。

（証明の概略）存在は生成系の条件から、一意性は 1 次独立の条件から従います。2 通りの表現があるとすると、その差を取ることで $\boldsymbol{0}$ の非自明な線形結合が得られ、1 次独立に矛盾します。

## 標準基底

$\mathbb{R}^n$ には特に自然な基底が存在します。

定義（標準基底）： $\mathbb{R}^n$ において、$i$ 番目の成分のみが $1$ で残りがすべて $0$ であるベクトル

$$
\boldsymbol{e}_i = \begin{pmatrix}0\\\vdots\\1\\\vdots\\0\end{pmatrix} \leftarrow i\text{番目}
$$

を**標準基底ベクトル**といい、$\{\boldsymbol{e}_1, \boldsymbol{e}_2, \ldots, \boldsymbol{e}_n\}$
を $\mathbb{R}^n$ の **標準基底**という。

標準基底が基底であることは、以下の 2 点から確かめられます。任意の $\boldsymbol{a} = (a_1, \ldots, a_n)^\top$ が $\boldsymbol{a} = a_1\boldsymbol{e}_1 + \cdots + a_n\boldsymbol{e}_n$​ と表せるので生成系であり、$c_1\boldsymbol{e}_1 + \cdots + c_n\boldsymbol{e}_n = \boldsymbol{0}$ の各成分を見れば直ちに $c_i = 0$ が従うので
1 次独立です。

![](/assets/note/math/002_linear_algebra/vector_space/standard_basis_detailed.svg)

標準基底の最大の利点は、座標と成分が一致することです。すなわち $\boldsymbol{a} = (a_1, \ldots, a_n)^\top$ の標準基底に関する座標はそのまま $(a_1, \ldots, a_n)$ です。

# 次元

ベクトル空間 $V$ が有限個のベクトルで生成されるとき、$V$ の基底の本数を $V$ の**次元**といい、$\dim V$ で表す。特に $V = \{\boldsymbol{0}\}$ のとき $\dim V = 0$ と定める。

次元は「空間の広がりの自由度」を表す量です。直線は 1 次元、平面は 2 次元、空間は 3 次元——これは私たちの直感と完全に一致します。

![](/assets/note/math/002_linear_algebra/vector_space/dimension_intution.svg)

次元が「well-defined」（矛盾なく定義できる）であるためには、基底の本数が一定であることを証明する必要があります。

定理（基底の本数の一定性）： ベクトル空間 $V$ の任意の 2 つの基底は、同じ本数のベクトルからなる。

証明の概略： $\{\boldsymbol{u}_1, \ldots, \boldsymbol{u}_m\}$ と $\{\boldsymbol{v}_1, \ldots, \boldsymbol{v}_n\}$ がともに $V$ の基底であるとする。$\boldsymbol{u}_1, \ldots, \boldsymbol{u}_m$​ は $V$ に属するから、$\boldsymbol{v}_1, \ldots, \boldsymbol{v}_n$​ の線形結合で表せる。$m > n$ と仮定すると $\boldsymbol{u}_1, \ldots, \boldsymbol{u}_m$​ が 1 次従属となり基底の条件に矛盾する。対称的な議論より $n > m$ も矛盾するから、$m = n$。

## 部分空間の次元

$V$ の部分空間の次元は $V$ の次元を超えることはありません。

定理： $W$ が $\dim V = n$ のベクトル空間 $V$ の部分空間ならば

$0 \leq \dim W \leq n$ 等号 $\dim W = n$ が成立するのは $W = V$ のときに限る。

![](/assets/note/math/002_linear_algebra/vector_space/subspace_dimension_hierarchy.svg)

$\mathbb{R}^3$ の部分空間の分類は入れ子構造になっています。零空間 $\{0\}$（次元 0）、原点を通る直線（次元 1）、原点を通る平面（次元 2）、$\mathbb{R}^3$ 全体（次元 3）の 4 種類に限られます。
