---
title: "ベクトルの内積"
excerpt: ""
coverImage: ""
date: "2026-04-08T18:45:44.000Z"
updatedAt: "2026-04-08T18:45:44.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

線形代数の出発点が「ベクトル空間」であるように、その上に「距離」と「角度」の概念を持ち込むのが内積です。

# 内積

2 つのベクトルから 1 つのスカラーを作り出す演算を **内積** といいます。高校で学んだ $\boldsymbol{a} \cdot \boldsymbol{b} = |\boldsymbol{a}||\boldsymbol{b}|\cos\theta$ の拡張として、代数的・公理的に定義します。

定義（内積）： 実ベクトル空間 $V$ 上の内積とは、写像 $\langle \cdot, \cdot \rangle : V \times V \to \mathbb{R}$ であって、任意の $\boldsymbol{u}, \boldsymbol{v}, \boldsymbol{w} \in V$ および $c \in \mathbb{R}$ に対して次の 4 条件を満たすものをいう。

$$
(1) 対称性：\text{(1) 対称性：} \langle \boldsymbol{u}, \boldsymbol{v} \rangle = \langle \boldsymbol{v}, \boldsymbol{u} \rangle(1) 
(2) 線形性（スカラー倍）： \text{(2) 線形性（スカラー倍）：} \langle c\boldsymbol{u}, \boldsymbol{v} \rangle = c\langle \boldsymbol{u}, \boldsymbol{v} \rangle(2) 
(3) 線形性（加法）：\text{(3) 線形性（加法）：} \langle \boldsymbol{u} + \boldsymbol{v}, \boldsymbol{w} \rangle = \langle \boldsymbol{u}, \boldsymbol{w} \rangle + \langle \boldsymbol{v}, \boldsymbol{w} \rangle(3) 
(4) 正定値性：\text{(4) 正定値性：} \langle \boldsymbol{v}, \boldsymbol{v} \rangle \geq 0,\quad \text{等号成立} \iff \boldsymbol{v} = \boldsymbol{0}(4) 
$$

対称性と線形性を合わせて、内積は **双線形写像** であるといいます。すなわち第 2 引数についても $\langle \boldsymbol{u}, c\boldsymbol{v} + \boldsymbol{w} \rangle = c\langle \boldsymbol{u}, \boldsymbol{v} \rangle + \langle \boldsymbol{u}, \boldsymbol{w} \rangle$ が自動的に成立します。

代表的な内積の例を 2 つ挙げます。

![](/assets/note/math/002_linear_algebra/inner_product/inner_product_examples.svg)

## 内積空間

内積 $\langle \cdot, \cdot \rangle$ が定義されたベクトル空間 $(V, \langle \cdot, \cdot \rangle)$ を **内積空間** （または準ヒルベルト空間）という。特に完備な内積空間をヒルベルト空間という。

内積空間の代表例として $\mathbb{R}^n$（標準内積）、 $\mathbb{R}^{m \times n}$ （フロベニウス内積）、$C[a,b]$（関数空間）などがある。フロベニウス内積とは、$m \times n$ 実行列の空間において

$$
\langle A, B \rangle_F = \mathrm{tr}(A^T B) = \sum_{i,j} a_{ij} b_{ij}
$$

と定義したものである。

# ベクトルの大きさ（ノルム）

内積を用いることで、ベクトルの「長さ」を自然に定義できます。

定義（ノルム）： 内積空間 $(V, \langle \cdot, \cdot \rangle)$ において、$\boldsymbol{v} \in V$ の **ノルム（大きさ）** を

$$
\|\boldsymbol{v}\| = \sqrt{\langle \boldsymbol{v}, \boldsymbol{v} \rangle}
$$

と定義する。$\mathbb{R}^n$ の標準内積のもとでは

$$
\|\boldsymbol{v}\| = \sqrt{v_1^2 + v_2^2 + \cdots + v_n^2}​
$$

となり、これはユークリッドノルムに一致する。

ノルムには次の基本性質があります。

1.  非負性： $ \|\boldsymbol{v}\| \geq 0,\quad \text{等号成立} \iff \boldsymbol{v} = \boldsymbol{0}$

2.  斉次性： $ \|c\boldsymbol{v}\| = |c|\,\|\boldsymbol{v}\|$

3.  三角不等式： $ \|\boldsymbol{u} + \boldsymbol{v}\| \leq \|\boldsymbol{u}\| + \|\boldsymbol{v}\|$

## シュワルツの不等式と三角不等式

内積とノルムに関する最も重要な不等式を証明します。

定理（コーシー・シュワルツの不等式）： 内積空間の任意のベクトル $\boldsymbol{u}, \boldsymbol{v} \in V$

$$
\langle \boldsymbol{u}, \boldsymbol{v} \rangle| \leq \|\boldsymbol{u}\| \cdot \|\boldsymbol{v}\|
$$

が成立する。等号成立条件は $\boldsymbol{u}$ と $\boldsymbol{v}$ が線形従属のときに限る。

証明： $\boldsymbol{v} = \boldsymbol{0}$ のときは両辺ともに $0$ で成立する。$\boldsymbol{v} \neq \boldsymbol{0}$ とし、任意の $t \in \mathbb{R}$ に対して正定値性より

$$
0 \leq \|\boldsymbol{u} - t\boldsymbol{v}\|^2 = \|\boldsymbol{u}\|^2 - 2t\langle \boldsymbol{u}, \boldsymbol{v} \rangle + t^2\|\boldsymbol{v}\|^2
$$

が成立する。これは $t$ についての下に凸な 2 次式であり、常に非負だから判別式 $D \leq 0$：

$$
\frac{D}{4} = \langle \boldsymbol{u}, \boldsymbol{v} \rangle^2 - \|\boldsymbol{u}\|^2\|\boldsymbol{v}\|^2 \leq 0
$$

よって $|\langle \boldsymbol{u}, \boldsymbol{v} \rangle| \leq \|\boldsymbol{u}\| \cdot \|\boldsymbol{v}\|$。等号は $D = 0$、すなわち $\boldsymbol{u} = t_0\boldsymbol{v}$ となる $t_0$​ が存在するときに限る。$\square$

定理（三角不等式）： 任意の $\boldsymbol{u}, \boldsymbol{v} \in V$ に対して $\boldsymbol{u} + \boldsymbol{v}\| \leq \|\boldsymbol{u}\| + \|\boldsymbol{v}\|$。

証明：$\boldsymbol{u} + \boldsymbol{v}\|^2 = \|\boldsymbol{u}\|^2 + 2\langle \boldsymbol{u}, \boldsymbol{v} \rangle + \|\boldsymbol{v}\|^2$ であり、シュワルツの不等式より $\langle \boldsymbol{u}, \boldsymbol{v} \rangle \leq |\langle \boldsymbol{u}, \boldsymbol{v} \rangle| \leq \|\boldsymbol{u}\|\|\boldsymbol{v}\|$ だから

$$
\boldsymbol{u} + \boldsymbol{v}\|^2 \leq \|\boldsymbol{u}\|^2 + 2\|\boldsymbol{u}\|\|\boldsymbol{v}\| + \|\boldsymbol{v}\|^2 = (\|\boldsymbol{u}\| + \|\boldsymbol{v}\|)^2
$$

両辺は非負だから平方根をとって成立する。$\square$

シュワルツの不等式より $-1 \leq \langle \boldsymbol{u}, \boldsymbol{v} \rangle / (\|\boldsymbol{u}\|\|\boldsymbol{v}\|) \leq 1$ が成り立つため、0 でないベクトル $\boldsymbol{u}, \boldsymbol{v}$ のなす角度 $\theta$ を

$\cos\theta = \frac{\langle \boldsymbol{u}, \boldsymbol{v} \rangle}{\|\boldsymbol{u}\| \cdot \|\boldsymbol{v}\|}, \quad 0 \leq \theta \leq \pi$
と定義することが正当化されます。

## 直交

定義（直交）： 内積空間 $V$ の 2 つのベクトル $\boldsymbol{u}, \boldsymbol{v}$ が

$$
\langle \boldsymbol{u}, \boldsymbol{v} \rangle = 0
$$

を満たすとき、$\boldsymbol{u}$ と $\boldsymbol{v}$ は **直交** するといい、$\boldsymbol{u} \perp \boldsymbol{v}$ と書く。またベクトルの集合 $\{\boldsymbol{v}_1, \ldots, \boldsymbol{v}_k\}$ において任意の相異なる 2 ベクトルが直交するとき、これを **直交系** という。

直交するベクトルには、ピタゴラスの定理の一般化が成り立ちます。

定理（一般化ピタゴラスの定理）： $\boldsymbol{u} \perp \boldsymbol{v}$ ならば $\boldsymbol{u} + \boldsymbol{v}\|^2 = \|\boldsymbol{u}\|^2 + \|\boldsymbol{v}\|^2$。

証明： $|\boldsymbol{u} + \boldsymbol{v}\|^2 = \|\boldsymbol{u}\|^2 + 2\langle \boldsymbol{u}, \boldsymbol{v} \rangle + \|\boldsymbol{v}\|^2 = \|\boldsymbol{u}\|^2 + 0 + \|\boldsymbol{v}\|^2$

直交系には重要な性質があります。

定理（直交系の線形独立性）： 零ベクトルを含まない直交系 $\{\boldsymbol{v}_1, \ldots, \boldsymbol{v}_k\}$ は線形独立である。

証明： $\boldsymbol{v}_1 + \cdots + c_k\boldsymbol{v}_k = \boldsymbol{0}$ とする。任意の $j$ について両辺と $\boldsymbol{v}_j$​ の内積をとると $c_j\|\boldsymbol{v}_j\|^2 = 0$。$\boldsymbol{v}_j \neq \boldsymbol{0}$ より $\|\boldsymbol{v}_j\|^2 > 0$ だから $c_j = 0$ 。

![](/assets/note/math/002_linear_algebra/inner_product/orthogonality_diagram.svg)

## 正規直交系

直交系の各ベクトルをさらに単位ベクトル（大きさ 1）に正規化したものが正規直交系です。

定義（正規直交系・正規直交基底）： ベクトルの集合 $\{\boldsymbol{e}_1, \ldots, \boldsymbol{e}_k\}$ が

$$
\langle \boldsymbol{e}_i, \boldsymbol{e}_j \rangle = \delta_{ij} = \begin{cases} 1 & (i = j) \\ 0 & (i \neq j) \end{cases}
$$

を満たすとき、 **正規直交系** という。ここで $\delta_{ij}$​ はクロネッカーのデルタである。正規直交系がベクトル空間 $V$ の基底をなすとき、 **正規直交基底** という。

$\mathbb{R}^n$ の標準基底 $\{\boldsymbol{e}_1, \ldots, \boldsymbol{e}_n\}$ は標準内積のもとで正規直交基底をなします。正規直交基底の最大の利点は、座標（フーリエ係数）が内積を取るだけで求まることです。

定理（正規直交基底による展開）： $\{\boldsymbol{e}_1, \ldots, \boldsymbol{e}_n\}$ が $V$ の正規直交基底ならば、任意の $\boldsymbol{v} \in V$ は

$$
\boldsymbol{v} = \langle \boldsymbol{v}, \boldsymbol{e}_1 \rangle \boldsymbol{e}_1 + \langle \boldsymbol{v}, \boldsymbol{e}_2 \rangle \boldsymbol{e}_2 + \cdots + \langle \boldsymbol{v}, \boldsymbol{e}_n \rangle \boldsymbol{e}_n
$$

と展開できる。係数 $\langle \boldsymbol{v}, \boldsymbol{e}_i \rangle$ を **フーリエ係数** という。

証明： $\boldsymbol{v} = c_1\boldsymbol{e}_1 + \cdots + c_n\boldsymbol{e}_n$​ の両辺と $\boldsymbol{e}_j$​ の内積をとると、正規直交性より $\langle \boldsymbol{v}, \boldsymbol{e}_j \rangle = c_j\|\boldsymbol{e}_j\|^2 = c_j$

一般の基底では行列の逆行列計算が必要だが、正規直交基底では内積を取るだけで係数が求まる。これが正規直交基底を積極的に構成する動機です。

## グラム・シュミットの正規直交化法

任意の線形独立なベクトルの組から正規直交系を構成する系統的な手順を説明します。

定義（正射影）： 0 でないベクトル $\boldsymbol{b}$ への $\boldsymbol{a}$ の正射影を

$$
\mathrm{proj}_{\boldsymbol{b}}\, \boldsymbol{a} = \frac{\langle \boldsymbol{a}, \boldsymbol{b} \rangle}{\|\boldsymbol{b}\|^2}\, \boldsymbol{b}
$$

と定義する。残差 $\boldsymbol{a} - \mathrm{proj}_{\boldsymbol{b}}\boldsymbol{a}$ は $\boldsymbol{b}$ に直交する。

定理（グラム・シュミットの正規直交化法）： 線形独立なベクトルの組 $\{\boldsymbol{a}_1, \ldots, \boldsymbol{a}_k\}$ から、以下の手順によって同じ部分空間を張る正規直交系 $\{\boldsymbol{e}_1, \ldots, \boldsymbol{e}_k\}$ が構成できる。

$$
\boldsymbol{v}_j = \boldsymbol{a}_j - \sum_{i=1}^{j-1} \langle \boldsymbol{a}_j, \boldsymbol{e}_i \rangle\, \boldsymbol{e}_i, \qquad \boldsymbol{e}_j = \frac{\boldsymbol{v}_j}{\|\boldsymbol{v}_j\|}
$$

各ステップの意味は明快です。$\boldsymbol{v}_j$​ は $\boldsymbol{a}_j$​ から、すでに構成した正規直交ベクトル $\boldsymbol{e}_1, \ldots, \boldsymbol{e}_{j-1}$​ への射影成分をすべて取り除いた「残差」であり、これを正規化することで既存の全ベクトルに直交する単位ベクトルが得られます

![](/assets/note/math/002_linear_algebra/inner_product/gram_schmidt_diagram.svg)

計算例

$\boldsymbol{a}_1 = (1, 1, 0)^T$、$\boldsymbol{a}_2 = (1, 0, 1)^T$、$\boldsymbol{a}_3 = (0, 1, 1)^T$ に適用する。

Step 1： $\boldsymbol{v}_1 = \boldsymbol{a}_1$​、$\|\boldsymbol{v}_1\| = \sqrt{2}$​ より

$$
\boldsymbol{e}_1 = \frac{1}{\sqrt{2}}\begin{pmatrix}1\\1\\0\end{pmatrix}
$$

Step 2： $\langle \boldsymbol{a}_2, \boldsymbol{e}_1 \rangle = \frac{1}{\sqrt{2}}$​ より $\boldsymbol{v}_2 = \boldsymbol{a}_2 - \frac{1}{\sqrt{2}}\boldsymbol{e}_1 = \left(\frac{1}{2}, -\frac{1}{2}, 1\right)^T$、$\|\boldsymbol{v}_2\| = \sqrt{\frac{3}{2}}$​​ より

$$
\boldsymbol{e}_2 = \frac{1}{\sqrt{6}}\begin{pmatrix}1\\-1\\2\end{pmatrix}
$$

Step 3： 同様に計算して

$$
\boldsymbol{e}_3 = \frac{1}{\sqrt{3}}\begin{pmatrix}-1\\1\\1\end{pmatrix}
$$

$\|\boldsymbol{e}_i\| = 1$、$\langle \boldsymbol{e}_i, \boldsymbol{e}_j \rangle = 0\ (i \neq j)$ が確認できます。

# 直交補空間

ベクトル空間 $V$ の部分空間 $W$ が与えられたとき、$W$ のすべてのベクトルに直交するベクトル全体の集合を考えます。

定義（直交補空間）： 内積空間 $V$ の部分空間 $W$ に対し

$$
W^\perp = \{ \boldsymbol{v} \in V \mid \langle \boldsymbol{v}, \boldsymbol{w} \rangle = 0 \text{ for all } \boldsymbol{w} \in W \}
$$

を $W$ の **直交補空間** （orthogonal complement）という。

$W^\perp$ は「 $W$ の全要素と直交するベクトルをすべて集めた集合」です。定義から $W \cap W^\perp \subseteq \{\boldsymbol{0}\}$ であることが分かります（$W$ と $W^\perp$ の両方に属するベクトル $\boldsymbol{v}$ があれば $\langle \boldsymbol{v}, \boldsymbol{v} \rangle = 0$、正定値性より $\boldsymbol{v} = \boldsymbol{0}$）。

![](/assets/note/math/002_linear_algebra/inner_product/orthogonal_complement_def.svg)

## 正射影

定義（正射影写像）： 有限次元内積空間 $V$ の部分空間 $W$ に対し、直交分解

$$
\boldsymbol{v} = \underbrace{\boldsymbol{w}}_{\in W} + \underbrace{\boldsymbol{w}^\perp}_{\in W^\perp}
$$

における $W$ 成分への対応

$$
P_W : V \to V、P_W(\boldsymbol{v}) = \boldsymbol{w}
$$

を $W$ への **正射影（直交射影）** という。

正射影は$W$ の正規直交基底 $\{\boldsymbol{e}_1, \ldots, \boldsymbol{e}_k\}$ を用いると、正射影は明示的に

$$
P_W(\boldsymbol{v}) = \sum_{i=1}^k \langle \boldsymbol{v}, \boldsymbol{e}_i \rangle\, \boldsymbol{e}_i
$$

と具体的に書き下せます。

# 直交行列

定義（直交行列）： 実正方行列 $Q \in \mathbb{R}^{n \times n}$ が

$$
Q^T Q = I
$$

を満たすとき、$Q$ を **直交行列** （orthogonal matrix）という。

この条件は「$Q$ の列ベクトル $\boldsymbol{q}_1, \ldots, \boldsymbol{q}_n$​ が $\mathbb{R}^n$ の正規直交基底をなす」ことと同値です。実際、$(Q^TQ)_{ij} = \boldsymbol{q}_i^T \boldsymbol{q}_j = \langle \boldsymbol{q}_i, \boldsymbol{q}_j \rangle$ ですから、$Q^TQ = I$ は

$$
\langle \boldsymbol{q}_i, \boldsymbol{q}_j \rangle = \delta_{ij} = \begin{cases} 1 & (i = j) \\ 0 & (i \neq j) \end{cases}
$$

に他なりません。

## 直交行列と正規直交基底

同値条件 $Q$ が直交行列であることは次の条件すべてと同値です。

命題（直交行列の同値条件）： 実正方行列 $Q$ について次の 4 条件は同値である。

$$
\text{(1)}\ Q^TQ = I \qquad \text{(2)}\ QQ^T = I \qquad \text{(3)}\ Q^T = Q^{-1} \qquad \text{(4)}\ Q \text{ の列が正規直交基底}
$$

証明： $(1) \Rightarrow (3)$： $Q^TQ = I$ より $Q^T$ は $Q$ の左逆行列。正方行列では左逆行列＝逆行列だから $Q^T = Q^{-1}$。 $(3) \Rightarrow (2)$： $Q^{-1} = Q^T$ の両辺右から $Q$ をかけると $QQ^T = I$ 。$(2) \Leftrightarrow (4)$（行版）は列の場合と対称的に示せる。

条件 (3) $Q^T = Q^{-1}$ は特に重要です。直交行列の逆行列は転置を計算するだけで得られるため、数値計算上も非常に扱いやすい行列です。

## 直交行列と内積

直交行列の最も本質的な性質は、内積・ノルム・角度を完全に保存することです。

定理（直交変換の等長性）： $Q \in \mathbb{R}^{n \times n}$ を直交行列とする。任意の $\boldsymbol{u}, \boldsymbol{v} \in \mathbb{R}^n$ に対して

$$
\langle Q\boldsymbol{u},\, Q\boldsymbol{v} \rangle = \langle \boldsymbol{u}, \boldsymbol{v} \rangle
$$

証明：

$$
\langle Q\boldsymbol{u}, Q\boldsymbol{v} \rangle = (Q\boldsymbol{u})^T(Q\boldsymbol{v}) = \boldsymbol{u}^T Q^T Q \boldsymbol{v} = \boldsymbol{u}^T I \boldsymbol{v} = \langle \boldsymbol{u}, \boldsymbol{v} \rangle \quad
$$

内積が保存されることから、ノルムと角度の保存が直ちに従います。

系（ノルムの保存）：

$$
\|Q\boldsymbol{v}\| = \|\boldsymbol{v}\|
$$

証明： $\|Q\boldsymbol{v}\|^2 = \langle Q\boldsymbol{v}, Q\boldsymbol{v} \rangle = \langle \boldsymbol{v}, \boldsymbol{v} \rangle = \|\boldsymbol{v}\|^2$

系（角度の保存）： $\boldsymbol{u}, \boldsymbol{v} \neq \boldsymbol{0}$ のとき、$Q\boldsymbol{u}$ と $Q\boldsymbol{v}$ のなす角は $\boldsymbol{u}$ と $\boldsymbol{v}$ のなす角に等しい。

証明：

$$
\cos\theta' = \frac{\langle Q\boldsymbol{u}, Q\boldsymbol{v} \rangle}{\|Q\boldsymbol{u}\|\,\|Q\boldsymbol{v}\|} = \frac{\langle \boldsymbol{u}, \boldsymbol{v} \rangle}{\|\boldsymbol{u}\|\,\|\boldsymbol{v}\|} = \cos\theta \quad
$$

内積を保存する線形写像を等長写像（isometry）または **直交変換** といいます。上の定理は「直交行列による変換は等長写像である」ことを示しています。逆も成り立ちます。

定理（等長写像の特徴付け）： $\mathbb{R}^n$ の線形写像 $f$ が等長写像であること（すべての $\boldsymbol{u}, \boldsymbol{v}$ に対して $\langle f(\boldsymbol{u}), f(\boldsymbol{v})\rangle = \langle \boldsymbol{u}, \boldsymbol{v}\rangle$ は、$f$ を表す行列が直交行列であることと同値である。

![](/assets/note/math/002_linear_algebra/inner_product/orthogonal_matrix_inner_product.svg)
