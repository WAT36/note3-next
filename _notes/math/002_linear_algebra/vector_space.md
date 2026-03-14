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
