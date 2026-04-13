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
