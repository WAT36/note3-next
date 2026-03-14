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
