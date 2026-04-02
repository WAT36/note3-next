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
